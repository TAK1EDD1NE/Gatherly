import React from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const events = [
    { id: 1, name: 'Event one', type: 'party or conference' },
    { id: 2, name: 'Event one', type: 'party or conference', isNew: true },
    { id: 3, name: 'Event one', type: 'party or conference' },
    { id: 4, name: 'Event one', type: 'party or conference' },
    { id: 5, name: 'Event one', type: 'party or conference' },
    { id: 6, name: 'Event one', type: 'party or conference', isNew: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        {/* Sidebar content (same as Dashboard) */}
      </aside>
      <main className="flex-1 p-8">
        <h1 className="mb-6 text-2xl font-semibold">Salle Amizoure</h1>
        <div className="p-6 mb-8 text-white bg-purple-600 rounded-lg">
          <h2 className="mb-2 text-xl font-semibold">Salle Amizour</h2>
          <h3 className="mb-2 text-3xl font-bold">manage your events in our software</h3>
          <p className="mb-4">enter her you description please</p>
          <button className="px-4 py-2 text-white bg-green-500 rounded-md">Today events</button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="py-2 pl-10 pr-4 border rounded-md"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select className="px-4 py-2 border rounded-md">
            <option>all events</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="relative p-6 bg-white rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="p-2 mr-4 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-gray-500">{event.type}</p>
                </div>
              </div>
              {event.isNew && (
                <span className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded-full top-2 right-2">
                  new
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventList;

