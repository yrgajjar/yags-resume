import { Moon, Sun } from 'lucide-react'
import { useResumeStore } from '../../../store/resumeStore'
import type { FontKey } from '../../../types'
import { FONT_OPTIONS } from '../../../utils/fonts'
import { EditorPanel, FieldLabel } from '../fields'

const PRESETS: { name: string; primary: string; secondary: string }[] = [
  { name: 'Indigo / Cyan', primary: '#6366f1', secondary: '#06b6d4' },
  { name: 'Violet / Pink', primary: '#8b5cf6', secondary: '#ec4899' },
  { name: 'Emerald / Teal', primary: '#10b981', secondary: '#14b8a6' },
  { name: 'Orange / Rose', primary: '#f97316', secondary: '#f43f5e' },
  { name: 'Blue / Sky', primary: '#3b82f6', secondary: '#0ea5e9' },
  { name: 'Slate / Amber', primary: '#475569', secondary: '#f59e0b' },
]

export function ThemeCustomizer() {
  const theme = useResumeStore((s) => s.settings.theme)
  const patchTheme = useResumeStore((s) => s.patchTheme)

  return (
    <EditorPanel title="Theme" description="Customize colors, mode and typography. Changes preview live.">
      <div className="grid gap-8">
        {/* Presets */}
        <div>
          <FieldLabel>Color presets</FieldLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PRESETS.map((p) => {
              const active = p.primary === theme.primary && p.secondary === theme.secondary
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => patchTheme({ primary: p.primary, secondary: p.secondary })}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                    active
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-slate-200 hover:border-primary/60 dark:border-white/10'
                  }`}
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-full"
                    style={{ backgroundImage: `linear-gradient(120deg, ${p.primary}, ${p.secondary})` }}
                  />
                  <span className="text-xs font-semibold">{p.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Custom colors */}
        <div className="grid gap-5 sm:grid-cols-2">
          <ColorField
            label="Primary color"
            value={theme.primary}
            onChange={(v) => patchTheme({ primary: v })}
          />
          <ColorField
            label="Secondary color"
            value={theme.secondary}
            onChange={(v) => patchTheme({ secondary: v })}
          />
        </div>

        {/* Mode */}
        <div>
          <FieldLabel>Appearance</FieldLabel>
          <div className="inline-flex rounded-xl border border-slate-200 p-1 dark:border-white/10">
            <ModeButton
              active={theme.mode === 'light'}
              onClick={() => patchTheme({ mode: 'light' })}
              icon={<Sun className="h-4 w-4" />}
              label="Light"
            />
            <ModeButton
              active={theme.mode === 'dark'}
              onClick={() => patchTheme({ mode: 'dark' })}
              icon={<Moon className="h-4 w-4" />}
              label="Dark"
            />
          </div>
        </div>

        {/* Font */}
        <div>
          <FieldLabel>Font family</FieldLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => patchTheme({ font: f.key as FontKey })}
                style={{ fontFamily: f.stack }}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  theme.font === f.key
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-slate-200 hover:border-primary/60 dark:border-white/10'
                }`}
              >
                <span className="block text-lg font-bold">Ag</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </EditorPanel>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 p-2 dark:border-white/10 dark:bg-white/5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm uppercase outline-none focus:border-primary dark:border-white/10 dark:bg-white/5"
        />
      </div>
    </div>
  )
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        active ? 'bg-brand-gradient text-white' : 'text-slate-600 dark:text-slate-300'
      }`}
    >
      {icon} {label}
    </button>
  )
}
