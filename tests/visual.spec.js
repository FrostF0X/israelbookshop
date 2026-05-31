const { test, expect } = require('@playwright/test');

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

test.describe('Visual Regression Tests', () => {
  for (const p of paths) {
    const safeName = p === '/' ? 'homepage' : p.replace(/\//g, '_').substring(1);

    test(`should load ${p} successfully and match baseline screenshot`, async ({ page }) => {
      test.setTimeout(90000); 

      // Navigate to the page with 'load' instead of 'networkidle' to prevent hanging on tracking pixels
      await page.goto(p, { waitUntil: 'load', timeout: 60000 });

      // Wait a moment for dynamic CSS or JS to kick in
      await page.waitForTimeout(2000);

      // Smoothly scroll down the page to trigger intersection observers for lazy-loaded images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 300; 
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight - window.innerHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 150); 
        });
      });
      
      // Wait for lazy-loaded images to fetch
      await page.waitForTimeout(3000);
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Full page screenshot assertion
      await expect(page).toHaveScreenshot(`${safeName}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05, // Allow slight differences (5%)
        timeout: 60000 
      });
    });
  }
});
