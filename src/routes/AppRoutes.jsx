import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import Home from '@/pages/Home';
import Properties from '@/pages/Properties';
import PropertyDetails from '@/pages/PropertyDetails';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Wishlist from '@/pages/Wishlist';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import AddProperty from '@/pages/AddProperty';
import EditProperty from '@/pages/EditProperty';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// AppRoutes — central route configuration.
// Public pages use MainLayout (Navbar + Footer).
// Dashboard pages use DashboardLayout (sidebar nav).
export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes — standalone, no MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/all-properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
