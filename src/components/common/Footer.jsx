import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import squareupLogo from '../../assets/squareup-logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="lg:pr-6">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img
                src={squareupLogo}
                alt="SquareUp Logo"
                className="h-11 w-auto object-contain rounded-lg shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight leading-none text-white">
                  SquareUp<span className="text-indigo-500">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 mt-1">
                  Real Estate Platform
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-normal">
              SquareUp makes buying, renting, and selling properties simple, transparent, and hassle-free. Serving verified listings across Etawah, Jaswant Nagar, Saifai, and NCR.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                  aria-label="Social Link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider text-xs text-indigo-400">
              Quick Navigation
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: 'Home Overview', path: '/' },
                { name: 'Browse All Properties', path: '/properties' },
                { name: 'Partner Dashboard', path: '/dashboard' },
                { name: 'Post New Property', path: '/add-property' },
                { name: 'Contact Support', path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-indigo-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider text-xs text-indigo-400">
              Top Locations
            </h3>
            <ul className="space-y-3.5">
              {['Etawah', 'Jaswant Nagar', 'Saifai', 'Bharthana', 'Sirsaganj'].map((city, index) => (
                <li key={index}>
                  <Link
                    to={`/properties?q=${encodeURIComponent(city)}`}
                    className="group flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-indigo-400" />
                    Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider text-xs text-indigo-400">
              Contact SquareUp
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <span>
                  SquareUp Plaza, Block C,<br />
                  Vijay Nagar, Etawah, UP 206001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:support@squareup.com" className="hover:text-white transition-colors">
                  support@squareup.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-slate-850 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500 text-xs font-medium">
            © {currentYear} SquareUp Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;