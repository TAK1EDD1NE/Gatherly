import React, { useState } from 'react';
import Header from './Header';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <Header />
      <main className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Mot de passe oublié</h2>
          <p className="mb-6 text-center text-gray-600">
            Vous avez oublié votre mot de passe ? Récupérez-le facilement en quelques étapes
            pour reprendre l'accès à votre compte et continuer à gérer vos événements.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                E-mail address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
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

