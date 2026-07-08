import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';

export const Register = () => {
  const { register: registerUser, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');

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
    const result = await registerUser(data);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Registration successful!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="bg-card rounded-card border border-border shadow-card p-6 sm:p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-7 text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-premium"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-premium"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-premium"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
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
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-7">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
