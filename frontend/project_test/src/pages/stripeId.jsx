import React, { useState } from 'react';
import HeaderBar from '../components/headerBar';
import background from "../assets/signin.jpg"
import postData from '../api/postData';

const StripeId = () => {
    const [stripeId, setStripeId] = useState('');
    // const [adress, setAdress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
try{
  debugger
    const res = await postData('/admin/join', {stripe_id:stripeId})
    window.location.href = '/editprofile';
    
}catch(err){
  console.error("Error fetching profile:", err);
}
    // console.log('adress reset requested for:', adress);
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
          <h2 className="mb-6 text-xl font-bold text-gray-700">Join US</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="stripeId"
                placeholder='stripe ID'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={stripeId}
                onChange={(e) => setStripeId(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-4">
              <input
                type="text"
                id="address"
                placeholder='address'
                className="w-full px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                required
              />
            </div> */}
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-300 bg-pink-500 rounded-lg hover:shadow-lg"
            >
              confim
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StripeId;

