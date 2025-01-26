import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../components/headerBar";
import { Star } from "@mui/icons-material";
import { FaWifi, FaLeaf, FaTshirt, FaSnowflake, FaBicycle } from "react-icons/fa";
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
  const [coordinates, setCoordinates] = useState(null);
  const { state } = useLocation(); // Access the event data passed via state

  // Debugging: Log the state received
  console.log("State received in Reservation page:", state);

  const event = state?.event; // Destructure the event data

  // Use the event data to populate the page
  const placeData = {
    title: event?.title || "Salle Amizour",
    rating: event?.rating || 4.6,
    numReviews: 7,
    location: event?.locationName || "Bejaia",
    position: event?.position || [36.6439022, 4.9036535], // Use event coordinates or default
    images: [
      {
        id: 1,
        imageUrl: event?.image || "/images/image1.png",
        alt: "Room 1",
      },
      {
        id: 2,
        imageUrl: "/images/image2.png",
        alt: "Room 2",
      },
      {
        id: 3,
        imageUrl: "/images/image3.png",
        alt: "Room 3",
      },
      {
        id: 4,
        imageUrl: "/images/image4.png",
        alt: "Kitchen",
      },
      {
        id: 5,
        imageUrl: "/images/image5.png",
        alt: "Stairs",
      },
    ],
  };

  const handleDateChange = (date) => {
    setDate(date);
    console.log("Selected date:", date);
  };

  const testimonials = [
    {
      id: 1,
      name: "Emily Green",
      image: "/images/femalepfp.png",
      rating: 4,
      text: "Gatherly was such a lifesaver! The platform made managing our event so smooth, and the support team was super helpful at every step.",
    },
    {
      id: 2,
      name: "Sophia Martinez",
      image: "/images/femalepfp.png",
      rating: 3,
      text: "The service was decent but could improve in some areas, especially the communication during setup. Still, it was a good experience overall.",
    },
    {
      id: 3,
      name: "James Carter",
      image: "/images/malepfp.jpg",
      rating: 5,
      text: "This was the best event management experience I’ve ever had. Everything was seamless, and my guests couldn’t stop praising the organization!",
    },
    {
      id: 4,
      name: "Liam Bennett",
      image: "/images/malepfp.jpg",
      rating: 2,
      text: "Unfortunately, the experience didn’t meet my expectations. There were a lot of delays, and the process felt disorganized. Hoping they improve in the future.",
    },
    {
      id: 5,
      name: "Olivia Brown",
      image: "/images/femalepfp.png",
      rating: 5,
      text: "Absolutely amazing! Gatherly turned my event into a stress-free experience. Highly recommend it to anyone looking for top-notch service.",
    },
  ];

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

  // Fetch coordinates and location name when the component mounts
  useEffect(() => {
    if (event?.position) {
      fetchLocationName(event.position[0], event.position[1]);
    }
    if (placeData.location) {
      fetchCoordinates(placeData.location);
    }
  }, [event, placeData.location]);

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
                          <Star
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
              <Add />
              add review
            </button>
          </div>
        </section>
        <p className="font-bold text-gray-700">Votre emplacement</p>
        <div className="py-6">
          <MapComponent position={placeData.position} />
        </div>
      </div>
      <AddReview isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default Reservation;