const { test, expect } = require('@playwright/test');

test('TC314: Verify Opportunity Creation with Invalid Data in Specific Fields (Close Date in Past)', async ({ page }) => {
  const baseUrl = 'https://crm.example.com'; // Placeholder base URL, assuming a CRM application

  // Step 1: Navigate to the Opportunities section/page
  console.log('Step 1: Navigating to the Opportunities section/page');
  // Assuming a direct URL to the Opportunities list page for initial navigation
  await page.goto(baseUrl + '/opportunities', { waitUntil: 'networkidle', timeout: 30000 });
  // Verify Opportunities page is displayed (Expected Result 1)
  await expect(page).toHaveURL(/.*opportunities/);
  console.log('✓ Opportunities page displayed.');

  // Step 2: Click on the 'New Opportunity' or 'Create Opportunity' button
  console.log('Step 2: Clicking on the New Opportunity button');
  // Using .or() as per instruction if multiple locators are given implicitly
  const newOpportunityButton = page.getByRole('button', { name: 'New Opportunity' }).or(page.getByRole('button', { name: 'Create Opportunity' })).first();
  await newOpportunityButton.waitFor({ state: 'visible', timeout: 10000 });
  await newOpportunityButton.click();
  // Verify New Opportunity form is displayed (Expected Result 2)
  await page.locator('h1', { hasText: 'New Opportunity' }).waitFor({ state: 'visible', timeout: 30000 });
  console.log('✓ New Opportunity form displayed.');

  // Step 3: Enter 'Test Opportunity' into the Opportunity Name field
  console.log('Step 3: Entering Opportunity Name');
  const opportunityNameField = page.getByLabel('Opportunity Name');
  await opportunityNameField.waitFor({ state: 'visible', timeout: 10000 });
  await opportunityNameField.fill('Test Opportunity');
  // Verify 'Test Opportunity' is entered (Expected Result 3)
  await expect(opportunityNameField).toHaveValue('Test Opportunity');
  console.log('✓ Opportunity Name entered: Test Opportunity');

  // Step 4: Enter 'Edge Communications' into the Account Name field
  console.log('Step 4: Entering Account Name');
  const accountNameField = page.getByLabel('Account Name');
  await accountNameField.waitFor({ state: 'visible', timeout: 10000 });
  await accountNameField.fill('Edge Communications');
  // Verify 'Edge Communications' is entered (Expected Result 4)
  await expect(accountNameField).toHaveValue('Edge Communications');
  console.log('✓ Account Name entered: Edge Communications');

  // Step 5: Enter '10/10/2022' into the Close Date field
  console.log('Step 5: Entering Close Date in the past');
  const closeDateField = page.getByLabel('Close Date');
  await closeDateField.waitFor({ state: 'visible', timeout: 10000 });
  await closeDateField.fill('10/10/2022');
  // Verify '10/10/2022' is entered (Expected Result 5)
  await expect(closeDateField).toHaveValue('2022-10-10'); // Date format might change upon fill based on browser/input type
  console.log('✓ Close Date entered: 10/10/2022');

  // Step 6: Click on the 'Save' button
  console.log('Step 6: Clicking Save button');
  const saveButton = page.getByRole('button', { name: 'Save' });
  await saveButton.waitFor({ state: 'visible', timeout: 10000 });
  await saveButton.click();
  console.log('✓ Attempted to save the opportunity.');

  // Step 7: Verify that an error message is displayed on the screen (Expected Result 7)
  console.log('Step 7: Verifying error message is displayed');
  const errorMessage = page.locator('.error-message'); // Common locator for error messages
  await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
  await expect(errorMessage).toBeVisible();
  console.log('✓ Error message display area is visible.');

  // Step 8: Verify that the error message contains the text 'Close Date must be today or later' (Expected Result 8)
  console.log('Step 8: Verifying error message text content');
  await expect(errorMessage).toContainText('Close Date must be today or later', { timeout: 10000 });
  console.log('✓ Error message contains expected text: Close Date must be today or later');
});