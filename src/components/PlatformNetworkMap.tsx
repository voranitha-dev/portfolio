import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, RotateCcw, Trophy } from 'lucide-react';
import {
  AWARDS_PLATFORMS,
  NATION_BRAND_PLATFORMS,
  NationBrandPlatform,
} from '../data/portfolioData';
import { TruehitsTrafficChart } from './TruehitsTrafficChart';
import { assetUrl } from '../utils/assetUrl';

const CANVAS_W = 1160;
const CANVAS_H = 700;
const CENTER_X = 580;
const CENTER_Y = 345;
const ORBIT_RX = 448;
const ORBIT_RY = 248;

interface PositionedBrand {
  brand: NationBrandPlatform;
  x: number;
  y: number;
  leftPct: number;
  topPct: number;
  dxFromCenter: number;
  dyFromCenter: number;
  pathD: string;
}

export const PlatformNetworkMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(mapRef, { once: true, amount: 0.2 });

  const [replaySeed, setReplaySeed] = useState<number>(0);
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const positionedBrands: PositionedBrand[] = useMemo(() => {
    const count = NATION_BRAND_PLATFORMS.length;
    return NATION_BRAND_PLATFORMS.map((brand, idx) => {
      const angleDeg = -90 + (idx * 360) / count;
      const rad = (angleDeg * Math.PI) / 180;
      const x = Math.round(CENTER_X + ORBIT_RX * Math.cos(rad));
      const y = Math.round(CENTER_Y + ORBIT_RY * Math.sin(rad));

      const midX = (CENTER_X + x) / 2;
      const midY = (CENTER_Y + y) / 2;
      const bendSign = idx % 2 === 0 ? 1 : -1;
      const ctrlX = Math.round(midX - Math.sin(rad) * 26 * bendSign);
      const ctrlY = Math.round(midY + Math.cos(rad) * 18 * bendSign);

      return {
        brand,
        x,
        y,
        leftPct: (x / CANVAS_W) * 100,
        topPct: (y / CANVAS_H) * 100,
        dxFromCenter: CENTER_X - x,
        dyFromCenter: CENTER_Y - y,
        pathD: `M ${CENTER_X} ${CENTER_Y} Q ${ctrlX} ${ctrlY} ${x} ${y}`,
      };
    });
  }, []);

  const handleLogoError = (id: string) => {
    setFailedLogos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="current-work"
      className="py-20 lg:py-24 bg-white dark:bg-[#0D1017] border-y border-[#E5E7EB] dark:border-[#1E2430] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                01. Current Lead Frontend Work · Nation Group (5 Years 5 Months)
              </p>
              <span aria-hidden="true" className="text-[#D1D5DB] dark:text-[#374151]">
                /
              </span>
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                Click any brand circle to visit the live site
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
              Nation Group core architecture radiating across 11 live digital news brands.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setReplaySeed((s) => s + 1)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#111318] dark:text-white bg-[#FAFAFA] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-lg hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap self-start lg:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Replay Mind Map</span>
          </button>
        </div>

        {/* Radial Mind Map Stage (Clean — No Website Bar Underneath) */}
        <div
          ref={mapRef}
          className="rounded-2xl border border-[#E5E7EB] dark:border-[#232A38] bg-[#FAFAFA] dark:bg-[#090B10] p-5 sm:p-8 overflow-hidden transition-colors"
        >
          {/* Desktop Interactive Radial Mind Map (lg+) */}
          <div
            key={`desktop-mindmap-${replaySeed}`}
            className="hidden lg:block relative w-full"
            style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
          >
            {/* Background Orbital Rings & Animated Mind-Map Beams SVG */}
            <svg
              viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              role="img"
              aria-label="Radial mind map from Nation Group core hub branching out to 11 news websites"
            >
              <motion.ellipse
                cx={CENTER_X}
                cy={CENTER_Y}
                rx={ORBIT_RX}
                ry={ORBIT_RY}
                fill="none"
                stroke="currentColor"
                className="text-[#E5E7EB] dark:text-[#1E2430]"
                strokeWidth="1.25"
                strokeDasharray="4 6"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              />
              <motion.ellipse
                cx={CENTER_X}
                cy={CENTER_Y}
                rx={ORBIT_RX * 0.56}
                ry={ORBIT_RY * 0.56}
                fill="none"
                stroke="currentColor"
                className="text-[#E5E7EB]/70 dark:text-[#1E2430]/70"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              />

              {positionedBrands.map((item, idx) => {
                const isHighlighted = hoveredBrandId === item.brand.id;
                const isDimmed = hoveredBrandId !== null && !isHighlighted;
                return (
                  <g key={item.brand.id}>
                    <motion.path
                      d={item.pathD}
                      fill="none"
                      stroke={item.brand.themeColor}
                      strokeOpacity={isDimmed ? 0.14 : isHighlighted ? 0.92 : 0.35}
                      strokeWidth={isHighlighted ? 3 : 1.75}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.14 + idx * 0.055,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />

                    {isInView && (
                      <path
                        d={item.pathD}
                        fill="none"
                        stroke={item.brand.themeColor}
                        strokeOpacity={isDimmed ? 0.08 : isHighlighted ? 1 : 0.72}
                        strokeWidth={isHighlighted ? 3.2 : 2}
                        className="animate-git-flow"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Center Nation Group Hub Circle — Pure Solid White in Both Light & Dark Themes */}
            <motion.a
              href="https://www.nationgroup.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.55 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: `${(CENTER_X / CANVAS_W) * 100}%`,
                top: `${(CENTER_Y / CANVAS_H) * 100}%`,
              }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 w-44 h-44 rounded-full bg-white border-2 border-[#111318] dark:border-white shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.16)] flex flex-col items-center justify-center p-5 text-center transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              <img
                src={assetUrl('/assets/logos/companies/nationgroup.svg')}
                alt="Nation Group"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain"
              />
              <p className="mt-2.5 text-[11px] font-mono font-bold text-[#111318]">
                11 Live Brands
              </p>
              <p className="mt-0.5 text-[10px] font-mono text-[#4B5563]">
                Next.js · Edge · SSO
              </p>
            </motion.a>

            {/* 11 Circular Brand Nodes Blooming Outward from Center */}
            {positionedBrands.map((item, idx) => {
              const isHighlighted = hoveredBrandId === item.brand.id;
              const isDimmed = hoveredBrandId !== null && !isHighlighted;

              return (
                <motion.div
                  key={item.brand.id}
                  initial={{
                    opacity: 0,
                    scale: 0.25,
                    x: item.dxFromCenter * 0.55,
                    y: item.dyFromCenter * 0.55,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: isDimmed ? 0.45 : 1,
                          scale: 1,
                          x: 0,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          scale: 0.25,
                          x: item.dxFromCenter * 0.55,
                          y: item.dyFromCenter * 0.55,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 170,
                    damping: 20,
                    delay: 0.22 + idx * 0.06,
                  }}
                  style={{
                    left: `${item.leftPct}%`,
                    top: `${item.topPct}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                >
                  <a
                    href={item.brand.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setHoveredBrandId(item.brand.id)}
                    onMouseLeave={() => setHoveredBrandId(null)}
                    onFocus={() => setHoveredBrandId(item.brand.id)}
                    onBlur={() => setHoveredBrandId(null)}
                    aria-label={`Visit ${item.brand.name} (${item.brand.domain})`}
                    className="group relative flex flex-col items-center focus-visible:outline-none"
                  >
                    {/* Circular Brand Disc */}
                    <div
                      className="w-[104px] h-[104px] rounded-full bg-white flex items-center justify-center p-3.5 shadow-sm transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
                      style={{
                        border: `3px solid ${item.brand.themeColor}`,
                        boxShadow: isHighlighted
                          ? `0 12px 28px -8px ${item.brand.themeColor}66`
                          : undefined,
                      }}
                    >
                      {item.brand.logo && !failedLogos[item.brand.id] ? (
                          <img
                            src={item.brand.logo}
                            alt={item.brand.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() => handleLogoError(item.brand.id)}
                            className={
                              item.brand.id === 'tnews'
                                ? 'w-14 h-14 rounded-full object-contain'
                                : 'max-h-11 max-w-[78px] object-contain'
                            }
                          />
                      ) : (
                        <span
                          className="font-display text-sm font-bold tracking-tight text-center leading-tight"
                          style={{ color: item.brand.themeColor }}
                        >
                          {item.brand.name}
                        </span>
                      )}
                    </div>

                    {/* Clean Unboxed Domain Label Below Circle */}
                    <div className="mt-2 flex items-center gap-0.5 text-[11px] font-mono font-medium text-[#111318] dark:text-[#F3F4F6] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors whitespace-nowrap">
                      <span>{item.brand.domain}</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Tablet Radial Grid Fallback (< lg) */}
          <div key={`mobile-mindmap-${replaySeed}`} className="lg:hidden space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <a
                href="https://www.nationgroup.com"
                target="_blank"
                rel="noreferrer"
                className="w-36 h-36 rounded-full bg-white border-2 border-[#111318] dark:border-white shadow-md dark:shadow-[0_0_32px_rgba(255,255,255,0.16)] flex flex-col items-center justify-center p-4 text-center"
              >
                <img
                  src={assetUrl('/assets/logos/companies/nationgroup.svg')}
                  alt="Nation Group"
                  referrerPolicy="no-referrer"
                  className="h-7 w-auto object-contain"
                />
                <span className="mt-2 text-[11px] font-mono font-bold text-[#111318]">
                  11 Live Brands
                </span>
              </a>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {NATION_BRAND_PLATFORMS.map((brand, idx) => (
                <motion.a
                  key={brand.id}
                  href={brand.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 12 }
                  }
                  transition={{ duration: 0.35, delay: 0.08 + idx * 0.04 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-3 shadow-xs transition-transform group-hover:scale-105"
                    style={{ border: `3px solid ${brand.themeColor}` }}
                  >
                    {brand.logo && !failedLogos[brand.id] ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => handleLogoError(brand.id)}
                        className={
                          brand.id === 'tnews'
                            ? 'w-12 h-12 rounded-full object-contain'
                            : 'max-h-10 max-w-[70px] object-contain'
                        }
                      />
                    ) : (
                      <span
                        className="font-display text-xs font-bold"
                        style={{ color: brand.themeColor }}
                      >
                        {brand.name}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-semibold text-[#111318] dark:text-white">
                    {brand.name}
                  </p>
                  <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF] inline-flex items-center gap-0.5">
                    <span>{brand.domain}</span>
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Truehits.net Traffic Graph (Bar + Line Modes) */}
        <TruehitsTrafficChart />

        {/* Dedicated Annual Awards & High-Concurrency Branch */}
        <div className="space-y-5 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="text-[#1D4ED8] dark:text-[#60A5FA]">
                  Annual Event &amp; High-Concurrency Voting Platforms
                </span>
                <span aria-hidden="true" className="text-[#D1D5DB] dark:text-[#374151]">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#DC2626] dark:text-[#F87171]">
                  <img
                    src={assetUrl('/assets/logos/tech/redis.svg')}
                    alt="Redis"
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>Data &amp; Vote Storage via Redis</span>
                </span>
              </div>
              <h3 className="mt-1 text-2xl font-bold text-[#111318] dark:text-white tracking-tight">
                3 Recurring National Awards Websites
              </h3>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-md">
              High-concurrency voting data stored &amp; cached through Redis, paired with annual
              redesigns and event-window hosting to keep cloud budgets lean.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AWARDS_PLATFORMS.map((award) => (
              <div
                key={award.id}
                className="bg-[#FAFAFA] dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#1D4ED8] dark:text-[#60A5FA]">{award.yearsActive}</span>
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                      {award.availabilityMode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Trophy
                      className="w-4 h-4 shrink-0"
                      style={{ color: award.themeColor }}
                      aria-hidden="true"
                    />
                    <h4 className="text-lg font-semibold text-[#111318] dark:text-white">
                      {award.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#0B0E14] border border-[#E5E7EB] dark:border-[#1E2430]">
                    <img
                      src={assetUrl('/assets/logos/tech/redis.svg')}
                      alt="Redis"
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span className="text-xs font-mono font-semibold text-[#111318] dark:text-white">
                      {award.storageTech}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#4B5563] dark:text-[#9CA3AF]">
                    {award.originNote}
                  </p>

                  <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                    {award.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#1E2430] flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] truncate">
                    {award.domain}
                  </span>
                  <a
                    href={award.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] whitespace-nowrap shrink-0"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
