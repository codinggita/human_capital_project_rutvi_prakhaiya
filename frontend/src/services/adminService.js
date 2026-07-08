import api from './api';

const adminService = {
  async getAdminDashboard() {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  async getAdminStats() {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  async getAdminPrices(params = {}) {
    const response = await api.get('/admin/prices', { params });
    return response.data;
  },

  async createAdminPrice(data) {
    const response = await api.post('/admin/prices', data);
    return response.data;
  },

  async updateAdminPrice(id, data) {
    const response = await api.patch(`/admin/prices/${id}`, data);
    return response.data;
  },

  async deleteAdminPrice(id) {
    const response = await api.delete(`/admin/prices/${id}`);
    return response.data;
  },
};

export default adminService;
