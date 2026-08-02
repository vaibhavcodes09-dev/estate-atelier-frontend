import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: "Etawah",
    properties: "1,200+",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Jaswant Nagar",
    properties: "850+",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Saifai",
    properties: "420+",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Bharthana",
    properties: "630+",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Sirsaganj",
    properties: "310+",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
  },
];

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