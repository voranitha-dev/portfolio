import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export type UtilityModalTab = 'resume' | 'vercel-kit';

interface ResumeAndDeployModalProps {
  open: boolean;
  initialTab: UtilityModalTab;
  onClose: () => void;
}

export const ResumeAndDeployModal: React.FC<ResumeAndDeployModalProps> = ({
  open,
  initialTab,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<UtilityModalTab>(initialTab);
  const [vercelUrl, setVercelUrl] = useState<string>('https://voranitha-dev.github.io/portfolio/');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, open]);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  const cleanUrl = vercelUrl.trim() || 'https://voranitha-dev.github.io/portfolio/';

  const resumeHeaderSnippet = `VORANITHA CHANGDUONG
${PROFILE.email} | Samutprakan, Thailand | ${PROFILE.phone}
Portfolio: ${cleanUrl}
LinkedIn: ${PROFILE.linkedin} | GitHub: ${PROFILE.github}`;

  const agodaCoverSnippet = `Interactive Lead Frontend & AI Portfolio: ${cleanUrl}
Works Archive (Google Drive): ${PROFILE.archiveDriveUrl}`;

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-utility-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-[#E5E7EB] dark:border-[#1E2430] bg-white dark:bg-[#121620]">
          <div className="flex flex-wrap items-center gap-4">
            <h2
              id="resume-utility-modal-title"
              className="text-lg font-semibold text-[#111318] dark:text-white tracking-tight"
            >
              {activeTab === 'resume' ? 'Curriculum Vitae — Version 2 (Agoda)' : 'GitHub Pages, Vercel & CV Link Kit'}
            </h2>
            <div
              className="flex items-center gap-1 p-1 bg-[#F3F4F6] dark:bg-[#0B0D12] border border-transparent dark:border-[#1E2430] rounded-lg"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'resume'}
                onClick={() => setActiveTab('resume')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'resume'
                    ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                    : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                }`}
              >
                Resume PDF (V2)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'vercel-kit'}
                onClick={() => setActiveTab('vercel-kit')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'vercel-kit'
                    ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                    : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                }`}
              >
                Deploy &amp; CV Kit
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-lg text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1E2430] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'resume' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#FAFAFA] dark:bg-[#0E1119] border-b border-[#E5E7EB] dark:border-[#1E2430]">
              <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF] font-mono">
                CV_-_Frontend_AI_Engineer__Agoda__Version_2.pdf · 8+ Years Experience
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.resumePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-white border border-[#D1D5DB] dark:border-[#232A38] rounded-lg hover:bg-white dark:hover:bg-[#141923] transition-colors whitespace-nowrap"
                >
                  <span>Open in New Tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.resumePdfUrl}
                  download="Voranitha_Changduong_CV_Frontend_AI_Agoda_V2.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
            <div className="flex-1 bg-[#F3F4F6] dark:bg-[#0B0D12] min-h-[60vh]">
              <iframe
                src={PROFILE.resumePdfUrl}
                title="Voranitha Changduong Resume PDF Version 2"
                className="w-full h-[65vh] border-0"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            <div>
              <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                Ready for GitHub Pages Auto-Deploy &amp; Vercel
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[#111318] dark:text-white">
                ขั้นตอน Deploy ขึ้น GitHub Pages / Vercel และใส่ลิงก์กลับใน Resume
              </h3>
              <p className="mt-2 text-sm text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                โปรเจกต์นี้ตั้งค่า <span className="font-mono text-[#111318] dark:text-white">.github/workflows/deploy.yml</span> (สำหรับ GitHub Pages) และ <span className="font-mono text-[#111318] dark:text-white">vercel.json</span> พร้อม path รูปภาพ โลโก้ และไฟล์ Resume V2 ครบถ้วนแล้ว
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-[#E5E7EB] dark:border-[#1E2430] py-6">
              <div>
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">Step 01</p>
                <p className="mt-1 text-sm font-semibold text-[#111318] dark:text-white">
                  Push ขึ้น GitHub Repo
                </p>
                <p className="mt-1.5 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                  Push โค้ดขึ้น <span className="font-mono">voranitha-dev/portfolio</span> (branch <span className="font-mono">main</span>)
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">Step 02</p>
                <p className="mt-1 text-sm font-semibold text-[#111318] dark:text-white">
                  เปิด GitHub Pages (Actions)
                </p>
                <p className="mt-1.5 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                  ไปที่ Repo → Settings → Pages → เลือก Source เป็น <span className="font-mono">GitHub Actions</span> แล้วระบบจะ Build อัตโนมัติทันที
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">Step 03</p>
                <p className="mt-1 text-sm font-semibold text-[#111318] dark:text-white">
                  นำ URL ใส่หัว Resume V2
                </p>
                <p className="mt-1.5 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                  นำลิงก์ <span className="font-mono">voranitha-dev.github.io/portfolio/</span> หรือ Vercel URL คัดลอกไปวางใน CV ได้เลย
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="vercel-url-input"
                  className="block text-sm font-medium text-[#111318] dark:text-white"
                >
                  Your Deployed Portfolio URL (GitHub Pages / Vercel)
                </label>
                <input
                  id="vercel-url-input"
                  type="url"
                  value={vercelUrl}
                  onChange={(e) => setVercelUrl(e.target.value)}
                  placeholder="https://voranitha-dev.github.io/portfolio/"
                  className="mt-2 w-full px-3.5 py-2.5 text-sm font-mono bg-[#FAFAFA] dark:bg-[#0B0D12] border border-[#D1D5DB] dark:border-[#232A38] rounded-lg text-[#111318] dark:text-white focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#60A5FA]"
                />
              </div>

              <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E1119] border border-[#E5E7EB] dark:border-[#1E2430] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#111318] dark:text-white">
                    Resume Header Block (พร้อมใส่แทนบรรทัดบนสุดของ CV)
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy('header', resumeHeaderSnippet)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-white bg-white dark:bg-[#141923] border border-[#D1D5DB] dark:border-[#232A38] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#1E2430] transition-colors whitespace-nowrap"
                  >
                    {copiedId === 'header' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Block</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-[#374151] dark:text-[#D1D5DB] whitespace-pre-wrap leading-relaxed">
                  {resumeHeaderSnippet}
                </pre>
              </div>

              <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E1119] border border-[#E5E7EB] dark:border-[#1E2430] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#111318] dark:text-white">
                    Agoda Application Form / Cover Note Links
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy('agoda', agodaCoverSnippet)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-white bg-white dark:bg-[#141923] border border-[#D1D5DB] dark:border-[#232A38] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#1E2430] transition-colors whitespace-nowrap"
                  >
                    {copiedId === 'agoda' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Links</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-[#374151] dark:text-[#D1D5DB] whitespace-pre-wrap leading-relaxed">
                  {agodaCoverSnippet}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
