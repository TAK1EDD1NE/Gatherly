import React, { useState } from 'react';
import HeaderBar from '../components/headerBar';
import background from "../assets/signin.jpg"
import postData from '../api/postData';
const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData('/user/login', { email, password });

      // Assuming the response contains a success flag or message
      if (response.status == 201) {
        // Redirect to the profile page
        window.location.href = '/editprofile';
      } else {
        // If response indicates invalid login
        alert(response.message || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <HeaderBar />
      <main className="flex items-center justify-between flex-grow px-10">
        <div className='px-6 text-white'>
          <p className='mb-4 text-7xl'>Connectez-vous pour continuer !</p>
          <p className='mt-5 text-gray-300'>connectez vous a votre compte pour acceder a toutes vos fonctionalite personalise</p>
        </div>
        <div className="w-full max-w-[381px] py-8 bg-white rounded-2xl shadow-4xl px-11">
          <h2 className="mb-6 text-xl font-bold text-gray-700">login to connect</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder='email'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder='password'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-300 bg-pink-500 rounded-lg hover:shadow-lg"
            >
              log in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;

