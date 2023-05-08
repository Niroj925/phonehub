import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ totalStars, onSelect }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (selected) => {
    setSelectedStars(selected);
    onSelect(selected);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={selectedStars >= index + 1 ? 'gold' : 'lightgray'}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
      <p>Selected Rating: {selectedStars}</p>
    </div>
  );
};

export default RatingStars;
