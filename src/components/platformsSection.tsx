import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ArrowUpRight, CalendarClock, Trophy } from 'lucide-react';
import { AWARDS_PLATFORMS, NATION_TENURE } from '../data/portfolioData';
import { NETWORK_DAILY } from '../data/truehits';
import { formatIsoDate } from '../utils/format';
import {
  Card,
  Chip,
  Container,
  Eyebrow,
  LiveDot,
  MonoLabel,
  Section,
  SectionHeader,
  SectionLead,
} from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';
import { BrandBento } from './brandBento';
import { ElectionTimeline } from './electionTimeline';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';
import { TruehitsTrafficChart } from './truehitsTrafficChart';

const equalize = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`;

const AwardsHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;

  h3 {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 800;
  }
`;

const AwardsGrid = styled.div`
  display: grid;
  gap: 14px;
  margin-bottom: 64px;

  ${mq.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const AwardCard = styled(Card)<{ $accent: string }>`
  display: grid;
  gap: 14px;
  padding: 22px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: -60px;
    top: -60px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: 0.1;
    filter: blur(10px);
  }
`;

/* Live sites get bouncing bars; voting-period-only sites show flat, greyed bars. */
const Equalizer = styled.span<{ $accent: string; $live: boolean }>`
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 22px;
  opacity: ${({ $live }) => ($live ? 1 : 0.35)};

  i {
    width: 4px;
    height: 100%;
    border-radius: 2px;
    background: ${({ $accent, $live }) => ($live ? $accent : 'var(--c-text-3)')};
    transform-origin: bottom;
    transform: ${({ $live }) => ($live ? 'none' : 'scaleY(0.25)')};
    animation: ${({ $live }) => ($live ? equalize : 'none')} 1.1s ease-in-out infinite;
  }
  i:nth-of-type(2) { animation-delay: -0.3s; }
  i:nth-of-type(3) { animation-delay: -0.6s; }
  i:nth-of-type(4) { animation-delay: -0.15s; }
  i:nth-of-type(5) { animation-delay: -0.45s; }
`;

const AwardLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${font.mono};
  font-size: 12.5px;
  font-weight: 600;
  color: ${color.accent};
`;

const SeasonNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  border-radius: ${radius.md};
  color: ${color.text2};
  background: color-mix(in srgb, ${color.warning} 9%, transparent);
  border: 1px dashed color-mix(in srgb, ${color.warning} 45%, transparent);

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${color.warning};
  }

  span {
    font-family: ${font.mono};
    font-size: 12px;
    color: ${color.text3};
  }
`;

const ChartHead = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 18px;

  h3 {
    font-size: 22px;
    font-weight: 800;
  }
  p {
    color: ${color.text2};
    max-width: 70ch;
  }
`;

export function PlatformsSection() {
  return (
    <Section id="platforms" aria-labelledby="platformsTitle" $tone="elevated">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>01 · Current work at Nation Group · {NATION_TENURE}</Eyebrow>
            <SectionHeading id="platformsTitle" text="Nation Group: 11 news brands," highlight="one frontend team" />
            <SectionLead>
              Every tile is a live production site I lead frontend for, and every number is live.
              Traffic comes straight from Truehits, Thailand’s public web ranking (latest daily ranking:{' '}
              {formatIsoDate(NETWORK_DAILY.date)}).
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Reveal style={{ marginBottom: 64 }}>
          <BrandBento />
        </Reveal>

        <Reveal>
          <AwardsHead>
            <h3>
              <Trophy size={22} color="var(--c-warning)" aria-hidden="true" /> Real-time award voting
            </h3>
            <MonoLabel>Millions of users per voting period</MonoLabel>
          </AwardsHead>
        </Reveal>
        <AwardsGrid>
          {AWARDS_PLATFORMS.map((award, i) => (
            <Reveal key={award.id} delay={i * 0.08}>
              <AwardCard $accent={award.themeColor} $interactive>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {award.alwaysOnline ? (
                    <Chip $tone="success">
                      <LiveDot /> Online all year
                    </Chip>
                  ) : (
                    <Chip $tone="warning">
                      <CalendarClock aria-hidden="true" /> Voting period only
                    </Chip>
                  )}
                  <Equalizer $accent={award.themeColor} $live={award.alwaysOnline} aria-hidden="true">
                    <i /><i /><i /><i /><i />
                  </Equalizer>
                </div>
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 800 }}>{award.name}</h4>
                  <MonoLabel>{award.yearsActive}</MonoLabel>
                </div>
                <p style={{ fontSize: 14, color: 'var(--c-text-2)' }}>{award.description}</p>
                {award.alwaysOnline ? (
                  <AwardLink href={award.url} target="_blank" rel="noopener noreferrer">
                    {award.domain} <ArrowUpRight size={14} aria-hidden="true" />
                  </AwardLink>
                ) : (
                  <SeasonNote>
                    <CalendarClock size={16} aria-hidden="true" />
                    <div>
                      Opens when the annual voting period starts.
                      <br />
                      <span>{award.domain}</span>
                    </div>
                  </SeasonNote>
                )}
              </AwardCard>
            </Reveal>
          ))}
        </AwardsGrid>

        <div style={{ marginBottom: 64 }}>
          <ElectionTimeline />
        </div>

        <Reveal>
          <ChartHead>
            <h3>Traffic across the network, month by month</h3>
            <p>
              Switch metrics, pick a month, or press <b>Play months</b> to watch the ranking shift. The trend view
              compares the five largest sites.
            </p>
          </ChartHead>
          <TruehitsTrafficChart />
        </Reveal>
      </Container>
    </Section>
  );
}
