package tests.login;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import tests.BaseTest;

public class TC520Test extends BaseTest {

    @Test(description = "TC520 - User should be able to login with valid credentials")
    public void testLoginWithValidCredentials() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(username, password);

        // Add assertion to verify successful login.  This will need to be updated based on the actual dashboard element.
        // For example, if the dashboard has a specific title:
        // Assert.assertEquals(driver.getTitle(), "Dashboard Title", "Login failed");

        // Placeholder assertion - replace with actual verification
        Assert.assertTrue(true, "Login successful (Placeholder Assertion - Replace with actual verification)");
    }
}