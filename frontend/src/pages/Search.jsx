import { useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { DataTable } from '../components/DataTable';
import searchService from '../services/searchService';
import { formatCompactNumber } from '../utils/formatNumber';

export const Search = () => {
  const [searchType, setSearchType] = useState('prices');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      let response;
      switch (searchType) {
        case 'country':
          response = await searchService.searchByCountryName(query);
          break;
        case 'indicator':
          response = await searchService.searchByIndicator(query);
          break;
        case 'value':
          response = await searchService.searchByValue(parseFloat(query));
          break;
        default:
          response = await searchService.searchPrices(query);
      }
      setResults(response.data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'country', title: 'Country' },
    { key: 'indicator', title: 'Indicator' },
    { key: 'value', title: 'Value', render: (v) => formatCompactNumber(v, 2) },
    { key: 'year', title: 'Year' },
    { key: 'month', title: 'Month' },
  ];

  return (
    <Layout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Search
        </h1>
        <p className="text-text-secondary">Search the price index dataset.</p>
      </div>

      <div className="bg-card rounded-card p-5 sm:p-6 md:p-8 shadow-card border border-border mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
          >
            <option value="prices">Search Prices</option>
            <option value="country">Search by Country</option>
            <option value="indicator">Search by Indicator</option>
            <option value="value">Search by Value</option>
          </select>
          <div className="flex-1 min-w-0">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={`Search ${searchType}...`}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 text-white rounded-btn font-semibold hover:bg-primary-700 disabled:opacity-50 transition-premium"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
        <DataTable
          columns={columns}
          data={results}
          isLoading={isLoading}
          emptyMessage="No results found"
        />
      </div>
    </Layout>
  );
};
