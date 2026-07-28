import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PropertyCard from "../common/PropertyCard"; // Adjust path if necessary

// Dummy Data
const dummyProperties = [
  {
    id: 1,
    title: "Luxury Villa",
    price: "₹1.25 Cr",
    bhk: "4",
    sqft: "2,400",
    location: "Vijay Nagar, Etawah",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Modern Apartment",
    price: "₹65 Lacs",
    bhk: "3",
    sqft: "1,550",
    location: "Friends Colony, Etawah",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Independent House",
    price: "₹85 Lacs",
    bhk: "3",
    sqft: "1,800",
    location: "Bharthana, Etawah",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Premium Duplex",
    price: "₹1.50 Cr",
    bhk: "5",
    sqft: "3,200",
    location: "Jaswant Nagar, Etawah",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Cozy Builder Floor",
    price: "₹45 Lacs",
    bhk: "2",
    sqft: "1,100",
    location: "Saifai, Etawah",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const RecommendedProperties = () => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 380, // Adjust according to your card width
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -380,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full pb-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-indigo-600 rounded-full" />
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">
                Handpicked
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Popular properties
            </h2>
          </div>
        </motion.div>

        {/* Cards + Floating Navigation */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {dummyProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}

            <div className="w-4 shrink-0 sm:w-6 lg:w-8" />
          </div>

          {/* Bottom Right Navigation */}
          <div className="absolute bottom-0 right-0 flex gap-3">
            <button
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
              aria-label="Previous properties"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={scrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
              aria-label="Next properties"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProperties;
