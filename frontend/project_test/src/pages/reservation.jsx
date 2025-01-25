import React, { useState } from "react";
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
import Calendar from "../components/Calendar";
import Amenities from "../components/amenities";
import LocationMap from "../components/map";

const Reservation = () => {
  const testimonials = [
    {
      id: 1,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 1,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 1,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 1,
      name: "B. Matt DeArbonneur",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "working on event through Gatherly was a breeze! The process exceeded our expectations, from booking to departure. We literally couldn't have asked for better service.",
    },
    {
      id: 1,
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
    images: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/300/200",
        alt: "Room 1",
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/600/300",
        alt: "Room 2",
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/600/300",
        alt: "Room 3",
      },
      {
        id: 4,
        imageUrl: "https://picsum.photos/600/300",
        alt: "Kitchen",
      },
      {
        id: 5,
        imageUrl: "https://picsum.photos/600/300",
        alt: "Stairs",
      },
      {
        id: 6,
        imageUrl: "https://picsum.photos/600/300",
        alt: "Building",
      },
    ],
  };

  const renderImage = (image) => (
    <div className="w-full h-full">
      <img
        src={image.imageUrl}
        alt={image.alt}
        className="object-cover w-full h-full"
      />
    </div>
  );

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
            <span>{placeData.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* First Row */}
          <div className="col-span-1 md:col-span-1 h-64 md:h-[400px]">
            {renderImage(placeData.images[0])}
          </div>
          <div className="grid col-span-1 grid-rows-2 gap-4 md:col-span-2 md:grid-rows-2">
            <div className="h-32 md:h-[196px]">
              {renderImage(placeData.images[1])}
            </div>
            <div className="h-32 md:h-[196px]">
              {renderImage(placeData.images[2])}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center bg-gray-100">
          <div className="container flex mx-auto my-8">
            <Calendar />
            <Amenities />
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
        </section>
        <LocationMap/>
      </div>
    </div>
  );
};

export default Reservation;
