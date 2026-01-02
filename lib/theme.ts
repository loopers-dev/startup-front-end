/**
 * Theme utilities for managing light/dark mode
 */

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme-preference'

/**
 * Get the current theme from localStorage or system preference
 */
export function getThemePreference(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Set theme preference in localStorage
 */
export function setThemePreference(theme: ThemeMode): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return
  
  const theme = getThemePreference()
  setThemePreference(theme)
}

/**
 * Toggle between light and dark mode
 */
export function toggleTheme(): ThemeMode {
  const current = getThemePreference()
  const next = current === 'light' ? 'dark' : 'light'
  setThemePreference(next)
  return next
}

