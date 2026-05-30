# Antigravity Agent Instructions

Welcome, Agent! You are working on the Shopify Theme for `israelbookshop.com`.
Before you begin, please review the current state and tools available in this workspace.

## Execution Environment
- **Node.js**: Node is already in the execution path. You do **not** need to source `nvm` before running node commands (e.g., `node script.js` or `npm run ...` will work directly).
- **Git**: Version control is configured. The remote is `origin git@github.com:FrostF0X/israelbookshop.git`. Ensure you use standard Git workflow to track changes.

## Available Utility Scripts
We have built custom scripts to assist with testing and verification in this project. Use them instead of building new ones:

### 1. Theme Version Checker
A script to verify if a Shopify URL is running the latest deployed code by checking for a custom `<meta name="theme-version">` tag.
- **Command**: `node check-version.js [URL]`
- **Default URL**: If no URL is provided, it defaults to the preview URL: `https://kukr29uk66duhr1k-55888609445.shopifypreview.com/`

### 2. Lighthouse Performance Analyzer
A wrapper script that runs Google Lighthouse against the preview URL and outputs a `lighthouse-report.json`.
- **Command**: `npm run analyze`
- **Follow-up**: After the report finishes, you can parse the JSON output to find specific bottlenecks using Node. Example:
  ```javascript
  node -e "const r = require('./lighthouse-report.json'); console.log(r.audits['unused-javascript'].details.items);"
  ```

## Development Workflow
1. **Pulling Changes**: If you need the latest live theme, use `shopify theme pull`. *Warning: This will overwrite local unpushed changes!*
2. **Optimizing**: We are focusing on Core Web Vitals. Common fixes include replacing `img_url: 'master'` with `image_url` and `image_tag: loading: 'lazy'`, and eliminating duplicate scripts (like jQuery).
3. **Deploying**: Once changes are made locally, commit and push them to the `main` branch. Shopify GitHub integration will automatically sync the changes to the preview theme.
4. **Verification**: Run `node check-version.js` to ensure the preview theme has synced your latest changes, then run `npm run analyze` to measure the performance impact.
