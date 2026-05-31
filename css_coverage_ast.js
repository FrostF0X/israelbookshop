const { chromium } = require('playwright');
const fs = require('fs');
const postcss = require('postcss');

const BASE_URL = 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com';
const paths = [
  '/',
  '/cart',
  '/pages/about',
  '/pages/contact',
  '/pages/privacy-policy',
  '/pages/search-results-page?q=test',
  '/policies/shipping-policy',
  '/policies/refund-policy',
  '/policies/terms-of-service',
  '/collections/calendars',
  '/collections/educational-resources',
  '/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times'
];

const viewports = [
  { width: 1920, height: 1080 }, // Desktop
  { width: 768, height: 1024 },  // Tablet
  { width: 375, height: 667 }    // Mobile
];

async function run() {
  console.log('Launching local Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  let allRanges = [];
  let originalCssText = '';

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    for (const p of paths) {
      console.log(`Analyzing ${p} at ${viewport.width}x${viewport.height}...`);
      const page = await context.newPage();
      
      await page.coverage.startCSSCoverage();
      await page.goto(BASE_URL + p, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(2000);

      // No scrolling

      const coverage = await page.coverage.stopCSSCoverage();
      
      for (const entry of coverage) {
        if (entry.url.includes('theme.css')) {
          if (!originalCssText) {
             originalCssText = entry.text;
          }
          allRanges.push(...entry.ranges);
        }
      }
      await page.close();
    }
    await context.close();
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
  console.log('Parsing CSS into AST with PostCSS...');
  const root = postcss.parse(originalCssText);

  let removedRules = 0;
  let keptRules = 0;

  root.walkRules(rule => {
    if (
      rule.selector.includes(':') || 
      rule.selector.includes('.is-') || 
      rule.selector.includes('.has-') ||
      rule.selector.includes('.js-') ||
      rule.selector.includes('.slick-')
    ) {
      keptRules++;
      return; 
    }

    const ruleStart = rule.source.start.offset;
    const ruleEnd = rule.source.end.offset;

    let isUsed = false;
    for (const range of mergedRanges) {
      if (ruleStart <= range.end && ruleEnd >= range.start) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed) {
      rule.remove(); 
      removedRules++;
    } else {
      keptRules++;
    }
  });

  root.walkAtRules(atRule => {
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove();
    }
  });

  const finalCss = root.toString();
  console.log(`AST Pruning Complete: Removed ${removedRules} rules, Kept ${keptRules} rules.`);
  console.log(`Final Optimized Size: ${finalCss.length} bytes`);

  fs.writeFileSync('assets/theme.css.liquid', finalCss);
  fs.writeFileSync('assets/theme.css', finalCss);
  console.log('Successfully overwrote assets/theme.css.liquid and assets/theme.css');
}

run().catch(console.error);
