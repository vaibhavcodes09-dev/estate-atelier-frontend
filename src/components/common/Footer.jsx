import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { NAV_LINKS } from '@/constants';

const FOOTER_LINKS = {
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Services: ['Residential', 'Commercial', 'Investments', 'Home Loans', 'Property Management'],
  Resources: ['Market Reports', 'EMI Calculator', 'Area Converter', 'Property Guides', 'RERA Info'],
};

const SOCIALS = [
  { icon: FiFacebook, label: 'Facebook' },
  { icon: FiTwitter, label: 'Twitter' },
  { icon: FiInstagram, label: 'Instagram' },
  { icon: FiLinkedin, label: 'LinkedIn' },
  { icon: FiYoutube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 text-white">
                <span className="font-display text-lg font-bold">EA</span>
              </span>
              <span className="font-display text-xl font-bold">Estate<span className="text-brand-500">Atelier</span></span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              India's most trusted real estate advisory. We help you discover, buy, and invest in premium properties with complete transparency.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="tel:+910000000000" className="flex items-center gap-2 transition hover:text-white"><FiPhone className="h-4 w-4" /> +91 90000 00000</a>
              <a href="mailto:hello@estateatelier.in" className="flex items-center gap-2 transition hover:text-white"><FiMail className="h-4 w-4" /> hello@estateatelier.in</a>
              <span className="flex items-center gap-2"><FiMapPin className="h-4 w-4" /> Bandra Kurla Complex, Mumbai 400051</span>
            </div>
            <div className="flex gap-3 pt-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-3">
                <h4 className="text-sm font-bold uppercase tracking-wide text-white/80">{title}</h4>
                {links.map((link) => (
                  <a key={link} href="#" className="text-sm text-white/50 transition hover:text-white">{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
          <p>© 2026 Estate Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
            <a href="#" className="transition hover:text-white">RERA Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
