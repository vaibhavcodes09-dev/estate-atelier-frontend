import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Home,
  MapPin,
  IndianRupee,
  ImagePlus,
  UploadCloud,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { createProperty } from '@/services/propertyService';
import { useToast } from '@/context/ToastContext';

export default function AddProperty() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    status: 'For Sale',
    type: 'Villa',
    price: '',
    area: '',
    bhk: '3',
    bathrooms: '2',
    address: '',
    city: 'Etawah',
    description: '',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    amenities: ['24/7 Security', 'Power Backup', 'Car Parking'],
  });

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Duplex', 'Builder Floor', 'Commercial'];
  const bhkOptions = ['1', '2', '3', '4', '5+'];
  const cities = ['Etawah', 'Jaswant Nagar', 'Saifai', 'Bharthana', 'Sirsaganj', 'Lucknow', 'Kanpur'];
  const amenitiesList = [
    '24/7 Security',
    'Power Backup',
    'Car Parking',
    'Swimming Pool',
    'Gymnasium',
    'Garden',
    'Elevator',
    'Vastu Compliant',
    'Club House',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const created = await createProperty(formData);
      addToast(`Property "${created.title}" successfully listed!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast('Failed to publish property listing.', 'error');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-semibold text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
          <span className="text-slate-800">Add Property</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              List Your Property on SquareUp
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Publish your residential or commercial property to connect with verified buyers and tenants.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel
          </Link>
        </div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Section 1: Basic Details */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Home className="w-5 h-5 text-indigo-600" /> Basic Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Modern 3BHK Luxury Villa with Pool"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Listing Status</label>
                <div className="flex p-1 bg-slate-100 rounded-2xl">
                  {['For Sale', 'For Rent'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, status }))}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                        formData.status === status ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Expected Price (₹) *</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 8500000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      formData.type === type
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 2: Property Specs */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Specifications & Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Bedrooms (BHK)</label>
                <div className="flex flex-wrap gap-2">
                  {bhkOptions.map((bhk) => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, bhk }))}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                        formData.bhk === bhk
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Area (sq.ft) *</label>
                  <input
                    type="number"
                    name="area"
                    placeholder="e.g. 1800"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Bathrooms *</label>
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="e.g. 3"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                      formData.amenities.includes(amenity)
                        ? 'bg-indigo-50/60 border-indigo-200 text-indigo-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        formData.amenities.includes(amenity)
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {formData.amenities.includes(amenity) && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-xs font-bold">{amenity}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 3: Location */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-indigo-600" /> Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Address / Area *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Friends Colony, Block A"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Section 4: Image & Description */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <ImagePlus className="w-5 h-5 text-indigo-600" /> Media & Detailed Description
            </h2>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Main Cover Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Paste image URL or use default"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600 mb-3"
              />

              {formData.image && (
                <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Description *</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Detail key highlights, nearby landmarks, security, and ventilation..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600 resize-none"
                required
              />
            </div>
          </motion.div>

          {/* Submit Action */}
          <motion.div variants={itemVariants} className="flex justify-end gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Property'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </motion.div>

        </motion.form>

      </div>
    </div>
  );
}