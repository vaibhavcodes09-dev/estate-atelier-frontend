import { motion } from 'framer-motion';
import { stats } from '@/data';
import StatCard from './StatCard';

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
      <div className="container-px relative py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
