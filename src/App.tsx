import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import {
  CASE_STUDIES,
  CaseStudy,
  CaseStudyCategory,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE_TIMELINE,
  PROFILE,
  PROOF_METRICS,
} from './data/portfolioData';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { PlatformNetworkMap } from './components/PlatformNetworkMap';
import { AiEngineeringShowcase } from './components/AiEngineeringShowcase';
import { TechProficiencyGraph } from './components/TechProficiencyGraph';
import { InteractiveWorkShowcase } from './components/InteractiveWorkShowcase';
import { CaseStudySchematic } from './components/CaseStudySchematic';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeAndDeployModal, UtilityModalTab } from './components/ResumeAndDeployModal';
import { assetUrl } from './utils/assetUrl';

const FILTER_OPTIONS: { id: CaseStudyCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'ai-data', label: 'AI & Data Pipelines' },
  { id: 'high-traffic', label: 'High-Traffic Web' },
  { id: 'travel-enterprise', label: 'Travel & Enterprise' },
];

const MARQUEE_ITEMS = [
  '11+ High-Traffic News Platforms',
  'n8n + Google Gemini 2.5 Flash SEO Engine',
  'Auth0 Cross-Domain SSO & BigQuery',
  'Power BI Reader Telemetry & LINE OA',
  '3 Annual National Awards Voting Systems',
  'TravisGo Travel-Tech Booking Architecture',
  'Cloudflare WAF, Tunnels & Redis Concurrency',
  '8+ Years Full-Stack & Frontend Leadership',
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [selectedCategory, setSelectedCategory] = useState<CaseStudyCategory>('all');
  const [activeSpotlightId, setActiveSpotlightId] = useState<string>(CASE_STUDIES[0].id);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [utilityModalOpen, setUtilityModalOpen] = useState<boolean>(false);
  const [utilityModalTab, setUtilityModalTab] = useState<UtilityModalTab>('resume');
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore storage errors in restricted iframes
    }
  }, [theme]);

  const filteredStudies = useMemo(() => {
    if (selectedCategory === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((study) => study.category === selectedCategory);
  }, [selectedCategory]);

  const spotlightStudy = useMemo(() => {
    return filteredStudies.find((s) => s.id === activeSpotlightId) ?? filteredStudies[0];
  }, [filteredStudies, activeSpotlightId]);

  const getStudyBrandLogo = (study: CaseStudy): { src: string; alt: string; isSquare?: boolean } | null => {
    if (study.brandLogo) {
      return { src: study.brandLogo, alt: study.organization, isSquare: true };
    }
    if (study.organization.includes('Nation Group')) {
      return { src: assetUrl('/assets/logos/companies/nationgroup.svg'), alt: 'Nation Group' };
    }
    if (study.organization.includes('Dplus')) {
      return { src: assetUrl('/assets/logos/companies/dplus.png'), alt: 'Dplus Intertrade' };
    }
    return null;
  };

  const openUtilityModal = (tab: UtilityModalTab) => {
    setUtilityModalTab(tab);
    setUtilityModalOpen(true);
    setMobileNavOpen(false);
  };

  const handleCopyContact = async (field: 'email' | 'phone', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField((prev) => (prev === field ? null : prev)), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#090B10] text-[#111318] dark:text-[#F3F4F6] transition-colors">
      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 dark:bg-[#090B10]/95 backdrop-blur-xs border-b border-[#E5E7EB] dark:border-[#1E2430] transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-[#111318] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
          >
            {PROFILE.name}
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4B5563] dark:text-[#9CA3AF]"
          >
            <a
              href="#current-work"
              className="hover:text-[#111318] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Current Work
            </a>
            <a
              href="#ai-highlights"
              className="hover:text-[#111318] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              AI Highlights
            </a>
            <a
              href="#tech-stack"
              className="hover:text-[#111318] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Tech Stack
            </a>
            <a
              href="#experience"
              className="hover:text-[#111318] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
            <a
              href="#works-gallery"
              className="hover:text-[#111318] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Works
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openUtilityModal('resume')}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#111318] dark:bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              Resume PDF
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              className="md:hidden p-2.5 text-[#111318] dark:text-white rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#141923] transition-colors"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] dark:border-[#1E2430] bg-white dark:bg-[#0D1017] px-6 py-4 space-y-3">
            <nav className="flex flex-col space-y-2.5 text-sm font-medium text-[#111318] dark:text-white">
              <a href="#current-work" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                Current Work
              </a>
              <a href="#ai-highlights" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                AI Highlights
              </a>
              <a href="#tech-stack" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                Tech Stack
              </a>
              <a href="#experience" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                Experience
              </a>
              <a href="#works-gallery" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                Works Gallery
              </a>
              <a href="#contact" onClick={() => setMobileNavOpen(false)} className="py-1.5">
                Contact
              </a>
            </nav>
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#1E2430]">
              <button
                type="button"
                onClick={() => openUtilityModal('resume')}
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#111318] dark:bg-[#2563EB] rounded-lg"
              >
                View Resume PDF (V2)
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Section with Above-the-Fold Theme Switcher + Interactive Production Blueprints */}
        <section
          id="architecture"
          className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-8 pb-16 lg:pt-12 lg:pb-20"
        >
          {/* Hero Utility Bar: Role Kicker with Nation Group Logo + Light / Dark Theme Switch */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E5E7EB] dark:border-[#1E2430]">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.nationgroup.com"
                target="_blank"
                rel="noreferrer"
                title="Nation Group (Thailand) Public Co., Ltd."
                className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#1D4ED8] transition-colors shrink-0"
              >
                <img
                  src={assetUrl('/assets/logos/companies/nationgroup.svg')}
                  alt="Nation Group"
                  className="h-4.5 w-auto object-contain"
                />
              </a>
              <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA] tracking-tight">
                Lead Frontend Developer · {PROFILE.targetRoles} · {PROFILE.location}
              </p>
            </div>

            {/* Accessible Segmented Light / Dark Switch */}
            <div
              role="group"
              aria-label="Color theme switch"
              className="inline-flex items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-lg"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  theme === 'light'
                    ? 'bg-white text-[#111318] shadow-xs'
                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  theme === 'dark'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Lead Frontend Positioning */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold text-[#111318] dark:text-white leading-[1.06] tracking-tight text-balance">
                  Leading high-scale web platforms &amp; production AI engineering.
                </h1>

                <p className="mt-6 text-[15px] sm:text-base text-[#374151] dark:text-[#D1D5DB] leading-[1.68] max-w-[60ch]">
                  {PROFILE.summary}
                </p>

                <div className="mt-7 pt-6 border-t border-[#E5E7EB] dark:border-[#1E2430] space-y-2.5 text-sm text-[#4B5563] dark:text-[#9CA3AF]">
                  <p>
                    <span className="font-semibold text-[#111318] dark:text-white">Current Leadership: </span>
                    11+ news portals &amp; 3 annual awards systems at Nation Group (5y 5m)
                  </p>
                  <p>
                    <span className="font-semibold text-[#111318] dark:text-white">Production AI: </span>
                    Morning Brief n8n + Gemini 2.5 Flash SEO engine, Auth0 SSO → BigQuery/Power BI → LINE OA
                  </p>
                  <p>
                    <span className="font-semibold text-[#111318] dark:text-white">Prior Travel-Tech: </span>
                    Modular React/Redux booking UIs for boats, hotels &amp; flights (TravisGo)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#current-work"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  Explore 11+ Live Platforms
                </a>
                <a
                  href="#ai-highlights"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inspect AI Pipelines</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Architecture Explorer */}
            <div className="lg:col-span-7">
              <ArchitectureExplorer />
            </div>
          </div>

          {/* Full-Width 4-Column Proof Strip Directly Below Hero Split */}
          <div className="mt-14 pt-8 border-t border-[#E5E7EB] dark:border-[#1E2430] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight tabular-nums">
                  {metric.value}
                </p>
                <p className="text-sm font-semibold text-[#111318] dark:text-white">
                  {metric.label}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  {metric.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="border-t border-[#E5E7EB] dark:border-[#1E2430] bg-white dark:bg-[#0D1017] py-3.5 overflow-hidden select-none transition-colors"
        >
          <div className="flex w-max animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap flex items-center"
              >
                <span className="px-6">{item}</span>
                <span className="text-[#D1D5DB] dark:text-[#374151]">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 01: Current Lead Frontend Work — Animated 11-Brand Git-Branch Map & 3 Annual Awards */}
        <PlatformNetworkMap />

        {/* SECTION 02: Production AI Engineering Highlights (Morning Brief n8n V5.0 + Personalization & Power BI Proof) */}
        <AiEngineeringShowcase />

        {/* SECTION 03: End-to-End Technical Proficiency Graph */}
        <TechProficiencyGraph />

        {/* SECTION 04A: Selected Engineering Case Studies (Featured Spotlight + Project Selector List) */}
        <section
          id="case-studies"
          className="py-20 lg:py-24 bg-white dark:bg-[#0D1017] border-t border-[#E5E7EB] dark:border-[#1E2430] transition-colors"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E5E7EB] dark:border-[#1E2430]">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                  04. Architecture Deep-Dives &amp; Case Studies
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
                  End-to-end delivery across AI automation, media scale &amp; travel-tech.
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Filter case studies by engineering domain"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#141923] border border-transparent dark:border-[#232A38] rounded-lg self-start lg:self-auto"
              >
                {FILTER_OPTIONS.map((option) => {
                  const isActive = selectedCategory === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(option.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                        isActive
                          ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                          : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {spotlightStudy && (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Numbered Interactive Project Selector List */}
                <div
                  role="listbox"
                  aria-label="Select a case study to spotlight"
                  className="lg:col-span-5 divide-y divide-[#E5E7EB] dark:divide-[#1E2430] border-t border-b border-[#E5E7EB] dark:border-[#1E2430]"
                >
                  {filteredStudies.map((study, idx) => {
                    const isSelected = study.id === spotlightStudy.id;
                    const indexLabel = String(idx + 1).padStart(2, '0');
                    const logoMeta = getStudyBrandLogo(study);

                    return (
                      <button
                        key={study.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => setActiveSpotlightId(study.id)}
                        className={`w-full text-left px-4 py-4 sm:px-5 sm:py-5 transition-colors flex items-start justify-between gap-4 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1D4ED8] ${
                          isSelected
                            ? 'bg-[#F8FAFC] dark:bg-[#121722]'
                            : 'hover:bg-[#FAFAFA] dark:hover:bg-[#10141D]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <span
                            className={`text-xs font-mono font-semibold pt-0.5 tabular-nums shrink-0 ${
                              isSelected
                                ? 'text-[#1D4ED8] dark:text-[#60A5FA]'
                                : 'text-[#9CA3AF] dark:text-[#6B7280]'
                            }`}
                          >
                            {indexLabel}
                          </span>

                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                              <span
                                className={
                                  isSelected
                                    ? 'text-[#1D4ED8] dark:text-[#60A5FA] font-medium'
                                    : ''
                                }
                              >
                                {study.categoryLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">{study.year}</span>
                            </div>

                            <h3
                              className={`text-[15px] sm:text-base font-semibold leading-snug tracking-tight transition-colors ${
                                isSelected
                                  ? 'text-[#111318] dark:text-white'
                                  : 'text-[#374151] dark:text-[#D1D5DB]'
                              }`}
                            >
                              {study.title}
                            </h3>

                            <div className="flex items-center gap-2 pt-0.5">
                              {logoMeta && (
                                <span
                                  className={`inline-flex items-center justify-center rounded border border-[#E5E7EB] dark:border-[#232A38] shrink-0 overflow-hidden ${
                                    logoMeta.isSquare ? 'w-5 h-5' : 'h-5 px-1.5 bg-white'
                                  }`}
                                >
                                  <img
                                    src={logoMeta.src}
                                    alt={logoMeta.alt}
                                    loading="lazy"
                                    className={
                                      logoMeta.isSquare
                                        ? 'w-full h-full object-cover'
                                        : 'max-h-3 max-w-[68px] object-contain'
                                    }
                                  />
                                </span>
                              )}
                              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] truncate">
                                {study.organization}
                              </span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 mt-1 shrink-0 transition-transform ${
                            isSelected
                              ? 'text-[#1D4ED8] dark:text-[#60A5FA] translate-x-0.5'
                              : 'text-[#D1D5DB] dark:text-[#374151]'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Featured Spotlight Stage */}
                <div className="lg:col-span-7 lg:sticky lg:top-24">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={spotlightStudy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="bg-[#FAFAFA] dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl overflow-hidden"
                    >
                      {/* Spotlight Top Bar */}
                      <div className="px-6 py-4 bg-white dark:bg-[#0F131C] border-b border-[#E5E7EB] dark:border-[#1E2430] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {(() => {
                            const logoMeta = getStudyBrandLogo(spotlightStudy);
                            if (!logoMeta) return null;
                            return (
                              <span
                                className={`inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] shrink-0 overflow-hidden ${
                                  logoMeta.isSquare
                                    ? 'w-9 h-9'
                                    : 'h-9 px-2.5 bg-white'
                                }`}
                              >
                                <img
                                  src={logoMeta.src}
                                  alt={logoMeta.alt}
                                  className={
                                    logoMeta.isSquare
                                      ? 'w-full h-full object-cover'
                                      : 'max-h-5 max-w-[100px] object-contain'
                                  }
                                />
                              </span>
                            );
                          })()}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#111318] dark:text-white truncate">
                              {spotlightStudy.organization}
                            </p>
                            <p className="text-[11px] font-mono text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                              {spotlightStudy.categoryLabel} · {spotlightStudy.year}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveCaseStudy(spotlightStudy)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#111318] dark:bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>Inspect Full System</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Spotlight Visual Stage */}
                      <div className="p-6 space-y-6">
                        {spotlightStudy.previewImage ? (
                          <button
                            type="button"
                            onClick={() => setActiveCaseStudy(spotlightStudy)}
                            className="group relative block w-full rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] bg-white dark:bg-[#0B0D12] focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                          >
                            <img
                              src={spotlightStudy.previewImage}
                              alt={`${spotlightStudy.title} production interface screenshot`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-60 sm:h-72 object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                            />
                            <span className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-mono font-medium text-white bg-[#090B10]/80 backdrop-blur-xs rounded-md">
                              Click to expand architecture &amp; gallery
                            </span>
                          </button>
                        ) : (
                          <div
                            onClick={() => setActiveCaseStudy(spotlightStudy)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setActiveCaseStudy(spotlightStudy);
                              }
                            }}
                            className="cursor-pointer rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                          >
                            <CaseStudySchematic type={spotlightStudy.schematicType} compact={false} />
                          </div>
                        )}

                        {/* Spotlight Editorial Narrative */}
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
                            {spotlightStudy.title}
                          </h3>
                          <p className="text-[15px] text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                            {spotlightStudy.summary}
                          </p>
                        </div>

                        {/* Key Production Outcomes */}
                        <div className="pt-5 border-t border-[#E5E7EB] dark:border-[#1E2430] space-y-2.5">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                            Key Production Outcomes
                          </p>
                          <ul className="space-y-2">
                            {spotlightStudy.outcomes.slice(0, 3).map((outcome) => (
                              <li
                                key={outcome}
                                className="flex items-start gap-2.5 text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed"
                              >
                                <CheckCircle2
                                  className="w-4 h-4 mt-0.5 text-[#1D4ED8] dark:text-[#60A5FA] shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Stack & Live Links Footer */}
                        <div className="pt-5 border-t border-[#E5E7EB] dark:border-[#1E2430] space-y-4">
                          <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                            <span className="text-[#111318] dark:text-white font-semibold">
                              Stack:{' '}
                            </span>
                            {spotlightStudy.stack.join(' · ')}
                          </p>

                          {spotlightStudy.links && spotlightStudy.links.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3">
                              {spotlightStudy.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-white bg-white dark:bg-[#181D29] border border-[#E5E7EB] dark:border-[#2A3346] rounded-lg hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors"
                                >
                                  <span>{link.label}</span>
                                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 04B: 8+ Year Career Trajectory (With Real Company Logos) & Certifications */}
        <section
          id="experience"
          className="py-20 lg:py-24 bg-white dark:bg-[#0D1017] border-t border-[#E5E7EB] dark:border-[#1E2430] transition-colors"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl pb-12 border-b border-[#E5E7EB] dark:border-[#1E2430]">
              <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                Career Trajectory · 8+ Years Full-Stack &amp; Frontend Leadership
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
                From engineering intern to Lead Frontend Developer promoted within 1 year.
              </h2>
            </div>

            <div className="divide-y divide-[#E5E7EB] dark:divide-[#1E2430]">
              {EXPERIENCE_TIMELINE.map((item) => (
                <div
                  key={item.id}
                  className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                >
                  {/* Left Meta & Company Logo Column */}
                  <div className="lg:col-span-4 space-y-3">
                    {item.companyLogos && item.companyLogos.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 pb-1">
                        {item.companyLogos.map((logo) => {
                          const isTravisGo = logo.alt === 'TravisGo';
                          return (
                            <a
                              key={logo.alt}
                              href={logo.url}
                              target="_blank"
                              rel="noreferrer"
                              title={isTravisGo ? 'TravisGo Live Frontend (tvg.poysoft.com)' : logo.alt}
                              className={
                                isTravisGo
                                  ? 'h-11 w-11 rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] flex items-center justify-center hover:border-[#1D4ED8] transition-colors shrink-0'
                                  : 'h-10 px-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center hover:border-[#1D4ED8] transition-colors'
                              }
                            >
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className={
                                  isTravisGo
                                    ? 'w-full h-full object-cover'
                                    : 'max-h-6 max-w-[130px] object-contain'
                                }
                              />
                            </a>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] tabular-nums">
                      <span>{item.period}</span>
                      {item.tenureBadge && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-medium">
                            {item.tenureBadge}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-[#111318] dark:text-white tracking-tight">
                      {item.role}
                    </h3>

                    <div>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#374151] dark:text-[#D1D5DB] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA]"
                        >
                          <span>{item.company}</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">
                          {item.company}
                        </p>
                      )}
                      {item.subsidiaryNote && (
                        <p className="mt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          {item.subsidiaryNote}
                        </p>
                      )}
                    </div>

                    {item.progressionNote && (
                      <p className="pt-1 text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA] leading-relaxed">
                        {item.progressionNote}
                      </p>
                    )}

                    {item.archiveNote && (
                      <div className="pt-1">
                        <a
                          href="#works-gallery"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline"
                        >
                          <span>{item.archiveNote}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Details & Exact Tech Stack Column */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-5">
                      {item.highlights.map((hl) => (
                        <div key={hl.title} className="space-y-1">
                          <h4 className="text-[15px] font-semibold text-[#111318] dark:text-white">
                            {hl.title}
                          </h4>
                          <p className="text-[15px] text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                            {hl.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#1E2430]">
                      <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                        <span className="text-[#111318] dark:text-white font-semibold">Stack: </span>
                        {item.techStack.join(' · ')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Education Adjacent Block */}
            <div className="mt-12 pt-12 border-t border-[#E5E7EB] dark:border-[#1E2430] grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <h3 className="text-xl font-semibold text-[#111318] dark:text-white tracking-tight">
                  AI, Cloud &amp; Technical SEO Certifications
                </h3>
                <div className="mt-5 divide-y divide-[#E5E7EB] dark:divide-[#1E2430] border-t border-b border-[#E5E7EB] dark:border-[#1E2430]">
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.title}
                      className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <div>
                        <p className="text-[15px] font-semibold text-[#111318] dark:text-white">
                          {cert.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          {cert.issuer} · {cert.focus}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums whitespace-nowrap shrink-0">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-[#FAFAFA] dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                      Education &amp; National Recognition
                    </p>
                    <h3 className="text-lg font-semibold text-[#111318] dark:text-white">
                      {EDUCATION.degree}
                    </h3>
                    <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB]">
                      {EDUCATION.institution} · Graduated{' '}
                      <span className="font-mono tabular-nums">{EDUCATION.graduationYear}</span> ·
                      GPA <span className="font-mono tabular-nums">{EDUCATION.gpa}</span>
                    </p>
                  </div>
                  <p className="pt-4 border-t border-[#E5E7EB] dark:border-[#1E2430] text-xs text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
                    {EDUCATION.award}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: Real Works Visual Gallery (17 HD Screens + Live Google Drive Sync) */}
        <InteractiveWorkShowcase />

        {/* SECTION 06: Direct Contact */}
        <section
          id="contact"
          className="bg-white dark:bg-[#0D1017] border-t border-[#E5E7EB] dark:border-[#1E2430] py-20 lg:py-24 transition-colors"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                  06. Direct Contact
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
                  Ready for Frontend AI &amp; Full-Stack AI engineering conversations.
                </h2>
                <p className="text-[15px] text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed max-w-[54ch]">
                  Based in Greater Bangkok ({PROFILE.location}). Happy to walk through live system
                  architectures, n8n/Gemini workflows, and Core Web Vitals optimization in technical
                  interviews.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openUtilityModal('resume')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Preview &amp; Download Resume V2 (PDF)</span>
                  </button>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#111318] dark:text-white border border-[#D1D5DB] dark:border-[#232A38] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#141923] transition-colors whitespace-nowrap"
                  >
                    <span>Send Email</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 divide-y divide-[#E5E7EB] dark:divide-[#1E2430] border-t border-b border-[#E5E7EB] dark:border-[#1E2430]">
                <div className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">Email</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm sm:text-base font-medium text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] break-all"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyContact('email', PROFILE.email)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#374151] dark:text-[#D1D5DB] bg-[#FAFAFA] dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-lg hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">Phone</p>
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-medium text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] font-mono tabular-nums"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyContact('phone', PROFILE.phone)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#374151] dark:text-[#D1D5DB] bg-[#FAFAFA] dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-lg hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href={PROFILE.archiveDriveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors"
                    >
                      <span>Google Drive Works</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E5E7EB] dark:border-[#1E2430] bg-[#FAFAFA] dark:bg-[#090B10] transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
            <button
              type="button"
              onClick={() => openUtilityModal('resume')}
              className="hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Resume PDF (V2)
            </button>
            <button
              type="button"
              onClick={() => openUtilityModal('vercel-kit')}
              className="hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Vercel &amp; CV Link Kit
            </button>
          </div>
        </div>
      </footer>

      {/* Case Study Lightbox Modal */}
      <CaseStudyModal study={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />

      {/* Resume PDF Viewer & Vercel CV Link Kit Modal */}
      <ResumeAndDeployModal
        open={utilityModalOpen}
        initialTab={utilityModalTab}
        onClose={() => setUtilityModalOpen(false)}
      />
    </div>
  );
}
