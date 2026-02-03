package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import locators.OpportunityManagementLocators;

public class OpportunityManagementPage extends BasePage {

    public OpportunityManagementPage(WebDriver driver) {
        super(driver);
    }

    public void createOpportunityWithInvalidCloseDate(String opportunityName, String accountName, String closeDate) {
        click(OpportunityManagementLocators.NEW_BUTTON);
        fill(OpportunityManagementLocators.OPPORTUNITY_NAME_INPUT, opportunityName);
        fill(OpportunityManagementLocators.ACCOUNT_NAME_LOOKUP, accountName);
        waitForElement(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        click(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        fill(OpportunityManagementLocators.CLOSE_DATE_INPUT, closeDate);

        click(OpportunityManagementLocators.STAGE_PICKLIST);
        click(OpportunityManagementLocators.PROSPECTING_STAGE);
        
        click(OpportunityManagementLocators.SAVE_BUTTON);
    }

    public boolean isErrorMessageDisplayed() {
        return isElementVisible(OpportunityManagementLocators.ERROR_MESSAGE);
    }

    public String getErrorMessage() {
        return getText(OpportunityManagementLocators.ERROR_MESSAGE);
    }
}
