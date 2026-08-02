import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  UserCheck,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Listings",
    description: "100% Verified Properties",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Expert Guidance",
    description: "Professional support at every step",
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Best Deals",
    description: "Transparent pricing and best discounts",
    icon: ClipboardList,
  },
  {
    id: 4,
    title: "End to End Support",
    description: "We are with you always",
    icon: ShieldCheck,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-4 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#F8FAFC] rounded-[32px] px-8 py-6 lg:p-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-8 shadow-sm border border-slate-100"
        >
          {/* Left Text Column */}
          <div className="w-full lg:w-1/4 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-[#0E2248] font-bold text-sm sm:text-base uppercase tracking-wider mb-3">
              Why Choose Us?
            </h2>
            <p className="text-[#1D2433] text-lg sm:text-xl font-medium leading-snug">
              We make real estate simple and transparent.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FFFFFF] rounded-[24px] p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-shadow duration-300"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-[16px] bg-[#F8FAFC] flex items-center justify-center mb-5">
                  <feature.icon className="w-8 h-8 text-[#0E2248] stroke-[1.5]" />
                </div>

                {/* Feature Text */}
                <h3 className="text-[15px] font-bold text-[#0E2248] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed px-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
