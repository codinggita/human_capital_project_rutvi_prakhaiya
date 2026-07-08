import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/Layout';
import authService from '../services/authService';

export const Profile = () => {
  const { user } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const password = watch('newPassword');

  const handleChangePassword = async (data) => {
    try {
      await authService.changePassword(data);
      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      reset();
    } catch (err) {
      toast.error('Error changing password');
    }
  };

  return (
    <Layout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          My Profile
        </h1>
        <p className="text-text-secondary">Manage your account settings.</p>
      </div>

      <div className="bg-card rounded-card p-5 sm:p-6 md:p-8 shadow-card border border-border mb-6">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-wider text-text-muted font-medium mb-1">Name</p>
          <p className="text-xl font-semibold text-text-primary">{user?.name}</p>
        </div>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-wider text-text-muted font-medium mb-1">Email</p>
          <p className="text-xl font-semibold text-text-primary">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-text-muted font-medium mb-1">Role</p>
          <p className="text-xl font-semibold text-text-primary">{user?.role}</p>
        </div>
      </div>

      <div className="bg-card rounded-card p-5 sm:p-6 md:p-8 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-5">
          Change Password
        </h2>
        {isChangingPassword ? (
          <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Current Password
              </label>
              <input
                type="password"
                {...register('oldPassword', { required: 'Required' })}
                className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                New Password
              </label>
              <input
                type="password"
                {...register('newPassword', { required: 'Required', minLength: 6 })}
                className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Required',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
                className="w-full px-4 py-2.5 border border-border rounded-btn bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-premium"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="px-4 py-2.5 bg-primary-600 text-white rounded-btn font-semibold hover:bg-primary-700 transition-premium"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  reset();
                }}
                className="px-4 py-2.5 border border-border text-text-secondary rounded-btn font-semibold hover:bg-background transition-premium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-primary-600 text-white rounded-btn font-semibold hover:bg-primary-700 transition-premium"
          >
            Change Password
          </button>
        )}
      </div>
    </Layout>
  );
};
