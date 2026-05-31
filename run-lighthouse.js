import fs from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const url = process.argv[2] || 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com/';
const options = {
  logLevel: 'info',
  output: ['html', 'json'],
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

  // `.report` is an array of reports: [html, json]
  const reportHtml = runnerResult.report[0];
  const reportJson = runnerResult.report[1];
  fs.writeFileSync('lighthouse-report.html', reportHtml);
  fs.writeFileSync('lighthouse-report.json', reportJson);

  // Print results
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices score was', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const runId = process.env.GITHUB_RUN_ID;
    const reportUrl = runId 
      ? `https://FrostF0X.github.io/israelbookshop/lighthouse-report-${runId}.html` 
      : 'https://FrostF0X.github.io/israelbookshop/lighthouse-report.html';

    const summary = `### Lighthouse Results for ${runnerResult.lhr.finalDisplayedUrl}
- **Performance:** ${Math.round(runnerResult.lhr.categories.performance.score * 100)}
- **Accessibility:** ${Math.round(runnerResult.lhr.categories.accessibility.score * 100)}
- **Best Practices:** ${Math.round(runnerResult.lhr.categories['best-practices'].score * 100)}
- **SEO:** ${Math.round(runnerResult.lhr.categories.seo.score * 100)}

🔗 **[View Historical HTML Report for this Run](${reportUrl})**
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  await browser.close();
}

runLighthouse();
