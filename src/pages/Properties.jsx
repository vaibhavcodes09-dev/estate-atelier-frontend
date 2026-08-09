import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, LayoutGrid, List, RotateCcw, Filter, Check } from 'lucide-react';
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

  // Sync state when URL params change
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

  // Count active filters (excluding defaults)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim() !== '') count++;
    if (selectedPurpose !== 'All') count++;
    if (selectedLocation !== 'All') count++;
    if (selectedType !== 'All') count++;
    if (selectedBhk !== 'All') count++;
    if (maxPrice < 40000000) count++;
    return count;
  }, [searchTerm, selectedPurpose, selectedLocation, selectedType, selectedBhk, maxPrice]);

  const formatPrice = (value) => {
    if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹ ${(value / 100000).toFixed(0)} Lacs`;
    return `₹ ${value}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 lg:pb-20 pt-20 lg:pt-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Title Header */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Properties on SquareUp
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Browse 100% verified homes, apartments, villas, and investment spaces across top locations.
          </p>
        </div>

        {/* --- MOBILE COMPACT SEARCH SECTION (Space-efficient, Property Listings appear much higher) --- */}
        <div className="lg:hidden mb-4">
          <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-7 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button with Badge Counter */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                activeFilterCount > 0
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-white text-indigo-600 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

          </div>

          {/* Compact Active Filter Chips Row on Mobile */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-1">
              {selectedPurpose !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold shrink-0">
                  {selectedPurpose}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPurpose('All')} />
                </span>
              )}
              {selectedLocation !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold shrink-0">
                  {selectedLocation}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('All')} />
                </span>
              )}
              {selectedType !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold shrink-0">
                  {selectedType}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('All')} />
                </span>
              )}
              {selectedBhk !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold shrink-0">
                  {selectedBhk} BHK
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBhk('All')} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-500 hover:underline shrink-0 ml-1"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* --- DESKTOP TOP SEARCH BAR --- */}
        <div className="hidden lg:flex bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 mb-8 items-center justify-between gap-3 sticky top-24 z-30">
          
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
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl shrink-0">
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

          {/* Layout Mode Switches */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
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

        {/* --- Main Section: Filter Sidebar + Properties Grid --- */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* --- Desktop Sidebar Filters --- */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 sticky top-28">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Listings
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
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

            </div>
          </aside>

          {/* --- Right Content: Property Grid / List --- */}
          <div className="flex-1 w-full">
            
            {/* Header: Result count & Sort */}
            <div className="mb-4 sm:mb-6 flex flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Showing <span className="text-indigo-600">{properties.length}</span> properties
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
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
                className={`grid gap-4 sm:gap-6 ${
                  layoutMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 sm:h-96 rounded-3xl bg-white border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 flex flex-col items-center justify-center my-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-slate-900 text-lg font-bold mb-1">No matching properties found</h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto mb-6">
                  We couldn't find any listings matching your search criteria. Try clearing selected filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Property Cards Grid/List */
              <div
                className={`grid gap-4 sm:gap-6 ${
                  layoutMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
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

      {/* --- MOBILE FILTER BOTTOM SHEET DRAWER MODAL --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[9995] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm lg:hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl p-6 w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t border-slate-100"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Listings
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Purpose Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Purpose</label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl">
                  {['All', 'Buy', 'Rent', 'Commercial'].map((purpose) => (
                    <button
                      key={purpose}
                      onClick={() => setSelectedPurpose(purpose)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedPurpose.toLowerCase() === purpose.toLowerCase()
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-600'
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Location Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">City / Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl text-slate-800 border border-slate-200 text-sm font-semibold focus:outline-none"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Property Type Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Property Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        selectedType === type
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Bedrooms (BHK) Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bedrooms (BHK)</label>
                <div className="flex flex-wrap gap-1.5">
                  {BHK_OPTIONS.map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBhk(bhk)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold border flex items-center justify-center ${
                        selectedBhk === bhk
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {bhk === 'All' ? 'Any' : bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Max Price Slider */}
              <div className="mb-6">
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
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md"
              >
                Apply Filters ({properties.length} Results)
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
