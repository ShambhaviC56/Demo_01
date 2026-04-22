import { test, expect, Page, Locator } from '@playwright/test';

test.describe('Opportunity Management', () => {
  const BASE_URL: string = process.env.PLAYWRIGHT_BASE_URL || 'https://your-application-url.com'; // TODO: Configure BASE_URL appropriately

  test('TC314 - Verify Opportunity Creation with Invalid Data (Close Date in Past)', async ({ page }: { page: Page }) => {
    // Preconditions:
    // 1. Chrome browser installed (handled by Playwright setup)
    // 2. Valid application credentials (assume user is already logged in or login step precedes this test)
    // 3. Network access to the application (handled by environment)

    console.log('Step 1: Navigate to the Opportunity creation page');
    // TODO: Replace with the actual URL path or route to the opportunity creation page
    await page.goto(`${BASE_URL}/opportunities/create`, { waitUntil: 'networkidle' });
    // Expected Result 1: User is on the Opportunity creation page
    // Verify by checking URL or a unique element on the page
    await expect(page).toHaveURL(/.*opportunities\/create/);
    const pageHeader: Locator = page.locator('h1', { hasText: 'Create New Opportunity' }); // TODO: Adjust locator for page header/title
    await expect(pageHeader).toBeVisible();
    console.log('Verification: User is on the Opportunity creation page.');

    console.log("Step 2: Enter 'Test Opportunity' into the Opportunity Name field");
    // TODO: Replace with the actual locator for the Opportunity Name field
    const opportunityNameField: Locator = page.getByLabel('Opportunity Name', { exact: true }); // Example: by label
    await expect(opportunityNameField).toBeVisible();
    await opportunityNameField.fill('Test Opportunity');
    // Expected Result 2: 'Test Opportunity' is entered into the Opportunity Name field
    await expect(opportunityNameField).toHaveValue('Test Opportunity');
    console.log("Verification: 'Test Opportunity' entered into Opportunity Name field.");

    console.log("Step 3: Enter 'Edge Communications' into the Account Name field");
    // TODO: Replace with the actual locator for the Account Name field
    const accountNameField: Locator = page.getByLabel('Account Name', { exact: true }); // Example: by label
    await expect(accountNameField).toBeVisible();
    await accountNameField.fill('Edge Communications');
    // Expected Result 3: 'Edge Communications' is entered into the Account Name field
    await expect(accountNameField).toHaveValue('Edge Communications');
    console.log("Verification: 'Edge Communications' entered into Account Name field.");

    console.log("Step 4: Enter '10/10/2022' into the Close Date field");
    // TODO: Replace with the actual locator for the Close Date field
    const closeDateField: Locator = page.getByLabel('Close Date', { exact: true }); // Example: by label
    await expect(closeDateField).toBeVisible();
    // For date inputs, use fill. For date pickers, more complex interaction might be needed.
    await closeDateField.fill('10/10/2022');
    // Expected Result 4: '10/10/2022' is entered into the Close Date field
    await expect(closeDateField).toHaveValue('10/10/2022');
    console.log("Verification: '10/10/2022' entered into Close Date field.");

    console.log('Step 5: Click the Save or Create button to submit the form');
    // TODO: Replace with the actual locator for the Save/Create button
    const saveButton: Locator = page.getByRole('button', { name: /Save|Create/i }); // Example: by role and partial name (case-insensitive)
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    // Expected Result 5: The form is submitted, and an attempt to create the opportunity is made
    // No direct visual verification for 'attempt' here, proceed to error verification.
    console.log('Verification: Save/Create button clicked.');

    console.log('Step 6: Verify that an error message is displayed');
    // TODO: Replace with the actual locator for the error message element
    // Common locators: role='alert', div.error-message, span.validation-error
    const errorMessageElement: Locator = page.getByRole('alert').or(page.locator('.error-message')); // Example: by role or CSS class
    await errorMessageElement.waitFor({ state: 'visible', timeout: 5000 });
    await expect(errorMessageElement).toBeVisible();
    // Expected Result 6: An error message is visible on the page
    console.log('Verification: An error message is displayed.');

    console.log("Step 7: Verify that the displayed error message contains the text 'Close Date must be today or later'");
    // Re-use the locator for the error message element
    const actualErrorMessage: string | null = await errorMessageElement.textContent();
    await expect(actualErrorMessage).toContain('Close Date must be today or later');
    // Expected Result 7: The error message explicitly states 'Close Date must be today or later'
    console.log("Verification: Error message contains 'Close Date must be today or later'.");
  });
});
