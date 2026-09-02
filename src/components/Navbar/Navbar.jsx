import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, MapPin, Loader2 } from 'lucide-react';
import useGeolocation from '../../hooks/useGeolocation';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { location: geoLoc, error, loading, requestLocation } = useGeolocation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLocationClick = () => {
    setShowLocationModal(true);
    requestLocation();
  };

  return (
    <>
      <header className={`${styles.header} ${(scrolled || !isHomePage) ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          <Link to="/" className={styles.logo}>
            <Compass className={styles.logoIcon} />
            <span>AuraTravel</span>
          </Link>

          <nav className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? styles.activeLink : styles.link}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/destinations" 
              className={({ isActive }) => isActive ? styles.activeLink : styles.link}
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </NavLink>
            <NavLink 
              to="/planner" 
              className={({ isActive }) => isActive ? styles.activeLink : styles.link}
              onClick={() => setIsOpen(false)}
            >
              AI Planner
            </NavLink>
            
            <button className={styles.locationBtn} onClick={handleLocationClick} aria-label="Use My Location">
              <MapPin size={18} />
              <span>Near Me</span>
            </button>
          </nav>

          <button 
            className={styles.mobileToggle} 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {showLocationModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLocationModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setShowLocationModal(false)}>
              <X size={20} />
            </button>
            <h3>Your Location</h3>
            
            {loading && (
              <div className={styles.modalLoading}>
                <Loader2 size={32} className={styles.spinner} />
                <p>Getting your location...</p>
              </div>
            )}
            
            {error && (
              <div className={styles.modalError}>
                <p className={styles.errorText}>{error}</p>
                <p>Please search for a destination manually.</p>
                <Link to="/destinations" className={styles.modalBtn} onClick={() => setShowLocationModal(false)}>
                  Go to Destinations
                </Link>
              </div>
            )}
            
            {geoLoc && !loading && !error && (
              <div className={styles.modalLocationResult}>
                {geoLoc.country ? (
                  <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {geoLoc.city ? `${geoLoc.city}, ` : ''}{geoLoc.country}
                    </p>
                  </div>
                ) : (
                  <p style={{ marginBottom: '20px' }}>Unable to detect your exact location. Please select a destination manually.</p>
                )}
                
                <div className={styles.modalWeather}>
                  <WeatherCard lat={geoLoc.lat} lon={geoLoc.lon} locationName={geoLoc.city && geoLoc.country ? `${geoLoc.city}, ${geoLoc.country}` : geoLoc.city || geoLoc.country || "Your Location"} />
                </div>
                
                {geoLoc.country && geoLoc.country.toLowerCase() === 'india' && (
                  <Link 
                    to="/destination/india" 
                    className={styles.modalBtn}
                    onClick={() => setShowLocationModal(false)}
                    style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}
                  >
                    View India Travel Guide
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
