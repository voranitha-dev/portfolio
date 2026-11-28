import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { CASE_STUDIES, type CaseStudy, type CaseStudyCategory } from '../data/portfolioData';
import {
  Card,
  Chip,
  Container,
  Eyebrow,
  MonoLabel,
  noTransient,
  Section,
  SectionHeader,
  SectionLead,
  SegmentedButton,
  SegmentedGroup,
  segmentedPill,
} from '../styles/primitives';
import { color, font, gradient, mq, radius } from '../styles/theme';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';

const FILTERS: { id: CaseStudyCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'high-traffic', label: 'High-traffic web' },
  { id: 'ai-data', label: 'AI & data' },
  { id: 'travel-enterprise', label: 'Travel & enterprise' },
];

const STAR_STEPS = [
  { key: 'situation', letter: 'S', label: 'Situation' },
  { key: 'task', letter: 'T', label: 'Task' },
  { key: 'actions', letter: 'A', label: 'Action' },
  { key: 'results', letter: 'R', label: 'Result' },
] as const;

const Layout = styled.div`
  display: grid;
  gap: 24px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 32px;
    align-items: start;
  }
`;

const List = styled.ol`
  display: grid;
  gap: 10px;
`;

const Item = styled.button<{ $active: boolean }>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px 16px 16px 14px;
  text-align: left;
  border-radius: ${radius.lg};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : color.line)};
  background: ${({ $active }) => ($active ? 'transparent' : color.bgElev)};
  transition: border-color 0.25s ease, transform 0.25s ease;
  isolation: isolate;

  &:hover {
    border-color: ${({ $active }) => ($active ? 'transparent' : color.lineStrong)};
    transform: translateX(3px);
  }

  > svg {
    color: ${({ $active }) => ($active ? color.accent : color.text3)};
    transition: transform 0.25s ease;
    transform: ${({ $active }) => ($active ? 'translateX(3px)' : 'none')};
  }
`;

const ItemHighlight = styled(motion.span)`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: ${color.bgElev};
  border: 1.5px solid ${color.accent};
  box-shadow: 0 16px 36px -22px ${color.glow};
`;

const Index = styled.span<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  font-family: ${font.mono};
  font-size: 13px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? color.onAccent : color.text3)};
  background: ${({ $active }) => ($active ? color.accent : color.bgSoft)};
  transition: color 0.25s ease;
`;

const ItemText = styled.span`
  display: grid;
  gap: 3px;
  min-width: 0;

  strong {
    font-family: ${font.display};
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
  }
`;

const Panel = styled(Card)`
  overflow: hidden;

  ${mq.lg} {
    position: sticky;
    top: 92px;
  }
`;

const PanelHead = styled.div`
  display: grid;
  gap: 12px;
  padding: 24px 24px 20px;
  border-bottom: 1px solid ${color.line};
  background: linear-gradient(160deg, color-mix(in srgb, var(--c-accent) 7%, var(--c-bg-elev)), var(--c-bg-elev) 55%);

  h3 {
    font-size: clamp(1.3rem, 1.1rem + 0.9vw, 1.7rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.025em;
  }
`;

const Org = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  img {
    height: 22px;
    width: auto;
    max-width: 110px;
    object-fit: contain;
    padding: 3px 6px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid ${color.line};
  }
