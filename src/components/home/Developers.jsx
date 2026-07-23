import { motion } from 'framer-motion';
import { developers } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function Developers() {
  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Trusted Partners"
          title="India's top developers, in one place"
          subtitle="We partner with RERA-registered developers known for quality, timeliness, and transparency."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {developers.map((dev, i) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-3 rounded-3xl border border-ink-100 bg-white p-6 text-center shadow-soft transition hover:shadow-card"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-900 text-2xl font-bold text-white transition group-hover:bg-brand-500">
                {dev.logo}
              </div>
              <div>
                <p className="text-sm font-bold text-ink-900">{dev.name}</p>
                <p className="text-xs text-ink-400">{dev.projects} projects</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
