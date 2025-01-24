// MetricComponent.js
import React from 'react';

const MetricComponent = ({ title, value, percentage }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-600">{title}</h2>
          <p className="text-2xl font-bold text-gray-800">{value} {title}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6">
      <span
          className={`text-sm font-medium ${
            percentage >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default MetricComponent;