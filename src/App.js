import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { storage, ref, list,listAll, getDownloadURL } from './Firebase';



function App() {
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [hasLoadedInitialImages, setHasLoadedInitialImages] = useState(false);

  const fetchImages = async () => {
    try {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e.appspot.com');
      let result = await listAll(imageRef);
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);
  
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
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
    if (!hasLoadedInitialImages) {
      fetchImages();
    }
  }, [hasLoadedInitialImages]);
  
  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#inventory">Inventory</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section id="home">
        <h1>Welcome To My Site</h1>
        <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
      <section id="about">
        <h1>About</h1>
        <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>

      </section>
      <section id="inventory">
      <div className="image-gallery">
        {images.map((url, index) => (
          <img key={index} src={url} alt="Gallery" />
        ))}
      </div>
      <button onClick={fetchImages}>Load More</button>
    </section>
      <section id="contact">
        <h1>Contact</h1>
        <p className="lead">Lorem ipsum dolor si, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
    </div>
  );
}

export default App;
