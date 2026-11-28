import { css, Global } from '@emotion/react';
import { color, font, mq, palettes } from './theme';

const toCssVars = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');

const globalCss = css`
  :root {
    ${toCssVars(palettes.light)}
    color-scheme: light;
  }

  :root[data-theme='dark'] {
    ${toCssVars(palettes.dark)}
    color-scheme: dark;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: ${font.body};
    font-size: 16px;
    line-height: 1.65;
    color: ${color.text};
    background: ${color.bg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: background-color 0.35s ease, color 0.35s ease;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family: ${font.display};
    color: ${color.text};
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  p {
    margin: 0;
    text-wrap: pretty;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img,
  svg,
  video {
    display: block;
    max-width: 100%;
  }

  img {
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  :focus-visible {
    outline: 2px solid ${color.accent};
    outline-offset: 3px;
    border-radius: 6px;
  }

  ::selection {
    background: color-mix(in srgb, ${color.accent} 22%, transparent);
    color: ${color.text};
  }

  section[id],
  [data-anchor] {
    scroll-margin-top: 84px;
  }

  .visuallyHidden {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skipLink {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 100;
    padding: 10px 16px;
    font-weight: 700;
    color: ${color.onAccent};
    background: ${color.accent};
    border-radius: 10px;
    transform: translateY(-160%);
    transition: transform 0.2s ease;
  }

  .skipLink:focus {
    transform: translateY(0);
  }

  ${mq.reducedMotion} {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalCss} />;
