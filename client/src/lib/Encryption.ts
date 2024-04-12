import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { axiosNoAuth } from './AxiosBase';

const secretKey = '#Elef';

// Stores the user session in local storage and cookies
export const storeUserSession = (userData: { user: any; JWT: string }) => {
  try {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userData.user), secretKey).toString();
    localStorage.setItem('user', encryptedUser);
    const encryptedToken = CryptoJS.AES.encrypt(userData.JWT, secretKey).toString();
    Cookies.set('token', encryptedToken, { expires: 7 }); 
  } catch (error) {
    console.error('Error storing user session:', error);
  }
};

// Retrieves the user session from local storage
export const retrieveUserSession = (): any => {
  try {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(encryptedUser, secretKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedUser);
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
  }
};

// Retrieves the token from cookies
export const retrieveToken = (): string | null => {
  try {
    const encryptedToken = Cookies.get('token');
    if (encryptedToken) {
      const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8);
      return decryptedToken;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
  return null;
};

// Updates the user session by fetching new user data from the specified endpoint
export const updateUserSession = async (endpoint: string, id: string): Promise<any | null> => {
  try {
    const response = await axiosNoAuth.get(`${endpoint}/${id}`);
    const userData = response.data;
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userData), secretKey).toString();
    localStorage.setItem('user', encryptedUser);
    console.log(userData)
    return userData;
  } catch (error) {
    console.error('Error updating user session:', error);
    return null;
  }
};
