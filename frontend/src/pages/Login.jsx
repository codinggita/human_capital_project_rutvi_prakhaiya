import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';

export const Login = () => {
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Login successful!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="bg-card rounded-card border border-border shadow-card p-6 sm:p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-7 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-premium"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-premium"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary-600 text-white rounded-btn font-semibold hover:bg-primary-700 transition-premium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader size={20} />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-7">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
