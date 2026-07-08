import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { Loader } from '../components/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Globe, BarChart3, DollarSign } from 'lucide-react';
import statsService from '../services/statsService';
import { formatCompactNumber, formatNumberWithCommas, shouldUseLogScale, getLogTicks } from '../utils/formatNumber';
import { defaultYAxisProps, defaultXAxisProps, defaultTooltipProps } from '../utils/chartConfig';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [topCountries, setTopCountries] = useState([]);
  const [yearlyAvg, setYearlyAvg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceStats, topCountriesRes, yearlyAvgRes] = await Promise.all([
          statsService.getPriceStats(),
          statsService.getTopCountries(),
          statsService.getYearlyAverage(),
        ]);

        setStats(priceStats);
        setTopCountries(topCountriesRes.data || []);
        setYearlyAvg(yearlyAvgRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const countryChartData = topCountries.slice(0, 10);
  const countryValues = countryChartData.map((d) => d.avgValue);
  const useLogScale = shouldUseLogScale(countryValues);

  let countryLogTicks = [];
  let countryLogDomain = [0, 'auto'];
  if (useLogScale && countryValues.length > 0) {
    countryLogTicks = getLogTicks(countryValues);
    countryLogDomain = [countryLogTicks[0], countryLogTicks[countryLogTicks.length - 1]];
  }

  const yearlyValues = yearlyAvg.map((d) => d.avgValue);
  const useLogScaleYearly = shouldUseLogScale(yearlyValues);

  let yearlyLogTicks = [];
  let yearlyLogDomain = [0, 'auto'];
  if (useLogScaleYearly && yearlyValues.length > 0) {
    yearlyLogTicks = getLogTicks(yearlyValues);
    yearlyLogDomain = [yearlyLogTicks[0], yearlyLogTicks[yearlyLogTicks.length - 1]];
  }

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
          Dashboard Overview
        </h1>
        <p className="text-text-secondary">Welcome back! Here's what's happening with your data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <StatCard
          title="Total Records"
          value={formatNumberWithCommas(stats?.data?.count)}
          icon={BarChart3}
        />
        <StatCard
          title="Avg Value"
          value={formatCompactNumber(stats?.data?.avg)}
          icon={TrendingUp}
        />
        <StatCard
          title="Min Value"
          value={formatCompactNumber(stats?.data?.min)}
          icon={DollarSign}
        />
        <StatCard
          title="Max Value"
          value={formatCompactNumber(stats?.data?.max)}
          icon={Globe}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        <ChartCard title="Top Countries by Average Value">
          {useLogScale && (
            <p className="text-xs text-text-muted mb-3">Log scale applied because Venezuela's inflation index spans a much larger range than other countries.</p>
          )}
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={countryChartData} margin={{ top: 12, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="_id"
                {...defaultXAxisProps}
                tick={{ fontSize: 11, fill: '#475569' }}
              />
              <YAxis
                {...defaultYAxisProps}
                scale={useLogScale ? 'log' : 'linear'}
                domain={useLogScale ? countryLogDomain : [0, 'auto']}
                ticks={useLogScale ? countryLogTicks : undefined}
                allowDataOverflow={useLogScale}
              />
              <Tooltip {...defaultTooltipProps} />
              <Bar dataKey="avgValue" fill="#334155" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Yearly Average Value">
          {useLogScaleYearly && (
            <p className="text-xs text-text-muted mb-3">Log scale applied due to extreme yearly value range</p>
          )}
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearlyAvg} margin={{ top: 12, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="_id" {...defaultXAxisProps} />
              <YAxis
                {...defaultYAxisProps}
                scale={useLogScaleYearly ? 'log' : 'linear'}
                domain={useLogScaleYearly ? yearlyLogDomain : [0, 'auto']}
                ticks={useLogScaleYearly ? yearlyLogTicks : undefined}
                allowDataOverflow={useLogScaleYearly}
              />
              <Tooltip {...defaultTooltipProps} />
              <Line
                type="monotone"
                dataKey="avgValue"
                stroke="#334155"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
                activeDot={{ r: 6 }}
                isAnimationActive={!useLogScaleYearly}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
};
