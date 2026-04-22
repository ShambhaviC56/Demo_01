const { test, expect } = require('@playwright/test');

test('TC011 - Create Lead - Successful Creation', async ({ page }) => {
  // Assuming a base URL for the application. If a login step was provided, it would be extracted from there.
  const baseUrl = 'https://app.example.com';

  // Step 1: Navigate to the 'Create Lead' or 'New Lead' form
  // Assuming navigating to a leads list page first, then clicking 'New Lead' button.
  console.log('Step 1: Navigating to Leads list page and opening New Lead form');
  await page.goto(baseUrl + '/leads', { waitUntil: 'networkidle' });
  
  // Locator for 'New Lead' button/link. Using getByRole for a button.
  await page.getByRole('button', { name: 'New Lead' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'New Lead' }).click();

  // Wait for the new lead form to load, identified by a heading
  await page.getByRole('heading', { name: 'Create New Lead' }).waitFor({ state: 'visible', timeout: 10000 });
  console.log('✓ New Lead form is displayed.');

  // Step 2: Enter 'John' in the First Name field (Locator: First Name input field)
  console.log('Step 2: Entering First Name: John');
  await page.getByLabel('First Name').waitFor({ state: 'visible' });
  await page.getByLabel('First Name').fill('John');

  // Step 3: Enter 'Doe' in the Last Name field (Locator: Last Name input field)
  console.log('Step 3: Entering Last Name: Doe');
  await page.getByLabel('Last Name').waitFor({ state: 'visible' });
  await page.getByLabel('Last Name').fill('Doe');

  // Step 4: Enter 'Test Company' in the Company field (Locator: Company input field)
  console.log('Step 4: Entering Company: Test Company');
  await page.getByLabel('Company').waitFor({ state: 'visible' });
  await page.getByLabel('Company').fill('Test Company');

  // Step 5: Enter 'test@example.com' in the Email field (Locator: Email input field)
  console.log('Step 5: Entering Email: test@example.com');
  await page.getByLabel('Email').waitFor({ state: 'visible' });
  await page.getByLabel('Email').fill('test@example.com');

  // Step 6: Enter '123-456-7890' in the Phone field (Locator: Phone input field)
  console.log('Step 6: Entering Phone: 123-456-7890');
  await page.getByLabel('Phone').waitFor({ state: 'visible' });
  await page.getByLabel('Phone').fill('123-456-7890');

  // Step 7: Click on the 'Save' or 'Create Lead' button (Locator: Save/Create Lead button)
  console.log('Step 7: Clicking Save button');
  // Using getByRole for a 'Save' button
  await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Save' }).click();
  
  // Wait for page to navigate or load state to settle after saving
  await page.waitForLoadState('networkidle');
  console.log('✓ Lead record submitted/saved.');

  // Step 8: Verify that a success message containing 'was created' is displayed (Locator: Success message element)
  console.log('Step 8: Verifying success message');
  // Assuming a common class for success messages in an application
  await page.locator('.success-message').waitFor({ state: 'visible', timeout: 15000 });
  await expect(page.locator('.success-message')).toContainText('was created');
  console.log('✓ Success message confirmed: Lead was created.');

  // Step 9: Verify that the company name 'Test Company' is displayed on the newly created Lead's details page (Locator: Lead Company Name display element)
  console.log('Step 9: Verifying company name on Lead details page');
  // Assuming the page has navigated to the lead details page and displays the company name in a specific element
  await page.locator('.lead-details-company-name').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('.lead-details-company-name')).toHaveText('Test Company');
  console.log('✓ Company name "Test Company" displayed on Lead details page.');
});