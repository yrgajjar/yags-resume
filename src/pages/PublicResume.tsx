import { useResumeStore } from '../store/resumeStore'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ResumeView } from '../components/ResumeView'
import { Seo } from '../components/Seo'
import { LoadingScreen } from '../components/ui/LoadingScreen'

export function PublicResume() {
  const status = useResumeStore((s) => s.status)
  const resume = useResumeStore((s) => s.resume)

  if (status === 'loading' || status === 'idle') {
    return <LoadingScreen label="Loading resume…" />
  }

  return (
    <div className="relative min-h-screen">
      <Seo resume={resume} />
      <Navbar />
      <main>
        <ResumeView />
      </main>
      <Footer />
    </div>
  )
}
