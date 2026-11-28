import styled from '@emotion/styled';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { TRUEHITS } from '../data/truehits';
import { Container } from '../styles/primitives';
import { color, font, mq } from '../styles/theme';

const Footer = styled.footer`
  border-top: 1px solid ${color.line};
  padding: 28px 0;
  font-size: 13px;
  color: ${color.text3};
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;

  ${mq.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
  }
  a:hover {
    color: ${color.accent};
  }
  code {
    font-family: ${font.mono};
    font-size: 11.5px;
  }
`;

export function SiteFooter() {
  const updated = TRUEHITS.updatedAt ? new Date(TRUEHITS.updatedAt).toISOString().slice(0, 10) : null;
  return (
    <Footer>
      <Inner>
        <div>
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · Built with React, TypeScript & Emotion
          </p>
          {updated && <code>Truehits data synced {updated}</code>}
        </div>
        <nav aria-label="Footer">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.resumePdfUrl} download={PROFILE.resumeFileName}>Resume PDF</a>
          <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </nav>
      </Inner>
    </Footer>
  );
}
