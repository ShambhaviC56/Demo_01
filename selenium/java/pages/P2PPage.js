const BasePage = require('./BasePage');
const locators = require('../locators/P2PLocators');
const { click, fill, waitForElement, getText } = require('../utils/CommonActions');

class P2PPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // SAP Methods
  async sapLogin(username, password) {
    await fill(this.page, locators.sapUsernameInput, username);
    await fill(this.page, locators.sapPasswordInput, password);
    await click(this.page, locators.sapLoginButton);
  }

  async createPurchaseRequisition(material, quantity, plant, deliveryDate, accountAssignment, costCenter) {
    await fill(this.page, locators.transactionCodeInput, 'ME51N');
    await this.page.keyboard.press('Enter');
    await fill(this.page, locators.materialInput, material);
    await fill(this.page, locators.quantityInput, quantity);
    await fill(this.page, locators.plantInput, plant);
    await fill(this.page, locators.deliveryDateInput, deliveryDate);
    await fill(this.page, locators.accountAssignmentCategoryInput, accountAssignment);
    await fill(this.page, locators.costCenterInput, costCenter);
    await click(this.page, locators.saveButton);
    await waitForElement(this.page, locators.purchaseRequisitionNumber);
    return await getText(this.page, locators.purchaseRequisitionNumber);
  }

  async getPurchaseOrderNumberSAP(poNumber) {
    await fill(this.page, locators.purchaseOrderNumberInputSAP, poNumber);
    await this.page.keyboard.press('Enter');
    return await getText(this.page, locators.invoiceNumberSAP);
  }

  async getInvoiceStatusSAP() {
    return await getText(this.page, locators.invoiceStatusSAP);
  }

  async getAccountCC001SAP() {
    return await getText(this.page, locators.accountCC001SAP);
  }

  // SERVICENOW Methods
  async servicenowLogin(username, password) {
    await fill(this.page, locators.servicenowUsernameInput, username);
    await fill(this.page, locators.servicenowPasswordInput, password);
    await click(this.page, locators.servicenowLoginButton);
  }

  async searchPurchaseRequisition(prNumber) {
    await fill(this.page, locators.purchaseRequisitionSearchInput, prNumber);
    await this.page.keyboard.press('Enter');
  }

  async getRequester() {
    return await getText(this.page, locators.requesterField);
  }

  async getMaterial() {
    return await getText(this.page, locators.materialField);
  }

  async getQuantity() {
    return await getText(this.page, locators.quantityField);
  }

  async getVendor() {
    return await getText(this.page, locators.vendorField);
  }

  async getTotalAmount() {
    return await getText(this.page, locators.totalAmountField);
  }

  async approvePurchaseRequisition(comments) {
    await click(this.page, locators.approveButton);
    await fill(this.page, locators.approvalCommentsInput, comments);
    await click(this.page, locators.submitButton);
    await waitForElement(this.page, locators.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await getText(this.page, locators.confirmationMessage);
  }

  async getServicenowApprovalId() {
      return await getText(this.page, locators.servicenowApprovalId);
  }

  // PARTNER PORTAL Methods
  async partnerPortalLogin(username, password) {
    await fill(this.page, locators.partnerPortalUsernameInput, username);
    await fill(this.page, locators.partnerPortalPasswordInput, password);
    await click(this.page, locators.partnerPortalLoginButton);
  }

  async submitInvoice(poNumber, invoiceNumber, invoiceDate, documentPath) {
    await fill(this.page, locators.purchaseOrderNumberInput, poNumber);
    await fill(this.page, locators.invoiceNumberInput, invoiceNumber);
    await fill(this.page, locators.invoiceDateInput, invoiceDate);
    await this.page.setInputFiles(locators.invoiceDocumentUpload, documentPath);
    await click(this.page, locators.submitInvoiceButton);
    await waitForElement(this.page, locators.successfulInvoiceSubmissionMessage);
  }

  async getAmountDue() {
    return await getText(this.page, locators.amountDueField);
  }

  async getSuccessfulInvoiceSubmissionMessage() {
    return await getText(this.page, locators.successfulInvoiceSubmissionMessage);
  }
}

module.exports = P2PPage;
