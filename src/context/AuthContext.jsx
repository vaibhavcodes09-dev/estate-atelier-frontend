import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error('Failed to load user session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      setCurrentUser(result.user);
      addToast(`Welcome back, ${result.user.firstName || 'Partner'}!`, 'success');
      return result;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      throw err;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const result = await authService.signup(email, password, name);
      setCurrentUser(result.user);
      addToast('Account created successfully!', 'success');
      return result;
    } catch (err) {
      addToast(err.message || 'Signup failed', 'error');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      addToast('Signed out successfully.', 'info');
    } catch (err) {
      addToast('Logout failed', 'error');
    }
  };

  const updateProfile = async (data) => {
    try {
      const updated = await authService.updateProfile(data);
      setCurrentUser(updated);
      addToast('Profile updated successfully!', 'success');
      return updated;
    } catch (err) {
      addToast(err.message || 'Failed to update profile', 'error');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
