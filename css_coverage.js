const { chromium } = require('playwright');
const fs = require('fs');
const postcss = require('postcss');

const BASE_URL = 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com';
const paths = [
  '/',
  '/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times',
  '/collections/calendars',
  '/pages/about',
  '/pages/search-results-page?q=test'
];

const viewports = [
  { width: 1920, height: 1080 }, // Desktop
  { width: 768, height: 1024 },  // Tablet
  { width: 375, height: 667 }    // Mobile
];

async function run() {
  const browser = await chromium.launch();
  let allRanges = [];
  let originalCssText = '';

  for (const viewport of viewports) {
    for (const p of paths) {
      console.log(`Analyzing ${p} at ${viewport.width}x${viewport.height}...`);
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      
      await page.coverage.startCSSCoverage();
      await page.goto(BASE_URL + p, { waitUntil: 'networkidle' });

      // Scroll to trigger lazy loaded CSS
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(2000);

      const coverage = await page.coverage.stopCSSCoverage();
      
      for (const entry of coverage) {
        if (entry.url.includes('theme.css')) {
          if (!originalCssText) {
             originalCssText = entry.text;
          }
          allRanges.push(...entry.ranges);
        }
      }
      await context.close();
    }
  }

  await browser.close();

  if (!originalCssText) {
    console.error('Could not find theme.css in coverage.');
    return;
  }

  // Merge overlapping ranges
  allRanges.sort((a, b) => a.start - b.start);
  const mergedRanges = [];
  if (allRanges.length > 0) {
    let current = Object.assign({}, allRanges[0]);
    for (let i = 1; i < allRanges.length; i++) {
      if (allRanges[i].start <= current.end) {
        current.end = Math.max(current.end, allRanges[i].end);
      } else {
        mergedRanges.push(current);
        current = Object.assign({}, allRanges[i]);
      }
    }
    mergedRanges.push(current);
  }

  // Extract used CSS
  let usedCss = '';
  for (const range of mergedRanges) {
    usedCss += originalCssText.substring(range.start, range.end) + '\n';
  }

  console.log(`Original size: ${originalCssText.length}`);
  console.log(`Used size from coverage: ${usedCss.length}`);

  console.log('Parsing with PostCSS to preserve pseudo-classes/elements...');
  const root = postcss.parse(originalCssText);
  const pseudoRoot = postcss.root();

  // Also catch javascript dynamic state classes like .is-active, .has-, .js-
  root.walkRules(rule => {
    if (
      rule.selector.includes(':') || 
      rule.selector.includes('.is-') || 
      rule.selector.includes('.has-') ||
      rule.selector.includes('.js-')
    ) {
      if (rule.parent && rule.parent.type === 'atrule') {
        // If it is inside a media query, wrap it!
        const atRule = postcss.atRule({ name: rule.parent.name, params: rule.parent.params });
        atRule.append(rule.clone());
        pseudoRoot.append(atRule);
      } else {
        pseudoRoot.append(rule.clone());
      }
    }
  });

  const pseudoCss = pseudoRoot.toString();
  console.log(`Appended ${pseudoCss.length} bytes of pseudo-class rules.`);

  const finalCss = usedCss + '\n/* --- INTERACTIVE & PSEUDO-CLASSES --- */\n' + pseudoCss;
  console.log(`Final optimized size: ${finalCss.length} bytes.`);

  fs.writeFileSync('assets/theme.css.liquid', finalCss);
  console.log('Saved updated CSS to assets/theme.css.liquid');
}

run().catch(console.error);
