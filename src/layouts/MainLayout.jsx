import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// MainLayout — wraps all public-facing pages (Home, Properties, Contact, etc.)
// with the shared Navbar at the top and Footer at the bottom. The page content
// is injected via <Outlet /> from React Router.
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
