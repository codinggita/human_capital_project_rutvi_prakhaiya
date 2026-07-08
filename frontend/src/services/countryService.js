import api from './api';

const countryService = {
  async getAllCountries(params = {}) {
    const response = await api.get('/countries', { params });
    return response.data;
  },

  async createCountry(data) {
    const response = await api.post('/countries', data);
    return response.data;
  },
};

export default countryService;
