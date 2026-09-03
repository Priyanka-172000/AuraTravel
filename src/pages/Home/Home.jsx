import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Star, Globe, MapPin } from 'lucide-react';
import { destinationsData } from '../../data/destinations';
import { fetchImageForQuery } from '../../services/imageService';
import { useLocationContext } from '../../context/LocationContext';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import styles from './Home.module.css';

const Home = () => {
  const { currentLocation, isUsingGeolocation } = useLocationContext();
  const navigate = useNavigate();
  const [featuredDests, setFeaturedDests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadDestinations = async () => {
      const selectedIds = ['paris', 'tokyo', 'dubai', 'bali', 'london', 'new-york', 'rome', 'sydney', 'india'];
      const selected = selectedIds.map(id => destinationsData.find(d => d.id === id)).filter(Boolean);
      
      const enriched = await Promise.all(selected.map(async (dest) => {
        const img = await fetchImageForQuery(dest.imageQuery);
        return { ...dest, imageUrl: img };
      }));
      setFeaturedDests(enriched);
    };
    loadDestinations();
  }, []);

  const [nearbyDests, setNearbyDests] = useState([]);

  useEffect(() => {
    if (featuredDests.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredDests.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredDests.length]);

  // Haversine formula for distance
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    if (currentLocation && currentLocation.lat && currentLocation.lon) {
      const withDistance = destinationsData.map(dest => {
        const distance = getDistance(
          currentLocation.lat, 
          currentLocation.lon, 
          dest.coordinates.lat, 
          dest.coordinates.lon
        );
        return { ...dest, distance };
      });
      // Sort by distance and take top 3
      withDistance.sort((a, b) => a.distance - b.distance);
      
      const loadNearbyImages = async () => {
        const enriched = await Promise.all(withDistance.slice(0, 3).map(async (dest) => {
          const img = await fetchImageForQuery(dest.imageQuery);
          return { ...dest, imageUrl: img };
        }));
        setNearbyDests(enriched);
      };
      loadNearbyImages();
    } else {
      setNearbyDests([]);
    }
  }, [currentLocation]);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.videoWrapper}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className={styles.heroImg}
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          >
            <source src="/videos/travel-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.overlay}></div>
        </div>
        
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroText}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Explore Destinations
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Plan your perfect trip with our AI-powered travel assistant and explore curated destinations designed for the modern traveler.
            </motion.p>
            <motion.div 
              className={styles.actions}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className={styles.primaryBtn} onClick={() => navigate('/destinations')}>
                Explore Destinations <ArrowRight size={18} />
              </button>
              <button className={styles.secondaryBtn} onClick={() => navigate('/planner')}>
                Plan My Trip
              </button>
            </motion.div>
          </div>

          <div className={styles.heroDisplay}>
            {featuredDests.length > 0 && (
              <motion.div 
                className={styles.destinationWidget}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onClick={() => navigate(`/destination/${featuredDests[currentIndex].id}`)}
              >
                <div className={styles.widgetBadge}>Discover</div>
                <div className={styles.widgetImageContainer}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={featuredDests[currentIndex].imageUrl}
                      alt={featuredDests[currentIndex].name}
                      className={styles.widgetImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80'; }}
                    />
                  </AnimatePresence>
                </div>
                <div className={styles.widgetInfo}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className={styles.widgetCity}>{featuredDests[currentIndex].name}</h3>
                      <div className={styles.widgetCountry}>
                        <MapPin size={16} /> {featuredDests[currentIndex].country}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <span>Scroll down</span>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </div>
      </section>

      {/* Location Awareness Section */}
      {currentLocation && (
        <section className={styles.nearbySection}>
          <div className="container">
            <div className={styles.locationHeader}>
              <div className={styles.locationTitle}>
                <MapPin size={28} className={styles.locationIcon} />
                <h2>You're exploring {currentLocation.city || currentLocation.country}</h2>
              </div>
              <p>Discover weather and personalized travel recommendations near you.</p>
            </div>

            <div className={styles.locationContent}>
              <div className={styles.weatherWrapper}>
                <WeatherCard 
                  lat={currentLocation.lat} 
                  lon={currentLocation.lon} 
                  locationName={currentLocation.city || currentLocation.country || "Your Location"} 
                />
              </div>

              <div className={styles.nearbyPlaces}>
                <h3>Recommended Nearby Destinations</h3>
                {nearbyDests.length > 0 ? (
                  <div className={styles.nearbyGrid}>
                    {nearbyDests.map(dest => (
                      <div 
                        key={dest.id} 
                        className={styles.nearbyCard}
                        onClick={() => navigate(`/destination/${dest.id}`)}
                      >
                        <img src={dest.imageUrl || dest.image} alt={dest.name} />
                        <div className={styles.nearbyInfo}>
                          <h4>{dest.name}{dest.country && dest.country !== dest.name ? `, ${dest.country}` : ''}</h4>
                          <span className={styles.distanceBadge}>
                            {Math.round(dest.distance)} km away
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Loading nearby places...</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose AuraTravel</h2>
            <p>We blend cutting-edge AI with expert curation to deliver unforgettable travel experiences.</p>
          </div>
          
          <div className={styles.featureGrid}>
            <motion.div 
              className={styles.featureCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.featureIcon}><Compass size={32} /></div>
              <h3>Curated Destinations</h3>
              <p>Hand-picked locations verified by travel experts to ensure premium quality experiences.</p>
            </motion.div>
            
            <motion.div 
              className={styles.featureCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.featureIcon}><Star size={32} /></div>
              <h3>AI Trip Planning</h3>
              <p>Instantly generate personalized, day-by-day itineraries tailored to your unique interests.</p>
            </motion.div>
            
            <motion.div 
              className={styles.featureCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.featureIcon}><Globe size={32} /></div>
              <h3>Real-time Insights</h3>
              <p>Access up-to-date weather and location-aware recommendations wherever you go.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
