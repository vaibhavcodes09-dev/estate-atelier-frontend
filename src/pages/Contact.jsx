import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiUser, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle,
  FiClock,
  FiArrowRight
} from 'react-icons/fi';

// Form Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit number.').optional().or(z.literal('')),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(15, 'Message must be at least 15 characters.'),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Contact Data:', data);
    setIsSubmitting(false);
    setSuccess(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const contactDetails = [
    {
      icon: FiMapPin,
      title: 'Our Headquarters',
      content: '123 Business Avenue, Block C, Vijay Nagar, Etawah, UP 206001',
      linkText: 'Get Directions'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'support@squareupproperties.com\npartners@squareupproperties.com',
      linkText: 'Send an Email'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      content: '+91 98765 43210\nMon - Sat, 9:00 AM to 6:00 PM',
      linkText: 'Call Now'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold tracking-widest uppercase mb-6">
            <FiMessageSquare className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Let's start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">conversation.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Whether you're looking to buy, sell, or just need expert advice on the Etawah real estate market, our team is here to help.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16"
      >
        
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {contactDetails.map((detail, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <detail.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{detail.title}</h3>
              <p className="text-gray-500 whitespace-pre-line leading-relaxed mb-6">
                {detail.content}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group-hover:gap-3 transition-all">
                {detail.linkText}
                <FiArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Contact Form */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-3 bg-white p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-fit"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
            <p className="text-gray-500 mt-2">Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            
            <AnimatePresence mode="wait">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl overflow-hidden"
                >
                  <FiCheckCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                    <p className="text-xs mt-0.5">Thank you for reaching out. We will contact you shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name')}
                    className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                      errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                      errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>}
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
                  <input
                    type="tel"
                    placeholder="Optional"
                    {...register('phone')}
                    className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                      errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone.message}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiMessageSquare className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.subject ? 'text-red-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="How can we help?"
                    {...register('subject')}
                    className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                      errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.subject && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.subject.message}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
              <textarea
                rows="5"
                placeholder="Tell us more about your requirements..."
                {...register('message')}
                className={`w-full bg-gray-50 p-4 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white resize-none ${
                  errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                }`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0066FF] hover:bg-[#0055D4] text-white py-4 rounded-xl text-[15px] font-bold transition-all duration-300 shadow-[0_8px_20px_rgb(0,102,255,0.25)] hover:shadow-[0_8px_25px_rgb(0,102,255,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 group mt-4"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Send Message
                  <FiSend className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

          </form>
        </motion.div>

      </motion.div>
    </div>
  );
}