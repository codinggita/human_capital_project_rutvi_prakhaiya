import api from './api';

const searchService = {
  async searchPrices(q) {
    const response = await api.get('/search/prices', { params: { q } });
    return response.data;
  },

  async searchByCountryName(name) {
    const response = await api.get('/search/country', { params: { name } });
    return response.data;
  },

  async searchByIndicator(text) {
    const response = await api.get('/search/indicator', { params: { text } });
    return response.data;
  },

  async searchByValue(value) {
    const response = await api.get('/search/value', { params: { value } });
    return response.data;
  },
};

export default searchService;
