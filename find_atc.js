const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times');
  
  // Find Add to Cart buttons
  const buttons = await page.$$eval('button', els => els.filter(e => e.innerText.toLowerCase().includes('cart') || e.className.includes('add')).map(e => ({ text: e.innerText, class: e.className })).slice(0, 5));
  console.log('Cart buttons:', buttons);
  
  await browser.close();
})();
