import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiEye,
  FiUsers,
  FiTrendingUp,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiArrowUpRight,
  FiMessageCircle,
  FiPlusSquare,
  FiAlertTriangle,
  FiX,
} from 'react-icons/fi';
import { getProperties, deleteProperty } from '@/services/propertyService';
import { getContactSubmissions } from '@/services/contactService';
import { useToast } from '@/context/ToastContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [propsData, inqData] = await Promise.all([
          getProperties({}),
          getContactSubmissions(),
        ]);
        if (isMounted) {
          setProperties(propsData);
          setInquiries(inqData);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;
    setDeleting(true);
    try {
      await deleteProperty(propertyToDelete.id);
      setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
      addToast(`Property "${propertyToDelete.title}" deleted.`, 'info');
      setDeleteModalOpen(false);
      setPropertyToDelete(null);
    } catch (err) {
      addToast('Failed to delete property.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const totalViews = properties.reduce((acc, p) => acc + (p.views || 450), 0);

  const stats = [
    { label: 'Active Properties', value: properties.length, trend: '+2 this month', icon: FiHome, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Views', value: totalViews.toLocaleString(), trend: '+18% vs last month', icon: FiEye, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Total Inquiries', value: inquiries.length, trend: `+${inquiries.filter((i) => i.unread).length} new`, icon: FiUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Conversion Rate', value: '4.8%', trend: '+0.6% vs last month', icon: FiTrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Partner Overview
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Real-time analytics, property listings, and lead inquiries for SquareUp Partners.
          </p>
        </div>

        <Link
          to="/add-property"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 w-fit active:scale-95"
        >
          <FiPlusSquare className="w-4 h-4" /> Add New Property
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{stat.label}</p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Property Listings */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Your Managed Listings</h2>
            <Link to="/properties" className="text-xs font-bold text-indigo-600 hover:underline">
              View All Public Catalog
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="p-10 text-center text-slate-500 text-sm">
                No property listings found. Click "Add New Property" to get started.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-32 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-900 truncate">{property.title}</h3>
                        <span
                          className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md ${
                            property.status === 'For Sale' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mb-2">
                        <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <p className="truncate">{property.location}</p>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                        <span className="text-indigo-600">{property.price}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-medium">{property.sqft} sq.ft</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 sm:flex-col sm:justify-center sm:pl-4 sm:border-l border-slate-100">
                      <Link
                        to={`/edit-property/${property.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                        title="Edit Property"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => {
                          setPropertyToDelete(property);
                          setDeleteModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete Property"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Inquiries */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Inquiries</h2>
            <span className="text-xs font-bold text-slate-400">{inquiries.length} Messages</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No lead inquiries yet.</p>
            ) : (
              <div className="flex flex-col gap-5">
                {inquiries.slice(0, 4).map((inquiry) => (
                  <div key={inquiry.id} className="flex gap-3.5 group">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FiMessageCircle className="w-5 h-5" />
                      </div>
                      {inquiry.unread && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{inquiry.name}</h4>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {inquiry.type || 'Inquiry'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {inquiry.message || inquiry.propertyTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/contact"
              className="w-full mt-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1 text-center block"
            >
              Contact Support Hub
            </Link>
          </div>
        </div>

      </div>

      {/* --- CONFIRM DELETE MODAL --- */}
      <AnimatePresence>
        {deleteModalOpen && propertyToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center"
            >
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Property Listing?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-slate-800">"{propertyToDelete.title}"</span>? This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-2xl font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-2xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Listing'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}