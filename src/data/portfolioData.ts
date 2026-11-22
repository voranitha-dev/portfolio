import { assetUrl } from '../utils/assetUrl';

export type CaseStudyCategory = 'all' | 'ai-data' | 'high-traffic' | 'travel-enterprise';

export interface ProfileInfo {
  name: string;
  roleTitle: string;
  targetRoles: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  archiveDriveUrl: string;
  resumePdfUrl: string;
  powerBiProofImage: string;
  personalizationFlowUrl: string;
  lineFlowUrl: string;
  summary: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface TruehitsMetrics {
  rankThailand: number;
  rankAll: number;
  dailyUipThailand: number;
  dailyUipAll: number;
  thailandSharePct: number;
  dailyVisitorsThailand: number;
}

export interface NationBrandPlatform {
  id: string;
  name: string;
  domain: string;
  url: string;
  themeColor: string;
  lightTextOnColor?: boolean;
  logo?: string;
  brandCode?: string;
  branch: 'business' | 'news-tv' | 'lifestyle';
  role: string;
  truehits: TruehitsMetrics;
}

export interface TruehitsMonthlySnapshot {
  monthKey: string; // e.g. '202610'
  monthLabel: string; // e.g. 'Oct 2026'
  shortLabel: string; // e.g. "Oct '26"
  daysInMonth: number;
  sourceUrl: string;
  brands: Record<
    string,
    {
      rank: number;
      avgDailyUip: number;
      avgDailySessions: number;
      avgDailyPageviews: number;
    }
  >;
}

export interface AwardsPlatform {
  id: string;
  name: string;
  domain: string;
  url: string;
  themeColor: string;
  availabilityMode: 'Always Online' | 'Event-Window Cloud Optimized';
  yearsActive: string;
  originNote: string;
  storageTech: string;
  description: string;
}

export interface N8nPipelineStage {
  id: string;
  step: string;
  nodeName: string;
  tech: string;
  category: 'Trigger & Auth' | 'State & Data' | 'AI & Prompting' | 'Publishing & Logs';
  summary: string;
  technicalDetail: string;
  outputPreview: string;
}

export interface TechBrandLogo {
  name: string;
  logo: string;
  usage: string;
}

export interface TechCapabilityItem {
  title: string;
  detail: string;
}

export interface TechLayer {
  id: string;
  stage: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  capabilities: TechCapabilityItem[];
  brands: TechBrandLogo[];
}

export interface ArchitectureNode {
  id: string;
  stage: string;
  title: string;
  tech: string;
  role: string;
  detail: string;
  impact: string;
}

export interface ArchitectureBlueprint {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  context: string;
  nodes: ArchitectureNode[];
}

export interface CaseStudy {
  id: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  categoryLabel: string;
  year: string;
  organization: string;
  brandLogo?: string;
  title: string;
  summary: string;
  featured?: boolean;
  schematicType: 'sso-personalization' | 'ai-newsroom' | 'edge-platforms' | 'voting-flutter' | 'travel-booking' | 'enterprise-hr';
  previewImage?: string;
  galleryImages?: { src: string; caption: string }[];
  challenge: string;
  architecture: string[];
  outcomes: string[];
  stack: string[];
  links?: { label: string; url: string }[];
}

export type GalleryProjectId = 'all' | 'travisgo' | 'time' | 'jobonline' | 'personal';

export interface PortfolioScreenshot {
  id: string;
  project: Exclude<GalleryProjectId, 'all'>;
  projectLabel: string;
  organization: string;
  year: string;
  title: string;
  caption: string;
  stack: string;
  src: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  companyLogos?: { src: string; alt: string; url?: string }[];
  subsidiaryNote?: string;
  location: string;
  period: string;
  tenureBadge?: string;
  progressionNote?: string;
  techStack: string[];
  highlights: { title: string; description: string }[];
  archiveNote?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  focus: string;
}

export const PROFILE: ProfileInfo = {
  name: 'Voranitha Changduong',
  roleTitle: 'Lead Frontend & Full-Stack AI Engineer',
  targetRoles: 'Frontend AI · Full-Stack AI Engineering',
  location: 'Bangkok & Samutprakan, Thailand',
  email: 'voranitha.developer@gmail.com',
  phone: '+66 62-449-8916',
  linkedin: 'https://www.linkedin.com/in/voranitha-changduong-0a837b1ab/',
  github: 'https://github.com/baifernv',
  archiveDriveUrl: 'https://drive.google.com/drive/folders/1dt6IHv_iM9z7AVBWC75chEXdhvZCds8h?usp=sharing',
  resumePdfUrl: assetUrl('/assets/aistudio/CV_-_Frontend_AI_Engineer__Agoda__Version_2_a227a24b.pdf'),
  powerBiProofImage: assetUrl('/assets/aistudio/image_b6eafb54.png'),
  personalizationFlowUrl: 'https://claude.ai/artifact/FHVwyb4TtyCgUDKCAzRf7o',
  lineFlowUrl: 'https://claude.ai/artifact/12v92obPPpLH8TxzEujERu',
  summary:
    'Frontend & Full-Stack Software Engineer with 8+ years of web development experience across software houses, startups, travel-tech booking platforms, and public media corporations. Promoted to Lead Frontend Developer within 1 year at Nation Group (5 years 5 months tenure), leading frontend teams across 11+ high-traffic news portals, annual awards platforms, Cross-Domain Auth0-to-BigQuery personalization pipelines, and n8n + Gemini AI newsroom automation.',
};

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '8+ Years',
    label: 'Full-Stack & Frontend Experience',
    context: '2017–Present across travel-tech, enterprise & public media',
  },
  {
    value: '5y 5m',
    label: 'Nation Group Engineering Tenure',
    context: 'Promoted to Lead Frontend within 1 year (4+ years leading teams)',
  },
  {
    value: '11+ Sites',
    label: 'High-Traffic News & Awards Platforms',
    context: '275K+ daily UIP on Truehits · 3 sites in Thailand Top 20',
  },
  {
    value: 'End-to-End',
    label: 'Production AI & Data Systems',
    context: 'n8n + Gemini 2.5 Flash SEO engine, Auth0 SSO, BigQuery & Power BI',
  },
];

export const TRUEHITS_SOURCE_URL = 'https://truehits.net/ranking/view.php';

