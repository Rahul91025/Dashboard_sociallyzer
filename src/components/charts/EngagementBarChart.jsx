import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const EngagementBarChart = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
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
  );
};

export default EngagementBarChart;