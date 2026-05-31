const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('Starting JS coverage...');
  // Enable both JavaScript and CSS coverage
  await Promise.all([
    page.coverage.startJSCoverage(),
  ]);

  const url = 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com/';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  console.log('Scrolling to trigger lazy loads...');
  // Scroll down to trigger any scroll-based interactions
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  console.log('Stopping JS coverage...');
  const jsCoverage = await page.coverage.stopJSCoverage();

  let empireCoverage = null;
  
  for (const entry of jsCoverage) {
    if (entry.url.includes('empire.js')) {
      empireCoverage = entry;
      break;
    }
  }

  if (empireCoverage) {
    let totalBytes = empireCoverage.text.length;
    let usedBytes = 0;

    for (const range of empireCoverage.ranges) {
      usedBytes += range.end - range.start;
    }

    const unusedBytes = totalBytes - usedBytes;
    const unusedPercentage = ((unusedBytes / totalBytes) * 100).toFixed(2);

    console.log(`\n--- Coverage Results for empire.js ---`);
    console.log(`Total Bytes: ${totalBytes}`);
    console.log(`Used Bytes:  ${usedBytes}`);
    console.log(`Unused Bytes: ${unusedBytes} (${unusedPercentage}%)`);
    
    fs.writeFileSync('empire_coverage.json', JSON.stringify(empireCoverage, null, 2));
    console.log(`\nDetailed coverage ranges saved to empire_coverage.json`);
  } else {
    console.log('empire.js not found in coverage data.');
  }

  await browser.close();
})();
