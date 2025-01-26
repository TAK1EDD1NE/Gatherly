import React from 'react';
import SalleSearchComponent from '../components/salleSearch';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { ChatBubbleOutline, LocationOn, StarOutline, Send } from '@mui/icons-material';
import Web6 from "../assets/Web6.jpg";
import Background from "../assets/Background.jpg"
import CreditCards from "../assets/CreditCards.png"
import HeaderBar from '../components/headerBar';
import LandingPageCard from '../components/landingPageCard';


const LandingPage = () => {
  const events = [
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 2,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 3,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 4,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    {
      id: 5,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      position: [36.6439022, 4.9036535],
      rating: 4.7,
      isPopular: true
    },
    // Repeated for other events...
  ];

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

  const teamMembers = [
    {
      id: 1,
      name: "ishak",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "taki",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "chemsdin",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "miscipsa",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-white rounded-lg shadow-lg">
      {/* Hero Section */}
      <section className="py-10 text-white flex-center bg-center bg-no-repeat bg-cover md:bg-gradient-to-b md:from-purple-500 md:to-pink-500 h-[768px]" style={{ backgroundImage: `url(${Web6})` }}>
        <HeaderBar/>
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

      {/* Events Grid Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="flex items-center justify-center mb-8">
          <SalleSearchComponent/>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <LandingPageCard event={event}/>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center p-4 space-x-4 bg-white rounded-xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
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
            {/* <div className="absolute w-64 h-40 transform bg-pink-500 -top-2 -left-2 rounded-xl rotate-3"></div>
            <div className="relative w-64 h-40 shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl"></div> */}
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
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarOutline key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>
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
}

export default LandingPage;
