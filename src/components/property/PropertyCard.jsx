import { motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { FiHeart, FiArrowUpRight } from 'react-icons/fi';

export default function PropertyCard({ property, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group card-surface overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">
          {property.status}
        </span>
        <button
          aria-label="Save property"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 backdrop-blur transition hover:bg-white hover:text-brand-500"
        >
          <FiHeart />
        </button>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
          <HiOutlineMapPin className="h-4 w-4" />
          {property.location}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-ink-900">{property.title}</h3>
          <p className="mt-1 text-sm text-ink-500">{property.type}</p>
        </div>

        <div className="flex items-center gap-5 border-y border-ink-100 py-3 text-sm text-ink-600">
          <span className="flex items-center gap-1.5"><strong className="text-ink-900">{property.bhk}</strong> Beds</span>
          <span className="flex items-center gap-1.5"><strong className="text-ink-900">{property.baths}</strong> Baths</span>
          <span className="flex items-center gap-1.5"><strong className="text-ink-900">{property.area}</strong></span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-ink-900">{property.price}</p>
            <p className="text-xs text-ink-400">{property.pricePerSqft}</p>
          </div>
          <button className="inline-flex items-center gap-1 rounded-xl bg-ink-50 px-3.5 py-2 text-sm font-semibold text-ink-800 transition group-hover:bg-ink-900 group-hover:text-white">
            View <FiArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
