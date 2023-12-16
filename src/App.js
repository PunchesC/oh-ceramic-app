import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { storage, ref, list,listAll, getDownloadURL } from './Firebase';



function App() {
  const [showButton, setShowButton] = useState(false);
  const galleryRef = useRef();
  const [images, setImages] = useState([]);
  
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) setShowButton(true);
  }
  useEffect(() => {
    const fetchImages = async () => {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e.appspot.com'); // replace 'images' with the path to your directory
      let result = await listAll(imageRef); // Changed list to listAll
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);

      // Function to shuffle an array
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }

      // Shuffle urls
      shuffle(urls);

      // Select the first 12
      urls = urls.slice(0, 12);

      setImages(urls);
    }

    fetchImages();
  }, []);
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
      <div className="image-gallery" onScroll={handleScroll} ref={galleryRef}>
        {images.map((url, index) => (
          <img key={index} src={url} alt="Gallery" />
        ))}
      </div>
        {showButton && <button>Load More</button>}
      </section>
      <section id="contact">
        <h1>Contact</h1>
        <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
    </div>
  );
}

export default App;
