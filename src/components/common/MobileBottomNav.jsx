import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiHeart, FiUser } from 'react-icons/fi';
import { Calculator } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const path = location.pathname;

  const isAccountActive =
    path === '/dashboard' ||
    path === '/profile' ||
    path === '/add-property' ||
    path.startsWith('/edit-property');

  const navItems = [
    { to: '/', label: 'Home', icon: FiHome, isActive: path === '/' },
    { to: '/properties', label: 'Properties', icon: FiSearch, isActive: path.startsWith('/properties') },
    { to: '/tools', label: 'Tools', icon: Calculator, isActive: path === '/tools' },
    { to: '/wishlist', label: 'Wishlist', icon: FiHeart, badge: wishlistCount, isActive: path === '/wishlist' },
    { to: '/dashboard', label: 'Account', icon: FiUser, isActive: isAccountActive },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`relative flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all ${
              item.isActive
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            <div className="relative">
              <IconComponent className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5]' : ''}`} />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">{item.label}</span>

            {/* Active Indicator Dot */}
            {item.isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-0.5" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
