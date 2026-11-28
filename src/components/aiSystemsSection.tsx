import styled from '@emotion/styled';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowRight, ExternalLink, Maximize2, Play, RotateCcw, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DIAGRAM_H,
  DIAGRAM_W,
  type DiagramEdge,
  type DiagramNode,
  EXPOSED_TELEMETRY_ROWS,
  MORNING_BRIEF_EDGES,
  MORNING_BRIEF_NODES,
  PERSONALIZATION_EDGES,
  PERSONALIZATION_NODES,
} from '../data/aiPipelines';
import { PROFILE } from '../data/portfolioData';
import { useTypewriter } from '../hooks/useTypewriter';
import {
  Button,
  Card,
  Container,
  Eyebrow,
  LogoTile,
  MonoLabel,
  noTransient,
  Section,
  SectionHeader,
  SectionLead,
  SegmentedButton,
  SegmentedGroup,
  segmentedPill,
} from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';

type PipelineId = 'morning-brief' | 'personalization';

const PIPELINES: Record<
  PipelineId,
  { label: string; title: string; nodes: DiagramNode[]; edges: DiagramEdge[]; stages: string[] }
> = {
  'morning-brief': {
    label: 'Morning Brief AI',
    title: 'Editor picks a brief → brand-styled SEO draft in One CMS',
    nodes: MORNING_BRIEF_NODES,
    edges: MORNING_BRIEF_EDGES,
    stages: ['Trigger', 'Lock', 'Brand context', 'Generate', 'Publish draft'],
  },
  personalization: {
    label: 'Personalization → LINE',
    title: 'Reader visits → one identity → behavior data → LINE recommendations',
    nodes: PERSONALIZATION_NODES,
    edges: PERSONALIZATION_EDGES,
    stages: ['Visit', 'Identify', 'Analyze', 'Rank', 'Deliver'],
  },
};

const curve = (from: DiagramNode, to: DiagramNode) => {
  const x1 = from.x + from.width / 2;
  const x2 = to.x - to.width / 2;
  const dx = Math.max((x2 - x1) * 0.5, 28);
  return `M ${x1} ${from.y} C ${x1 + dx} ${from.y}, ${x2 - dx} ${to.y}, ${x2} ${to.y}`;
};

/* ------------------------------------------------------------------ */

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Canvas = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const CanvasHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid ${color.line};
  background: ${color.bgSoft};
`;

const StageTrack = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StageStep = styled.li<{ $state: 'done' | 'active' | 'idle' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 99px;
  transition: all 0.3s ease;
  color: ${({ $state }) => ($state === 'idle' ? color.text3 : $state === 'active' ? color.onAccent : color.accent)};
  background: ${({ $state }) =>
    $state === 'active' ? color.accent : $state === 'done' ? color.accentSoft : 'transparent'};
  border: 1px solid ${({ $state }) => ($state === 'idle' ? color.line : 'transparent')};

  b {
    font-family: ${font.mono};
    font-size: 10.5px;
  }
`;

const Stage = styled.div`
  position: relative;
  display: none;
  aspect-ratio: ${DIAGRAM_W} / ${DIAGRAM_H};
  background-image: radial-gradient(${color.line} 1.2px, transparent 1.2px);
  background-size: 22px 22px;

  ${mq.lg} {
    display: block;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
`;

const NodeButton = styled(motion.button, noTransient)<{ $selected: boolean; $accent?: string }>`
  position: absolute;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  text-align: left;
  border-radius: 14px;
  background: ${color.bgElev};
  border: 1.5px solid ${({ $selected, $accent }) => ($selected ? $accent ?? color.accent : color.line)};
  box-shadow: ${({ $selected, $accent }) =>
    $selected ? `0 0 0 4px color-mix(in srgb, ${$accent ?? 'var(--c-accent)'} 18%, transparent), 0 16px 34px -18px ${$accent ?? 'var(--c-glow)'}` : '0 6px 18px -12px rgba(15,23,42,.3)'};
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  strong {
    display: block;
    font-family: ${font.display};
    font-size: clamp(11px, 0.95vw, 13.5px);
    font-weight: 700;
    line-height: 1.25;
  }
  span.sub {
    display: block;
    font-size: clamp(9.5px, 0.78vw, 11.5px);
    color: ${color.text3};
    line-height: 1.3;
  }
`;

const MobileFlow = styled.ol`
  display: grid;
  gap: 0;
  padding: 18px;

  ${mq.lg} {
    display: none;
  }
`;

