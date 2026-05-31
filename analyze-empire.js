const fs = require('fs');
const https = require('https');

https.get('https://frostf0x.github.io/israelbookshop/lighthouse-reports-26717366695/lighthouse-report-homepage.json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const report = JSON.parse(body);
    const audits = report.audits;
    console.log("Analyzing empire.js...\n");
    for (const [auditId, audit] of Object.entries(audits)) {
      if (!audit.details || !audit.details.items) continue;
      
      const empireItems = audit.details.items.filter(item => {
        return item.url && item.url.includes('empire.js') ||
               item.source && item.source.url && item.source.url.includes('empire.js') ||
               item.scriptUrl && item.scriptUrl.includes('empire.js');
      });
      
      if (empireItems.length > 0) {
        console.log(`\n--- Audit: ${auditId} ---`);
        console.log(`Title: ${audit.title}`);
        console.log(`Description: ${audit.description}`);
        console.log(JSON.stringify(empireItems, null, 2));
      }
    }
  });
}).on('error', (e) => {
  console.error(e);
});
