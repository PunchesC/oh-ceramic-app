import React, { useState } from 'react';
import './image-card-front.css';

function ImageCardFront({ url, imageId, fetchDetails }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [details, setDetails] = useState(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };


  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className="front">
        <img src={url} alt="Gallery" title="Learn more" />
      </div>
    </div>
  );
}
export default ImageCardFront;