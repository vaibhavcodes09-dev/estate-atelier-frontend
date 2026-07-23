import { supabase } from './supabaseClient';

// authService.js — authentication service backed by Supabase Auth.
// When Supabase env vars are not configured, functions resolve with
// mock data so the UI remains functional during frontend development.

const MOCK_DELAY = 800;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Login with email + password.
 * @returns {Promise<{ user: object }>}
 */
export async function login(email, password) {
  if (!supabase) {
    await delay(MOCK_DELAY);
    return { user: { id: 'mock-user', email } };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Sign up with email, password, and name.
 * @returns {Promise<{ user: object }>}
 */
export async function signup(email, password, name) {
  if (!supabase) {
    await delay(MOCK_DELAY);
    return { user: { id: 'mock-user', email, userMetadata: { name } } };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Send a password reset email.
 * @returns {Promise<void>}
 */
export async function forgotPassword(email) {
  if (!supabase) {
    await delay(MOCK_DELAY);
    return;
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

/**
 * Sign out the current session.
 * @returns {Promise<void>}
 */
export async function logout() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

/**
 * Get the currently authenticated user.
 * @returns {Promise<object|null>}
 */
export async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Update the current user's profile metadata.
 * @param {object} data — fields to merge into user_metadata
 * @returns {Promise<object>}
 */
export async function updateProfile(data) {
  if (!supabase) {
    await delay(MOCK_DELAY);
    return { userMetadata: data };
  }
  const { data: result, error } = await supabase.auth.updateUser({ data });
  if (error) throw new Error(error.message);
  return result;
}

/**
 * Subscribe to auth state changes.
 * @param {(user: object|null) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onAuthChange(callback) {
  if (!supabase) return () => {};
  const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
}
