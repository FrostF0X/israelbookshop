import fs from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const url = process.argv[2] || 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com/';
const options = {
  logLevel: 'info',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  port: (new URL('http://localhost:8041')).port
};

async function runLighthouse() {
  console.log(`Starting Lighthouse analysis for ${url}...`);
  // Launch chrome using puppeteer
  const browser = await puppeteer.launch({
    args: ['--remote-debugging-port=8041', '--no-sandbox']
  });

  // Run Lighthouse
  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  const reportJson = runnerResult.report;
  fs.writeFileSync('lighthouse-report.json', reportJson);

  // Print results
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices score was', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);

  await browser.close();
}

runLighthouse();
