import styled from '@emotion/styled';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import {
  Card,
  Container,
  Eyebrow,
  MonoLabel,
  Section,
  SectionHeader,
  SectionLead,
} from '../styles/primitives';
import { color, font, gradient, mq, radius } from '../styles/theme';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';

const SIZE = 360;
const CENTER = SIZE / 2;
const RADIUS = 128;

const point = (index: number, total: number, value: number) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * value,
    y: CENTER + Math.sin(angle) * RADIUS * value,
  };
};

const Layout = styled.div`
  display: grid;
  gap: 20px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 28px;
    align-items: stretch;
  }
`;

const RadarCard = styled(Card)`
  display: grid;
  place-items: center;
  gap: 8px;
  padding: 20px;
  background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--c-accent) 9%, var(--c-bg-elev)), var(--c-bg-elev) 70%);

  svg {
    width: 100%;
    max-width: 420px;
    overflow: visible;
  }
`;

const AxisLabel = styled.button<{ $active: boolean }>`
  font-family: ${font.display};
  font-size: 13px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 8px;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? color.onAccent : color.text2)};
  background: ${({ $active }) => ($active ? color.accent : color.bgElev)};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : color.line)};
  transition: all 0.2s ease;
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  font-size: 13.5px;
  font-weight: 700;
  border-radius: ${radius.pill};
  color: ${({ $active }) => ($active ? color.onAccent : color.text2)};
  background: ${({ $active }) => ($active ? color.accent : color.bgElev)};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : color.line)};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Detail = styled(Card)`
  padding: 24px;
  display: grid;
  gap: 18px;
  align-content: start;

  h3 {
    font-size: 22px;
    font-weight: 800;
  }
`;

const FocusBar = styled.div`
  display: grid;
  gap: 6px;
`;

const Track = styled.div`
  height: 8px;
  border-radius: 99px;
  background: ${color.bgSoft};
  overflow: hidden;
`;

const Capabilities = styled.ul`
  display: grid;
  gap: 8px;

  ${mq.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  li {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 8px;
    font-size: 14px;
    line-height: 1.5;
    color: ${color.text2};
  }

  svg {
    margin-top: 2px;
    color: ${color.success};
  }
`;

const LogoGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
  gap: 10px;
`;

const LogoItem = styled(motion.li)`
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 14px 8px 12px;
  text-align: center;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.3;
  transition: border-color 0.2s ease, transform 0.25s ease;

  &:hover {
    border-color: ${color.accent};
    transform: translateY(-3px);
  }

  span.logo {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid ${color.line};
  }
  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
  span.mono {
    font-family: ${font.mono};
    font-size: 13px;
    font-weight: 700;
    color: ${color.accent};
  }
`;

export function SkillsSection() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const radarRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(radarRef, { once: true, amount: 0.4 });
  const active = SKILL_GROUPS.find((g) => g.id === activeId)!;
  const total = SKILL_GROUPS.length;

  const polygon = SKILL_GROUPS.map((g, i) => point(i, total, g.focus / 100))
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <Section id="skills" aria-labelledby="skillsTitle" $tone="elevated">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>05 · Skills</Eyebrow>
            <SectionHeading id="skillsTitle" text="The stack," highlight="grouped the way I use it" />
            <SectionLead>
              The radar shows where my day-to-day time goes right now. Pick an area to see what I build with it.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Layout>
          <Reveal>
            <RadarCard ref={radarRef}>
              <svg viewBox={`-40 -10 ${SIZE + 80} ${SIZE + 20}`} role="img" aria-label="Radar chart of current focus by skill area">
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--c-accent)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--c-violet)" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75, 1].map((ring) => (
                  <polygon
                    key={ring}
                    points={SKILL_GROUPS.map((_, i) => point(i, total, ring))
                      .map((p) => `${p.x},${p.y}`)
                      .join(' ')}
                    fill="none"
                    stroke="var(--c-line)"
                    strokeDasharray={ring === 1 ? undefined : '3 5'}
                  />
                ))}
                {SKILL_GROUPS.map((g, i) => {
                  const end = point(i, total, 1);
                  return (
                    <line
                      key={g.id}
                      x1={CENTER}
                      y1={CENTER}
                      x2={end.x}
                      y2={end.y}
                      stroke={g.id === activeId ? 'var(--c-accent)' : 'var(--c-line)'}
                      strokeWidth={g.id === activeId ? 2 : 1}
                    />
                  );
                })}
                <motion.polygon
                  points={polygon}
                  fill="url(#radarFill)"
                  stroke="var(--c-accent)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : undefined}
                  transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.2 }}
                />
                {SKILL_GROUPS.map((g, i) => {
                  const p = point(i, total, g.focus / 100);
                  const isActive = g.id === activeId;
                  return (
                    <motion.circle
                      key={g.id}
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 8 : 5}
                      fill={isActive ? 'var(--c-accent)' : 'var(--c-bg-elev)'}
                      stroke="var(--c-accent)"
                      strokeWidth="2.5"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : undefined}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveId(g.id)}
                    />
                  );
                })}
                {SKILL_GROUPS.map((g, i) => {
                  const p = point(i, total, 1.22);
                  return (
                    <foreignObject key={g.id} x={p.x - 60} y={p.y - 16} width="120" height="32">
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AxisLabel type="button" $active={g.id === activeId} onClick={() => setActiveId(g.id)}>
                          {g.shortTitle}
                        </AxisLabel>
                      </div>
                    </foreignObject>
                  );
                })}
              </svg>
              <MonoLabel>Share of current day-to-day work (self-assessed)</MonoLabel>
            </RadarCard>
          </Reveal>

          <div>
            <Tabs role="tablist" aria-label="Skill areas">
              {SKILL_GROUPS.map((g) => (
                <Tab key={g.id} role="tab" aria-selected={g.id === activeId} $active={g.id === activeId} onClick={() => setActiveId(g.id)}>
                  {g.title}
                </Tab>
              ))}
            </Tabs>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Detail role="tabpanel">
                  <div>
                    <h3>{active.title}</h3>
                    <p style={{ color: 'var(--c-text-2)' }}>{active.description}</p>
                  </div>
                  <FocusBar>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <MonoLabel>Current focus</MonoLabel>
                      <MonoLabel>{active.focus}%</MonoLabel>
                    </div>
                    <Track>
                      <motion.div
                        style={{ height: '100%', borderRadius: 99, background: gradient.brand }}
                        initial={{ width: 0 }}
                        animate={{ width: `${active.focus}%` }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </Track>
                  </FocusBar>
                  <Capabilities>
                    {active.capabilities.map((c) => (
                      <li key={c}>
                        <Check size={16} aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </Capabilities>
                  <LogoGrid>
                    {active.skills.map((s, i) => (
                      <LogoItem
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i, type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        <span className="logo">
                          {s.logo ? (
                            <img src={s.logo} alt="" width="26" height="26" loading="lazy" />
                          ) : (
                            <span className="mono" aria-hidden="true">
                              {s.name.slice(0, 2)}
                            </span>
                          )}
                        </span>
                        {s.name}
                      </LogoItem>
                    ))}
                  </LogoGrid>
                </Detail>
              </motion.div>
            </AnimatePresence>
          </div>
        </Layout>
      </Container>
    </Section>
  );
}
