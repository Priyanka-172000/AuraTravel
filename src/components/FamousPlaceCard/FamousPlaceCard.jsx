import React, { useState, useEffect } from 'react';
import { fetchImageForQuery } from '../../services/imageService';
import styles from './FamousPlaceCard.module.css';

const FamousPlaceCard = ({ place }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      if (place.image) {
        setImageUrl(place.image);
        setLoading(false);
        return;
      }
      try {
        const url = await fetchImageForQuery(place.query);
        setImageUrl(url);
      } catch (e) {
        console.error("Image load failed", e);
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, [place.query, place.image]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {loading ? (
          <div className={styles.skeleton}></div>
        ) : (
          <img 
            src={imageUrl} 
            alt={place.name} 
            className={styles.image} 
            loading="lazy" 
            onError={(e) => { 
              if (e.target.src !== place.image && place.image) {
                e.target.src = place.image;
              } else {
                e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80';
              }
            }}
          />
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{place.category}</span>
        <h4>{place.name}</h4>
        <p>{place.description}</p>
      </div>
    </div>
  );
};

export default FamousPlaceCard;
