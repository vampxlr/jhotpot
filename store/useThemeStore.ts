import { create } from 'zustand';
import { Theme, applyTheme } from '@/lib/theme';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-storage', theme);
    }
    applyTheme(theme);
    set({ theme });
  },
}));

// Initialize theme from localStorage on client side
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme-storage') as Theme | null;
  if (savedTheme && ['dark', 'light', 'green', 'crimson'].includes(savedTheme)) {
    useThemeStore.getState().setTheme(savedTheme);
  }
}

