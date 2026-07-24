import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "@/data";

// Property Listing — single-file implementation to match existing styling
export default function Properties() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  const [areaMin, setAreaMin] = useState(0);
  const [areaMax, setAreaMax] = useState(0);
  const [sort, setSort] = useState("newest");
  const [favorites, setFavorites] = useState(() => new Set());

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const results = useMemo(() => {
    return properties.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());

      const matchesType =
        type === "any" || p.type.toLowerCase().includes(type.toLowerCase());

      const matchesBeds = bedrooms === "any" || p.beds >= Number(bedrooms);

      const matchesBaths = bathrooms === "any" || p.baths >= Number(bathrooms);

      return matchesQuery && matchesType && matchesBeds && matchesBaths;
    });
  }, [query, type, bedrooms, bathrooms]);
  // Simple responsive helpers (Tailwind used in project)
  return (
    <div className="container-px mt-12 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-ink-900">
        Properties
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Browse available listings — use filters to refine results.
      </p>

      {/* Top search bar */}
      <div className="mt-6 sticky top-4 bg-transparent z-10">
        <div className="flex gap-3 flex-col md:flex-row items-stretch md:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search address, neighborhood or listing ID"
            className="flex-1 px-4 py-2 rounded-lg border border-ink-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            aria-label="Search properties"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-ink-200"
          >
            <option value="any">Any type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg border border-ink-200"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <button
            onClick={() => {
              setQuery("");
              setType("any");
              setMinPrice(0);
              setMaxPrice(0);
              setBedrooms("any");
              setBathrooms("any");
              setAreaMin(0);
              setAreaMax(0);
            }}
            className="px-4 py-2 bg-ink-50 rounded-lg border border-ink-200 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="md:col-span-1">
          <div className="sticky top-24 p-4 bg-white rounded-lg shadow-sm border border-ink-100">
            <h3 className="font-semibold mb-3">Filters</h3>
            <label className="block text-sm text-ink-600">Price (min)</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full mt-1 p-2 rounded border" />
            <label className="block text-sm text-ink-600 mt-2">Price (max)</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full mt-1 p-2 rounded border" />

            <div className="flex gap-2 mt-3">
              <div className="flex-1">
                <label className="block text-sm text-ink-600">Beds</label>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full p-2 rounded border">
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-ink-600">Baths</label>
                <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="w-full p-2 rounded border">
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                </select>
              </div>
            </div>

            <label className="block text-sm text-ink-600 mt-3">Area min (sqft)</label>
            <input type="number" value={areaMin} onChange={(e) => setAreaMin(Number(e.target.value))} className="w-full mt-1 p-2 rounded border" />
            <label className="block text-sm text-ink-600 mt-2">Area max (sqft)</label>
            <input type="number" value={areaMax} onChange={(e) => setAreaMax(Number(e.target.value))} className="w-full mt-1 p-2 rounded border" />
          </div>
        </aside>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
          {results.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
        {results.length > 0 && (
          <div className="mt-6 text-center">
            Showing {results.length} properties
          </div>
        )}
      </div>
    </div>
  );
}
