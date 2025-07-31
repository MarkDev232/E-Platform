import React from 'react';

const RegisterCustomer: React.FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Customer Registration</h2>
      
      {/* Example form - replace with your actual fields and logic */}
      <form>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register as Customer
        </button>
      </form>
    </div>
  );
};

export default RegisterCustomer;
