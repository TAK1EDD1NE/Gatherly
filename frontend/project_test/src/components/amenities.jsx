import React from 'react';
import { FaWifi, FaLeaf, FaMusic, FaPlaceOfWorship, FaSoundcloud, FaParking } from 'react-icons/fa';
import { RiVipDiamondLine } from "react-icons/ri";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { BiDrink, BiCctv, BiCamera } from "react-icons/bi";
import { MdOutlineOutdoorGrill, MdPool, MdElevator, MdCleaningServices } from "react-icons/md";

const Amenities = () => {
  const amenities = [
    { id: 1, icon: <FaWifi />, label: 'Wi-Fi' },
    { id: 2, icon: <FaLeaf />, label: 'Garden' },
    { id: 3, icon: <FaMusic />, label: 'Dance Floor' },
    { id: 4, icon: <RiVipDiamondLine/>, label: 'VIP' },
    { id: 6, icon: <MdOutlineOutdoorGrill />, label: 'Terrace' },
    { id: 7, icon: <FaPlaceOfWorship />, label: 'Stage' },
    { id: 8, icon: <MdPool />, label: 'Pool' },
    { id: 9, icon: <FaSoundcloud />, label: 'Sound System' },
    { id: 10, icon: <BiDrink />, label: 'Bar' },
    { id: 11, icon: <MdElevator />, label: 'Elevator' },
    { id: 12, icon: <FaParking />, label: 'Parking' },
    { id: 13, icon: <MdCleaningServices />, label: 'Cleaning Staff' },
    { id: 14, icon: <GiPoliceOfficerHead />, label: 'Security Personnel' },
    { id: 15, icon: <BiCctv />, label: 'CCTV' },
    { id: 16, icon: <BiCamera />, label: 'Photographer' },
  ];

  return (
    <div className="p-8 mt-4">
      <h2 className="mb-2 text-xl font-bold">What this place offers</h2>
      <div className="grid grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            {amenity.icon}
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;