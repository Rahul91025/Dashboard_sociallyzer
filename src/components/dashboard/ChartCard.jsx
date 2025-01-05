import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;