export const NATION_BRAND_PLATFORMS: NationBrandPlatform[] = [
  {
    id: 'bangkokbiznews',
    name: 'Bangkok Biz News',
    domain: 'bangkokbiznews.com',
    url: 'https://www.bangkokbiznews.com',
    themeColor: '#0600e7',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/bangkokbiznews.webp'),
    brandCode: 'KT',
    branch: 'business',
    role: 'Flagship economic & financial news portal · Auth0 SSO & Morning Brief AI (KT)',
    truehits: {
      rankThailand: 15,
      rankAll: 15,
      dailyUipThailand: 66295,
      dailyUipAll: 71855,
      thailandSharePct: 92.26,
      dailyVisitorsThailand: 71730,
    },
  },
  {
    id: 'thansettakij',
    name: 'Thansettakij',
    domain: 'thansettakij.com',
    url: 'https://www.thansettakij.com',
    themeColor: '#ff8500',
    lightTextOnColor: false,
    logo: assetUrl('/assets/logos/brands/thansettakij.png'),
    branch: 'business',
    role: 'Business & investment daily · High-traffic SSR & Core Web Vitals architecture',
    truehits: {
      rankThailand: 19,
      rankAll: 20,
      dailyUipThailand: 40254,
      dailyUipAll: 41690,
      thailandSharePct: 96.56,
      dailyVisitorsThailand: 42611,
    },
  },
  {
    id: 'posttoday',
    name: 'Post Today',
    domain: 'posttoday.com',
    url: 'https://www.posttoday.com',
    themeColor: '#ea212d',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/posttoday.png'),
    branch: 'business',
    role: 'Digital business & urban lifestyle news platform',
    truehits: {
      rankThailand: 50,
      rankAll: 49,
      dailyUipThailand: 7779,
      dailyUipAll: 9931,
      thailandSharePct: 78.33,
      dailyVisitorsThailand: 8418,
    },
  },
  {
    id: 'nationthailand',
    name: 'The Nation Thailand',
    domain: 'nationthailand.com',
    url: 'https://www.nationthailand.com',
    themeColor: '#1f299a',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/nationthailand.png'),
    brandCode: 'NT',
    branch: 'business',
    role: 'International English news portal · Morning Brief AI target (NT)',
    truehits: {
      rankThailand: 59,
      rankAll: 40,
      dailyUipThailand: 5268,
      dailyUipAll: 16524,
      thailandSharePct: 31.88,
      dailyVisitorsThailand: 5846,
    },
  },
  {
    id: 'nationtv',
    name: 'Nation TV',
    domain: 'nationtv.tv',
    url: 'https://www.nationtv.tv',
    themeColor: '#0929c9',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/nationtv.png'),
    branch: 'news-tv',
    role: 'Broadcast & breaking live election news hub handling extreme peak surges',
    truehits: {
      rankThailand: 48,
      rankAll: 53,
      dailyUipThailand: 8124,
      dailyUipAll: 8630,
      thailandSharePct: 94.14,
      dailyVisitorsThailand: 8758,
    },
  },
  {
    id: 'komchadluek',
    name: 'Kom Chad Luek',
    domain: 'komchadluek.net',
    url: 'https://www.komchadluek.net',
    themeColor: '#d70000',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/komchadluek.png'),
    branch: 'news-tv',
    role: 'Mass-reach Thai news & entertainment portal feeding annual national awards',
    truehits: {
      rankThailand: 35,
      rankAll: 34,
      dailyUipThailand: 19936,
      dailyUipAll: 21727,
      thailandSharePct: 91.76,
      dailyVisitorsThailand: 20571,
    },
  },
  {
    id: 'springnews',
    name: 'Spring News',
    domain: 'springnews.co.th',
    url: 'https://www.springnews.co.th',
    themeColor: '#eab308',
    lightTextOnColor: false,
    logo: assetUrl('/assets/logos/brands/spring.png'),
    brandCode: 'SPN',
    branch: 'news-tv',
    role: 'Digital-first news & sustainability brand · Morning Brief AI target (SPN)',
    truehits: {
      rankThailand: 72,
      rankAll: 72,
      dailyUipThailand: 3535,
      dailyUipAll: 3921,
      thailandSharePct: 90.16,
      dailyVisitorsThailand: 7324,
    },
  },
  {
    id: 'thainews',
    name: 'Thai News Online',
    domain: 'thainewsonline.co',
    url: 'https://www.thainewsonline.co',
    themeColor: '#2929d9',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/thainews.png'),
    branch: 'news-tv',
    role: 'High-velocity regional & breaking news network',
    truehits: {
      rankThailand: 29,
      rankAll: 31,
      dailyUipThailand: 25725,
      dailyUipAll: 26679,
      thailandSharePct: 96.42,
      dailyVisitorsThailand: 29866,
    },
  },
  {
    id: 'tnews',
    name: 'TNews',
    domain: 'tnews.co.th',
    url: 'https://www.tnews.co.th',
    themeColor: '#000060',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/tnews.png'),
    branch: 'news-tv',
    role: 'High-volume Thai digital news platform under shared multi-cloud infrastructure',
    truehits: {
      rankThailand: 13,
      rankAll: 13,
      dailyUipThailand: 70342,
      dailyUipAll: 73294,
      thailandSharePct: 95.97,
      dailyVisitorsThailand: 76076,
    },
  },
  {
    id: 'thepeople',
    name: 'The People',
    domain: 'thepeople.co',
    url: 'https://www.thepeople.co',
    themeColor: '#d81b2c',
    lightTextOnColor: true,
    logo: assetUrl('/assets/logos/brands/thepeople.png'),
    branch: 'lifestyle',
    role: 'Long-form editorial storytelling & cultural features platform',
    truehits: {
      rankThailand: 102,
      rankAll: 107,
      dailyUipThailand: 798,
      dailyUipAll: 887,
      thailandSharePct: 89.97,
      dailyVisitorsThailand: 820,
    },
  },
  {
    id: 'khobsanam',
    name: 'Khobsanam',
    domain: 'khobsanam.com',
    url: 'https://www.khobsanam.com',
    themeColor: '#65a30d',
    lightTextOnColor: false,
    logo: assetUrl('/assets/logos/brands/khobsanam.png'),
    branch: 'lifestyle',
    role: 'High-engagement sports media & live match coverage platform',
    truehits: {
      rankThailand: 151,
      rankAll: 149,
      dailyUipThailand: 88,
      dailyUipAll: 141,
      thailandSharePct: 62.41,
      dailyVisitorsThailand: 109,
    },
  },
];

export const TRUEHITS_MONTHLY_DATA: TruehitsMonthlySnapshot[] = [
  {
    monthKey: '202605',
    monthLabel: 'May 2026',
    shortLabel: "May '26",
    daysInMonth: 31,
    sourceUrl: 'https://truehits.net/script/202605/rank0.php',
    brands: {
      bangkokbiznews: { rank: 13, avgDailyUip: 129084, avgDailySessions: 178228, avgDailyPageviews: 235569 },
      thansettakij: { rank: 30, avgDailyUip: 48924, avgDailySessions: 65029, avgDailyPageviews: 81608 },
      komchadluek: { rank: 19, avgDailyUip: 79050, avgDailySessions: 378171, avgDailyPageviews: 549792 },
      posttoday: { rank: 42, avgDailyUip: 26245, avgDailySessions: 42508, avgDailyPageviews: 52522 },
      thainews: { rank: 57, avgDailyUip: 14318, avgDailySessions: 19462, avgDailyPageviews: 25867 },
      nationtv: { rank: 60, avgDailyUip: 12764, avgDailySessions: 14703, avgDailyPageviews: 18621 },
      nationthailand: { rank: 43, avgDailyUip: 21774, avgDailySessions: 28755, avgDailyPageviews: 39279 },
      springnews: { rank: 78, avgDailyUip: 5853, avgDailySessions: 12889, avgDailyPageviews: 17236 },
      thepeople: { rank: 127, avgDailyUip: 1175, avgDailySessions: 1276, avgDailyPageviews: 1456 },
      khobsanam: { rank: 189, avgDailyUip: 199, avgDailySessions: 287, avgDailyPageviews: 501 },
      tnews: { rank: 21, avgDailyUip: 76590, avgDailySessions: 97359, avgDailyPageviews: 137490 },
    },
  },
  {
    monthKey: '202606',
    monthLabel: 'June 2026',
    shortLabel: "Jun '26",
    daysInMonth: 30,
    sourceUrl: 'https://truehits.net/script/202606/rank0.php',
    brands: {
      bangkokbiznews: { rank: 14, avgDailyUip: 105968, avgDailySessions: 139256, avgDailyPageviews: 191300 },
      thansettakij: { rank: 29, avgDailyUip: 45899, avgDailySessions: 55975, avgDailyPageviews: 72981 },
      komchadluek: { rank: 21, avgDailyUip: 82283, avgDailySessions: 104643, avgDailyPageviews: 136875 },
      posttoday: { rank: 51, avgDailyUip: 17431, avgDailySessions: 24173, avgDailyPageviews: 32962 },
      thainews: { rank: 41, avgDailyUip: 26922, avgDailySessions: 33333, avgDailyPageviews: 43176 },
      nationtv: { rank: 52, avgDailyUip: 17118, avgDailySessions: 19587, avgDailyPageviews: 24119 },
      nationthailand: { rank: 50, avgDailyUip: 19388, avgDailySessions: 26247, avgDailyPageviews: 37538 },
      springnews: { rank: 70, avgDailyUip: 8042, avgDailySessions: 15259, avgDailyPageviews: 20345 },
      thepeople: { rank: 127, avgDailyUip: 1164, avgDailySessions: 1337, avgDailyPageviews: 1508 },
      khobsanam: { rank: 193, avgDailyUip: 169, avgDailySessions: 294, avgDailyPageviews: 544 },
      tnews: { rank: 12, avgDailyUip: 113350, avgDailySessions: 146604, avgDailyPageviews: 211120 },
    },
  },
  {
    monthKey: '202607',
    monthLabel: 'July 2026',
    shortLabel: "Jul '26",
    daysInMonth: 31,
    sourceUrl: 'https://truehits.net/script/202607/rank0.php',
    brands: {
      bangkokbiznews: { rank: 14, avgDailyUip: 97180, avgDailySessions: 125910, avgDailyPageviews: 169643 },
      thansettakij: { rank: 29, avgDailyUip: 48894, avgDailySessions: 59556, avgDailyPageviews: 80775 },
      komchadluek: { rank: 17, avgDailyUip: 87098, avgDailySessions: 104868, avgDailyPageviews: 141329 },
      posttoday: { rank: 44, avgDailyUip: 21561, avgDailySessions: 28781, avgDailyPageviews: 36669 },
      thainews: { rank: 42, avgDailyUip: 24864, avgDailySessions: 30931, avgDailyPageviews: 39761 },
      nationtv: { rank: 50, avgDailyUip: 18412, avgDailySessions: 20472, avgDailyPageviews: 24641 },
      nationthailand: { rank: 53, avgDailyUip: 15961, avgDailySessions: 21345, avgDailyPageviews: 31438 },
      springnews: { rank: 85, avgDailyUip: 5008, avgDailySessions: 11402, avgDailyPageviews: 14872 },
      thepeople: { rank: 119, avgDailyUip: 1481, avgDailySessions: 1799, avgDailyPageviews: 1983 },
      khobsanam: { rank: 188, avgDailyUip: 158, avgDailySessions: 231, avgDailyPageviews: 617 },
      tnews: { rank: 12, avgDailyUip: 119872, avgDailySessions: 155553, avgDailyPageviews: 222025 },
    },
  },
  {
    monthKey: '202608',
    monthLabel: 'August 2026',
    shortLabel: "Aug '26",
    daysInMonth: 31,
    sourceUrl: 'https://truehits.net/script/202608/rank0.php',
    brands: {
      bangkokbiznews: { rank: 15, avgDailyUip: 88088, avgDailySessions: 114887, avgDailyPageviews: 155416 },
      thansettakij: { rank: 28, avgDailyUip: 47236, avgDailySessions: 57867, avgDailyPageviews: 73569 },
      komchadluek: { rank: 14, avgDailyUip: 93699, avgDailySessions: 117503, avgDailyPageviews: 160834 },
      posttoday: { rank: 45, avgDailyUip: 21086, avgDailySessions: 26371, avgDailyPageviews: 33349 },
      thainews: { rank: 43, avgDailyUip: 21744, avgDailySessions: 27496, avgDailyPageviews: 34880 },
      nationtv: { rank: 59, avgDailyUip: 11891, avgDailySessions: 13779, avgDailyPageviews: 17403 },
      nationthailand: { rank: 49, avgDailyUip: 17415, avgDailySessions: 23511, avgDailyPageviews: 34639 },
      springnews: { rank: 77, avgDailyUip: 6102, avgDailySessions: 12412, avgDailyPageviews: 16610 },
      thepeople: { rank: 116, avgDailyUip: 1454, avgDailySessions: 1816, avgDailyPageviews: 2018 },
      khobsanam: { rank: 189, avgDailyUip: 134, avgDailySessions: 304, avgDailyPageviews: 720 },
      tnews: { rank: 11, avgDailyUip: 121033, avgDailySessions: 163971, avgDailyPageviews: 254996 },
    },
  },
  {
    monthKey: '202609',
    monthLabel: 'September 2026',
    shortLabel: "Sep '26",
    daysInMonth: 30,
    sourceUrl: 'https://truehits.net/script/202609/rank0.php',
    brands: {
      bangkokbiznews: { rank: 14, avgDailyUip: 101171, avgDailySessions: 131879, avgDailyPageviews: 178510 },
      thansettakij: { rank: 27, avgDailyUip: 47940, avgDailySessions: 58780, avgDailyPageviews: 76555 },
      komchadluek: { rank: 18, avgDailyUip: 85315, avgDailySessions: 103850, avgDailyPageviews: 138774 },
      posttoday: { rank: 52, avgDailyUip: 15303, avgDailySessions: 19943, avgDailyPageviews: 25392 },
      thainews: { rank: 48, avgDailyUip: 17599, avgDailySessions: 22880, avgDailyPageviews: 28686 },
      nationtv: { rank: 57, avgDailyUip: 12717, avgDailySessions: 15096, avgDailyPageviews: 18782 },
      nationthailand: { rank: 42, avgDailyUip: 20026, avgDailySessions: 26931, avgDailyPageviews: 40597 },
      springnews: { rank: 72, avgDailyUip: 7060, avgDailySessions: 13830, avgDailyPageviews: 22773 },
      thepeople: { rank: 121, avgDailyUip: 1204, avgDailySessions: 1327, avgDailyPageviews: 1524 },
      khobsanam: { rank: 184, avgDailyUip: 156, avgDailySessions: 217, avgDailyPageviews: 589 },
      tnews: { rank: 16, avgDailyUip: 89808, avgDailySessions: 114118, avgDailyPageviews: 190453 },
    },
  },
  {
    monthKey: '202610',
    monthLabel: 'October 2026',
    shortLabel: "Oct '26",
    daysInMonth: 31,
    sourceUrl: 'https://truehits.net/script/202610/rank0.php',
    brands: {
      bangkokbiznews: { rank: 14, avgDailyUip: 84444, avgDailySessions: 108820, avgDailyPageviews: 146398 },
      thansettakij: { rank: 24, avgDailyUip: 46061, avgDailySessions: 64159, avgDailyPageviews: 91234 },
      komchadluek: { rank: 22, avgDailyUip: 49544, avgDailySessions: 57201, avgDailyPageviews: 76716 },
      posttoday: { rank: 56, avgDailyUip: 12578, avgDailySessions: 15945, avgDailyPageviews: 20130 },
      thainews: { rank: 42, avgDailyUip: 18325, avgDailySessions: 24031, avgDailyPageviews: 30201 },
      nationtv: { rank: 53, avgDailyUip: 12981, avgDailySessions: 16164, avgDailyPageviews: 19916 },
      nationthailand: { rank: 41, avgDailyUip: 21915, avgDailySessions: 29076, avgDailyPageviews: 46337 },
      springnews: { rank: 75, avgDailyUip: 5268, avgDailySessions: 11918, avgDailyPageviews: 15042 },
      thepeople: { rank: 115, avgDailyUip: 1134, avgDailySessions: 1270, avgDailyPageviews: 1445 },
      khobsanam: { rank: 180, avgDailyUip: 152, avgDailySessions: 217, avgDailyPageviews: 556 },
      tnews: { rank: 17, avgDailyUip: 76226, avgDailySessions: 94417, avgDailyPageviews: 156525 },
    },
  },
];

