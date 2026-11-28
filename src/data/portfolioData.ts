import { assetUrl } from '../utils/assetUrl';
import { formatTenure, monthsSince } from '../utils/format';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface ProfileInfo {
  name: string;
  roleTitle: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  archiveDriveUrl: string;
  resumePdfUrl: string;
  resumeFileName: string;
  powerBiProofImage: string;
  personalizationFlowUrl: string;
  lineFlowUrl: string;
  summary: string;
  openTo: string;
}

export interface NationBrandPlatform {
  id: string;
  name: string;
  domain: string;
  url: string;
  themeColor: string;
  logo: string;
  brandCode?: string;
  branch: 'business' | 'news-tv' | 'lifestyle';
  role: string;
  /** Logo is dark artwork on a transparent background: render it white in dark mode. */
  invertLogoOnDark?: boolean;
}

export interface AwardsPlatform {
  id: string;
  name: string;
  domain: string;
  url: string;
  themeColor: string;
  /** false = the site is only online while public voting is open. */
  alwaysOnline: boolean;
  yearsActive: string;
  description: string;
}

export interface ElectionMicrosite {
  id: string;
  /** Christian-era year (shown large). */
  year: number;
  /** Thai name as used internally / on the microsite. */
  titleTh: string;
  title: string;
  scope: 'Bangkok' | 'Nationwide';
  description: string;
  /** Add the live / archived URL when available. */
  url?: string;
}

export interface StarMetric {
  value: string;
  label: string;
}

export type CaseStudyCategory = 'all' | 'ai-data' | 'high-traffic' | 'travel-enterprise';

export interface CaseStudy {
  id: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  categoryLabel: string;
  period: string;
  organization: string;
  logo?: string;
  title: string;
  oneLiner: string;
  /** STAR narrative */
  situation: string;
  task: string;
  actions: string[];
  results: string[];
  metrics: StarMetric[];
  stack: string[];
  previewImage?: string;
  links?: { label: string; url: string }[];
}

export interface GalleryScreen {
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
}

export interface GalleryProject {
  id: string;
  name: string;
  organization: string;
  logo: string;
  period: string;
  accent: string;
  role: string;
  summary: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  screens: GalleryScreen[];
}

export interface ExperienceHighlight {
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logos: { src: string; alt: string }[];
  location: string;
  period: string;
  /** Start month for live tenure calculation (current role only). */
  startedAt?: { year: number; month: number };
  tenure?: string;
  progressionNote?: string;
  stack: string[];
  highlights: ExperienceHighlight[];
}

