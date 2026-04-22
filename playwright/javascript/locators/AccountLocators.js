module.exports = {
  // Navigation and Search
  appLauncherButton: 'button[aria-label="App Launcher"]',
  appLauncherSearchInput: 'input.slds-input[placeholder="Search apps and items..."]',
  accountsNavLink: 'nav a[data-label="Accounts"]',
  globalSearchInput: 'input[placeholder="Search..."]',

  // Account Record Details
  accountLinkByName: (accountName) => `a[title="${accountName}"]`,
  tcvAmountDisplayValue: 'lightning-output-field[field-name="TCV_Amount__c"] lightning-formatted-number',
  
  // Edit Actions
  editButton: 'button[name="EditButton"]',
  tcvAmountEditInput: 'lightning-input-field[field-name="TCV_Amount__c"] input',
  saveButton: 'button[name="SaveEdit"]',

  // Error Messages
  validationErrorMessage: 'div.forceVisualMessageQueue ul li',
  
  // Existing locator for record ID (from context)
  recordId: '.forceOutputLookup a'
};