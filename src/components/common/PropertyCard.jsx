import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

const PropertyCard = ({ property, layout = 'grid', index = 0 }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id, property.title);
  };

  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`group relative bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex ${
        isList ? 'flex-col sm:flex-row items-stretch' : 'flex-col'
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 shrink-0 ${isList ? 'w-full sm:w-72 h-56 sm:h-auto' : 'w-full h-56 sm:h-60'}`}>
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-white/20 shadow-sm">
            {property.status}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-rose-500/30'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Property Details Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Location Pin */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1 mb-3">
            {property.title}
          </h3>

          {/* Specs Bar */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-4 border border-slate-100/80">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bhk} BHK</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.baths} Baths</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.sqft || property.area || '1,200'} sq.ft</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Row */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-xs font-medium text-slate-400 block">Price</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {property.price}
            </span>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm group-hover:shadow-md active:scale-95"
          >
            Details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;