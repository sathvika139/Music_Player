export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  songs: `${API_BASE_URL}/songs`,
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  favourites: `${API_BASE_URL}/favourites`,
  search: `${API_BASE_URL}/search`,
};
