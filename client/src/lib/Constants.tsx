import axios from 'axios';

const BASE_URL = "http://localhost:3001"


export const axiosNoAuth = axios.create({
  baseURL:  BASE_URL,
  headers: {"Content-Type" : "application/json"},
});

export const axiosAuth = axios.create({
  baseURL:  BASE_URL,
  headers: {"Content-Type":"application/json"}
});