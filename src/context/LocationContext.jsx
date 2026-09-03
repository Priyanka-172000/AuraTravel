import React, { createContext, useState, useContext } from 'react';
import useGeolocation from '../hooks/useGeolocation';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { location: geoLoc, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();
  
  const [searchedLoc, setSearchedLoc] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearchLocation = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) return;

    setSearchLoading(true);
    setSearchError(null);
    setSearchedLoc(null);

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        setSearchedLoc({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          city: data[0].name,
          country: data[0].display_name.split(',').pop().trim()
        });
      } else {
        setSearchError('Location not found. Please try another search.');
      }
    } catch (err) {
      setSearchError('Failed to search location. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchedLoc(null);
    setSearchError(null);
  };

  const currentLocation = searchedLoc || geoLoc;
  const isLoading = searchLoading || geoLoading;
  const error = searchError || geoError;

  return (
    <LocationContext.Provider 
      value={{
        currentLocation,
        isLoading,
        error,
        requestLocation,
        handleSearchLocation,
        clearSearch,
        isUsingGeolocation: !searchedLoc && !!geoLoc
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
