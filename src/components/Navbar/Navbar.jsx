import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, MapPin, Loader2, Search } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const { 
    currentLocation: displayLoc, 
    isLoading: isDisplayLoading, 
    error: displayError, 
    requestLocation, 
    handleSearchLocation: contextHandleSearch, 
    clearSearch 
  } = useLocationContext();

  const handleLocationClick = () => {
    setShowLocationModal(true);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await contextHandleSearch(searchQuery);
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
              <span>Location / Weather</span>
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
            <h3>Location & Weather</h3>

            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn} disabled={isDisplayLoading}>
                <Search size={18} />
              </button>
            </form>

            <div className={styles.divider}>OR</div>

            <button 
              className={styles.useMyLocBtn} 
              onClick={() => {
                clearSearch();
                requestLocation();
              }}
            >
              <MapPin size={18} /> Use My Current Location
            </button>
            
            {isDisplayLoading && (
              <div className={styles.modalLoading}>
                <Loader2 size={32} className={styles.spinner} />
                <p>Loading location details...</p>
              </div>
            )}
            
            {displayError && (
              <div className={styles.modalError}>
                <p className={styles.errorText}>{displayError}</p>
                {displayError.includes('not found') && (
                  <div className={styles.errorActions}>
                    <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                      We can still help you plan a trip there!
                    </p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button 
                        className={styles.contactBtn} 
                        onClick={() => { setShowLocationModal(false); navigate('/contact'); }}
                      >
                        Contact Us
                      </button>
                      <button 
                        className={styles.aiBtn} 
                        onClick={() => { setShowLocationModal(false); navigate('/planner'); }}
                      >
                        Ask AI Assistant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {displayLoc && !isDisplayLoading && !displayError && (
              <div className={styles.modalLocationResult}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {displayLoc.city || 'Unknown'}, {displayLoc.country || ''}
                  </p>
                </div>
                
                <div className={styles.modalWeather}>
                  <WeatherCard 
                    lat={displayLoc.lat} 
                    lon={displayLoc.lon} 
                    locationName={displayLoc.city || displayLoc.country || "Selected Location"} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
