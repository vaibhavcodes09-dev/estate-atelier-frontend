import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { insights } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function MarketInsights() {
  return (
    <section id="insights" className="container-px py-20 lg:py-28">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Market Intelligence"
          title="Insights that move decisions"
          subtitle="Data-backed research and trend analysis from our in-house prop-tech desk."
          align="left"
        />
        <a href="#insights" className="btn-ghost shrink-0">
          All reports <FiArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {insights.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group card-surface overflow-hidden"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">
                {item.category}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center gap-3 text-xs text-ink-400">
                <span>{item.date}</span>
                <span className="h-1 w-1 rounded-full bg-ink-300" />
                <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {item.readTime}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-ink-900 transition group-hover:text-brand-600">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">{item.excerpt}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 transition group-hover:gap-2">
                Read article <FiArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
