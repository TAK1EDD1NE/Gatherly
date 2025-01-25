import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import EventConfirmation from "../components/EventConfirmation";
import ProgramDetailsTable from "../components/ProgramComponent";
import EventGuests from "../components/EventGuests";

const EventManagement = () => {
  const event = {
    title: "Pushing pixels and experiences in digital products for Sebostudio",
    status: "not accepted yet",
  };

  const programs = [
    {
      description: "Christine Brooks",
      start: "089 Kutch Green Apt. 448",
      end: "04 Sep 2019",
    },
    {
      description: "Christine Brooks",
      start: "089 Kutch Green Apt. 448",
      end: "04 Sep 2019",
    },
    {
      description: "Christine Brooks",
      start: "089 Kutch Green Apt. 448",
      end: "04 Sep 2019",
    },
  ];

  const Guests = [
    {
      id: "Christine Brooks",
      firstname: "089 Kutch Green Apt. 448",
      lastname: "04 Sep 2019",
    },
    {
      id: "Christine Brooks",
      firstname: "089 Kutch Green Apt. 448",
      lastname: "04 Sep 2019",
    },
    {
      id: "Christine Brooks",
      firstname: "089 Kutch Green Apt. 448",
      lastname: "04 Sep 2019",
    },
  ];

  const [currentPage, setCurrentPage] = useState("/eventmanagement");

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 px-6">
        <TopBar />
        <div className="px-5 py-7 bg-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-700">
              Event Management
            </h1>
          </div>
          <div className="flex items-center justify-between mb-8">
            <EventConfirmation event={event} />
            <div>
              <div className="py-8">
                <p className="mb-2 font-bold text-gray-700">programs</p>
                <ProgramDetailsTable programs={programs} />
              </div>
              <div className="py-8">
                <p className="mb-2 font-bold text-gray-700">guests</p>
                <EventGuests Guests={Guests} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
