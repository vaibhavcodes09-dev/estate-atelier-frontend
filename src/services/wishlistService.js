import { DB_KEYS, getItem, setItem, initDatabase } from '../data/mockDatabase';
import { getPropertyById } from './propertyService';

initDatabase();

export async function getWishlistIds() {
  return getItem(DB_KEYS.WISHLIST, []);
}

export async function getWishlistProperties() {
  const ids = getItem(DB_KEYS.WISHLIST, []);
  const properties = getItem(DB_KEYS.PROPERTIES, []);
  return properties.filter((p) => ids.includes(p.id));
}

export async function toggleWishlist(propertyId) {
  const ids = getItem(DB_KEYS.WISHLIST, []);
  const numericId = Number(propertyId);
  let updatedIds;
  let isAdded = false;

  if (ids.includes(numericId)) {
    updatedIds = ids.filter((id) => id !== numericId);
  } else {
    updatedIds = [numericId, ...ids];
    isAdded = true;
  }

  setItem(DB_KEYS.WISHLIST, updatedIds);
  return { wishlist: updatedIds, isAdded };
}

export async function isWishlisted(propertyId) {
  const ids = getItem(DB_KEYS.WISHLIST, []);
  return ids.includes(Number(propertyId));
}

export async function clearWishlist() {
  setItem(DB_KEYS.WISHLIST, []);
  return [];
}
