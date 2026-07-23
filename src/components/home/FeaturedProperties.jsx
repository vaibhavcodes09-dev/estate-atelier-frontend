import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { properties } from '@/data';
import PropertyCard from '../property/PropertyCard';
import SectionHeading from '../common/SectionHeading';

const FILTERS = ['All', 'Apartment', 'Villa', 'New Launch'];

export default function FeaturedProperties() {
  const [filter, setFilter] = useState('All');

  const filtered = properties.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Apartment') return p.type.includes('Apartment');
    if (filter === 'Villa') return p.type.includes('Villa');
    if (filter === 'New Launch') return p.tag === 'New Launch' || p.tag === 'Trending';
    return true;
  });

  return (
    <section id="commercial" className="container-px py-20 lg:py-28">
      <SectionHeading
        eyebrow="Handpicked for you"
        title="Featured properties this week"
        subtitle="A curated selection of verified, high-demand residences and commercial spaces across India's most sought-after addresses."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              filter === f ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a href="#residential" className="btn-ghost">
          View all properties <FiArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
