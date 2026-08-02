
import PropertyCard from "../common/PropertyCard";

import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { ChevronRight } from 'lucide-react';


// --- RecommendedProperties Section ---
const dummyProperties = [
  {
    id: 1,
    title: "Modern 3BHK Villa",
    price: "₹ 1.85 Cr",
    bhk: "3",
    sqft: "2,100",
    location: "Koramangala, Bengaluru",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    price: "₹ 65 Lacs",
    bhk: "3",
    sqft: "1,550",
    location: "Friends Colony, Etawah",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Independent House",
    price: "₹ 85 Lacs",
    bhk: "3",
    sqft: "1,800",
    location: "Bharthana, Etawah",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Premium Duplex",
    price: "₹ 1.50 Cr",
    bhk: "5",
    sqft: "3,200",
    location: "Jaswant Nagar, Etawah",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Cozy Builder Floor",
    price: "₹ 45 Lacs",
    bhk: "2",
    sqft: "1,100",
    location: "Saifai, Etawah",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const RecommendedProperties = () => {
  return (
    <section className="w-full py-4 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#E93946] rounded-full" />
              <span className="text-sm font-bold tracking-widest text-[#E93946] uppercase">
                Handpicked
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E2248] tracking-tight">
              Popular properties
            </h2>
          </div>

          {/* View All Properties Link (Top Right) */}
          <a 
            href="/all-properties" 
            className="group flex items-center gap-1 text-[15px] font-semibold text-[#0E2248] hover:text-[#E93946] transition-colors"
          >
            View all properties
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Grid Display (Max 4 Items, No Sliding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyProperties.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProperties;