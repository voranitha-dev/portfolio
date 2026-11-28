import styled from '@emotion/styled';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { NATION_BRAND_PLATFORMS, type NationBrandPlatform } from '../data/portfolioData';
import { NETWORK_DAILY, TRUEHITS, TRUEHITS_RANKING_URL } from '../data/truehits';
import { useCountUp } from '../hooks/useCountUp';
import { assetUrl } from '../utils/assetUrl';
import { formatCompact, formatIsoDate } from '../utils/format';
import { invertLogoOnDark, noTransient } from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';

/*
 * Bento grid of the Nation Group brands.
 * Desktop (4 columns): an inverted "hub" tile (2×2), the largest brand as a wide tile,
 * then one tile per brand. Brand colour only appears where it refers to that brand:
 * the share bar, each sparkline and the hover glow.
 */

const BRANDS = NATION_BRAND_PLATFORMS; // ordered by traffic, largest first
const FEATURED_ID = BRANDS[0].id;

const dailyOf = (id: string) => TRUEHITS.daily?.brands[id];

/* ------------------------------------------------------------------ */
/* Styles                                                               */
/* ------------------------------------------------------------------ */

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  ${mq.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${mq.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: minmax(196px, auto);
    gap: 14px;
  }
`;

const HubCell = styled(motion.li)`
  grid-column: 1 / -1;

  ${mq.lg} {
    grid-column: span 2;
    grid-row: span 2;
  }
`;

const Hub = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  align-content: space-between;
  gap: 28px;
  padding: 26px;
  border-radius: ${radius.xl};
  color: ${color.bg};
  background: ${color.text};
  overflow: hidden;
  isolation: isolate;

  /* faint dot texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(color-mix(in srgb, var(--c-bg) 22%, transparent) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: linear-gradient(160deg, #000 10%, transparent 70%);
  }

  ${mq.lg} {
    padding: 32px;
  }
`;

const HubTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  img {
    height: 34px;
    width: auto;
    padding: 7px 11px;
    border-radius: 10px;
    background: #fff;
  }
  span {
    font-family: ${font.mono};
    font-size: 11.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
  }
`;

const HubTitle = styled.p`
  font-family: ${font.display};
  font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.2rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  max-width: 18ch;

  em {
    font-style: normal;
    opacity: 0.55;
  }
`;

const ShareBlock = styled.div`
  display: grid;
  gap: 10px;
`;

const ShareLabel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 10px;
  white-space: nowrap;
  font-family: ${font.mono};
  font-size: 11.5px;
  opacity: 0.65;

  a:hover {
    text-decoration: underline;
  }
`;

const ShareBar = styled.div`
  display: flex;
  gap: 3px;
  height: 14px;
`;

const ShareSegment = styled(motion.span)`
  display: block;
  height: 100%;
  border-radius: 4px;
  transform-origin: left center;
`;

const HubStats = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding-top: 18px;
  border-top: 1px solid color-mix(in srgb, var(--c-bg) 18%, transparent);

  div {
    display: grid;
    gap: 2px;
  }
  dt {
    order: 2;
    font-size: 12.5px;
    line-height: 1.35;
    opacity: 0.65;
  }
  dd {
    order: 1;
    margin: 0;
    font-family: ${font.display};
    font-size: clamp(24px, 2.2vw, 32px);
    font-weight: 800;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
`;

const Cell = styled(motion.li, noTransient)<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? 'span 2' : 'auto')};
`;

const Tile = styled.a<{ $color: string }>`
  position: relative;
  height: 100%;
  min-height: 176px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 18px;
  border-radius: ${radius.xl};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.35s ease;

  /* brand-colour glow that fades in on hover */
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    right: -40%;
    bottom: -60%;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    opacity: 0;
    filter: blur(60px);
    transition: opacity 0.35s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    border-color: ${({ $color }) => `color-mix(in srgb, ${$color} 45%, var(--c-line))`};
    box-shadow: ${({ $color }) => `0 22px 44px -28px ${$color}`};
  }
  &:hover::after,
  &:focus-visible::after {
    opacity: 0.16;
  }
`;

const TileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  ${invertLogoOnDark};

  img {
    min-width: 0;
    height: 40px;
    width: auto;
    max-width: min(150px, calc(100% - 28px));
    object-fit: contain;
    object-position: left center;
    border-radius: 8px;
  }
  svg {
    flex-shrink: 0;
    color: ${color.text3};
    transition: transform 0.25s ease, color 0.25s ease;
  }
  a:hover & svg {
    color: ${color.text};
    transform: translate(2px, -2px);
  }
`;

const TileName = styled.div`
  align-self: end;

  strong {
    display: block;
    font-family: ${font.display};
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }
  small {
    font-family: ${font.mono};
    font-size: 11px;
    color: ${color.text3};
  }
`;

const TileFoot = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;

  b {
    font-family: ${font.display};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: ${color.text};
  }
  span {
    font-size: 12px;
    color: ${color.text3};
  }
`;

const Rank = styled.span<{ $top: boolean }>`
  padding: 3px 8px;
  font-family: ${font.mono};
  font-size: 11px !important;
  font-weight: 600;
  border-radius: 999px;
  color: ${({ $top }) => ($top ? `${color.onAccent} !important` : `${color.text2} !important`)};
  background: ${({ $top }) => ($top ? color.accent : color.bgSoft)};
  white-space: nowrap;
`;

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */

const SPARK_W = 200;
const SPARK_H = 40;

/** 6-month trend of average daily unique IPs, drawn in the brand colour. */
function Sparkline({ brand, start, delay }: { brand: NationBrandPlatform; start: boolean; delay: number }) {
  const path = useMemo(() => {
    const values = TRUEHITS.monthly.map((m) => m.brands[brand.id]?.avgDailyUip ?? 0);
    if (values.length < 2) return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);
    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * SPARK_W;
        const y = 4 + (1 - (v - min) / range) * (SPARK_H - 8);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [brand.id]);

  if (!path) return <span />;

  const clipId = `spark-${brand.id}`;
  return (
    <svg viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} width="100%" height={SPARK_H} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {/* left-to-right reveal; pathLength dashes misalign once the SVG is stretched */}
        <clipPath id={clipId}>
          <motion.rect
            x="-4"
            y="-4"
            height={SPARK_H + 8}
            initial={{ width: 0 }}
            animate={start ? { width: SPARK_W + 8 } : undefined}
            transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
          />
        </clipPath>
      </defs>
      <path
        d={path}
        clipPath={`url(#${clipId})`}
        fill="none"
        stroke={brand.themeColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function HubStat({ value, label, start, compact }: { value: number; label: string; start: boolean; compact?: boolean }) {
  const current = useCountUp(value, start, 1400);
  return (
    <div>
      <dt>{label}</dt>
      <dd>{compact ? formatCompact(current) : Math.round(current)}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function BrandBento() {
  const ref = useRef<HTMLUListElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const shares = useMemo(() => {
    const total = BRANDS.reduce((sum, b) => sum + (dailyOf(b.id)?.dailyUipAll ?? 0), 0) || 1;
    return BRANDS.map((brand) => ({ brand, share: (dailyOf(brand.id)?.dailyUipAll ?? 0) / total }));
  }, []);

  return (
    <Grid ref={ref} aria-label={`Nation Group: ${BRANDS.length} news brands`}>
      <HubCell
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hub>
          <HubTop>
            <img src={assetUrl('/assets/logos/companies/nationGroup.svg')} alt="Nation Group" />
            <span>Digital network</span>
          </HubTop>

          <HubTitle>
            {BRANDS.length} news brands, <em>one shared frontend.</em>
          </HubTitle>

          <ShareBlock>
            <ShareLabel>
              <span>Share of network traffic</span>
              <a href={TRUEHITS_RANKING_URL} target="_blank" rel="noopener noreferrer">
                Truehits · {formatIsoDate(NETWORK_DAILY.date)}
              </a>
            </ShareLabel>
            <ShareBar role="img" aria-label="Share of daily unique IPs by brand">
              {shares.map(({ brand, share }, i) => (
                <ShareSegment
                  key={brand.id}
                  title={`${brand.name}: ${(share * 100).toFixed(1)}%`}
                  style={{ flexGrow: Math.max(share, 0.012), flexBasis: 0, background: brand.themeColor }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : undefined}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </ShareBar>
          </ShareBlock>

          <HubStats>
            <HubStat value={NETWORK_DAILY.totalUip} label="daily unique IPs" start={inView} compact />
            <HubStat value={NETWORK_DAILY.top20Count} label="in Thailand’s top 20" start={inView} />
            <HubStat value={NETWORK_DAILY.top50Count} label="in Thailand’s top 50" start={inView} />
          </HubStats>
        </Hub>
      </HubCell>

      {BRANDS.map((brand, i) => {
        const daily = dailyOf(brand.id);
        return (
          <Cell
            key={brand.id}
            $wide={brand.id === FEATURED_ID}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tile href={brand.url} target="_blank" rel="noopener noreferrer" $color={brand.themeColor} title={brand.role}>
              <TileTop>
                <img
                  src={brand.logo}
                  alt=""
                  height="40"
                  loading="lazy"
                  className={brand.invertLogoOnDark ? 'invertOnDark' : undefined}
                />
                <ArrowUpRight size={18} aria-hidden="true" />
              </TileTop>
              <TileName>
                <strong>{brand.name}</strong>
                <small>{brand.domain}</small>
              </TileName>
              <div style={{ display: 'grid', gap: 10 }}>
                <Sparkline brand={brand} start={inView} delay={0.5 + i * 0.06} />
                {daily && (
                  <TileFoot>
                    <span>
                      <b>{formatCompact(daily.dailyUipAll)}</b> /day
                    </span>
                    <Rank $top={daily.rankThailand <= 20}>#{daily.rankThailand} TH</Rank>
                  </TileFoot>
                )}
              </div>
            </Tile>
          </Cell>
        );
      })}
    </Grid>
  );
}
