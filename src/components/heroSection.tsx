import styled from '@emotion/styled';
import { motion, useInView } from 'motion/react';
import { ArrowDown, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';
import { HERO_STATS, PROFILE } from '../data/portfolioData';
import { LATEST_MONTH, MONTHLY_NETWORK } from '../data/truehits';
import { useCountUp } from '../hooks/useCountUp';
import { assetUrl } from '../utils/assetUrl';
import { formatCompact } from '../utils/format';
import {
  blobDrift,
  ButtonLink,
  Container,
  floatY,
  GradientText,
  LiveDot,
} from '../styles/primitives';
import { color, font, gradient, mq, radius } from '../styles/theme';
import { NetworkPulseCard } from './networkPulseCard';

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 40px 0 72px;

  ${mq.lg} {
    padding: 64px 0 96px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(${color.lineStrong} 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%);
    opacity: 0.55;
  }
`;

const Blob = styled.span<{ $color: string; $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(90px);
  opacity: 0.1;
  animation: ${blobDrift} 18s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Grid = styled(Container)`
  display: grid;
  gap: 48px;
  align-items: center;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
    gap: 56px;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: 26px;
`;

const Availability = styled(motion.p)`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px 7px 12px;
  font-size: 13px;
  font-weight: 600;
  color: ${color.text2};
  border-radius: ${radius.pill};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
`;

const Heading = styled(motion.h1)`
  display: grid;
  gap: 18px;
`;

const NameLine = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  font-family: ${font.body};
  font-size: clamp(1rem, 0.94rem + 0.3vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0;
  color: ${color.text2};

  img {
    height: 18px;
    width: auto;
  }
`;

const NationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid ${color.line};
`;

/* Readability first: generous size, 1.1 leading, solid contrast, max ~16 words. */
const Headline = styled.span`
  display: block;
  font-family: ${font.display};
  font-size: clamp(2.35rem, 1.45rem + 3.5vw, 4.1rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.032em;
  color: ${color.text};
  max-width: 17ch;
`;

const Lead = styled(motion.p)`
  font-size: clamp(1.02rem, 0.98rem + 0.25vw, 1.15rem);
  line-height: 1.75;
  color: ${color.text2};
  max-width: 58ch;

  strong {
    color: ${color.text};
    font-weight: 600;
  }
`;

const Ctas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Stats = styled(motion.dl)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin: 6px 0 0;
  border-radius: ${radius.lg};
  overflow: hidden;
  background: ${color.line};
  border: 1px solid ${color.line};

  ${mq.sm} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Stat = styled.div`
  display: grid;
  gap: 2px;
  padding: 16px 16px 14px;
  background: ${color.bgElev};

  dt {
    order: 2;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1.35;
    color: ${color.text2};
  }

  dd {
    order: 1;
    margin: 0;
    font-family: ${font.display};
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    background: ${gradient.brand};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  small {
    order: 3;
    font-family: ${font.mono};
    font-size: 10.5px;
    color: ${color.text3};
  }
`;

const Visual = styled(motion.div)`
  position: relative;
`;

const FloatingChip = styled.span<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  z-index: 2;
  display: none;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 8px;
  font-size: 12.5px;

  &:not(:has(img)) {
    padding-left: 14px;
  }
  font-weight: 700;
  border-radius: ${radius.pill};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  box-shadow: 0 14px 30px -14px rgba(15, 23, 42, 0.35);
  animation: ${floatY} 5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  img {
    width: 26px;
    height: 26px;
    padding: 4px;
    border-radius: 50%;
    background: #fff;
  }

  ${mq.xl} {
    display: inline-flex;
  }
`;

const ScrollCue = styled.a`
  display: none;
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  color: ${color.text3};

  svg {
    animation: ${floatY} 2.4s ease-in-out infinite;
  }

  ${mq.lg} {
    display: block;
  }
`;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function CountStat({ value, suffix, label, detail, start, compact }: {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
  start: boolean;
  compact?: boolean;
}) {
  const current = useCountUp(value, start, 1500);
  return (
    <Stat>
      <dt>{label}</dt>
      <dd>
        {compact ? formatCompact(current) : Math.round(current)}
        {suffix}
      </dd>
      <small>{detail}</small>
    </Stat>
  );
}

export function HeroSection() {
  const statsRef = useRef<HTMLDListElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <Hero id="top" aria-labelledby="heroTitle">
      <Backdrop aria-hidden="true">
        <Blob $color="var(--c-accent)" $size={420} $top="-120px" $left="-80px" $delay={0} />
        <Blob $color="var(--c-violet)" $size={380} $top="10%" $left="62%" $delay={-6} />
        <Blob $color="var(--c-cyan)" $size={300} $top="60%" $left="30%" $delay={-11} />
      </Backdrop>

      <Grid>
        <Copy>
          <Availability {...fadeUp(0)}>
            <LiveDot />
            {PROFILE.openTo} · Bangkok, Thailand
          </Availability>

          <Heading id="heroTitle" {...fadeUp(0.08)}>
            <NameLine>
              {PROFILE.name} · {PROFILE.roleTitle} at
              <NationBadge>
                <img src={assetUrl('/assets/logos/companies/nationGroup.svg')} alt="Nation Group" width="88" height="18" />
              </NationBadge>
            </NameLine>
            <Headline>
              I build news platforms read by millions, <GradientText>and the AI behind them.</GradientText>
            </Headline>
          </Heading>

          <Lead {...fadeUp(0.16)}>
            <strong>8+ years</strong> as a frontend & full-stack engineer. At Nation Group I was promoted to Lead
            within a year and now run frontend for <strong>10+ high-traffic news sites</strong>, real-time awards
            voting, and LLM workflows used by newsroom editors.
          </Lead>

          <Ctas {...fadeUp(0.24)}>
            <ButtonLink href={PROFILE.resumePdfUrl} download={PROFILE.resumeFileName} $variant="primary">
              <FileDown aria-hidden="true" />
              Download Resume (PDF)
            </ButtonLink>
            <ButtonLink href={PROFILE.github} target="_blank" rel="noopener noreferrer" $variant="secondary">
              <Github aria-hidden="true" />
              GitHub
            </ButtonLink>
            <ButtonLink href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" $variant="secondary">
              <Linkedin aria-hidden="true" />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={`mailto:${PROFILE.email}`} $variant="ghost" aria-label={`Email ${PROFILE.email}`}>
              <Mail aria-hidden="true" />
              Email
            </ButtonLink>
          </Ctas>

          <Stats ref={statsRef} {...fadeUp(0.32)}>
            {HERO_STATS.map((stat) => (
              <CountStat key={stat.label} {...stat} start={statsInView} />
            ))}
            <CountStat
              value={MONTHLY_NETWORK.pageviews}
              label="Pageviews / month on my sites"
              detail={`Truehits, ${LATEST_MONTH?.shortLabel ?? ''}`}
              start={statsInView}
              compact
            />
          </Stats>
        </Copy>

        <Visual
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingChip $top="-20px" $left="-28px" $delay={0} aria-hidden="true">
            <img src={assetUrl('/assets/logos/tech/nextJs.svg')} alt="" /> Next.js at scale
          </FloatingChip>
          <FloatingChip $top="calc(100% - 14px)" $left="34%" $delay={-3.1} aria-hidden="true">
            Real-time voting
          </FloatingChip>
          <NetworkPulseCard />
        </Visual>
      </Grid>

      <ScrollCue href="#platforms" aria-label="Scroll to platforms">
        <ArrowDown size={20} />
      </ScrollCue>
    </Hero>
  );
}
