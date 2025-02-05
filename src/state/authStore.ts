import { create } from 'zustand';
import type { DeliveryPartner } from '../types/auth';

interface AuthState {
  user: DeliveryPartner | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: DeliveryPartner, tokens: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setAuth: (user, tokens) => set({
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    isAuthenticated: true
  }),
  clearAuth: () => set({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
  })
})); 