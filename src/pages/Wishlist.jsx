import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHeart, 
  FiMapPin, 
  FiTrash2, 
  FiArrowRight, 
  FiEye,
  FiSearch
} from 'react-icons/fi';

// Dummy Initial Data
const initialWishlist = [
  {
    id: 1,
    title: "Luxury Villa",
    price: "₹1.25 Cr",
    bhk: "4",
    sqft: "2,400",
    location: "Vijay Nagar, Etawah",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    addedOn: "2 days ago"
  },
  {
    id: 2,
    title: "Premium Duplex",
    price: "₹1.50 Cr",
    bhk: "5",
    sqft: "3,200",
    location: "Jaswant Nagar, Etawah",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    addedOn: "1 week ago"
  },
  {
    id: 3,
    title: "Modern Apartment",
    price: "₹65 Lacs",
    bhk: "3",
    sqft: "1,550",
    location: "Friends Colony, Etawah",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    addedOn: "Just now"
  }
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  // Function to handle removing an item with UI state update
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, type: "spring", bounce: 0.2 } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 min-h-[70vh]">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            Your Wishlist
            <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">
              {wishlist.length}
            </span>
          </h1>
          <p className="text-gray-500 mt-2">Keep track of the properties you love.</p>
        </div>
      </motion.div>

      {/* Conditional Rendering based on Wishlist Data */}
      {wishlist.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {wishlist.map((property) => (
              <motion.div 
                key={property.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[220px] w-full overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay Badges & Actions */}
                  <div className="absolute top-4 w-full px-4 flex justify-between items-start z-10">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Saved {property.addedOn}
                    </span>
                    
                    <button 
                      onClick={() => handleRemove(property.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm tooltip-trigger"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight truncate pr-4">
                      {property.title}
                    </h3>
                    <span className="text-lg font-extrabold text-indigo-600 shrink-0">
                      {property.price}
                    </span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-start gap-2 text-gray-500 mb-4">
                    <FiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
                    <p className="text-sm font-medium leading-relaxed truncate">
                      {property.location}
                    </p>
                  </div>

                  {/* Amenities / Specs */}
                  <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 mb-6 bg-gray-50 rounded-xl p-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[11px] uppercase tracking-wider">Bedrooms</span>
                      <span>{property.bhk} BHK</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[11px] uppercase tracking-wider">Area</span>
                      <span>{property.sqft} Sq.Ft.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-3">
                    <button className="flex-1 bg-[#0066FF] hover:bg-[#0055D4] text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm active:scale-[0.98] flex items-center justify-center gap-2">
                      View Details
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-slate-900 transition-colors" title="Contact Agent">
                      <FiEye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: 0.2 }}
          className="flex flex-col items-center justify-center w-full bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-12 sm:p-20 text-center"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-6">
            <FiHeart className="w-10 h-10 fill-current opacity-20" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            You haven't saved any properties yet. Start exploring to find your dream space and save it for later.
          </p>
          <Link 
            to="/" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 shadow-sm active:scale-[0.98] flex items-center gap-2"
          >
            <FiSearch className="w-4 h-4" />
            Explore Properties
          </Link>
        </motion.div>
      )}
    </div>
  );
}