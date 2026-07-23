import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials } from '@/data';
import SectionHeading from '../common/SectionHeading';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="container-px py-20 lg:py-28">
      <SectionHeading
        eyebrow="Client Stories"
        title="Trusted by thousands of buyers"
        subtitle="From first-time homeowners to seasoned investors — here's what our clients say."
      />

      <div className="mx-auto mt-14 max-w-4xl">
        <div className="relative card-surface p-8 sm:p-12">
          <div className="absolute -top-5 left-8 flex gap-1 rounded-full bg-brand-500 px-3 py-1.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="h-4 w-4 fill-white text-white" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xl font-medium leading-relaxed text-ink-800 sm:text-2xl">
                "{current.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img src={current.avatar} alt={current.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-ink-900">{current.name}</p>
                  <p className="text-sm text-ink-500">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-ink-900' : 'w-2 bg-ink-200'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:bg-ink-50" aria-label="Previous">
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:bg-ink-50" aria-label="Next">
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
