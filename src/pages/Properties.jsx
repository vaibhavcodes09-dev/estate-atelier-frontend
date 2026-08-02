import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Heart, X } from "lucide-react";

// --- Mock Data ---
const allPropertiesData = [
  {
    id: 1,
    title: "Modern 3BHK Villa",
    priceValue: 18500000,
    price: "₹ 1.85 Cr",
    bhk: "3",
    type: "Villa",
    sqft: "2,100",
    location: "Jaswant Nagar",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    priceValue: 6500000,
    price: "₹ 65 Lacs",
    bhk: "3",
    type: "Apartment",
    sqft: "1,550",
    location: "Etawah",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Independent House",
    priceValue: 8500000,
    price: "₹ 85 Lacs",
    bhk: "3",
    type: "House",
    sqft: "1,800",
    location: "Bharthana",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Premium Duplex",
    priceValue: 15000000,
    price: "₹ 1.50 Cr",
    bhk: "5",
    type: "Duplex",
    sqft: "3,200",
    location: "Saifai",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Cozy Builder Floor",
    priceValue: 4500000,
    price: "₹ 45 Lacs",
    bhk: "2",
    type: "Builder Floor",
    sqft: "1,100",
    location: "Sirsaganj",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Highway Facing Villa",
    priceValue: 12000000,
    price: "₹ 1.20 Cr",
    bhk: "4",
    type: "Villa",
    sqft: "2,400",
    location: "Etawah",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Compact 2BHK Flat",
    priceValue: 3500000,
    price: "₹ 35 Lacs",
    bhk: "2",
    type: "Apartment",
    sqft: "900",
    location: "Jaswant Nagar",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Spacious Farmhouse",
    priceValue: 25000000,
    price: "₹ 2.50 Cr",
    bhk: "5+",
    type: "House",
    sqft: "5,000",
    location: "Saifai",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  },
];

// Extract unique filter options
const locations = [...new Set(allPropertiesData.map((p) => p.location))];
const propertyTypes = [...new Set(allPropertiesData.map((p) => p.type))];
const bhkOptions = [...new Set(allPropertiesData.map((p) => p.bhk))].sort();

