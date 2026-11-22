import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Play,
  X,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { assetUrl } from '../utils/assetUrl';

type AiTab = 'morning-brief-n8n' | 'personalization-line';

interface DiagramNode {
  id: string;
  stage: number; // 0..4 trace step index
  title: string;
  subtitle: string;
  techLabel: string;
  logo: string;
  x: number; // center x in 1160 canvas
  y: number; // center y in 420 canvas
  width: number;
  inputSample: string;
  outputSample: string;
  accent?: string;
}

interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  stage: number; // lights up when activeStage >= stage
  color?: string;
}

const DIAGRAM_W = 1160;
const DIAGRAM_H = 420;

const MORNING_BRIEF_NODES: DiagramNode[] = [
  {
    id: 'mb-auth',
    stage: 0,
    title: 'Webhook & Auth',
    subtitle: 'Editor clicks curated brief',
    techLabel: 'n8n · Auth API',
    logo: assetUrl('/assets/logos/tech/n8n.svg'),
    x: 112,
    y: 210,
    width: 176,
    inputSample: 'POST /morning-brief { brandCode: "KT", articleId }',
    outputSample: 'HTTP 200 · Employee session verified',
  },
  {
    id: 'mb-redis',
    stage: 1,
    title: 'Redis State Lock',
    subtitle: 'Prevent duplicate LLM runs',
    techLabel: 'Redis Sub-Flow',
    logo: assetUrl('/assets/logos/tech/redis.svg'),
    x: 324,
    y: 210,
    width: 176,
    inputSample: 'KEY styled:KT_6941fab8_640174',
    outputSample: 'SET stage="generating" · Live progress lock',
  },
  {
    id: 'mb-md',
    stage: 2,
    title: 'Brand .md Rules',
    subtitle: 'Editorial tone & voice',
    techLabel: 'MongoDB · buProfiles',
    logo: assetUrl('/assets/logos/tech/mongodb.svg'),
    x: 545,
    y: 112,
    width: 184,
    inputSample: 'Query buProfiles by brandCode (KT / NT / SPN)',
    outputSample: 'Loaded BrandGuidelines.md (tone + SEO rules)',
  },
  {
    id: 'mb-raws',
    stage: 2,
    title: 'Raw News Refs',
    subtitle: 'Parallel source batching',
    techLabel: 'MongoDB · newsRaws',
    logo: assetUrl('/assets/logos/tech/mongodb.svg'),
    x: 545,
    y: 308,
    width: 184,
    inputSample: 'SplitInBatches(newsBriefs.refs[])',
    outputSample: 'Merged 3 verified raw news sources',
  },
  {
    id: 'mb-gemini',
    stage: 3,
    title: 'Gemini 2.5 Flash',
    subtitle: 'SEO JSON + Token Audit',
    techLabel: 'LangChain · $0.0005',
    logo: assetUrl('/assets/logos/tech/googlegemini.svg'),
    x: 782,
    y: 210,
    width: 194,
    inputSample: 'Strict JSON-only HTML prompt (1,840 tokens)',
    outputSample: '50-70c Title · Hook · <ul> · 3 HTML Sections',
  },
  {
    id: 'mb-cms-kt',
    stage: 4,
    title: 'KT · Bangkok Biz',
    subtitle: 'One CMS Draft API',
    techLabel: 'Auto-Repair JSON',
    logo: assetUrl('/assets/logos/brands/bangkokbiznews.webp'),
    x: 1034,
    y: 92,
    width: 182,
    inputSample: 'Validated 10-field JSON + stripped fences',
    outputSample: 'POST backoffice.bangkokbiznews.com -> Draft',
    accent: '#0600e7',
  },
  {
    id: 'mb-cms-nt',
    stage: 4,
    title: 'NT · The Nation',
    subtitle: 'One CMS Draft API',
    techLabel: 'English Newsroom',
    logo: assetUrl('/assets/logos/brands/nationthailand.png'),
    x: 1034,
    y: 210,
    width: 182,
    inputSample: 'English editorial JSON + SEO keywords',
    outputSample: 'POST nationthailand CMS -> Draft + Log',
    accent: '#1f299a',
  },
  {
    id: 'mb-cms-spn',
    stage: 4,
    title: 'SPN · Spring News',
    subtitle: 'One CMS Draft API',
    techLabel: 'Digital Newsroom',
    logo: assetUrl('/assets/logos/brands/spring.png'),
    x: 1034,
    y: 328,
    width: 182,
    inputSample: 'Spring News brand voice JSON payload',
    outputSample: 'POST springnews CMS -> Draft + Clear Redis',
    accent: '#eab308',
  },
];

