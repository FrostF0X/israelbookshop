const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://kukr29uk66duhr1k-55888609445.shopifypreview.com/');
  
  // Find top level header elements that contain lists
  const navItems = await page.$$eval('header nav ul li, .header nav ul li, .site-header nav ul li', els => {
    return els.map(el => {
      const link = el.querySelector('a');
      const dropdown = el.querySelector('ul, .dropdown');
      return {
        text: link ? link.innerText.trim() : '',
        hasDropdown: !!dropdown,
        dropdownLinks: dropdown ? Array.from(dropdown.querySelectorAll('a')).map(a => a.innerText.trim()).slice(0, 3) : [],
        class: el.className
      };
    }).filter(i => i.text && i.hasDropdown);
  });
  
  console.log('Using generic li selectors:', JSON.stringify(navItems, null, 2));

  // If empty, let's just grab all visible links in the header
  const headerLinks = await page.$$eval('header a, .site-header a, .header a', els => {
    return els.map(el => el.innerText.trim()).filter(t => t);
  });
  console.log('Header links:', headerLinks.slice(0, 10));

  await browser.close();
})();
