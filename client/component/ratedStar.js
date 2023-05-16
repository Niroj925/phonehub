import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ totalStars}) => {

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={'gold'}
        />
      ))}
    </div>
  );
};

export default RatingStars;