const MORNING_BRIEF_EDGES: DiagramEdge[] = [
  { id: 'e-1', from: 'mb-auth', to: 'mb-redis', stage: 1 },
  { id: 'e-2', from: 'mb-redis', to: 'mb-md', stage: 2 },
  { id: 'e-3', from: 'mb-redis', to: 'mb-raws', stage: 2 },
  { id: 'e-4', from: 'mb-md', to: 'mb-gemini', stage: 3 },
  { id: 'e-5', from: 'mb-raws', to: 'mb-gemini', stage: 3 },
  { id: 'e-6', from: 'mb-gemini', to: 'mb-cms-kt', stage: 4, color: '#0600e7' },
  { id: 'e-7', from: 'mb-gemini', to: 'mb-cms-nt', stage: 4, color: '#2563EB' },
  { id: 'e-8', from: 'mb-gemini', to: 'mb-cms-spn', stage: 4, color: '#eab308' },
];

const PERSONALIZATION_NODES: DiagramNode[] = [
  {
    id: 'p-sites',
    stage: 0,
    title: '11 News Portals',
    subtitle: 'Cross-brand reader visits',
    techLabel: 'Next.js · GA4 / GTM',
    logo: assetUrl('/assets/logos/tech/nextjs.svg'),
    x: 112,
    y: 210,
    width: 176,
    inputSample: 'Reader browses bangkokbiznews / sister sites',
    outputSample: 'Captures page_path + article_category + dwell',
  },
  {
    id: 'p-auth0',
    stage: 1,
    title: 'Auth0 SSO (nid)',
    subtitle: 'Unified cross-domain ID',
    techLabel: 'Google OAuth2 · LINE',
    logo: assetUrl('/assets/logos/tech/auth0.svg'),
    x: 332,
    y: 210,
    width: 180,
    inputSample: 'Single sign-on across 10+ Nation domains',
    outputSample: 'nid: N1.261007.1287295233483630 (Logged-in)',
  },
  {
    id: 'p-bq',
    stage: 2,
    title: 'Google BigQuery',
    subtitle: 'Event telemetry warehouse',
    techLabel: 'GA4 Streaming Export',
    logo: assetUrl('/assets/logos/tech/googlebigquery.svg'),
    x: 562,
    y: 112,
    width: 186,
    inputSample: 'Raw GA4 page_view & user_engagement events',
    outputSample: 'Aggregated Avg eng/sec + total_views per nid',
  },
  {
    id: 'p-pbi',
    stage: 2,
    title: 'Power BI Server',
    subtitle: 'Verified reader dashboard',
    techLabel: 'Live BI Verification',
    logo: assetUrl('/assets/logos/tech/powerbi.svg'),
    x: 562,
    y: 308,
    width: 186,
    inputSample: 'BigQuery dataset joined with registered_website',
    outputSample: 'Auditable Business / Economics / Finance depth',
  },
  {
    id: 'p-ai',
    stage: 3,
    title: 'Profile & AI Rank',
    subtitle: 'Topic affinity scoring',
    techLabel: 'MongoDB · Gemini AI',
    logo: assetUrl('/assets/logos/tech/mongodb.svg'),
    x: 800,
    y: 210,
    width: 188,
    inputSample: 'Dwell time + recency across categories per nid',
    outputSample: 'Vectors: Business 94% · Economics 86% · Finance 82%',
  },
  {
    id: 'p-line',
    stage: 4,
    title: 'LINE OA Delivery',
    subtitle: 'Personalized Flex Cards',
    techLabel: 'LINE Webhook API',
    logo: assetUrl('/assets/logos/tech/line.svg'),
    x: 1034,
    y: 210,
    width: 180,
    inputSample: 'Top 3 AI-matched stories + nid deep-link UTM',
    outputSample: 'Interactive LINE Flex Carousel pushed to reader',
    accent: '#00C300',
  },
];

