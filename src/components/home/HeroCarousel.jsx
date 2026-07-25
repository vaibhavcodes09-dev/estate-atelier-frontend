import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroImages } from "@/constants";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden h-[240px] overflow-hidden rounded-3xl lg:block">
      <AnimatePresence mode="wait">
        <motion.img
          key={heroImages[current].id}
          src={heroImages[current].image}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              current === index
                ? "w-8  bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}