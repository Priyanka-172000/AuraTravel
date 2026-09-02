import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, Calendar, MapPin, Heart, Loader2, RefreshCw } from 'lucide-react';
import { generateItinerary } from '../../services/geminiService';
import { fetchImageForQuery } from '../../services/imageService';
import { getMockItinerary } from '../../data/mockItineraries';
import { destinationsData } from '../../data/destinations';
import styles from './AIPlanner.module.css';

const AIPlanner = () => {
  const location = useLocation();
  const initialDestination = location.state?.destination || '';

  const [formData, setFormData] = useState({
    destination: initialDestination,
    days: '3',
    interests: 'culture, food, sightseeing'
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [destFallbackImage, setDestFallbackImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadItineraryImages = async (itineraryData) => {
    // Get generic fallback for the entire destination
    const destObj = destinationsData.find(d => d.name.toLowerCase() === formData.destination.toLowerCase());
    const fallbackQ = destObj ? destObj.imageQuery : formData.destination;
    const destImage = await fetchImageForQuery(fallbackQ);
    setDestFallbackImage(destImage);

    return await Promise.all(itineraryData.map(async (day) => {
      const imgUrl = await fetchImageForQuery(day.imageQuery || day.morning);
      return { ...day, imageUrl: imgUrl };
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination.trim()) return;

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setLoading(true);
      setError(null);
      setItinerary(null);
      
      const numDays = parseInt(formData.days);
      const mockData = getMockItinerary(formData.destination, numDays, formData.interests);
      
      const enrichedData = await loadItineraryImages(mockData);
      setItinerary(enrichedData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const data = await generateItinerary(formData.destination, formData.days, formData.interests);
      const enrichedData = await loadItineraryImages(data);
      setItinerary(enrichedData);
    } catch (err) {
      setError("We couldn't generate your itinerary at this time. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI Itinerary Planner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Let our intelligent assistant craft the perfect day-by-day plan for your next adventure.
          </motion.p>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="destination">
                <MapPin size={16} /> Destination
              </label>
              <input 
                type="text" 
                id="destination"
                name="destination"
                placeholder="e.g. Kyoto, Japan" 
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="days">
                <Calendar size={16} /> Duration (Days)
              </label>
              <select 
                id="days" 
                name="days" 
                value={formData.days}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Day' : 'Days'}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="interests">
                <Heart size={16} /> Interests & Preferences
              </label>
              <input 
                type="text" 
                id="interests"
                name="interests"
                placeholder="e.g. Museums, local food, relaxing" 
                value={formData.interests}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <Loader2 size={18} className={styles.spinner} /> : <Wand2 size={18} />}
              {loading ? 'Generating...' : 'Generate Itinerary'}
            </button>
          </form>
        </div>

        <div className={styles.resultsSection}>
          {loading && (
            <div className={styles.loadingState}>
              <Loader2 size={48} className={styles.spinnerLg} />
              <h3>Crafting your perfect trip...</h3>
              <p>Our AI is analyzing thousands of possibilities.</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={handleSubmit}>
                <RefreshCw size={16} /> Try Again
              </button>
            </div>
          )}

          {!loading && !error && itinerary && (
            <motion.div 
              className={styles.itinerary}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.itineraryHeader}>
                <h2>Your {formData.days}-Day Plan for {formData.destination}</h2>
                <button className={styles.iconBtn} onClick={handleSubmit} title="Regenerate">
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className={styles.timeline}>
                {itinerary.map((day, index) => (
                  <motion.div 
                    key={index} 
                    className={styles.dayCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.dayImageContainer}>
                      <img 
                        src={day.imageUrl || destFallbackImage} 
                        alt={day.title || `Day ${day.day || index + 1}`}
                        className={styles.dayImage}
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = destFallbackImage || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80'; 
                        }}
                      />
                      <div className={styles.dayBadge}>Day {day.day || (index + 1)}</div>
                    </div>
                    
                    <div className={styles.dayContent}>
                      {day.title && <h3 className={styles.dayTitle}>{day.title}</h3>}
                      
                      <div className={styles.timeBlock}>
                        <h4>MORNING</h4>
                        <p>{day.morning}</p>
                      </div>
                      <div className={styles.timeBlock}>
                        <h4>AFTERNOON</h4>
                        <p>{day.afternoon}</p>
                      </div>
                      <div className={styles.timeBlock}>
                        <h4>EVENING</h4>
                        <p>{day.evening}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!loading && !error && !itinerary && (
            <div className={styles.emptyState}>
              <Wand2 size={48} className={styles.emptyIcon} />
              <h3>Ready to plan?</h3>
              <p>Fill out the form to generate a personalized itinerary.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
