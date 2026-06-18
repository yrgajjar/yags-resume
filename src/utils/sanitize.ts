import DOMPurify from 'dompurify'

/**
 * Sanitises admin-authored rich-text HTML before it is injected into the page.
 * Even though only an authenticated admin can write this content, sanitising
 * keeps the public page safe from any stored-XSS via the rich-text editor.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'a',
      'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'code', 'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
