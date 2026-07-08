import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable } from '../components/DataTable';
import { Loader } from '../components/Loader';
import countryService from '../services/countryService';

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryService.getAllCountries();
        setCountries(response.data || []);
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const columns = [
    { key: 'name', title: 'Country Name' },
    { key: 'code', title: 'Country Code' },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader size={48} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Countries
        </h1>
        <p className="text-text-secondary">Browse all available countries in the dataset.</p>
      </div>

      <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
        <DataTable
          columns={columns}
          data={countries}
          isLoading={isLoading}
          emptyMessage="No countries found"
        />
      </div>
    </Layout>
  );
};
