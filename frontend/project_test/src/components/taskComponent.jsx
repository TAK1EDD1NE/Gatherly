import React, { useState } from 'react';

const TaskComponent = ({ task, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      className={`mb-6 flex items-center justify-between px-6 py-8 border-b  hover:bg-[#F362EA] rounded-2xl ${
        isSelected ? 'bg-[#F362EA] shadow-2xl' : 'bg-white'
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="mr-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <div className="text-sm text-gray-900">{task.name}</div>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            isSelected
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;