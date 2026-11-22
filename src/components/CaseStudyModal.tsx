import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';
import { CaseStudySchematic } from './CaseStudySchematic';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [study?.id]);

  useEffect(() => {
    if (!study) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  const hasGallery = Boolean(study.galleryImages && study.galleryImages.length > 0);
  const activeGalleryImg = hasGallery
    ? study.galleryImages![activeImageIdx] ?? study.galleryImages![0]
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 bg-white/95 dark:bg-[#121620]/95 backdrop-blur-xs border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
              <span className="text-[#1D4ED8] dark:text-[#60A5FA]">{study.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{study.year}</span>
              <span aria-hidden="true">·</span>
              <span>{study.organization}</span>
            </div>
            <h2
              id="case-study-modal-title"
              className="mt-1 text-xl sm:text-2xl font-semibold text-[#111318] dark:text-white tracking-tight text-balance"
            >
              {study.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study details"
            className="p-2.5 rounded-lg text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1E2430] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {hasGallery && activeGalleryImg ? (
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] bg-[#F4F5F7] dark:bg-[#0B0D12]">
                <img
                  src={activeGalleryImg.src}
                  alt={activeGalleryImg.caption}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[420px] object-contain bg-[#0B0D12]"
                />
                <div className="px-4 py-2.5 bg-white dark:bg-[#141923] border-t border-[#E5E7EB] dark:border-[#232A38] flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-[#111318] dark:text-white">
                    {activeGalleryImg.caption}
                  </span>
                  <span className="font-mono text-[#6B7280] dark:text-[#9CA3AF] tabular-nums shrink-0">
                    {activeImageIdx + 1} / {study.galleryImages!.length}
                  </span>
                </div>
              </div>
              {study.galleryImages!.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {study.galleryImages!.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`shrink-0 w-24 h-14 rounded-lg overflow-hidden border transition-all ${
                        idx === activeImageIdx
                          ? 'border-[#1D4ED8] dark:border-[#60A5FA] ring-1 ring-[#1D4ED8] dark:ring-[#60A5FA]'
                          : 'border-[#E5E7EB] dark:border-[#232A38] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <CaseStudySchematic type={study.schematicType} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-[#111318] dark:text-white">Problem Context</h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-[15px] text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
                {study.challenge}
              </p>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] dark:border-[#1E2430] pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                Architecture &amp; Execution
              </h3>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-3">
                {study.architecture.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-[15px] text-[#374151] dark:text-[#D1D5DB] leading-relaxed flex gap-3"
                  >
                    <span className="font-mono text-xs text-[#1D4ED8] dark:text-[#60A5FA] pt-1 tabular-nums shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] dark:border-[#1E2430] pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                Measured Outcomes
              </h3>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-2.5">
                {study.outcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="text-[15px] text-[#111318] dark:text-[#F3F4F6] leading-relaxed flex gap-3"
                  >
                    <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-semibold shrink-0">
                      —
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] dark:border-[#1E2430] pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                Technology Stack
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-sm font-mono text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                {study.stack.join('  /  ')}
              </p>
            </div>
          </div>

          {study.links && study.links.length > 0 && (
            <div className="border-t border-[#E5E7EB] dark:border-[#1E2430] pt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                Live Production &amp; Architecture Links
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {study.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline whitespace-nowrap"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
