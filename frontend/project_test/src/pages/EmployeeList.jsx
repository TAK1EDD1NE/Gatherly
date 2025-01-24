import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import AddEmployeePopup from "../components/AddEmployeePopup";
import { Add } from "@mui/icons-material";

const EmployeeList = () => {
  const employees = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      email: "04 Sep 2019",
      phone: "Electric",
      status: "Absent",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      email: "28 May 2019",
      phone: "Book",
      status: "Working",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      email: "23 Nov 2019",
      phone: "Medicine",
      status: "Absent",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destiny Lake Suite 600",
      email: "05 Feb 2019",
      phone: "Mobile",
      status: "Absent",
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      email: "29 Jul 2019",
      phone: "Watch",
      status: "Working",
    },
  ];

  const [currentPage, setCurrentPage] = useState("/employees");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // State variables to manage the filtering options
  const [nameFilter, setNameFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Function to filter the employees based on the current filter criteria
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      employee.address.toLowerCase().includes(addressFilter.toLowerCase()) &&
      employee.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  // Function to reset the filters
  const resetFilters = () => {
    setNameFilter("");
    setAddressFilter("");
    setEmailFilter("");
    setIsFilterActive(false);
  };

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 px-6">
        <TopBar />
        <div className="px-5 py-7 bg-slate-100">
          <main className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-md">
              {/* Filtering options */}
              <div className="p-4 bg-gray-100 rounded-t-lg">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="nameFilter"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Filter by Name
                    </label>
                    <div className="relative">
                      {/* <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" /> */}
                      <input
                        type="text"
                        id="nameFilter"
                        className="text-gray-700 w-full px-10 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F362EA]"
                        value={nameFilter}
                        onChange={(e) => {
                          setNameFilter(e.target.value);
                          setIsFilterActive(
                            e.target.value.trim().length > 0 ||
                              addressFilter.trim().length > 0 ||
                              emailFilter.trim().length > 0
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="addressFilter"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Filter by Address
                    </label>
                    <div className="relative">
                      {/* <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" /> */}
                      <input
                        type="text"
                        id="addressFilter"
                        className="text-gray-700 w-full px-10 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F362EA]"
                        value={addressFilter}
                        onChange={(e) => {
                          setAddressFilter(e.target.value);
                          setIsFilterActive(
                            e.target.value.trim().length > 0 ||
                              nameFilter.trim().length > 0 ||
                              emailFilter.trim().length > 0
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="emailFilter"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Filter by Email
                    </label>
                    <div className="relative">
                      {/* <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" /> */}
                      <input
                        type="text"
                        id="emailFilter"
                        className="text-gray-700 w-full px-10 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F362EA]"
                        value={emailFilter}
                        onChange={(e) => {
                          setEmailFilter(e.target.value);
                          setIsFilterActive(
                            e.target.value.trim().length > 0 ||
                              nameFilter.trim().length > 0 ||
                              addressFilter.trim().length > 0
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      className="flex items-center px-4 py-2 text-white bg-[#F362EA] rounded-md hover:shadow-xl hover:shadow-[#F362EA]"
                      onClick={resetFilters}
                    >
                      {/* <X className="mr-2" /> */}
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Employee table */}
              <div className="p-6">
                {(isFilterActive || filteredEmployees.length > 0) && (
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-gray-600 bg-gray-100">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="border-b">
                          <td className="px-4 py-3 text-gray-700">{employee.id}</td>
                          <td className="px-4 py-3 text-gray-700">{employee.name}</td>
                          <td className="px-4 py-3 text-gray-700">{employee.address}</td>
                          <td className="px-4 py-3 text-gray-700">{employee.email}</td>
                          <td className="px-4 py-3 text-gray-700">{employee.phone}</td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-xs font-medium ${
                              employee.status === 'Working'
                                ? 'text-green-700 bg-green-300'
                                : 'text-red-700 bg-red-300'
                            }`}
                          >
                            {employee.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!isFilterActive && filteredEmployees.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    No employees to display.
                  </div>
                )}
              </div>

              {/* Add Employee button */}
              <div className="flex justify-end p-4 bg-gray-100 rounded-b-lg">
                <button className="flex items-center px-4 py-2 text-white bg-[#F362EA] rounded-md hover:bg-[#F362EA]" onClick={handleOpenPopup}>
                  <Add/>
                  Add Employee
                </button>
              </div>
            </div>
            <AddEmployeePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
