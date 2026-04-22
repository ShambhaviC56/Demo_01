import { test, expect, Page, Locator } from '@playwright/test';

test.describe('TC011: Create Lead - Successful Creation', () => {
  const BASE_URL: string = 'https://your-crm-app.com'; // Placeholder: Replace with your actual application base URL
  const LEAD_FIRST_NAME: string = 'John';
  const LEAD_LAST_NAME: string = 'Doe';
  const LEAD_COMPANY_NAME: string = 'Test Company';
  const LEAD_EMAIL: string = 'test@example.com';
  const LEAD_PHONE: string = '123-456-7890';

  test('Successful creation of a new lead', async ({ page }: { page: Page }) => {
    // Precondition: Navigate to the application (assuming a login might happen elsewhere or context is logged in)
    console.log('Precondition: Navigating to the CRM application...');
    await page.goto(BASE_URL + '/leads', { waitUntil: 'domcontentloaded' }); // Adjust endpoint as necessary

    // Step 1: Click on the 'New Lead' button
    // Locator: [MANUAL_LOOKUP_REQUIRED: New Lead button]
    // Using a common selector for 'New Lead' button
    console.log('Step 1: Clicking on the "New Lead" button');
    const newLeadButton: Locator = page.locator('button', { hasText: 'New Lead' })
                                  .or(page.locator('a[href="/leads/new"]'))
                                  .or(page.locator('[data-testid="new-lead-button"]'));
    await newLeadButton.waitFor({ state: 'visible' });
    await newLeadButton.click();

    // Expected Result 1: New Lead form or page is displayed
    // Verify by waiting for the First Name field to be visible and checking for a form title
    console.log('Verification 1: Checking if New Lead form is displayed');
    const firstNameField: Locator = page.locator('input[name="firstName"]')
                                    .or(page.getByPlaceholder('First Name'))
                                    .or(page.getByLabel('First Name'));
    await firstNameField.waitFor({ state: 'visible' });
    await expect(page.locator('h1', { hasText: 'Create New Lead' }).or(page.locator('h2', { hasText: 'Add Lead' }))).toBeVisible();

    // Step 2: Enter 'John' in the First Name field
    // Locator: [MANUAL_LOOKUP_REQUIRED: First Name field]
    console.log(`Step 2: Entering '${LEAD_FIRST_NAME}' in the First Name field`);
    await firstNameField.fill(LEAD_FIRST_NAME);
    // Expected Result 2: 'John' is entered in the First Name field
    await expect(firstNameField).toHaveValue(LEAD_FIRST_NAME);

    // Step 3: Enter 'Doe' in the Last Name field
    // Locator: [MANUAL_LOOKUP_REQUIRED: Last Name field]
    console.log(`Step 3: Entering '${LEAD_LAST_NAME}' in the Last Name field`);
    const lastNameField: Locator = page.locator('input[name="lastName"]')
                                   .or(page.getByPlaceholder('Last Name'))
                                   .or(page.getByLabel('Last Name'));
    await lastNameField.fill(LEAD_LAST_NAME);
    // Expected Result 3: 'Doe' is entered in the Last Name field
    await expect(lastNameField).toHaveValue(LEAD_LAST_NAME);

    // Step 4: Enter 'Test Company' in the Company field
    // Locator: [MANUAL_LOOKUP_REQUIRED: Company field]
    console.log(`Step 4: Entering '${LEAD_COMPANY_NAME}' in the Company field`);
    const companyField: Locator = page.locator('input[name="company"]')
                                  .or(page.getByPlaceholder('Company'))
                                  .or(page.getByLabel('Company'));
    await companyField.fill(LEAD_COMPANY_NAME);
    // Expected Result 4: 'Test Company' is entered in the Company field
    await expect(companyField).toHaveValue(LEAD_COMPANY_NAME);

    // Step 5: Enter 'test@example.com' in the Email field
    // Locator: [MANUAL_LOOKUP_REQUIRED: Email field]
    console.log(`Step 5: Entering '${LEAD_EMAIL}' in the Email field`);
    const emailField: Locator = page.locator('input[name="email"]')
                                .or(page.getByPlaceholder('Email'))
                                .or(page.getByLabel('Email Address'));
    await emailField.fill(LEAD_EMAIL);
    // Expected Result 5: 'test@example.com' is entered in the Email field
    await expect(emailField).toHaveValue(LEAD_EMAIL);

    // Step 6: Enter '123-456-7890' in the Phone field
    // Locator: [MANUAL_LOOKUP_REQUIRED: Phone field]
    console.log(`Step 6: Entering '${LEAD_PHONE}' in the Phone field`);
    const phoneField: Locator = page.locator('input[name="phone"]')
                                .or(page.getByPlaceholder('Phone Number'))
                                .or(page.getByLabel('Phone'));
    await phoneField.fill(LEAD_PHONE);
    // Expected Result 6: '123-456-7890' is entered in the Phone field
    await expect(phoneField).toHaveValue(LEAD_PHONE);

    // Step 7: Click the 'Save' or 'Create Lead' button
    // Locator: [MANUAL_LOOKUP_REQUIRED: Save/Create Lead button]
    console.log('Step 7: Clicking the "Save" or "Create Lead" button');
    const saveButton: Locator = page.locator('button', { hasText: 'Save' })
                                .or(page.locator('button', { hasText: 'Create Lead' }))
                                .or(page.locator('input[type="submit"][value="Save"]'));
    await saveButton.click();

    // Expected Result 7: Lead is created, and the Lead details page or a confirmation page is displayed
    // Verify by waiting for a success message or the details page header, and checking URL change
    console.log('Verification 7: Checking for lead details page or confirmation');
    const successMessageElement: Locator = page.locator('.success-message')
                                            .or(page.locator('[data-testid="success-alert"]'))
                                            .or(page.locator('div[role="alert"]:has-text("successfully")'));
    await successMessageElement.waitFor({ state: 'visible' });
    await expect(page).toHaveURL(/.*\/leads\/\d+/, { timeout: 10000 }); // Assuming URL changes to a lead-specific page, e.g., /leads/123

    // Step 8: Get the success message displayed on the page
    // Locator: [MANUAL_LOOKUP_REQUIRED: Success message element]
    console.log('Step 8: Retrieving the success message');
    const successMessageText: string | null = await successMessageElement.textContent();
    // Expected Result 8: A success message is retrieved (implicitly checked by textContent and next assertion)

    // Step 9: Verify the success message contains 'was created'
    console.log(`Step 9: Verifying success message contains 'was created'. Actual: '${successMessageText}'`);
    expect(successMessageText).toContain('was created');
    // Expected Result 9: The success message confirms the lead was created successfully

    // Step 10: Get the company name from the lead details page
    // Locator: [MANUAL_LOOKUP_REQUIRED: Lead Company Name on details page]
    console.log('Step 10: Retrieving the company name from the lead details page');
    const leadCompanyNameElement: Locator = page.locator('.lead-details-company-name')
                                              .or(page.locator('[data-testid="lead-company"]'))
                                              .or(page.locator('p:has-text("Company:") span')); // Example: <p>Company: <span>Test Company</span></p>
    await leadCompanyNameElement.waitFor({ state: 'visible' });
    const displayedCompanyName: string | null = await leadCompanyNameElement.textContent();
    // Expected Result 10: The company name is retrieved from the lead's details (implicitly checked by textContent and next assertion)

    // Step 11: Verify the lead company name is 'Test Company'
    console.log(`Step 11: Verifying the lead company name is '${LEAD_COMPANY_NAME}'. Actual: '${displayedCompanyName}'`);
    expect(displayedCompanyName?.trim()).toBe(LEAD_COMPANY_NAME);
    // Expected Result 11: The retrieved company name matches 'Test Company'

    console.log('Test TC011: Create Lead - Successful Creation completed successfully.');
  });
});