const MobileStep = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 14px;
  padding-bottom: 18px;

  &:not(:last-of-type)::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 42px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(${color.accent}, ${color.violet});
    opacity: 0.4;
  }

  button {
    text-align: left;
    display: grid;
    gap: 2px;
  }
`;

const Detail = styled.div`
  display: grid;
  gap: 14px;
  padding: 18px;
  border-top: 1px solid ${color.line};

  ${mq.md} {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
    padding: 20px 22px;
  }
`;

const DetailTitle = styled.div`
  display: grid;
  gap: 4px;
  align-content: center;

  h3 {
    font-size: 17px;
    font-weight: 800;
  }
`;

const Code = styled.div`
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 12px 14px;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};

  code {
    font-family: ${font.mono};
    font-size: 12.5px;
    line-height: 1.55;
    color: ${color.text};
    word-break: break-word;
    min-height: 2.6em;
  }
`;

const Caret = styled.span`
  display: inline-block;
  width: 7px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: -2px;
  background: ${color.accent};
  animation: blink 1s steps(1) infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const ProofGrid = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 18px;

  ${mq.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ProofCard = styled(Card)`
  display: grid;
  gap: 8px;
  padding: 20px;

  strong {
    font-family: ${font.display};
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  p {
    font-size: 14px;
    color: ${color.text2};
  }
`;

const PersonalGrid = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 18px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    text-align: left;
    font-family: ${font.mono};
    font-size: 11px;
    font-weight: 500;
    color: ${color.text3};
    padding: 0 8px 8px 0;
    border-bottom: 1px solid ${color.line};
  }
  td {
    padding: 10px 8px 10px 0;
    border-bottom: 1px solid ${color.line};
    vertical-align: middle;
  }
  td code {
    font-family: ${font.mono};
    font-size: 11.5px;
    color: ${color.text2};
  }
`;

const AffinityTrack = styled.span`
  display: block;
  width: 100%;
  min-width: 80px;
  height: 6px;
  border-radius: 99px;
  background: ${color.bgSoft};
  overflow: hidden;
`;

const ProofThumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  margin-top: 14px;
  border-radius: ${radius.md};
  overflow: hidden;
  border: 1px solid ${color.line};

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: left top;
    transition: transform 0.5s ease;
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
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    border-radius: 8px;
    background: rgba(7, 10, 19, 0.75);
  }
`;

const LinePhone = styled(Card)`
  padding: 18px;
  display: grid;
  gap: 12px;
  background: linear-gradient(180deg, color-mix(in srgb, #06c755 10%, var(--c-bg-elev)), var(--c-bg-elev));
`;

const FlexBubble = styled(motion.div)`
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  box-shadow: 0 10px 24px -18px rgba(15, 23, 42, 0.5);

  b {
    font-size: 14px;
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(4, 6, 12, 0.86);
  backdrop-filter: blur(6px);

  figure {
    margin: 0;
    max-width: min(1400px, 100%);
    display: grid;
    gap: 10px;
  }
  img {
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: ${radius.md};
    background: #fff;
  }
  figcaption {
    color: #e5e7eb;
    font-size: 13px;
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
  background: rgba(255, 255, 255, 0.12);
`;

/* ------------------------------------------------------------------ */

