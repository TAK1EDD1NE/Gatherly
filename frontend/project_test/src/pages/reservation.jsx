import React, { useState, useEffect } from "react";
import HeaderBar from "../components/headerBar";
import {
  ChatBubbleOutline,
  LocationOn,
  StarOutline,
  Send,
} from "@mui/icons-material";
import {
  FaWifi,
  FaLeaf,
  FaTshirt,
  FaSnowflake,
  FaBicycle,
} from "react-icons/fa";
//import Calendar from "../components/Calendar";
import Amenities from "../components/amenities";
import MapComponent from "../components/map";
import axios from "axios";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import AddReview from "../components/addReview";
import { Add } from "@mui/icons-material";

const Reservation = () => {
  const [date, setDate] = useState(new Date());
  const [locationName, setLocationName] = useState();
  const [coordinates, setCoordinates] = useState(null)
  const simulatedPosition = [36.6439022,4.9036535 ];

  const handleDateChange = (date) => {
    setDate(date);
    console.log("Selected date:", date);
  };

  const testimonials = [
    {
      id: 1,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 2,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 3,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 4,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 5,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
  ];

  const placeData = {
    title: "Salle Amizour",
    rating: 4.6,
    numReviews: 7,
    location: "Bejaia",
    position: [36.6439022, 4.9036535], // Example coordinates (San Francisco)
    images: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/565/400",
        alt: "Room 1",
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/274/196",
        alt: "Room 2",
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/274/196",
        alt: "Room 3",
      },
      {
        id: 4,
        imageUrl: "https://picsum.photos/274/196",
        alt: "Kitchen",
      },
      {
        id: 5,
        imageUrl: "https://picsum.photos/274/196",
        alt: "Stairs",
      },
      {
        id: 6,
        imageUrl: "https://picsum.photos/274/196",
        alt: "Building",
      },
    ],
  };

   // Fetch coordinates from an address
   const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
        console.log(coordinates);
      } else {
        console.error("No results found for the given address.");
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  // Fetch location name from coordinates
  const fetchLocationName = async (lat, lng) => {
    try {
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      setLocationName(geoResponse.data.display_name);
      console.log("Location Name:", geoResponse.data.display_name);
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationName("Location not found");
    }
  };

  // Example: Fetch coordinates when the component mounts
  useEffect(() => {
    fetchCoordinates(placeData.location);
  }, [placeData.location]);

  useEffect(() => {
    // Optionally fetch the name if the coordinates change
    if (simulatedPosition) {
      fetchLocationName(simulatedPosition[0], simulatedPosition[1]);
    }
  }, [simulatedPosition]);

  

  const renderImage = (image) => (
    <div className="w-full h-full">
      <img
        src={image.imageUrl}
        alt={image.alt}
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen text-gray-700 bg-white px-60">
      <div className="w-full">
        <HeaderBar />
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{placeData.title}</h1>
          <div className="flex items-center space-x-2 text-gray-500">
            <span>{placeData.rating}</span>
            <span>·</span>
            <span>{placeData.numReviews} reviews</span>
            <span>·</span>
            <span>{locationName}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container p-4 mx-auto">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* First Row */}
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3]">
              {renderImage(placeData.images[0])}
            </div>
            <div className="hidden md:block relative aspect-[4/3]">
              {renderImage(placeData.images[1])}
            </div>
            <div className="hidden md:block relative aspect-[4/3]">
              {renderImage(placeData.images[2])}
            </div>
            <div className="hidden md:block relative aspect-[4/3]">
              {renderImage(placeData.images[3])}
            </div>
            <div className="hidden md:block relative aspect-[4/3]">
              {renderImage(placeData.images[4])}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center bg-gray-100">
          <div className="container flex mx-auto my-8">
            <div className="flex flex-col items-center justify-center p-5 rounded-4xl w-[323px] h-[378px]">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="bg-pink-200 rounded-lg shadow-md react-calendar"
              />
            </div>
            <div>
              <Amenities />
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center bg-white border shadow-lg rounded-xl lg:w-[370px]">
                  <p className="py-5 font-bold text-gray-700">
                    create your event
                  </p>
                  <hr className="text-black" />
                  <Link to="/createevent">
                    <button className="w-full mb-5 text-white bg-pink-400 rounded-lg">
                      go to event page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="container px-4 py-16 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-gray-700">Reviews</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 bg-white shadow-lg rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <StarOutline
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
            
          </div>
            <div className="py-5">
            <button className="py-5 text-white bg-pink-400 rounded-lg hover:shadow-xl" onClick={handleOpenPopup}>
              <Add/>
              add review
            </button>
            </div>
        </section>
        <p className="font-bold text-gray-700">Votre emplacement</p>
        <div className="py-6">
          <MapComponent position={placeData.position} />
        </div>
      </div>
         <AddReview isOpen={isPopupOpen} onClose={handleClosePopup}/>
    </div>
  );
};

export default Reservation;
