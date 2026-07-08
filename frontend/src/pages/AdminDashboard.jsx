import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { Loader } from '../components/Loader';
import { TrendingUp, Globe, Users, BarChart3 } from 'lucide-react';
import adminService from '../services/adminService';
import { formatCompactNumber, formatNumberWithCommas } from '../utils/formatNumber';

export const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [dashboardRes, pricesRes] = await Promise.all([
          adminService.getAdminDashboard(),
          adminService.getAdminPrices(),
        ]);
        setDashboardData(dashboardRes.data);
        setPrices(pricesRes.data || []);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const columns = [
    { key: 'country', title: 'Country' },
    { key: 'indicator', title: 'Indicator' },
    { key: 'value', title: 'Value', render: (v) => formatCompactNumber(v, 2) },
    { key: 'year', title: 'Year' },
    { key: 'month', title: 'Month' },
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
          Admin Dashboard
        </h1>
        <p className="text-text-secondary">Manage the application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <StatCard
          title="Total Prices"
          value={formatNumberWithCommas(dashboardData?.totalPrices)}
          icon={BarChart3}
        />
        <StatCard
          title="Total Countries"
          value={formatNumberWithCommas(dashboardData?.totalCountries)}
          icon={Globe}
        />
        <StatCard
          title="Total Indicators"
          value={formatNumberWithCommas(dashboardData?.totalIndicators)}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Users"
          value={formatNumberWithCommas(dashboardData?.totalUsers)}
          icon={Users}
        />
      </div>

      <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            Recent Prices
          </h2>
        </div>
        <DataTable
          columns={columns}
          data={prices}
          emptyMessage="No prices found"
        />
      </div>
    </Layout>
  );
};
