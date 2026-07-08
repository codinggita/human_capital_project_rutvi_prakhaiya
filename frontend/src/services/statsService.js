import api from './api';

const statsService = {
  async getPriceStats() {
    const response = await api.get('/stats/prices');
    return response.data;
  },

  async getTopCountries() {
    const response = await api.get('/stats/top-countries');
    return response.data;
  },

  async getYearlyAverage() {
    const response = await api.get('/stats/yearly-average');
    return response.data;
  },

  async getMonthlyAverage() {
    const response = await api.get('/stats/monthly-average');
    return response.data;
  },

  async getValueDistribution() {
    const response = await api.get('/stats/value-distribution');
    return response.data;
  },

  async getStatsByCountry(countryCode) {
    const response = await api.get(`/stats/country/${countryCode}`);
    return response.data;
  },

  async getStatsByYear(year) {
    const response = await api.get(`/stats/year/${year}`);
    return response.data;
  },
};

export default statsService;
