import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { SERVICE_ICONS } from '@/constants';
import { services as servicesData } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function Services() {
  return (
    <section id="services" className="bg-ink-950 py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="What we do"
          title="Full-service real estate, end to end"
          subtitle="From discovery to handover, our specialists handle every step so your transaction is effortless, transparent, and secure."
          light
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/15 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-white">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 transition group-hover:gap-2">
                  Learn more <FiArrowUpRight className="h-4 w-4" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
