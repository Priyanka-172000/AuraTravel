import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import { destinationsData } from '../../data/destinations';
import styles from './Popular.module.css';

const Popular = () => {
  // Select some popular destinations to feature
  const popularDestinations = destinationsData.filter(d => 
    ['Paris', 'Tokyo', 'Bali', 'London', 'New York', 'Rome', 'Dubai', 'Sydney', 'India'].includes(d.name)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Popular Places
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Explore the world's most sought-after destinations and start planning your next unforgettable adventure.
          </motion.p>
        </div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          {popularDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;