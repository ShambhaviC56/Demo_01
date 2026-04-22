const { test, expect } = require('@playwright/test');

test('TC520 - User should be able to login with valid credentials', async ({ page }) => {
  const username = 'user@example.com';
  const password = 'Pass123'; // Using a sample valid password as per precondition
  const baseUrl = 'https://app.example.com/login'; // Inferred base URL for login page

  // Pre-Step: Navigate to the application login page
  console.log(`Navigating to login page: ${baseUrl}`);
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  console.log('✓ Login page loaded successfully.');

  // Step 1: Enter application username (e.g., 'user@example.com') in the username field
  console.log(`Step 1: Entering username: ${username}`);
  await page.locator('#username').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('#username').fill(username);
  console.log('✓ Username entered.');

  // Step 2: Enter [CREDENTIAL] in the password field
  console.log('Step 2: Entering password (masked)');
  await page.locator('#password').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('#password').fill(password);
  console.log('✓ Password entered.');

  // Step 3: Click the 'Login' button
  console.log('Step 3: Clicking Login button');
  await page.locator('//button[@type="submit"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('//button[@type="submit"]').click();
  console.log('✓ Login button clicked. Waiting for navigation...');

  // 4. Verify that the user is successfully logged in and redirected to the application's Dashboard or Home page
  console.log('Step 4: Verifying successful login and redirection to Dashboard/Home page');
  // Wait for network idle state to ensure the new page is fully loaded
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  // Verify a specific dashboard element is visible
  await page.locator('.dashboard-header').waitFor({ state: 'visible', timeout: 15000 });
  await expect(page.locator('.dashboard-header')).toBeVisible({ timeout: 10000 });
  console.log('✓ Dashboard header element is visible.');
  
  // Verify the page title changes to 'Dashboard Title'
  await expect(page).toHaveTitle('Dashboard Title', { timeout: 10000 });
  console.log('✓ Page title verified as "Dashboard Title". User successfully logged in.');
});