const { chromium } = require('playwright');
const path = require('path');

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

(async () => {
  console.log('Connecting to Browserless...');
  const browser = await chromium.connectOverCDP('wss://chrome.browserless.io?token=2UcBGAA9ENAL1nZ54f87ae74b491a891b674b46c1802f0ef9');
  
  async function takeScreenshot(p) {
    console.log(`Starting screenshot for ${p}...`);
    const page = await browser.newPage();
    try {
      await page.goto(BASE_URL + p, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(2000);
      
      const safeName = p === '/' ? 'homepage' : p.replace(/\//g, '_').substring(1);
      const screenshotPath = path.join(__dirname, `screenshot_${safeName}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      
      console.log(`Saved ${screenshotPath}`);
    } catch (e) {
      console.error(`Failed to screenshot ${p}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  // Process in batches of 2 (2x concurrency)
  const batchSize = 2;
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    console.log(`\n--- Processing Batch: ${batch.join(', ')} ---`);
    await Promise.all(batch.map(takeScreenshot));
  }
  
  await browser.close();
  console.log('All screenshots completed!');
})();
