import { Link } from 'react-router-dom';
import { TrendingUp, Globe, BarChart3, ArrowRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Human Capital <span className="text-primary-600">Price Index</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore global price data, compare countries, and analyze trends with our powerful data dashboard.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Link
            to="/register"
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Price Trends</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Track price movements across different countries and indicators over time.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Globe size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Global Comparison</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Compare price data between countries and years to identify patterns.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Advanced Analytics</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get detailed statistics and insights with our analytics tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
