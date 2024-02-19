'use server'

import Cryptr from 'cryptr';
import { cookies } from "next/headers";

const secretKey = 'yourSecretKey';
const expirationDays = 1;

const cryptr = new Cryptr(secretKey);

export const storeUserSession = (userData: any) => {
    console.log('here')
  try {
    const userDataString = JSON.stringify(userData);
    const encryptedData = cryptr.encrypt(JSON.stringify(userData));   
    console.log( "here" ,encryptedData)
    cookies().set('userSession', encryptedData, { expires: expirationDays });  } catch (error) {
        console.error('Error storing user session:', error);
   
  }
};


export const retrieveUserSession = () => {
  try {
    const encryptedData =  cookies().get('userSession');
    if (encryptedData) {
        const userDataString = JSON.stringify(encryptedData);
      const decryptedBytes = cryptr.decrypt(userDataString);
      const userData = JSON.parse(decryptedBytes);
      return userData;
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
  }
};
