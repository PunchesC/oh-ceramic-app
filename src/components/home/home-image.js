import React, { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '../../Firebase'; // adjust the path as needed
import './home-image.css';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

const HomeImage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasLoadedInitialImages, setHasLoadedInitialImages] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);


  const fetchImages = async () => {
    try {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e.appspot.com');
      let result = await listAll(imageRef);
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);

      function shuffle(array) {
        array.sort(() => Math.random() - 8);
      }

      shuffle(urls);

      setImages(prevImages => {
        let newImages = urls.slice(prevImages.length, prevImages.length + 8);
        return [...prevImages, ...newImages];
      });

      setStartIndex(prevIndex => {
        const newIndex = prevIndex + 8;

        if (newIndex < urls.length) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }

        return newIndex;
      });

      if (!hasLoadedInitialImages) {
        setHasLoadedInitialImages(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };


  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
      }, 4000); // Change image every 4 seconds
    }

    return () => clearInterval(interval); // Clean up on unmount
  }, [currentIndex, images.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="home">
      <button onClick={handlePrev}>
        <FaChevronLeft />
      </button>

      <div id="home-image">

        {images.length > 0 && (
          <img src={images[currentIndex]} alt="" />
        )}
        <button id="play-pause-button" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

      </div>

      <button onClick={handleNext}>
        <FaChevronRight />
      </button>

    </div>
  );
};

export default HomeImage;