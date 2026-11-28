import styled from '@emotion/styled';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Award, BadgeCheck, ExternalLink, GraduationCap, Maximize2, TrendingUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CERTIFICATIONS, EDUCATION, EXPERIENCE_TIMELINE, NATION_TENURE } from '../data/portfolioData';
import {
  Card,
  Chip,
  Container,
  Eyebrow,
  MonoLabel,
  Section,
  SectionHeader,
  SectionLead,
} from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';

const Timeline = styled.ol`
  position: relative;
  display: grid;
  gap: 28px;
  padding-left: 62px;

  ${mq.md} {
    padding-left: 84px;
  }
`;

const Rail = styled.span`
  position: absolute;
  left: 26px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: ${color.line};

  ${mq.md} {
    left: 36px;
  }
`;

const RailFill = styled(motion.span)`
  position: absolute;
  inset: 0;
  transform-origin: top;
  background: linear-gradient(${color.accent}, ${color.violet}, ${color.cyan});
`;

/* Start-year badge sitting on the rail (rail centre = 27px / 37px from the timeline edge). */
const YearBadge = styled.span<{ $current?: boolean }>`
  position: absolute;
  left: -35px;
  top: 24px;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  min-width: 52px;
  height: 30px;
  padding: 0 10px;
  font-family: ${font.mono};
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 999px;
  color: ${({ $current }) => ($current ? color.onAccent : color.text2)};
  background: ${({ $current }) => ($current ? color.accent : color.bgElev)};
  border: 1.5px solid ${({ $current }) => ($current ? 'transparent' : color.lineStrong)};
  box-shadow: ${({ $current }) => ($current ? `0 0 0 6px color-mix(in srgb, var(--c-accent) 18%, transparent)` : 'none')};

  ${mq.md} {
    left: -47px;
    min-width: 58px;
    height: 32px;
    font-size: 13px;
  }
`;

const RoleCard = styled(Card)`
  display: grid;
  gap: 18px;
  padding: 22px;

  ${mq.md} {
    padding: 28px;
  }
`;

const RoleHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px;

  h3 {
    font-size: clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
  }
`;

const Company = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: ${color.text2};

  &:hover {
    color: ${color.accent};
  }
`;

const Logos = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    height: 36px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
    padding: 6px 9px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid ${color.line};
  }
`;

const Progression = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  color: ${color.success};
  background: color-mix(in srgb, ${color.success} 10%, transparent);
`;

const Highlights = styled.ul<{ $cols: number }>`
  display: grid;
  gap: 12px;

  ${mq.md} {
    grid-template-columns: ${({ $cols }) => ($cols > 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr')};
  }
`;

const Highlight = styled(motion.li)`
  display: grid;
  align-content: start;
  gap: 4px;
  padding: 14px 16px;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};

  h4 {
    font-size: 14.5px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    line-height: 1.65;
    color: ${color.text2};
  }
`;

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Extras = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 56px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  }
`;

const ExtraCard = styled(Card)`
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: start;

  h3 {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 19px;
    font-weight: 800;
  }
`;

const CertList = styled.ul`
  display: grid;
  gap: 10px;
`;

const Cert = styled(motion.li)`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: ${radius.md};
  border: 1px solid ${color.line};
  transition: border-color 0.2s ease, transform 0.25s ease;

  &:hover {
    border-color: ${color.accent};
    transform: translateX(4px);
  }

  strong {
    display: block;
    font-size: 14.5px;
    font-family: ${font.display};
  }
  svg {
    color: ${color.accent};
  }
`;

const AwardFigure = styled.figure`
  margin: 0;
  display: grid;
  gap: 12px;
  padding: 12px;
  border-radius: ${radius.md};
  background: color-mix(in srgb, ${color.warning} 8%, transparent);
  border: 1px solid color-mix(in srgb, ${color.warning} 28%, transparent);

  figcaption {
    display: flex;
    gap: 8px;
    font-size: 14px;
    line-height: 1.55;
    color: ${color.text2};
  }
`;

const CertThumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${color.line};
  background: #fff;
  cursor: zoom-in;

  img {
    width: 100%;
    aspect-ratio: 1600 / 1137;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover img {
    transform: scale(1.04);
  }

  span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    border-radius: 8px;
    background: rgba(10, 10, 10, 0.72);
    backdrop-filter: blur(4px);
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(4, 4, 4, 0.88);
  backdrop-filter: blur(6px);

  figure {
    margin: 0;
    max-width: min(1200px, 100%);
    display: grid;
    gap: 10px;
  }
  img {
    width: 100%;
    max-height: 82vh;
    object-fit: contain;
    border-radius: ${radius.md};
    background: #fff;
  }
  figcaption {
    color: #e5e5e5;
    font-size: 13px;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
`;

