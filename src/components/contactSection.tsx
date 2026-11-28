import styled from '@emotion/styled';
import { Check, Copy, FileDown, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { blobDrift, ButtonLink, Container, Eyebrow, LiveDot } from '../styles/primitives';
import { color, font, mq, radius } from '../styles/theme';
import { Reveal } from './reveal';
import { SectionHeading } from './sectionHeading';

const Wrap = styled.section`
  position: relative;
  padding: 96px 0;
  border-top: 1px solid ${color.line};
  overflow: hidden;

  ${mq.lg} {
    padding: 128px 0;
  }
`;

const Panel = styled.div`
  position: relative;
  display: grid;
  gap: 32px;
  padding: 32px 24px;
  border-radius: ${radius.xl};
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  overflow: hidden;
  isolation: isolate;

  ${mq.md} {
    padding: 48px;
  }
  ${mq.lg} {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: 48px;
    padding: 56px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.1;
    animation: ${blobDrift} 16s ease-in-out infinite;
  }
  &::before {
    top: -140px;
    left: -100px;
    background: var(--c-accent);
  }
  &::after {
    bottom: -160px;
    right: -80px;
    background: var(--c-violet);
    animation-delay: -8s;
  }
`;

const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Rows = styled.ul`
  display: grid;
  gap: 10px;
  align-content: center;
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: ${radius.md};
  background: ${color.bg};
  border: 1px solid ${color.line};

  > span:first-of-type {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    color: ${color.accent};
    background: ${color.accentSoft};
  }
  small {
    display: block;
    font-family: ${font.mono};
    font-size: 11px;
    color: ${color.text3};
  }
  a,
  p {
    font-weight: 600;
    word-break: break-all;
  }
  a:hover {
    color: ${color.accent};
  }
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid ${color.line};
  background: ${color.bgElev};

  &:hover {
    border-color: ${color.accent};
    color: ${color.accent};
  }
  svg {
    width: 14px;
    height: 14px;
  }
`;

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <Wrap id="contact" aria-labelledby="contactTitle">
      <Container>
        <Reveal>
          <Panel>
            <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
              <Eyebrow>07 · Contact</Eyebrow>
              <SectionHeading id="contactTitle" text="Hiring for Frontend AI or Full-Stack AI?" highlight="Let’s talk." size="lg" />
              <p style={{ color: 'var(--c-text-2)', fontSize: 17, maxWidth: '52ch' }}>
                I’m happy to walk through these systems in a technical interview: the Next.js architecture, the LLM
                workflows, and how they hold up under real traffic.
              </p>
              <p style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 14 }}>
                <LiveDot /> {PROFILE.openTo}
              </p>
              <Ctas>
                <ButtonLink href={PROFILE.resumePdfUrl} download={PROFILE.resumeFileName} $variant="primary">
                  <FileDown aria-hidden="true" /> Download Resume (PDF)
                </ButtonLink>
                <ButtonLink href={`mailto:${PROFILE.email}`} $variant="secondary">
                  <Mail aria-hidden="true" /> Email me
                </ButtonLink>
              </Ctas>
            </div>

            <Rows>
              <Row>
                <span><Mail size={18} aria-hidden="true" /></span>
                <div>
                  <small>Email</small>
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </div>
                <CopyButton type="button" onClick={() => copy('email', PROFILE.email)} aria-label="Copy email address">
                  {copied === 'email' ? <Check /> : <Copy />} {copied === 'email' ? 'Copied' : 'Copy'}
                </CopyButton>
              </Row>
              <Row>
                <span><Phone size={18} aria-hidden="true" /></span>
                <div>
                  <small>Phone</small>
                  <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}>{PROFILE.phone}</a>
                </div>
                <CopyButton type="button" onClick={() => copy('phone', PROFILE.phone)} aria-label="Copy phone number">
                  {copied === 'phone' ? <Check /> : <Copy />} {copied === 'phone' ? 'Copied' : 'Copy'}
                </CopyButton>
              </Row>
              <Row>
                <span><Linkedin size={18} aria-hidden="true" /></span>
                <div>
                  <small>LinkedIn</small>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                    in/voranitha-changduong
                  </a>
                </div>
                <span />
              </Row>
              <Row>
                <span><Github size={18} aria-hidden="true" /></span>
                <div>
                  <small>GitHub</small>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                    github.com/voranitha-dev
                  </a>
                </div>
                <span />
              </Row>
              <Row>
                <span><MapPin size={18} aria-hidden="true" /></span>
                <div>
                  <small>Location</small>
                  <p>{PROFILE.location} · Greater Bangkok</p>
                </div>
                <span />
              </Row>
            </Rows>
          </Panel>
        </Reveal>
      </Container>
    </Wrap>
  );
}
