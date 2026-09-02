import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Map, Heart } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            About AuraTravel
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Redefining how you discover, plan, and experience the world.
          </motion.p>
        </div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.section}>
          <h2>What We Do</h2>
          <p>
            AuraTravel is a modern travel platform designed to take the stress out of vacation planning. 
            We combine beautiful destination discovery with intelligent AI-powered itinerary generation 
            to help you craft the perfect trip in seconds.
          </p>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Map size={32} /></div>
            <h3>Destination Discovery</h3>
            <p>Explore curated, high-quality information and imagery for the world's most sought-after locations.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Sparkles size={32} /></div>
            <h3>AI-Powered Planning</h3>
            <p>Generate personalized day-by-day itineraries tailored specifically to your interests and timeline.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Heart size={32} /></div>
            <h3>Built for Travelers</h3>
            <p>Every feature, from our weather integration to our seamless interface, is built to inspire your next journey.</p>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <h2>Why Choose AuraTravel?</h2>
          <p>
            Planning a trip shouldn't require hours of reading through forums and managing spreadsheets. 
            We built AuraTravel to bring the joy back to travel planning. By utilizing advanced AI models 
            and a clean, intuitive design, we provide a premium planning experience that gets you excited 
            for your upcoming adventure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
