package locators;

import org.openqa.selenium.By;

class AccountLocators {
    public static final By CREATE_ACCOUNT_BUTTON = By.cssSelector("button[name='New']");
    public static final By ACCOUNT_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='Name'] input");
    // Add more locators here
    private AccountLocators() {}
}