const { test } = require('../../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const AccountPage = require('../../pages/AccountPage');

test.describe('TC002 - Verify Account Executive cannot edit Total Contract Value (TCV) field due to validation rule', () => {
  const ACCOUNT_NAME = 'Beta Solutions - TCV Test';
  const INITIAL_TCV = '$50,000.00';
  const ATTEMPTED_TCV_INPUT = '75000.00';
  const EXPECTED_ERROR_MESSAGE = 'Security Error: Account Executives are not authorized to modify TCV Amount. Please contact CRM Ops for assistance.';

  test('Account Executive cannot edit TCV field and validation rule is triggered', async ({ authenticatedPage }) => {
    const accountPage = new AccountPage(authenticatedPage);

    // 1. Navigate to the 'Accounts' tab.
    await accountPage.navigateToAccountsTab();

    // 2. Search for the Account 'Beta Solutions - TCV Test'.
    await accountPage.searchAccountGlobal(ACCOUNT_NAME);

    // 3. Click on the Account 'Beta Solutions - TCV Test' to open its record page.
    await accountPage.openAccountRecord(ACCOUNT_NAME);

    // 4. Verify that the 'TCV Amount' field is visible, displaying '$50,000.00'.
    const initialTcvAmount = await accountPage.getTcvAmountDisplayValue();
    expect(initialTcvAmount).toBe(INITIAL_TCV);

    // 5. Click the 'Edit' button.
    await accountPage.clickEditButton();

    // 6. Attempt to enter a new value in the 'TCV Amount' field.
    await accountPage.enterTcvAmountEditModal(ATTEMPTED_TCV_INPUT);

    // 7. Click the 'Save' button.
    await accountPage.clickSaveButton();

    // 8. Verify that an error message is displayed and matches the expected message.
    const actualErrorMessage = await accountPage.getValidationErrorMessage();
    expect(actualErrorMessage).toContain(EXPECTED_ERROR_MESSAGE);

    // 9. Verify the Account record is NOT saved with the new TCV value.
    // The edit modal should still be visible if save failed.
    expect(await accountPage.isEditModalVisible()).toBe(true, 'Edit modal should still be open after failed save attempt.');

    // Since save failed and modal is open, we need to cancel to check the original value.
    // Add a cancel button locator if available, or just navigate back/reload.
    // For this test, we assume the error message appearing confirms the save didn't go through.
    // Let's reload the page or navigate away and back to ensure the detail page value is unchanged.
    await authenticatedPage.reload(); // Reload to dismiss modal and see current record state
    await authenticatedPage.waitForLoadState('networkidle');
    await accountPage.openAccountRecord(ACCOUNT_NAME); // Re-open the record after reload

    // 10. Verify the 'TCV Amount' field on the Account detail page retains its original value.
    const finalTcvAmount = await accountPage.getTcvAmountDisplayValue();
    expect(finalTcvAmount).toBe(INITIAL_TCV, 'TCV Amount should retain its original value after failed edit.');
  });
});