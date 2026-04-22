package pages;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import locators.AccountLocators;

public class AccountPage extends BasePage {

    public AccountPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Searches for an account using the global search bar and navigates to its record page.
     * @param accountName The name of the account to search for.
     */
    public void searchAccount(String accountName) {
        fill(AccountLocators.GLOBAL_SEARCH_INPUT, accountName + Keys.ENTER);
        waitForElement(AccountLocators.ACCOUNT_SEARCH_RESULT_LINK_BY_NAME(accountName)); // Wait for search results to load
        click(AccountLocators.ACCOUNT_SEARCH_RESULT_LINK_BY_NAME(accountName));
        waitForSpinner(); // Wait for account record page to load fully
    }

    /**
     * Retrieves the title of the Account record page.
     * @return The text of the account page title header.
     */
    public String getAccountPageTitle() {
        return getText(AccountLocators.ACCOUNT_PAGE_TITLE);
    }

    /**
     * Checks if the TCV Amount field is visible on the Account detail page.
     * @return true if the TCV Amount field is visible, false otherwise.
     */
    public boolean isTCVFieldVisible() {
        return isElementVisible(AccountLocators.TCV_AMOUNT_FIELD_VIEW_MODE);
    }

    /**
     * Retrieves the displayed value of the TCV Amount field on the Account detail page.
     * @return The text value of the TCV Amount field.
     */
    public String getTCVFieldValue() {
        return getText(AccountLocators.TCV_AMOUNT_FIELD_VIEW_MODE);
    }

    /**
     * Clicks the 'Edit' button on the Account record page to open the edit modal.
     */
    public void clickEditButton() {
        click(AccountLocators.EDIT_BUTTON);
        waitForSpinner(); // Wait for the edit modal to fully load
    }

    /**
     * Checks if the TCV Amount field in the edit modal is editable.
     * It verifies the 'readonly' and 'disabled' attributes of the input field.
     * @return true if the field is editable, false if it's read-only or disabled.
     */
    public boolean isTCVFieldEditable() {
        WebElement tcvInput = waitForElement(AccountLocators.TCV_AMOUNT_INPUT_EDIT_MODE);
        String readonly = tcvInput.getAttribute("readonly");
        String disabled = tcvInput.getAttribute("disabled");

        // A field is considered not editable if it has a 'readonly' or 'disabled' attribute
        // or if these attributes' values are 'true'.
        return !("true".equalsIgnoreCase(readonly) || "readonly".equalsIgnoreCase(readonly) ||
                 "true".equalsIgnoreCase(disabled) || "disabled".equalsIgnoreCase(disabled));
    }

    /**
     * Attempts to enter a value into the TCV Amount field in the edit modal.
     * This method is used to simulate a user trying to type, even if the field is read-only.
     * @param value The value to attempt to enter.
     */
    public void attemptToEnterTCVAmount(String value) {
        fill(AccountLocators.TCV_AMOUNT_INPUT_EDIT_MODE, value);
    }

    /**
     * Retrieves the current value of the TCV Amount input field in the edit modal.
     * @return The 'value' attribute of the TCV Amount input field.
     */
    public String getTCVAmountValueInEditModal() {
        return getAttribute(AccountLocators.TCV_AMOUNT_INPUT_EDIT_MODE, "value");
    }

    /**
     * Clicks the 'Save' button in the edit modal.
     */
    public void clickSaveButton() {
        click(AccountLocators.SAVE_BUTTON);
        waitForSpinner(); // Wait for save operation to complete and page to refresh
    }
}