import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-slate-200 dark:text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
