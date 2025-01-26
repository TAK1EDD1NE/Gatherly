import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import EventCard from "../components/eventCard";

const EventList = () => {
  const events = [
    { id: 1, title: "Event one", type: "meeting or conference", isNew: false },
    { id: 2, title: "Event two", type: "party or gaming", isNew: true },
    { id: 3, title: "Event three", type: "party or conference", isNew: false },
    { id: 4, title: "Event four", type: "drinking or conference", isNew: false },
    { id: 5, title: "Event five", type: "party or conference", isNew: true },
    { id: 6, title: "Event six", type: "party or conference", isNew: false },
  ];

  const [filterText, setFilterText] = useState("");

  // Filter the events based on the input text
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={"/employees"} onNavigate={() => {}} />
      <div className="flex-1 px-6">
        <TopBar />
        <div className="px-5 py-7 bg-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-700">Evenements</h1>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="bg-[#F362EA] p-8 rounded-3xl w-full">
              <h1 className="mb-4 text-3xl font-bold">Salle Amizour</h1>
              <p className="mb-6 text-xl">Manage your events in our software</p>
              <button
                variant="primary"
                className="px-4 py-2 font-bold text-white bg-green-500 hover:bg-green-600 rounded-3xl"
              >
                Today events
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 mx-6">
              <input
                type="text"
                placeholder="Search..."
                className="w-1/2 px-4 py-2 bg-white rounded-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-[#F362EA]"
                value={filterText} // Controlled input
                onChange={(e) => setFilterText(e.target.value)} // Update state
              />
            </div>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#F362EA] border border-transparent rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              All events
            </button>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.id} // Add unique key
                className="overflow-hidden bg-white shadow-lg rounded-xl hover:shadow-2xl"
                to="/eventmanagement"
              >
                <EventCard
                  title={event.title}
                  type={event.type}
                  isNew={event.isNew}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
