import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { TECH_PROFICIENCY_LAYERS } from '../data/portfolioData';

export const TechProficiencyGraph: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(TECH_PROFICIENCY_LAYERS[0].id);

  const activeLayer =
    TECH_PROFICIENCY_LAYERS.find((l) => l.id === selectedLayerId) ?? TECH_PROFICIENCY_LAYERS[0];

  return (
    <section
      id="tech-stack"
      className="py-20 lg:py-24 bg-[#FAFAFA] dark:bg-[#090B10] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
              03. End-to-End Engineering Capabilities &amp; Stack
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
              Full-stack capability from browser rendering to AI orchestration &amp; multi-cloud ops.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
            Select any layer to see what I build &amp; the tools used in production
          </p>
        </div>

        {/* Animated End-to-End 5-Layer Stepper */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 pointer-events-none">
            <svg
              viewBox="0 0 1000 12"
              className="w-full h-3"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="6"
                x2="1000"
                y2="6"
                stroke="currentColor"
                className="text-[#D1D5DB] dark:text-[#232A38]"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="6"
                x2="1000"
                y2="6"
                stroke="#2563EB"
                strokeWidth="2.5"
                className="animate-git-flow"
              />
            </svg>
          </div>

          <div
            role="tablist"
            aria-label="End-to-end engineering layers"
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {TECH_PROFICIENCY_LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                    isSelected
                      ? 'bg-[#111318] dark:bg-[#2563EB] border-[#111318] dark:border-[#2563EB] text-white shadow-sm'
                      : 'bg-white dark:bg-[#121620] border-[#E5E7EB] dark:border-[#232A38] text-[#111318] dark:text-white hover:border-[#9CA3AF] dark:hover:border-[#374151]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span
                      className={
                        isSelected
                          ? 'text-[#93C5FD] dark:text-white/80'
                          : 'text-[#1D4ED8] dark:text-[#60A5FA]'
                      }
                    >
                      {layer.stage}
                    </span>
                    <span
                      className={`tabular-nums ${
                        isSelected ? 'text-[#D1D5DB]' : 'text-[#6B7280] dark:text-[#9CA3AF]'
                      }`}
                    >
                      {layer.brands.length} tools
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">{layer.shortTitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Layer: Capabilities (What I Can Do) + Tech Brand Logos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left 6 Cols: Concrete Production Capabilities */}
            <div className="lg:col-span-6 bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 lg:p-8 flex flex-col justify-between gap-6">
              <div className="pb-4 border-b border-[#E5E7EB] dark:border-[#1E2430]">
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                  {activeLayer.stage} · {activeLayer.title}
                </p>
                <p className="mt-1.5 text-sm text-[#4B5563] dark:text-[#D1D5DB]">
                  {activeLayer.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {activeLayer.capabilities.map((cap, idx) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.04 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#0B0E14] border border-[#E5E7EB]/80 dark:border-[#1E2430]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                        {cap.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Real Tech Brand Logos Grid */}
            <div className="lg:col-span-6 bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 lg:p-8 flex flex-col gap-6">
              <div className="pb-4 border-b border-[#E5E7EB] dark:border-[#1E2430] flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                    Production Tech Brands
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#111318] dark:text-white">
                    Tools &amp; Platforms in {activeLayer.shortTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] tabular-nums">
                  {activeLayer.brands.length} Brands
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {activeLayer.brands.map((brand, idx) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22, delay: idx * 0.03 }}
                    className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#0B0E14] border border-[#E5E7EB] dark:border-[#1E2430] hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] transition-colors flex flex-col items-center text-center gap-2.5"
                  >
                    {/* Pure White Brand Emblem Tile so all official SVG logos stay crisp in Light & Dark modes */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs flex items-center justify-center p-2.5">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-[#111318] dark:text-white">
                        {brand.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                        {brand.usage}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
