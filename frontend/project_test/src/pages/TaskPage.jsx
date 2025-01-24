import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import TaskComponent from "../components/taskComponent";
import { Add } from "@mui/icons-material";
import AddNewTask from "../components/AddNewTask";

const task = [
  { id: 1, name: "Meeting with CEO" },
  { id: 2, name: "Pick up kids from school" },
  { id: 3, name: "Shopping with Brother" },
  { id: 4, name: "Review with HR" },
  { id: 5, name: "Going to Dia's School" },
  { id: 6, name: "Check design files" },
  { id: 7, name: "Update File" },
];

const Employees = [
  { id: 1, name: 'John Doe', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', department: 'Design' },
  { id: 3, name: 'Mike Johnson', department: 'Marketing' },
  { id: 4, name: 'Sarah Williams', department: 'Sales' }
];

const TasksPage = () => {
  const handleTaskDelete = (taskId) => {
    // Logic to delete the task with the given taskId
    console.log("Deleting task:", taskId);
  };

  const [currentPage, setCurrentPage] = useState("/tasks");

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
            <h1 className="text-2xl font-bold text-gray-700">Tasks</h1>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#F362EA] border border-transparent rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleOpenPopup}
            >
              <Add/>
              Add New Task
            </button>
          </div>
          <div>
            {task.map((task) => (
              <TaskComponent
                key={task.id}
                task={task}
                onDelete={handleTaskDelete}
              />
            ))}
          </div>
        </div>
      </div>
      <AddNewTask isOpen={isPopupOpen} onClose={handleClosePopup} employees={Employees}/>
    </div>
  );
};

export default TasksPage;