export function ExperienceSection() {
  const [certOpen, setCertOpen] = useState(false);

  useEffect(() => {
    if (!certOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCertOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [certOpen]);

  const timelineRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="experience" aria-labelledby="experienceTitle">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>04 · Experience</Eyebrow>
            <SectionHeading id="experienceTitle" text="From intern to Lead Frontend Developer" highlight="in 8+ years" />
            <SectionLead>
              Four companies, one direction: bigger traffic, more ownership, and now AI. Current role:{' '}
              <b>{NATION_TENURE}</b> at Nation Group.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Timeline ref={timelineRef}>
          <Rail aria-hidden="true">
            <RailFill style={{ scaleY: fill }} />
          </Rail>

          {EXPERIENCE_TIMELINE.map((job) => {
            const current = Boolean(job.startedAt);
            return (
              <Reveal key={job.id} as="li" y={30}>
                <div style={{ position: 'relative' }}>
                  <YearBadge $current={current} aria-hidden="true">
                    {job.period.match(/\d{4}/)?.[0]}
                  </YearBadge>
                  <RoleCard>
                    <RoleHead>
                      <div style={{ display: 'grid', gap: 6 }}>
                        <MonoLabel>
                          {job.period} · {current ? NATION_TENURE : job.tenure} · {job.location}
                        </MonoLabel>
                        <h3>{job.role}</h3>
                        {job.companyUrl ? (
                          <Company href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                            {job.company} <ExternalLink size={14} aria-hidden="true" />
                          </Company>
                        ) : (
                          <span style={{ fontWeight: 600, color: 'var(--c-text-2)' }}>{job.company}</span>
                        )}
                      </div>
                      {job.logos.length > 0 && (
                        <Logos>
                          {job.logos.map((l) => (
                            <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" height="36" />
                          ))}
                        </Logos>
                      )}
                    </RoleHead>

                    {job.progressionNote && (
                      <Progression>
                        <TrendingUp size={15} aria-hidden="true" /> {job.progressionNote}
                      </Progression>
                    )}

                    <Highlights $cols={job.highlights.length}>
                      {job.highlights.map((h, i) => (
                        <Highlight
                          key={h.title}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06 }}
                        >
                          <h4>{h.title}</h4>
                          <p>{h.description}</p>
                        </Highlight>
                      ))}
                    </Highlights>

                    <Stack aria-label="Tech stack">
                      {job.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </Stack>
                  </RoleCard>
                </div>
              </Reveal>
            );
          })}
        </Timeline>

        <Extras>
          <Reveal>
            <ExtraCard>
              <h3>
                <BadgeCheck size={20} color="var(--c-accent)" aria-hidden="true" /> Certifications
              </h3>
              <CertList>
                {CERTIFICATIONS.map((cert, i) => (
                  <Cert
                    key={cert.title}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Award size={20} aria-hidden="true" />
                    <span>
                      <strong>{cert.title}</strong>
                      <MonoLabel>
                        {cert.issuer} · {cert.focus}
                      </MonoLabel>
                    </span>
                    <Chip $tone="accent">{cert.date}</Chip>
                  </Cert>
                ))}
              </CertList>
            </ExtraCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ExtraCard style={{ height: '100%' }}>
              <h3>
                <GraduationCap size={21} color="var(--c-violet)" aria-hidden="true" /> Education
              </h3>
              <div style={{ display: 'grid', gap: 6 }}>
                <strong style={{ fontFamily: font.display, fontSize: 17 }}>{EDUCATION.degree}</strong>
                <p style={{ color: 'var(--c-text-2)', fontSize: 14.5 }}>{EDUCATION.institution}</p>
                <MonoLabel>
                  Graduated {EDUCATION.graduationYear} · GPA {EDUCATION.gpa}
                </MonoLabel>
              </div>
              <AwardFigure>
                <CertThumb type="button" onClick={() => setCertOpen(true)} aria-label="View the 2018 competition certificate">
                  <img
                    src={EDUCATION.awardImage.src}
                    alt={EDUCATION.awardImage.alt}
                    width={EDUCATION.awardImage.width}
                    height={EDUCATION.awardImage.height}
                    loading="lazy"
                  />
                  <span>
                    <Maximize2 size={13} aria-hidden="true" /> View certificate
                  </span>
                </CertThumb>
                <figcaption>
                  <Award size={18} color="var(--c-warning)" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  {EDUCATION.award}
                </figcaption>
              </AwardFigure>
            </ExtraCard>
          </Reveal>
        </Extras>
      </Container>

      <AnimatePresence>
        {certOpen && (
          <Lightbox
            role="dialog"
            aria-modal="true"
            aria-label="2018 Outstanding Cooperative Education Competition certificate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertOpen(false)}
          >
            <CloseButton type="button" onClick={() => setCertOpen(false)} aria-label="Close" autoFocus>
              <X />
            </CloseButton>
            <motion.figure initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
              <img src={EDUCATION.awardImage.src} alt={EDUCATION.awardImage.alt} />
              <figcaption>{EDUCATION.award}</figcaption>
            </motion.figure>
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
}
