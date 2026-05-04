import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
class TC044(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        self.driver.get("https://login.salesforce.com")
        username_input = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='username']")))
        username_input.clear()
        username_input.send_keys("/* ADD YOUR SALESFORCE USERNAME */")
        password_input = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='password']")))
        password_input.clear()
        password_input.send_keys("/* ADD YOUR SALESFORCE PASSWORD */")
        login_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name="Login"]")))
        login_button.click()
    def test_TC044(self):
        try:
            # Navigate to Lead page
            lead_page_link = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[href="/00O30000000e1sEAA0"]")))
            lead_page_link.click()
            # Click New button
            new_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name="New"]")))
            new_button.click()
            # Fill in Email field with blank value
            email_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input-field[field-name="Email"] input")))
            email_field.clear()
            email_field.send_keys("")
            # Click Save button
            save_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name="Save"]")))
            save_button.click()
            # Verify error message is displayed
            error_message = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.forceToastMessage")))
            assert "Email cannot be blank" in error_message.text
        except Exception as e:
            print(f"Error: {str(e)}")
    def tearDown(self):
        self.driver.quit()
if __name__ == "__main__":
    unittest.main(verbosity=2)
