import React from 'react';

const SalleCard = ({ image, title, rating, capacity, price, availability }) => {
  return (
    <div className="w-full overflow-hidden bg-white shadow-md rounded-3xl">
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-64" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${
                  index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 font-medium text-gray-900">{rating}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">Capacity: {capacity}</p>
          <p className="text-gray-500">Price: {price}</p>
          <p className="text-gray-500">Availability: {availability ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default SalleCard;