const PERSONALIZATION_EDGES: DiagramEdge[] = [
  { id: 'pe-1', from: 'p-sites', to: 'p-auth0', stage: 1 },
  { id: 'pe-2', from: 'p-auth0', to: 'p-bq', stage: 2 },
  { id: 'pe-3', from: 'p-auth0', to: 'p-pbi', stage: 2 },
  { id: 'pe-4', from: 'p-bq', to: 'p-ai', stage: 3 },
  { id: 'pe-5', from: 'p-pbi', to: 'p-ai', stage: 3 },
  { id: 'pe-6', from: 'p-ai', to: 'p-line', stage: 4, color: '#00C300' },
];

const EXPOSED_TELEMETRY_ROWS = [
  { category: 'Business', path: '/business/1259200', engSec: '12.78s', views: 6, affinity: 94 },
  { category: 'Economics', path: '/economics/1259084', engSec: '9.81s', views: 3, affinity: 86 },
  { category: 'Finance', path: '/finance/investment/1259494', engSec: '9.31s', views: 3, affinity: 82 },
  { category: 'Lifestyle', path: '/lifestyle/entertainment/1258843', engSec: '28.27s', views: 2, affinity: 68 },
];

const buildCurvePath = (from: DiagramNode, to: DiagramNode) => {
  const x1 = from.x + from.width / 2;
  const y1 = from.y;
  const x2 = to.x - to.width / 2;
  const y2 = to.y;
  const dx = Math.max((x2 - x1) * 0.5, 28);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

export const AiEngineeringShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AiTab>('morning-brief-n8n');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mb-gemini');
  const [traceStage, setTraceStage] = useState<number>(4);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [powerBiZoomOpen, setPowerBiZoomOpen] = useState<boolean>(false);
  const timersRef = useRef<number[]>([]);

  const nodes = activeTab === 'morning-brief-n8n' ? MORNING_BRIEF_NODES : PERSONALIZATION_NODES;
  const edges = activeTab === 'morning-brief-n8n' ? MORNING_BRIEF_EDGES : PERSONALIZATION_EDGES;
  const activeNode = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!powerBiZoomOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPowerBiZoomOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [powerBiZoomOpen]);

  const handleSwitchTab = (tab: AiTab) => {
    clearTimers();
    setIsTracing(false);
    setActiveTab(tab);
    setTraceStage(4);
    setSelectedNodeId(tab === 'morning-brief-n8n' ? 'mb-gemini' : 'p-ai');
  };

  const handleRunTrace = () => {
    if (isTracing) return;
    clearTimers();
    setIsTracing(true);
    const stages = [0, 1, 2, 3, 4];
    stages.forEach((st, idx) => {
      const tid = window.setTimeout(() => {
        setTraceStage(st);
        const matchNode = nodes.find((n) => n.stage === st);
        if (matchNode) setSelectedNodeId(matchNode.id);
        if (idx === stages.length - 1) {
          setIsTracing(false);
        }
      }, idx * 520);
      timersRef.current.push(tid);
    });
  };

  return (
    <section
      id="ai-highlights"
      className="py-20 lg:py-24 bg-[#FAFAFA] dark:bg-[#0B0D12] text-[#111318] dark:text-[#F9FAFB] border-b border-[#E5E7EB] dark:border-[#1E2430] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-8">
        {/* Header + 2-Tab Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-7 border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
              02. Production AI &amp; Data Architecture Diagrams
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111318] dark:text-white tracking-tight text-balance">
              AI Systems in Production
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="AI architecture diagram tabs"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-[#141821] border border-[#E5E7EB] dark:border-[#232A38] rounded-xl self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'morning-brief-n8n'}
              onClick={() => handleSwitchTab('morning-brief-n8n')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'morning-brief-n8n'
                  ? 'bg-[#1D4ED8] text-white'
                  : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              01 · Morning Brief AI (n8n)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'personalization-line'}
              onClick={() => handleSwitchTab('personalization-line')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'personalization-line'
                  ? 'bg-[#1D4ED8] text-white'
                  : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
              }`}
            >
              02 · Personalization &amp; LINE OA
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Full-Width Interactive Dot-Grid Node Diagram Stage */}
            <div className="rounded-2xl border border-[#E5E7EB] dark:border-[#232A38] bg-white dark:bg-[#10141D] overflow-hidden">
              {/* Top Canvas Toolbar */}
              <div className="px-5 py-4 border-b border-[#E5E7EB] dark:border-[#1E2430] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="font-semibold text-[#111318] dark:text-white">
                    {activeTab === 'morning-brief-n8n'
                      ? 'Style Guide — Insert News V5.0 (Parallel MongoDB → Gemini 2.5 Flash → Brand CMS Router)'
                      : 'Cross-Domain Personalization Architecture (Auth0 nid → BigQuery / Power BI → AI Rank → LINE OA)'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRunTrace}
                  disabled={isTracing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isTracing ? 'Tracing Pipeline...' : 'Play Live Trace'}</span>
                </button>
              </div>

              {/* Desktop Full-Width Interactive Node Canvas (lg+) */}
              <div
                className="hidden lg:block relative w-full overflow-hidden"
                style={{
                  aspectRatio: `${DIAGRAM_W} / ${DIAGRAM_H}`,
                  backgroundImage:
                    'radial-gradient(circle, rgba(148,163,184,0.28) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              >
                {/* Animated SVG Bezier Pipes */}
                <svg
                  viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  role="img"
                  aria-label="Interactive production AI architecture node diagram"
                >
                  {edges.map((edge) => {
                    const fromNode = nodes.find((n) => n.id === edge.from);
                    const toNode = nodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const d = buildCurvePath(fromNode, toNode);
                    const isLit = traceStage >= edge.stage;
                    const isConnectedToSelected =
                      selectedNodeId === edge.from || selectedNodeId === edge.to;
                    const strokeColor = edge.color ?? '#2563EB';

                    return (
                      <g key={edge.id}>
                        <path
                          d={d}
                          fill="none"
                          stroke="currentColor"
                          className="text-[#D1D5DB] dark:text-[#252D3D]"
                          strokeWidth="2"
                        />
                        {isLit && (
                          <>
                            <motion.path
                              d={d}
                              fill="none"
                              stroke={strokeColor}
                              strokeOpacity={isConnectedToSelected ? 0.95 : 0.45}
                              strokeWidth={isConnectedToSelected ? 2.8 : 2}
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <path
                              d={d}
                              fill="none"
                              stroke={strokeColor}
                              strokeOpacity={isConnectedToSelected ? 1 : 0.72}
                              strokeWidth={isConnectedToSelected ? 3 : 2}
                              className="animate-git-flow"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Positioned Interactive Architecture Nodes */}
                {nodes.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  const isActiveStage = traceStage >= node.stage;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        setTraceStage(Math.max(traceStage, node.stage));
                      }}
                      style={{
                        left: `${(node.x / DIAGRAM_W) * 100}%`,
                        top: `${(node.y / DIAGRAM_H) * 100}%`,
                        width: `${(node.width / DIAGRAM_W) * 100}%`,
                      }}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        isSelected
                          ? 'bg-[#EFF6FF] dark:bg-[#16223A] border-[#2563EB] shadow-md z-20 scale-[1.03]'
                          : isActiveStage
                            ? 'bg-white dark:bg-[#141925] border-[#D1D5DB] dark:border-[#2C3548] hover:border-[#2563EB] z-10'
                            : 'bg-white/75 dark:bg-[#11151F]/80 border-[#E5E7EB] dark:border-[#1E2430] opacity-65 z-10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center p-1.5 shrink-0">
                          <img
                            src={node.logo}
                            alt={node.title}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#111318] dark:text-white truncate">
                            {node.title}
                          </p>
                          <p className="text-[10px] font-mono text-[#1D4ED8] dark:text-[#60A5FA] truncate">
                            {node.techLabel}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] text-[#4B5563] dark:text-[#9CA3AF] truncate">
                        {node.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Mobile & Tablet Clean Stacked Flow (< lg) */}
              <div className="lg:hidden p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAFAFA] dark:bg-[#0C0F17]">
                {nodes.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-xl border text-left transition-colors ${
                        isSelected
                          ? 'bg-[#EFF6FF] dark:bg-[#16223A] border-[#2563EB]'
                          : 'bg-white dark:bg-[#141925] border-[#E5E7EB] dark:border-[#232A38]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center p-1.5 shrink-0">
                          <img
                            src={node.logo}
                            alt={node.title}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#111318] dark:text-white truncate">
                            {node.title}
                          </p>
                          <p className="text-[11px] font-mono text-[#1D4ED8] dark:text-[#60A5FA] truncate">
                            {node.techLabel}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                        {node.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Compact Selected Node Telemetry Strip (Input -> Output) */}
              <div className="px-5 py-4 border-t border-[#E5E7EB] dark:border-[#1E2430] bg-[#FAFAFA] dark:bg-[#0D1018] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center p-1.5">
                    <img
                      src={activeNode.logo}
                      alt={activeNode.title}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111318] dark:text-white">
                      {activeNode.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                      {activeNode.techLabel}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 flex-1 lg:max-w-3xl">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-[#141925] border border-[#E5E7EB] dark:border-[#232A38] text-xs font-mono text-[#374151] dark:text-[#D1D5DB] truncate">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF] mr-1.5">IN:</span>
                    {activeNode.inputSample}
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-[#2563EB] shrink-0 hidden sm:block"
                    aria-hidden="true"
                  />
                  <div className="flex-1 px-3 py-2 rounded-lg bg-[#EFF6FF] dark:bg-[#16223A] border border-[#BFDBFE] dark:border-[#2563EB]/50 text-xs font-mono font-semibold text-[#111318] dark:text-white truncate">
                    <span className="text-[#1D4ED8] dark:text-[#93C5FD] mr-1.5">OUT:</span>
                    {activeNode.outputSample}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab-Specific Visual Proof Below Diagram */}
            {activeTab === 'morning-brief-n8n' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-5 space-y-2">
                  <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                    Token &amp; Cost Telemetry
                  </p>
                  <p className="font-display text-2xl font-bold text-[#111318] dark:text-white tabular-nums">
                    $0.0005 / article
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Calibrated Thai (2.5 c/tok) &amp; EN (4 c/tok) cost logger for Gemini 2.5 Flash.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-5 space-y-2">
                  <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                    Editorial SEO Schema
                  </p>
                  <p className="font-display text-2xl font-bold text-[#111318] dark:text-white">
                    100% Structured HTML
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    50–70c Title · Direct Hook · &lt;ul&gt; Key Points · 3 Sections · 5–10 Keywords.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                      One CMS Delivery
                    </p>
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" />
                  </div>
                  <p className="font-display text-2xl font-bold text-[#111318] dark:text-white">
                    KT · NT · SPN
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Auto-repairs LLM JSON, saves Draft to target brand CMS &amp; clears Redis lock.
                  </p>
                </div>
              </div>
            ) : (
              /* Exposed Personalization Data & LINE OA Display Anatomy (Directly On-Page!) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left 7 Cols: Exposed BigQuery/Power BI Schema + Live Report Proof */}
                <div className="lg:col-span-7 bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                          Exposed BigQuery &amp; Power BI Reader Behavior Dataset
                        </p>
                        <p className="mt-0.5 text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                          nid: N1.261007.1287295233483630 · Channel: google-oauth2 · Site: bangkokbiznews
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPowerBiZoomOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA] hover:underline shrink-0"
                      >
                        <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Inspect Full Power BI</span>
                      </button>
                    </div>

                    {/* Clean Exposed Telemetry Table */}
                    <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] dark:border-[#1E2430]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#FAFAFA] dark:bg-[#0D1018] text-[#6B7280] dark:text-[#9CA3AF] border-b border-[#E5E7EB] dark:border-[#1E2430]">
                          <tr>
                            <th className="px-3.5 py-2.5 font-medium">article_category</th>
                            <th className="px-3.5 py-2.5 font-medium">page_path</th>
                            <th className="px-3.5 py-2.5 font-medium text-right">Avg eng/sec</th>
                            <th className="px-3.5 py-2.5 font-medium text-right">Views</th>
                            <th className="px-3.5 py-2.5 font-medium text-right">Affinity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1E2430] tabular-nums">
                          {EXPOSED_TELEMETRY_ROWS.map((row) => (
                            <tr
                              key={row.category}
                              className="text-[#111318] dark:text-[#E5E7EB]"
                            >
                              <td className="px-3.5 py-2.5 font-semibold">{row.category}</td>
                              <td className="px-3.5 py-2.5 text-[#6B7280] dark:text-[#9CA3AF] truncate max-w-[180px]">
                                {row.path}
                              </td>
                              <td className="px-3.5 py-2.5 text-right">{row.engSec}</td>
                              <td className="px-3.5 py-2.5 text-right">{row.views}</td>
                              <td className="px-3.5 py-2.5 text-right font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                                {row.affinity}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Live Power BI Proof Thumbnail */}
                    <button
                      type="button"
                      onClick={() => setPowerBiZoomOpen(true)}
                      className="block w-full rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#232A38] bg-white group focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                    >
                      <img
                        src={PROFILE.powerBiProofImage}
                        alt="Live Power BI Report Server showing Auth0 nid, bangkokbiznews, article categories, and engagement seconds"
                        referrerPolicy="no-referrer"
                        className="w-full h-44 object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                      />
                    </button>
                  </div>
                </div>

                {/* Right 5 Cols: Exposed LINE OA Flex Card Preview + Original Artifacts */}
                <div className="lg:col-span-5 bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={assetUrl('/assets/logos/tech/line.svg')}
                          alt="LINE OA"
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-xs font-mono font-semibold text-[#15803D] dark:text-[#4ADE80]">
                          LINE OA Flex Display Output
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                        Matched via nid
                      </span>
                    </div>

                    {/* Exposed LINE Flex Card Structure */}
                    <div className="rounded-xl bg-[#FAFAFA] dark:bg-[#0B0E14] border border-[#E5E7EB] dark:border-[#1E2430] p-4 space-y-3">
                      <div className="pb-2.5 border-b border-[#E5E7EB] dark:border-[#1E2430] flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#111318] dark:text-white">
                          Your Daily Briefing · Bangkok Biz News
                        </span>
                        <span className="font-mono text-[10px] text-[#1D4ED8] dark:text-[#60A5FA]">
                          08:00 AM
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3 rounded-lg bg-white dark:bg-[#141925] border border-[#E5E7EB] dark:border-[#232A38]">
                          <p className="text-[10px] font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                            #1 Business Affinity (94%)
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-[#111318] dark:text-white">
                            AI-Curated Market &amp; SET Investment Digest
                          </p>
                          <p className="mt-1 text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                            Deep-link → /business/1259200?utm_source=line_oa
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-white dark:bg-[#141925] border border-[#E5E7EB] dark:border-[#232A38]">
                          <p className="text-[10px] font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                            #2 Economics Affinity (86%)
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-[#111318] dark:text-white">
                            Macro Policy &amp; ASEAN Trade Outlook
                          </p>
                          <p className="mt-1 text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                            Re-engagement loop → streams back to BigQuery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Links to Original Interactive Diagrams */}
                  <div className="space-y-2 pt-4 border-t border-[#E5E7EB] dark:border-[#1E2430]">
                    <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                      Original Interactive Architecture Artifacts
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href={PROFILE.personalizationFlowUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold transition-colors"
                      >
                        <span className="truncate">Personalization Flow</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                      <a
                        href={PROFILE.lineFlowUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#FAFAFA] dark:bg-[#0E1119] border border-[#E5E7EB] dark:border-[#232A38] hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] text-[#111318] dark:text-white text-xs font-semibold transition-colors"
                      >
                        <span className="truncate">LINE OA Flow</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Power BI Proof Lightbox */}
      {powerBiZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Power BI User Behavior Report Fullscreen View"
          onClick={() => setPowerBiZoomOpen(false)}
        >
          <div
            className="max-w-6xl w-full bg-[#121620] border border-[#232A38] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#232A38]">
              <p className="text-sm font-semibold text-white">
                Power BI Report Server — Cross-Domain Auth0 User Behavior Dataset
              </p>
              <button
                type="button"
                onClick={() => setPowerBiZoomOpen(false)}
                aria-label="Close Power BI preview"
                className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2430]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-[#0B0D12] flex justify-center">
              <img
                src={PROFILE.powerBiProofImage}
                alt="Power BI User Behavior Telemetry Report"
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
