import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import LocationBanner from '@/components/location/LocationBanner';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col pb-16 lg:pb-0">
      <Navbar />
      <LocationBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
