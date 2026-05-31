const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load successfully and match baseline screenshot', async ({ page }) => {
    test.setTimeout(60000); // Increase total test timeout to 60 seconds

    // Navigate to the homepage
    await page.goto('/');

    // Wait for network to be idle to ensure assets are loaded
    await page.waitForLoadState('networkidle');

    // Smoothly scroll down the page to trigger intersection observers for lazy-loaded images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 150; // Scroll by 150px chunks
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          // Stop scrolling when we reach the bottom
          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 150); // Pause 150ms between scrolls
      });
    });
    
    // Give lazy-loaded images a moment to start requesting and wait for network to settle
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // Scroll back to top before taking the screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    // Pause briefly to ensure UI repaints after jumping to top
    await page.waitForTimeout(500);

    // Take a screenshot of the entire page and compare it to the baseline
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05, // Allow slight differences (5%)
      timeout: 30000 // Increase timeout for full page screenshot generation
    });
  });
});
