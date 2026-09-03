import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { destinationsData } from '../../data/destinations';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import styles from './Destinations.module.css';

const Destinations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...new Set(destinationsData.flatMap(d => d.categories))];

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            dest.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || dest.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.videoWrapper}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className={styles.headerVideo}
            poster="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80"
          >
            <source src="/videos/travel-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay}></div>
        </div>
        <div className={`container ${styles.headerContent}`}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Find your next adventure from our curated list of world-class locations.
          </motion.p>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by city or country..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filters}>
            <SlidersHorizontal size={20} className={styles.filterIcon} />
            <div className={styles.categoryChips}>
              {allCategories.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.chip} ${selectedCategory === cat ? styles.activeChip : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
          <motion.div 
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDestinations.map((dest, index) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.emptyState}>
            <MapPin size={48} className={styles.emptyIcon} />
            <h3>Destination Not Found</h3>
            <p>
              The city you are looking for is not listed in our current plans. 
              Please contact us so we can guide you and help plan a trip to your chosen place!
            </p>
            <div className={styles.emptyActions}>
              <button className={styles.resetBtn} onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                Reset Filters
              </button>
              <button onClick={() => navigate('/contact')} className={styles.contactBtn}>
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
