#!/usr/bin/env node
/**
 * Pulls the latest Truehits.net rankings for the Nation Group brands and writes
 * them to src/data/truehitsData.json.
 *
 *   - Daily ranking   : https://truehits.net/ranking/view.php   (yesterday's data)
 *   - Monthly ranking : https://truehits.net/script/{YYYYMM}/rank0.php
 *
 * Truehits does not send CORS headers, so the browser cannot read it directly.
 * This script runs at build time (locally via `npm run truehits:update`, and on a
 * daily schedule in .github/workflows/deploy.yml) so the deployed site always
 * ships with the newest published numbers.
 *
 * Fail-soft: if Truehits is unreachable or its markup changes, the existing JSON
 * is kept and the script exits 0 so the deploy is never blocked.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = path.join(ROOT, 'src/data/truehitsData.json');
const MONTHS_TO_KEEP = 12;
const USER_AGENT = 'Mozilla/5.0 (compatible; PortfolioTruehitsSync/1.0)';

/** Brand id → domain as listed on Truehits (without "www."). */
const TRACKED_DOMAINS = {
  bangkokbiznews: 'bangkokbiznews.com',
  thansettakij: 'thansettakij.com',
  posttoday: 'posttoday.com',
  nationthailand: 'nationthailand.com',
  nationtv: 'nationtv.tv',
  komchadluek: 'komchadluek.net',
  springnews: 'springnews.co.th',
  thainews: 'thainewsonline.co',
  tnews: 'tnews.co.th',
  thepeople: 'thepeople.co',
  khobsanam: 'khobsanam.com',
};

const DOMAIN_TO_ID = Object.fromEntries(
  Object.entries(TRACKED_DOMAINS).map(([id, domain]) => [domain, id])
);

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const toNumber = (raw) => Number(String(raw).replace(/[^0-9.]/g, '')) || 0;
const stripTags = (html) => html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const normalizeDomain = (raw) => stripTags(raw).toLowerCase().replace(/^www\./, '');

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(30_000) });
  if (!res.ok) {
    const error = new Error(`HTTP ${res.status} for ${url}`);
    error.status = res.status;
    throw error;
  }
  // Truehits serves TIS-620; domains and numbers are ASCII so latin1 is safe.
  return new TextDecoder('latin1').decode(await res.arrayBuffer());
}

/** Splits an HTML table into rows of raw cell HTML. */
function parseRows(html) {
  const rows = [];
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)(?=<tr[^>]*>|<\/table>)/gi)) {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
    if (cells.length >= 5) rows.push(cells);
  }
  return rows;
}

/**
 * Daily table columns:
 * rank(TH) | domain | rank(All IPs) [+change] | IP in Thailand | Unique IPs (all) | % | Visitors in Thailand
 */
export function parseDaily(html) {
  const dateMatch = html.match(/(\d{4})\/(\d{2})\/(\d{2})/);
  const brands = {};
  for (const cells of parseRows(html)) {
    if (cells.length < 7) continue;
    const id = DOMAIN_TO_ID[normalizeDomain(cells[1])];
    if (!id || brands[id]) continue;
    brands[id] = {
      rankThailand: toNumber(stripTags(cells[0])),
      rankAll: toNumber(stripTags(cells[2]).split(' ')[0]),
      dailyUipThailand: toNumber(stripTags(cells[3])),
      dailyUipAll: toNumber(stripTags(cells[4])),
      thailandSharePct: toNumber(stripTags(cells[5])),
      dailyVisitorsThailand: toNumber(stripTags(cells[6])),
    };
  }
  return {
    date: dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : null,
    sourceUrl: 'https://truehits.net/ranking/view.php',
    brands,
  };
}

/** Monthly table columns: rank | domain | avg daily UIP | avg daily sessions | avg daily pageviews | change */
export function parseMonthly(html) {
  const brands = {};
  for (const cells of parseRows(html)) {
    const id = DOMAIN_TO_ID[normalizeDomain(cells[1])];
    if (!id || brands[id]) continue;
    brands[id] = {
      rank: toNumber(stripTags(cells[0])),
      avgDailyUip: toNumber(stripTags(cells[2])),
      avgDailySessions: toNumber(stripTags(cells[3])),
      avgDailyPageviews: toNumber(stripTags(cells[4])),
    };
  }
  return brands;
}

