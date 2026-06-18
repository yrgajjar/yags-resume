import { useEffect } from 'react'
import type { ThemeSettings } from '../types'
import { hexToRgbChannels } from '../utils/color'
import { FONTS, loadGoogleFont } from '../utils/fonts'

/**
 * Applies the theme settings to the document root: CSS color variables,
 * font family, the Google font <link>, and the `dark` class. Runs whenever
 * the theme changes so the admin panel recolors the whole app live.
 */
export function useApplyTheme(theme: ThemeSettings): void {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', hexToRgbChannels(theme.primary))
    root.style.setProperty('--color-secondary', hexToRgbChannels(theme.secondary))
    root.style.setProperty('--font-sans', FONTS[theme.font]?.stack ?? FONTS.inter.stack)
    loadGoogleFont(theme.font)

    root.classList.toggle('dark', theme.mode === 'dark')
    root.style.colorScheme = theme.mode
  }, [theme.primary, theme.secondary, theme.font, theme.mode])
}
