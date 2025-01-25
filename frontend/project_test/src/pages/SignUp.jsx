import React, { useState } from 'react';
import HeaderBar from '../components/headerBar';
import background from "../assets/signin.jpg"
import { East } from '@mui/icons-material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log('email:', email);
    console.log('Password reset requested for:', password);
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
          <h2 className="mb-6 text-xl font-bold text-gray-700">Signup</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder='username'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                id="confimpassword"
                placeholder='confirm password'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex items-center mb-4'>
              <input 
                type="checkbox"
                id="agree"
                className='w-6 h-6 text-blue-600 bg-gray-100 border rounded-2xl'
               />
            <label htmlFor="agree" className='px-2 text-sm text-gray-700'>i agree to the terms and conditions</label>
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 font-semibold text-white transition duration-300 bg-pink-500 rounded-lg hover:shadow-lg"
            >
              signup
            </button>
            <p className='font-bold text-center text-gray-700'>sign up as admin <East/></p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;