export const AWARDS_PLATFORMS: AwardsPlatform[] = [
  {
    id: 'awards-komchadluek',
    name: 'Kom Chad Luek Awards',
    domain: 'awards.komchadluek.net',
    url: 'https://awards.komchadluek.net',
    themeColor: '#d70000',
    availabilityMode: 'Always Online',
    yearsActive: 'Annual Redesign Every Year',
    originNote: 'Built frontend from scratch on joining Nation Group',
    storageTech: 'Data & Live Vote Buffer via Redis',
    description:
      'Flagship high-concurrency national voting platform kept live year-round, storing & buffering millions of real-time votes and tallies through Redis with a complete annual visual redesign.',
  },
  {
    id: 'awards-thepeople',
    name: 'The People Awards',
    domain: 'awards.thepeople.co',
    url: 'https://awards.thepeople.co',
    themeColor: '#d81b2c',
    availabilityMode: 'Event-Window Cloud Optimized',
    yearsActive: '3 Consecutive Years',
    originNote: 'Spin-up / Spin-down cost-optimized event architecture',
    storageTech: 'Event State & Traffic Cache via Redis',
    description:
      'Annual recognition microsite storing event payloads and high-traffic reads via Redis, spun up dynamically during event seasons across 3 consecutive editions to keep cloud budgets lean.',
  },
  {
    id: 'awards-thansettakij',
    name: 'Thansettakij Awards',
    domain: 'awards.thansettakij.com',
    url: 'https://awards.thansettakij.com',
    themeColor: '#ff8500',
    availabilityMode: 'Event-Window Cloud Optimized',
    yearsActive: '2 Consecutive Years',
    originNote: 'Event-driven containerized microsite lifecycle',
    storageTech: 'Fast Event Data & Caching via Redis',
    description:
      'Business excellence awards platform backed by Redis data caching for surge resilience, engineered for rapid seasonal spin-up and budget-conscious decommissioning across 2 annual cycles.',
  },
];

export const MORNING_BRIEF_N8N_STEPS: N8nPipelineStage[] = [
  {
    id: 'webhook-auth',
    step: '01',
    nodeName: 'Webhook & Auth Verify',
    tech: 'n8n Webhook · stag-auth.nationgroup.com',
    category: 'Trigger & Auth',
    summary: 'Triggered when an editor selects a curated news brief on the Morning Brief summary UI to generate a full SEO article.',
    technicalDetail:
      'Validates accesstoken, username, and employeeId against Nation Group Auth Service (HTTP 200 gate) before initializing articleId and brandCode.',
    outputPreview: '{ code: 200, brandCode: "KT", articleId: "6941fab8...", status: "verified" }',
  },
  {
    id: 'redis-lock',
    step: '02',
    nodeName: 'Redis Process State Lock',
    tech: 'n8n Sub-Workflow · Redis',
    category: 'State & Data',
    summary: 'Tracks live generation stages in Redis (`Morning Brief - Process Redis`) to prevent duplicate LLM runs and stream progress to the UI.',
    technicalDetail:
      'Keys execution state by `{brandCode}_{articleId}_{employeeId}` across Find Style → Find News → Generate News → Create News, then cleanly deletes the key on completion.',
    outputPreview: 'SET styled:KT_6941fab8_640174 -> { stage: "generating", executionId: "run_v5" }',
  },
  {
    id: 'mongo-guidelines',
    step: '03',
    nodeName: 'Parallel MongoDB & Brand .md Fetch',
    tech: 'MongoDB (buProfiles, newsBriefs, newsRaws) · HTTP .md',
    category: 'State & Data',
    summary: 'Fetches brand-specific Markdown style guides and loops through referenced raw news sources in parallel.',
    technicalDetail:
      'Queries `buProfiles` by brandCode to download live `.md` editorial guidelines while iterating `newsBriefs.refs` via `SplitInBatches` to load all source `newsRaws`, then merges 3 streams.',
    outputPreview: 'Merged: [BrandGuidelines.md (KT)] + [newsBrief] + [3x newsRaws sources]',
  },
  {
    id: 'seo-prompt',
    step: '04',
    nodeName: 'Brand Guidelines + SEO Prompt Engine',
    tech: 'JavaScript Code Node · Editorial SEO Spec',
    category: 'AI & Prompting',
    summary: 'Compiles strict Thai/English journalistic rules, tone guardrails, and HTML SEO structure into a deterministic JSON prompt.',
    technicalDetail:
      'Enforces zero conversational fillers (no ครับ/ค่ะ), direct news hook (150–200 chars), 50–70 char SEO title, 5–10 keywords, `<ul><li>` key points, and 3 structured HTML sections (`<h2>`/`<h3>`/`<p>`/`<strong>`).',
    outputPreview: 'Prompt Specs: Strict JSON-only · 3 HTML sections · 5–10 SEO Keywords · Zero markdown fences',
  },
  {
    id: 'gemini-metrics',
    step: '05',
    nodeName: 'Google Gemini Agent & Cost Metrics Logger',
    tech: 'LangChain Agent · Gemini 2.5 Flash · Token Estimator',
    category: 'AI & Prompting',
    summary: 'Generates the styled SEO article via Google Gemini and computes real-time Thai/English token counts and USD cost per run.',
    technicalDetail:
      'Custom Metrics Logger calculates Thai tokens (2.5 chars/token) vs. English tokens (4 chars/token), input/output USD cost ($0.075 / $0.30 per 1M for Gemini 2.5 Flash), compression ratio, and execution ms.',
    outputPreview: '{ model: "gemini-2.5-flash", prompt_tokens: 1840, completion_tokens: 1120, cost_usd: 0.000474 }',
  },
  {
    id: 'parser-cms',
    step: '06',
    nodeName: 'Resilient JSON Parser → Brand Router → One CMS',
    tech: 'Auto-Repair Parser · One CMS API · MongoDB Logs',
    category: 'Publishing & Logs',
    summary: 'Sanitizes LLM JSON, routes to the target brand CMS API (`KT` / `NT` / `SPN`), creates a Draft article, and audits logs.',
    technicalDetail:
      'Strips accidental fences, validates 10 required fields, routes `KT → bangkokbiznews`, `NT → nationthailand`, `SPN → springnews`, POSTs `status: "Draft"`, records `newsStylesLogs`, and clears Redis lock.',
    outputPreview: 'POST backoffice.bangkokbiznews.com/api/articles -> { success: true, status: "Draft" }',
  },
];

