const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/');
  const links = await page.$$eval('a', els => els.map(e => ({ text: e.innerText.trim(), href: e.href })).filter(e => e.text && e.href.includes('/collections/')));
  console.log(JSON.stringify(links.slice(0, 10), null, 2));
  await browser.close();
})();
