import { test, expect, Page, Locator } from '@playwright/test';

test('TC107 - Verify functionality of Create Quote Feature', async ({ page }: { page: Page }) => {
  const baseUrl: string = 'http://localhost:3000/quotes'; // Placeholder: Adjust to your application's base URL for quotes

  console.log('Precondition: Navigate to the quotes listing page');
  // In a real application, you might navigate to a specific page or log in first.
  // For this test, we assume we are on a page where the 'New' button for a quote is accessible.
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

  console.log('Step 1: Click "New" button');
  // Locator for 'New' button. Adjust based on your application's actual locator (e.g., data-test-id, more specific role/name).
  const newQuoteButton: Locator = page.getByRole('button', { name: 'New' });
  await newQuoteButton.waitFor({ state: 'visible' });
  await newQuoteButton.click();

  console.log('Expected Result 1: New Quote creation form is displayed');
  // Verify that the new quote form is displayed. Adjust locator for your form's header/title.
  const createQuoteFormHeader: Locator = page.getByRole('heading', { name: 'Create New Quote' });
  await createQuoteFormHeader.waitFor({ state: 'visible' });
  await expect(createQuoteFormHeader).toBeVisible();

  console.log('Step 2: Enter "Test Quote" into the "Quote Name" field');
  // Locator for 'Quote Name' input field. Adjust based on your application (e.g., data-test-id, placeholder).
  const quoteNameInput: Locator = page.getByLabel('Quote Name');
  await quoteNameInput.waitFor({ state: 'visible' });
  const quoteName: string = 'Test Quote';
  await quoteNameInput.fill(quoteName);

  console.log('Expected Result 2: "Test Quote" is populated in the "Quote Name" field');
  await expect(quoteNameInput).toHaveValue(quoteName);

  console.log('Step 3: Click "Save" button');
  // Locator for 'Save' button. Adjust based on your application.
  const saveButton: Locator = page.getByRole('button', { name: 'Save' });
  await saveButton.waitFor({ state: 'visible' });
  await saveButton.click();

  console.log('Expected Result 3: The quote is saved and a success message appears');
  // Locator for the success message display area. Adjust based on your application (e.g., a specific class, id, data-test-id).
  const successMessageLocator: Locator = page.locator('.success-message'); // Common class for success messages
  await successMessageLocator.waitFor({ state: 'visible' });
  await expect(successMessageLocator).toBeVisible();

  console.log('Step 4: Get the success message text');
  const successMessageText: string | null = await successMessageLocator.textContent();

  // Expected Result 4: Success message text is retrieved (implicitly checked by the next assertion).
  expect(successMessageText).not.toBeNull();

  console.log("Step 5: Verify that the success message contains the text 'was created'");
  console.log('Expected Result 5: Success message confirms the quote 'was created'');
  expect(successMessageText).toContain('was created');
});