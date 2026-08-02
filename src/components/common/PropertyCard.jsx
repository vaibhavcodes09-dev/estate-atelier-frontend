import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { ChevronRight } from 'lucide-react';

// --- PropertyCard Component ---
const PropertyCard = ({ property }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      // Changed to w-full to fill the grid column, removed snap-start and flex-shrink
      className="group relative w-full bg-[#FFFFFF] rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden"
    >
      {/* Top Half: Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden bg-gray-100">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#FFFFFF] text-[#0E2248] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            For Sale
          </span>
        </div>
        
        {/* Heart Icon with Accent Color on Hover */}
        <button className="absolute top-4 right-4 text-white hover:text-[#E93946] transition-colors drop-shadow-md">
          <FiHeart className="w-5 h-5 stroke-2" />
        </button>
      </div>

      {/* Bottom Half: Details */}
      <div className="p-5">
        {/* Title (Text Color) */}
        <h3 className="text-[17px] font-bold text-[#1D2433] mb-1 tracking-tight">
          {property.title}
        </h3>
        
        {/* Location */}
        <p className="text-[13px] font-medium text-slate-500 mb-5">
          {property.location}
        </p>

        {/* Price (Primary Color) and Area Row */}
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-bold text-[#0E2248]">
            {property.price}
          </span>
          <span className="text-[13px] font-medium text-slate-500">
            {property.sqft} sq.ft
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;