import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  FiGrid,
  FiHome,
  FiHeart,
  FiUser,
  FiPlusCircle,
  FiLogOut,
} from 'react-icons/fi';

// DashboardLayout — wraps all authenticated/dashboard pages (Dashboard,
// Add Property, Edit Property, Wishlist, Profile) with a sidebar navigation.
// The page content is injected via <Outlet /> from React Router.
const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: FiGrid },
  { to: '/add-property', label: 'Add Property', icon: FiPlusCircle },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-ink-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-100 bg-white lg:flex">
        <div className="flex h-20 items-center gap-2.5 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink-900 text-white">
              <span className="font-display text-lg font-bold">EA</span>
            </span>
            <span className="font-display text-xl font-bold text-ink-900">
              Estate<span className="text-brand-500">Atelier</span>
            </span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-600 hover:bg-ink-50'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-100 p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-600 transition hover:bg-ink-50"
          >
            <FiLogout className="h-5 w-5" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-ink-100 bg-white px-5 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 text-white">
            <span className="font-display text-sm font-bold">EA</span>
          </span>
          <span className="font-display text-lg font-bold text-ink-900">
            Estate<span className="text-brand-500">Atelier</span>
          </span>
        </Link>
        <Link to="/" className="text-sm font-semibold text-ink-600">
          Exit
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-6 pt-20 lg:pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
