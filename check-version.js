const https = require('https');

const url = process.argv[2] || 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com/';

console.log(`🔍 Checking theme version at: ${url}\n`);

fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
})
  .then(res => res.text())
  .then(data => {
    const metaTagMatch = data.match(/<meta\s+name="theme-version"\s+content="([^"]+)">/);
    if (metaTagMatch && metaTagMatch[1]) {
      console.log(`✅ Success! Found custom theme version: ${metaTagMatch[1]}`);
    } else {
      console.log(`❌ Could not find custom 'theme-version' meta tag. The deployment might not have synced yet.`);
    }
  })
  .catch(err => {
    console.log("Error: " + err.message);
  });
