import { motion } from 'framer-motion';
import { FiShield, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const FEATURES = [
  {
    icon: FiShield,
    title: '47-Point Verification',
    description: 'Every listing passes a rigorous legal and physical due-diligence check before going live.',
  },
  {
    icon: FiTrendingUp,
    title: 'Data-Driven Pricing',
    description: 'Our prop-tech engine analyses 5 years of transaction data to ensure you never overpay.',
  },
  {
    icon: FiUsers,
    title: 'Dedicated Advisor',
    description: 'A single point of contact from first viewing to handover — no call-centre handoffs.',
  },
  {
    icon: FiAward,
    title: 'Award-Winning Service',
    description: 'Recognised by Realty+ and ET Property Awards for three consecutive years.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container-px py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative h-[420px] overflow-hidden rounded-4xl shadow-card">
            <img
              src="https://images.pexels.com/photos/8092701/pexels-photo-8092701.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Real estate advisor"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -bottom-6 -right-2 w-56 rounded-3xl bg-white p-5 shadow-card sm:right-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-600">
                <FiTrendingUp className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-ink-900">98%</p>
                <p className="text-xs text-ink-500">Client satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            eyebrow="Why Estate Atelier"
            title="A better way to buy property"
            subtitle="We combine the rigour of a traditional brokerage with the transparency and speed of modern technology."
            align="left"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition hover:shadow-card"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-brand-400">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-ink-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
