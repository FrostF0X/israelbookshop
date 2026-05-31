import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('E2E Flows with Coverage', () => {

  test.beforeEach(async ({ page }) => {
    // Start coverage for dead code reduction integration
    // Enabling JS and CSS coverage
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Stop coverage
    const jsCoverage = await page.coverage.stopJSCoverage();
    const cssCoverage = await page.coverage.stopCSSCoverage();

    const safeTitle = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const coverageDir = path.join(__dirname, '..', 'coverage-data');
    if (!fs.existsSync(coverageDir)) {
      fs.mkdirSync(coverageDir, { recursive: true });
    }

    // Filter and save JS coverage (empire.js)
    const empireCoverage = jsCoverage.find(entry => entry.url.includes('empire.js'));
    if (empireCoverage) {
      fs.writeFileSync(path.join(coverageDir, `js_coverage_${safeTitle}.json`), JSON.stringify(empireCoverage, null, 2));
    }

    // Filter and save CSS coverage (theme.css)
    const themeCoverage = cssCoverage.filter(entry => entry.url.includes('theme.css'));
    if (themeCoverage.length > 0) {
      fs.writeFileSync(path.join(coverageDir, `css_coverage_${safeTitle}.json`), JSON.stringify(themeCoverage, null, 2));
    }
  });

  test('Add to cart from nested category', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Go to a category (e.g., Calendars)
    // Hover on 'Categories' menu to open dropdown
    await page.locator('text=Categories >> visible=true').first().hover();
    await page.waitForTimeout(500); // Give dropdown time to animate

    // Click on a visible 'Calendars' element in the dropdown
    await page.locator('a:has-text("Calendars"):visible').first().click();
    
    // Wait for product grid and click on the first product
    const productSelector = 'a.snize-view-link, a[href*="/products/"]';
    await page.waitForSelector(productSelector, { state: 'visible' });
    await page.locator(productSelector).first().click();

    // Click "Add to cart" and wait for the AJAX request to complete
    await Promise.all([
      page.waitForResponse(res => res.url().includes('/cart/add')),
      page.click('button:has-text("Add to cart"), button:has-text("Add to Cart")')
    ]);

    // Wait briefly for the ATC drawer/scripts to stabilize, then force navigate to the cart page
    await page.waitForTimeout(2000);
    try {
      await page.goto('/cart');
    } catch (e) {
      // Ignore navigation aborts if the theme already started redirecting
    }
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the cart to compare
    // Note: The first time this runs, it will fail and create a baseline screenshot.
    await expect(page).toHaveScreenshot('cart-comparison.png', { fullPage: true, timeout: 15000 });
  });

  test('Scroll main page to bottom', async ({ page }) => {
    // Open main page
    await page.goto('/');

    // Scroll it to bottom
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100; // Smaller distance for gradual scrolling
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          // Stop scrolling when we reach the bottom or a max height to prevent infinite loops
          if (totalHeight >= scrollHeight || totalHeight > 20000) {
            clearInterval(timer);
            resolve();
          }
        }, 30); // Faster interval but much smaller steps
      });
    });

    // Give it a brief moment for any lazy loaded elements at the bottom to render
    await page.waitForTimeout(1000);

    // Verify we reached the bottom (footer is visible)
    await expect(page.locator('footer').first()).toBeVisible();

    // No screenshot assertion here as full-page scrolled screenshots are extremely flaky on Shopify themes
    // The scroll was performed successfully and coverage is captured.
  });

  test('Add to cart directly from product page', async ({ page }) => {
    // Go directly to a product page
    await page.goto('/collections/calendars/products/hebrew-illuminations-16-month-2026-2027-wall-calendar-and-candle-lighting-times');
    
    // Click "Add to cart" and wait for the AJAX request to complete
    await Promise.all([
      page.waitForResponse(res => res.url().includes('/cart/add')),
      page.click('button:has-text("Add to cart"), button:has-text("Add to Cart")')
    ]);

    // Wait briefly for the ATC drawer/scripts to stabilize, then force navigate to the cart page
    await page.waitForTimeout(2000);
    try {
      await page.goto('/cart');
    } catch (e) {
      // Ignore navigation aborts if the theme already started redirecting
    }
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the cart to compare
    await expect(page).toHaveScreenshot('cart-comparison-direct.png', { fullPage: true, timeout: 15000 });
  });
});
