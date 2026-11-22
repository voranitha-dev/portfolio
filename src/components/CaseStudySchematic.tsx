import React from 'react';
import { CaseStudy } from '../data/portfolioData';

interface CaseStudySchematicProps {
  type: CaseStudy['schematicType'];
  compact?: boolean;
}

export const CaseStudySchematic: React.FC<CaseStudySchematicProps> = ({ type, compact = false }) => {
  const heightClass = compact ? 'h-44' : 'h-56';

  if (type === 'sso-personalization') {
    return (
      <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 560 190" className="w-full h-full" role="img" aria-label="Cross-Domain Auth0 SSO to BigQuery and LINE OA AI Personalization architecture">
          <defs>
            <pattern id="grid-sso" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="560" height="190" fill="url(#grid-sso)" />

          {/* Left: 10 Domains */}
          <rect x="18" y="28" width="114" height="134" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="30" y="48" fontSize="10" fontWeight="600" fill="#111318" fontFamily="JetBrains Mono, monospace">10 MEDIA SITES</text>
          <text x="30" y="68" fontSize="9.5" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">bangkokbiznews</text>
          <text x="30" y="84" fontSize="9.5" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">thansettakij</text>
          <text x="30" y="100" fontSize="9.5" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">nationthailand</text>
          <text x="30" y="116" fontSize="9.5" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">posttoday · +6</text>
          <line x1="30" y1="130" x2="120" y2="130" stroke="#E5E7EB" strokeWidth="1" />
          <text x="30" y="147" fontSize="9" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">Auth0 SSO</text>

          {/* Arrow 1 */}
          <path d="M 132 95 L 166 95" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="166,91 174,95 166,99" fill="#1D4ED8" />

          {/* Middle Top: BigQuery */}
          <rect x="176" y="28" width="144" height="58" rx="8" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.4" />
          <text x="190" y="51" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Google BigQuery</text>
          <text x="190" y="68" fontSize="9" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Behavioral Event Stream</text>

          {/* Middle Bottom: MongoDB */}
          <rect x="176" y="104" width="144" height="58" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="190" y="127" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">MongoDB Profiles</text>
          <text x="190" y="144" fontSize="9" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Reader Graph & Affinity</text>

          {/* Arrows to AI Engine */}
          <path d="M 320 57 L 354 84" stroke="#6B7280" strokeWidth="1.3" />
          <path d="M 320 133 L 354 106" stroke="#6B7280" strokeWidth="1.3" />

          {/* Right: AI Curation -> LINE OA */}
          <rect x="356" y="34" width="186" height="52" rx="8" fill="#111318" />
          <text x="370" y="56" fontSize="10.5" fontWeight="600" fill="#FFFFFF" fontFamily="Bricolage Grotesque, sans-serif">AI Curation Pipeline</text>
          <text x="370" y="72" fontSize="9" fill="#9CA3AF" fontFamily="JetBrains Mono, monospace">Personalized Story Ranking</text>

          <path d="M 449 86 L 449 108" stroke="#1D4ED8" strokeWidth="1.5" />
          <polygon points="445,108 449,116 453,108" fill="#1D4ED8" />

          <rect x="356" y="118" width="186" height="44" rx="8" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.4" />
          <text x="370" y="138" fontSize="10" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">LINE OA Webhooks</text>
          <text x="370" y="152" fontSize="8.8" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">Tailored Reader Delivery</text>
        </svg>
      </div>
    );
  }

  if (type === 'ai-newsroom') {
    return (
      <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 560 190" className="w-full h-full" role="img" aria-label="Python Multi-Agent LLM News Drafting and SEO Pipeline">
          <defs>
            <pattern id="grid-ai" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="560" height="190" fill="url(#grid-ai)" />

          {/* Step 1 */}
          <rect x="18" y="54" width="110" height="82" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="30" y="76" fontSize="9" fill="#6B7280" fontFamily="JetBrains Mono, monospace">INPUT</text>
          <text x="30" y="96" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Source Brief</text>
          <text x="30" y="114" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Press / Context</text>

          <path d="M 128 95 L 158 95" stroke="#1D4ED8" strokeWidth="1.5" />
          <polygon points="158,91 166,95 158,99" fill="#1D4ED8" />

          {/* Center Multi-Agent Container */}
          <rect x="168" y="22" width="222" height="146" rx="10" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.4" />
          <text x="182" y="42" fontSize="9.5" fontWeight="600" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">PYTHON MULTI-AGENT ENGINE</text>

          <rect x="182" y="54" width="194" height="44" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
          <text x="192" y="73" fontSize="10" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Drafting Agent (Gemini / OpenAI)</text>
          <text x="192" y="88" fontSize="8.8" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Structured lead · Fact grounding</text>

          <rect x="182" y="108" width="194" height="44" rx="6" fill="#111318" />
          <text x="192" y="127" fontSize="10" fontWeight="600" fill="#FFFFFF" fontFamily="Bricolage Grotesque, sans-serif">SEO Metadata Agent</text>
          <text x="192" y="142" fontSize="8.8" fill="#9CA3AF" fontFamily="JetBrains Mono, monospace">Title · Meta · Entity Hierarchy</text>

          <path d="M 390 95 L 420 95" stroke="#1D4ED8" strokeWidth="1.5" />
          <polygon points="420,91 428,95 420,99" fill="#1D4ED8" />

          {/* Output */}
          <rect x="430" y="54" width="112" height="82" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="442" y="76" fontSize="9" fill="#6B7280" fontFamily="JetBrains Mono, monospace">REVIEW</text>
          <text x="442" y="96" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Editorial CMS</text>
          <text x="442" y="114" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Human QA & Ship</text>
        </svg>
      </div>
    );
  }

  if (type === 'edge-platforms') {
    return (
      <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 420 170" className="w-full h-full" role="img" aria-label="Cloudflare Edge, Next.js, Redis and Multi-Cloud Architecture">
          <rect x="16" y="18" width="388" height="36" rx="6" fill="#111318" />
          <text x="30" y="40" fontSize="10" fontWeight="600" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace">CLOUDFLARE EDGE · WAF · TUNNELS · CACHING</text>

          <path d="M 105 54 L 105 74 M 210 54 L 210 74 M 315 54 L 315 74" stroke="#1D4ED8" strokeWidth="1.4" />

          <rect x="16" y="76" width="184" height="74" rx="8" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.3" />
          <text x="30" y="98" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">10+ Next.js Platforms</text>
          <text x="30" y="116" fontSize="9" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Core Web Vitals · SSR/ISR</text>
          <text x="30" y="134" fontSize="9" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">Millions MAU · Election Spikes</text>

          <rect x="218" y="76" width="186" height="74" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="232" y="98" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Redis & Multi-Cloud</text>
          <text x="232" y="116" fontSize="9" fill="#4B5563" fontFamily="JetBrains Mono, monospace">GCP · Huawei Cloud · Docker</text>
          <text x="232" y="134" fontSize="9" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Nginx · Zero-Downtime Cutover</text>
        </svg>
      </div>
    );
  }

  if (type === 'voting-flutter') {
    return (
      <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 420 170" className="w-full h-full" role="img" aria-label="Flutter Mobile Apps with Omise and Real-Time Voting System">
          <rect x="18" y="24" width="180" height="122" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="32" y="48" fontSize="9" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">FLUTTER MOBILE</text>
          <text x="32" y="68" fontSize="11" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">NationHouse & BizElite</text>
          <line x1="32" y1="84" x2="180" y2="84" stroke="#E5E7EB" />
          <text x="32" y="104" fontSize="9.5" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Cross-platform iOS / Android</text>
          <text x="32" y="124" fontSize="9.5" fill="#111318" fontFamily="JetBrains Mono, monospace">Omise In-App Payments</text>

          <rect x="218" y="24" width="184" height="122" rx="8" fill="#111318" />
          <text x="232" y="48" fontSize="9" fill="#60A5FA" fontFamily="JetBrains Mono, monospace">REAL-TIME CONCURRENCY</text>
          <text x="232" y="68" fontSize="11" fontWeight="600" fill="#FFFFFF" fontFamily="Bricolage Grotesque, sans-serif">National Awards Voting</text>
          <line x1="232" y1="84" x2="384" y2="84" stroke="#374151" />
          <text x="232" y="104" fontSize="9.5" fill="#D1D5DB" fontFamily="Plus Jakarta Sans, sans-serif">awards.komchadluek.net</text>
          <text x="232" y="124" fontSize="9.5" fill="#9CA3AF" fontFamily="JetBrains Mono, monospace">Millions / Voting Window</text>
        </svg>
      </div>
    );
  }

  if (type === 'travel-booking') {
    return (
      <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 420 170" className="w-full h-full" role="img" aria-label="TravisGo Multi-Modal Travel Booking Architecture">
          <rect x="18" y="20" width="384" height="44" rx="8" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.3" />
          <text x="32" y="40" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Reusable React + Redux Component Library</text>
          <text x="32" y="54" fontSize="8.8" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">Modular Travel Booking & Back-Office Architecture</text>

          <rect x="18" y="82" width="118" height="66" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="32" y="106" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Hotels</text>
          <text x="32" y="126" fontSize="8.8" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Search & Rates</text>

          <rect x="151" y="82" width="118" height="66" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="165" y="106" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Flights</text>
          <text x="165" y="126" fontSize="8.8" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Itinerary Flow</text>

          <rect x="284" y="82" width="118" height="66" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
          <text x="298" y="106" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Boats</text>
          <text x="298" y="126" fontSize="8.8" fill="#4B5563" fontFamily="JetBrains Mono, monospace">Route Booking</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full ${heightClass} bg-[#F4F5F7] dark:bg-[#141923] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl p-4 flex items-center justify-center overflow-hidden`}>
      <svg viewBox="0 0 420 170" className="w-full h-full" role="img" aria-label="Enterprise HR Suite and Public Health Complaint System">
        <rect x="18" y="22" width="184" height="126" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
        <text x="32" y="45" fontSize="9" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">DPLUS INTERTRADE</text>
        <text x="32" y="65" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Enterprise HR Suite</text>
        <text x="32" y="86" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">HR-PMS · Recruiting</text>
        <text x="32" y="103" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Attendance Approvals</text>
        <text x="32" y="128" fontSize="8.8" fill="#111318" fontFamily="JetBrains Mono, monospace">React · MS SQL Stored Procs</text>

        <rect x="218" y="22" width="184" height="126" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
        <text x="232" y="45" fontSize="9" fill="#6B7280" fontFamily="JetBrains Mono, monospace">RESEARCH FOR LIFE</text>
        <text x="232" y="65" fontSize="10.5" fontWeight="600" fill="#111318" fontFamily="Bricolage Grotesque, sans-serif">Public Health Portal</text>
        <text x="232" y="86" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Dept. of Disease Control</text>
        <text x="232" y="103" fontSize="9" fill="#4B5563" fontFamily="Plus Jakarta Sans, sans-serif">Complaint Management</text>
        <text x="232" y="128" fontSize="8.8" fill="#1D4ED8" fontFamily="JetBrains Mono, monospace">Co-op Honorable Mention</text>
      </svg>
    </div>
  );
};
