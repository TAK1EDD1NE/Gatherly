import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles
import dayjs from "dayjs";
import { ExpandMore } from '@mui/icons-material';

const AddNewTask = ({ isOpen, onClose, employees }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [assignedEmployees, setAssignedEmployees] = useState([]);

    // Reference to modal container
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add logic to save the new employee data
    console.log({ title, description, deadline: dayjs(deadline).format("YYYY-MM-DD"), assignedEmployees });
    onClose();
  };

  const handleAssignEmployee = (employee) => {
    if (assignedEmployees.includes(employee)) {
      setAssignedEmployees(assignedEmployees.filter(e => e !== employee));
    } else {
      setAssignedEmployees([...assignedEmployees, employee]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div ref={modalRef} className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">Add new employee for team work</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <DatePicker selected={deadline} onChange={setDeadline} dateFormat="yyyy-MM-dd" className='w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400'/>
          </div>
          <div className="mb-4">
            <label htmlFor="assigned-employees" className="block mb-2 font-bold text-gray-700">
              Assigned Employees
            </label>
            <div className="w-full px-3 py-2 border rounded-lg">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className={`flex items-center justify-between ${
                    assignedEmployees.includes(employee) ? 'bg-blue-100' : ''
                  } p-2 rounded-md cursor-pointer`}
                  onClick={() => handleAssignEmployee(employee)}
                >
                  <span className='text-gray-700'>{employee.name}</span>
                  {assignedEmployees.includes(employee) && (
                    <ExpandMore className="w-5 h-5 text-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#F362EA] hover:shadow-lg hover:shadow-[#F362EA] text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;