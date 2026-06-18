import { toast } from '../store/toastStore'

/** Copies the public resume URL to the clipboard for easy sharing. */
export async function copyShareLink(): Promise<void> {
  const url = `${window.location.origin}/`
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    } else {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    toast.success('Public link copied to clipboard')
  } catch {
    toast.error('Could not copy link')
  }
}
