import { Page, expect } from '@playwright/test';
import { locators } from '../locators/locators';

/**
 * Logs in a user to the application.
 * @param page Playwright Page object.
 * @param username The username to use for login.
 * @param password The password to use for login.
 * @param loginUrl The URL of the login page.
 * @param postLoginUrlPart A part of the expected URL after successful login (e.g., '/dashboard').
 */
export async function login(page: Page, username: string, password: string, loginUrl: string, postLoginUrlPart: string) {
  console.log(`Step: Navigating to login page: ${loginUrl}`);
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

  console.log('Step: Filling username and password fields.');
  await page.locator(locators.usernameField).fill(username);
  await page.locator(locators.passwordField).fill(password);

  console.log('Step: Clicking login button.');
  await page.locator(locators.loginSubmitButton).click();

  console.log(`Verification: Checking for navigation to URL containing: ${postLoginUrlPart}`);
  await expect(page).toHaveURL(new RegExp(`.*${postLoginUrlPart}`));
}