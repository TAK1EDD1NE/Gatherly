// EmployeeDetailsSection.js
import React from 'react';

const EmployeeDetailsSection = ({ employees }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="mb-4 text-2xl font-bold text-gray-700">Employee Details</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-transparent border-opacity-0 rounded-xl">
          <thead>
            <tr className='bg-[#F362EA] rounded-md'>
              <th className="p-2 text-left ">Name</th>
              <th className="p-2 text-left ">Email</th>
              <th className="p-2 text-left ">Phone</th>
              <th className="p-2 text-left ">Password</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.name} className="hover:bg-gray-100">
                <td className="p-2 text-gray-700">{employee.name}</td>
                <td className="p-2 text-gray-700">{employee.email}</td>
                <td className="p-2 text-gray-700">{employee.phone}</td>
                <td className="p-2 text-gray-700">{employee.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDetailsSection;