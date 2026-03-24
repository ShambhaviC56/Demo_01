package pages;

import org.openqa.selenium.WebDriver;
import locators.LoginLocators;

public class LoginPage extends BasePage {

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void enterUsername(String username) {
        fill(LoginLocators.USERNAME_INPUT, username);
    }

    public void enterPassword(String password) {
        fill(LoginLocators.PASSWORD_INPUT, password);
    }

    public void clickLoginButton() {
        click(LoginLocators.LOGIN_BUTTON);
    }

    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
}