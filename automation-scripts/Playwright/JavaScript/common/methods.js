const locators = require('../locators/locators');

async function login(page, username, password, baseUrl) {
  console.log(`Navigating to login page: ${baseUrl}`);
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  console.log('✓ Login page loaded successfully.');

  console.log(`Step 1: Entering username: ${username}`);
  await page.locator(locators.usernameField).waitFor({ state: 'visible', timeout: 10000 });
  await page.locator(locators.usernameField).fill(username);
  console.log('✓ Username entered.');

  console.log('Step 2: Entering password (masked)');
  await page.locator(locators.passwordField).waitFor({ state: 'visible', timeout: 10000 });
  await page.locator(locators.passwordField).fill(password);
  console.log('✓ Password entered.');
}

module.exports = {
  login,
};