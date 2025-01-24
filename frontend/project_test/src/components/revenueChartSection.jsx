// RevenueChartSection.js
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

const RevenueChartSection = ({ data }) => {
  return (
    <div className="p-4 mb-6 bg-white rounded-md shadow-md">
      <h3 className="mb-4 text-2xl font-bold text-gray-700">Revenue Details</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" className='drop-shadow-[#F362EA]'/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChartSection;