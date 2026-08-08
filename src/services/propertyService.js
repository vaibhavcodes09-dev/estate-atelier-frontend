import { DB_KEYS, getItem, setItem, initDatabase } from '../data/mockDatabase';

initDatabase();

const MOCK_DELAY = 150;

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all properties from LocalStorage with support for filters, search, and sorting.
 */
export async function getProperties(filters = {}, sortBy = 'default') {
  await delay();
  let properties = getItem(DB_KEYS.PROPERTIES, []);

  const { search, location, type, bhk, minPrice, maxPrice, status, purpose } = filters;

  // 1. Keyword search (title, location, description)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q)
    );
  }

  // 2. Location filter
  if (location && location !== 'All') {
    properties = properties.filter((p) =>
      p.location?.toLowerCase().includes(location.toLowerCase())
    );
  }

  // 3. Type filter
  if (type && type !== 'All') {
    properties = properties.filter((p) => p.type === type);
  }

  // 4. BHK filter
  if (bhk && bhk !== 'All') {
    properties = properties.filter((p) => {
      if (bhk === '5+') return p.bhk >= 5;
      return String(p.bhk) === String(bhk);
    });
  }

  // 5. Price filter
  if (maxPrice) {
    properties = properties.filter((p) => p.priceValue <= Number(maxPrice));
  }
  if (minPrice) {
    properties = properties.filter((p) => p.priceValue >= Number(minPrice));
  }

  // 6. Status / Purpose filter (For Sale, For Rent)
  if (status && status !== 'All') {
    properties = properties.filter(
      (p) => p.status?.toLowerCase() === status.toLowerCase()
    );
  }
  if (purpose && purpose !== 'All') {
    const pLower = purpose.toLowerCase();
    if (pLower === 'buy' || pLower === 'for sale') {
      properties = properties.filter((p) => p.status === 'For Sale');
    } else if (pLower === 'rent' || pLower === 'for rent') {
      properties = properties.filter((p) => p.status === 'For Rent');
    } else if (pLower === 'commercial') {
      properties = properties.filter((p) => p.type === 'Commercial' || p.type === 'Builder Floor');
    } else if (pLower === 'plots/land' || pLower === 'plot') {
      properties = properties.filter((p) => p.type === 'Plot' || p.type === 'House');
    }
  }

  // 7. Sorting
  if (sortBy === 'price-low-high') {
    properties.sort((a, b) => a.priceValue - b.priceValue);
  } else if (sortBy === 'price-high-low') {
    properties.sort((a, b) => b.priceValue - a.priceValue);
  } else if (sortBy === 'newest') {
    properties.sort((a, b) => b.id - a.id);
  }

  return properties;
}

/**
 * Fetch a single property by ID.
 */
export async function getPropertyById(id) {
  await delay();
  const properties = getItem(DB_KEYS.PROPERTIES, []);
  const numericId = Number(id);
  return properties.find((p) => p.id === numericId) || null;
}

/**
 * Create a new property listing and save to LocalStorage.
 */
export async function createProperty(data) {
  await delay(300);
  const properties = getItem(DB_KEYS.PROPERTIES, []);

  const newId = properties.length > 0 ? Math.max(...properties.map((p) => p.id)) + 1 : 1;
  const priceVal = Number(data.price) || 5000000;
  
  // Format price display
  let priceStr = `₹ ${priceVal}`;
  if (priceVal >= 10000000) {
    priceStr = `₹ ${(priceVal / 10000000).toFixed(2)} Cr`;
  } else if (priceVal >= 100000) {
    priceStr = `₹ ${(priceVal / 100000).toFixed(0)} Lacs`;
  }

  const defaultImage = data.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const newProperty = {
    id: newId,
    title: data.title || 'Untitled Property',
    priceValue: priceVal,
    price: priceStr,
    location: data.address ? `${data.address}, ${data.city || 'Etawah'}, UP` : `${data.city || 'Etawah'}, UP`,
    status: data.status || 'For Sale',
    type: data.type || 'Villa',
    bhk: Number(data.bhk) || 3,
    baths: Number(data.bathrooms) || 2,
    sqft: String(data.area || '1,500'),
    yearBuilt: String(new Date().getFullYear()),
    description: data.description || 'Newly listed property on SquareUp with premium features.',
    image: defaultImage,
    images: [defaultImage, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    amenities: data.amenities || ['24/7 Security', 'Car Parking', 'Power Backup'],
    agent: {
      name: 'Vikram Singh',
      role: 'Senior Real Estate Partner',
      phone: '+91 98765 43210',
      email: 'vikram.singh@squareup.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
  };

  const updatedProperties = [newProperty, ...properties];
  setItem(DB_KEYS.PROPERTIES, updatedProperties);
  return newProperty;
}

/**
 * Update an existing property by ID.
 */
export async function updateProperty(id, data) {
  await delay(300);
  const properties = getItem(DB_KEYS.PROPERTIES, []);
  const numericId = Number(id);
  const index = properties.findIndex((p) => p.id === numericId);

  if (index === -1) {
    throw new Error('Property not found');
  }

  const existing = properties[index];
  const priceVal = data.price ? Number(data.price) : existing.priceValue;

  let priceStr = existing.price;
  if (data.price) {
    if (priceVal >= 10000000) {
      priceStr = `₹ ${(priceVal / 10000000).toFixed(2)} Cr`;
    } else if (priceVal >= 100000) {
      priceStr = `₹ ${(priceVal / 100000).toFixed(0)} Lacs`;
    } else {
      priceStr = `₹ ${priceVal}`;
    }
  }

  const updatedProperty = {
    ...existing,
    title: data.title || existing.title,
    priceValue: priceVal,
    price: priceStr,
    status: data.status || existing.status,
    type: data.type || existing.type,
    bhk: data.bhk ? Number(data.bhk) : existing.bhk,
    baths: data.bathrooms ? Number(data.bathrooms) : existing.baths,
    sqft: data.area ? String(data.area) : existing.sqft,
    location: data.address && data.city ? `${data.address}, ${data.city}, UP` : (data.location || existing.location),
    description: data.description || existing.description,
    amenities: data.amenities || existing.amenities,
    image: data.image || existing.image,
  };

  properties[index] = updatedProperty;
  setItem(DB_KEYS.PROPERTIES, properties);
  return updatedProperty;
}

/**
 * Delete a property by ID.
 */
export async function deleteProperty(id) {
  await delay(200);
  const properties = getItem(DB_KEYS.PROPERTIES, []);
  const numericId = Number(id);
  const filtered = properties.filter((p) => p.id !== numericId);
  setItem(DB_KEYS.PROPERTIES, filtered);
  return true;
}

/**
 * Get featured or recommended properties for Home page.
 */
export async function getFeaturedProperties(limit = 4) {
  await delay(100);
  const properties = getItem(DB_KEYS.PROPERTIES, []);
  return properties.slice(0, limit);
}
