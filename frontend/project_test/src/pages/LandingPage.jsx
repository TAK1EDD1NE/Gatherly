import React from 'react';
import SalleSearchComponent from '../components/salleSearch';
import Footer from '../components/footer';
import { ChatBubbleOutline, LocationOn, StarOutline, Send } from '@mui/icons-material';
import Web6 from "../assets/Web6.jpg";
import Background from "../assets/Background.jpg"
import CreditCards from "../assets/CreditCards.png"
import HeaderBar from '../components/headerBar';

const LandingPage = () => {
  const events = [
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      location: "California, US",
      rating: 4.7,
      isPopular: true
    },
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      location: "California, US",
      rating: 4.7,
      isPopular: true
    },
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      location: "California, US",
      rating: 4.7,
      isPopular: true
    },
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      location: "California, US",
      rating: 4.7,
      isPopular: true
    },
    {
      id: 1,
      image: "/api/placeholder/400/300",
      title: "Garden Bay Villa Pool",
      price: "$500.00",
      location: "California, US",
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
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 1,
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 1,
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 1,
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 1,
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    {
      id: 1,
      name: "Rosalina Christiansen",
      role: "Founder",
      image: "/api/placeholder/80/80"
    },
    // Repeated for other team members...
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
            <button className="px-8 py-3 font-semibold text-purple-600 transition-colors bg-white rounded-full hover:bg-opacity-90">
              Get Started
            </button>
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
            <div key={event.id} className="overflow-hidden bg-white shadow-lg rounded-xl">
              <img 
                src={event.image} 
                alt={event.title}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <span className="font-bold text-purple-600">{event.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <LocationOn fontSize="small" className="mr-1" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <StarOutline className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{event.rating}</span>
                  </div>
                  {event.isPopular && (
                    <span className="text-sm text-red-500">
                      <span className="mr-1">🔥</span> Popular
                    </span>
                  )}
                </div>
              </div>
            </div>
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
      <section className="container px-4 py-16 mx-auto">
      <footer className="py-8 text-gray-800 bg-pink-100">
      <div className="container flex items-center justify-between mx-auto">
        <div className="menu">
          <ul className="flex space-x-6">
            <li><a href="/">Home</a></li>
            <li><a href="/our-services">Our Services</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>
        <div className="contact">
          <div className="flex items-center space-x-4">
            <a href="tel:0554767611" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>05 54 76 76 11</span>
            </a>
            <a href="mailto:gatherlycontact@gmail.com" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>gatherlycontact@gmail.com</span>
            </a>
            <a href="https://goo.gl/maps/Zdi3ungnHNRfzCsD7" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Amizour, N-76 Béjaïa</span>
            </a>
          </div>
        </div>
        <div className="social-links">
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com" className="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
            <a href="https://www.instagram.com" className="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
      </section>
    </div>
  );
}

export default LandingPage;
