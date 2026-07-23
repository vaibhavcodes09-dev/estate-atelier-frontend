import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Residential' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 py-20 lg:py-28">
      <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-ink-700/40 blur-[100px]" />

      <div className="container-px relative grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow border-white/20 bg-white/10 text-white/80 w-fit">
            <HiOutlineBuildingOffice2 className="h-4 w-4 text-brand-400" />
            Get in touch
          </span>
          <h2 className="max-w-lg text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Let's find your<br />next address together.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/60">
            Share your requirements and a dedicated property advisor will reach out within 24 hours with a tailored shortlist.
          </p>
          <ul className="flex flex-col gap-3">
            {['Free consultation, no obligation', 'Access to off-market deals', 'Dedicated advisor assigned to you'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-white"><FiCheck className="h-3.5 w-3.5" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-500 text-white"><FiCheck className="h-8 w-8" /></span>
              <h3 className="text-2xl font-bold text-white">Thank you!</h3>
              <p className="max-w-sm text-white/60">Your request has been received. One of our advisors will contact you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost mt-2 border-white/20 bg-white/10 text-white hover:bg-white/20">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-500" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-500" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+91 90000 00000" className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-500" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">I'm interested in</label>
                <select name="interest" value={form.interest} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 px-4 text-sm text-white outline-none transition focus:border-brand-500">
                  <option className="bg-ink-900">Residential</option>
                  <option className="bg-ink-900">Commercial</option>
                  <option className="bg-ink-900">Investment</option>
                  <option className="bg-ink-900">Home Loan</option>
                </select>
              </div>
              <button type="submit" className="btn-accent mt-2 w-full">Request a callback</button>
              <p className="text-center text-xs text-white/40">By submitting you agree to our privacy policy.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
