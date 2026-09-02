import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { fetchImageForQuery } from '../../services/imageService';
import styles from './DestinationCard.module.css';

const DestinationCard = ({ destination }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImage = async () => {
      if (destination.image) {
        setImageUrl(destination.image);
        setLoading(false);
        return;
      }
      try {
        const url = await fetchImageForQuery(destination.imageQuery);
        setImageUrl(url);
      } catch (e) {
        console.error("Image load failed", e);
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, [destination.imageQuery, destination.image]);

  return (
    <div className={styles.card} onClick={() => navigate(`/destination/${destination.id}`)}>
      <div className={styles.imageContainer}>
        {loading ? (
          <div className={styles.skeleton}></div>
        ) : (
          <img 
            src={imageUrl} 
            alt={destination.name} 
            className={styles.image} 
            loading="lazy" 
            onError={(e) => { 
              if (e.target.src !== destination.image && destination.image) {
                e.target.src = destination.image;
              } else {
                e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80';
              }
            }}
          />
        )}
        <div className={styles.tags}>
          {destination.categories.slice(0, 2).map((cat, idx) => (
            <span key={idx} className={styles.tag}>{cat}</span>
          ))}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{destination.name}</h3>
          <span className={styles.country}>
            <MapPin size={14} /> {destination.country}
          </span>
        </div>
        
        <p className={styles.description}>{destination.description.substring(0, 100)}...</p>
        
        <div className={styles.footer}>
          <div className={styles.meta}>
            <Clock size={16} />
            <span>{destination.recommendedDays} days</span>
          </div>
          <button className={styles.viewBtn}>View</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
