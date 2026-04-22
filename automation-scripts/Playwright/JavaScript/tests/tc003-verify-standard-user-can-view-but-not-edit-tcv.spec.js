const { test, expect } = require('@playwright/test');

test('TC003: Verify Standard User can view TCV field but cannot edit it', async ({ page }) => {
  const baseUrl = 'https://your-salesforce-instance.lightning.force.com'; // IMPORTANT: Replace with your actual Salesforce instance URL

  // Step 1: Search for the Account 'Gamma Services - TCV Test'
  console.log('Step 1: Navigating to Account Home and searching for "Gamma Services - TCV Test"');
  await page.goto(baseUrl + '/lightning/o/Account/home', { waitUntil: 'networkidle', timeout: 30000 });
  await page.locator('input[placeholder="Search..."]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('input[placeholder="Search..."]').fill('Gamma Services - TCV Test');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  await page.locator('a[title="Gamma Services - TCV Test"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('a[title="Gamma Services - TCV Test"]').click();
  await page.waitForLoadState('networkidle');

  // Step 2: Verify the Account record page title contains 'Gamma Services - TCV Test'
  console.log('Step 2: Verifying Account record page title');
  await page.locator('h1.slds-page-header__title').waitFor({ state: 'visible', timeout: 10000 });
  const pageTitle = await page.locator('h1.slds-page-header__title').textContent();
  expect(pageTitle).toContain('Gamma Services - TCV Test');
  console.log(`✓ Page title verified: ${pageTitle}`);

  // Step 3: Verify that the 'TCV Amount' field is visible on the Account detail page
  console.log('Step 3: Verifying TCV Amount field visibility');
  await page.locator('//span[text()="TCV Amount"]').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('//span[text()="TCV Amount"]/ancestor::div[contains(@class, "slds-form-element__row")]')).toBeVisible();
  console.log('✓ TCV Amount field is visible on detail page.');

  // Step 4: Verify the 'TCV Amount' field displays '$25,000.00'
  console.log('Step 4: Verifying TCV Amount field value');
  await page.locator('//span[text()="TCV Amount"]/following-sibling::div//span').waitFor({ state: 'visible', timeout: 10000 });
  const tcvAmount = await page.locator('//span[text()="TCV Amount"]/following-sibling::div//span').textContent();
  expect(tcvAmount).toBe('$25,000.00');
  console.log(`✓ TCV Amount field displays: ${tcvAmount}`);

  // Step 5: Click the 'Edit' button located in the highlight panel of the Account record page
  console.log('Step 5: Clicking the Edit button');
  await page.locator('//button[@name="Edit"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('//button[@name="Edit"]').click();
  await page.locator('div.slds-modal__container').waitFor({ state: 'visible', timeout: 30000 }); // Wait for edit modal to appear
  console.log('✓ Edit modal displayed.');

  // Step 6: Verify that the 'TCV Amount' field is in a read-only state within the edit modal
  console.log('Step 6: Verifying TCV Amount field is read-only in edit modal');
  await page.locator('//label[text()="TCV Amount"]/following-sibling::div//input').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('//label[text()="TCV Amount"]/following-sibling::div//input')).toBeDisabled({ timeout: 10000 });
  console.log('✓ TCV Amount field is disabled/read-only in the edit modal.');

  // Step 7: Attempt to enter '30000.00' into the 'TCV Amount' field
  console.log('Step 7: Attempting to enter value into TCV Amount field');
  // Due to Step 6 verification, this fill operation will likely not interact or will implicitly confirm non-editability.
  // If the field is truly disabled, Playwright's fill method will not perform the action.
  // If it's `readonly` but not `disabled`, fill might work but the value won't be saved.
  await page.locator('//label[text()="TCV Amount"]/following-sibling::div//input').fill('30000.00');
  console.log('✓ Attempted to fill TCV Amount field.');

  // Step 8: Verify the 'TCV Amount' field value remains unchanged after attempting to type in the edit modal
  console.log('Step 8: Verifying TCV Amount field value remains unchanged in edit modal');
  const tcvAmountInModal = await page.locator('//label[text()="TCV Amount"]/following-sibling::div//input').inputValue();
  // Salesforce input fields often remove currency symbols for editing, so expecting '25000.00' if input is active,
  // but since it's read-only, it should retain the original display value or its internal raw value.
  // Assuming the display format remains consistent if not editable, or raw value '25000.00'.
  // Sticking to '$25,000.00' as in previous verification, confirming no change visually.
  expect(tcvAmountInModal).toBe('$25,000.00'); // Or '25000.00' depending on Salesforce internal representation for disabled input
  console.log(`✓ TCV Amount field value in modal remains: ${tcvAmountInModal}`);

  // Step 9: Click the 'Save' button
  console.log('Step 9: Clicking the Save button');
  await page.locator('//button[@name="SaveEdit"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('//button[@name="SaveEdit"]').click();
  await page.locator('div.slds-modal__container').waitFor({ state: 'detached', timeout: 30000 }); // Wait for modal to close
  await page.waitForLoadState('networkidle'); // Wait for page to refresh after save attempt
  console.log('✓ Save button clicked and modal closed.');

  // Step 10: Verify the 'TCV Amount' field value remains '$25,000.00' on the Account detail page
  console.log('Step 10: Verifying TCV Amount field value on detail page after save');
  await page.locator('//span[text()="TCV Amount"]/following-sibling::div//span').waitFor({ state: 'visible', timeout: 10000 });
  const tcvAmountAfterSave = await page.locator('//span[text()="TCV Amount"]/following-sibling::div//span').textContent();
  expect(tcvAmountAfterSave).toBe('$25,000.00');
  console.log(`✓ TCV Amount field on detail page still displays: ${tcvAmountAfterSave}`);
});