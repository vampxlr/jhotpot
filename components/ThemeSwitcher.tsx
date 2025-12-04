'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/lib/theme';
import { Palette } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    const { applyTheme } = require('@/lib/theme');
    applyTheme(theme);
  }, [theme]);

  const themes: { name: Theme; label: string; color: string }[] = [
    { name: 'dark', label: 'Dark', color: 'bg-slate-900' },
    { name: 'light', label: 'Light', color: 'bg-white' },
    { name: 'green', label: 'Green', color: 'bg-green-900' },
    { name: 'crimson', label: 'Crimson', color: 'bg-red-900' },
  ];

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline">Theme</span>
      </button>

      <div className="absolute right-0 top-full mt-2 p-2 rounded-lg bg-card border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[160px]">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors ${
              theme === t.name ? 'bg-accent' : ''
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${t.color} border-2 border-foreground/20`} />
            <span className="text-sm font-medium">{t.label}</span>
            {theme === t.name && <span className="ml-auto text-primary">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