export const TECH_PROFICIENCY_LAYERS: TechLayer[] = [
  {
    id: 'frontend-mobile',
    stage: 'Layer 01',
    title: 'Frontend & Mobile Architecture',
    shortTitle: 'Frontend & UI',
    subtitle: 'What I build for browser rendering, multi-brand design systems & mobile commerce.',
    capabilities: [
      {
        title: 'Multi-Brand Next.js & React Portals',
        detail: 'Architect shared SSR/ISR frontends serving 11+ high-traffic digital news websites and annual awards platforms.',
      },
      {
        title: 'Reusable Design Systems & Booking UIs',
        detail: 'Build modular component libraries with TypeScript, Tailwind CSS, Ant Design, MUI & Redux for media and travel-tech booking.',
      },
      {
        title: 'Flutter Mobile Apps & Omise Payments',
        detail: 'Direct cross-platform Flutter commerce apps (NationHouse & BizElite) with integrated in-app payment flows.',
      },
      {
        title: 'Team Leadership & Code Governance',
        detail: 'Lead frontend engineers across architecture planning, Figma UX handoffs, PR reviews, and technical mentoring.',
      },
    ],
    brands: [
      { name: 'React.js', logo: assetUrl('/assets/logos/tech/react.svg'), usage: '11+ Production Portals' },
      { name: 'Next.js', logo: assetUrl('/assets/logos/tech/nextjs.svg'), usage: 'SSR / ISR Multi-Brand' },
      { name: 'TypeScript', logo: assetUrl('/assets/logos/tech/typescript.svg'), usage: 'Type-Safe Architecture' },
      { name: 'JavaScript', logo: assetUrl('/assets/logos/tech/javascript.svg'), usage: 'ES6+ Full-Stack' },
      { name: 'Tailwind CSS', logo: assetUrl('/assets/logos/tech/tailwindcss.svg'), usage: 'Modern UI Systems' },
      { name: 'Ant Design', logo: assetUrl('/assets/logos/tech/antdesign.svg'), usage: 'Back-Office & CMS' },
      { name: 'MUI', logo: assetUrl('/assets/logos/tech/mui.svg'), usage: 'Enterprise UI Kits' },
      { name: 'Redux', logo: assetUrl('/assets/logos/tech/redux.svg'), usage: 'Travel Booking State' },
      { name: 'Flutter', logo: assetUrl('/assets/logos/tech/flutter.svg'), usage: 'Mobile + Omise Pay' },
      { name: 'Figma', logo: assetUrl('/assets/logos/tech/figma.svg'), usage: 'UX/UI Design Handoff' },
    ],
  },
  {
    id: 'seo-edge',
    stage: 'Layer 02',
    title: 'Performance, SEO & Edge Security',
    shortTitle: 'SEO & Edge',
    subtitle: 'What I deliver for organic growth, Core Web Vitals, SSO & surge protection.',
    capabilities: [
      {
        title: 'Technical SEO & Core Web Vitals at Scale',
        detail: 'Optimize LCP, CLS, structured JSON-LD metadata, and crawl performance to sustain top organic search rankings.',
      },
      {
        title: 'Cloudflare WAF, Tunnels & Edge Caching',
        detail: 'Shield origin infrastructure and absorb extreme traffic spikes during national elections and live voting bursts.',
      },
      {
        title: 'Cross-Domain Auth0 Single Sign-On',
        detail: 'Unify reader authentication (`nid`) seamlessly across 10+ independent media domains without breaking sessions.',
      },
      {
        title: 'Behavioral Event Instrumentation',
        detail: 'Configure GA4, GTM, and Search Console pipelines to feed verified engagement telemetry into BigQuery.',
      },
    ],
    brands: [
      { name: 'Cloudflare', logo: assetUrl('/assets/logos/tech/cloudflare.svg'), usage: 'WAF · Tunnels · Cache' },
      { name: 'Auth0', logo: assetUrl('/assets/logos/tech/auth0.svg'), usage: 'Cross-Domain SSO' },
      { name: 'Google Analytics 4', logo: assetUrl('/assets/logos/tech/googleanalytics.svg'), usage: 'Event & GTM Telemetry' },
      { name: 'Search Console', logo: assetUrl('/assets/logos/tech/googlesearchconsole.svg'), usage: 'Technical SEO & CWV' },
    ],
  },
  {
    id: 'backend-data',
    stage: 'Layer 03',
    title: 'Backend, APIs & High-Concurrency Storage',
    shortTitle: 'Backend & DB',
    subtitle: 'What I engineer for API orchestration, Redis voting/caching, databases & webhooks.',
    capabilities: [
      {
        title: 'Redis High-Concurrency Data & Vote Storage',
        detail: 'Store live awards voting data, rate locks, and n8n workflow execution state in Redis to eliminate DB bottlenecks.',
      },
      {
        title: 'Node.js BFFs & RESTful API Services',
        detail: 'Build backend-for-frontend APIs, CMS integrations, authentication bridges, and travel booking services.',
      },
      {
        title: 'NoSQL & Relational Database Engineering',
        detail: 'Model reader profiles & AI logs in MongoDB/Firebase and tune complex MS SQL Server Stored Procedures for HR systems.',
      },
      {
        title: 'LINE Official Account Webhooks',
        detail: 'Connect backend events to LINE OA Flex Messages to push personalized news feeds directly to readers.',
      },
    ],
    brands: [
      { name: 'Redis', logo: assetUrl('/assets/logos/tech/redis.svg'), usage: 'Awards Voting & Locks' },
      { name: 'Node.js', logo: assetUrl('/assets/logos/tech/nodedotjs.svg'), usage: 'APIs & BFF Services' },
      { name: 'MongoDB', logo: assetUrl('/assets/logos/tech/mongodb.svg'), usage: 'Profiles & AI Logs' },
      { name: 'Firebase', logo: assetUrl('/assets/logos/tech/firebase.svg'), usage: 'Realtime App Data' },
      { name: 'MS SQL Server', logo: assetUrl('/assets/logos/tech/mssql.svg'), usage: 'Stored Procedures' },
      { name: 'LINE OA', logo: assetUrl('/assets/logos/tech/line.svg'), usage: 'Webhook Delivery' },
    ],
  },
  {
    id: 'ai-analytics',
    stage: 'Layer 04',
    title: 'AI Orchestration, LLM Agents & Analytics',
    shortTitle: 'AI & Data',
    subtitle: 'What I ship across production LLM pipelines, n8n automation, RAG & BI analytics.',
    capabilities: [
      {
        title: 'Production n8n + Gemini 2.5 Flash Workflows',
        detail: 'Automate multi-brand SEO article drafting from curated briefs directly into One CMS with real-time token/USD cost logs.',
      },
      {
        title: 'Multi-Agent Python & Advanced RAG Systems',
        detail: 'Design tool-calling multi-agent workflows and retrieval pipelines backed by IMC certifications (Agentic AI & Advanced RAG).',
      },
      {
        title: 'BigQuery & Power BI Reader Intelligence',
        detail: 'Transform cross-domain Auth0 reading behavior into live Power BI dashboards and topic affinity signals.',
      },
      {
        title: 'Editorial Guardrails & Resilient JSON Parsing',
        detail: 'Enforce strict HTML SEO structures, brand tone `.md` guidelines, and auto-repair parsers for deterministic LLM output.',
      },
    ],
    brands: [
      { name: 'Google Gemini', logo: assetUrl('/assets/logos/tech/googlegemini.svg'), usage: '2.5 Flash SEO Engine' },
      { name: 'n8n', logo: assetUrl('/assets/logos/tech/n8n.svg'), usage: 'Production AI Flows' },
      { name: 'Python', logo: assetUrl('/assets/logos/tech/python.svg'), usage: 'Multi-Agent & RAG' },
      { name: 'LangChain', logo: assetUrl('/assets/logos/tech/langchain.svg'), usage: 'Agent Orchestration' },
      { name: 'BigQuery', logo: assetUrl('/assets/logos/tech/googlebigquery.svg'), usage: 'Behavior Datasets' },
      { name: 'Power BI', logo: assetUrl('/assets/logos/tech/powerbi.svg'), usage: 'Live Reader Reports' },
    ],
  },
  {
    id: 'cloud-devops',
    stage: 'Layer 05',
    title: 'Multi-Cloud & DevOps Delivery',
    shortTitle: 'Cloud & Ops',
    subtitle: 'What I manage across cloud migrations, containerized hosting & release workflows.',
    capabilities: [
      {
        title: 'Multi-Cloud Migrations & Decommissioning',
        detail: 'Lead production cutovers and server decommissioning across Google Cloud Platform, Huawei Cloud, and AWS.',
      },
      {
        title: 'Docker & Nginx Reverse-Proxy Architecture',
        detail: 'Containerize web services and configure Nginx routing and caching for reliable multi-brand delivery.',
      },
      {
        title: 'Seasonal Cost-Optimized Event Hosting',
        detail: 'Spin up and spin down recurring national awards microsites around event windows to minimize idle cloud spend.',
      },
      {
        title: 'Git Release Governance & CI Workflows',
        detail: 'Manage branching strategies, code reviews, and zero-downtime deployments across GitHub and GitLab.',
      },
    ],
    brands: [
      { name: 'Google Cloud', logo: assetUrl('/assets/logos/tech/googlecloud.svg'), usage: 'GCP & BigQuery Ops' },
      { name: 'AWS', logo: assetUrl('/assets/logos/tech/aws.svg'), usage: 'AWS Jam Certified' },
      { name: 'Huawei Cloud', logo: assetUrl('/assets/logos/tech/huawei.svg'), usage: 'Server Migrations' },
      { name: 'Docker', logo: assetUrl('/assets/logos/tech/docker.svg'), usage: 'Containerized Apps' },
      { name: 'Nginx', logo: assetUrl('/assets/logos/tech/nginx.svg'), usage: 'Reverse Proxy & Cache' },
      { name: 'GitHub', logo: assetUrl('/assets/logos/tech/github.svg'), usage: 'CI/CD & Reviews' },
      { name: 'GitLab', logo: assetUrl('/assets/logos/tech/gitlab.svg'), usage: 'Enterprise Repos' },
    ],
  },
];

