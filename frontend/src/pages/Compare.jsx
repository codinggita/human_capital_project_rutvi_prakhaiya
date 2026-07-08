import { useState } from 'react';
import { Layout } from '../components/Layout';
import { ChartCard } from '../components/ChartCard';
import { Loader } from '../components/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import compareService from '../services/compareService';
import { defaultYAxisProps, defaultXAxisProps, defaultTooltipProps } from '../utils/chartConfig';

export const Compare = () => {
  const [country1, setCountry1] = useState('USA');
  const [country2, setCountry2] = useState('CAN');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!country1 || !country2) return;
    setIsLoading(true);
    try {
      const response = await compareService.compareCountries(country1, country2);
      setData(response.data);
    } catch (err) {
      console.error('Error comparing countries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = data
    ? [
        { name: country1, value: data[country1]?.average || 0 },
        { name: country2, value: data[country2]?.average || 0 },
      ]
    : [];

  return (
    <Layout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Compare Data
        </h1>
        <p className="text-text-secondary">Compare price data between two countries or years.</p>
      </div>

      <div className="bg-card rounded-card p-5 sm:p-6 md:p-8 shadow-card border border-border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 items-end">
          <div className="min-w-0">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Country 1
            </label>
            <input
              type="text"
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Country 2
            </label>
            <input
              type="text"
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
            />
          </div>
          <button
            onClick={handleCompare}
            disabled={isLoading}
            className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto px-6 py-2.5 bg-primary-600 text-white rounded-btn font-semibold hover:bg-primary-700 disabled:opacity-50 transition-premium"
          >
            {isLoading ? 'Loading...' : 'Compare'}
          </button>
        </div>
      </div>

      {data && (
        <ChartCard title="Average Price Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 12, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" {...defaultXAxisProps} />
              <YAxis {...defaultYAxisProps} domain={[0, 'auto']} />
              <Tooltip {...defaultTooltipProps} />
              <Bar dataKey="value" fill="#334155" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </Layout>
  );
};
