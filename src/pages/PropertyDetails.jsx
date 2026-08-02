import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { propertiesData } from "../data/dummydata";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const requiredProperty = propertiesData.find(
    (property) => property.id === Number(id),
  );
  const [activeImage, setActiveImage] = useState(requiredProperty.images[0]);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 mt-12 pt-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Breadcrumbs --- */}
        <nav className="flex items-center text-[13px] font-medium text-slate-500 mb-6">
          <a href="/" className="hover:text-[#E93946] transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a
            href="/all-properties"
            className="hover:text-[#E93946] transition-colors"
          >
            Properties
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#0E2248] truncate">
            {requiredProperty.title}
          </span>
        </nav>

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#0E2248] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                {requiredProperty.status}
              </span>
              <span className="bg-[#E93946]/10 text-[#E93946] text-xs font-bold px-3 py-1.5 rounded-lg">
                {requiredProperty.type}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1D2433] mb-2 tracking-tight">
              {requiredProperty.title}
            </h1>
            <div className="flex items-center gap-2 text-[15px] font-medium text-slate-500">
              <MapPin className="w-4 h-4 text-[#E93946]" />
              {requiredProperty.location}
            </div>
          </div>

          <div className="flex items-center gap-3 md:justify-end">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-[#0E2248] px-4 py-2.5 rounded-[12px] font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-[#0E2248] px-4 py-2.5 rounded-[12px] font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Heart
                className={`w-4 h-4 ${isSaved ? "fill-[#E93946] text-[#E93946]" : ""}`}
              />
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* --- Main Layout Grid --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Left Column: Images & Details --- */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* Image Gallery */}
            <div className="bg-white p-2 rounded-[24px] shadow-sm border border-gray-100">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="relative h-[350px] sm:h-[450px] md:h-[500px] w-full rounded-[20px] overflow-hidden mb-2"
              >
                <img
                  src={activeImage}
                  alt="requiredProperty"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="flex gap-2 overflow-x-auto snap-x no-scrollbar pb-1">
                {requiredProperty.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-20 sm:h-24 w-28 sm:w-36 shrink-0 rounded-[14px] overflow-hidden border-2 transition-all ${
                      activeImage === img
                        ? "border-[#E93946]"
                        : "border-transparent hover:border-[#0E2248]/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* requiredProperty Overview Cards */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col p-4 bg-[#F8FAFC] rounded-[16px]">
                <Bed className="w-6 h-6 text-[#E93946] mb-2" />
                <span className="text-[13px] text-slate-500 font-medium">
                  Bedrooms
                </span>
                <span className="text-[16px] font-bold text-[#0E2248]">
                  {requiredProperty.bhk} Rooms
                </span>
              </div>
              <div className="flex flex-col p-4 bg-[#F8FAFC] rounded-[16px]">
                <Bath className="w-6 h-6 text-[#E93946] mb-2" />
                <span className="text-[13px] text-slate-500 font-medium">
                  Bathrooms
                </span>
                <span className="text-[16px] font-bold text-[#0E2248]">
                  {requiredProperty.baths} Baths
                </span>
              </div>
              <div className="flex flex-col p-4 bg-[#F8FAFC] rounded-[16px]">
                <Square className="w-6 h-6 text-[#E93946] mb-2" />
                <span className="text-[13px] text-slate-500 font-medium">
                  Area
                </span>
                <span className="text-[16px] font-bold text-[#0E2248]">
                  {requiredProperty.area} sq.ft
                </span>
              </div>
              <div className="flex flex-col p-4 bg-[#F8FAFC] rounded-[16px]">
                <Home className="w-6 h-6 text-[#E93946] mb-2" />
                <span className="text-[13px] text-slate-500 font-medium">
                  Built
                </span>
                <span className="text-[16px] font-bold text-[#0E2248]">
                  {requiredProperty.yearBuilt}
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0E2248] mb-4">
                About this Property
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                {requiredProperty.description}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0E2248] mb-6">
                Features & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {requiredProperty.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E93946]" />
                    <span className="text-[15px] font-medium text-slate-600">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Location Section */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0E2248] mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#E93946]" /> Location Map
              </h3>
              <div className="w-full aspect-video rounded-[16px] overflow-hidden bg-slate-100">
                {/* Embed Google Maps Iframe (Coordinates set roughly for Etawah/Jaswant Nagar area) */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113947.58784865181!2d78.93922881512684!3d26.81308337580662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3975c63510c54c33%3A0xc3f3458bf2a0ed81!2sJaswantnagar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="requiredProperty Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* --- Right Column: Sidebar (Sticky) --- */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                <p className="text-[14px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Asking Price
                </p>
                <h2 className="text-4xl font-bold text-[#0E2248] mb-6">
                  {requiredProperty.price}
                </h2>

                <div className="flex flex-col gap-3">
                  <button className="w-full bg-[#E93946] text-white py-4 rounded-[16px] font-bold text-[15px] hover:bg-[#d6333f] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E93946]/20">
                    <Calendar className="w-5 h-5" /> Schedule a Tour
                  </button>
                  <button className="w-full bg-[#F8FAFC] text-[#0E2248] border border-gray-200 py-4 rounded-[16px] font-bold text-[15px] hover:bg-slate-100 transition-colors">
                    Make an Offer
                  </button>
                </div>
              </div>

              {/* Agent Details Card */}
              <div className="bg-[#0E2248] rounded-[24px] p-8 shadow-lg text-white">
                <h3 className="text-[16px] font-bold text-white/80 mb-6 uppercase tracking-wider">
                  Listed By Agent
                </h3>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={requiredProperty.agent.image}
                    alt={requiredProperty.agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {requiredProperty.agent.name}
                    </h4>
                    <p className="text-[13px] text-[#E93946] font-medium">
                      {requiredProperty.agent.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href={`tel:${requiredProperty.agent.phone}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-[12px] transition-colors"
                  >
                    <div className="bg-[#E93946] p-2 rounded-lg">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-[15px]">
                      {requiredProperty.agent.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${requiredProperty.agent.email}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-[12px] transition-colors"
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-[15px] truncate">
                      {requiredProperty.agent.email}
                    </span>
                  </a>
                </div>

                <button className="w-full mt-6 bg-white text-[#0E2248] py-3.5 rounded-[12px] font-bold text-[15px] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <User className="w-5 h-5" /> View Agent Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
