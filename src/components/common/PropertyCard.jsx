import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

const PropertyCard = ({ property }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      className="group relative flex-shrink-0 w-[300px] sm:w-[340px] bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 transition-shadow duration-500 overflow-hidden snap-start"
    >
      {/* Top Half: Image Container */}
      <div className="relative h-[220px] w-full overflow-hidden bg-gray-100">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Action Button (Pop up) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
          <button className="bg-white/95 backdrop-blur-sm text-indigo-600 px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-colors">
            View Details
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Half: Details */}
      <div className="p-5 sm:p-6">
        {/* Price */}
        <h3 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">
          {property.price}
        </h3>
        
        {/* BHK & Sq.Fts */}
        <div className="flex items-center gap-2 text-[15px] font-medium text-gray-500 mb-4">
          <span>{property.bhk} BHK</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{property.sqft} Sq.Ft.</span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-4" />

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-600">
          <FiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
          <p className="text-sm font-medium leading-relaxed truncate">
            {property.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;