export function AiSystemsSection() {
  const [pipelineId, setPipelineId] = useState<PipelineId>('morning-brief');
  const pipeline = PIPELINES[pipelineId];
  const [selectedId, setSelectedId] = useState(pipeline.nodes[0].id);
  const [traceStage, setTraceStage] = useState(4);
  const [tracing, setTracing] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(canvasRef, { once: true, amount: 0.4 });

  const selected = pipeline.nodes.find((n) => n.id === selectedId) ?? pipeline.nodes[0];
  const typedOutput = useTypewriter(selected.outputSample);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const runTrace = useCallback(
    (nodes: DiagramNode[] = pipeline.nodes) => {
      clearTimers();
      setTracing(true);
      setTraceStage(-1);
      for (let stage = 0; stage <= 4; stage += 1) {
        timers.current.push(
          window.setTimeout(() => {
            setTraceStage(stage);
            const first = nodes.find((n) => n.stage === stage);
            if (first) setSelectedId(first.id);
            if (stage === 4) setTracing(false);
          }, 350 + stage * 900)
        );
      }
    },
    [pipeline.nodes]
  );

  // Auto-play the trace the first time the diagram scrolls into view.
  useEffect(() => {
    if (inView) runTrace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomOpen]);

  const switchPipeline = (id: PipelineId) => {
    setPipelineId(id);
    setSelectedId(PIPELINES[id].nodes[0].id);
    runTrace(PIPELINES[id].nodes);
  };

  const nodeById = (id: string) => pipeline.nodes.find((n) => n.id === id)!;

  return (
    <Section id="ai-systems" aria-labelledby="aiTitle">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>02 · AI & data systems in production</Eyebrow>
            <SectionHeading id="aiTitle" text="Two pipelines I designed and run," highlight="traced step by step" />
            <SectionLead>
              Press <b>Run trace</b> to watch a request move through each stage, or click any node to see what goes in
              and what comes out.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Toolbar>
          <SegmentedGroup role="tablist" aria-label="Pipeline">
            {(Object.keys(PIPELINES) as PipelineId[]).map((id) => (
              <SegmentedButton key={id} role="tab" aria-selected={pipelineId === id} $active={pipelineId === id} onClick={() => switchPipeline(id)}>
                {pipelineId === id && <motion.span layoutId="aiPipelinePill" css={segmentedPill} />}
                {PIPELINES[id].label}
              </SegmentedButton>
            ))}
          </SegmentedGroup>
          <Button type="button" $variant="secondary" onClick={() => runTrace()} disabled={tracing} style={{ minHeight: 40 }}>
            {tracing ? <RotateCcw /> : <Play />}
            {tracing ? 'Tracing…' : 'Run trace'}
          </Button>
        </Toolbar>

        <Canvas ref={canvasRef}>
          <CanvasHead>
            <MonoLabel>{pipeline.title}</MonoLabel>
            <StageTrack aria-label="Pipeline stages">
              {pipeline.stages.map((label, i) => (
                <StageStep key={label} $state={i < traceStage ? 'done' : i === traceStage ? 'active' : 'idle'}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  {label}
                </StageStep>
              ))}
            </StageTrack>
          </CanvasHead>

          <Stage>
            <svg viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} aria-hidden="true">
              {pipeline.edges.map((edge) => {
                const d = curve(nodeById(edge.from), nodeById(edge.to));
                const lit = traceStage >= edge.stage;
                const stroke = edge.color ?? 'var(--c-accent)';
                return (
                  <g key={`${pipelineId}-${edge.id}`}>
                    <path d={d} fill="none" stroke="var(--c-line-strong)" strokeWidth="2" />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: lit ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                    {lit && (
                      <>
                        <circle r="5" fill={stroke}>
                          <animateMotion dur="2.2s" repeatCount="indefinite" path={d} />
                        </circle>
                        <circle r="3" fill={stroke} opacity="0.55">
                          <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path={d} />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
            {pipeline.nodes.map((node) => {
              const lit = traceStage >= node.stage;
              return (
                <NodeButton
                  key={`${pipelineId}-${node.id}`}
                  type="button"
                  $selected={node.id === selected.id}
                  $accent={node.accent}
                  onClick={() => setSelectedId(node.id)}
                  style={{
                    left: `${(node.x / DIAGRAM_W) * 100}%`,
                    top: `${(node.y / DIAGRAM_H) * 100}%`,
                    width: `${(node.width / DIAGRAM_W) * 100}%`,
                    x: '-50%',
                    y: '-50%',
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: lit ? 1 : 0.45, scale: lit ? 1 : 0.94 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  aria-pressed={node.id === selected.id}
                >
                  <LogoTile $size={34}>
                    <img src={node.logo} alt="" width="24" height="24" />
                  </LogoTile>
                  <span>
                    <strong>{node.title}</strong>
                    <span className="sub">{node.techLabel}</span>
                  </span>
                </NodeButton>
              );
            })}
          </Stage>

          <MobileFlow>
            {pipeline.nodes.map((node) => (
              <MobileStep key={node.id}>
                <LogoTile $size={40}>
                  <img src={node.logo} alt="" width="28" height="28" />
                </LogoTile>
                <button type="button" onClick={() => setSelectedId(node.id)} aria-pressed={node.id === selected.id}>
                  <MonoLabel>Stage {node.stage + 1}</MonoLabel>
                  <strong style={{ color: node.id === selected.id ? 'var(--c-accent)' : undefined }}>{node.title}</strong>
                  <span style={{ fontSize: 13, color: 'var(--c-text-2)' }}>{node.subtitle}</span>
                </button>
              </MobileStep>
            ))}
          </MobileFlow>

          <Detail aria-live="polite">
            <DetailTitle>
              <MonoLabel>Selected · stage {selected.stage + 1}</MonoLabel>
              <h3>{selected.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--c-text-2)' }}>{selected.subtitle}</p>
            </DetailTitle>
            <Code>
              <MonoLabel>Input</MonoLabel>
              <code>{selected.inputSample}</code>
            </Code>
            <Code>
              <MonoLabel style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowRight size={12} aria-hidden="true" /> Output
              </MonoLabel>
              <code>
                {typedOutput}
                <Caret aria-hidden="true" />
              </code>
            </Code>
          </Detail>
        </Canvas>

        <AnimatePresence mode="wait">
          {pipelineId === 'morning-brief' ? (
            <motion.div key="mb-proof" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ProofGrid>
                <ProofCard>
                  <MonoLabel>Cost telemetry</MonoLabel>
                  <strong>≈ $0.0005 / draft</strong>
                  <p>Token estimates for Thai (2.5 chars/token) and English (4 chars/token), priced per run for Gemini 2.5 Flash.</p>
                </ProofCard>
                <ProofCard>
                  <MonoLabel>SEO structure</MonoLabel>
                  <strong>Enforced every run</strong>
                  <p>50–70 character title, direct hook, key-point list, 3 HTML sections and 5–10 keywords.</p>
                </ProofCard>
                <ProofCard>
                  <MonoLabel>Safe delivery</MonoLabel>
                  <strong>Draft, never auto-publish</strong>
                  <p>Auto-repairs LLM JSON, routes to the right brand CMS, writes an audit log and releases the Redis lock.</p>
                </ProofCard>
              </ProofGrid>
            </motion.div>
          ) : (
            <motion.div key="p-proof" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <PersonalGrid>
                <Card style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                    <strong style={{ fontFamily: font.display }}>Reader behavior per nid (sample)</strong>
                    <MonoLabel>BigQuery → Power BI</MonoLabel>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Page path</th>
                        <th>Eng. time</th>
                        <th style={{ width: '32%' }}>Affinity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXPOSED_TELEMETRY_ROWS.map((row, i) => (
                        <tr key={row.path}>
                          <td style={{ fontWeight: 600 }}>{row.category}</td>
                          <td>
                            <code>{row.path}</code>
                          </td>
                          <td style={{ fontFamily: font.mono, fontSize: 12 }}>{row.engSec}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <AffinityTrack>
                                <motion.span
                                  style={{ display: 'block', height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, var(--c-accent), var(--c-violet))' }}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${row.affinity}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                />
                              </AffinityTrack>
                              <span style={{ fontFamily: font.mono, fontSize: 12 }}>{row.affinity}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <ProofThumb type="button" onClick={() => setZoomOpen(true)}>
                    <img
                      src={PROFILE.powerBiProofImage}
                      alt="Power BI report showing reader behavior by Auth0 nid, site, article category and engagement time"
                      width="2982"
                      height="1236"
                      loading="lazy"
                    />
                    <span>
                      <Maximize2 size={13} aria-hidden="true" /> View Power BI report
                    </span>
                  </ProofThumb>
                </Card>

                <LinePhone>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontFamily: font.display }}>LINE OA output</strong>
                    <MonoLabel>Matched via nid</MonoLabel>
                  </div>
                  {[
                    { tag: 'Business · 94%', title: 'Market & SET investment digest' },
                    { tag: 'Economics · 86%', title: 'Macro policy & ASEAN trade outlook' },
                    { tag: 'Finance · 82%', title: 'Personal investment picks this week' },
                  ].map((item, i) => (
                    <FlexBubble
                      key={item.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.18, duration: 0.5 }}
                    >
                      <MonoLabel style={{ color: '#06c755' }}>#{i + 1} {item.tag}</MonoLabel>
                      <b>{item.title}</b>
                    </FlexBubble>
                  ))}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
                    <a href={PROFILE.personalizationFlowUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-accent)', display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                      Architecture diagram <ExternalLink size={13} aria-hidden="true" />
                    </a>
                    <a href={PROFILE.lineFlowUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-accent)', display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                      LINE display flow <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                </LinePhone>
              </PersonalGrid>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {zoomOpen && (
          <Lightbox
            role="dialog"
            aria-modal="true"
            aria-label="Power BI report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
          >
            <CloseButton type="button" onClick={() => setZoomOpen(false)} aria-label="Close" autoFocus>
              <X />
            </CloseButton>
            <motion.figure initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
              <img src={PROFILE.powerBiProofImage} alt="Power BI report of cross-domain reader behavior" />
              <figcaption>Power BI Report Server: reader behavior unified by Auth0 nid across Nation Group sites.</figcaption>
            </motion.figure>
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
}
