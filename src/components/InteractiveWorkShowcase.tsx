import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderOpen,
  Maximize2,
  X,
} from 'lucide-react';
import {
  GalleryProjectId,
  PORTFOLIO_GALLERY,
  PortfolioScreenshot,
  PROFILE,
} from '../data/portfolioData';

type GalleryViewMode = 'curated' | 'live-drive';

const DRIVE_FOLDER_ID = '1dt6IHv_iM9z7AVBWC75chEXdhvZCds8h';

const GALLERY_FILTERS: { id: GalleryProjectId; label: string; count: number }[] = [
  { id: 'all', label: 'All Work', count: PORTFOLIO_GALLERY.length },
  {
    id: 'travisgo',
    label: 'TravisGo',
    count: PORTFOLIO_GALLERY.filter((i) => i.project === 'travisgo').length,
  },
  {
    id: 'time',
    label: 'Time Attendance',
    count: PORTFOLIO_GALLERY.filter((i) => i.project === 'time').length,
  },
  {
    id: 'jobonline',
    label: 'Job Portal',
    count: PORTFOLIO_GALLERY.filter((i) => i.project === 'jobonline').length,
  },
  {
    id: 'personal',
    label: 'HR-PMS',
    count: PORTFOLIO_GALLERY.filter((i) => i.project === 'personal').length,
  },
];

// Subtle varied masonry aspect rhythm for a modern editorial showcase
const MASONRY_ASPECT_PATTERN = [
  'aspect-[16/11]',
  'aspect-[4/3]',
  'aspect-[16/10]',
  'aspect-[4/3]',
  'aspect-[16/11]',
  'aspect-[16/9]',
];

