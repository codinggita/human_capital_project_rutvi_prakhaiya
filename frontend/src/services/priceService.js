import api from './api';

const priceService = {
  async getAllPrices(params = {}) {
    const response = await api.get('/prices', { params });
    return response.data;
  },

  async getPriceById(id) {
    const response = await api.get(`/prices/${id}`);
    return response.data;
  },

  async createPrice(data) {
    const response = await api.post('/prices', data);
    return response.data;
  },

  async updatePrice(id, data) {
    const response = await api.put(`/prices/${id}`, data);
    return response.data;
  },

  async patchPrice(id, data) {
    const response = await api.patch(`/prices/${id}`, data);
    return response.data;
  },

  async deletePrice(id) {
    const response = await api.delete(`/prices/${id}`);
    return response.data;
  },
};

export default priceService;
