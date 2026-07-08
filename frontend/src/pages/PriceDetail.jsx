import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPriceById } from '../store/priceSlice';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { ArrowLeft } from 'lucide-react';

export const PriceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { priceDetail, isLoading } = useSelector((state) => state.prices);

  useEffect(() => {
    if (id) {
      dispatch(fetchPriceById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader size={48} />
        </div>
      </Layout>
    );
  }

  if (!priceDetail) {
    return (
      <Layout>
        <div className="text-center py-12 text-slate-600 dark:text-slate-400">
          Price record not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/prices" className="flex items-center gap-2 text-primary-600 hover:underline">
          <ArrowLeft size={18} />
          Back to Prices
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Price Record Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Country</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{priceDetail.country}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Indicator</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{priceDetail.indicator}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Value</p>
            <p className="text-3xl font-bold text-primary-600">{priceDetail.value.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Year</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{priceDetail.year}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Month</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{priceDetail.month}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
