import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard, People, Favorite, Forum, Checklist, Inventory, AttachMoney, CalendarMonth, TaskAlt, Settings, Logout, Festival  } from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();

  // Array of sidebar items with their respective paths and icons
  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard/> },
    { label: 'Employees', path: '/employees', icon: <People/> },
  ];

  const pages = [
    { label: 'Pricing', path: '/pricing', icon: <AttachMoney/> },
    { label: 'To-Do', path: '/tasks', icon: <TaskAlt/> },
    { label: 'Salle', path: '/salles', icon: <Festival/> },
  ];

  const extra = [
    { label: 'Settings', path: '/editprofile', icon: <Settings/> },
    { label: 'Logout', path: '/logout', icon: <Logout /> },
  ]

  return (
    <div className="flex flex-col justify-between w-64 h-screen px-4 py-6 text-gray-900 bg-white">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gatherly</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#F362EA] text-gray-700 hover:text-white ${
                    location.pathname === item.path
                      ? 'bg-[#F362EA] font-medium text-white'
                      : 'font-normal'
                  }`}
                >
                  <span className="w-6 h-6 text-gray-500 hover:fill-white">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <hr className='text-gray-400'/>
            <p className='text-gray-400'>Pages</p>
            {pages.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#F362EA] text-gray-700 hover:text-gray-800 ${
                    location.pathname === item.path
                      ? 'bg-[#F362EA] font-medium'
                      : 'font-normal'
                  }`}
                >
                  <span className="w-6 h-6 text-gray-500">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <hr className='text-gray-400'/>
            {extra.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#F362EA] text-gray-700 hover:text-white ${
                    location.pathname === item.path
                      ? 'bg-[#F362EA] font-medium'
                      : 'font-normal'
                  }`}
                >
                  <span className="w-6 h-6 text-gray-500">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-sm text-gray-400">
        <p>&copy; 2023 Gatherly. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;