package pages;

import org.openqa.selenium.WebDriver;
import locators.LeadLocators;
import org.openqa.selenium.By;

public class LeadPage extends BasePage {
    public LeadPage(WebDriver driver) {
        super(driver);
    }

    public void createLead(String firstName, String lastName, String company, String email, String phone) {
        click(LeadLocators.NEW_BUTTON);
        fill(LeadLocators.FIRST_NAME_INPUT, firstName);
        fill(LeadLocators.LAST_NAME_INPUT, lastName);
        fill(LeadLocators.COMPANY_INPUT, company);
        fill(LeadLocators.EMAIL_INPUT, email);
        fill(LeadLocators.PHONE_INPUT, phone);
        click(LeadLocators.SAVE_BUTTON);
        waitForElement(LeadLocators.SUCCESS_TOAST);
    }

    public String getSuccessMessage() {
        return getText(LeadLocators.SUCCESS_TOAST);
    }

    public String getLeadCompanyName() {
        return getText(LeadLocators.LEAD_DETAILS_COMPANY);
    }

}
