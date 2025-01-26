import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import SalleCard from "../components/SalleCard";
import { Add } from "@mui/icons-material";
import AddSale from "../components/addSale";

const SallePage = () => {
  const cards = [
    {
      image: "https://example.com/image1.jpg",
      title: "Salle amizoure",
      rating: 4.6,
      capacity: "30-50 people",
      price: "123000DA",
      availability: true,
    },
    {
      image: "https://example.com/image1.jpg",
      title: "Salle amizoure",
      rating: 4.6,
      capacity: "30-50 people",
      price: "123000DA",
      availability: true,
    },
    {
      image: "https://example.com/image1.jpg",
      title: "Salle amizoure",
      rating: 4.6,
      capacity: "30-50 people",
      price: "123000DA",
      availability: true,
    },
  ];

  const [currentPage, setCurrentPage] = useState("/salles");

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
            <h1 className="text-2xl font-bold text-gray-700">Salles</h1>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#F362EA] border border-transparent rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleOpenPopup}
            >
              <Add/>
              Add New Salle
            </button>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {cards.map((card, index) => (
              <SalleCard
                key={index}
                image={card.image}
                title={card.title}
                rating={card.rating}
                capacity={card.capacity}
                price={card.price}
                availability={card.availability}
              />
            ))}
          </div>
        </div>
      </div>
      <AddSale isOpen={isPopupOpen} onClose={handleClosePopup}/>
    </div>
  );
};

export default SallePage;
