// Location & Service Area Registry

export const SUPPORTED_SERVICED_CITIES = [
  { id: 'etawah', name: 'Etawah', lat: 26.7766, lng: 79.0238, radiusKm: 60 },
  { id: 'jaswantnagar', name: 'Jaswant Nagar', lat: 26.8833, lng: 78.9333, radiusKm: 30 },
  { id: 'saifai', name: 'Saifai', lat: 26.9583, lng: 78.9667, radiusKm: 30 },
  { id: 'bharthana', name: 'Bharthana', lat: 26.7531, lng: 79.2319, radiusKm: 30 },
  { id: 'sirsaganj', name: 'Sirsaganj', lat: 27.0542, lng: 78.6881, radiusKm: 30 },
];

export const LOCATION_STORAGE_KEY = 'squareup_user_location_pref';

/**
 * Calculate Haversine distance between two coordinates in kilometers.
 */
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if given coordinates fall within any supported service area.
 */
export function isCoordinatesSupported(lat, lng) {
  return SUPPORTED_SERVICED_CITIES.some((city) => {
    const dist = getDistanceKm(lat, lng, city.lat, city.lng);
    return dist <= city.radiusKm;
  });
}
