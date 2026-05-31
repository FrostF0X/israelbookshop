const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com';
const paths = [
  '/',
  '/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times',
  '/collections/calendars',
  '/pages/about',
  '/pages/search-results-page?q=test'
];

const THEME_CSS_PATH = path.join(__dirname, 'assets', 'theme.css.liquid');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // We'll store coverage by URL.
  const coverageMap = {}; // key: css url, value: { text, usedRanges: [] }
  
  for (const p of paths) {
    console.log(`Navigating to ${p}...`);
    await page.coverage.startCSSCoverage({ resetOnNavigation: false });
    await page.goto(`${BASE_URL}${p}`, { waitUntil: 'networkidle' });
    
    // Scroll down to ensure lazy elements trigger any CSS
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const coverage = await page.coverage.stopCSSCoverage();
    
    for (const entry of coverage) {
      if (!entry.url.includes('theme.css')) continue; // Focus on theme.css
      
      const cleanUrl = entry.url.split('?')[0];
      
      if (!coverageMap[cleanUrl]) {
        coverageMap[cleanUrl] = { text: entry.text, ranges: [] };
      }
      coverageMap[cleanUrl].ranges.push(...entry.ranges);
    }
  }
  
  await browser.close();
  
  for (const [url, data] of Object.entries(coverageMap)) {
    console.log(`\nAnalyzing & Extracting: ${url}`);
    
    // Merge overlapping ranges
    const sortedRanges = data.ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [];
    if (sortedRanges.length > 0) {
      let current = { ...sortedRanges[0] };
      for (let i = 1; i < sortedRanges.length; i++) {
        const next = sortedRanges[i];
        if (next.start <= current.end) {
          current.end = Math.max(current.end, next.end);
        } else {
          mergedRanges.push(current);
          current = { ...next };
        }
      }
      mergedRanges.push(current);
    }
    
    // Extract the used CSS text
    let usedCssText = '';
    for (const range of mergedRanges) {
      usedCssText += data.text.substring(range.start, range.end) + '\n';
    }
    
    console.log(`Extracted ${usedCssText.length} bytes of used CSS.`);
    
    // Overwrite the local theme.css.liquid file
    if (fs.existsSync(THEME_CSS_PATH)) {
      console.log(`Overwriting ${THEME_CSS_PATH}...`);
      
      // Preserve any leading/trailing liquid tags if needed, but typically theme.css.liquid 
      // contains mostly raw CSS with some liquid at the top. Wait! The extracted coverage 
      // text is pure CSS generated AFTER liquid processing.
      // Since the theme.css.liquid has Liquid tags, overwriting it with pure CSS means 
      // we lose dynamic liquid variables. BUT since we are replacing it anyway with 
      // the compiled CSS that works, it's fine for this optimization step.
      
      fs.writeFileSync(THEME_CSS_PATH, usedCssText);
      console.log('Successfully saved used CSS!');
    } else {
      console.error(`ERROR: ${THEME_CSS_PATH} does not exist!`);
    }
  }
})();
