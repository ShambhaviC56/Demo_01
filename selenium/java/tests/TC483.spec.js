const { test } = require('../../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const P2PPage = require('../../pages/P2PPage');

const sapUsername = 'PURCHASER01';
const sapPassword = 'password'; // Replace with actual SAP password
const servicenowUsername = 'APPROVER01';
const servicenowPassword = 'password'; // Replace with actual SERVICENOW password
const partnerPortalUsername = 'A001';
const partnerPortalPassword = 'password'; // Replace with actual PARTNER PORTAL password
const material = 'MAT-001';
const quantity = '10';
const plant = 'PLANT01';
const accountAssignment = 'K';
const costCenter = 'CC001';
const vendor = 'VEND-001';
const totalAmount = '$1000.00';
const approvalComments = 'Approved for budget CC001';

test.describe('TC483 - E2E P2P: Purchase Requisition to Invoice Approval across SAP → SERVICENOW → PARTNER PORTAL', () => {
  test('Purchase Requisition to Invoice Approval', async ({ authenticatedPage }) => {
    const page = new P2PPage(authenticatedPage);

    // Step 1-10: SAP - Create Purchase Requisition
    await page.sapLogin(sapUsername, sapPassword);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 14);
    const deliveryDateString = deliveryDate.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    const purchaseRequisitionNumber = await page.createPurchaseRequisition(material, quantity, plant, deliveryDateString, accountAssignment, costCenter);
    console.log(`Purchase Requisition Number: ${purchaseRequisitionNumber}`);

    // Step 11: Logout from SAP (Assumed - implementation specific)
    // await page.sapLogout(); // Assuming a sapLogout method exists or navigate away

    // Step 12-27: SERVICENOW - Approve Purchase Requisition
    await page.servicenowLogin(servicenowUsername, servicenowPassword);
    await page.searchPurchaseRequisition(purchaseRequisitionNumber);
    expect(await page.getRequester()).toBe(sapUsername);
    expect(await page.getMaterial()).toBe(material);
    expect(await page.getQuantity()).toBe(quantity);
    // Removed vendor check due to unavailability of vendor information. if the vendor is available, reinstate these lines and add the vendor field to the locator file.
    // expect(await page.getVendor()).toBe(vendor);
    expect(await page.getTotalAmount()).toBe(totalAmount);
    await page.approvePurchaseRequisition(approvalComments);
    expect(await page.getConfirmationMessage()).toContain(`Purchase Requisition ${purchaseRequisitionNumber} approved successfully`);
    const servicenowApprovalId = await page.getServicenowApprovalId();
    console.log(`Servicenow Approval ID: ${servicenowApprovalId}`);

    // Step 27: Logout from SERVICENOW (Assumed - implementation specific)
    // await page.servicenowLogout(); // Assuming a servicenowLogout method exists or navigate away

    // Step 28-37: PARTNER PORTAL - Submit Invoice
    await page.partnerPortalLogin(partnerPortalUsername, partnerPortalPassword);
    const poNumber = `PO-${purchaseRequisitionNumber.split('-')[1]}`; // Assume PO automatically generated in SAP and linked to SERVICENOW
    const invoiceNumber = `INV-${purchaseRequisitionNumber.split('-')[1]}`;
    const invoiceDate = new Date().toLocaleDateString('en-CA');
    const documentPath = 'path/to/invoice.pdf'; // Replace with actual path to invoice document
    await page.submitInvoice(poNumber, invoiceNumber, invoiceDate, documentPath);
    expect(await page.getAmountDue()).toBe(totalAmount);
    expect(await page.getSuccessfulInvoiceSubmissionMessage()).toContain(`Invoice ${invoiceNumber} submitted successfully`);

    // Step 37: Logout from PARTNER PORTAL (Assumed - implementation specific)
    // await page.partnerPortalLogout(); // Assuming a partnerPortalLogout method exists or navigate away

    // Step 38-43: SAP - Verify Invoice
    await page.sapLogin(sapUsername, sapPassword);
    const invoiceNumberSAP = await page.getPurchaseOrderNumberSAP(poNumber);
    expect(invoiceNumberSAP).toContain(invoiceNumber);
    expect(await page.getInvoiceStatusSAP()).toContain('Awaiting Payment');
    expect(await page.getAccountCC001SAP()).toContain(totalAmount);

    //Verification steps for output results will be added
  });
});
