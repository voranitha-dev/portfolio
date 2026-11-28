import styled from '@emotion/styled';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen, Maximize2, Pause, Play, X } from 'lucide-react';
import { type PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY_PROJECTS, PROFILE } from '../data/portfolioData';
import {
  ButtonLink,
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

const AUTOPLAY_MS = 5000;

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 20px;

  ${mq.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ProjectTab = styled.button<{ $active: boolean; $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 14px;
  text-align: left;
  border-radius: ${radius.lg};
  background: ${color.bgElev};
  border: 1px solid ${({ $active, $accent }) => ($active ? $accent : color.line)};
  box-shadow: ${({ $active, $accent }) => ($active ? `0 14px 34px -20px ${$accent}` : 'none')};
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 10px;
    background: #fff;
    border: 1px solid ${color.line};
    padding: 4px;
  }

  strong {
    display: block;
    font-family: ${font.display};
    font-size: 14.5px;
    line-height: 1.25;
  }
`;

const TabProgress = styled(motion.span)`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
`;

const Showcase = styled.div`
  display: grid;
  gap: 18px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
    gap: 24px;
    align-items: start;
  }
`;

const Perspective = styled.div`
  perspective: 1400px;
`;

const Browser = styled(motion.div)`
  position: relative;
  border-radius: ${radius.lg};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  box-shadow: 0 40px 80px -40px rgba(15, 23, 42, 0.5);
  overflow: hidden;
  transform-style: preserve-3d;
`;

const Chrome = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid ${color.line};
  background: ${color.bgSoft};

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    display: inline-block;
  }
`;

const Url = styled.span`
  flex: 1;
  min-width: 0;
  padding: 5px 12px;
  font-family: ${font.mono};
  font-size: 11.5px;
  color: ${color.text3};
  border-radius: 7px;
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Viewport = styled.div`
  position: relative;
  aspect-ratio: 2 / 1;
  background: #fff;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }
`;

const NavArrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #fff;
  background: rgba(7, 10, 19, 0.62);
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;

  .browserFrame:hover &,
  &:focus-visible {
    opacity: 1;
  }
  &:hover {
    transform: translateY(-50%) scale(1.08);
  }
  ${mq.belowLg} {
    opacity: 1;
    width: 36px;
    height: 36px;
  }
`;

const ExpandButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  border-radius: 9px;
  background: rgba(7, 10, 19, 0.7);
  backdrop-filter: blur(6px);
`;

const Thumbs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 2px 4px;
`;

const Thumb = styled.button<{ $active: boolean; $accent: string }>`
  flex: 0 0 auto;
  width: 104px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${({ $active, $accent }) => ($active ? $accent : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: left top;
  }
`;

const Info = styled(Card)`
  padding: 24px;
  display: grid;
  gap: 18px;

  ${mq.lg} {
    position: sticky;
    top: 92px;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: ${font.display};

  strong {
    font-size: 44px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  span {
    font-size: 16px;
    color: ${color.text3};
  }
`;

const StarRow = styled.div`
  display: grid;
  gap: 10px;
`;

const StarLine = styled.p`
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: ${color.text2};

  b {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 8px;
    font-family: ${font.display};
    font-size: 12px;
    color: ${color.onAccent};
  }
`;

const ScreenCaption = styled(motion.div)`
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};

  strong {
    font-family: ${font.display};
    font-size: 16px;
  }
  p {
    font-size: 13.5px;
    color: ${color.text2};
  }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SmallButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 9px;
  border: 1px solid ${color.line};
  background: ${color.bgElev};

  &:hover {
    border-color: ${color.accent};
    color: ${color.accent};
  }
  svg {
    width: 15px;
    height: 15px;
  }
`;

const SmallLink = SmallButton.withComponent('a');

const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 18px;
  background: rgba(4, 6, 12, 0.92);
  backdrop-filter: blur(8px);
  color: #f5f7ff;
`;

const LightboxBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  button {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    color: #fff;
    background: rgba(255, 255, 255, 0.12);
  }
`;

const LightboxStage = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: ${radius.md};
    background: #fff;
  }
