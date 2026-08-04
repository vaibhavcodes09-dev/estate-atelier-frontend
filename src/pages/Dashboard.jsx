import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiEye, 
  FiUsers, 
  FiTrendingUp, 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2,
  FiMapPin,
  FiArrowUpRight,
  FiMessageCircle
} from 'react-icons/fi';

// Dummy Data
const stats = [
  { label: 'Total Properties', value: '12', trend: '+2 this month', icon: FiHome, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Views', value: '4,821', trend: '+15% vs last month', icon: FiEye, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Total Inquiries', value: '38', trend: '+8 new this week', icon: FiUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Conversion Rate', value: '4.2%', trend: '+0.4% vs last month', icon: FiTrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const recentProperties = [
  {
    id: 1,
    title: 'Luxury Villa',
    location: 'Vijay Nagar, Etawah',
    price: '₹1.25 Cr',
    status: 'Active',
    views: 1240,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Modern Apartment',
    location: 'Friends Colony, Etawah',
    price: '₹65 Lacs',
    status: 'Under Review',
    views: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Premium Duplex',
    location: 'Jaswant Nagar, Etawah',
    price: '₹1.50 Cr',
    status: 'Active',
    views: 856,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const recentInquiries = [
  { id: 1, name: 'Rahul Sharma', property: 'Luxury Villa', time: '2 hours ago', unread: true },
  { id: 2, name: 'Priya Singh', property: 'Premium Duplex', time: '5 hours ago', unread: true },
  { id: 3, name: 'Amit Kumar', property: 'Luxury Villa', time: '1 day ago', unread: false },
  { id: 4, name: 'Neha Gupta', property: 'Modern Apartment', time: '2 days ago', unread: false },
];

export default function Dashboard() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your properties today.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 w-fit">
          Download Report
          <FiArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-semibold text-gray-500 mb-3">{stat.label}</p>
            <div className="mt-auto pt-4 border-t border-gray-50">
              <p className="text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Properties */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Listings</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            <div className="flex flex-col divide-y divide-gray-100">
              {recentProperties.map((property) => (
                <div key={property.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  
                  {/* Property Image */}
                  <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Property Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 truncate">{property.title}</h3>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${
                        property.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                      <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                      <p className="truncate">{property.location}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                      <span className="text-indigo-600">{property.price}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <FiEye className="w-4 h-4" /> {property.views} views
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:flex-col sm:justify-center sm:pl-4 sm:border-l border-gray-100 mt-2 sm:mt-0">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip-trigger" aria-label="Edit Property">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete Property">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors sm:hidden" aria-label="More Options">
                      <FiMoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Recent Inquiries */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Inquiries</h2>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col gap-5">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex gap-4 group cursor-pointer">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FiMessageCircle className="w-5 h-5" />
                    </div>
                    {inquiry.unread && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className={`text-sm truncate ${inquiry.unread ? 'font-bold text-slate-900' : 'font-medium text-gray-700'}`}>
                        {inquiry.name}
                      </h4>
                      <span className="text-[11px] font-medium text-gray-400 shrink-0">{inquiry.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate group-hover:text-indigo-600 transition-colors">
                      Inquired about <span className="font-medium text-gray-700 group-hover:text-indigo-600">{inquiry.property}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-slate-700 transition-colors border border-transparent hover:border-gray-200">
              View All Messages
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}