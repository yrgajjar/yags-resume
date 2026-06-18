/**
 * "Download PDF" uses the browser's native print-to-PDF. Combined with the
 * @media print styles in index.css (which hide nav/buttons and neutralise dark
 * mode + glass effects), this produces a clean, paginated, vector resume PDF
 * with selectable text — far higher quality than a rasterised screenshot.
 */
export function exportPdf(): void {
  window.print()
}
