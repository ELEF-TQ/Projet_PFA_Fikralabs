import { Builder, By, until } from 'selenium-webdriver';
import Swal from 'sweetalert2';

describe('Logout Functionality', () => {
  let driver: any;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should show a logout confirmation and logout the user', async () => {
    // Simulate logged-in state
    await driver.get('http://localhost:5173/');
    const userProfileButton = await driver.findElement(By.css('.sidebar__logo'));
    await userProfileButton.click();

    // Click on the logout button
    const logoutButton = await driver.findElement(By.css('button.logout'));
    await logoutButton.click();

    // Simulate the confirmation dialog (you can customize this part based on your Swal implementation)
    const confirmButton = await driver.findElement(By.css('.swal2-confirm'));
    await confirmButton.click();

    // Verify redirection to login page after logout
    await driver.wait(until.urlContains('/login'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/login');
  });
});
