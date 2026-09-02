import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        let city = '';
        let country = '';

        try {
          // Reverse geocode to get city/country using free OSM API
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await response.json();
          if (data && data.address) {
            city = data.address.city || data.address.town || data.address.village || '';
            country = data.address.country || '';
          }
        } catch (e) {
          // Silent fallback if reverse geocoding fails
        }

        setLocation({
          lat,
          lon,
          city,
          country
        });
        setLoading(false);
      },
      (err) => {
        setError("We couldn't access your location. Please enable location permissions to see local weather.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return { location, error, loading, requestLocation };
};

export default useGeolocation;
