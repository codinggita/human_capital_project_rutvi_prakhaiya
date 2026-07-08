import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices, setFilters, setPagination } from '../store/priceSlice';
import { Layout } from '../components/Layout';
import { FilterPanel } from '../components/FilterPanel';
import { DataTable } from '../components/DataTable';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { formatCompactNumber } from '../utils/formatNumber';

export const Prices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prices, isLoading, filters, pagination, sort } = useSelector((state) => state.prices);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const params = {
      ...filters,
      search: debouncedSearch,
      page: pagination.page,
      limit: pagination.limit,
      sort,
    };
    dispatch(fetchPrices(params));
  }, [dispatch, filters, debouncedSearch, pagination.page, pagination.limit, sort]);

  useEffect(() => {
    const uniqueCountries = [...new Set(prices.map(p => p.country))];
    const uniqueIndicators = [...new Set(prices.map(p => p.indicator))];
    setCountries(uniqueCountries);
    setIndicators(uniqueIndicators);
  }, [prices]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters({ ...filters, ...newFilters }));
  };

  const handlePageChange = (page) => {
    dispatch(setPagination({ ...pagination, page }));
  };

  const handleLimitChange = (limit) => {
    dispatch(setPagination({ ...pagination, limit, page: 1 }));
  };

  const columns = [
    { key: 'country', title: 'Country' },
    { key: 'indicator', title: 'Indicator' },
    { key: 'value', title: 'Value', render: (val) => formatCompactNumber(val, 2) },
    { key: 'year', title: 'Year' },
    { key: 'month', title: 'Month' },
  ];

  return (
    <Layout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Price Data
        </h1>
        <p className="text-text-secondary">Explore and filter price records.</p>
      </div>

      <div className="mb-6">
        <SearchBar
          placeholder="Search by country or indicator..."
          value={searchQuery}
          onChange={(q) => setSearchQuery(q)}
        />
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        countries={countries}
        indicators={indicators}
        years={[2020, 2021, 2022, 2023, 2024]}
        months={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
      />

      <div className="bg-card rounded-card border border-border shadow-card overflow-hidden">
        <DataTable
          columns={columns}
          data={prices}
          isLoading={isLoading}
          onRowClick={(row) => navigate(`/prices/${row._id}`)}
          emptyMessage="No price records found"
        />
        {!isLoading && prices.length > 0 && (
          <Pagination
            page={pagination.page}
            limit={pagination.limit}
            total={pagination.total || 0}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </div>
    </Layout>
  );
};
