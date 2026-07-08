import api from './api';

const compareService = {
  async compareCountries(country1, country2) {
    const response = await api.get('/compare', { params: { country1, country2 } });
    return response.data;
  },

  async compareYears(year1, year2) {
    const response = await api.get('/compare/year', { params: { year1, year2 } });
    return response.data;
  },
};

export default compareService;
