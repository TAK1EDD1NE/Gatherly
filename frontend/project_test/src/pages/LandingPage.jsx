import React, { useState } from 'react';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { ChatBubbleOutline, LocationOn, Star, Send } from '@mui/icons-material';
import Web6 from "../assets/Web6.jpg";
import Background from "../assets/Background.jpg"
import CreditCards from "../assets/CreditCards.png"
import HeaderBar from '../components/headerBar';
import LandingPageCard from '../components/landingPageCard';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('Any date');

  const events = [
    {
      id: 1,
      image: "/images/house1.jpeg",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [12.6439022, 13.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 2,
      image: "/images/house2.jpeg",
      title: "small wooden shallet",
      price: "$450.00",
      position: [36.6439022, 8.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 3,
      image: "/images/house3.jpeg",
      title: "isolated forest house",
      price: "$1000.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 4,
      image: "/images/house4.jpeg",
      title: "flower garden shallet",
      price: "$700.00",
      position: [36.6439022, 9.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 5,
      image: "/images/house5.jpeg",
      title: "open view summer shallet",
      price: "$800.00",
      position: [20.9036535, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    // Repeated for other events...
  ];

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

  const teamMembers = [
    {
      id: 1,
      name: "ishak",
      role: "Founder",
      image: "/images/malepfp.jpg"
    },
    {
      id: 2,
      name: "taki",
      role: "Founder",
      image: "/images/malepfp.jpg"
    },
    {
      id: 3,
      name: "chemsdin",
      role: "Founder",
      image: "/images/malepfp.jpg"
    },
    {
      id: 4,
      name: "miscipsa",
      role: "Founder",
      image: "/images/malepfp.jpg"
    },
  ];

  // Filter events based on search criteria
  const filteredEvents = events.filter(event => {
    const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = event.position ? true : false; // Add location filtering logic if needed
    const matchesDate = dateFilter === 'Any date' || true; // Add date filtering logic if needed

    return matchesSearchTerm && matchesLocation && matchesDate;
  });

  return (
    <div className="w-screen min-h-screen bg-white rounded-lg shadow-lg">
      {/* Hero Section */}
      <section className="py-10 text-white flex-center bg-center bg-no-repeat bg-cover md:bg-gradient-to-b md:from-purple-500 md:to-pink-500 h-[768px]" style={{ backgroundImage: `url(${Web6})` }}>
        <HeaderBar />
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-bold">
              Gatherly - Organisez sans Limites
            </h1>
            <p className="mb-8 text-xl opacity-90">
              Découvrez des lieux uniques pour vos événements
            </p>
            <Link to="/signup">
              <button className="px-8 py-3 font-semibold text-purple-600 transition-colors bg-white rounded-full hover:bg-opacity-90">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center justify-between w-full p-4 bg-white border rounded-lg shadow-2xl">
            <div className="flex-1 mr-4">
              <label htmlFor="search-term" className="block mb-2 font-medium text-gray-700">
                Rechercher une Salle
              </label>
              <input
                type="text"
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="date" className="block mb-2 font-medium text-gray-700">
                Date
              </label>
              <select
                id="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Any date">Any date</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This week">This week</option>
                <option value="Next week">Next week</option>
                <option value="This month">This month</option>
                <option value="Next month">Next month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <LandingPageCard key={event.id} event={event} />
          ))}
        </div>

        <button className="block px-8 py-3 mx-auto mt-8 font-semibold text-purple-600 transition-colors bg-white border border-purple-600 rounded-full shadow-lg hover:bg-purple-50">
          Load More
        </button>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-top bg-cover md:bg-gradient-to-b md:from-pink-500 md:to-purple-500 h-[650px]" style={{ backgroundImage: `url(${Background})` }}>
        <div className="container px-4 mx-auto mt-32">
          <h2 className="mb-8 text-3xl font-bold text-white">About Us</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center p-4 space-x-4 text-gray-700 bg-white rounded-xl w-[468px] my-7">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-700">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-gray-700">Paiements en ligne acceptés</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 text-2xl text-gray-700 bg-gray-100 rounded-full">
                Visa & Mastercard
              </span>
              <span className="px-4 py-2 text-2xl text-gray-700 bg-gray-100 rounded-full">
                Estimer componants
              </span>
              <span className="px-4 py-2 text-2xl text-gray-700 bg-gray-100 rounded-full">
                Nombreux option
              </span>
              <span className="px-4 py-2 text-2xl text-gray-700 bg-gray-100 rounded-full">
                Facile componants
              </span>
            </div>
          </div>
          <div className="relative mt-8 bg-center bg-cover md:mt-0" >
            <div className="w-[613px] h-[571px] bg-cover bg-top" style={{ backgroundImage: `url(${CreditCards})` }}></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <h2 className="mb-8 text-2xl font-bold">Say Hi!</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea 
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-gray-700">Look What Our Customers Say!</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="p-6 bg-white shadow-lg rounded-xl">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-700">{testimonial.name}</h3>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 text-gray-700 bg-[#FFE5FF]">
        <div className="container flex flex-col justify-between mx-auto md:flex-row">
          {/* Menu Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="mb-4 text-lg font-bold">Menu</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/our-services" className="hover:text-gray-300">Our services</a></li>
              <li><a href="/properties" className="hover:text-gray-300">Properties</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact us</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="mb-4 text-lg font-bold">Contact us</h3>
            <div className="space-y-2">
              <p>05 54 76 76 11</p>
              <a href="mailto:gatherlycontact@gmail.com" className="hover:text-gray-300">gatherlycontact@gmail.com</a>
              <p>Amizour, N-76 Béjaia</p>
            </div>
          </div>

          {/* "Your Opinion About Gatherly!" Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Your Opinion About Gatherly!</h3>
            <form>
              <textarea
                className="w-full p-4 mb-4 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message (optional)."
                rows={3}
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Send your message
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;