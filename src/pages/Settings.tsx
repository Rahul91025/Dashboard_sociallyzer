import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const Settings = () => {
  const { user, loading } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>Please sign in to access settings</div>;

  const handleSignOut = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="max-w-xl bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}

        <button
          onClick={handleSignOut}
          disabled={updating}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {updating ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
};

export default Settings;