import React from 'react';

const ProgramDetailsTable = ({ programs }) => {
  return (
    <div className="w-full max-w-xl mx-auto text-gray-700">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Start</th>
            <th className="px-4 py-2 text-left">END</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr className="border-b">
            <td className="px-4 py-2">{program.description}</td>
            <td className="px-4 py-2">{program.start}</td>
            <td className="px-4 py-2">{program.end}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramDetailsTable;