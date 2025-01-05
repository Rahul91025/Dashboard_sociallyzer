import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TrendLineChart = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
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
  );
};

export default TrendLineChart;