import Cryptr from 'cryptr';
import cookie from 'js-cookie';

const secretKey = 'yourSecretKey';
const expirationDays = 1;
const cryptr = new Cryptr(secretKey);

export const storeUserSession = (userData: any) => {
  try {
    cookie.set('user', JSON.stringify(userData.user))
    const encryptedData = cryptr.encrypt(JSON.stringify(userData));
    cookie.set('userSession', encryptedData, { expires: expirationDays });
} catch (error) {
    console.error('Error storing user session:', error);
  }
};




export const retrieveUserSession = () => {
  try {
    const encryptedData = cookie.get('userSession');
    if (encryptedData) {
      const decryptedData = cryptr.decrypt(encryptedData);
      const userData = JSON.parse(decryptedData);
      return userData;
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
  }
};