export const ARCHITECTURE_BLUEPRINTS: ArchitectureBlueprint[] = [
  {
    id: 'morning-brief-n8n',
    tabLabel: 'Morning Brief AI (n8n)',
    title: 'n8n + Gemini 2.5 Flash SEO News Engine (V5.0)',
    subtitle: 'Webhook → Redis Lock → MongoDB + .md Guidelines → Gemini → One CMS',
    context:
      'Production n8n AI workflow I built for the Morning Brief platform: converts editor-selected summaries into brand-styled, SEO-structured HTML drafts directly inside One CMS.',
    nodes: [
      {
        id: 'mb-auth',
        stage: '01. Trigger & Lock',
        title: 'Webhook + Auth + Redis Lock',
        tech: 'n8n · Auth Verify · Redis',
        role: 'Verified editorial trigger with duplicate-run protection',
        detail:
          'Verifies employee credentials via Nation Group Auth API and sets a Redis execution lock keyed by brandCode + articleId + employeeId.',
        impact: 'Prevented race conditions and enabled real-time progress tracking in the newsroom UI.',
      },
      {
        id: 'mb-context',
        stage: '02. Brand Context',
        title: 'MongoDB & Live .md Guidelines',
        tech: 'MongoDB · HTTP .md · SplitInBatches',
        role: 'Dynamic brand voice & multi-source news grounding',
        detail:
          'Loads brand-specific Markdown style guides from `buProfiles` and iterates all source `newsRaws` referenced by the selected `newsBrief`.',
        impact: 'Single workflow serves KT (Bangkok Biz), NT (Nation Thailand), and SPN (Spring News).',
      },
      {
        id: 'mb-gemini',
        stage: '03. AI & Telemetry',
        title: 'Gemini 2.5 Flash + Cost Logger',
        tech: 'LangChain Agent · Gemini · Token Calc',
        role: 'Strict JSON HTML generation with live USD cost auditing',
        detail:
          'Enforces SEO title length, direct hooks, zero filler phrases, and HTML `<h2>`/`<ul><li>` tags while logging Thai/EN token estimates and exact per-run USD cost.',
        impact: 'Transparent AI unit economics and consistent SEO compliance across newsrooms.',
      },
      {
        id: 'mb-cms',
        stage: '04. CMS Delivery',
        title: 'Auto-Repair Parser → One CMS',
        tech: 'JSON Repair · Brand Router · MongoDB Logs',
        role: 'Direct Draft creation with full audit trail',
        detail:
          'Sanitizes JSON output, maps brandCode to the target back-office API, creates a `Draft` article in One CMS, inserts `newsStylesLogs`, and clears Redis.',
        impact: 'Cut editorial first-draft creation time while preserving human-in-the-loop review.',
      },
    ],
  },
  {
    id: 'sso-personalization',
    tabLabel: 'SSO & Personalization',
    title: 'Cross-Domain Identity, BigQuery & LINE OA Flow',
    subtitle: '11 Media Properties → Auth0 SSO → BigQuery / Power BI → LINE OA',
    context:
      'Unified fragmented audience sessions across Nation Group brands into a single `nid` identity graph streaming reading behavior into BigQuery & Power BI to power LINE OA recommendations.',
    nodes: [
      {
        id: 'sso-edge',
        stage: '01. Identity',
        title: 'Auth0 Cross-Domain SSO',
        tech: 'Auth0 · Next.js · Google OAuth2',
        role: 'Unified `nid` reader identity across 10+ news domains',
        detail:
          'Engineered seamless single sign-on across bangkokbiznews.com, thansettakij.com, nationthailand.com, and sister properties without breaking sessions.',
        impact: 'Consolidated multi-brand reader profiles under a unified cross-domain identity.',
      },
      {
        id: 'event-stream',
        stage: '02. Analytics',
        title: 'BigQuery & Power BI Telemetry',
        tech: 'Google BigQuery · GA4 · Power BI',
        role: 'Verified article category, engagement seconds & view tracking',
        detail:
          'Streams `article_category`, `page_path`, `Avg eng/sec`, and `total_views` per `nid` into BigQuery and Power BI Report Server for real-time audience segmentation.',
        impact: 'Delivered verifiable per-user behavioral profiles across Business, Economics, Finance & Lifestyle.',
      },
      {
        id: 'ai-curation',
        stage: '03. Intelligence',
        title: 'AI Curation & Profile Scoring',
        tech: 'MongoDB · Python · LLM APIs',
        role: 'Interest affinity ranking per reader profile',
        detail:
          'Combines engagement duration and category affinity signals to select high-relevance stories tailored to each registered reader.',
        impact: 'Transformed raw cross-domain analytics into personalized reading feeds.',
      },
      {
        id: 'line-delivery',
        stage: '04. Delivery',
        title: 'LINE Official Account Webhooks',
        tech: 'Node.js · LINE OA · Flex Messages',
        role: 'Automated personalized reader re-engagement',
        detail:
          'Delivers AI-curated story cards through event-driven LINE OA webhooks mapped back to authenticated reader sessions.',
        impact: 'Closed the loop from behavioral telemetry to direct personalized distribution.',
      },
    ],
  },
  {
    id: 'high-traffic-edge',
    tabLabel: '11-Platform Edge Stack',
    title: 'Multi-Cloud High-Traffic Web & Annual Awards Stack',
    subtitle: 'Next.js · Cloudflare WAF/Tunnels · Redis · GCP & Huawei Cloud',
    context:
      'Spearheaded frontend architecture, Core Web Vitals, and multi-cloud resilience across 11 major news portals plus annual high-concurrency national awards voting platforms.',
    nodes: [
      {
        id: 'cloudflare-edge',
        stage: '01. Edge & Security',
        title: 'Cloudflare WAF, Tunnels & Cache',
        tech: 'Cloudflare Tunnels · WAF · Edge Cache',
        role: 'Surge absorption & origin protection',
        detail:
          'Deployed Cloudflare Tunnels and edge caching to absorb breaking news, national election nights, and awards voting spikes.',
        impact: 'Hardened web security and reduced origin bandwidth load under peak traffic.',
      },
      {
        id: 'nextjs-ssr',
        stage: '02. Multi-Brand Web',
        title: '11+ Next.js & React Portals',
        tech: 'Next.js · React · Core Web Vitals',
        role: 'Shared architecture serving millions MAU',
        detail:
          'Established frontend standards, code review practices, and Core Web Vitals / Technical SEO discipline across the entire Nation Group portfolio.',
        impact: 'Sustained top organic search rankings and fast mobile loading at national scale.',
      },
      {
        id: 'redis-layer',
        stage: '03. Voting & Mobile',
        title: 'Awards Concurrency & Flutter Apps',
        tech: 'Redis · Flutter · Omise · Node.js',
        role: 'Millions of votes per window + mobile payments',
        detail:
          'Originated awards.komchadluek.net frontend, managed annual redesigns plus event-window spin-up/down for The People & Thansettakij Awards, and directed Flutter apps with Omise.',
        impact: 'Zero-bottleneck national voting and cost-optimized seasonal event hosting.',
      },
      {
        id: 'multi-cloud',
        stage: '04. Cloud Ops',
        title: 'GCP & Huawei Cloud Migrations',
        tech: 'GCP · Huawei Cloud · AWS · Docker',
        role: 'Zero-disruption server migration & decommissioning',
        detail:
          'Led critical server migrations and decommissioning across Huawei Cloud and GCP with containerized Nginx/Node workloads.',
        impact: 'Improved system resilience and lowered recurring infrastructure costs.',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ai-news-seo-assistant',
    category: 'ai-data',
    categoryLabel: 'Production n8n · Gemini AI',
    year: '2024 – Present',
    organization: 'Nation Group (Thailand) Public Co., Ltd.',
    title: 'Morning Brief AI — Brand-Styled SEO News Generator (n8n V5.0)',
    summary:
      'Built the production n8n + Google Gemini 2.5 Flash article-generation workflow that transforms selected Morning Brief summaries into brand-compliant, SEO-structured HTML drafts directly inside One CMS.',
    featured: true,
    schematicType: 'ai-newsroom',
    challenge:
      'Different newsrooms (Bangkok Biz News, Nation Thailand, Spring News) enforce distinct editorial tone guides and strict SEO HTML formatting, making generic LLM outputs unusable without heavy manual rewriting.',
    architecture: [
      'Engineered an authenticated n8n webhook pipeline (`Style Guide - Insert News V5.0`) protected by Nation Group Auth verification and Redis concurrency locks.',
      'Dynamically loads per-brand Markdown style guides from MongoDB `buProfiles` and merges referenced `newsBriefs` + `newsRaws` into a strict JSON-only SEO prompt.',
      'Integrated Google Gemini 2.5 Flash with a custom Thai/English token & USD cost Metrics Logger, auto-repair JSON parser, and direct Brand API Router (`KT`, `NT`, `SPN`) posting `Draft` articles into One CMS.',
    ],
    outcomes: [
      'Automated multi-brand SEO drafting (50–70 char titles, hooks, keywords, `<ul><li>` key points, 3 structured HTML sections) into One CMS.',
      'Full execution cost transparency per article via real-time token & USD metrics logging plus MongoDB audit trails.',
      'Complemented by Python Multi-Agent LLM experiments and 2025 IMC certifications in Agentic AI & Advanced RAG.',
    ],
    stack: ['n8n', 'Google Gemini 2.5 Flash', 'Python', 'MongoDB', 'Redis', 'One CMS API', 'Technical SEO'],
  },
  {
    id: 'high-traffic-news-architecture',
    category: 'high-traffic',
    categoryLabel: '11+ Platforms · Multi-Cloud',
    year: '2021 – Present',
    organization: 'Nation Group (Thailand) Public Co., Ltd.',
    title: '11 High-Traffic Digital News Platforms & Multi-Cloud Migration',
    summary:
      'Led frontend architecture, Core Web Vitals optimization, Cloudflare edge caching/Tunnels, Redis, and GCP/Huawei Cloud migrations across Thailand’s premier media network.',
    schematicType: 'edge-platforms',
    challenge:
      'Maintaining fast Core Web Vitals, uninterrupted uptime, and clean multi-brand codebases across 11 major portals during extreme traffic spikes such as national elections and breaking news.',
    architecture: [
      'Established shared React.js and Next.js architectural standards, code review practices, and mentorship across the frontend team for 4+ years as Lead.',
      'Implemented Cloudflare Tunnels, WAF rules, edge caching, and Redis caching layers to shield origins under surge traffic.',
      'Led critical server migrations and decommissioning across Huawei Cloud and Google Cloud Platform.',
    ],
    outcomes: [
      'Consistently served millions of monthly active users across 11 major news platforms.',
      'Improved system resilience and reduced cloud infrastructure overhead post-migration.',
      'Promoted to Lead Frontend Developer within 1 year of joining Nation Group.',
    ],
    stack: ['React.js', 'Next.js', 'Cloudflare WAF & Tunnels', 'Redis', 'Docker', 'Nginx', 'GCP', 'Huawei Cloud'],
    links: [
      { label: 'bangkokbiznews.com', url: 'https://www.bangkokbiznews.com' },
      { label: 'thansettakij.com', url: 'https://www.thansettakij.com' },
      { label: 'nationthailand.com', url: 'https://www.nationthailand.com' },
    ],
  },
  {
    id: 'realtime-voting-flutter-apps',
    category: 'high-traffic',
    categoryLabel: 'Annual Awards & Mobile',
    year: '2021 – Present',
    organization: 'Nation Group (Thailand) Public Co., Ltd.',
    title: 'Annual National Awards Voting & Flutter Commerce Apps',
    summary:
      'Originated awards.komchadluek.net frontend (redesigned annually), delivered seasonal awards sites for The People (3 yrs) & Thansettakij (2 yrs), and directed Flutter apps with Omise.',
    schematicType: 'voting-flutter',
    challenge:
      'Annual national awards experience massive concurrent voting bursts while seasonal event sites require rapid annual redesigns and cost-conscious cloud lifecycle management.',
    architecture: [
      'Built the awards.komchadluek.net frontend from scratch and led annual redesigns handling millions of votes per voting window.',
      'Architected event-window spin-up/spin-down deployments for awards.thepeople.co (3 years) and awards.thansettakij.com (2 years) to optimize cloud budget.',
      'Directed Flutter mobile apps (NationHouse & BizElite) including frontend Omise in-app payment integration, while mentoring junior engineers to own recurring events.',
    ],
    outcomes: [
      'Handled millions of users per voting window with zero origin downtime.',
      'Reduced idle cloud spend on seasonal awards platforms through clean event-window hosting.',
      'Shipped production Flutter mobile apps with live Omise payment capabilities.',
    ],
    stack: ['Next.js', 'React.js', 'Flutter', 'Omise Payments', 'Redis', 'Cloudflare', 'Node.js'],
    links: [
      { label: 'awards.komchadluek.net', url: 'https://awards.komchadluek.net' },
      { label: 'awards.thepeople.co', url: 'https://awards.thepeople.co' },
      { label: 'awards.thansettakij.com', url: 'https://awards.thansettakij.com' },
    ],
  },
  {
    id: 'cross-domain-sso-personalization',
    category: 'ai-data',
    categoryLabel: 'SSO · BigQuery · Power BI',
    year: '2024 – Present',
    organization: 'Nation Group (Thailand) Public Co., Ltd.',
    title: 'Cross-Domain Auth0 SSO, Behavioral Analytics & LINE OA Personalization',
    summary:
      'Architected an end-to-end user identity & personalization pipeline unifying Auth0 SSO (`nid`) across 10+ media domains with Google BigQuery, Power BI reporting, MongoDB, and LINE OA webhooks.',
    featured: true,
    schematicType: 'sso-personalization',
    previewImage: PROFILE.powerBiProofImage,
    galleryImages: [
      {
        src: PROFILE.powerBiProofImage,
        caption: 'Live Power BI Report Server — Unified Auth0 nid, Registered Channel (Google OAuth2), Article Categories & Engagement Seconds',
      },
    ],
    challenge:
      'Ten+ digital news properties operated with siloed reader sessions, preventing cross-brand behavioral profiling and personalized content distribution.',
    architecture: [
      'Engineered cross-domain Single Sign-On using Auth0 (`nid`) unifying reader accounts across 10+ independent media properties.',
      'Streamed behavioral reading telemetry (`article_category`, `page_path`, `Avg eng/sec`, `total_views`) into Google BigQuery, surfaced in Power BI Report Server, and paired with MongoDB reader profiles.',
      'Designed the end-to-end Personalization & LINE Official Account webhook delivery architecture to send AI-curated story cards back to readers.',
    ],
    outcomes: [
      'Unified multi-brand audience identity verified live in Power BI behavioral dashboards.',
      'Established centralized BigQuery datasets powering audience analytics and AI curation.',
      'Architected complete end-to-end Personalization & LINE OA display flows.',
    ],
    stack: ['Auth0 SSO', 'Google BigQuery', 'Power BI', 'MongoDB', 'Next.js', 'LINE OA Webhooks', 'GA4 / GTM'],
    links: [
      { label: 'Personalization Architecture Flow', url: PROFILE.personalizationFlowUrl },
      { label: 'LINE OA Deep-Dive Display Flow', url: PROFILE.lineFlowUrl },
    ],
  },
  {
    id: 'travel-tech-booking-platforms',
    category: 'travel-enterprise',
    categoryLabel: 'Travel-Tech · Real UI Showcase',
    year: '2019',
    organization: 'TravisGo Co., Ltd.',
    brandLogo: assetUrl('/assets/aistudio/image_de5efb3e.png'),
    title: 'Multi-Modal Travel Booking & Back-Office UI Architecture',
    summary:
      'Built reusable React/Redux UI component libraries and modular front-end architectures for travel-tech web and back-office booking platforms covering boats, hotels, and flights.',
    schematicType: 'travel-booking',
    previewImage: assetUrl('/assets/portfolio/travisgo/dashboard.png'),
    galleryImages: [
      { src: assetUrl('/assets/portfolio/travisgo/dashboard.png'), caption: 'TravisGo Operations Dashboard (Sales, Profits & Omise Payment Summary)' },
      { src: assetUrl('/assets/portfolio/travisgo/booking-1.png'), caption: 'Multi-Modal Booking Management Console' },
      { src: assetUrl('/assets/portfolio/travisgo/booking-2.png'), caption: 'Booking Details & Passenger Itinerary Breakdown' },
      { src: assetUrl('/assets/portfolio/travisgo/payment.png'), caption: 'Payment Processing & Settlement Console' },
      { src: assetUrl('/assets/portfolio/travisgo/accounting.png'), caption: 'Travel Accounting & Reconciliation Ledger' },
      { src: assetUrl('/assets/portfolio/travisgo/refund.png'), caption: 'Refund Request Approval Workflow' },
    ],
    challenge:
      'Multi-modal travel inventory (boats, hotels, and flights) demands consistent booking patterns, complex availability state handling, and reusable components across customer and operator views.',
    architecture: [
      'Designed reusable UI component libraries and modular front-end architecture using React, Redux, and Bootstrap.',
      'Delivered responsive, cross-browser consumer storefront (tvg.poysoft.com) and back-office operator tooling using JavaScript (ES6+), HTML5/CSS3, and Node.js.',
    ],
    outcomes: [
      'Accelerated feature shipping across multiple travel verticals (boats, hotels, flights) through shared component modules.',
      'Direct domain foundation in travel-tech booking UX, reconciliation, and back-office systems relevant to global OTA scale.',
    ],
    stack: ['React.js', 'Redux', 'Bootstrap', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Node.js'],
    links: [
      { label: 'Live Frontend · tvg.poysoft.com', url: 'https://tvg.poysoft.com' },
      { label: 'Full Works Archive (Google Drive)', url: PROFILE.archiveDriveUrl },
    ],
  },
  {
    id: 'enterprise-hr-and-public-health',
    category: 'travel-enterprise',
    categoryLabel: 'Enterprise Full-Stack · Real UI Showcase',
    year: '2017 – 2021',
    organization: 'Dplus Intertrade (Zettasoft) & Research for Life',
    title: 'Enterprise HR Automation Suite & Public Health Complaint Platform',
    summary:
      'Engineered full-stack React.js enterprise HR systems (HR-PMS, Job Application Portal, Time Attendance) backed by MS SQL Server Stored Procedures, plus a Public Health complaint platform.',
    schematicType: 'enterprise-hr',
    previewImage: assetUrl('/assets/portfolio/time/dashboard.png'),
    galleryImages: [
      { src: assetUrl('/assets/portfolio/time/dashboard.png'), caption: 'Time Attendance Executive Dashboard (Dplus Intertrade)' },
      { src: assetUrl('/assets/portfolio/time/calendar.png'), caption: 'Interactive Shift & Holiday Calendar' },
      { src: assetUrl('/assets/portfolio/time/request-admin.png'), caption: 'Admin Approval Queue for Time & OT Requests' },
      { src: assetUrl('/assets/portfolio/jobonline/job-portal.png'), caption: 'Job Application System — 6-Step Candidate Onboarding' },
      { src: assetUrl('/assets/portfolio/jobonline/admin.png'), caption: 'Recruitment Admin Pipeline' },
      { src: assetUrl('/assets/portfolio/personal/hr-pms-1.png'), caption: 'HR-PMS Performance & Employee Portal' },
    ],
    challenge:
      'Manual HR approval bottlenecks across performance management, recruiting, and attendance required automated digital workflows and high-performance relational reporting.',
    architecture: [
      'Developed cross-platform React.js modules for HR-PMS, Job Application Portal, and Time Attendance approval workflows in close collaboration with Figma UX/UI specs.',
      'Optimized enterprise database throughput by authoring complex Stored Procedures in Microsoft SQL Server.',
      'Earlier at Research for Life, built a responsive React.js complaint management system for the Department of Disease Control (Ministry of Public Health).',
    ],
    outcomes: [
      'Significantly reduced manual administrative workloads for enterprise HR operations across Dplus Intertrade & Zettasoft.',
      'Selected to present the Ministry of Public Health project at the 2018 Outstanding Cooperative Education Competition (Science & Technology category).',
    ],
    stack: ['React.js', 'Microsoft SQL Server (Stored Procedures)', 'Figma (UX/UI)', 'JavaScript (ES6+)'],
    links: [
      { label: 'Full Works Archive (Google Drive)', url: PROFILE.archiveDriveUrl },
    ],
  },
];

export const PORTFOLIO_GALLERY: PortfolioScreenshot[] = [
  {
    id: 'tg-dashboard',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Travel Operations Executive Dashboard',
    caption: 'Centralized OTA back-office overview tracking sales, profits, and payment breakdowns across boats, hotels, and flights.',
    stack: 'React.js · Redux · Bootstrap · JavaScript (ES6+) · Node.js',
    src: assetUrl('/assets/portfolio/travisgo/dashboard.png'),
    featured: true,
  },
  {
    id: 'tg-booking-1',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Multi-Modal Booking Management',
    caption: 'Filterable reservation console handling live customer itineraries, status tracking, and operator actions.',
    stack: 'React.js · Redux · Bootstrap · JavaScript (ES6+) · HTML5/CSS3',
    src: assetUrl('/assets/portfolio/travisgo/booking-1.png'),
  },
  {
    id: 'tg-booking-2',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Booking Detail & Passenger Records',
    caption: 'Structured booking breakdown with fare summaries, supplier confirmations, and customer fulfillment data.',
    stack: 'React.js · Redux · Reusable UI Component Library',
    src: assetUrl('/assets/portfolio/travisgo/booking-2.png'),
  },
  {
    id: 'tg-payment',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Payment & Transaction Tracking',
    caption: 'Real-time payment verification and settlement status monitoring for travel bookings.',
    stack: 'React.js · Redux · Node.js · HTML5/CSS3',
    src: assetUrl('/assets/portfolio/travisgo/payment.png'),
  },
  {
    id: 'tg-accounting',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Travel Accounting & Reconciliation',
    caption: 'Back-office ledger and commission reconciliation interface built for travel finance operations.',
    stack: 'React.js · Redux · Bootstrap · Node.js',
    src: assetUrl('/assets/portfolio/travisgo/accounting.png'),
  },
  {
    id: 'tg-refund',
    project: 'travisgo',
    projectLabel: 'TravisGo Travel-Tech',
    organization: 'TravisGo Co., Ltd.',
    year: '2019',
    title: 'Refund Request Processing',
    caption: 'Structured cancellation and refund review flow streamlining post-booking customer support.',
    stack: 'React.js · Redux · JavaScript (ES6+) · Node.js',
    src: assetUrl('/assets/portfolio/travisgo/refund.png'),
  },
  {
    id: 'time-dashboard',
    project: 'time',
    projectLabel: 'Time Attendance Suite',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Time Attendance Executive Dashboard',
    caption: 'Enterprise workforce attendance hub consolidating shift logs, OT requests, leave approvals, and real-time summaries.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures) · Figma (UX/UI)',
    src: assetUrl('/assets/portfolio/time/dashboard.png'),
    featured: true,
  },
  {
    id: 'time-calendar',
    project: 'time',
    projectLabel: 'Time Attendance Suite',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Interactive Shift & Holiday Calendar',
    caption: 'Visual monthly schedule manager supporting company holidays, shift logs, and attendance checks.',
    stack: 'React.js · Figma (UX/UI) · Microsoft SQL Server',
    src: assetUrl('/assets/portfolio/time/calendar.png'),
  },
  {
    id: 'time-request-admin',
    project: 'time',
    projectLabel: 'Time Attendance Suite',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Admin Approval Workflow Console',
    caption: 'Multi-step HR approval queue automating overtime, time adjustments, and leave requests.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures) · Figma (UX/UI)',
    src: assetUrl('/assets/portfolio/time/request-admin.png'),
  },
  {
    id: 'time-cutoff',
    project: 'time',
    projectLabel: 'Time Attendance Suite',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Payroll Cutoff & Prosoft Integration',
    caption: 'Automated payroll period cutoff verification with Prosoft time-import validation.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures)',
    src: assetUrl('/assets/portfolio/time/cutoff.png'),
  },
  {
    id: 'job-portal',
    project: 'jobonline',
    projectLabel: 'Job Application Portal',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: '6-Step Candidate Job Application Portal',
    caption: 'Digital candidate onboarding covering personal details, life-map, DISC personality test, and timed logic assessments.',
    stack: 'React.js · Figma (UX/UI) · Microsoft SQL Server (Stored Procedures)',
    src: assetUrl('/assets/portfolio/jobonline/job-portal.png'),
  },
  {
    id: 'job-admin',
    project: 'jobonline',
    projectLabel: 'Job Application Portal',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Recruiter Admin Management',
    caption: 'Internal ATS console for HR teams to screen applicants, manage openings, and track hiring stages.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures)',
    src: assetUrl('/assets/portfolio/jobonline/admin.png'),
  },
  {
    id: 'job-profile',
    project: 'jobonline',
    projectLabel: 'Job Application Portal',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Candidate Profile & History View',
    caption: 'Multi-section applicant profile capturing education, work history, and attachments in one unified view.',
    stack: 'React.js · Cross-Platform Web Templates · Figma (UX/UI)',
    src: assetUrl('/assets/portfolio/jobonline/profile.png'),
  },
  {
    id: 'job-report',
    project: 'jobonline',
    projectLabel: 'Job Application Portal',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'Hiring Pipeline & Reporting View',
    caption: 'Automated recruitment reporting backed by optimized SQL Server Stored Procedures.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures)',
    src: assetUrl('/assets/portfolio/jobonline/report.png'),
  },
  {
    id: 'pms-1',
    project: 'personal',
    projectLabel: 'HR-PMS System',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'HR-PMS Employee & Performance View',
    caption: 'Enterprise personnel and performance management interface built with modular React templates.',
    stack: 'React.js · Microsoft SQL Server (Stored Procedures) · Figma (UX/UI)',
    src: assetUrl('/assets/portfolio/personal/hr-pms-1.png'),
  },
  {
    id: 'pms-2',
    project: 'personal',
    projectLabel: 'HR-PMS System',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'HR-PMS Evaluation Workflow',
    caption: 'Structured evaluation workflow reducing manual administrative workload for HR operations.',
    stack: 'React.js · Approval Workflows · Microsoft SQL Server',
    src: assetUrl('/assets/portfolio/personal/hr-pms-2.png'),
  },
  {
    id: 'pms-3',
    project: 'personal',
    projectLabel: 'HR-PMS System',
    organization: 'Dplus Intertrade (Zettasoft)',
    year: 'Sep 2019 – May 2021',
    title: 'HR-PMS Directory & Profile Records',
    caption: 'Cross-platform enterprise view for managing employee records and departmental workflows.',
    stack: 'React.js · Cross-Platform Web Templates · SQL Server',
    src: assetUrl('/assets/portfolio/personal/hr-pms-3.png'),
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'nation-group',
    role: 'Lead Frontend Developer',
    company: 'Nation Group (Thailand) Public Co., Ltd.',
    companyUrl: 'https://www.nationgroup.com',
    companyLogos: [
      {
        src: assetUrl('/assets/logos/companies/nationgroup.svg'),
        alt: 'Nation Group',
        url: 'https://www.nationgroup.com',
      },
    ],
    location: 'Bangkok, Thailand',
    period: 'Jun 2021 – Present',
    tenureBadge: '5 Years 5 Months',
    progressionNote: 'Promoted to Lead Frontend Developer within 1 year · Leading engineering teams 4+ years',
    techStack: [
      'React.js',
      'Next.js',
      'Node.js',
      'Python',
      'n8n + Gemini AI',
      'Auth0 SSO',
      'Google BigQuery',
      'Power BI',
      'MongoDB',
      'Redis',
      'Cloudflare',
      'GCP / Huawei Cloud',
      'Flutter + Omise',
    ],
    highlights: [
      {
        title: 'High-Traffic Multi-Brand Architecture (11+ Platforms)',
        description:
          'Spearheaded frontend architecture, Core Web Vitals, and Technical SEO across 11 major news platforms (bangkokbiznews, thansettakij, posttoday, nationtv, nationthailand, komchadluek, springnews, thainewsonline, thepeople, khobsanam, tnews) serving millions MAU.',
      },
      {
        title: 'Morning Brief AI News Engine (n8n + Gemini 2.5 Flash) & Python LLM Tooling',
        description:
          'Engineered the n8n SEO news generation workflow (`Style Guide V5.0`) connecting MongoDB brand style guides, Redis process locks, Gemini 2.5 Flash, token/cost metrics logging, and One CMS draft creation—alongside Python multi-agent editorial assistants.',
      },
      {
        title: 'Cross-Domain SSO & AI Personalization Pipeline',
        description:
          'Architected end-to-end reader personalization integrating Auth0 SSO (`nid`), Google BigQuery, Power BI analytics, and MongoDB to deliver tailored AI-curated news via LINE Official Account webhooks.',
      },
      {
        title: 'Annual National Awards, Flutter Commerce & Multi-Cloud Ops',
        description:
          'Originated awards.komchadluek.net frontend (redesigned annually), delivered event-window awards platforms for The People (3 yrs) and Thansettakij (2 yrs), directed NationHouse & BizElite Flutter apps with Omise payments, and led GCP/Huawei Cloud migrations with Cloudflare Tunnels & Redis.',
      },
    ],
  },
  {
    id: 'dplus-intertrade',
    role: 'Front-End & Back-End Developer',
    company: 'Dplus Intertrade Co., Ltd.',
    companyUrl: 'https://dplus.co.th/',
    subsidiaryNote: 'Subsidiary software unit: Zettasoft Co., Ltd.',
    companyLogos: [
      {
        src: assetUrl('/assets/logos/companies/dplus.png'),
        alt: 'Dplus Intertrade',
        url: 'https://dplus.co.th/',
      },
      {
        src: assetUrl('/assets/logos/companies/zettasoft.png'),
        alt: 'Zettasoft',
        url: 'https://zettasoft.co.th/',
      },
    ],
    location: 'Bangkok, Thailand',
    period: 'Sep 2019 – May 2021',
    tenureBadge: '1 Year 9 Months',
    techStack: ['React.js', 'Microsoft SQL Server (Stored Procedures)', 'Figma (UX/UI)', 'JavaScript (ES6+)'],
    highlights: [
      {
        title: 'Enterprise HR Systems (HR-PMS, Job Application Portal & Time Attendance)',
        description:
          'Designed and developed cross-platform views and web templates using React.js for HR-PMS, 6-step Job Application Portal, and Time Attendance with multi-level approval workflows.',
      },
      {
        title: 'Full-Stack Database Optimization & HR Automation',
        description:
          'Engineered full-stack features and optimized query performance via complex Microsoft SQL Server Stored Procedures, collaborating closely on UX/UI workflows in Figma to significantly cut manual HR workload.',
      },
    ],
    archiveNote: '11 Real UI Screens in Gallery below',
  },
  {
    id: 'travisgo',
    role: 'Front-End Developer',
    company: 'TravisGo Co., Ltd.',
    companyUrl: 'https://tvg.poysoft.com',
    subsidiaryNote: 'Live Consumer Frontend: tvg.poysoft.com',
    companyLogos: [
      {
        src: assetUrl('/assets/aistudio/image_de5efb3e.png'),
        alt: 'TravisGo',
        url: 'https://tvg.poysoft.com',
      },
    ],
    location: 'Bangkok, Thailand',
    period: 'Apr 2019 – Aug 2019',
    tenureBadge: 'Travel-Tech',
    techStack: ['React.js', 'Redux', 'Bootstrap', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Node.js'],
    highlights: [
      {
        title: 'Travel-Tech Booking Platforms (Boats, Hotels, Flights)',
        description:
          'Built reusable UI component libraries and modular front-end architectures using React, Redux, and Bootstrap for consumer travel booking (tvg.poysoft.com) and operator back-office platforms (bookings, payments, accounting, commissions, refunds).',
      },
      {
        title: 'Responsive Cross-Browser Interfaces',
        description:
          'Developed responsive, cross-browser user interfaces using JavaScript (ES6+), HTML5, CSS3, and Node.js.',
      },
    ],
    archiveNote: '6 Real UI Screens in Gallery below',
  },
  {
    id: 'research-for-life',
    role: 'Junior Web Developer & Engineering Intern',
    company: 'Research for Life Co., Ltd.',
    location: 'Bangkok, Thailand',
    period: 'Jun 2017 – Mar 2019',
    tenureBadge: '1 Year 10 Months',
    techStack: ['React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'RESTful APIs'],
    highlights: [
      {
        title: 'Department of Disease Control Platform & National Co-op Recognition',
        description:
          'Transitioned from a 4-month software engineering internship to a full-time developer role, building responsive React.js views and a complaint management system for the Department of Disease Control (Ministry of Public Health), selected to present at the 2018 Outstanding Cooperative Education Competition (Science & Technology category).',
      },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Agentic AI Theory and Practice for Developer',
    issuer: 'IMC Institute',
    date: 'Jun 2025',
    focus: 'Multi-agent orchestration, tool calling & production agent workflows',
  },
  {
    title: 'Advanced RAG for LLMs Application',
    issuer: 'IMC Institute',
    date: 'May 2025',
    focus: 'Retrieval architecture, grounding strategies & evaluation pipelines',
  },
  {
    title: 'Advanced Developing on AWS with AWS Jam',
    issuer: 'AWS Training and Certification',
    date: 'Mar 2024',
    focus: 'Cloud-native backend resilience, scaling & hands-on architecture labs',
  },
  {
    title: 'Comprehensive SEO Course',
    issuer: 'chalakornberg.com',
    date: 'Nov 2022',
    focus: 'Technical SEO, structured data & organic traffic architecture',
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Business Administration (Information Technology)',
  institution: 'Rajamangala University of Technology Thanyaburi (RMUTT)',
  graduationYear: '2018',
  gpa: '2.94',
  award: 'Selected to present at the 2018 Outstanding Cooperative Education Competition (Science & Technology category)',
};
