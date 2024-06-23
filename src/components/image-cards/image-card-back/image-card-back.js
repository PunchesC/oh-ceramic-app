import React, { useEffect, useRef } from 'react';

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
        <img src={url} alt="Modal Content" />
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageCardBack;