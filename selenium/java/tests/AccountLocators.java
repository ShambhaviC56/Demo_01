package locators;

import org.openqa.selenium.By;

public class AccountLocators {
    public static final By ACCOUNT_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='Name'] input");
    public static final By TYPE_COMBOBOX = By.cssSelector("lightning-combobox[field-name='Type']");
    public static final By OWNER_LOOKUP_FIELD = By.cssSelector("lightning-lookup[field-name='OwnerId'] input");
    // Add more locators here
    private AccountLocators() {}
}