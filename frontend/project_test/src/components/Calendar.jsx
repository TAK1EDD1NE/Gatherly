import React from 'react';

const Calendar = () => {
  // Generate the calendar days for March 2022
  const days = [
    29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <div className="p-8 bg-white border-r shadow-md">
      <h2 className="mb-4 text-lg font-bold">Month</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center py-2 rounded-md ${
              index === 4 || index === 10 ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;