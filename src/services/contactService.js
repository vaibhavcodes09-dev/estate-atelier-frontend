import { DB_KEYS, getItem, setItem, initDatabase } from '../data/mockDatabase';

initDatabase();

const MOCK_DELAY = 300;

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Submit general contact form message.
 */
export async function submitContactForm(data) {
  await delay();
  const inquiries = getItem(DB_KEYS.INQUIRIES, []);
  
  const newInquiry = {
    id: `inq_${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone || 'N/A',
    subject: data.subject || 'General Inquiry',
    message: data.message,
    type: 'Contact Form',
    date: new Date().toISOString(),
    status: 'New',
    unread: true,
  };

  setItem(DB_KEYS.INQUIRIES, [newInquiry, ...inquiries]);
  return newInquiry;
}

/**
 * Submit schedule tour inquiry for a property.
 */
export async function submitTourInquiry(propertyId, propertyTitle, data) {
  await delay();
  const inquiries = getItem(DB_KEYS.INQUIRIES, []);

  const newInquiry = {
    id: `inq_${Date.now()}`,
    propertyId: Number(propertyId),
    propertyTitle,
    name: data.name,
    email: data.email,
    phone: data.phone,
    preferredDate: data.preferredDate,
    message: data.notes || `Schedule tour request for ${data.preferredDate}`,
    type: 'Schedule Tour',
    date: new Date().toISOString(),
    status: 'New',
    unread: true,
  };

  setItem(DB_KEYS.INQUIRIES, [newInquiry, ...inquiries]);
  return newInquiry;
}

/**
 * Submit make offer inquiry for a property.
 */
export async function submitOfferInquiry(propertyId, propertyTitle, data) {
  await delay();
  const inquiries = getItem(DB_KEYS.INQUIRIES, []);

  const newInquiry = {
    id: `inq_${Date.now()}`,
    propertyId: Number(propertyId),
    propertyTitle,
    name: data.name,
    email: data.email,
    phone: data.phone,
    offerAmount: data.offerAmount,
    message: data.message || `Offer of ${data.offerAmount} submitted`,
    type: 'Make Offer',
    date: new Date().toISOString(),
    status: 'New',
    unread: true,
  };

  setItem(DB_KEYS.INQUIRIES, [newInquiry, ...inquiries]);
  return newInquiry;
}

/**
 * Get all contact & property inquiries (Admin/Dashboard use).
 */
export async function getContactSubmissions() {
  await delay(100);
  return getItem(DB_KEYS.INQUIRIES, []);
}