const Properties = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBhk, setSelectedBhk] = useState("All");
  const [maxPrice, setMaxPrice] = useState(30000000); // Default to max 3 Cr
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // High-performance filtering using useMemo
  const filteredProperties = useMemo(() => {
    return allPropertiesData.filter((property) => {
      const matchSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLocation =
        selectedLocation === "All" || property.location === selectedLocation;
      const matchType =
        selectedType === "All" || property.type === selectedType;
      const matchBhk = selectedBhk === "All" || property.bhk === selectedBhk;
      const matchPrice = property.priceValue <= maxPrice;

      return (
        matchSearch && matchLocation && matchType && matchBhk && matchPrice
      );
    });
  }, [searchTerm, selectedLocation, selectedType, selectedBhk, maxPrice]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedType("All");
    setSelectedBhk("All");
    setMaxPrice(30000000);
  };

  // Format price for slider display
  const formatPrice = (value) => {
    if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹ ${(value / 100000).toFixed(0)} Lacs`;
    return `₹ ${value}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 mt-10 pt-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Top Search Bar --- */}
        <div className="bg-[#FFFFFF] p-4 rounded-[20px] shadow-sm border border-gray-100 mb-8 flex items-center justify-between gap-4 sticky top-4 z-30">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by property title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border-none rounded-[14px] text-[#1D2433] placeholder-slate-400 focus:ring-2 focus:ring-[#0E2248]/20 focus:outline-none transition-shadow"
            />
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center justify-center p-3 bg-[#F8FAFC] text-[#0E2248] rounded-[14px] hover:bg-slate-100 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* --- Left Sidebar (Filters) --- */}
          {/* Mobile Filter Overlay & Animation */}
          <AnimatePresence>
            {(isMobileFilterOpen ||
              (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`${isMobileFilterOpen ? "fixed inset-0 z-50 bg-black/50 p-4 block" : "hidden"} lg:block lg:relative lg:bg-transparent lg:p-0 lg:z-auto w-full lg:w-[320px] shrink-0`}
              >
                <div className="bg-[#FFFFFF] rounded-[24px] p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24 h-full lg:h-auto overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[18px] font-bold text-[#0E2248] flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" /> Filters
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-[13px] font-semibold text-[#E93946] hover:underline"
                    >
                      Clear All
                    </button>
                    {isMobileFilterOpen && (
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="lg:hidden text-slate-500"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    )}
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-[14px] font-bold text-[#1D2433] mb-3">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 bg-[#F8FAFC] rounded-[12px] text-slate-600 border border-transparent focus:border-[#0E2248]/20 focus:outline-none focus:ring-0 text-[14px]"
                    >
                      <option value="All">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type Filter */}
                  <div className="mb-6">
                    <label className="block text-[14px] font-bold text-[#1D2433] mb-3">
                      Property Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["All", ...propertyTypes].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`px-4 py-2 rounded-[10px] text-[13px] font-medium transition-colors ${
                            selectedType === type
                              ? "bg-[#0E2248] text-white"
                              : "bg-[#F8FAFC] text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BHK Filter */}
                  <div className="mb-6">
                    <label className="block text-[14px] font-bold text-[#1D2433] mb-3">
                      BHK Options
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["All", ...bhkOptions].map((bhk) => (
                        <button
                          key={bhk}
                          onClick={() => setSelectedBhk(bhk)}
                          className={`px-4 py-2 rounded-[10px] text-[13px] font-medium transition-colors ${
                            selectedBhk === bhk
                              ? "bg-[#0E2248] text-white"
                              : "bg-[#F8FAFC] text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {bhk === "All" ? "Any" : `${bhk} BHK`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Slider */}
                  <div className="mb-2">
                    <label className="block text-[14px] font-bold text-[#1D2433] mb-3">
                      Max Price:{" "}
                      <span className="text-[#E93946]">
                        {formatPrice(maxPrice)}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1000000"
                      max="30000000"
                      step="500000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#E93946] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[12px] text-slate-400 mt-2 font-medium">
                      <span>₹ 10L</span>
                      <span>₹ 3Cr</span>
                    </div>
                  </div>

                  {isMobileFilterOpen && (
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full mt-6 bg-[#E93946] text-white py-3 rounded-[12px] font-bold lg:hidden"
                    >
                      Apply Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* --- Right Content (Properties Grid) --- */}
          <div className="flex-1 w-full">
            {/* Results Counter */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#0E2248]">
                Properties for Sale
                <span className="text-slate-400 text-sm ml-2 font-medium">
                  ({filteredProperties.length} results)
                </span>
              </h2>
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="bg-[#FFFFFF] rounded-[24px] p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
                <Search className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-[#0E2248] text-xl font-bold mb-2">
                  No properties found
                </h3>
                <p className="text-slate-500 text-[15px]">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-[#0E2248] text-white px-6 py-2.5 rounded-[12px] font-semibold hover:bg-[#1D2433] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Grid Layout: 2 Columns on Desktop, 1 on Mobile/Tablet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative w-full bg-[#FFFFFF] rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Top Half: Image Container */}
                    <div className="relative h-[220px] w-full overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute top-4 left-4">
                        <span className="bg-[#FFFFFF] text-[#0E2248] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                          For Sale
                        </span>
                      </div>

                      <button className="absolute top-4 right-4 text-white hover:text-[#E93946] transition-colors drop-shadow-md">
                        <Heart className="w-5 h-5 stroke-2" />
                      </button>
                    </div>

                    {/* Bottom Half: Details */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[17px] font-bold text-[#1D2433] mb-1 tracking-tight truncate">
                        {property.title}
                      </h3>

                      <div className="flex items-center text-[13px] font-medium text-slate-500 mb-4 gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {property.location}
                      </div>

                      {/* Spacer to push pricing to bottom if title is short */}
                      <div className="flex-1"></div>

                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-4 bg-[#F8FAFC] p-2 rounded-lg justify-around">
                        <span>{property.bhk} BHK</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{property.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{property.sqft} sq.ft</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                        <span className="text-[20px] font-bold text-[#0E2248]">
                          {property.price}
                        </span>
                        <a
                          href={`/properties/${property.id}`}
                          className="text-[14px] font-bold text-[#E93946] hover:underline"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
