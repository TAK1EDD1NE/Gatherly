import React, { useState } from 'react';
import Header from './Header';

const ConfirmationCode = () => {
  const [code, setCode] = useState(['', '', '', '', '']);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 4) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle code submission
    console.log('Submitted code:', code.join(''));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <Header />
      <main className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Entrer le code</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
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

export default ConfirmationCode;

