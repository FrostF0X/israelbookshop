const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run tests in parallel with 2 workers */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Route tests through Browserless */
    connectOptions: {
      wsEndpoint: 'wss://chrome.browserless.io?token=2UcBGAA9ENAL1nZ54f87ae74b491a891b674b46c1802f0ef9'
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://kukr29uk66duhr1k-55888609445.shopifypreview.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // We can add Firefox and WebKit later if needed, starting with chromium for speed
  ],
});
