import { propertiesData } from "../../data/dummydata";
import PropertyCard from "../common/PropertyCard";

import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";


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
          <Link 
            to="/properties" 
            className="group flex items-center gap-1 text-[15px] font-semibold text-[#0E2248] hover:text-[#E93946] transition-colors"
          >
            View all properties
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid Display (Max 4 Items, No Sliding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertiesData.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProperties;