import axios from 'axios';

const BASE_URL = "http://localhost:3001";

// Axios instance for requests without authentication
export const axiosNoAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Axios instance for requests with authentication
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Function to handle multipart/form-data requests with axiosNoAuth
export const axiosNoAuthMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// Function to handle multipart/form-data requests with axiosAuth
export const axiosAuthMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
