import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import MyTaskComponent from "../components/taskComponent";


const task = [
  { id: 1, name: "Meeting with CEO" },
  { id: 2, name: "Pick up kids from school" },
  { id: 3, name: "Shopping with Brother" },
  { id: 4, name: "Review with HR" },
  { id: 5, name: "Going to Dia's School" },
  { id: 6, name: "Check design files" },
  { id: 7, name: "Update File" },
];


const MyTasks = () => {
  const handleTaskDelete = (taskId) => {
    // Logic to delete the task with the given taskId
    console.log("Deleting task:", taskId);
  };

  const [currentPage, setCurrentPage] = useState("/mytasks");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleOpenPopup = () => {
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 px-6">
        <TopBar />
        <div className="px-5 py-7 bg-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-700">My Tasks</h1>
          </div>
          <div>
            {task.map((task) => (
              <MyTaskComponent
                key={task.id}
                task={task}
                onDelete={handleTaskDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
