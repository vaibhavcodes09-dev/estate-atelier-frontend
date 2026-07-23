import { motion } from 'framer-motion';

export default function StatCard({ stat, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-1"
    >
      <span className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{stat.value}</span>
      <span className="text-sm text-white/60">{stat.label}</span>
    </motion.div>
  );
}
