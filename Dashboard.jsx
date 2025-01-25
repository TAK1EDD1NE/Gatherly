import React, { useState, useEffect } from 'react';
import SidebarComponent from '../components/sideBar';
import MetricsSection from '../components/metricsSection';
import RevenueChartSection from '../components/revenueChartSection';
import EmployeeDetailsSection from '../components/employeeDetailsSection';
import TopBar from '../components/TopBar';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployee: 27,
    employeeFemalePercentage: 40,
    totalSalle: 5,
    salleAvailablePercentage: 30,
    totalEvent: 100,
    eventCompletedPercentage: 40,
    totalRevenue: 89000,
    revenueChangePercentage: -4.3,
    revenueData: [
      { month: 'Jan', revenue: 35000 },
      { month: 'Feb', revenue: 45000 },
      { month: 'Mar', revenue: 50000 },
      { month: 'Apr', revenue: 60000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 65000 },
      { month: 'Jul', revenue: 70000 },
      { month: 'Aug', revenue: 75000 },
      { month: 'Sep', revenue: 80000 },
      { month: 'Oct', revenue: 72000 },
      { month: 'Nov', revenue: 68000 },
      { month: 'Dec', revenue: 75000 },
    ],
    employees: [
      { name: 'Taki rhaile', email: 'tki@gmail.com', phone: '0559559551', password: '423' },
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', password: 'password456' },
      { name: 'Bob Johnson', email: 'bob@example.com', phone: '5555555555', password: 'password789' },
      { name: 'Samantha Williams', email: 'samantha@example.com', phone: '1111111111', password: 'passwordabc' },
    ],
  });
  const [currentPage, setCurrentPage] = useState('/');

  /* useEffect(() => {
    // Fetch dashboard data from an API or a local data source
    const fetchDashboardData = async () => {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    };
    fetchDashboardData();
  }, []); */

  if (!dashboardData) {
    return <div>Loading...</div>;
  } 

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 px-6">
        <TopBar/>
        <div className='px-5 py-7 bg-slate-100'>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 ">Dashboard</h1>
          <MetricsSection data={dashboardData} />
          <RevenueChartSection data={dashboardData.revenueData} />
          <EmployeeDetailsSection employees={dashboardData.employees} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
