import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineHomeModern } from 'react-icons/hi2';

// AuthLayout — shared split-screen wrapper for Login and Signup pages.
// Left panel: branded gradient with value props.
// Right panel: the form content passed as children.
const HIGHLIGHTS = [
  'Access 2.5L+ verified properties',
  'Dedicated advisor for every client',
  '47-point legal due diligence',
  'Zero brokerage on home loans',
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left — branded panel */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-ink-950 p-8 lg:w-[44%] lg:p-12">
        <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-ink-700/40 blur-[100px]" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 text-white">
            <span className="font-display text-lg font-bold">EA</span>
          </span>
          <span className="font-display text-xl font-bold text-white">
            Estate<span className="text-brand-500">Atelier</span>
          </span>
        </Link>

        <div className="relative my-12 flex flex-col gap-5">
          <span className="eyebrow border-white/20 bg-white/10 text-white/80 w-fit">
            <HiOutlineHomeModern className="h-4 w-4 text-brand-400" />
            Premium Real Estate
          </span>
          <h2 className="max-w-md text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
            Find a place you'll love to call home.
          </h2>
          <ul className="flex flex-col gap-3 pt-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-white">
                  <FiCheck className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/40">
          © 2026 Estate Atelier. All rights reserved.
        </p>
      </div>

      {/* Right — form area */}
      <div className="flex flex-1 items-center justify-center bg-ink-50 px-6 py-16 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-base text-ink-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
