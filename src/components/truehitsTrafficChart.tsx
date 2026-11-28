import styled from '@emotion/styled';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NATION_BRAND_PLATFORMS } from '../data/portfolioData';
import { TRUEHITS, type TruehitsMonthlySnapshot } from '../data/truehits';
import { formatCompact, formatNumber } from '../utils/format';
import {
  Card,
  MonoLabel,
  SegmentedButton,
  SegmentedGroup,
  segmentedPill,
} from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';

type ChartView = 'bars' | 'trend';
type Metric = 'pageviews' | 'uip' | 'sessions';

const METRICS: { id: Metric; label: string; long: string }[] = [
  { id: 'pageviews', label: 'Pageviews', long: 'Monthly pageviews (est.)' },
  { id: 'uip', label: 'Unique IPs', long: 'Avg. daily unique IPs' },
  { id: 'sessions', label: 'Sessions', long: 'Avg. daily sessions' },
];

const TREND_BRAND_IDS = ['bangkokbiznews', 'tnews', 'komchadluek', 'thansettakij', 'nationthailand'];

const valueFor = (snapshot: TruehitsMonthlySnapshot, brandId: string, metric: Metric) => {
  const rec = snapshot.brands[brandId];
  if (!rec) return 0;
  if (metric === 'pageviews') return rec.avgDailyPageviews * snapshot.daysInMonth;
  if (metric === 'uip') return rec.avgDailyUip;
  return rec.avgDailySessions;
};

const totalFor = (snapshot: TruehitsMonthlySnapshot | undefined, metric: Metric) =>
  snapshot ? NATION_BRAND_PLATFORMS.reduce((sum, b) => sum + valueFor(snapshot, b.id, metric), 0) : 0;

/* ------------------------------------------------------------------ */

const Panel = styled(Card)`
  padding: 20px;
  display: grid;
  gap: 22px;
  overflow: hidden;

  ${mq.md} {
    padding: 28px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
`;

const ToolbarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
`;

const Tile = styled.div`
  padding: 14px 16px;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};
  display: grid;
  gap: 4px;

  strong {
    font-family: ${font.display};
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
`;

const Delta = styled.span<{ $up: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: ${font.mono};
  font-size: 12px;
  font-weight: 600;
  color: ${({ $up }) => ($up ? color.success : color.danger)};
`;

const MonthRail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

const MonthChip = styled.button<{ $active: boolean }>`
  padding: 6px 11px;
  font-family: ${font.mono};
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? color.accent : color.line)};
  color: ${({ $active }) => ($active ? color.onAccent : color.text2)};
  background: ${({ $active }) => ($active ? color.accent : color.bgElev)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.accent};
  }
`;

const PlayButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 700;
  border-radius: 8px;
  color: ${color.accent};
  background: ${color.accentSoft};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const BarsScroller = styled.div`
  overflow-x: auto;
  padding-bottom: 4px;
`;

const BarsStage = styled.div`
  position: relative;
  min-width: 680px;
  height: 340px;
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));
  align-items: end;
  gap: 10px;
  padding: 26px 4px 0;
  border-bottom: 1px solid ${color.lineStrong};

  &::before {
    content: '';
    position: absolute;
    inset: 26px 0 0;
    background-image: linear-gradient(${color.line} 1px, transparent 1px);
    background-size: 100% 25%;
    pointer-events: none;
  }
`;

const BarColumn = styled.a`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  outline-offset: 4px;
`;

const BarValue = styled(motion.span)`
  font-family: ${font.mono};
  font-size: 11.5px;
  font-weight: 600;
  color: ${color.text2};
  font-variant-numeric: tabular-nums;
`;

const BarBody = styled(motion.span)`
  position: relative;
  width: 100%;
  max-width: 54px;
  border-radius: 10px 10px 3px 3px;
  overflow: hidden;
  transition: filter 0.2s ease, transform 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 45%);
  }

  .barColumn:hover & {
    filter: brightness(1.12) saturate(1.1);
    transform: scaleX(1.06);
  }
`;

const RankPill = styled.span`
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  padding: 1px 5px;
  font-family: ${font.mono};
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 0, 0, 0.28);
  border-radius: 5px;
`;

const BarLabels = styled.div`
  min-width: 680px;
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));
  gap: 10px;
  padding: 10px 4px 0;
`;

const BarLabel = styled.span`
  display: grid;
  justify-items: center;
  gap: 6px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.25;
  color: ${color.text2};

  img {
    width: 26px;
    height: 26px;
    padding: 3px;
    object-fit: contain;
    border-radius: 7px;
    background: #fff;
    border: 1px solid ${color.line};
  }
`;

const TrendWrap = styled.div`
  position: relative;
  overflow-x: auto;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
`;

const LegendItem = styled.button<{ $dim: boolean; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  opacity: ${({ $dim }) => ($dim ? 0.35 : 1)};
  transition: opacity 0.2s ease;

  &::before {
    content: '';
    width: 14px;
    height: 4px;
    border-radius: 2px;
    background: ${({ $color }) => $color};
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 8px;
  z-index: 2;
  min-width: 190px;
  padding: 10px 12px;
  border-radius: ${radius.md};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  box-shadow: 0 16px 40px -18px rgba(15, 23, 42, 0.45);
  pointer-events: none;
  display: grid;
  gap: 4px;
  font-size: 12px;

  b {
    font-family: ${font.display};
    font-size: 13px;
  }

  span {
    display: flex;
    justify-content: space-between;
    gap: 14px;
  }

  i {
    font-style: normal;
    font-family: ${font.mono};
    font-variant-numeric: tabular-nums;
  }
`;

const Footnote = styled.p`
  font-size: 12.5px;
  color: ${color.text3};

  a {
    color: ${color.accent};
    font-weight: 600;
  }
`;

const TREND_W = 960;
const TREND_H = 320;
const PAD = { l: 58, r: 24, t: 20, b: 38 };

export function TruehitsTrafficChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const months = TRUEHITS.monthly;

  const [view, setView] = useState<ChartView>('bars');
  const [metric, setMetric] = useState<Metric>('pageviews');
  const [monthIdx, setMonthIdx] = useState(months.length - 1);
  const [playing, setPlaying] = useState(false);
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);
  const [focusBrand, setFocusBrand] = useState<string | null>(null);

  const month = months[monthIdx];
  const prevMonth = months[monthIdx - 1];

  // "Play months" — steps through each month so the bars animate between snapshots.
  useEffect(() => {
    if (!playing) return;
    if (monthIdx >= months.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setMonthIdx((i) => i + 1), 1300);
    return () => window.clearTimeout(id);
  }, [playing, monthIdx, months.length]);

  const startPlayback = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setView('bars');
    setMonthIdx(0);
    setPlaying(true);
  };

  const ranked = useMemo(
    () =>
      NATION_BRAND_PLATFORMS.map((brand) => ({
        brand,
        value: month ? valueFor(month, brand.id, metric) : 0,
        rank: month?.brands[brand.id]?.rank ?? 0,
      })).sort((a, b) => b.value - a.value),
    [month, metric]
  );
  const max = Math.max(...ranked.map((r) => r.value), 1);
  const total = totalFor(month, metric);
  const prevTotal = totalFor(prevMonth, metric);
  const delta = prevTotal ? ((total - prevTotal) / prevTotal) * 100 : 0;
  const top25 = ranked.filter((r) => r.rank > 0 && r.rank <= 25).length;

  const trend = useMemo(() => {
    const brands = TREND_BRAND_IDS.map((id) => NATION_BRAND_PLATFORMS.find((b) => b.id === id)!).filter(Boolean);
    const peak = Math.max(1, ...brands.flatMap((b) => months.map((m) => valueFor(m, b.id, metric))));
    const plotW = TREND_W - PAD.l - PAD.r;
    const plotH = TREND_H - PAD.t - PAD.b;
    const xs = months.map((_, i) => PAD.l + (i / Math.max(months.length - 1, 1)) * plotW);
    const y = (v: number) => PAD.t + plotH - (v / peak) * plotH;
    const series = brands.map((brand) => {
      const pts = months.map((m, i) => ({ x: xs[i], y: y(valueFor(m, brand.id, metric)), v: valueFor(m, brand.id, metric) }));
      const d = pts
        .map((p, i) => {
          if (i === 0) return `M ${p.x} ${p.y}`;
          const prev = pts[i - 1];
          const mid = (prev.x + p.x) / 2;
          return `C ${mid} ${prev.y}, ${mid} ${p.y}, ${p.x} ${p.y}`;
        })
        .join(' ');
      return { brand, pts, d };
    });
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((r) => ({ value: peak * r, y: PAD.t + plotH - plotH * r }));
    return { series, xs, ticks };
  }, [months, metric]);

  const metricMeta = METRICS.find((m) => m.id === metric)!;

  if (!month) return null;

  return (
    <Panel ref={ref}>
      <Toolbar>
        <ToolbarGroup>
          <SegmentedGroup role="tablist" aria-label="Chart type">
            {(['bars', 'trend'] as ChartView[]).map((v) => (
              <SegmentedButton key={v} role="tab" aria-selected={view === v} $active={view === v} onClick={() => setView(v)}>
                {view === v && <motion.span layoutId="chartViewPill" css={segmentedPill} />}
                {v === 'bars' ? 'Monthly ranking' : `${months.length}-month trend`}
              </SegmentedButton>
            ))}
          </SegmentedGroup>
          <SegmentedGroup role="tablist" aria-label="Metric">
            {METRICS.map((m) => (
              <SegmentedButton key={m.id} role="tab" aria-selected={metric === m.id} $active={metric === m.id} onClick={() => setMetric(m.id)}>
                {metric === m.id && <motion.span layoutId="chartMetricPill" css={segmentedPill} />}
                {m.label}
              </SegmentedButton>
            ))}
          </SegmentedGroup>
        </ToolbarGroup>
      </Toolbar>

      <Summary>
        <Tile>
          <MonoLabel>Network · {month.monthLabel}</MonoLabel>
          <strong>{formatCompact(total)}</strong>
          <MonoLabel>{metricMeta.long}</MonoLabel>
        </Tile>
        <Tile>
          <MonoLabel>vs. previous month</MonoLabel>
          <strong>
            {prevMonth ? (
              <Delta $up={delta >= 0}>
                {delta >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(delta).toFixed(1)}%
              </Delta>
            ) : (
              '—'
            )}
          </strong>
          <MonoLabel>{prevMonth ? `from ${prevMonth.shortLabel}` : 'first month in range'}</MonoLabel>
        </Tile>
        <Tile>
          <MonoLabel>In Thailand top 25</MonoLabel>
          <strong>{top25} sites</strong>
          <MonoLabel>Truehits monthly rank</MonoLabel>
        </Tile>
      </Summary>

      <AnimatePresence mode="wait">
        {view === 'bars' ? (
          <motion.div key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ToolbarGroup style={{ justifyContent: 'space-between', marginBottom: 14 }}>
              <MonthRail role="tablist" aria-label="Month">
                {months.map((m, i) => (
                  <MonthChip
                    key={m.monthKey}
                    role="tab"
                    aria-selected={i === monthIdx}
                    $active={i === monthIdx}
                    onClick={() => {
                      setPlaying(false);
                      setMonthIdx(i);
                    }}
                  >
                    {m.shortLabel}
                  </MonthChip>
                ))}
              </MonthRail>
              <PlayButton type="button" onClick={startPlayback} aria-pressed={playing}>
                {playing ? <Pause /> : <Play />}
                {playing ? 'Pause' : 'Play months'}
              </PlayButton>
            </ToolbarGroup>

            <BarsScroller>
              <BarsStage role="list" aria-label={`${metricMeta.long}, ${month.monthLabel}`}>
                {ranked.map(({ brand, value, rank }, index) => (
                  <BarColumn
                    key={brand.id}
                    className="barColumn"
                    role="listitem"
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.name}: ${formatNumber(value)} (${metricMeta.long}), Thailand rank ${rank}`}
                  >
                    <BarValue layout transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
                      {formatCompact(value)}
                    </BarValue>
                    <BarBody
                      layout
                      style={{ background: `linear-gradient(180deg, ${brand.themeColor}, color-mix(in srgb, ${brand.themeColor} 65%, #000))` }}
                      initial={{ height: 0 }}
                      animate={{ height: inView ? `${Math.max((value / max) * 82, 1.5)}%` : 0 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: inView && !playing ? index * 0.05 : 0 }}
                    >
                      {rank > 0 && value / max > 0.12 && <RankPill>#{rank}</RankPill>}
                    </BarBody>
                  </BarColumn>
                ))}
              </BarsStage>
              <BarLabels aria-hidden="true">
                {ranked.map(({ brand }) => (
                  <BarLabel key={brand.id}>
                    <img src={brand.logo} alt="" width="26" height="26" loading="lazy" />
                    {brand.name}
                  </BarLabel>
                ))}
              </BarLabels>
            </BarsScroller>
          </motion.div>
        ) : (
          <motion.div key="trend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Legend style={{ marginBottom: 12 }}>
              {trend.series.map(({ brand }) => (
                <LegendItem
                  key={brand.id}
                  type="button"
                  $color={brand.themeColor}
                  $dim={focusBrand !== null && focusBrand !== brand.id}
                  onMouseEnter={() => setFocusBrand(brand.id)}
                  onMouseLeave={() => setFocusBrand(null)}
                  onFocus={() => setFocusBrand(brand.id)}
                  onBlur={() => setFocusBrand(null)}
                >
                  {brand.name}
                </LegendItem>
              ))}
            </Legend>
            <TrendWrap onMouseLeave={() => setHoverMonth(null)}>
              <svg
                viewBox={`0 0 ${TREND_W} ${TREND_H}`}
                width="100%"
                style={{ minWidth: 620 }}
                role="img"
                aria-label={`${metricMeta.long} trend for the top 5 sites, ${months[0].monthLabel} to ${month.monthLabel}`}
              >
                {trend.ticks.map((t) => (
                  <g key={t.y}>
                    <line x1={PAD.l} x2={TREND_W - PAD.r} y1={t.y} y2={t.y} stroke="var(--c-line)" strokeDasharray="4 6" />
                    <text x={PAD.l - 10} y={t.y + 4} textAnchor="end" fontSize="11" fill="var(--c-text-3)" fontFamily={font.mono}>
                      {formatCompact(t.value)}
                    </text>
                  </g>
                ))}
                {months.map((m, i) => (
                  <text key={m.monthKey} x={trend.xs[i]} y={TREND_H - 12} textAnchor="middle" fontSize="11.5" fill="var(--c-text-3)" fontFamily={font.mono}>
                    {m.shortLabel}
                  </text>
                ))}
                {hoverMonth !== null && (
                  <line x1={trend.xs[hoverMonth]} x2={trend.xs[hoverMonth]} y1={PAD.t} y2={TREND_H - PAD.b} stroke="var(--c-accent)" strokeDasharray="3 4" />
                )}
                {trend.series.map(({ brand, d, pts }, si) => {
                  const dim = focusBrand !== null && focusBrand !== brand.id;
                  return (
                    <g key={`${brand.id}-${metric}`} opacity={dim ? 0.15 : 1} style={{ transition: 'opacity 0.2s ease' }}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke={brand.themeColor}
                        strokeWidth={focusBrand === brand.id ? 4 : 2.75}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, delay: si * 0.12, ease: 'easeInOut' }}
                      />
                      {pts.map((p, pi) => (
                        <motion.circle
                          key={pi}
                          cx={p.x}
                          cy={p.y}
                          r={hoverMonth === pi ? 6 : 4}
                          fill="var(--c-bg-elev)"
                          stroke={brand.themeColor}
                          strokeWidth="2.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + si * 0.12 + pi * 0.08 }}
                        />
                      ))}
                    </g>
                  );
                })}
                {months.map((m, i) => {
                  const step = (TREND_W - PAD.l - PAD.r) / Math.max(months.length - 1, 1);
                  return (
                    <rect
                      key={`hit-${m.monthKey}`}
                      x={trend.xs[i] - step / 2}
                      y={0}
                      width={step}
                      height={TREND_H}
                      fill="transparent"
                      onMouseEnter={() => setHoverMonth(i)}
                    />
                  );
                })}
              </svg>
              <AnimatePresence>
                {hoverMonth !== null && (
                  <Tooltip
                    key="tip"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, left: `clamp(8px, calc(${(trend.xs[hoverMonth] / TREND_W) * 100}% - 95px), calc(100% - 200px))` }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <b>{months[hoverMonth].monthLabel}</b>
                    {trend.series
                      .map((s) => ({ name: s.brand.name, c: s.brand.themeColor, v: s.pts[hoverMonth].v }))
                      .sort((a, b) => b.v - a.v)
                      .map((row) => (
                        <span key={row.name}>
                          <em style={{ fontStyle: 'normal', color: row.c, fontWeight: 600 }}>{row.name}</em>
                          <i>{formatCompact(row.v)}</i>
                        </span>
                      ))}
                  </Tooltip>
                )}
              </AnimatePresence>
            </TrendWrap>
          </motion.div>
        )}
      </AnimatePresence>

      <Footnote>
        Source:{' '}
        <a href={month.sourceUrl} target="_blank" rel="noopener noreferrer">
          Truehits.net monthly ranking
        </a>
        . Monthly pageviews = average daily pageviews × days in month. Data refreshes automatically on every scheduled
        deploy.
      </Footnote>
    </Panel>
  );
}