`;

const Metrics = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const Metric = styled(motion.li)`
  padding: 12px 14px;
  border-radius: ${radius.md};
  background: ${color.bgElev};
  border: 1px solid ${color.line};

  strong {
    display: block;
    font-family: ${font.display};
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.03em;
    background: ${gradient.brand};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  span {
    font-size: 12.5px;
    color: ${color.text2};
  }
`;

const Star = styled.ol`
  position: relative;
  display: grid;
  gap: 22px;
  padding: 24px;
`;

const StarLine = styled(motion.span)`
  position: absolute;
  left: 43px;
  top: 44px;
  bottom: 44px;
  width: 2px;
  transform-origin: top;
  background: linear-gradient(${color.accent}, ${color.violet}, ${color.cyan});
`;

const StarStep = styled(motion.li, noTransient)<{ $result?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 16px;

  p,
  li {
    font-size: 15px;
    line-height: 1.7;
    color: ${color.text2};
  }

  ul {
    display: grid;
    gap: 8px;
  }

  ul li {
    position: relative;
    padding-left: 18px;
  }

  ul li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.72em;
    width: 7px;
    height: 7px;
    border-radius: 2px;
    background: ${({ $result }) => ($result ? color.success : color.accent)};
    transform: rotate(45deg);
  }
`;

const Letter = styled.span<{ $result?: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-family: ${font.display};
  font-size: 17px;
  font-weight: 800;
  color: ${({ $result }) => ($result ? '#fff' : color.onAccent)};
  background: ${({ $result }) => ($result ? color.success : color.accent)};
  box-shadow: 0 10px 22px -12px ${color.glow};
`;

const StepLabel = styled.p`
  margin-bottom: 4px !important;
  font-family: ${font.mono};
  font-size: 11.5px !important;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.text3} !important;
`;

const PanelFoot = styled.div`
  display: grid;
  gap: 14px;
  padding: 18px 24px 24px;
  border-top: 1px solid ${color.line};
`;

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${color.accent};
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Preview = styled.figure`
  margin: 0 24px;
  border-radius: ${radius.md};
  overflow: hidden;
  border: 1px solid ${color.line};

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: left top;
    transition: transform 0.8s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;

function StarStory({ study }: { study: CaseStudy }) {
  return (
    <Star>
      <StarLine
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />
      {STAR_STEPS.map((step, i) => {
        const value = study[step.key];
        const isResult = step.key === 'results';
        return (
          <StarStep
            key={step.key}
            $result={isResult}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + i * 0.16 }}
          >
            <Letter $result={isResult} aria-hidden="true">
              {step.letter}
            </Letter>
            <div>
              <StepLabel>{step.label}</StepLabel>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{value}</p>
              )}
            </div>
          </StarStep>
        );
      })}
    </Star>
  );
}

export function CaseStudiesSection() {
  const [filter, setFilter] = useState<CaseStudyCategory>('all');
  const [activeId, setActiveId] = useState(CASE_STUDIES[0].id);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === filter)),
    [filter]
  );
  const active = visible.find((c) => c.id === activeId) ?? visible[0];

  const select = (id: string) => {
    setActiveId(id);
    if (window.matchMedia('(max-width: 1023px)').matches) {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section id="case-studies" aria-labelledby="caseTitle" $tone="elevated">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>03 · Case studies in STAR format</Eyebrow>
            <SectionHeading id="caseTitle" text="What the problem was, what I did," highlight="and what changed" />
            <SectionLead>
              Each project reads as Situation → Task → Action → Result, so you can get the whole story in under a
              minute.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <div style={{ marginBottom: 22 }}>
          <SegmentedGroup role="tablist" aria-label="Filter case studies">
            {FILTERS.map((f) => (
              <SegmentedButton key={f.id} role="tab" aria-selected={filter === f.id} $active={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="casePill" css={segmentedPill} />}
                {f.label}
              </SegmentedButton>
            ))}
          </SegmentedGroup>
        </div>

        <Layout>
          <List>
            {visible.map((study, i) => {
              const isActive = study.id === active.id;
              return (
                <motion.li key={study.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Item type="button" $active={isActive} onClick={() => select(study.id)} aria-pressed={isActive} aria-controls="caseStudyPanel">
                    {isActive && <ItemHighlight layoutId="caseHighlight" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                    <Index $active={isActive}>{String(i + 1).padStart(2, '0')}</Index>
                    <ItemText>
                      <MonoLabel>
                        {study.categoryLabel} · {study.period}
                      </MonoLabel>
                      <strong>{study.title}</strong>
                    </ItemText>
                    <ChevronRight size={18} aria-hidden="true" />
                  </Item>
                </motion.li>
              );
            })}
          </List>

          <Panel ref={panelRef} id="caseStudyPanel" data-anchor>
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                aria-labelledby={`case-${active.id}`}
              >
                <PanelHead>
                  <Org>
                    {active.logo && <img src={active.logo} alt={active.organization} height="22" />}
                    <MonoLabel>
                      {active.organization} · {active.period}
                    </MonoLabel>
                  </Org>
                  <h3 id={`case-${active.id}`}>{active.title}</h3>
                  <p style={{ color: 'var(--c-text-2)' }}>{active.oneLiner}</p>
                  <Metrics>
                    {active.metrics.map((m, i) => (
                      <Metric key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}>
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </Metric>
                    ))}
                  </Metrics>
                </PanelHead>

                <StarStory study={active} />

                {active.previewImage && (
                  <Preview>
                    <img src={active.previewImage} alt={`${active.title}: screenshot`} loading="lazy" width="1600" height="750" />
                  </Preview>
                )}

                <PanelFoot>
                  <Stack aria-label="Tech stack">
                    {active.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </Stack>
                  {active.links && (
                    <Links>
                      {active.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ))}
                    </Links>
                  )}
                </PanelFoot>
              </motion.article>
            </AnimatePresence>
          </Panel>
        </Layout>
      </Container>
    </Section>
  );
}
