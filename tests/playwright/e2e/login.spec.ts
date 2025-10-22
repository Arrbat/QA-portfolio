import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Register new user redirects to tasks', async ({ page }) => {
  const username = `user_${Date.now()}`;
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder="Login"]', username);
  await page.fill('input[placeholder="Password"]', 'TESTPASSWORD');
  await page.click('button:has-text("Register")');
  await expect(page).toHaveURL(/.*\/tasks/);
});

test('Login with existing user redirects to tasks', async ({ page }) => {
  const username = `user_${Date.now()}`;
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder="Login"]', username);
  await page.fill('input[placeholder="Password"]', 'TESTPASSWORD');
  await page.click('button:has-text("Register")');
  await expect(page).toHaveURL(/.*\/tasks/);

  // Simulate logout by navigating back to login page
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder="Login"]', username);
  await page.fill('input[placeholder="Password"]', 'TESTPASSWORD');
  await page.click('button:has-text("Login")');
  await expect(page).toHaveURL(/.*\/tasks/);
});

test('Login non-existing user', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder="Login"]', 'WRONGUSER');
  await page.fill('input[placeholder="Password"]', 'WRONGPASSWORD');
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=User not found.')).toBeVisible();
});

test('Login without entered credentials', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder="Login"]', '');
  await page.fill('input[placeholder="Password"]', '');
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=Login and password required.')).toBeVisible();
});