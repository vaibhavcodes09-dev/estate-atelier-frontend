import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '@/data';
import FAQItem from './FAQItem';
import SectionHeading from '../common/SectionHeading';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container-px py-20 lg:py-28">
      <SectionHeading
        eyebrow="Questions & Answers"
        title="Everything you need to know"
        subtitle="Can't find what you're looking for? Reach out to our team — we're happy to help."
      />

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
