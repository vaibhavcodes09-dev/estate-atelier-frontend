import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CTABanner() {
  return (
    <section className="container-px py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 px-8 py-14 text-center sm:px-16 lg:py-20"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-500/10 blur-[80px]" />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Ready to find your dream property?
          </h2>
          <p className="max-w-xl text-lg text-white/60">
            Get a free consultation with our expert advisors. No spam, no obligation — just honest guidance.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-accent">
              Book a free consultation <FiArrowRight className="h-4 w-4" />
            </a>
            <a href="#residential" className="btn-ghost border-white/20 bg-white/10 text-white hover:bg-white/20">
              Browse properties
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
