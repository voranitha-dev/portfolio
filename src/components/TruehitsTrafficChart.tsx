import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, BarChart3, Calendar, TrendingUp } from 'lucide-react';
import {
  NATION_BRAND_PLATFORMS,
  NationBrandPlatform,
  TRUEHITS_MONTHLY_DATA,
} from '../data/portfolioData';

type ChartView = 'bar' | 'line' | 'trend';
type MonthlyMetric = 'monthlyPageviews' | 'avgDailyUip' | 'avgDailySessions';

const LINE_W = 1040;
const LINE_H = 320;
const PAD_L = 62;
const PAD_R = 28;
const PAD_T = 30;
const PAD_B = 56;

const TOP_TREND_BRAND_IDS = [
  'bangkokbiznews',
  'tnews',
  'komchadluek',
  'thansettakij',
  'nationthailand',
];

const formatCompact = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}K`;
  return String(value);
};

const getChartBarColor = (brand: NationBrandPlatform) => {
  if (brand.id === 'tnews') return '#3B5BDB';
  if (brand.id === 'nationthailand') return '#3B82F6';
  return brand.themeColor;
};

export const TruehitsTrafficChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.2 });

  // Default to latest full monthly report on Truehits.net (Oct 2026)
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    TRUEHITS_MONTHLY_DATA[TRUEHITS_MONTHLY_DATA.length - 1].monthKey
  );
  const [chartView, setChartView] = useState<ChartView>('bar');
  const [metric, setMetric] = useState<MonthlyMetric>('monthlyPageviews');
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number>(
    TRUEHITS_MONTHLY_DATA.length - 1
  );

  const activeMonth = useMemo(
    () =>
      TRUEHITS_MONTHLY_DATA.find((m) => m.monthKey === selectedMonthKey) ??
      TRUEHITS_MONTHLY_DATA[TRUEHITS_MONTHLY_DATA.length - 1],
    [selectedMonthKey]
  );

  const getBrandMonthlyValue = (
    brandId: string,
    snapshot = activeMonth,
    targetMetric = metric
  ) => {
    const rec = snapshot.brands[brandId];
    if (!rec) return 0;
    if (targetMetric === 'monthlyPageviews') return rec.avgDailyPageviews * snapshot.daysInMonth;
    if (targetMetric === 'avgDailyUip') return rec.avgDailyUip;
    return rec.avgDailySessions;
  };

  const sortedBrands = useMemo(() => {
    return [...NATION_BRAND_PLATFORMS]
      .map((brand) => {
        const stats = activeMonth.brands[brand.id];
        return {
          brand,
          rank: stats?.rank ?? brand.truehits.rankAll,
          avgDailyUip: stats?.avgDailyUip ?? 0,
          avgDailySessions: stats?.avgDailySessions ?? 0,
          avgDailyPageviews: stats?.avgDailyPageviews ?? 0,
          value: getBrandMonthlyValue(brand.id, activeMonth, metric),
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [activeMonth, metric]);

  const maxValue = useMemo(
    () => Math.max(...sortedBrands.map((b) => b.value), 1),
    [sortedBrands]
  );

  const monthTotals = useMemo(() => {
    const totalVal = sortedBrands.reduce((sum, item) => sum + item.value, 0);
    const top25Count = sortedBrands.filter((item) => item.rank <= 25).length;
    return { totalVal, top25Count };
  }, [sortedBrands]);

  const hoveredEntry =
    sortedBrands.find((item) => item.brand.id === hoveredBrandId) ?? sortedBrands[0];

  // Single-Month Line Chart Geometry (all 11 brands)
  const lineGeometry = useMemo(() => {
    const plotW = LINE_W - PAD_L - PAD_R;
    const plotH = LINE_H - PAD_T - PAD_B;
    const stepBase = maxValue >= 1_000_000 ? 1_000_000 : 25_000;
    const yCeiling = Math.ceil(maxValue / stepBase) * stepBase;

    const points = sortedBrands.map((entry, idx) => {
      const x = PAD_L + (idx / Math.max(sortedBrands.length - 1, 1)) * plotW;
      const y = PAD_T + plotH - (entry.value / yCeiling) * plotH;
      return { ...entry, x, y };
    });

    let linePath = '';
    points.forEach((pt, idx) => {
      if (idx === 0) {
        linePath = `M ${pt.x} ${pt.y}`;
      } else {
        const prev = points[idx - 1];
        const midX = (prev.x + pt.x) / 2;
        linePath += ` C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
      }
    });

    const baselineY = PAD_T + plotH;
    const areaPath =
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
        : '';

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
      value: Math.round(yCeiling * ratio),
      y: PAD_T + plotH - plotH * ratio,
    }));

    return { points, linePath, areaPath, yTicks, baselineY };
  }, [sortedBrands, maxValue]);

  // 6-Month Multi-Brand Trend Geometry (May '26 -> Oct '26)
  const trendGeometry = useMemo(() => {
    const plotW = LINE_W - PAD_L - PAD_R;
    const plotH = LINE_H - PAD_T - PAD_B;
    const baselineY = PAD_T + plotH;

    const trendBrands = TOP_TREND_BRAND_IDS.map((id) =>
      NATION_BRAND_PLATFORMS.find((b) => b.id === id)
    ).filter((b): b is NationBrandPlatform => Boolean(b));

    let peakVal = 1;
    trendBrands.forEach((brand) => {
      TRUEHITS_MONTHLY_DATA.forEach((snap) => {
        const v = getBrandMonthlyValue(brand.id, snap, metric);
        if (v > peakVal) peakVal = v;
      });
    });

    const stepBase = peakVal >= 1_000_000 ? 2_000_000 : 25_000;
    const yCeiling = Math.ceil(peakVal / stepBase) * stepBase;

    const xPositions = TRUEHITS_MONTHLY_DATA.map(
      (_, idx) => PAD_L + (idx / Math.max(TRUEHITS_MONTHLY_DATA.length - 1, 1)) * plotW
    );

    const series = trendBrands.map((brand) => {
      const pts = TRUEHITS_MONTHLY_DATA.map((snap, mIdx) => {
        const val = getBrandMonthlyValue(brand.id, snap, metric);
        const x = xPositions[mIdx];
        const y = PAD_T + plotH - (val / yCeiling) * plotH;
        return { month: snap, val, x, y };
      });

      let pathD = '';
      pts.forEach((pt, idx) => {
        if (idx === 0) {
          pathD = `M ${pt.x} ${pt.y}`;
        } else {
          const prev = pts[idx - 1];
          const midX = (prev.x + pt.x) / 2;
          pathD += ` C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
        }
      });

      return { brand, color: getChartBarColor(brand), pts, pathD };
    });

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
      value: Math.round(yCeiling * ratio),
      y: PAD_T + plotH - plotH * ratio,
    }));

    return { series, xPositions, yTicks, baselineY };
  }, [metric]);

  const metricLabel =
    metric === 'monthlyPageviews'
      ? 'Est. Monthly Pageviews'
      : metric === 'avgDailyUip'
        ? 'Monthly Avg Daily UIP'
        : 'Monthly Avg Daily Sessions';

  const hoveredTrendMonth =
    TRUEHITS_MONTHLY_DATA[hoveredMonthIdx] ??
    TRUEHITS_MONTHLY_DATA[TRUEHITS_MONTHLY_DATA.length - 1];

  return (
    <div
      ref={chartRef}
      className="rounded-2xl border border-[#E5E7EB] dark:border-[#232A38] bg-[#FAFAFA] dark:bg-[#090B10] p-5 sm:p-7 space-y-6 transition-colors"
    >
      {/* Top Row: Monthly Header + Source Link + Chart Mode Switch */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E5E7EB] dark:border-[#1E2430]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">
              Truehits.net Official Monthly Archive (May – Oct 2026)
            </span>
            <span aria-hidden="true" className="text-[#D1D5DB] dark:text-[#374151]">
              ·
            </span>
            <a
              href={activeMonth.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors"
            >
              <span>Verify {activeMonth.shortLabel} on truehits.net</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-[#111318] dark:text-white tracking-tight">
            {chartView === 'trend' ? (
              <>
                6-Month Traffic Trend ({metricLabel})
                <span className="ml-2.5 text-sm font-mono font-medium text-[#1D4ED8] dark:text-[#60A5FA]">
                  Top 5 Flagship Brands
                </span>
              </>
            ) : (
              <>
                {formatCompact(monthTotals.totalVal)}{' '}
                {metric === 'monthlyPageviews'
                  ? `Pageviews in ${activeMonth.monthLabel}`
                  : metric === 'avgDailyUip'
                    ? `Avg Daily UIP (${activeMonth.shortLabel})`
                    : `Avg Daily Sessions (${activeMonth.shortLabel})`}
                <span className="ml-2.5 text-sm font-mono font-medium text-[#1D4ED8] dark:text-[#60A5FA]">
                  ({monthTotals.top25Count} Brands in Thailand Top 25)
                </span>
              </>
            )}
          </h3>
        </div>

        {/* Visualization Mode Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <div
            role="group"
            aria-label="Chart visualization mode"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38]"
          >
            <button
              type="button"
              onClick={() => setChartView('bar')}
              aria-pressed={chartView === 'bar'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                chartView === 'bar'
                  ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                  : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Bar</span>
            </button>
            <button
              type="button"
              onClick={() => setChartView('line')}
              aria-pressed={chartView === 'line'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                chartView === 'line'
                  ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                  : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Line</span>
            </button>
            <button
              type="button"
              onClick={() => setChartView('trend')}
              aria-pressed={chartView === 'trend'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                chartView === 'trend'
                  ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                  : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>6-Month Trend</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar: Month Selector (when Bar/Line) + Metric Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Month Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {chartView !== 'trend' ? (
            TRUEHITS_MONTHLY_DATA.map((m) => {
              const isSelected = m.monthKey === activeMonth.monthKey;
              return (
                <button
                  key={m.monthKey}
                  type="button"
                  onClick={() => setSelectedMonthKey(m.monthKey)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white font-semibold'
                      : 'bg-white dark:bg-[#121620] border-[#E5E7EB] dark:border-[#232A38] text-[#4B5563] dark:text-[#9CA3AF] hover:border-[#1D4ED8] dark:hover:border-[#60A5FA]'
                  }`}
                >
                  {m.shortLabel}
                </button>
              );
            })
          ) : (
            <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
              Hover any month column below to compare May &apos;26 – Oct &apos;26 monthly performance
            </p>
          )}
        </div>

        {/* Metric Switcher */}
        <div
          role="group"
          aria-label="Monthly metric selector"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] self-start md:self-auto"
        >
          <button
            type="button"
            onClick={() => setMetric('monthlyPageviews')}
            aria-pressed={metric === 'monthlyPageviews'}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              metric === 'monthlyPageviews'
                ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Monthly Pageviews
          </button>
          <button
            type="button"
            onClick={() => setMetric('avgDailyUip')}
            aria-pressed={metric === 'avgDailyUip'}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              metric === 'avgDailyUip'
                ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Avg UIP / day
          </button>
          <button
            type="button"
            onClick={() => setMetric('avgDailySessions')}
            aria-pressed={metric === 'avgDailySessions'}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              metric === 'avgDailySessions'
                ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Avg Sessions / day
          </button>
        </div>
      </div>

      {/* VIEW 1: Animated Monthly Bar Chart */}
      {chartView === 'bar' && (
        <div key={`bar-${activeMonth.monthKey}-${metric}`} className="space-y-2.5">
          {sortedBrands.map((entry, idx) => {
            const widthPct = Math.max((entry.value / maxValue) * 100, 1.4);
            const barColor = getChartBarColor(entry.brand);
            const isHovered = hoveredBrandId === entry.brand.id;

            return (
              <a
                key={entry.brand.id}
                href={entry.brand.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredBrandId(entry.brand.id)}
                onMouseLeave={() => setHoveredBrandId(null)}
                className={`group grid grid-cols-12 items-center gap-3 px-3 py-2 rounded-xl border transition-colors ${
                  isHovered
                    ? 'bg-white dark:bg-[#141923] border-[#D1D5DB] dark:border-[#374151]'
                    : 'bg-transparent border-transparent hover:bg-white dark:hover:bg-[#121620]'
                }`}
              >
                {/* Monthly Rank + Brand Name */}
                <div className="col-span-5 sm:col-span-4 lg:col-span-3 flex items-center gap-2.5 min-w-0">
                  <span className="w-9 text-[11px] font-mono font-semibold text-[#6B7280] dark:text-[#9CA3AF] tabular-nums shrink-0">
                    #{entry.rank}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: barColor }}
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-[#111318] dark:text-white truncate group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors">
                    {entry.brand.name}
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="col-span-4 sm:col-span-5 lg:col-span-6">
                  <div className="h-3 sm:h-3.5 w-full rounded-full bg-[#E5E7EB]/80 dark:bg-[#1A202C] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${widthPct}%` } : { width: 0 }}
                      transition={{
                        duration: 0.68,
                        delay: 0.04 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                  </div>
                </div>

                {/* Exact Numeric Value */}
                <div className="col-span-3 flex items-center justify-end gap-2 text-right font-mono tabular-nums">
                  <span className="text-xs sm:text-sm font-semibold text-[#111318] dark:text-white">
                    {metric === 'monthlyPageviews'
                      ? formatCompact(entry.value)
                      : entry.value.toLocaleString()}
                  </span>
                  <span className="hidden md:inline text-[11px] text-[#6B7280] dark:text-[#9CA3AF] w-20">
                    {formatCompact(entry.avgDailyUip)} UIP/d
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] shrink-0 hidden sm:inline"
                    aria-hidden="true"
                  />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Animated Single-Month Line Chart (All 11 Brands) */}
      {chartView === 'line' && (
        <div key={`line-${activeMonth.monthKey}-${metric}`} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38]">
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: getChartBarColor(hoveredEntry.brand) }}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[#111318] dark:text-white">
                {hoveredEntry.brand.name}
              </span>
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                {activeMonth.shortLabel} Rank #{hoveredEntry.rank}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
              <span className="text-[#111318] dark:text-white font-semibold">
                {formatCompact(hoveredEntry.avgDailyPageviews * activeMonth.daysInMonth)} PV/mo
              </span>
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                {hoveredEntry.avgDailyUip.toLocaleString()} UIP/day
              </span>
              <span className="text-[#1D4ED8] dark:text-[#60A5FA]">
                {hoveredEntry.avgDailySessions.toLocaleString()} Sessions/day
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${LINE_W} ${LINE_H}`}
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label={`Animated monthly traffic line chart for ${activeMonth.monthLabel}`}
            >
              <defs>
                <linearGradient id="truehitsMonthlyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {lineGeometry.yTicks.map((tick) => (
                <g key={tick.value}>
                  <line
                    x1={PAD_L}
                    y1={tick.y}
                    x2={LINE_W - PAD_R}
                    y2={tick.y}
                    stroke="currentColor"
                    className="text-[#E5E7EB] dark:text-[#1E2430]"
                    strokeDasharray="3 5"
                  />
                  <text
                    x={PAD_L - 10}
                    y={tick.y + 4}
                    textAnchor="end"
                    className="fill-[#6B7280] dark:fill-[#9CA3AF] text-[10px] font-mono"
                  >
                    {formatCompact(tick.value)}
                  </text>
                </g>
              ))}

              <motion.path
                d={lineGeometry.areaPath}
                fill="url(#truehitsMonthlyFill)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
              />

              <motion.path
                d={lineGeometry.linePath}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              />

              {lineGeometry.points.map((pt, idx) => {
                const isHovered = hoveredEntry.brand.id === pt.brand.id;
                const nodeColor = getChartBarColor(pt.brand);
                return (
                  <a
                    key={pt.brand.id}
                    href={pt.brand.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${pt.brand.name}`}
                    onMouseEnter={() => setHoveredBrandId(pt.brand.id)}
                    onFocus={() => setHoveredBrandId(pt.brand.id)}
                    className="cursor-pointer focus:outline-none"
                  >
                    {isHovered && (
                      <line
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.x}
                        y2={lineGeometry.baselineY}
                        stroke={nodeColor}
                        strokeOpacity="0.4"
                        strokeDasharray="3 3"
                      />
                    )}

                    <motion.text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.04 }}
                      className={`text-[10px] font-mono font-semibold ${
                        isHovered
                          ? 'fill-[#1D4ED8] dark:fill-[#60A5FA]'
                          : 'fill-[#374151] dark:fill-[#D1D5DB]'
                      }`}
                    >
                      {formatCompact(pt.value)}
                    </motion.text>

                    <motion.circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 7.5 : 5.5}
                      fill="#FFFFFF"
                      stroke={nodeColor}
                      strokeWidth={isHovered ? 3.5 : 2.8}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 240,
                        damping: 18,
                        delay: 0.25 + idx * 0.04,
                      }}
                    />

                    <text
                      x={pt.x}
                      y={lineGeometry.baselineY + 22}
                      textAnchor="middle"
                      className={`text-[10px] font-mono ${
                        isHovered
                          ? 'fill-[#111318] dark:fill-white font-semibold'
                          : 'fill-[#6B7280] dark:fill-[#9CA3AF]'
                      }`}
                    >
                      {pt.brand.domain.replace(/\.(com|co\.th|co|net|tv)$/, '')}
                    </text>
                    <text
                      x={pt.x}
                      y={lineGeometry.baselineY + 37}
                      textAnchor="middle"
                      className="fill-[#9CA3AF] dark:fill-[#6B7280] text-[9px] font-mono"
                    >
                      #{pt.rank}
                    </text>
                  </a>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* VIEW 3: Animated 6-Month Multi-Brand Trend Line Chart (May '26 -> Oct '26) */}
      {chartView === 'trend' && (
        <div key={`trend-${metric}`} className="space-y-4">
          {/* Interactive Legend + Selected Month Snapshot */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38]">
            <span className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
              {hoveredTrendMonth.monthLabel}
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono tabular-nums">
              {trendGeometry.series.map((s) => {
                const val = getBrandMonthlyValue(s.brand.id, hoveredTrendMonth, metric);
                return (
                  <span key={s.brand.id} className="inline-flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                      aria-hidden="true"
                    />
                    <span className="text-[#4B5563] dark:text-[#9CA3AF]">{s.brand.name}:</span>
                    <span className="font-semibold text-[#111318] dark:text-white">
                      {formatCompact(val)}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${LINE_W} ${LINE_H}`}
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="6-month Truehits traffic trend from May to October 2026 for top 5 Nation Group brands"
            >
              {trendGeometry.yTicks.map((tick) => (
                <g key={tick.value}>
                  <line
                    x1={PAD_L}
                    y1={tick.y}
                    x2={LINE_W - PAD_R}
                    y2={tick.y}
                    stroke="currentColor"
                    className="text-[#E5E7EB] dark:text-[#1E2430]"
                    strokeDasharray="3 5"
                  />
                  <text
                    x={PAD_L - 10}
                    y={tick.y + 4}
                    textAnchor="end"
                    className="fill-[#6B7280] dark:fill-[#9CA3AF] text-[10px] font-mono"
                  >
                    {formatCompact(tick.value)}
                  </text>
                </g>
              ))}

              {/* Hoverable Vertical Month Columns */}
              {TRUEHITS_MONTHLY_DATA.map((snap, mIdx) => {
                const x = trendGeometry.xPositions[mIdx];
                const isActiveCol = mIdx === hoveredMonthIdx;
                return (
                  <g
                    key={snap.monthKey}
                    onMouseEnter={() => setHoveredMonthIdx(mIdx)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={x - 65}
                      y={PAD_T}
                      width={130}
                      height={trendGeometry.baselineY - PAD_T + 30}
                      fill="transparent"
                    />
                    <line
                      x1={x}
                      y1={PAD_T}
                      x2={x}
                      y2={trendGeometry.baselineY}
                      stroke={isActiveCol ? '#2563EB' : 'transparent'}
                      strokeOpacity={isActiveCol ? 0.35 : 0}
                      strokeDasharray="3 4"
                    />
                    <text
                      x={x}
                      y={trendGeometry.baselineY + 26}
                      textAnchor="middle"
                      className={`text-[11px] font-mono ${
                        isActiveCol
                          ? 'fill-[#1D4ED8] dark:fill-[#60A5FA] font-semibold'
                          : 'fill-[#6B7280] dark:fill-[#9CA3AF]'
                      }`}
                    >
                      {snap.shortLabel}
                    </text>
                  </g>
                );
              })}

              {/* 5 Multi-Brand Animated Curves */}
              {trendGeometry.series.map((s, sIdx) => (
                <g key={s.brand.id}>
                  <motion.path
                    d={s.pathD}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: sIdx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  {s.pts.map((pt, mIdx) => (
                    <motion.circle
                      key={`${s.brand.id}-${pt.month.monthKey}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={mIdx === hoveredMonthIdx ? 6.5 : 4.2}
                      fill="#FFFFFF"
                      stroke={s.color}
                      strokeWidth={mIdx === hoveredMonthIdx ? 3 : 2.2}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.35 + mIdx * 0.05 }}
                      onMouseEnter={() => setHoveredMonthIdx(mIdx)}
                      className="cursor-pointer"
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
