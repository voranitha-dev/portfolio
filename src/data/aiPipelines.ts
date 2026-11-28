import { assetUrl } from '../utils/assetUrl';

/* Node coordinates are centers on a 1160 × 420 canvas. */
export interface DiagramNode {
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

export interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  stage: number; // lights up when activeStage >= stage
  color?: string;
}

export const DIAGRAM_W = 1160;
export const DIAGRAM_H = 420;

export const MORNING_BRIEF_NODES: DiagramNode[] = [
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
    logo: assetUrl('/assets/logos/tech/googleGemini.svg'),
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
    logo: assetUrl('/assets/logos/brands/bangkokBizNews.webp'),
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
    logo: assetUrl('/assets/logos/brands/nationThailand.png'),
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
    logo: assetUrl('/assets/logos/brands/springNews.png'),
    x: 1034,
    y: 328,
    width: 182,
    inputSample: 'Spring News brand voice JSON payload',
    outputSample: 'POST springnews CMS -> Draft + Clear Redis',
    accent: '#eab308',
  },
];

export const MORNING_BRIEF_EDGES: DiagramEdge[] = [
  { id: 'e-1', from: 'mb-auth', to: 'mb-redis', stage: 1 },
  { id: 'e-2', from: 'mb-redis', to: 'mb-md', stage: 2 },
  { id: 'e-3', from: 'mb-redis', to: 'mb-raws', stage: 2 },
  { id: 'e-4', from: 'mb-md', to: 'mb-gemini', stage: 3 },
  { id: 'e-5', from: 'mb-raws', to: 'mb-gemini', stage: 3 },
  { id: 'e-6', from: 'mb-gemini', to: 'mb-cms-kt', stage: 4, color: '#0600e7' },
  { id: 'e-7', from: 'mb-gemini', to: 'mb-cms-nt', stage: 4, color: '#2563EB' },
  { id: 'e-8', from: 'mb-gemini', to: 'mb-cms-spn', stage: 4, color: '#eab308' },
];

export const PERSONALIZATION_NODES: DiagramNode[] = [
  {
    id: 'p-sites',
    stage: 0,
    title: '11 News Portals',
    subtitle: 'Cross-brand reader visits',
    techLabel: 'Next.js · GA4 / GTM',
    logo: assetUrl('/assets/logos/tech/nextJs.svg'),
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
    logo: assetUrl('/assets/logos/tech/googleBigQuery.svg'),
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
    logo: assetUrl('/assets/logos/tech/powerBi.svg'),
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

export const PERSONALIZATION_EDGES: DiagramEdge[] = [
  { id: 'pe-1', from: 'p-sites', to: 'p-auth0', stage: 1 },
  { id: 'pe-2', from: 'p-auth0', to: 'p-bq', stage: 2 },
  { id: 'pe-3', from: 'p-auth0', to: 'p-pbi', stage: 2 },
  { id: 'pe-4', from: 'p-bq', to: 'p-ai', stage: 3 },
  { id: 'pe-5', from: 'p-pbi', to: 'p-ai', stage: 3 },
  { id: 'pe-6', from: 'p-ai', to: 'p-line', stage: 4, color: '#00C300' },
];

export const EXPOSED_TELEMETRY_ROWS = [
  { category: 'Business', path: '/business/1259200', engSec: '12.78s', views: 6, affinity: 94 },
  { category: 'Economics', path: '/economics/1259084', engSec: '9.81s', views: 3, affinity: 86 },
  { category: 'Finance', path: '/finance/investment/1259494', engSec: '9.31s', views: 3, affinity: 82 },
  { category: 'Lifestyle', path: '/lifestyle/entertainment/1258843', engSec: '28.27s', views: 2, affinity: 68 },
];
