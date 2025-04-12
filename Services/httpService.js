import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://task-manager-app-hirda.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor to add access token from AsyncStorage
api.interceptors.request.use(
  async config => {
    const token = true;
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor (optional)
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    if (status === 403) {
      await AsyncStorage.clear(); // Clear storage if forbidden
    }
    return Promise.reject(error.response?.data || 'Something went wrong');
  },
);

// Generic GET method
const getData = async (url, params = {}, customHeaders = {}) => {
  try {
    const response = await api.get(url, {
      params,
      headers: customHeaders,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic  method
const postData = async (url, data = {}, customHeaders = {}) => {
  try {
    const response = await api.post(url, data, {
      headers: customHeaders,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// Generic PATCH method
const patchData = async (url, data = {}, customHeaders = {}) => {
  try {
    const response = await api.patch(url, data, {
      headers: customHeaders,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getData, postData, patchData};
