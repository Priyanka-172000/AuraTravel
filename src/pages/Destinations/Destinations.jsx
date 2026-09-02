import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { destinationsData } from '../../data/destinations';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import styles from './Destinations.module.css';

const Destinations = () => {
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
        <div className="container">
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
            <h3>No destinations found</h3>
            <p>We couldn't find any destinations matching your search criteria. Try adjusting your filters.</p>
            <button className={styles.resetBtn} onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
