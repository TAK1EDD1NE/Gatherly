import React from 'react';

const EventGuests = ({ Guests }) => {
  return (
    <div className="w-full max-w-xl mx-auto text-gray-700">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Guest ID</th>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {Guests.map((guest) => (
            <tr className="border-b">
            <td className="px-4 py-2">{guest.id}</td>
            <td className="px-4 py-2">{guest.firstname}</td>
            <td className="px-4 py-2">{guest.lastname}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventGuests;