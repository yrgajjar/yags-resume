import { useState } from 'react'
import { Monitor, Smartphone, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ResumeView } from '../../ResumeView'

type Device = 'desktop' | 'mobile'

export function LivePreview() {
  const [device, setDevice] = useState<Device>('desktop')

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Live Preview</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Exactly what visitors see — updates as you edit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 p-1 dark:border-white/10">
            <DeviceButton active={device === 'desktop'} onClick={() => setDevice('desktop')}>
              <Monitor className="h-4 w-4" />
            </DeviceButton>
            <DeviceButton active={device === 'mobile'} onClick={() => setDevice('mobile')}>
              <Smartphone className="h-4 w-4" />
            </DeviceButton>
          </div>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-300"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-glass dark:border-white/10">
        {/* Faux browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded-md bg-white/70 px-3 py-0.5 text-xs text-slate-400 dark:bg-white/10">
            {window.location.origin}/
          </span>
        </div>

        <div className="h-[72vh] overflow-y-auto bg-slate-50 dark:bg-[#070b18]">
          <div className={device === 'mobile' ? 'mx-auto max-w-[400px]' : 'w-full'}>
            <ResumeView />
          </div>
        </div>
      </div>
    </div>
  )
}

function DeviceButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-8 w-9 items-center justify-center rounded-lg transition-colors ${
        active ? 'bg-brand-gradient text-white' : 'text-slate-500 dark:text-slate-300'
      }`}
    >
      {children}
    </button>
  )
}
