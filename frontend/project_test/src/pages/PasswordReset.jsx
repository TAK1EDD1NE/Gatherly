import React, { useState } from 'react';
import HeaderBar from '../components/headerBar';
import background from "../assets/signin.jpg"

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log('Password reset requested for:', password);
    console.log('confirmed password:', confirmPassword);
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
          <h2 className="mb-6 text-xl font-bold text-gray-700">reset password</h2>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-300 bg-pink-500 rounded-lg hover:shadow-lg"
            >
              send the code
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PasswordReset;

