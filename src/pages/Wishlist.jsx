import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiSearch, FiTrash2 } from 'react-icons/fi';
import PropertyCard from '@/components/common/PropertyCard';
import { useWishlist } from '@/context/WishlistContext';
import { getProperties } from '@/services/propertyService';

export default function Wishlist() {
  const { wishlistIds, clearWishlist } = useWishlist();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadWishlistProperties() {
      setLoading(true);
      try {
        const allProps = await getProperties({});
        const wishlistedProps = allProps.filter((p) => wishlistIds.includes(p.id));
        if (isMounted) {
          setProperties(wishlistedProps);
        }
      } catch (err) {
        console.error('Error fetching wishlisted properties:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadWishlistProperties();
    return () => {
      isMounted = false;
    };
  }, [wishlistIds]);

  return (
    <div className="w-full flex flex-col gap-8 min-h-[70vh]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Your Wishlist
            <span className="bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-full">
              {wishlistIds.length}
            </span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Keep track of the luxury homes and investment properties you've shortlisted on SquareUp.
          </p>
        </div>

        {wishlistIds.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 border border-rose-200 px-4 py-2 rounded-2xl hover:bg-rose-50 transition-colors w-fit"
          >
            <FiTrash2 className="w-4 h-4" /> Clear All Wishlist
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-3xl bg-white animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} index={idx} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm p-12 sm:p-20 text-center my-4"
        >
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-6">
            <FiHeart className="w-10 h-10 fill-current opacity-30" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            You haven't saved any property listings yet. Start exploring SquareUp to shortlist your dream home.
          </p>
          <Link
            to="/properties"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <FiSearch className="w-4 h-4" />
            Explore All Properties
          </Link>
        </motion.div>
      )}

    </div>
  );
}