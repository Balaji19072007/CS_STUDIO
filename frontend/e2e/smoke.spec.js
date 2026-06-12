import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CS Studio/);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    // Check for common navigation elements
    const nav = page.locator('nav, header, [role="navigation"]');
    await expect(nav).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    // Find theme toggle button
    const themeBtn = page.locator('button:has(svg), button:has(.theme-icon), [aria-label*="theme" i], [aria-label*="dark" i]');
    if (await themeBtn.count() > 0) {
      await themeBtn.first().click();
      // Verify theme changed
      const html = page.locator('html');
      const hasDark = await html.evaluate(el => el.classList.contains('dark'));
      expect(hasDark).toBe(true);
      // Toggle back
      await themeBtn.first().click();
    }
  });

  test('page is responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
