const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.url().includes('cart')) {
      console.log('Cart network response:', response.url(), response.status());
    }
  });

  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times');
  
  await page.click('button:has-text("Add to cart"), button:has-text("Add to Cart")');
  await page.waitForTimeout(3000); // Wait to see what happens
  
  await browser.close();
})();
