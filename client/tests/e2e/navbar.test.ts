import { Builder, By, until } from 'selenium-webdriver';

describe('Navbar Navigation', () => {
  let driver: any;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should navigate to login page', async () => {
    await driver.get('http://localhost:5173/');

    const loginLink = await driver.findElement(By.linkText('Connexion'));
    await loginLink.click();

    await driver.wait(until.urlContains('/login'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/login');
  });

  it('should navigate to signup page', async () => {
    await driver.get('http://localhost:5173/');

    const signupLink = await driver.findElement(By.linkText('S’inscrire'));
    await signupLink.click();

    await driver.wait(until.urlContains('/signup'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/signup');
  });

  it('should navigate to evaluation page when user is not logged in', async () => {
    await driver.get('http://localhost:5173/');

    const evaluationLink = await driver.findElement(By.linkText('Évaluation'));
    await evaluationLink.click();

    await driver.wait(until.urlContains('/evaluation'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/evaluation');
  });

  it('should navigate to profile page when user is logged in', async () => {
    await driver.get('http://localhost:5173/');

    const user = { role: 'ADMIN' }; // Simulate a logged-in user
    const userProfileLink = await driver.findElement(By.linkText(user.role.toLowerCase()));
    await userProfileLink.click();

    await driver.wait(until.urlContains(`/${user.role.toLowerCase()}/profile`), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe(`http://localhost:5173/${user.role.toLowerCase()}/profile`);
  });
});
