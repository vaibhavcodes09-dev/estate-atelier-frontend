import { propertiesData as initialProperties, testimonials, features, locations } from './dummydata';

const DB_KEYS = {
  PROPERTIES: 'squareup_db_properties',
  WISHLIST: 'squareup_db_wishlist',
  USER: 'squareup_db_user',
  INQUIRIES: 'squareup_db_inquiries',
};

// Default Current User
export const defaultUser = {
  id: 'usr_101',
  firstName: 'Vikram',
  lastName: 'Singh',
  email: 'vikram.singh@squareup.com',
  phone: '9876543210',
  location: 'Etawah, UP',
  role: 'Senior Real Estate Partner',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
  bio: 'Senior property consultant specializing in luxury residential villas and commercial investments in Etawah, Jaswant Nagar, and Saifai.',
  joinDate: 'March 2023',
};

// Default Inquiries
export const defaultInquiries = [
  {
    id: 'inq_1',
    propertyId: 1,
    propertyTitle: 'Modern 3BHK Villa with Pool',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9812345678',
    message: 'I am interested in scheduling a site visit for this villa this Saturday morning.',
    type: 'Schedule Tour',
    date: '2026-08-08T10:30:00Z',
    status: 'New',
    unread: true,
  },
  {
    id: 'inq_2',
    propertyId: 2,
    propertyTitle: 'Luxury Apartment in Friends Colony',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    phone: '9876512345',
    message: 'What is the negotiable final price and maintenance fee for this 3BHK unit?',
    type: 'Make Offer',
    offerAmount: '₹62 Lacs',
    date: '2026-08-07T14:15:00Z',
    status: 'Replied',
    unread: false,
  },
  {
    id: 'inq_3',
    propertyId: 4,
    propertyTitle: 'Premium 5BHK Duplex',
    name: 'Amit Yadav',
    email: 'amit.yadav@example.com',
    phone: '9988776655',
    message: 'Requesting layout plans and floor specifications for the duplex.',
    type: 'General Inquiry',
    date: '2026-08-05T09:00:00Z',
    status: 'In Progress',
    unread: false,
  },
];

// Helper to safely get from LocalStorage
function getItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
}

// Helper to safely set in LocalStorage
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

// Initialize LocalStorage with seed data if not present
export function initDatabase() {
  if (!localStorage.getItem(DB_KEYS.PROPERTIES)) {
    setItem(DB_KEYS.PROPERTIES, initialProperties);
  }
  if (!localStorage.getItem(DB_KEYS.WISHLIST)) {
    setItem(DB_KEYS.WISHLIST, [1, 2, 4]); // Initial wishlisted IDs
  }
  if (!localStorage.getItem(DB_KEYS.USER)) {
    setItem(DB_KEYS.USER, defaultUser);
  }
  if (!localStorage.getItem(DB_KEYS.INQUIRIES)) {
    setItem(DB_KEYS.INQUIRIES, defaultInquiries);
  }
}

export { DB_KEYS, getItem, setItem };
