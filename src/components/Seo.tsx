import { Helmet } from 'react-helmet-async'
import type { ResumeData } from '../types'

/** Drives document title + meta tags from the live resume data for SEO/social. */
export function Seo({ resume }: { resume: ResumeData }) {
  const { name, role, tagline } = resume.hero
  const title = `${name} — ${role}`
  const description = tagline || `${name}'s professional digital resume.`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={name} />

      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name,
          jobTitle: role,
          description,
          email: resume.contact.email || undefined,
          telephone: resume.contact.phone || undefined,
          sameAs: [resume.contact.linkedin, resume.contact.github, resume.contact.website].filter(
            Boolean,
          ),
        })}
      </script>
    </Helmet>
  )
}
