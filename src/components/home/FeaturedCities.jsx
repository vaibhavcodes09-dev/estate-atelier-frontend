import { motion } from 'framer-motion';
import { FiArrowUpRight, FiTrendingUp } from 'react-icons/fi';
import { cities } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function FeaturedCities() {
  return (
    <section className="container-px py-20 lg:py-28">
      <SectionHeading
        eyebrow="Top Destinations"
        title="Explore properties in India's prime cities"
        subtitle="From Mumbai's skyline to Bengaluru's tech corridors — discover verified listings in the markets that matter."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city, i) => (
          <motion.a
            href="#residential"
            key={city.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl shadow-soft"
          >
            <div className="h-72 overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{city.properties.toLocaleString()} properties</p>
                </div>
                <div className="rounded-2xl bg-white/15 px-3 py-2 text-center backdrop-blur">
                  <p className="text-sm font-bold text-white">{city.avgPrice}</p>
                  <p className="flex items-center gap-1 text-xs text-green-300">
                    <FiTrendingUp className="h-3 w-3" /> {city.trend}
                  </p>
                </div>
              </div>
            </div>
            <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-white group-hover:text-ink-900">
              <FiArrowUpRight className="h-5 w-5" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
