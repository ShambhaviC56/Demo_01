package locators;

import org.openqa.selenium.By;

public class LoginLocators {
    public static final By USERNAME_INPUT = By.cssSelector("input[name='username']");
    public static final By PASSWORD_INPUT = By.cssSelector("input[name='password']");
    public static final By LOGIN_BUTTON = By.cssSelector("button[name='login']");

    private LoginLocators() {}
}