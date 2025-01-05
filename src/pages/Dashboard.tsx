import React from 'react';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { useSupabaseData } from '../hooks/useSupabaseData';

const Dashboard = () => {
  const { data, loading, error } = useSupabaseData();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
  const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
  const totalComments = data.reduce((sum, item) => sum + item.comments, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Social Media Performance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Likes"
          value={totalLikes}
          icon={Heart}
          trend={12}
          color="bg-pink-500"
        />
        <StatCard
          title="Total Shares"
          value={totalShares}
          icon={Share2}
          trend={8}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Comments"
          value={totalComments}
          icon={MessageCircle}
          trend={-5}
          color="bg-purple-500"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Engagement Overview</h2>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Dashboard;