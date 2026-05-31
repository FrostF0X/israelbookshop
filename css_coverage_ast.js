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

  console.log(`Original CSS Size: ${originalCssText.length} bytes`);

  // Parse original text into an AST
  console.log('Parsing CSS into AST with PostCSS...');
  const root = postcss.parse(originalCssText);

  // Walk all rules
  let removedRules = 0;
  let keptRules = 0;

  root.walkRules(rule => {
    // 1. Unconditional preservation of pseudo-classes and dynamic states
    if (
      rule.selector.includes(':') || 
      rule.selector.includes('.is-') || 
      rule.selector.includes('.has-') ||
      rule.selector.includes('.js-') ||
      rule.selector.includes('.slick-')
    ) {
      keptRules++;
      return; // Keep it
    }

    // 2. Cross-reference AST node offset with Playwright used byte ranges
    // PostCSS node.source.start/end might not strictly have offset in all versions, 
    // but in postcss 8 it does. If not, we fallback to string matching.
    const ruleStart = rule.source.start.offset;
    const ruleEnd = rule.source.end.offset;

    let isUsed = false;

    // Check if the exact node offset overlaps with any known used range
    for (const range of mergedRanges) {
      if (ruleStart <= range.end && ruleEnd >= range.start) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed) {
      rule.remove(); // Safely prune it from the AST! (Preserves @media wrapper)
      removedRules++;
    } else {
      keptRules++;
    }
  });

  // Clean up empty @media or @supports rules that have had all their children pruned
  root.walkAtRules(atRule => {
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove();
    }
  });

  const finalCss = root.toString();
  console.log(`AST Pruning Complete: Removed ${removedRules} rules, Kept ${keptRules} rules.`);
  console.log(`Final Optimized Size: ${finalCss.length} bytes`);

  fs.writeFileSync('assets/theme.css.liquid', finalCss);
  console.log('Successfully overwrote assets/theme.css.liquid');
}

run().catch(console.error);
