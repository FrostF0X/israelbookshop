const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/collections/calendars');
  // Log the classes of elements that contain a price
  const priceElements = await page.$$eval('.price, [class*="price"], .money', els => els.map(e => e.className).slice(0, 5));
  console.log('Price classes:', priceElements);
  
  // Find product links
  const links = await page.$$eval('a[href*="/products/"]', els => els.map(e => ({ href: e.href, class: e.className })).slice(0, 5));
  console.log('Product links:', links);
  
  await browser.close();
})();
