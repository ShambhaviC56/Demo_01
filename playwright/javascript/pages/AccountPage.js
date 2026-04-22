const locators = require('../locators/AccountLocators');

class AccountPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the Accounts tab via the App Launcher.
   */
  async navigateToAccountsTab() {
    await this.page.click(locators.appLauncherButton);
    await this.page.fill(locators.appLauncherSearchInput, 'Accounts');
    await this.page.click(locators.accountsNavLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Searches for an account using the global search bar.
   * @param {string} accountName - The name of the account to search for.
   */
  async searchAccountGlobal(accountName) {
    await this.page.fill(locators.globalSearchInput, accountName);
    await this.page.press(locators.globalSearchInput, 'Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clicks on an account link to open its record page.
   * @param {string} accountName - The name of the account to open.
   */
  async openAccountRecord(accountName) {
    await this.page.click(locators.accountLinkByName(accountName));
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retrieves the displayed TCV Amount value from the Account detail page.
   * @returns {Promise<string>} The TCV Amount as a string (e.g., "$50,000.00").
   */
  async getTcvAmountDisplayValue() {
    await this.page.waitForSelector(locators.tcvAmountDisplayValue, { state: 'visible' });
    return await this.page.textContent(locators.tcvAmountDisplayValue);
  }

  /**
   * Clicks the 'Edit' button on the Account record page.
   */
  async clickEditButton() {
    await this.page.click(locators.editButton);
    // Wait for the edit modal to be visible and the TCV input field to be ready
    await this.page.waitForSelector(locators.tcvAmountEditInput, { state: 'visible' });
  }

  /**
   * Enters a new value into the TCV Amount field within the edit modal.
   * @param {string} newTcv - The new TCV value to enter (e.g., "75000.00").
   */
  async enterTcvAmountEditModal(newTcv) {
    await this.page.fill(locators.tcvAmountEditInput, newTcv);
  }

  /**
   * Clicks the 'Save' button in the edit modal.
   */
  async clickSaveButton() {
    await this.page.click(locators.saveButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retrieves the validation error message displayed on the page.
   * @returns {Promise<string>} The text of the error message.
   */
  async getValidationErrorMessage() {
    await this.page.waitForSelector(locators.validationErrorMessage, { state: 'visible' });
    return await this.page.textContent(locators.validationErrorMessage);
  }

  /**
   * Checks if the edit modal is still visible, indicating a failed save.
   * @returns {Promise<boolean>} True if the edit modal is visible, false otherwise.
   */
  async isEditModalVisible() {
    return await this.page.locator(locators.saveButton).isVisible();
  }
}