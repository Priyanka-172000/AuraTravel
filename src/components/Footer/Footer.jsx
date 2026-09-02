import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Compass className={styles.logoIcon} />
            <span>AuraTravel</span>
          </div>
          <p>Discover the world's most beautiful destinations and plan your perfect trip with our AI assistant.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Globe"><Globe size={20} /></a>
            <a href="#" aria-label="Mail"><Mail size={20} /></a>
            <a href="#" aria-label="Phone"><Phone size={20} /></a>
          </div>
        </div>
        
        <div className={styles.linksColumn}>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/planner">Plan a Trip</Link></li>
            <li><Link to="/guides">Travel Guides</Link></li>
            <li><Link to="/popular">Popular Places</Link></li>
          </ul>
        </div>
        
        <div className={styles.linksColumn}>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} AuraTravel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
