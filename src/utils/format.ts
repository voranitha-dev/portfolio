export const formatNumber = (value: number) => Math.round(value).toLocaleString('en-US');

export const formatCompact = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}K`;
  return String(Math.round(value));
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-11-27" → "27 Nov 2026" */
export const formatIsoDate = (iso: string | null | undefined) => {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

/** Whole months between a start month (1-12) and today, inclusive of the start month. */
export const monthsSince = (year: number, month: number, now = new Date()) =>
  (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month) + 1;

/** 66 → "5 yrs 6 mos" */
export const formatTenure = (totalMonths: number) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const y = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
  const m = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';
  return [y, m].filter(Boolean).join(' ');
};
