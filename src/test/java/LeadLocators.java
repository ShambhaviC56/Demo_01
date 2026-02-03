package locators;

import org.openqa.selenium.By;

public class LeadLocators {
    public static final By NEW_BUTTON = By.cssSelector("div[title='Leads'] + div.slds-page-header button[title='New']");
    public static final By FIRST_NAME_INPUT = By.cssSelector("lightning-input[field-name='FirstName'] input");
    public static final By LAST_NAME_INPUT = By.cssSelector("lightning-input[field-name='LastName'] input");
    public static final By EMAIL_INPUT = By.cssSelector("lightning-input[field-name='Email'] input");
    public static final By PHONE_INPUT = By.cssSelector("lightning-input[field-name='Phone'] input");
    public static final By COMPANY_INPUT = By.cssSelector("lightning-input[field-name='Company'] input");
    public static final By SAVE_BUTTON = By.cssSelector("button[name='SaveEdit']");
    public static final By SUCCESS_TOAST = By.cssSelector("span[class*='toastMessage']");
    public static final By LEAD_DETAILS_COMPANY = By.cssSelector("lightning-formatted-text[slot='outputField']");
    private LeadLocators() {}
}
