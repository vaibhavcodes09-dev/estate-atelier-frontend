import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, LayoutGrid, List, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '@/components/common/PropertyCard';
import { getProperties } from '@/services/propertyService';

const PROPERTY_TYPES = ['All', 'Villa', 'Apartment', 'House', 'Duplex', 'Builder Floor'];
const BHK_OPTIONS = ['All', '1', '2', '3', '4', '5+'];
const LOCATIONS = ['All', 'Etawah', 'Jaswant Nagar', 'Saifai', 'Bharthana', 'Sirsaganj', 'Lucknow', 'Kanpur'];

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialized from URL query params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedPurpose, setSelectedPurpose] = useState(searchParams.get('purpose') || 'All');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [maxPrice, setMaxPrice] = useState(40000000); // 4 Cr max
  const [sortBy, setSortBy] = useState('default');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state when URL params change (e.g. from Hero search or Navbar)
  useEffect(() => {
    const q = searchParams.get('q');
    const purpose = searchParams.get('purpose');
    const type = searchParams.get('type');

    if (q !== null) setSearchTerm(q);
    if (purpose !== null) setSelectedPurpose(purpose);
    if (type !== null) setSelectedType(type);
  }, [searchParams]);

  // Fetch properties from propertyService when filters or sort change
  useEffect(() => {
    let isMounted = true;

    async function fetchFilteredData() {
      setLoading(true);
      try {
        const data = await getProperties(
          {
            search: searchTerm,
            location: selectedLocation,
            type: selectedType,
            bhk: selectedBhk,
            maxPrice,
            purpose: selectedPurpose,
          },
          sortBy
        );
        if (isMounted) {
          setProperties(data);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFilteredData();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, selectedLocation, selectedType, selectedBhk, maxPrice, selectedPurpose, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPurpose('All');
    setSelectedLocation('All');
    setSelectedType('All');
    setSelectedBhk('All');
    setMaxPrice(40000000);
    setSortBy('default');
    setSearchParams({});
  };

  const formatPrice = (value) => {
    if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹ ${(value / 100000).toFixed(0)} Lacs`;
    return `₹ ${value}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Properties on SquareUp
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Browse 100% verified homes, apartments, villas, and investment spaces across top locations.
          </p>
        </div>

        {/* --- Top Search & Filter Bar --- */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-3 sticky top-24 z-30">
          
          {/* Search Input */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, landmark, location or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 font-semibold transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Purpose Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl shrink-0 overflow-x-auto w-full md:w-auto">
            {['All', 'Buy', 'Rent', 'Commercial'].map((purpose) => (
              <button
                key={purpose}
                onClick={() => setSelectedPurpose(purpose)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedPurpose.toLowerCase() === purpose.toLowerCase()
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>

          {/* Controls: Mobile Filter Toggle & Layout View */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              Filters
            </button>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Main Section: Filter Sidebar + Properties Grid --- */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* --- Sidebar Filters --- */}
          <AnimatePresence>
            {(isMobileFilterOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`${
                  isMobileFilterOpen
                    ? 'fixed inset-0 z-50 bg-slate-900/60 p-4 block overflow-y-auto'
                    : 'hidden lg:block w-full lg:w-72 shrink-0'
                }`}
              >
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 lg:sticky lg:top-28">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Listings
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    {isMobileFilterOpen && (
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="lg:hidden text-slate-500 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      City / Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl text-slate-800 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc === 'All' ? 'All Locations' : loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type Filter */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      Property Type
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            selectedType === type
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms (BHK) Filter */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      Bedrooms (BHK)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BHK_OPTIONS.map((bhk) => (
                        <button
                          key={bhk}
                          onClick={() => setSelectedBhk(bhk)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                            selectedBhk === bhk
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {bhk === 'All' ? 'Any' : bhk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Max Price Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>Max Price:</span>
                      <span className="text-indigo-600 font-extrabold">{formatPrice(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="40000000"
                      step="1000000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
                      <span>₹ 10 Lacs</span>
                      <span>₹ 4 Cr</span>
                    </div>
                  </div>

                  {isMobileFilterOpen && (
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm lg:hidden"
                    >
                      Apply Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* --- Right Content: Property Grid / List --- */}
          <div className="flex-1 w-full">
            
            {/* Header: Result count & Sort */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm font-bold text-slate-900">
                Showing <span className="text-indigo-600">{properties.length}</span> properties
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div
                className={`grid gap-6 ${
                  layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 rounded-3xl bg-white border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 flex flex-col items-center justify-center my-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-slate-900 text-xl font-bold mb-2">No matching properties found</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  We couldn't find any listings matching your search filters. Try adjusting your criteria or clearing selected filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Property Cards Grid/List */
              <div
                className={`grid gap-6 ${
                  layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {properties.map((property, idx) => (
                  <PropertyCard key={property.id} property={property} layout={layoutMode} index={idx} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
