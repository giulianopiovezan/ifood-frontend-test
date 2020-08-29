/* eslint-disable no-param-reassign */
import axios from 'axios';
import authorize from './authorization';

const api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

api.interceptors.request.use(async config => {
  const token = await authorize();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  async config => config,
  error => Promise.reject(error.response),
);

export default api;
