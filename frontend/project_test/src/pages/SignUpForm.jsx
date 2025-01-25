import React from 'react';

const SignUpForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Join us to get started</h2>
      <form>
        <input type="text" placeholder="Stripe Id" className="w-full p-2 mb-4 border rounded" />
        <input type="text" placeholder="Address" className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full py-2 font-semibold text-white bg-purple-600 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

