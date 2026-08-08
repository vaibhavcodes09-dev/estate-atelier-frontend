import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../common/PropertyCard';
import { getFeaturedProperties } from '@/services/propertyService';

const RecommendedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProperties() {
      try {
        const data = await getFeaturedProperties(4);
        if (isMounted) setProperties(data);
      } catch (err) {
        console.error('Failed to load featured properties:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                Handpicked Listings
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Properties on SquareUp
            </h2>
          </div>

          <Link
            to="/properties"
            className="group flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Explore All Properties
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Loading Skeleton or Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-white animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default RecommendedProperties;