/**
 * Resolves static assets stored in `public/` against Vite's `BASE_URL`.
 * Ensures images, SVGs, and PDFs load reliably both at root `/` (AI Studio, Vercel)
 * and under a subpath `/portfolio/` (GitHub Pages).
 */
export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}
