package tests.lead;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LeadPage;
import tests.BaseTest;

public class TC011Test extends BaseTest {
    @Test(description = "TC011 - Create Lead - Successful Creation")
    public void testCreateLeadSuccessfully() {
        LeadPage leadPage = new LeadPage(driver);
        String firstName = "John";
        String lastName = "Doe";
        String company = "Test Company";
        String email = "test@example.com";
        String phone = "123-456-7890";

        leadPage.createLead(firstName, lastName, company, email, phone);

        String successMessage = leadPage.getSuccessMessage();
        Assert.assertTrue(successMessage.contains("was created"), "Success message should contain 'was created'");

        //Verify the company name on the lead details page
        String leadCompanyName = leadPage.getLeadCompanyName();
        Assert.assertEquals(leadCompanyName, company, "Lead company name should match the input.");
    }
}
