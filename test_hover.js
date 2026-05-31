const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/');
  
  await page.locator('text=Categories').first().hover();
  await page.waitForTimeout(1000); // Wait for animation
  
  // Try to find a visible link inside the dropdown or just globally
  const visibleLinks = await page.$$eval('a:has-text("Calendars")', els => els.filter(e => {
    const style = window.getComputedStyle(e);
    return style.display !== 'none' && style.visibility !== 'hidden' && e.offsetWidth > 0;
  }).map(e => ({ href: e.href, class: e.className })));
  
  console.log('Visible Calendars links after hover:', visibleLinks);

  await browser.close();
})();
