import React, { useEffect, useRef } from 'react';
import './image-card-back.css';
const ImageCardBack = ({ url, imageName, onClose }) => {
  const modalRef = useRef();
  const overlayRef = useRef(); // Step 1: Add ref for the modal overlay

  // Close modal if clicked on overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current === event.target && typeof onClose === 'function') {
        onClose();
      }
    };

    const overlay = overlayRef.current;
    if (overlay) { // Ensure overlay is not undefined
      overlay.addEventListener('mousedown', handleClickOutside);
      return () => overlay.removeEventListener('mousedown', handleClickOutside);
    }
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className='top-container'> 
          <img src={url} alt="Modal Content" />
          <section className='info-section'>
            <section className='info-container'>
            <h2>Image Name</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione reprehenderit aliquam repudiandae molestiae, quisquam necessitatibus in dignissimos expedita corrupti, fugit consequuntur nostrum aut quidem harum culpa voluptatum officiis deleniti earum!</p>
            <h2>Price:$$$$$</h2>
            </section>
            <section className='transaction-container'>
              <button className='btn'>Add to Cart</button>
              <input type='number'></input>
            </section>
          </section>
        </div>
      </div>
    </div>

  );
};

export default ImageCardBack;