import { DB_KEYS, getItem, setItem, defaultUser, initDatabase } from '../data/mockDatabase';
import { supabase } from './supabaseClient';

initDatabase();

const MOCK_DELAY = 400;

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Login with email + password.
 */
export async function login(email, password) {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }

  await delay();
  const existingUser = getItem(DB_KEYS.USER, defaultUser);
  const user = {
    ...existingUser,
    email: email || existingUser.email,
  };
  setItem(DB_KEYS.USER, user);
  return { user };
}

/**
 * Sign up with email, password, and name.
 */
export async function signup(email, password, name) {
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);
    return data;
  }

  await delay();
  const nameParts = (name || 'New User').split(' ');
  const newUser = {
    ...defaultUser,
    id: `usr_${Date.now()}`,
    firstName: nameParts[0] || 'User',
    lastName: nameParts.slice(1).join(' ') || '',
    email,
  };
  setItem(DB_KEYS.USER, newUser);
  return { user: newUser };
}

/**
 * Send password reset email.
 */
export async function forgotPassword(email) {
  if (supabase) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return;
  }

  await delay();
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  return true;
}

/**
 * Sign out current user session.
 */
export async function logout() {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
  await delay(100);
  return true;
}

/**
 * Get current authenticated user profile.
 */
export async function getCurrentUser() {
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return user;
  }
  return getItem(DB_KEYS.USER, defaultUser);
}

/**
 * Update current user profile fields.
 */
export async function updateProfile(data) {
  await delay();
  const current = getItem(DB_KEYS.USER, defaultUser);
  const updatedUser = {
    ...current,
    ...data,
  };
  setItem(DB_KEYS.USER, updatedUser);

  if (supabase) {
    const { data: result, error } = await supabase.auth.updateUser({ data });
    if (error) console.error('Supabase profile update warning:', error);
  }

  return updatedUser;
}