function monthMeta(year, monthIndex) {
  const monthKey = `${year}${String(monthIndex + 1).padStart(2, '0')}`;
  return {
    monthKey,
    monthLabel: `${MONTH_NAMES[monthIndex]} ${year}`,
    shortLabel: `${MONTH_NAMES[monthIndex]} '${String(year).slice(2)}`,
    daysInMonth: new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate(),
    sourceUrl: `https://truehits.net/script/${monthKey}/rank0.php`,
  };
}

/**
 * Guards against partial scrapes (missing rows or a markup change) shrinking the totals.
 * - Same snapshot (same date / month): merge new rows over the stored ones.
 * - New snapshot: accept only if it has at least as many brands as the stored reference
 *   (or every tracked brand when there is no reference yet).
 * Returns the brand map to store, or null to keep the previous data.
 */
function mergeSnapshot(reference, incoming, isSameSnapshot) {
  const incomingCount = Object.keys(incoming.brands).length;
  if (incomingCount === 0) return null;
  if (isSameSnapshot && reference) return { ...reference.brands, ...incoming.brands };
  const required = reference ? Object.keys(reference.brands).length : Object.keys(TRACKED_DOMAINS).length;
  return incomingCount >= required ? incoming.brands : null;
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  } catch {
    return { updatedAt: null, daily: null, monthly: [] };
  }
}

async function main() {
  const existing = readExisting();
  const result = { ...existing };
  let changed = false;

  try {
    const daily = parseDaily(await fetchHtml('https://truehits.net/ranking/view.php'));
    const merged = mergeSnapshot(existing.daily, daily, existing.daily?.date === daily.date);
    if (merged) {
      result.daily = { ...daily, brands: merged };
      changed = true;
      console.log(`✓ daily ${daily.date}: ${Object.keys(merged).length} brands`);
    } else {
      console.warn(
        `! daily ranking parsed ${Object.keys(daily.brands).length} brands (fewer than before) — keeping previous snapshot`
      );
    }
  } catch (error) {
    console.warn(`! daily ranking unavailable: ${error.message}`);
  }

  const monthlyByKey = new Map((existing.monthly ?? []).map((m) => [m.monthKey, m]));
  const now = new Date();
  // Current month is usually not published until it ends; probe it plus the previous 6 months.
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    const meta = monthMeta(date.getUTCFullYear(), date.getUTCMonth());
    try {
      const brands = parseMonthly(await fetchHtml(meta.sourceUrl));
      const sameMonth = monthlyByKey.get(meta.monthKey);
      // A brand-new month is compared against the latest stored month.
      const reference = sameMonth ?? [...monthlyByKey.values()].sort((a, b) => a.monthKey.localeCompare(b.monthKey)).at(-1);
      const merged = mergeSnapshot(reference, { brands }, Boolean(sameMonth));
      if (merged) {
        monthlyByKey.set(meta.monthKey, { ...meta, brands: merged });
        changed = true;
        console.log(`✓ monthly ${meta.monthKey}: ${Object.keys(merged).length} brands`);
      } else if (Object.keys(brands).length > 0) {
        console.warn(`! monthly ${meta.monthKey} parsed only ${Object.keys(brands).length} brands — skipped`);
      }
    } catch (error) {
      if (error.status !== 404) console.warn(`! monthly ${meta.monthKey}: ${error.message}`);
    }
  }

  if (!changed) {
    console.warn('! nothing fetched — keeping existing truehitsData.json');
    return;
  }

  result.monthly = [...monthlyByKey.values()]
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    .slice(-MONTHS_TO_KEEP);
  result.updatedAt = new Date().toISOString();

  fs.writeFileSync(OUTPUT, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`→ wrote ${path.relative(ROOT, OUTPUT)}`);
}

main().catch((error) => {
  console.warn(`! truehits sync failed: ${error.message}`);
  process.exit(0);
});
