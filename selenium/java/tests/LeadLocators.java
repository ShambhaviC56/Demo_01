package locators;

import org.openqa.selenium.By;

public class LeadLocators {
    public static final By NEW_BUTTON = By.cssSelector("button[name='New']");
    public static final By SAVE_EDIT = By.cssSelector("button[name='SaveEdit']");
    public static final By FIRST_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='FirstName'] input");
    public static final By LAST_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='LastName'] input");
    public static final By COMPANY_INPUT = By.cssSelector("lightning-input-field[field-name='Company'] input");
    public static final By EMAIL_INPUT = By.cssSelector("lightning-input-field[field-name='Email'] input");
    public static final By ELEMENT_CRGUJ8 = By.cssSelector("div[role='alert'] p.slds-text-body--small");

    private LeadLocators() {}
}