import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { locations } from '../../data/dummydata';

const PopularLocations = () => {
  return (
    <section className="w-full py-16 bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-[#E93946] uppercase mb-2">
              Popular Locations
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0E2248] tracking-tight">
              Explore top real estate destinations
            </h2>
          </div>

          {/* View All Locations Link */}
          <a 
            href="/locations" 
            className="group flex items-center gap-1 text-[14px] font-semibold text-[#E93946] hover:text-[#0E2248] transition-colors"
          >
            View all locations
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {locations.map((location, index) => (
            <motion.a
              href={`/locations/${location.name.toLowerCase().replace(' ', '-')}`}
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[180px] lg:h-[220px] w-full rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              {/* Background Image */}
              <img 
                src={location.image} 
                alt={`${location.name} Real Estate`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Deep Blue Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2248]/90 via-[#0E2248]/30 to-transparent transition-opacity duration-300" />

              {/* Text Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white text-lg font-bold mb-0.5 tracking-wide">
                  {location.name}
                </h4>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  {location.properties} Properties
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularLocations;