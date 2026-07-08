import api from './api';

const indicatorService = {
  async getAllIndicators(params = {}) {
    const response = await api.get('/indicators', { params });
    return response.data;
  },

  async createIndicator(data) {
    const response = await api.post('/indicators', data);
    return response.data;
  },
};

export default indicatorService;
