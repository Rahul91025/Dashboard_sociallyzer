import React from 'react';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { sampleEngagementData } from '../data/sampleData';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

const Dashboard = () => {
  const data = sampleEngagementData;

  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
  const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
  const totalComments = data.reduce((sum, item) => sum + item.comments, 0);

  const pieData = data.map(item => ({
    name: item.post_type,
    value: item.likes + item.shares + item.comments
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Social Media Performance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Engagement Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Engagement Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Metrics Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="post_type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#FF6B6B" />
                <Bar dataKey="shares" fill="#4ECDC4" />
                <Bar dataKey="comments" fill="#45B7D1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Trends Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Engagement Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="post_type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#FF6B6B" />
                <Line type="monotone" dataKey="shares" stroke="#4ECDC4" />
                <Line type="monotone" dataKey="comments" stroke="#45B7D1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Detailed Analytics</h2>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;