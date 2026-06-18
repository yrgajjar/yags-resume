import type { FontKey } from '../types'

interface FontDef {
  key: FontKey
  label: string
  /** Full CSS font-family stack applied via --font-sans. */
  stack: string
  /** Google Fonts family query (the part after "family="). */
  google: string
}

export const FONTS: Record<FontKey, FontDef> = {
  inter: {
    key: 'inter',
    label: 'Inter',
    stack: "'Inter', ui-sans-serif, system-ui, sans-serif",
    google: 'Inter:wght@400;500;600;700;800',
  },
  poppins: {
    key: 'poppins',
    label: 'Poppins',
    stack: "'Poppins', ui-sans-serif, system-ui, sans-serif",
    google: 'Poppins:wght@400;500;600;700;800',
  },
  sora: {
    key: 'sora',
    label: 'Sora',
    stack: "'Sora', ui-sans-serif, system-ui, sans-serif",
    google: 'Sora:wght@400;500;600;700;800',
  },
  manrope: {
    key: 'manrope',
    label: 'Manrope',
    stack: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    google: 'Manrope:wght@400;500;600;700;800',
  },
  jakarta: {
    key: 'jakarta',
    label: 'Plus Jakarta Sans',
    stack: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    google: 'Plus+Jakarta+Sans:wght@400;500;600;700;800',
  },
}

export const FONT_OPTIONS = Object.values(FONTS)

const LINK_ID = 'yags-google-font'

/** Injects/updates a single Google Fonts <link> for the selected font. */
export function loadGoogleFont(key: FontKey): void {
  const def = FONTS[key]
  if (!def) return
  let link = document.getElementById(LINK_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = LINK_ID
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  link.href = `https://fonts.googleapis.com/css2?family=${def.google}&display=swap`
}
