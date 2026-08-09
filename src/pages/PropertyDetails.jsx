import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar,
  ChevronRight,
  User,
  ArrowLeft,
  X,
  Send,
  DollarSign,
} from 'lucide-react';
import { getPropertyById, getFeaturedProperties } from '@/services/propertyService';
import { submitTourInquiry, submitOfferInquiry } from '@/services/contactService';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import PropertyCard from '@/components/common/PropertyCard';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [similarProperties, setSimilarProperties] = useState([]);

  // Modals state
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // Form states
  const [tourForm, setTourForm] = useState({ name: '', email: '', phone: '', preferredDate: '', notes: '' });
  const [offerForm, setOfferForm] = useState({ name: '', email: '', phone: '', offerAmount: '', message: '' });
  const [submittingModal, setSubmittingModal] = useState(false);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const item = await getPropertyById(id);
        if (isMounted) {
          setProperty(item);
          if (item?.images?.length) {
            setActiveImage(item.images[0]);
          } else if (item?.image) {
            setActiveImage(item.image);
          }
        }
        const similar = await getFeaturedProperties(3);
        if (isMounted) {
          setSimilarProperties(similar.filter((p) => String(p.id) !== String(id)));
        }
      } catch (err) {
        console.error('Error fetching property details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const wishlisted = property ? isWishlisted(property.id) : false;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Property link copied to clipboard!', 'info');
    } else {
      addToast('Link: ' + window.location.href, 'info');
    }
  };

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    setSubmittingModal(true);
    try {
      await submitTourInquiry(property.id, property.title, tourForm);
      addToast('Tour request submitted! The agent will reach out shortly.', 'success');
      setTourModalOpen(false);
      setTourForm({ name: '', email: '', phone: '', preferredDate: '', notes: '' });
    } catch (err) {
      addToast('Failed to schedule tour.', 'error');
    } finally {
      setSubmittingModal(false);
    }
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setSubmittingModal(true);
    try {
      await submitOfferInquiry(property.id, property.title, offerForm);
      addToast('Your offer has been sent to the property owner!', 'success');
      setOfferModalOpen(false);
      setOfferForm({ name: '', email: '', phone: '', offerAmount: '', message: '' });
    } catch (err) {
      addToast('Failed to submit offer.', 'error');
    } finally {
      setSubmittingModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-24 lg:pb-20 max-w-7xl mx-auto px-4">
        <div className="h-96 w-full rounded-3xl bg-white animate-pulse border border-slate-100 mb-8" />
        <div className="h-64 w-full rounded-3xl bg-white animate-pulse border border-slate-100" />
      </div>
    );
  }

  // Graceful 404 handling if property ID is invalid
  if (!property) {
    return (
      <div className="min-h-[70vh] bg-slate-50 pt-24 sm:pt-28 pb-24 lg:pb-20 flex items-center justify-center px-4">
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 text-center max-w-lg shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">
            The property listing you are looking for may have been removed or does not exist.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 lg:pb-20 pt-20 sm:pt-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Breadcrumbs --- */}
        <nav className="flex items-center text-xs font-semibold text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
          <Link to="/properties" className="hover:text-indigo-600 transition-colors">
            Properties
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
          <span className="text-slate-800 truncate max-w-xs sm:max-w-md">{property.title}</span>
        </nav>

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
                {property.status}
              </span>
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold px-3 py-1 rounded-lg">
                {property.type}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <MapPin className="w-4 h-4 text-indigo-600" />
              {property.location}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" /> Share Link
            </button>
            <button
              onClick={() => toggleWishlist(property.id, property.title)}
              className={`flex items-center gap-2 border px-4 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-sm ${
                wishlisted
                  ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              {wishlisted ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* --- Main Grid --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Left Column: Images & Overview --- */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            {/* Gallery */}
            <div className="bg-white p-3 rounded-3xl shadow-sm border border-slate-200/80">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden mb-3 bg-slate-100"
              >
                <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
              </motion.div>

              {property.images && property.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {property.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === img ? 'border-indigo-600 scale-95' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview Key Specs */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                <Bed className="w-5 h-5 text-indigo-600 mb-2" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bedrooms</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5">{property.bhk} BHK</span>
              </div>
              <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                <Bath className="w-5 h-5 text-indigo-600 mb-2" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bathrooms</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5">{property.baths} Baths</span>
              </div>
              <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                <Square className="w-5 h-5 text-indigo-600 mb-2" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Area</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5">
                  {property.sqft || property.area || '1,500'} sq.ft
                </span>
              </div>
              <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                <Home className="w-5 h-5 text-indigo-600 mb-2" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Year Built</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5">{property.yearBuilt || '2022'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">About this Property</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Features & Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> Location Map
              </h3>
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113947.58784865181!2d78.93922881512684!3d26.81308337580662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3975c63510c54c33%3A0xc3f3458bf2a0ed81!2sJaswantnagar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="SquareUp Property Location"
                ></iframe>
              </div>
            </div>

          </div>

          {/* --- Right Column: Sticky Sidebar --- */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 flex flex-col gap-6">
              
              {/* Price & Action Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Asking Price</p>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{property.price}</h2>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setTourModalOpen(true)}
                    className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                  >
                    <Calendar className="w-4 h-4" /> Schedule a Site Tour
                  </button>
                  <button
                    onClick={() => setOfferModalOpen(true)}
                    className="w-full bg-slate-100 text-slate-900 border border-slate-200 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-indigo-600" /> Make an Offer
                  </button>
                </div>
              </div>

              {/* Agent Card */}
              {property.agent && (
                <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-6">
                    Listed By Certified Partner
                  </h3>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/30"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-0.5">{property.agent.name}</h4>
                      <p className="text-xs font-medium text-slate-400">{property.agent.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-xl transition-colors text-xs font-semibold"
                    >
                      <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span>{property.agent.phone}</span>
                    </a>

                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-xl transition-colors text-xs font-semibold"
                    >
                      <div className="bg-white/20 p-1.5 rounded-lg text-white">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{property.agent.email}</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* --- Similar Properties --- */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200/80">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Similar Properties You May Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p, idx) => (
                <PropertyCard key={p.id} property={p} index={idx} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* --- TOUR SCHEDULE MODAL (High z-index z-[9995]) --- */}
      <AnimatePresence>
        {tourModalOpen && (
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setTourModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Schedule a Site Visit</h3>
              <p className="text-xs text-slate-500 mb-6">Property: <span className="font-semibold text-slate-800">{property.title}</span></p>

              <form onSubmit={handleTourSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={tourForm.phone}
                    onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={tourForm.email}
                    onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={tourForm.preferredDate}
                    onChange={(e) => setTourForm({ ...tourForm, preferredDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingModal}
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submittingModal ? 'Submitting...' : 'Confirm Request'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MAKE OFFER MODAL (High z-index z-[9995]) --- */}
      <AnimatePresence>
        {offerModalOpen && (
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOfferModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Make an Offer</h3>
              <p className="text-xs text-slate-500 mb-6">Asking Price: <span className="font-extrabold text-slate-900">{property.price}</span></p>

              <form onSubmit={handleOfferSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Offer Amount (₹) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹ 1.75 Cr"
                    value={offerForm.offerAmount}
                    onChange={(e) => setOfferForm({ ...offerForm, offerAmount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={offerForm.name}
                    onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={offerForm.phone}
                    onChange={(e) => setOfferForm({ ...offerForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={offerForm.email}
                    onChange={(e) => setOfferForm({ ...offerForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingModal}
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submittingModal ? 'Sending Offer...' : 'Submit Offer'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
