/**
 * Design tokens. Monochrome (black / white) by design: colour is reserved for things that
 * reference a real brand (logos, per-brand chart bars, mind-map links) and status signals.
 * Colors resolve to CSS custom properties so light / dark mode
 * switches with a single `data-theme` attribute on <html> (no re-render needed).
 */
export const color = {
  bg: 'var(--c-bg)',
  bgElev: 'var(--c-bg-elev)',
  bgSoft: 'var(--c-bg-soft)',
  bgInverse: 'var(--c-bg-inverse)',
  line: 'var(--c-line)',
  lineStrong: 'var(--c-line-strong)',
  text: 'var(--c-text)',
  text2: 'var(--c-text-2)',
  text3: 'var(--c-text-3)',
  textInverse: 'var(--c-text-inverse)',
  accent: 'var(--c-accent)',
  accentSoft: 'var(--c-accent-soft)',
  /** Text/icon colour on top of accent backgrounds (white in light mode, black in dark). */
  onAccent: 'var(--c-on-accent)',
  violet: 'var(--c-violet)',
  cyan: 'var(--c-cyan)',
  success: 'var(--c-success)',
  warning: 'var(--c-warning)',
  danger: 'var(--c-danger)',
  glow: 'var(--c-glow)',
} as const;

export const gradient = {
  brand: 'linear-gradient(120deg, var(--c-accent) 0%, var(--c-violet) 55%, var(--c-cyan) 100%)',
  brandSoft:
    'linear-gradient(120deg, color-mix(in srgb, var(--c-accent) 14%, transparent), color-mix(in srgb, var(--c-violet) 12%, transparent))',
} as const;

export const font = {
  display: '"Plus Jakarta Sans", "IBM Plex Sans Thai", ui-sans-serif, system-ui, sans-serif',
  body: '"Inter", "IBM Plex Sans Thai", ui-sans-serif, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '18px',
  xl: '26px',
  pill: '999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 1px rgba(15, 23, 42, 0.04)',
  md: '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
  lg: '0 30px 60px -24px rgba(15, 23, 42, 0.30)',
  glow: '0 0 0 1px color-mix(in srgb, var(--c-accent) 30%, transparent), 0 18px 50px -18px var(--c-glow)',
} as const;

export const ease = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export const mq = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  belowLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const;

/** Raw values for the two palettes, written into :root by globalStyles. */
export const palettes = {
  light: {
    '--c-bg': '#FAFAFA',
    '--c-bg-elev': '#FFFFFF',
    '--c-bg-soft': '#F4F4F5',
    '--c-bg-inverse': '#0A0A0A',
    '--c-line': '#E4E4E7',
    '--c-line-strong': '#D4D4D8',
    '--c-text': '#0A0A0A',
    '--c-text-2': '#3F3F46',
    '--c-text-3': '#71717A',
    '--c-text-inverse': '#FAFAFA',
    '--c-accent': '#0A0A0A',
    '--c-accent-soft': '#F4F4F5',
    '--c-on-accent': '#FFFFFF',
    '--c-violet': '#3F3F46',
    '--c-cyan': '#71717A',
    '--c-success': '#16A34A',
    '--c-warning': '#D97706',
    '--c-danger': '#DC2626',
    '--c-glow': 'rgba(10, 10, 10, 0.16)',
  },
  dark: {
    '--c-bg': '#0A0A0A',
    '--c-bg-elev': '#141414',
    '--c-bg-soft': '#1C1C1C',
    '--c-bg-inverse': '#FAFAFA',
    '--c-line': '#262626',
    '--c-line-strong': '#3A3A3A',
    '--c-text': '#FAFAFA',
    '--c-text-2': '#C7C7C7',
    '--c-text-3': '#8A8A8A',
    '--c-text-inverse': '#0A0A0A',
    '--c-accent': '#FAFAFA',
    '--c-accent-soft': '#262626',
    '--c-on-accent': '#0A0A0A',
    '--c-violet': '#D4D4D4',
    '--c-cyan': '#9A9A9A',
    '--c-success': '#4ADE80',
    '--c-warning': '#FBBF24',
    '--c-danger': '#F87171',
    '--c-glow': 'rgba(255, 255, 255, 0.14)',
  },
} as const;
