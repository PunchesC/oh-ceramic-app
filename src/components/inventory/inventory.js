import React, { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '../../Firebase'; // adjust the path as needed
import './inventory.css';
import ImageCardBack from '../image-cards/image-card-back/image-card-back'; // adjust the path as needed

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const fetchImages = async () => {
    try {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e/ohceramics');
      let result = await listAll(imageRef);
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);
      setImages(urls);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    }
  };

  const openModal = (url) => {
    setSelectedImageUrl(url);
    setModalVisible(true);
  };

  useEffect(() => {
    fetch('/api/inventory')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Check if the response content type is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
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
      <section id="inventory">
        <h2>Inventory</h2>
        <div className="image-gallery">
          {images.map((url, index) => (
            <div key={index} onClick={() => openModal(url)}>
              <img src={url} alt={`image ${index}`}/> {/* Example thumbnail */}
            </div>
          ))}
        </div>
      </section>
      {modalVisible && <ImageCardBack url={selectedImageUrl} onClose={() => setModalVisible(false)} />}
    </div>
  );
};

export default Inventory;