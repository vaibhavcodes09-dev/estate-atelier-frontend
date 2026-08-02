import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// --- Dummy Data ---
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Jaswant Nagar",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "The platform made finding a home in Jaswant Nagar incredibly easy. The 100% verified listings gave me peace of mind, and the end-to-end support was exactly what I needed as a first-time buyer."
  },
  {
    id: 2,
    name: "Priya Singh",
    location: "Etawah",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "I was looking for a premium property and the expert guidance I received was unmatched. They helped negotiate a fantastic deal. Highly recommend their transparent and professional services!"
  },
  {
    id: 3,
    name: "Amit Yadav",
    location: "Saifai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "Selling my builder floor in Saifai was a breeze. The team handled everything from listing to finalizing the paperwork. Their transparent pricing model is a breath of fresh air in real estate."
  }
];

const Testimonials = () => {
  return (
    <section className="w-full py-20 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#E93946] rounded-full" />
            <span className="text-sm font-bold tracking-widest text-[#E93946] uppercase">
              Testimonials
            </span>
            <span className="h-px w-8 bg-[#E93946] rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E2248] tracking-tight max-w-2xl">
            Hear from our happy customers
          </h2>
        </motion.div>

        {/* Testimonials Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-[#FFFFFF] p-8 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Background Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-50 opacity-50 rotate-180" />

              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E93946] text-[#E93946]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#1D2433] text-[15px] leading-relaxed font-medium mb-8 relative z-10">
                  "{testimonial.review}"
                </p>
              </div>

              {/* User Info & Avatar */}
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-[15px] font-bold text-[#0E2248]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[13px] font-medium text-slate-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;