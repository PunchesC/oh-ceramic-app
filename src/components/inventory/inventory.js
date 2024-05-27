import React, { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '../../Firebase'; // adjust the path as needed
import './inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchImages = async () => {
    try {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e.appspot.com');
      let result = await listAll(imageRef);
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);
      setImages(urls);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    }
  };

  useEffect(() => {
    fetch('/api/inventory')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        try {
          const data = JSON.parse(text);
          setItems(data);
        } catch (err) {
          console.error('Failed to parse JSON:', err);
          console.log('Server response:', text);
        }
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setIsLoading(false));

    fetchImages();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Inventory</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              {item.name}: {item.quantity}
              {images[index] && <img src={images[index]} alt={item.name} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in inventory.</p>
      )}
      <section id="inventory">
        <div className="image-gallery">
          {images.map((url, index) => (
            <img key={index} src={url} alt="Gallery" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;