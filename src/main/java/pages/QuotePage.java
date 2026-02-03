package pages;

import org.openqa.selenium.WebDriver;
import locators.QuoteLocators;

public class QuotePage extends BasePage {

    public QuotePage(WebDriver driver) {
        super(driver);
    }

    public void clickNewButton() {
        click(QuoteLocators.NEW_BUTTON);
    }

    public void fillQuoteName(String quoteName) {
        fill(QuoteLocators.QUOTE_NAME_INPUT, quoteName);
    }

    public void clickSaveButton() {
        click(QuoteLocators.SAVE_BUTTON);
    }

    public void clickCancelButton() {
        click(QuoteLocators.CANCEL_BUTTON);
    }

    public String getSuccessMessage() {
        waitForElement(QuoteLocators.SUCCESS_TOAST);
        return getText(QuoteLocators.SUCCESS_TOAST);
    }
}