`;

const DriveCard = styled(Card)`
  margin-top: 28px;
  padding: 20px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export function WorksGallery() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [screenIdx, setScreenIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const project = GALLERY_PROJECTS[projectIdx];
  const screen = project.screens[screenIdx];

  // 3D tilt following the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });

  const go = useCallback(
    (delta: number) => {
      const count = GALLERY_PROJECTS.length;
      let nextProject = projectIdx;
      let nextScreen = screenIdx + delta;
      if (nextScreen >= GALLERY_PROJECTS[nextProject].screens.length) {
        nextProject = (nextProject + 1) % count;
        nextScreen = 0;
      } else if (nextScreen < 0) {
        nextProject = (nextProject - 1 + count) % count;
        nextScreen = GALLERY_PROJECTS[nextProject].screens.length - 1;
      }
      setDirection(delta);
      setCycleKey((k) => k + 1);
      setProjectIdx(nextProject);
      setScreenIdx(nextScreen);
    },
    [projectIdx, screenIdx]
  );

  const selectProject = (index: number) => {
    setDirection(index > projectIdx ? 1 : -1);
    setProjectIdx(index);
    setScreenIdx(0);
    setCycleKey((k) => k + 1);
  };

  // Autoplay (paused on hover, in the lightbox, or when the user pauses it).
  const autoplayActive = playing && !hovering && !lightbox;
  useEffect(() => {
    if (!autoplayActive) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplayActive, go, cycleKey]);

  // Keyboard arrows while the section (or lightbox) is in focus/view.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inSection = sectionRef.current?.contains(document.activeElement);
      if (!lightbox && !inSection) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, lightbox]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    mx.set(0);
    my.set(0);
    setHovering(false);
  };

  return (
    <Section id="works" aria-labelledby="worksTitle" ref={sectionRef}>
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>06 · Selected works</Eyebrow>
            <SectionHeading id="worksTitle" text="Real screens from" highlight="systems I shipped" />
            <SectionLead>
              {GALLERY_PROJECTS.reduce((n, p) => n + p.screens.length, 0)} production screenshots across travel-tech and
              enterprise HR. Hover to pause, use ← → to browse, click to view full size.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Projects role="tablist" aria-label="Projects">
          {GALLERY_PROJECTS.map((p, i) => (
            <ProjectTab
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === projectIdx}
              $active={i === projectIdx}
              $accent={p.accent}
              onClick={() => selectProject(i)}
            >
              <img src={p.logo} alt="" width="40" height="40" loading="lazy" />
              <span>
                <strong>{p.name}</strong>
                <MonoLabel>
                  {p.screens.length} screens · {p.period}
                </MonoLabel>
              </span>
              {i === projectIdx && (
                <TabProgress
                  key={`${cycleKey}-${autoplayActive}`}
                  style={{ background: p.accent }}
                  initial={{ width: `${(screenIdx / p.screens.length) * 100}%` }}
                  animate={{ width: `${((screenIdx + 1) / p.screens.length) * 100}%` }}
                  transition={{ duration: autoplayActive ? AUTOPLAY_MS / 1000 : 0.3, ease: 'linear' }}
                />
              )}
            </ProjectTab>
          ))}
        </Projects>

        <Showcase>
          <div>
            <Perspective onPointerMove={onPointerMove} onPointerEnter={() => setHovering(true)} onPointerLeave={resetTilt}>
              <Browser className="browserFrame" style={{ rotateX, rotateY }}>
                <Chrome>
                  <i style={{ background: '#FF5F57' }} />
                  <i style={{ background: '#FEBC2E' }} />
                  <i style={{ background: '#28C840' }} />
                  <Url>{project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.id}.internal`} / {screen.title.toLowerCase().replace(/\s+/g, '-')}</Url>
                </Chrome>
                <Viewport>
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={screen.src}
                      src={screen.src}
                      alt={`${project.name}: ${screen.title}. ${screen.caption}`}
                      width={screen.width}
                      height={screen.height}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? '12%' : '-12%', opacity: 0, scale: 1.04 }),
                        center: { x: 0, opacity: 1, scale: 1 },
                        exit: (d: number) => ({ x: d > 0 ? '-12%' : '12%', opacity: 0, scale: 0.98 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setLightbox(true)}
                      style={{ cursor: 'zoom-in' }}
                    />
                  </AnimatePresence>
                  <NavArrow type="button" $side="left" onClick={() => go(-1)} aria-label="Previous screen">
                    <ChevronLeft size={20} />
                  </NavArrow>
                  <NavArrow type="button" $side="right" onClick={() => go(1)} aria-label="Next screen">
                    <ChevronRight size={20} />
                  </NavArrow>
                  <ExpandButton type="button" onClick={() => setLightbox(true)}>
                    <Maximize2 size={14} aria-hidden="true" /> Full size
                  </ExpandButton>
                </Viewport>
              </Browser>
            </Perspective>

            <Thumbs role="tablist" aria-label={`${project.name} screens`}>
              {project.screens.map((s, i) => (
                <Thumb
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === screenIdx}
                  aria-label={s.title}
                  $active={i === screenIdx}
                  $accent={project.accent}
                  onClick={() => {
                    setDirection(i > screenIdx ? 1 : -1);
                    setScreenIdx(i);
                    setCycleKey((k) => k + 1);
                  }}
                >
                  <img src={s.src} alt="" width="104" height="65" loading="lazy" />
                </Thumb>
              ))}
            </Thumbs>
          </div>

          <Info>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <MonoLabel>{project.organization}</MonoLabel>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>{project.name}</h3>
                <MonoLabel>{project.role}</MonoLabel>
              </div>
              <Counter aria-label={`Screen ${screenIdx + 1} of ${project.screens.length}`}>
                <strong>{String(screenIdx + 1).padStart(2, '0')}</strong>
                <span>/ {String(project.screens.length).padStart(2, '0')}</span>
              </Counter>
            </div>

            <AnimatePresence mode="wait">
              <ScreenCaption key={screen.src} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <strong>{screen.title}</strong>
                <p>{screen.caption}</p>
              </ScreenCaption>
            </AnimatePresence>

            <StarRow>
              <StarLine>
                <b style={{ background: project.accent }}>S/T</b>
                {project.summary}
              </StarLine>
              <StarLine>
                <b style={{ background: 'var(--c-success)', color: '#fff' }}>R</b>
                {project.outcome}
              </StarLine>
            </StarRow>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>

            <Controls>
              <SmallButton type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
                {playing ? <Pause /> : <Play />} {playing ? 'Pause slideshow' : 'Play slideshow'}
              </SmallButton>
              {project.liveUrl && (
                <SmallLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live site <ArrowUpRight />
                </SmallLink>
              )}
            </Controls>
          </Info>
        </Showcase>

        <Reveal>
          <DriveCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FolderOpen size={26} color="var(--c-accent)" aria-hidden="true" />
              <div>
                <strong style={{ fontFamily: font.display }}>Full works archive</strong>
                <p style={{ fontSize: 14, color: 'var(--c-text-2)' }}>More screens and project files in Google Drive.</p>
              </div>
            </div>
            <ButtonLink href={PROFILE.archiveDriveUrl} target="_blank" rel="noopener noreferrer" $variant="secondary">
              Open archive <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
          </DriveCard>
        </Reveal>
      </Container>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name}: ${screen.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LightboxBar>
              <div>
                <strong style={{ fontFamily: font.display }}>
                  {project.name} · {screen.title}
                </strong>
                <p style={{ fontSize: 13, opacity: 0.75 }}>{screen.caption}</p>
              </div>
              <button type="button" onClick={() => setLightbox(false)} aria-label="Close" autoFocus>
                <X />
              </button>
            </LightboxBar>
            <LightboxStage>
              <AnimatePresence mode="wait">
                <motion.img
                  key={screen.src}
                  src={screen.src}
                  alt={`${project.name}: ${screen.title}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
              <NavArrow type="button" $side="left" style={{ opacity: 1 }} onClick={() => go(-1)} aria-label="Previous screen">
                <ChevronLeft size={20} />
              </NavArrow>
              <NavArrow type="button" $side="right" style={{ opacity: 1 }} onClick={() => go(1)} aria-label="Next screen">
                <ChevronRight size={20} />
              </NavArrow>
            </LightboxStage>
            <MonoLabel style={{ color: '#cbd5e1', textAlign: 'center' }}>
              {screenIdx + 1} / {project.screens.length} · ← → to browse · Esc to close
            </MonoLabel>
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
}

