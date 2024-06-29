// MenuCard.js

import React from 'react';

const MenuCard = ({ name, description, price }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-700">Rs-{price}</p>
    </div>
  );
};

export default MenuCard;
