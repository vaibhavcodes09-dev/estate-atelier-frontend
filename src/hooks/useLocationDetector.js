import { useState, useEffect, useCallback } from 'react';
import {
  isCoordinatesSupported,
  LOCATION_STORAGE_KEY,
  SUPPORTED_SERVICED_CITIES,
} from '../utils/location';

export function useLocationDetector() {
  const [status, setStatus] = useState('idle'); // idle | detecting | supported | unsupported | denied | unavailable
  const [userCity, setUserCity] = useState('Etawah');
  const [overrideActive, setOverrideActive] = useState(false);

  // Load saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.override) {
          setOverrideActive(true);
          setStatus('supported');
          setUserCity('Etawah');
        } else if (parsed.city) {
          setUserCity(parsed.city);
          setStatus(parsed.status || 'supported');
        }
      }
    } catch (e) {
      console.error('Error reading location preference:', e);
    }
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unavailable');
      setUserCity('Etawah');
      return;
    }

    setStatus('detecting');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const supported = isCoordinatesSupported(latitude, longitude);

        if (supported) {
          setStatus('supported');
          setUserCity('Etawah');
          localStorage.setItem(
            LOCATION_STORAGE_KEY,
            JSON.stringify({ city: 'Etawah', status: 'supported', lat: latitude, lng: longitude })
          );
        } else {
          setStatus('unsupported');
          setUserCity('Outside Area');
          localStorage.setItem(
            LOCATION_STORAGE_KEY,
            JSON.stringify({ city: 'Outside Area', status: 'unsupported', lat: latitude, lng: longitude })
          );
        }
      },
      (error) => {
        console.warn('Geolocation detection status/error:', error.message);
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('denied');
        } else {
          setStatus('unavailable');
        }
        // Fallback to Etawah so user is never locked out
        setUserCity('Etawah');
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const enableEtawahOverride = useCallback(() => {
    setOverrideActive(true);
    setStatus('supported');
    setUserCity('Etawah');
    localStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify({ city: 'Etawah', status: 'supported', override: true })
    );
  }, []);

  return {
    status,
    userCity,
    overrideActive,
    detectLocation,
    enableEtawahOverride,
    isSupported: status === 'supported' || overrideActive || status === 'idle',
    supportedCities: SUPPORTED_SERVICED_CITIES,
  };
}
