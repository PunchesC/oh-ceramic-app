import React, { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '../../Firebase'; // adjust the path as needed
import './inventory.css';
import ImageCardFront from '../image-cards/image-card-front/image-card-front';
import ImageCardBack from '../image-cards/image-card-back/image-card-back';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flipState, setFlipState] = useState(new Array(images.length).fill(false));

  const fetchImages = async () => {
    try {
      let imageRef = ref(storage, 'gs://olivia-hoffman-ceramics-8720e.appspot.com');
      let result = await listAll(imageRef);
      let urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
      let urls = await Promise.all(urlPromises);
      setImages(urls);
      setFlipState(new Array(urls.length).fill(false));
    } catch (err) {
      console.error('Failed to fetch images:', err);
    }
  };

  const flipCard = (index) => {
    setFlipState(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
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
<section id="inventory">
<h2>Inventory</h2>
  <div className="image-gallery">
  {images.map((url, index) => (
  <div key={index} onClick={() => flipCard(index)}>
    {flipState[index] ? (
      <ImageCardBack url={url} imageName={'image name here'} />
    ) : (
      <ImageCardFront url={url} imageName={'image name here'} />
    )}
  </div>
))}
  </div>
</section>
    </div>
  );
}
export default Inventory;