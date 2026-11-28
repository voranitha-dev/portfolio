import styled from '@emotion/styled';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Vote } from 'lucide-react';
import { useRef } from 'react';
import { ELECTION_MICROSITES } from '../data/portfolioData';
import { Card, Chip, MonoLabel } from '../styles/primitives';
import { color, font, mq } from '../styles/theme';

/* Election-night microsites on a horizontal timeline (vertical on small screens). */

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;

  h3 {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 800;
  }
`;

const Track = styled.ol`
  position: relative;
  display: grid;
  gap: 16px;
  padding-left: 28px;

  ${mq.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-left: 0;
    padding-top: 34px;
  }
`;

/* the timeline line: vertical on mobile, horizontal on md+ */
const Line = styled(motion.span)`
  position: absolute;
  left: 8px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: ${color.lineStrong};
  transform-origin: top center;

  ${mq.md} {
    left: 0;
    right: 0;
    top: 9px;
    bottom: auto;
    width: auto;
    height: 2px;
    transform-origin: left center;
  }
`;

const Dot = styled(motion.span)`
  position: absolute;
  left: -27px;
  top: 22px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${color.bg};
  border: 2px solid ${color.text};

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${color.text};
  }

  ${mq.md} {
    left: 22px;
    top: -34px;
  }
`;

const Item = styled(motion.li)`
  position: relative;
`;

const ElectionCard = styled(Card)`
  height: 100%;
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 22px;
`;

const Year = styled.p`
  font-family: ${font.display};
  font-size: 44px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
`;

const ThaiName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${color.text2};
`;

const Visit = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${font.mono};
  font-size: 12.5px;
  font-weight: 600;
  color: ${color.text};

  &:hover {
    text-decoration: underline;
  }
`;

export function ElectionTimeline() {
  const ref = useRef<HTMLOListElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div>
      <Head>
        <h3>
          <Vote size={22} aria-hidden="true" /> Election microsites
        </h3>
        <MonoLabel>Real-time results on election nights</MonoLabel>
      </Head>

      <Track ref={ref}>
        <Line
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
        {ELECTION_MICROSITES.map((site, i) => (
          <Item
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Dot
              aria-hidden="true"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.25 + i * 0.15 }}
            />
            <ElectionCard $interactive>
              <Year>{site.year}</Year>
              <div>
                <ThaiName lang="th">{site.titleTh}</ThaiName>
                <strong style={{ fontFamily: font.display, fontSize: 16 }}>{site.title}</strong>
              </div>
              <p style={{ fontSize: 14, color: 'var(--c-text-2)' }}>{site.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Chip>{site.scope}</Chip>
                <Chip>Real-time results</Chip>
              </div>
              {site.url && (
                <Visit href={site.url} target="_blank" rel="noopener noreferrer">
                  View microsite <ArrowUpRight size={14} aria-hidden="true" />
                </Visit>
              )}
            </ElectionCard>
          </Item>
        ))}
      </Track>
    </div>
  );
}
