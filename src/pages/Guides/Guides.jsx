import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import styles from './Guides.module.css';

const Guides = () => {
  const guides = [
    {
      title: 'First-Time Europe Guide',
      description: 'Everything you need to know for your first European adventure, from Eurail passes to Schengen visas.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques_000225.jpg'
    },
    {
      title: 'Japan Travel Guide',
      description: 'Navigate the complex train systems, understand ryokan etiquette, and find the best cherry blossoms.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Meiji_Jingu_2023-3.jpg'
    },
    {
      title: 'Bali Travel Guide',
      description: 'The ultimate guide to the Island of the Gods, featuring hidden beaches and ancient temples.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Tegallalang_Rice_Terrace_in_Bali.jpg'
    },
    {
      title: 'Dubai Travel Guide',
      description: 'How to experience the luxury, culture, and record-breaking architecture of the UAE.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg'
    },
    {
      title: 'India Travel Guide',
      description: 'A comprehensive journey through India\'s Golden Triangle, from the Taj Mahal to bustling Delhi markets.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Travel Guides
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Expert advice, comprehensive itineraries, and essential tips for your next destination.
          </motion.p>
        </div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          {guides.map((guide, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.imageContainer}>
                <img src={guide.image} alt={guide.title} className={styles.image} />
                <div className={styles.badge}><BookOpen size={16} /> Guide</div>
              </div>
              <div className={styles.cardContent}>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <button className={styles.readBtn}>Read Guide</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;