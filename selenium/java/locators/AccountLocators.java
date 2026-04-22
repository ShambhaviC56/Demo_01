package locators;

import org.openqa.selenium.By;

public class AccountLocators {
    // Global search input in Salesforce header
    public static final By GLOBAL_SEARCH_INPUT = By.cssSelector("input[placeholder='Search Salesforce']");

    // Account search result link by name in the search results
    public static By ACCOUNT_SEARCH_RESULT_LINK_BY_NAME(String accountName) {
        return By.xpath("//a[@title='" + accountName + "']");
    }

    // Account Record Page - View Mode
    // General header containing the account title (from elem_4yem9e)
    public static final By ACCOUNT_PAGE_TITLE = By.xpath("//h1[contains(@class, 'slds-page-header__title')]");
    // TCV Amount field on the detail page in view mode
    public static final By TCV_AMOUNT_FIELD_VIEW_MODE = By.cssSelector("lightning-output-field[field-name='TCV_Amount__c'] lightning-formatted-text");
    // Edit button on the Account record page highlight panel (from 'edit')
    public static final By EDIT_BUTTON = By.xpath("//button[@name='Edit']");

    // Account Record Page - Edit Modal
    // TCV Amount input field in the edit modal (targeting the actual input element)
    public static final By TCV_AMOUNT_INPUT_EDIT_MODE = By.cssSelector("lightning-input-field[field-name='TCV_Amount__c'] input[type='text']");
    // Save button in the edit modal (from 'saveEdit')
    public static final By SAVE_BUTTON = By.cssSelector("button[name='SaveEdit']");

    private AccountLocators() {}
}