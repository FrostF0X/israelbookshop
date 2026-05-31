import fs from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const path = process.argv[2] || '/';
const safeName = process.argv[3] || 'homepage';
const url = `https://kukr29uk66duhr1k-55888609445.shopifypreview.com${path}`;
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
  fs.writeFileSync(`lighthouse-report-${safeName}.html`, reportHtml);
  fs.writeFileSync(`lighthouse-report-${safeName}.json`, reportJson);

  // Print results
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices score was', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const runId = process.env.GITHUB_RUN_ID;
    const reportUrlHtml = runId 
      ? `https://FrostF0X.github.io/israelbookshop/lighthouse-reports-${runId}/lighthouse-report-${safeName}.html` 
      : `https://FrostF0X.github.io/israelbookshop/lighthouse-report-${safeName}.html`;
    const reportUrlJson = runId 
      ? `https://FrostF0X.github.io/israelbookshop/lighthouse-reports-${runId}/lighthouse-report-${safeName}.json` 
      : `https://FrostF0X.github.io/israelbookshop/lighthouse-report-${safeName}.json`;

    const summary = `### Lighthouse Results for [${safeName}](${runnerResult.lhr.finalDisplayedUrl})
- **Performance:** ${Math.round(runnerResult.lhr.categories.performance.score * 100)}
- **Accessibility:** ${Math.round(runnerResult.lhr.categories.accessibility.score * 100)}
- **Best Practices:** ${Math.round(runnerResult.lhr.categories['best-practices'].score * 100)}
- **SEO:** ${Math.round(runnerResult.lhr.categories.seo.score * 100)}

🔗 **[View Historical HTML Report for this Run](${reportUrlHtml})**
🔗 **[View Historical JSON Report for this Run](${reportUrlJson})**
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  await browser.close();
}

runLighthouse();