export interface SkillItem {
  name: string;
  logo?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  /** 0–100, how much of my current day-to-day this area represents (for the radial chart). */
  focus: number;
  capabilities: string[];
  skills: SkillItem[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  focus: string;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

const NATION_START = { year: 2021, month: 6 };
export const NATION_TENURE = formatTenure(monthsSince(NATION_START.year, NATION_START.month));

export const PROFILE: ProfileInfo = {
  name: 'Voranitha Changduong',
  roleTitle: 'Lead Frontend Developer',
  headline: 'Frontend & Full-Stack Software Engineer',
  location: 'Samutprakan, Thailand',
  email: 'voranitha.developer@gmail.com',
  phone: '+66 62-449-8916',
  linkedin: 'https://www.linkedin.com/in/voranitha-changduong-0a837b1ab',
  github: 'https://github.com/voranitha-dev',
  portfolioUrl: 'https://voranitha-dev.github.io/portfolio/',
  archiveDriveUrl: 'https://drive.google.com/drive/folders/1dt6IHv_iM9z7AVBWC75chEXdhvZCds8h?usp=sharing',
  resumePdfUrl: assetUrl('/assets/resume/voranithaChangduongResume.pdf'),
  resumeFileName: 'Voranitha-Changduong-Resume.pdf',
  powerBiProofImage: assetUrl('/assets/proof/powerBiReport.png'),
  personalizationFlowUrl: 'https://claude.ai/artifact/FHVwyb4TtyCgUDKCAzRf7o',
  lineFlowUrl: 'https://claude.ai/artifact/12v92obPPpLH8TxzEujERu',
  summary:
    'Frontend & Full-Stack Software Engineer with 8+ years of experience. I joined Nation Group as a Senior Frontend Developer in 2021 and was promoted to Lead within a year. Since then I have led frontend development and performance work across 10+ high-traffic news websites with millions of monthly page views, and I now build AI-driven features: LLM integrations and multi-agent workflows for content recommendation and editorial operations.',
  openTo: 'Open to Frontend AI & Full-Stack AI roles',
};

export const HERO_STATS = [
  { value: 8, suffix: '+', label: 'Years building for the web', detail: '2017 → today' },
  { value: 4, suffix: '+', label: 'Years leading frontend', detail: 'Promoted within 1 year' },
  { value: 10, suffix: '+', label: 'High-traffic news sites', detail: 'Millions of page views / month' },
] as const;

/* ------------------------------------------------------------------ */
/* Nation Group platforms                                              */
/* ------------------------------------------------------------------ */

export const NATION_BRAND_PLATFORMS: NationBrandPlatform[] = [
  {
    id: 'bangkokbiznews',
    name: 'Bangkok Biz News',
    domain: 'bangkokbiznews.com',
    url: 'https://www.bangkokbiznews.com',
    themeColor: '#0600e7',
    logo: assetUrl('/assets/logos/brands/bangkokBizNews.webp'),
    brandCode: 'KT',
    branch: 'business',
    role: 'Flagship business & economic news',
    invertLogoOnDark: true,
  },
  {
    id: 'tnews',
    name: 'TNews',
    domain: 'tnews.co.th',
    url: 'https://www.tnews.co.th',
    themeColor: '#3B5BDB',
    logo: assetUrl('/assets/logos/brands/tNews.png'),
    branch: 'news-tv',
    role: 'High-volume Thai digital news',
  },
  {
    id: 'komchadluek',
    name: 'Kom Chad Luek',
    domain: 'komchadluek.net',
    url: 'https://www.komchadluek.net',
    themeColor: '#d70000',
    logo: assetUrl('/assets/logos/brands/komChadLuek.png'),
    branch: 'news-tv',
    role: 'Mass-reach news & national awards',
  },
  {
    id: 'thansettakij',
    name: 'Thansettakij',
    domain: 'thansettakij.com',
    url: 'https://www.thansettakij.com',
    themeColor: '#ff8500',
    logo: assetUrl('/assets/logos/brands/thansettakij.png'),
    branch: 'business',
    role: 'Business & investment daily',
  },
  {
    id: 'nationthailand',
    name: 'The Nation Thailand',
    domain: 'nationthailand.com',
    url: 'https://www.nationthailand.com',
    themeColor: '#3B82F6',
    logo: assetUrl('/assets/logos/brands/nationThailand.png'),
    brandCode: 'NT',
    branch: 'business',
    role: 'International English-language news',
    invertLogoOnDark: true,
  },
  {
    id: 'thainews',
    name: 'Thai News Online',
    domain: 'thainewsonline.co',
    url: 'https://www.thainewsonline.co',
    themeColor: '#2929d9',
    logo: assetUrl('/assets/logos/brands/thaiNews.png'),
    branch: 'news-tv',
    role: 'Breaking & regional news',
  },
  {
    id: 'posttoday',
    name: 'Post Today',
    domain: 'posttoday.com',
    url: 'https://www.posttoday.com',
    themeColor: '#ea212d',
    logo: assetUrl('/assets/logos/brands/postToday.png'),
    branch: 'business',
    role: 'Business & urban lifestyle',
  },
  {
    id: 'nationtv',
    name: 'Nation TV',
    domain: 'nationtv.tv',
    url: 'https://www.nationtv.tv',
    themeColor: '#0929c9',
    logo: assetUrl('/assets/logos/brands/nationTv.png'),
    branch: 'news-tv',
    role: 'Broadcast & live election coverage',
  },
  {
    id: 'springnews',
    name: 'Spring News',
    domain: 'springnews.co.th',
    url: 'https://www.springnews.co.th',
    themeColor: '#eab308',
    logo: assetUrl('/assets/logos/brands/springNews.png'),
    brandCode: 'SPN',
    branch: 'news-tv',
    role: 'Digital-first news & sustainability',
    invertLogoOnDark: true,
  },
  {
    id: 'thepeople',
    name: 'The People',
    domain: 'thepeople.co',
    url: 'https://www.thepeople.co',
    themeColor: '#d81b2c',
    logo: assetUrl('/assets/logos/brands/thePeople.png'),
    branch: 'lifestyle',
    role: 'Long-form editorial storytelling',
    invertLogoOnDark: true,
  },
  {
    id: 'khobsanam',
    name: 'Khobsanam',
    domain: 'khobsanam.com',
    url: 'https://www.khobsanam.com',
    themeColor: '#65a30d',
    logo: assetUrl('/assets/logos/brands/khobsanam.png'),
    branch: 'lifestyle',
    role: 'Sports media & live match coverage',
  },
];

export const AWARDS_PLATFORMS: AwardsPlatform[] = [
  {
    id: 'awards-komchadluek',
    name: 'Kom Chad Luek Awards',
    domain: 'awards.komchadluek.net',
    url: 'https://awards.komchadluek.net',
    themeColor: '#d70000',
    alwaysOnline: true,
    yearsActive: 'Rebuilt every year',
    description:
      'Real-time national voting built from scratch when I joined. Redis buffers live votes so millions of users can vote in each voting period.',
  },
  {
    id: 'awards-thepeople',
    name: 'The People Awards',
    domain: 'awards.thepeople.co',
    url: 'https://awards.thepeople.co',
    themeColor: '#d81b2c',
    alwaysOnline: false,
    yearsActive: '3 editions',
    description:
      'Annual awards microsite that is spun up for the event season and shut down afterwards to keep cloud costs low.',
  },
  {
    id: 'awards-thansettakij',
    name: 'Thansettakij Awards',
    domain: 'awards.thansettakij.com',
    url: 'https://awards.thansettakij.com',
    themeColor: '#ff8500',
    alwaysOnline: false,
    yearsActive: '2 editions',
    description:
      'Business excellence awards with Redis caching for traffic surges and the same seasonal hosting model.',
  },
];

export const ELECTION_MICROSITES: ElectionMicrosite[] = [
  {
    id: 'election-bangkok-2022',
    year: 2022,
    titleTh: 'เลือกตั้ง กทม. 2565',
    title: 'Bangkok Governor Election 2022',
    scope: 'Bangkok',
    description: 'Election microsite with real-time results reporting through election night.',
  },
  {
    id: 'election-thailand-2023',
    year: 2023,
    titleTh: 'เลือกตั้งประเทศไทย 2566',
    title: 'Thailand General Election 2023',
    scope: 'Nationwide',
    description: 'National election microsite with real-time results while traffic peaked across the network.',
  },
  {
    id: 'election-thailand-2026',
    year: 2026,
    titleTh: 'เลือกตั้งประเทศไทย 2569',
    title: 'Thailand General Election 2026',
    scope: 'Nationwide',
    description: 'National election microsite with real-time results reporting for election-night traffic peaks.',
  },
];

/* ------------------------------------------------------------------ */
/* Case studies (STAR)                                                 */
/* ------------------------------------------------------------------ */

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'high-traffic-news-platforms',
    category: 'high-traffic',
    categoryLabel: 'High-traffic web',
    period: '2021 – Present',
    organization: 'Nation Group',
    logo: assetUrl('/assets/logos/companies/nationGroup.svg'),
    title: 'Keeping 10+ national news sites fast through election nights',
    oneLiner: 'Frontend architecture, performance and team leadership for a network with millions of monthly page views.',
    situation:
      'Nation Group runs 10+ news websites (Bangkok Biz News, Thansettakij, The Nation, Kom Chad Luek, Spring News and more) with millions of monthly page views. Traffic spikes hard during national elections and live results reporting.',
    task:
      'As Lead Frontend Developer, I own frontend architecture, technical implementation and website performance across the network, and I lead the frontend team that ships it.',
    actions: [
      'Set shared frontend architecture standards for React.js / Next.js and ran code reviews across all brands.',
      'Drove Core Web Vitals and technical SEO work: rendering strategy, structured data, GA4 / GTM instrumentation.',
      'Helped migrate servers on Huawei Cloud and retire legacy infrastructure, adding Cloudflare Tunnels and Redis caching for stability.',
      'Mentored developers so team members could take ownership of recurring, high-priority projects.',
    ],
    results: [
      'The network kept serving millions of monthly page views, including election-night and live-results peaks.',
      'Several brands rank in Thailand’s Truehits top 20 (live numbers in the Platforms section).',
      'Promoted from Senior to Lead Frontend Developer within my first year.',
    ],
    metrics: [
      { value: '10+', label: 'news websites' },
      { value: 'Millions', label: 'monthly page views' },
      { value: '<1 yr', label: 'Senior → Lead' },
    ],
    stack: ['React.js', 'Next.js', 'TypeScript', 'Cloudflare', 'Redis', 'Docker', 'Nginx', 'Huawei Cloud', 'GA4 / GTM'],
    links: [
      { label: 'bangkokbiznews.com', url: 'https://www.bangkokbiznews.com' },
      { label: 'thansettakij.com', url: 'https://www.thansettakij.com' },
      { label: 'nationthailand.com', url: 'https://www.nationthailand.com' },
    ],
  },
  {
    id: 'morning-brief-ai',
    category: 'ai-data',
    categoryLabel: 'AI · LLM workflow',
    period: '2024 – Present',
    organization: 'Nation Group',
    logo: assetUrl('/assets/logos/companies/nationGroup.svg'),
    title: 'Morning Brief AI: brand-styled SEO drafts from one LLM workflow',
    oneLiner: 'n8n + Gemini 2.5 Flash pipeline that turns editor-picked briefs into CMS-ready drafts for three newsrooms.',
    situation:
      'Bangkok Biz News, The Nation and Spring News each have their own editorial voice and strict SEO HTML rules. Generic LLM output needed heavy rewriting before editors could use it.',
    task:
      'Build one production workflow that turns an editor-selected Morning Brief summary into a brand-correct, SEO-ready draft, with no duplicate runs and a clear cost trail.',
    actions: [
      'Built an n8n webhook gated by the Nation Group Auth API, with a Redis execution lock keyed by brand + article + editor.',
      'Loaded each brand’s Markdown style guide from MongoDB and merged all referenced source articles in parallel.',
      'Wrote a strict JSON-only prompt for Gemini 2.5 Flash and a logger that estimates Thai / English tokens and USD cost per run.',
      'Added an auto-repair JSON parser and a brand router that creates a Draft in One CMS and writes an audit log.',
    ],
    results: [
      'One workflow serves three newsrooms (KT, NT, SPN) instead of three separate tools.',
      'Every draft arrives with a 50–70 character SEO title, hook, key points, 3 HTML sections and 5–10 keywords.',
      'Cost per article is visible on every run, and editors stay in control: AI creates the draft, a human publishes.',
    ],
    metrics: [
      { value: '3', label: 'newsrooms, one workflow' },
      { value: '6', label: 'pipeline stages' },
      { value: '≈$0.0005', label: 'logged cost per draft' },
    ],
    stack: ['n8n', 'Gemini 2.5 Flash', 'LangChain', 'MongoDB', 'Redis', 'One CMS API'],
  },
  {
    id: 'sso-personalization',
    category: 'ai-data',
    categoryLabel: 'Data · Personalization',
    period: '2024 – Present',
    organization: 'Nation Group',
    logo: assetUrl('/assets/logos/companies/nationGroup.svg'),
    title: 'One reader identity across 10+ sites, with personalized news on LINE',
    oneLiner: 'Auth0 SSO, BigQuery and MongoDB feeding personalized recommendations through LINE Official Account.',
    situation:
      'Readers moved between 10+ Nation Group sites, but each site had its own session. Nobody could see what a reader read across brands, so recommendations were generic.',
    task:
      'Design and build an end-to-end personalization system: one identity, behavioral data, and a channel to deliver recommendations.',
    actions: [
      'Implemented Auth0 single sign-on so one reader ID (nid) works across the news domains.',
      'Streamed reading behavior (category, page path, engagement time, views) into Google BigQuery and joined it with MongoDB reader profiles.',
      'Built Power BI reports to verify behavior per reader and per category.',
      'Delivered personalized news recommendations through LINE Official Account webhooks.',
    ],
    results: [
      'Reader behavior is unified under one identity and visible per reader in BI reports.',
      'Personalized recommendations reach readers directly on LINE.',
      'The pipeline is now the foundation for AI-ranked recommendations, which I am adding next.',
    ],
    metrics: [
      { value: '10+', label: 'domains on one SSO' },
      { value: '1', label: 'reader ID (nid)' },
      { value: 'LINE OA', label: 'delivery channel' },
    ],
    stack: ['Auth0', 'Google BigQuery', 'MongoDB', 'Power BI', 'Node.js', 'LINE OA Webhooks', 'GA4 / GTM'],
    previewImage: assetUrl('/assets/proof/powerBiReport.png'),
    links: [
      { label: 'Personalization architecture', url: 'https://claude.ai/artifact/FHVwyb4TtyCgUDKCAzRf7o' },
      { label: 'LINE OA display flow', url: 'https://claude.ai/artifact/12v92obPPpLH8TxzEujERu' },
    ],
  },
  {
    id: 'realtime-voting-flutter',
    category: 'high-traffic',
    categoryLabel: 'Real-time · Mobile',
    period: '2021 – Present',
    organization: 'Nation Group',
    logo: assetUrl('/assets/logos/companies/nationGroup.svg'),
    title: 'Real-time voting for millions, plus two Flutter apps with payments',
    oneLiner: 'Annual national awards voting that holds up under burst traffic, and mobile commerce with Omise.',
    situation:
      'Nation Group’s annual national awards open public voting windows where millions of users vote within a short period. The company also needed mobile apps with in-app payments.',
    task:
      'Build voting systems that stay online and count correctly under burst load, keep seasonal sites cheap to run, and contribute to the Flutter apps.',
    actions: [
      'Built the awards.komchadluek.net frontend from scratch and redesign it every year.',
      'Used Redis to buffer and store live votes so the database is not the bottleneck.',
      'Ran The People Awards and Thansettakij Awards in event windows: spun up for the season, shut down after.',
      'Contributed to the NationHouse and BizElite Flutter apps, including Omise in-app payment integration.',
    ],
    results: [
      'Voting systems support millions of users in each voting period.',
      'Seasonal awards sites cost nothing to host outside their event windows.',
      'Two production Flutter apps shipped with working in-app payments.',
    ],
    metrics: [
      { value: '3', label: 'awards platforms' },
      { value: 'Millions', label: 'voters per period' },
      { value: '2', label: 'Flutter apps shipped' },
    ],
    stack: ['Next.js', 'React.js', 'Redis', 'Node.js', 'Cloudflare', 'Flutter', 'Omise'],
    links: [
      { label: 'awards.komchadluek.net', url: 'https://awards.komchadluek.net' },
      { label: 'awards.thepeople.co', url: 'https://awards.thepeople.co' },
    ],
  },
  {
    id: 'enterprise-hr-suite',
    category: 'travel-enterprise',
    categoryLabel: 'Enterprise full-stack',
    period: 'Sep 2019 – May 2021',
    organization: 'Dplus Intertrade',
    logo: assetUrl('/assets/logos/companies/dplus.png'),
    title: 'Replacing manual HR paperwork with three connected web systems',
    oneLiner: 'HR-PMS, a job application portal and time attendance with approval workflows.',
    situation:
      'The HR department handled performance reviews, recruiting and attendance approvals largely by hand, which created a heavy administrative load.',
    task:
      'Design and build the web systems that move those processes online, from UI to database.',
    actions: [
      'Designed and built cross-platform views and web templates in React.js for HR-PMS, a Job Application Portal and Time Attendance.',
      'Built approval workflows for overtime, time adjustments and leave requests.',
      'Wrote complex Microsoft SQL Server stored procedures to keep reporting fast.',
      'Worked through UX / UI flows in Figma with the HR team before building.',
    ],
    results: [
      'Significantly reduced manual administrative work for the HR department.',
      'Three systems share one set of templates, so new modules ship faster.',
    ],
    metrics: [
      { value: '3', label: 'HR systems shipped' },
      { value: '11', label: 'screens in the gallery' },
    ],
    stack: ['React.js', 'JavaScript (ES6+)', 'Microsoft SQL Server', 'Stored Procedures', 'Figma'],
    previewImage: assetUrl('/assets/portfolio/time/dashboard.png'),
  },
  {
    id: 'travel-booking',
    category: 'travel-enterprise',
    categoryLabel: 'Travel-tech',
    period: 'Apr 2019 – Aug 2019',
    organization: 'TravisGo',
    logo: assetUrl('/assets/logos/companies/travisGo.png'),
    title: 'Reusable booking UI for boats, hotels and flights',
    oneLiner: 'React + Redux component library for a travel back-office.',
    situation:
      'TravisGo’s back-office had to handle boats, hotels and flights, each with its own booking, payment, accounting and refund screens.',
    task: 'Build reusable frontend structures so every travel vertical behaves consistently.',
    actions: [
      'Built reusable UI components and frontend structures with React, Redux and Bootstrap.',
      'Developed responsive, cross-browser interfaces with JavaScript, HTML5, CSS3 and Node.js.',
    ],
    results: [
      'Bookings, payments, accounting and refunds share one component set across all three verticals.',
      'Gave me hands-on travel-booking domain experience: itineraries, settlements and refunds.',
    ],
    metrics: [
      { value: '3', label: 'travel verticals' },
      { value: '6', label: 'screens in the gallery' },
    ],
    stack: ['React.js', 'Redux', 'Bootstrap', 'JavaScript (ES6+)', 'Node.js'],
    previewImage: assetUrl('/assets/portfolio/travisGo/dashboard.png'),
  },
];