export const InteractiveWorkShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<GalleryViewMode>('curated');
  const [galleryFilter, setGalleryFilter] = useState<GalleryProjectId>('all');
  const [showAllInMasonry, setShowAllInMasonry] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [driveLayout, setDriveLayout] = useState<'grid' | 'list'>('grid');

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return PORTFOLIO_GALLERY;
    return PORTFOLIO_GALLERY.filter((item) => item.project === galleryFilter);
  }, [galleryFilter]);

  const visibleGallery = useMemo(() => {
    if (galleryFilter !== 'all' || showAllInMasonry) return filteredGallery;
    const curatedIds = [
      'tg-dashboard',
      'time-dashboard',
      'job-portal',
      'tg-booking-1',
      'pms-1',
      'time-calendar',
      'tg-payment',
      'job-report',
      'pms-2',
    ];
    return curatedIds
      .map((id) => PORTFOLIO_GALLERY.find((item) => item.id === id))
      .filter((item): item is PortfolioScreenshot => Boolean(item));
  }, [filteredGallery, galleryFilter, showAllInMasonry]);

  const activeLightboxItem =
    lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < filteredGallery.length
      ? filteredGallery[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredGallery.length));
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredGallery.length]);

  const openLightboxForItem = (itemId: string) => {
    const idx = filteredGallery.findIndex((item) => item.id === itemId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section
      id="works-gallery"
      className="py-20 lg:py-24 bg-[#FAFAFA] dark:bg-[#090B10] border-t border-[#E5E7EB] dark:border-[#1E2430] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
              05. Real Works Visual Gallery &amp; Live Google Drive Archive
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
              Shipped interfaces across career milestones—visual masonry &amp; live Drive sync.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Portfolio gallery mode"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-[#141821] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'curated'}
              onClick={() => setViewMode('curated')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'curated'
                  ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                  : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              Masonry Showcase ({PORTFOLIO_GALLERY.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'live-drive'}
              onClick={() => setViewMode('live-drive')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'live-drive'
                  ? 'bg-[#111318] dark:bg-[#2563EB] text-white'
                  : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              Live Google Drive Sync
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'curated' ? (
            <motion.div
              key="curated"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Clean Filter Controls + External Drive Action */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div
                  role="tablist"
                  aria-label="Filter gallery by project"
                  className="inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-[#141821] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl self-start"
                >
                  {GALLERY_FILTERS.map((f) => {
                    const active = galleryFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setGalleryFilter(f.id);
                          setLightboxIndex(null);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                          active
                            ? 'bg-[#111318] dark:bg-white text-white dark:text-[#111318] font-semibold'
                            : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                        }`}
                      >
                        {f.label} ({f.count})
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <a
                    href="https://tvg.poysoft.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#111318] dark:text-white hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] whitespace-nowrap transition-colors"
                  >
                    <span>TravisGo Live Frontend</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span aria-hidden="true" className="text-[#D1D5DB] dark:text-[#374151]">
                    ·
                  </span>
                  <a
                    href={PROFILE.archiveDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline whitespace-nowrap"
                  >
                    <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Google Drive Folder</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Modern AI-Era Multi-Column Masonry Visual Showcase with Hover Reveal */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {visibleGallery.map((shot, idx) => {
                  const aspectClass =
                    MASONRY_ASPECT_PATTERN[idx % MASONRY_ASPECT_PATTERN.length];
                  return (
                    <motion.article
                      key={shot.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.24) }}
                      className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] bg-white dark:bg-[#121620] hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => openLightboxForItem(shot.id)}
                        className="relative block w-full text-left focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                      >
                        {/* Edge-to-Edge Media Container */}
                        <div
                          className={`relative w-full ${aspectClass} overflow-hidden bg-[#F3F4F6] dark:bg-[#0B0D12]`}
                        >
                          <img
                            src={shot.src}
                            alt={`${shot.title} — ${shot.organization}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />

                          {/* Subtle Always-Legible Top Gradient + Quiet Index Meta */}
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent flex items-start justify-between px-4 pt-3 text-[11px] font-mono text-white/90">
                            <span className="truncate">
                              {shot.projectLabel} · {shot.year}
                            </span>
                            <Maximize2
                              className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity shrink-0"
                              aria-hidden="true"
                            />
                          </div>

                          {/* Modern Hover / Focus Reveal Contrast Scrim (>= 4.5:1) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5">
                            <div className="translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-200 space-y-1.5">
                              <p className="text-[11px] font-mono text-[#93C5FD]">
                                {shot.organization} · {shot.year}
                              </p>
                              <h3 className="text-base font-bold text-white leading-snug">
                                {shot.title}
                              </h3>
                              <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                                {shot.caption}
                              </p>
                              <p className="pt-2 text-[10px] font-mono text-white/70 truncate border-t border-white/15">
                                {shot.stack}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Minimal Quiet Caption Bar for Touch / Always-Scannable Context */}
                        <div className="px-4 py-3 flex items-center justify-between gap-3 bg-white dark:bg-[#121620] border-t border-[#E5E7EB] dark:border-[#1E2430]">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#111318] dark:text-white truncate">
                              {shot.title}
                            </p>
                            <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF] truncate">
                              {shot.organization}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono text-[#1D4ED8] dark:text-[#60A5FA] shrink-0">
                            Inspect
                          </span>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </div>

              {galleryFilter === 'all' && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E7EB] dark:border-[#1E2430]">
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono tabular-nums">
                    Showing {visibleGallery.length} of {PORTFOLIO_GALLERY.length} local HD screens
                    · Hover any screen to inspect stack &amp; click for fullscreen lightbox
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAllInMasonry((prev) => !prev)}
                    className="px-4 py-2 text-xs font-semibold text-[#111318] dark:text-white bg-white dark:bg-[#141923] border border-[#D1D5DB] dark:border-[#232A38] rounded-lg hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap"
                  >
                    {showAllInMasonry
                      ? 'Show Curated Highlights (9)'
                      : `Expand All ${PORTFOLIO_GALLERY.length} Screens`}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="live-drive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 space-y-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB] dark:border-[#1E2430]">
                <div className="space-y-1 max-w-2xl">
                  <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                    Auto-Synced Google Drive Root Folder
                  </p>
                  <h3 className="text-lg font-semibold text-[#111318] dark:text-white">
                    Live Portfolio Folder (Auto-Updates on New Uploads &amp; Renamed Subfolders)
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                    Connected directly to folder ID{' '}
                    <span className="font-mono text-[#111318] dark:text-white">
                      {DRIVE_FOLDER_ID}
                    </span>
                    . Newly added Awards visuals or renamed folders appear here automatically.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#0B0D12] border border-transparent dark:border-[#232A38] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setDriveLayout('grid')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        driveLayout === 'grid'
                          ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                          : 'text-[#4B5563] dark:text-[#9CA3AF]'
                      }`}
                    >
                      Grid View
                    </button>
                    <button
                      type="button"
                      onClick={() => setDriveLayout('list')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        driveLayout === 'list'
                          ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                          : 'text-[#4B5563] dark:text-[#9CA3AF]'
                      }`}
                    >
                      List View
                    </button>
                  </div>

                  <a
                    href={PROFILE.archiveDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#111318] dark:bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors whitespace-nowrap"
                  >
                    <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open in Drive</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] bg-white">
                <iframe
                  key={driveLayout}
                  src={`https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#${driveLayout}`}
                  title="Voranitha Live Google Drive Works Archive"
                  className="w-full h-[500px] border-0"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen Keyboard-Navigable Screenshot Lightbox */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-6xl w-full bg-[#121620] border border-[#232A38] rounded-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#232A38]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#9CA3AF]">
                  <span className="text-[#60A5FA]">{activeLightboxItem.projectLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeLightboxItem.organization}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </span>
                </div>
                <h3
                  id="gallery-lightbox-title"
                  className="mt-0.5 text-base sm:text-lg font-semibold text-white truncate"
                >
                  {activeLightboxItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
                    )
                  }
                  aria-label="Previous screenshot"
                  className="p-2 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-[#1F2430] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)}
                  aria-label="Next screenshot"
                  className="p-2 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-[#1F2430] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="p-2 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-[#1F2430] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#0B0D12] p-4 sm:p-6 flex items-center justify-center overflow-auto">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[62vh] w-auto object-contain rounded-lg border border-[#232A38]"
              />
            </div>

            <div className="px-5 py-4 border-t border-[#232A38] bg-[#121620] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  {activeLightboxItem.caption}
                </p>
                <span className="text-xs font-mono text-[#9CA3AF] whitespace-nowrap shrink-0">
                  {activeLightboxItem.stack}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {filteredGallery.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`shrink-0 w-20 h-12 rounded-md overflow-hidden border transition-all ${
                      idx === lightboxIndex
                        ? 'border-[#60A5FA] ring-1 ring-[#60A5FA]'
                        : 'border-[#232A38] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
