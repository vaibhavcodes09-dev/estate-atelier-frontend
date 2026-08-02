import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, MapPin, IndianRupee, ImagePlus, 
  UploadCloud, Check, CheckCircle2, ChevronRight 
} from 'lucide-react';

const AddProperty = () => {
  // --- Form State ---
  const [formData, setFormData] = useState({
    title: '',
    status: 'For Sale',
    type: 'Villa',
    price: '',
    area: '',
    bhk: '3',
    bathrooms: '2',
    address: '',
    city: 'Jaswant Nagar',
    description: '',
    amenities: [],
  });

  // --- Options ---
  const propertyTypes = ['Apartment', 'Villa', 'Independent House', 'Builder Floor', 'Commercial'];
  const bhkOptions = ['1', '2', '3', '4', '5+'];
  const cities = ['Etawah', 'Jaswant Nagar', 'Saifai', 'Bharthana', 'Sirsaganj'];
  const amenitiesList = [
    '24/7 Security', 'Power Backup', 'Car Parking', 
    'Swimming Pool', 'Gymnasium', 'Garden', 
    'Elevator', 'Vastu Compliant', 'Club House'
  ];

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add API submission logic here
  };

  // Animation variants for staggering sections
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-8">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-[13px] font-medium text-slate-500 mb-6">
          <a href="/" className="hover:text-[#E93946] transition-colors">Home</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#0E2248]">Add New Property</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0E2248] mb-3 tracking-tight">
            List Your Property
          </h1>
          <p className="text-slate-500 text-[16px] font-medium max-w-2xl">
            Fill in the details below to publish your property. High-quality images and accurate details attract more buyers.
          </p>
        </div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          
          {/* --- Section 1: Basic Details --- */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-xl font-bold text-[#0E2248] mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-[#E93946]" /> Basic Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Title */}
              <div className="md:col-span-2">
                <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Property Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Modern 3BHK Villa in VIP Road"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-[14px] font-bold text-[#1D2433] mb-3">Status</label>
                <div className="flex p-1 bg-[#F8FAFC] rounded-[16px]">
                  {['For Sale', 'For Rent'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status }))}
                      className={`flex-1 py-3 text-[14px] font-bold rounded-[12px] transition-all ${
                        formData.status === status 
                          ? 'bg-white text-[#0E2248] shadow-sm' 
                          : 'text-slate-500 hover:text-[#0E2248]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Expected Price (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="number" 
                    name="price"
                    placeholder="e.g. 8500000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Type (Chips) */}
            <div className="mt-8">
              <label className="block text-[14px] font-bold text-[#1D2433] mb-3">Property Type</label>
              <div className="flex flex-wrap gap-3">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`px-5 py-2.5 rounded-[12px] text-[14px] font-semibold transition-all border ${
                      formData.type === type 
                        ? 'bg-[#0E2248] text-white border-[#0E2248]' 
                        : 'bg-white text-slate-600 border-gray-200 hover:border-[#0E2248]/30 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Section 2: Property Specs --- */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-xl font-bold text-[#0E2248] mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E93946]" /> Property Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BHK */}
              <div>
                <label className="block text-[14px] font-bold text-[#1D2433] mb-3">Bedrooms (BHK)</label>
                <div className="flex flex-wrap gap-2">
                  {bhkOptions.map(bhk => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, bhk }))}
                      className={`w-12 h-12 rounded-[12px] text-[15px] font-bold transition-all border flex items-center justify-center ${
                        formData.bhk === bhk 
                          ? 'bg-[#E93946] text-white border-[#E93946]' 
                          : 'bg-white text-slate-600 border-gray-200 hover:border-[#E93946]/50 hover:text-[#E93946]'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Area (sq.ft)</label>
                  <input 
                    type="number" 
                    name="area"
                    placeholder="e.g. 1500"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Bathrooms</label>
                  <input 
                    type="number" 
                    name="bathrooms"
                    placeholder="e.g. 2"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <label className="block text-[14px] font-bold text-[#1D2433] mb-4">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesList.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-3 p-4 rounded-[16px] border transition-all text-left ${
                      formData.amenities.includes(amenity)
                        ? 'bg-[#0E2248]/5 border-[#0E2248]/30'
                        : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                      formData.amenities.includes(amenity) ? 'bg-[#0E2248] border-[#0E2248]' : 'border-slate-300'
                    }`}>
                      {formData.amenities.includes(amenity) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-[14px] font-medium ${formData.amenities.includes(amenity) ? 'text-[#0E2248]' : 'text-slate-600'}`}>
                      {amenity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Section 3: Location --- */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-xl font-bold text-[#0E2248] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#E93946]" /> Location Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[14px] font-bold text-[#1D2433] mb-2">City</label>
                <select 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium appearance-none cursor-pointer"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Full Address</label>
                <input 
                  type="text" 
                  name="address"
                  placeholder="e.g. 123, VIP Road, Near City Mall"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* --- Section 4: Media & Description --- */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-xl font-bold text-[#0E2248] mb-6 flex items-center gap-2">
              <ImagePlus className="w-5 h-5 text-[#E93946]" /> Media & Description
            </h2>
            
            {/* Image Upload Area */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Property Images</label>
              <div className="w-full border-2 border-dashed border-gray-200 rounded-[20px] p-10 flex flex-col items-center justify-center text-center bg-[#F8FAFC] hover:bg-slate-50 hover:border-[#0E2248]/30 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-[#E93946]" />
                </div>
                <h4 className="text-[16px] font-bold text-[#0E2248] mb-1">Click to upload or drag and drop</h4>
                <p className="text-[13px] text-slate-500 font-medium">SVG, PNG, JPG or GIF (max. 5MB per file)</p>
              </div>
            </div>

            {/* Description Area */}
            <div>
              <label className="block text-[14px] font-bold text-[#1D2433] mb-2">Description</label>
              <textarea 
                name="description"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-4 bg-[#F8FAFC] rounded-[16px] border-none text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 transition-all font-medium resize-none"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-[#E93946] text-white px-10 py-4 rounded-[16px] font-bold text-[16px] hover:bg-[#d6333f] hover:scale-[1.02] transition-all shadow-[0_4px_14px_rgba(233,57,70,0.3)] flex items-center gap-2"
            >
              Publish Property
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </motion.div>

        </motion.form>
      </div>
    </div>
  );
};

export default AddProperty;