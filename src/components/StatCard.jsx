import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;