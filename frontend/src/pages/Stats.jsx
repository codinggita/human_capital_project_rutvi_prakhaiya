import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ChartCard } from '../components/ChartCard';
import { Loader } from '../components/Loader';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import statsService from '../services/statsService';
import { formatCompactNumber, formatNumberWithCommas, shouldUseLogScale, getLogTicks } from '../utils/formatNumber';
import { defaultYAxisProps, defaultXAxisProps, defaultTooltipProps } from '../utils/chartConfig';

const COLORS = ['#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0'];

export const Stats = () => {
  const [yearlyAvg, setYearlyAvg] = useState([]);
  const [monthlyAvg, setMonthlyAvg] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [valueDistribution, setValueDistribution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const yearlyValues = yearlyAvg.map((d) => d.avgValue);
  const useLogScaleYearly = shouldUseLogScale(yearlyValues);

  let yearlyLogTicks = [];
  let yearlyLogDomain = [0, 'auto'];
  if (useLogScaleYearly && yearlyValues.length > 0) {
    yearlyLogTicks = getLogTicks(yearlyValues);
    yearlyLogDomain = [yearlyLogTicks[0], yearlyLogTicks[yearlyLogTicks.length - 1]];
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [yearlyRes, monthlyRes, topCountriesRes, distributionRes] = await Promise.all([
          statsService.getYearlyAverage(),
          statsService.getMonthlyAverage(),
          statsService.getTopCountries(),
          statsService.getValueDistribution(),
        ]);

        setYearlyAvg(yearlyRes.data || []);
        setMonthlyAvg(monthlyRes.data || []);
        setTopCountries(topCountriesRes.data || []);
        setValueDistribution(distributionRes.data || []);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

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
          Statistics & Analytics
        </h1>
        <p className="text-text-secondary">Detailed analytics and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-6">
        <ChartCard title="Yearly Average">
          {useLogScaleYearly && (
            <p className="text-xs text-text-muted mb-3">Log scale applied due to extreme value range</p>
          )}
          <ResponsiveContainer width="100%" height={300}>
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
              <Line type="monotone" dataKey="avgValue" stroke="#334155" strokeWidth={2} dot={{ r: 4, fill: '#ffffff' }} isAnimationActive={!useLogScaleYearly} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Average">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyAvg} margin={{ top: 12, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="_id" {...defaultXAxisProps} />
              <YAxis {...defaultYAxisProps} domain={[0, 'auto']} />
              <Tooltip {...defaultTooltipProps} />
              <Bar dataKey="avgValue" fill="#475569" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        <ChartCard title="Top Countries">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountries.slice(0, 8)} margin={{ top: 12, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="_id" {...defaultXAxisProps} />
              <YAxis {...defaultYAxisProps} />
              <Tooltip
                {...defaultTooltipProps}
                formatter={(v) => formatNumberWithCommas(v)}
              />
              <Bar dataKey="count" fill="#64748b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Value Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={valueDistribution.slice(0, 6)}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="46%"
                outerRadius="68%"
              >
                {valueDistribution.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: '#475569', lineHeight: '18px' }}
              />
              <Tooltip
                {...defaultTooltipProps}
                formatter={(v) => formatNumberWithCommas(v)}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
};
