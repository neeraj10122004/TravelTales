import React from 'react';

export const Userdata = ({ mail, name, photo }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      {/* User Info */}
      <div className="text-center mb-4">
        <div className="text-xl font-bold text-gray-800">{name}</div>
        <div className="text-sm text-gray-600">{mail}</div>
      </div>
      {/* Profile Photo */}
      <div>
        <img
          src={photo}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </div>
  );
};
