import { Builder, By, until } from 'selenium-webdriver';
import { Key } from 'selenium-webdriver';

describe('Login Page', () => {
  let driver: any;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should login successfully with valid credentials', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.wait(until.elementLocated(By.id('email')), 5000);
    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('testuser@example.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('password123');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    await driver.wait(until.elementLocated(By.css('h1')), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/dashboard');
  });

  it('should display error message with invalid credentials', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.wait(until.elementLocated(By.id('email')), 5000);
    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('invaliduser@example.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('wrongpassword');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    await driver.wait(until.elementLocated(By.css('.error-message')), 5000); // Update with your error element's class
    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
    expect(errorMessage).toBe('Invalid email or password');
  });
});
