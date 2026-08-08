import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as wishlistService from '../services/wishlistService';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchWishlist = useCallback(async () => {
    try {
      const ids = await wishlistService.getWishlistIds();
      setWishlistIds(ids);
    } catch (err) {
      console.error('Failed to fetch wishlist IDs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (propertyId, propertyTitle = 'Property') => {
    try {
      const { wishlist, isAdded } = await wishlistService.toggleWishlist(propertyId);
      setWishlistIds(wishlist);

      if (isAdded) {
        addToast(`"${propertyTitle}" added to your wishlist!`, 'success');
      } else {
        addToast(`"${propertyTitle}" removed from your wishlist.`, 'info');
      }
      return isAdded;
    } catch (err) {
      addToast('Failed to update wishlist', 'error');
      console.error(err);
    }
  };

  const isWishlisted = (propertyId) => {
    return wishlistIds.includes(Number(propertyId));
  };

  const clearWishlist = async () => {
    try {
      await wishlistService.clearWishlist();
      setWishlistIds([]);
      addToast('Wishlist cleared.', 'info');
    } catch (err) {
      addToast('Failed to clear wishlist', 'error');
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        loading,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
