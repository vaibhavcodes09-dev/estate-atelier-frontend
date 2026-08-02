import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-[#0E2248] rounded-[32px] p-10 sm:p-16 lg:p-20 overflow-hidden flex flex-col items-center text-center shadow-2xl"
        >
          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#E93946] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E93946] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 translate-x-1/3 translate-y-1/3" />

          {/* Content */}
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl">
            Ready to find your dream property?
          </h2>
          
          <p className="relative z-10 text-slate-300 text-[16px] sm:text-lg font-medium leading-relaxed mb-10 max-w-2xl">
            Join thousands of happy homeowners. Whether you are looking for a modern villa in Jaswant Nagar, an apartment in Saifai, or a commercial space in Etawah, our experts are here to help.
          </p>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="/all-properties"
              className="flex items-center justify-center gap-2 bg-[#E93946] text-white px-8 py-4 rounded-[16px] font-bold text-[15px] hover:bg-[#d6333f] hover:scale-105 transition-all duration-300 shadow-[0_4px_14px_rgba(233,57,70,0.4)] group"
            >
              Explore Properties
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="/contact"
              className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-[16px] font-bold text-[15px] hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
            >
              <PhoneCall className="w-5 h-5" />
              Contact an Agent
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;