import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locations } from '../../data/dummydata';

const PopularLocations = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                Explore Destinations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Locations
            </h2>
          </div>

          <Link
            to="/properties"
            className="group flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            View All Locations
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                to={`/properties?q=${encodeURIComponent(location.name)}`}
                className="group relative h-52 sm:h-64 w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <img
                  src={location.image}
                  alt={`${location.name} Real Estate`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-xs text-indigo-300 font-semibold mb-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{location.name}</span>
                  </div>
                  <h3 className="text-white text-lg font-extrabold tracking-tight">
                    {location.name}
                  </h3>
                  <p className="text-slate-300 text-xs font-medium mt-0.5">
                    {location.properties} Properties
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularLocations;