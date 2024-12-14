import { Builder, By, until } from 'selenium-webdriver';

describe('Show Password Functionality', () => {
  let driver: any;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should toggle password visibility when clicked', async () => {
    await driver.get('http://localhost:3000/login');

    await driver.wait(until.elementLocated(By.id('password')), 5000);
    const passwordInput = await driver.findElement(By.id('password'));

    let inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');

    const showPasswordButton = await driver.findElement(By.css('button[type="button"]'));
    await showPasswordButton.click();

    inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('text'); // Password should be visible after clicking

    await showPasswordButton.click(); // Toggle back

    inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });
});
