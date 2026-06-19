import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { loginApi, setAuthToken, LoginPayload } from '@/services/api';

const TOKEN_KEY = 'parktelu_token';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<string>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Storage Wrappers untuk mendukung Web ────────────────────────
const setStorageItemAsync = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage unavailable:', e);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getStorageItemAsync = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.error('Local storage unavailable:', e);
    }
    return null;
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteStorageItemAsync = async (key: string) => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Local storage unavailable:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek token yang tersimpan saat app pertama kali dibuka
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getStorageItemAsync(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
          setAuthToken(storedToken);
        }
      } catch (e) {
        console.error('Gagal membaca token:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await loginApi(payload);
    const newToken = response.data?.token;

    if (!newToken) {
      throw new Error(response.message || 'Login gagal, token tidak ditemukan.');
    }

    await setStorageItemAsync(TOKEN_KEY, newToken);
    setAuthToken(newToken);
    setToken(newToken);
    return newToken;
  };

  const logout = async () => {
    await deleteStorageItemAsync(TOKEN_KEY);
    setAuthToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}
