package tests.quote;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.QuotePage;
import tests.BaseTest;

public class TC107Test extends BaseTest {

    @Test(description = "TC107 - Verify functionality of Create Quote Feature")
    public void testCreateQuote() {
        QuotePage quotePage = new QuotePage(driver);

        // Navigate to Quotes tab if not already there (simulated here, but would be necessary if starting from a different tab)
        // quotePage.navigateToQuotesTab();  // Implement this method in QuotePage if needed

        quotePage.clickNewButton();
        quotePage.fillQuoteName("Test Quote");
        quotePage.clickSaveButton();

        String successMessage = quotePage.getSuccessMessage();
        Assert.assertTrue(successMessage.contains("was created"), "Success message should contain 'was created'");
    }

    @Test(description = "TC107 - Verify Cancel Quote Creation")
    public void testCancelQuoteCreation() {
        QuotePage quotePage = new QuotePage(driver);

        // Navigate to Quotes tab if not already there (simulated here, but would be necessary if starting from a different tab)
        // quotePage.navigateToQuotesTab();  // Implement this method in QuotePage if needed

        quotePage.clickNewButton();
        quotePage.fillQuoteName("Cancelled Quote");
        quotePage.clickCancelButton();

        // Add assertion to check if the user is navigated back to the Quotes list view
        //  Example:
        // Assert.assertTrue(driver.getCurrentUrl().contains("/lightning/o/Quote/list"), "User should be navigated back to Quotes list view");
    }
}
