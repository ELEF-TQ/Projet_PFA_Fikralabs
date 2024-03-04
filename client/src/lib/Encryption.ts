import CryptoJS from 'crypto-js';
import cookie from 'js-cookie';

const secretKey = 'yourSecretKey';

export const storeUserSession = (userData: any) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), secretKey).toString();
    cookie.set('session', encryptedData);
  } catch (error) {
    console.error('Error storing user session:', error);
  }
};

export const retrieveUserSession = () => {
  try {
    const encryptedData = cookie.get('session');
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
  }
};
