import React, { useState } from 'react';
import './image-card-back.css';

function ImageCardBack({ url, imageId, fetchDetails }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={flipCard}
      style={{ 
        backgroundImage: `url(${url})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="image-container">
        <div className="overlay-content">
          <h2>Name</h2>
          <p>Description</p>
          <p>Price</p>
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      </div>
    </div>
  );
}
export default ImageCardBack;