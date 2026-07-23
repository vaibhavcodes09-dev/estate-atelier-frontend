import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { categories } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function PropertyCategories() {
  return (
    <section id="residential" className="bg-ink-50 py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Find the right type of space"
          subtitle="Whether you're buying your first apartment or acquiring a commercial floor, we curate every category with the same rigour."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.a
              href="#residential"
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-3xl shadow-soft"
            >
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-900/30 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                {cat.tag}
              </span>
              <div className="relative p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  <FiArrowUpRight className="h-5 w-5 text-white/70 transition group-hover:text-white" />
                </div>
                <p className="text-sm leading-relaxed text-white/70">{cat.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-300">{cat.count} listings</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
