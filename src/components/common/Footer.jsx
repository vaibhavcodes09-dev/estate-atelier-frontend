import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import squareupLogo from '../../assets/squareup-logo.jpg'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0E2248] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Brand (Logo) & About */}
          <div className="lg:pr-8">
            {/* Logo Container */}
            <div className="mb-6 flex items-center">
              <img 
                src={squareupLogo} 
                alt="Company Logo" 
                className="h-12 w-auto object-contain rounded-lg" // specific height, aspect ratio preserved
              />
            </div>
            
            <p className="text-slate-300 text-[14px] leading-relaxed mb-8 font-medium">
              We make finding your dream home simple, transparent, and hassle-free. Serving the best properties across the region with 100% verified listings.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#E93946] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'All Properties', 'Agents', 'Contact Us'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group flex items-center text-[14px] font-medium text-slate-300 hover:text-[#E93946] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Cities */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Top Cities</h3>
            <ul className="space-y-4">
              {['Etawah', 'Jaswant Nagar', 'Saifai', 'Bharthana', 'Sirsaganj'].map((city, index) => (
                <li key={index}>
                  <a 
                    href={`/locations/${city.toLowerCase().replace(' ', '-')}`} 
                    className="group flex items-center text-[14px] font-medium text-slate-300 hover:text-[#E93946] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-[#E93946] shrink-0 mt-0.5" />
                <span className="text-[14px] font-medium leading-relaxed">
                  123 Main Market Road,<br />
                  Jaswant Nagar, UP 206245
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-[#E93946] shrink-0" />
                <a href="tel:+919876543210" className="text-[14px] font-medium hover:text-[#E93946] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-[#E93946] shrink-0" />
                <a href="mailto:contact@realestate.com" className="text-[14px] font-medium hover:text-[#E93946] transition-colors">
                  contact@realestate.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-400 text-[13px] font-medium">
            © {currentYear} RealEstate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 text-[13px] font-medium hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 text-[13px] font-medium hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;