/* ------------------------------------------------------------------ */
/* Works gallery                                                       */
/* ------------------------------------------------------------------ */

const screen = (src: string, width: number, height: number, title: string, caption: string): GalleryScreen => ({
  src: assetUrl(src),
  width,
  height,
  title,
  caption,
});

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'travisgo',
    name: 'TravisGo Back-Office',
    organization: 'TravisGo Co., Ltd.',
    logo: assetUrl('/assets/logos/companies/travisGo.png'),
    period: '2019',
    accent: 'var(--c-accent)',
    role: 'Front-End Developer',
    summary: 'Travel operations console for boats, hotels and flights: bookings, payments, accounting and refunds.',
    outcome: 'One reusable React / Redux component set across every booking flow.',
    stack: ['React.js', 'Redux', 'Bootstrap', 'Node.js'],
    liveUrl: 'https://tvg.poysoft.com',
    screens: [
      screen('/assets/portfolio/travisGo/dashboard.png', 1600, 751, 'Operations dashboard', 'Sales, profit and payment summary across all travel products.'),
      screen('/assets/portfolio/travisGo/booking1.png', 1600, 757, 'Booking management', 'Filterable reservation list with status tracking and operator actions.'),
      screen('/assets/portfolio/travisGo/booking2.png', 1600, 710, 'Booking detail', 'Fare summary, supplier confirmation and passenger records.'),
      screen('/assets/portfolio/travisGo/payment.png', 1600, 614, 'Payment tracking', 'Payment verification and settlement status per booking.'),
      screen('/assets/portfolio/travisGo/accounting.png', 1600, 753, 'Accounting ledger', 'Commission and reconciliation view for the finance team.'),
      screen('/assets/portfolio/travisGo/refund.png', 1600, 748, 'Refund workflow', 'Cancellation and refund review flow for customer support.'),
    ],
  },
  {
    id: 'time',
    name: 'Time Attendance',
    organization: 'Dplus Intertrade (Zettasoft)',
    logo: assetUrl('/assets/logos/companies/dplus.png'),
    period: '2019 – 2021',
    accent: 'var(--c-accent)',
    role: 'Front-End & Back-End Developer',
    summary: 'Workforce attendance with shift calendars, overtime / leave approvals and payroll cutoff.',
    outcome: 'Approvals moved from paper to a multi-step online workflow.',
    stack: ['React.js', 'MS SQL Server', 'Stored Procedures', 'Figma'],
    screens: [
      screen('/assets/portfolio/time/dashboard.png', 1576, 889, 'Attendance dashboard', 'Shift logs, OT requests, leave approvals and daily summaries.'),
      screen('/assets/portfolio/time/calendar.png', 1600, 892, 'Shift & holiday calendar', 'Monthly schedule with holidays, shifts and attendance checks.'),
      screen('/assets/portfolio/time/requestAdmin.png', 1591, 800, 'Approval queue', 'Admin queue for overtime, time adjustments and leave.'),
      screen('/assets/portfolio/time/cutoff.png', 1595, 889, 'Payroll cutoff', 'Period cutoff checks with Prosoft time-import validation.'),
    ],
  },
  {
    id: 'jobonline',
    name: 'Job Application Portal',
    organization: 'Dplus Intertrade (Zettasoft)',
    logo: assetUrl('/assets/logos/companies/dplus.png'),
    period: '2019 – 2021',
    accent: 'var(--c-accent)',
    role: 'Front-End & Back-End Developer',
    summary: '6-step candidate application with personality and logic tests, plus a recruiter console.',
    outcome: 'Recruiting moved online end-to-end, from application to reporting.',
    stack: ['React.js', 'MS SQL Server', 'Figma'],
    screens: [
      screen('/assets/portfolio/jobOnline/jobPortal.png', 1600, 878, '6-step application', 'Personal details, life map, DISC test and timed logic assessment.'),
      screen('/assets/portfolio/jobOnline/admin.png', 1597, 858, 'Recruiter console', 'Screen applicants, manage openings and track hiring stages.'),
      screen('/assets/portfolio/jobOnline/profile.png', 1596, 885, 'Candidate profile', 'Education, work history and attachments in one view.'),
      screen('/assets/portfolio/jobOnline/report.png', 1592, 850, 'Hiring reports', 'Recruitment reporting backed by SQL Server stored procedures.'),
    ],
  },
  {
    id: 'hrpms',
    name: 'HR-PMS',
    organization: 'Dplus Intertrade (Zettasoft)',
    logo: assetUrl('/assets/logos/companies/dplus.png'),
    period: '2019 – 2021',
    accent: 'var(--c-accent)',
    role: 'Front-End & Back-End Developer',
    summary: 'Personnel and performance management with structured evaluation workflows.',
    outcome: 'Reduced manual administrative work for HR operations.',
    stack: ['React.js', 'MS SQL Server', 'Approval workflows'],
    screens: [
      screen('/assets/portfolio/hrPms/hrPms1.png', 1600, 737, 'Employee & performance', 'Personnel and performance overview built from modular templates.'),
      screen('/assets/portfolio/hrPms/hrPms2.png', 1600, 666, 'Evaluation workflow', 'Structured evaluation steps for managers and HR.'),
      screen('/assets/portfolio/hrPms/hrPms3.png', 1600, 729, 'Directory & records', 'Employee records and departmental workflows.'),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'nation-group',
    role: 'Lead Frontend Developer',
    company: 'Nation Group (Thailand) Public Co., Ltd.',
    companyUrl: 'https://www.nationgroup.com',
    logos: [{ src: assetUrl('/assets/logos/companies/nationGroup.svg'), alt: 'Nation Group' }],
    location: 'Bangkok, Thailand',
    period: 'Jun 2021 – Present',
    startedAt: NATION_START,
    progressionNote: 'Joined as Senior Frontend Developer · promoted to Lead within 1 year',
    stack: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Flutter', 'Redis', 'MongoDB', 'BigQuery', 'Auth0', 'Cloudflare', 'Huawei Cloud', 'LLM / n8n'],
    highlights: [
      {
        title: 'High-traffic platform architecture',
        description:
          'Lead frontend development and performance for 10+ news websites, including bangkokbiznews.com, thansettakij.com, nationtv.tv, nationthailand.com, posttoday.com, komchadluek.net, springnews.co.th and thepeople.co. Millions of monthly page views, including national election nights and real-time results.',
      },
      {
        title: 'High-traffic voting systems',
        description:
          'Built real-time voting systems that support millions of users during each voting period for annual national awards, including awards.komchadluek.net.',
      },
      {
        title: 'User personalization & AI integration',
        description:
          'Built an end-to-end personalization system with Auth0 SSO, Google BigQuery and MongoDB that delivers personalized news through LINE Official Account webhooks. Now adding AI capabilities to it.',
      },
      {
        title: 'Mobile apps',
        description: 'Contributed to the NationHouse and BizElite Flutter apps, including in-app payment integration with Omise.',
      },
      {
        title: 'Cloud infrastructure & DevOps',
        description:
          'Contributed to server migrations and legacy decommissioning on Huawei Cloud, including Cloudflare Tunnels and Redis caching for stability and performance.',
      },
      {
        title: 'Engineering leadership & mentorship',
        description:
          'Mentor frontend developers, set architecture standards and code review practices, and help team members own recurring, high-priority projects.',
      },
    ],
  },
  {
    id: 'dplus-intertrade',
    role: 'Front-End & Back-End Developer',
    company: 'Dplus Intertrade Company Limited',
    companyUrl: 'https://dplus.co.th/',
    logos: [
      { src: assetUrl('/assets/logos/companies/dplus.png'), alt: 'Dplus Intertrade' },
      { src: assetUrl('/assets/logos/companies/zettasoft.png'), alt: 'Zettasoft' },
    ],
    location: 'Bangkok, Thailand',
    period: 'Sep 2019 – May 2021',
    tenure: '1 yr 9 mos',
    stack: ['React.js', 'MS SQL Server', 'Stored Procedures', 'Figma'],
    highlights: [
      {
        title: 'Enterprise HR systems',
        description:
          'Designed and built cross-platform views and web templates in React.js for HR-PMS, a Job Application Portal and Time Attendance with approval workflows.',
      },
      {
        title: 'Full-stack & database performance',
        description: 'Built full-stack features and optimized database performance with complex Microsoft SQL Server stored procedures.',
      },
      {
        title: 'HR workflow automation',
        description:
          'Built internal automation modules that significantly reduced manual admin work for HR, working closely on UX / UI flows in Figma.',
      },
    ],
  },
  {
    id: 'travisgo',
    role: 'Front-End Developer',
    company: 'TravisGo Co., Ltd.',
    companyUrl: 'https://tvg.poysoft.com',
    logos: [{ src: assetUrl('/assets/logos/companies/travisGo.png'), alt: 'TravisGo' }],
    location: 'Bangkok, Thailand',
    period: 'Apr 2019 – Aug 2019',
    tenure: '5 mos',
    stack: ['React.js', 'Redux', 'Bootstrap', 'JavaScript', 'Node.js'],
    highlights: [
      {
        title: 'Travel back-office UI',
        description:
          'Built reusable UI components and frontend structures with React, Redux and Bootstrap for back-office systems serving boats, hotels and flights.',
      },
      {
        title: 'Responsive interfaces',
        description: 'Developed responsive, cross-browser interfaces with JavaScript, HTML5, CSS3 and Node.js.',
      },
    ],
  },
  {
    id: 'research-for-life',
    role: 'Junior Web Developer & Engineering Intern',
    company: 'Research for Life Co., Ltd.',
    logos: [],
    location: 'Bangkok, Thailand',
    period: 'Jun 2017 – Mar 2019',
    tenure: '1 yr 10 mos',
    stack: ['React.js', 'JavaScript', 'HTML5 / CSS3'],
    highlights: [
      {
        title: 'Department of Disease Control complaint system',
        description:
          'Started as a 4-month intern, then joined full-time. Built responsive React.js pages and a complaint management system for the Department of Disease Control (Ministry of Public Health). The project was selected for the 2018 Outstanding Cooperative Education Competition (Science & Technology).',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills (grouped like the resume)                                    */
/* ------------------------------------------------------------------ */

const logo = (file: string) => assetUrl(`/assets/logos/tech/${file}`);

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    shortTitle: 'Frontend',
    description: 'Multi-brand React / Next.js platforms, design systems and Flutter apps.',
    focus: 95,
    capabilities: [
      'Shared Next.js architecture across 10+ news brands',
      'Component libraries with TypeScript, Ant Design, MUI and Redux',
      'Flutter apps with Omise in-app payments',
      'Figma-to-code handoff and UX / UI design',
    ],
    skills: [
      { name: 'React.js', logo: logo('react.svg') },
      { name: 'Next.js', logo: logo('nextJs.svg') },
      { name: 'TypeScript', logo: logo('typescript.svg') },
      { name: 'JavaScript (ES6+)', logo: logo('javascript.svg') },
      { name: 'Flutter', logo: logo('flutter.svg') },
      { name: 'Redux', logo: logo('redux.svg') },
      { name: 'Ant Design', logo: logo('antDesign.svg') },
      { name: 'Material UI', logo: logo('mui.svg') },
      { name: 'Bootstrap', logo: logo('bootstrap.svg') },
      { name: 'Figma', logo: logo('figma.svg') },
      { name: 'HTML5 / CSS3 / SCSS' },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data Engineering',
    shortTitle: 'AI & Data',
    description: 'LLM integrations, multi-agent workflows and personalization pipelines.',
    focus: 80,
    capabilities: [
      'Multi-agent AI workflows with LangGraph',
      'LLM API integration: Gemini and Qwen 2.5-3B',
      'Production n8n + Gemini editorial pipeline',
      'BigQuery-backed personalization pipelines',
    ],
    skills: [
      { name: 'Google Gemini', logo: logo('googleGemini.svg') },
      { name: 'LangChain / LangGraph', logo: logo('langchain.svg') },
      { name: 'n8n', logo: logo('n8n.svg') },
      { name: 'Python', logo: logo('python.svg') },
      { name: 'Google BigQuery', logo: logo('googleBigQuery.svg') },
      { name: 'Power BI', logo: logo('powerBi.svg') },
      { name: 'Qwen 2.5-3B' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    shortTitle: 'Backend',
    description: 'APIs, identity, webhooks and storage built for burst traffic.',
    focus: 70,
    capabilities: [
      'Node.js and FastAPI REST services',
      'Auth0 SSO and identity management',
      'LINE Official Account webhooks',
      'Redis for live votes, locks and caching',
    ],
    skills: [
      { name: 'Node.js', logo: logo('nodeJs.svg') },
      { name: 'Python / FastAPI', logo: logo('python.svg') },
      { name: 'Auth0', logo: logo('auth0.svg') },
      { name: 'Redis', logo: logo('redis.svg') },
      { name: 'MongoDB', logo: logo('mongodb.svg') },
      { name: 'Firebase', logo: logo('firebase.svg') },
      { name: 'MS SQL Server', logo: logo('mssql.svg') },
      { name: 'LINE OA', logo: logo('line.svg') },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud',
    description: 'Hosting, edge security and releases for production news sites.',
    focus: 60,
    capabilities: [
      'Huawei Cloud server migration and decommissioning',
      'Cloudflare Tunnels, WAF and caching',
      'Docker containers behind Nginx',
      'Git workflows on GitHub, GitLab and Bitbucket',
    ],
    skills: [
      { name: 'Huawei Cloud', logo: logo('huawei.svg') },
      { name: 'Cloudflare', logo: logo('cloudflare.svg') },
      { name: 'Docker', logo: logo('docker.svg') },
      { name: 'Nginx', logo: logo('nginx.svg') },
      { name: 'AWS', logo: logo('aws.svg') },
      { name: 'GitHub', logo: logo('github.svg') },
      { name: 'GitLab', logo: logo('gitlab.svg') },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Web Analytics',
    shortTitle: 'SEO',
    description: 'Technical SEO, Core Web Vitals and analytics instrumentation.',
    focus: 85,
    capabilities: [
      'Technical SEO and structured data at network scale',
      'Core Web Vitals performance work',
      'GA4 and GTM event instrumentation',
      'Reporting in Looker Studio and Search Console',
    ],
    skills: [
      { name: 'Google Search Console', logo: logo('googleSearchConsole.svg') },
      { name: 'Google Analytics 4', logo: logo('googleAnalytics.svg') },
      { name: 'Google Tag Manager' },
      { name: 'Core Web Vitals' },
      { name: 'Looker Studio' },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Agentic AI Theory and Practice for Developer',
    issuer: 'IMC Institute',
    date: 'Jun 2025',
    focus: 'Multi-agent orchestration and tool calling',
  },
  {
    title: 'Advanced RAG for LLMs Application',
    issuer: 'IMC Institute',
    date: 'May 2025',
    focus: 'Retrieval architecture and grounding',
  },
  {
    title: 'Advanced Developing on AWS with AWS Jam',
    issuer: 'AWS Training and Certification',
    date: 'Mar 2024',
    focus: 'Cloud-native development labs',
  },
  {
    title: 'Comprehensive SEO Course',
    issuer: 'chalakornberg.com',
    date: 'Nov 2022',
    focus: 'Technical SEO and structured data',
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Business Administration (Information Technology)',
  institution: 'Rajamangala University of Technology Thanyaburi (RMUTT)',
  graduationYear: '2018',
  gpa: '2.94',
  award: 'Selected presenter, 2018 Outstanding Cooperative Education Competition (Science & Technology)',
  awardImage: {
    src: assetUrl('/assets/proof/coopEducationCertificate2018.jpg'),
    width: 1600,
    height: 1137,
    alt: 'Certificate from Rajamangala University of Technology Thanyaburi: Voranitha Changduong presented at the 2018 Outstanding Cooperative Education Competition, Science & Technology category (18 January 2018)',
  },
};
