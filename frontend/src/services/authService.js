import api from './api';

const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async changePassword(data) {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
};

export default authService;
