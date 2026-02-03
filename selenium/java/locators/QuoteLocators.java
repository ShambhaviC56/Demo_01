package locators;

import org.openqa.selenium.By;

public class QuoteLocators {
    public static final By QUOTE_TAB = By.xpath("//span[text()='Quotes']");
    public static final By NEW_BUTTON = By.cssSelector("div.slds-page-header.slds-grid.slds-grid_align-spread.slds-m-bottom_medium div.slds-col.slds-no-flex.slds-grid.slds-grid_vertical-align-center.actions.forceActionsContainer a[title='New']");
    public static final By QUOTE_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='Name'] input");
    public static final By SAVE_BUTTON = By.cssSelector("button[name='SaveEdit']");
    public static final By SUCCESS_TOAST = By.cssSelector("div.forceToastMessage");
    public static final By CANCEL_BUTTON = By.cssSelector("button[name='CancelEdit']");

    private QuoteLocators() {}
}
