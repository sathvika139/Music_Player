export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  songs: `${API_BASE_URL}/api/songs`,
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    logout: `${API_BASE_URL}/api/auth/logout`,
  },
  favourites: `${API_BASE_URL}/api/favourites`,
  search: `${API_BASE_URL}/api/search`,
};
