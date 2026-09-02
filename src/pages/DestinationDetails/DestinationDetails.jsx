import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Info, MapPin } from 'lucide-react';
import { destinationsData } from '../../data/destinations';
import { fetchImageForQuery } from '../../services/imageService';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import FamousPlaceCard from '../../components/FamousPlaceCard/FamousPlaceCard';
import styles from './DestinationDetails.module.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const dest = destinationsData.find(d => d.id === id);
    if (dest) {
      setDestination(dest);
      if (dest.image) {
        setHeroImage(dest.image);
      } else {
        fetchImageForQuery(dest.imageQuery).then(url => setHeroImage(url));
      }
    } else {
      setDestination('not-found');
    }
  }, [id]);

  if (!destination) return null;

  if (destination === 'not-found') {
    return (
      <div className={styles.container}>
        <div className={`container ${styles.notFound}`}>
          <MapPin size={64} className={styles.notFoundIcon} />
          <h2>Destination Not Found</h2>
          <p>We couldn't find the destination you're looking for.</p>
          <button className={styles.planBtn} onClick={() => navigate('/destinations')}>
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        {heroImage ? (
          <img 
            src={heroImage} 
            alt={destination.name} 
            className={styles.heroImg} 
            onError={(e) => { 
              if (e.target.src !== destination.image && destination.image) {
                e.target.src = destination.image;
              } else {
                e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2000&q=80';
              }
            }}
          />
        ) : (
          <div className={styles.heroSkeleton}></div>
        )}
        <div className={styles.heroOverlay}></div>
        
        <div className={`container ${styles.heroContent}`}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.country}>{destination.country}</span>
            <h1>{destination.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        <div className={styles.grid}>
          {/* Main Content Area */}
          <div className={styles.infoCol}>
            <section className={styles.section}>
              <h2>About {destination.name}</h2>
              <p className={styles.description}>{destination.description}</p>
            </section>
            
            <section className={styles.highlights}>
              <div className={styles.highlightItem}>
                <Calendar className={styles.highlightIcon} />
                <div>
                  <h4>Best Time to Visit</h4>
                  <p>{destination.bestTime}</p>
                </div>
              </div>
              <div className={styles.highlightItem}>
                <Clock className={styles.highlightIcon} />
                <div>
                  <h4>Suggested Duration</h4>
                  <p>{destination.recommendedDays} Days</p>
                </div>
              </div>
              <div className={styles.highlightItem}>
                <Info className={styles.highlightIcon} />
                <div>
                  <h4>Perfect For</h4>
                  <p>{destination.categories.join(', ')}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Famous Places</h2>
              <div className={styles.placesGrid}>
                {destination.famousPlaces.map((place, idx) => (
                  <FamousPlaceCard key={idx} place={place} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sticky}>
              <WeatherCard 
                lat={destination.coordinates.lat} 
                lon={destination.coordinates.lon} 
                locationName={destination.name} 
              />
              
              <div className={styles.actionCard}>
                <h3>Plan your trip to {destination.name}</h3>
                <p>Let our AI assistant create a personalized itinerary just for you.</p>
                <button 
                  className={styles.planBtn}
                  onClick={() => navigate('/planner', { state: { destination: destination.name } })}
                >
                  Generate Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
