import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, AlertCircle, Loader2 } from 'lucide-react';
import { fetchWeatherByCoords } from '../../services/weatherService';
import styles from './WeatherCard.module.css';

const WeatherCard = ({ lat, lon, locationName }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        if (!import.meta.env.VITE_OPENWEATHER_API_KEY) {
          setError('Weather information is currently unavailable.');
          return;
        }
        const data = await fetchWeatherByCoords(lat, lon);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Weather information is currently unavailable.');
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      getWeather();
    }
  }, [lat, lon]);

  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case 'clear': return <Sun size={48} className={styles.iconSun} />;
      case 'rain': 
      case 'drizzle': return <CloudRain size={48} className={styles.iconRain} />;
      case 'clouds': return <Cloud size={48} className={styles.iconCloud} />;
      default: return <Cloud size={48} className={styles.iconCloud} />;
    }
  };

  if (loading) {
    return (
      <div className={`${styles.card} ${styles.loading}`}>
        <Loader2 size={32} className={styles.spinner} />
        <p>Loading current weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.card} ${styles.error}`}>
        <AlertCircle size={32} />
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>Current Weather in {locationName}</h4>
        <span className={styles.desc}>{weather.weather[0].description}</span>
      </div>
      
      <div className={styles.mainInfo}>
        <div className={styles.iconContainer}>
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className={styles.temp}>
          {Math.round(weather.main.temp)}°<span>C</span>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Thermometer size={18} />
          <div>
            <span className={styles.label}>Feels Like</span>
            <span className={styles.value}>{Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
        
        <div className={styles.detailItem}>
          <Droplets size={18} />
          <div>
            <span className={styles.label}>Humidity</span>
            <span className={styles.value}>{weather.main.humidity}%</span>
          </div>
        </div>
        
        <div className={styles.detailItem}>
          <Wind size={18} />
          <div>
            <span className={styles.label}>Wind</span>
            <span className={styles.value}>{weather.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
