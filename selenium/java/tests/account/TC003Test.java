package tests.account;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.AccountPage;
import tests.BaseTest;

public class TC003Test extends BaseTest {

    private static final String ACCOUNT_NAME = "Gamma Services - TCV Test";
    private static final String EXPECTED_TCV_VALUE = "$25,000.00";
    private static final String ATTEMPTED_NEW_TCV_VALUE = "30000.00"; // Value to attempt to input

    @Test(description = "TC003 - Verify Standard User (Non-Account Manager/Executive) can view TCV field but cannot edit it")
    public void testStandardUserTCVFieldVisibilityAndReadonly() {
        AccountPage accountPage = new AccountPage(driver);

        // 1. Login to Salesforce with 'Std_User' credentials. (Handled by BaseTest setup)
        // 2. Navigate to the 'Accounts' tab (from the App Launcher or Navigation Bar). (Implicit through search)

        // 3. Search for the Account 'Gamma Services - TCV Test'
        // 4. Click on the Account to open its record page.
        accountPage.searchAccount(ACCOUNT_NAME);

        // Verify Account record page reloads and title is correct
        String accountTitle = accountPage.getAccountPageTitle();
        Assert.assertTrue(accountTitle.contains(ACCOUNT_NAME), "Account page title should contain the searched account name.");

        // 5. Verify that the 'TCV Amount' field is visible on the Account detail page, displaying '$25,000.00'.
        // (Expected Result 1)
        Assert.assertTrue(accountPage.isTCVFieldVisible(), "TCV Amount field should be visible on the Account detail page.");
        String actualTCVValue = accountPage.getTCVFieldValue();
        Assert.assertEquals(actualTCVValue, EXPECTED_TCV_VALUE, "TCV Amount field should display the correct value in view mode.");

        // 6. Click the 'Edit' button located in the highlight panel of the Account record page.
        accountPage.clickEditButton();

        // 7. Locate the 'TCV Amount' field in the edit modal.
        // (Expected Result 2)
        Assert.assertFalse(accountPage.isTCVFieldEditable(), "TCV Amount field should be in a read-only state in the edit modal.");

        // 8. Attempt to enter or modify the value in the 'TCV Amount' field (e.g., try typing '30000.00').
        // (Expected Result 3)
        String initialTCVValueInEditModal = accountPage.getTCVAmountValueInEditModal();
        accountPage.attemptToEnterTCVAmount(ATTEMPTED_NEW_TCV_VALUE); // Attempt to type, but it should not change due to read-only
        String tcvValueAfterAttempt = accountPage.getTCVAmountValueInEditModal();

        Assert.assertEquals(tcvValueAfterAttempt, initialTCVValueInEditModal,
                "Attempting to type into a read-only TCV Amount field should not change its value in the edit modal.");

        // 9. Click the 'Save' button. (Implicit in Expected Result 4, ensuring no change)
        accountPage.clickSaveButton();

        // (Expected Result 4) Re-verify the TCV amount on the detail page after save attempt.
        String finalTCVValueOnView = accountPage.getTCVFieldValue();
        Assert.assertEquals(finalTCVValueOnView, EXPECTED_TCV_VALUE, "TCV Amount field should remain unchanged after attempting to edit and save as a Standard User.");
    }
}