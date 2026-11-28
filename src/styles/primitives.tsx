import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { color, ease, font, gradient, mq, radius, shadow } from './theme';

/* ------------------------------------------------------------------ */
/* Keyframes                                                           */
/* ------------------------------------------------------------------ */

export const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 55%, transparent); }
  100% { box-shadow: 0 0 0 10px transparent; }
`;

export const shimmer = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  100% { transform: translateX(220%) skewX(-18deg); }
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const dashFlow = keyframes`
  to { stroke-dashoffset: -32; }
`;

export const blobDrift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  33% { transform: translate3d(4%, -6%, 0) scale(1.08); }
  66% { transform: translate3d(-5%, 4%, 0) scale(0.95); }
`;

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin-inline: auto;
  padding-inline: 20px;

  ${mq.md} {
    padding-inline: 32px;
  }
`;

export const Section = styled.section<{ $tone?: 'base' | 'elevated' }>`
  position: relative;
  padding-block: 88px;
  background: ${({ $tone }) => ($tone === 'elevated' ? color.bgElev : 'transparent')};
  border-top: 1px solid ${color.line};

  ${mq.lg} {
    padding-block: 120px;
  }
`;

export const SectionHeader = styled.header`
  display: grid;
  gap: 14px;
  max-width: 760px;
  margin-bottom: 48px;
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${font.mono};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.accent};

  &::before {
    content: '';
    width: 22px;
    height: 2px;
    border-radius: 2px;
    background: ${gradient.brand};
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 1.3rem + 2.2vw, 3rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

export const SectionLead = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: ${color.text2};
  max-width: 64ch;
`;

export const GradientText = styled.span`
  background: ${gradient.brand};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientShift} 8s ease infinite;
`;

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export const Card = styled.div<{ $interactive?: boolean }>`
  position: relative;
  background: ${color.bgElev};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.sm};
  transition: transform 0.35s ${ease.out}, box-shadow 0.35s ${ease.out}, border-color 0.35s ${ease.out};

  ${({ $interactive }) =>
    $interactive &&
    css`
      &:hover {
        transform: translateY(-4px);
        border-color: color-mix(in srgb, ${color.accent} 45%, ${color.line});
        box-shadow: ${shadow.glow};
      }
    `}
`;

type ChipTone = 'neutral' | 'accent' | 'success' | 'warning';

const chipColor: Record<Exclude<ChipTone, 'neutral'>, string> = {
  accent: color.accent,
  success: color.success,
  warning: color.warning,
};

export const Chip = styled.span<{ $tone?: ChipTone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  font-family: ${font.mono};
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.3;
  border-radius: ${radius.pill};
  white-space: nowrap;
  border: 1px solid
    ${({ $tone = 'neutral' }) =>
      $tone === 'neutral' ? color.line : `color-mix(in srgb, ${chipColor[$tone]} 35%, transparent)`};
  color: ${({ $tone = 'neutral' }) => ($tone === 'neutral' ? color.text2 : chipColor[$tone])};
  background: ${({ $tone = 'neutral' }) =>
    $tone === 'neutral' ? color.bgSoft : `color-mix(in srgb, ${chipColor[$tone]} 9%, transparent)`};

  svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }
`;

export const LiveDot = styled.span<{ $color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  color: ${({ $color }) => $color ?? color.success};
  background: currentColor;
  animation: ${pulseRing} 1.8s ease-out infinite;
`;

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonVariants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    color: ${color.onAccent};
    background: ${color.accent};
    box-shadow: 0 12px 30px -12px ${color.glow};

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 40px -14px ${color.glow};
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0 auto 0 0;
      width: 40%;
      background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--c-on-accent) 35%, transparent), transparent);
      transform: translateX(-120%) skewX(-18deg);
    }

    &:hover::after {
      animation: ${shimmer} 0.9s ${ease.out};
    }
  `,
  secondary: css`
    color: ${color.text};
    background: ${color.bgElev};
    border: 1px solid ${color.lineStrong};

    &:hover {
      border-color: ${color.accent};
      color: ${color.accent};
    }
  `,
  ghost: css`
    color: ${color.text2};
    padding-inline: 12px;

    &:hover {
      color: ${color.accent};
      background: ${color.bgSoft};
    }
  `,
};

export const buttonBase = css`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 20px;
  font-family: ${font.display};
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: -0.005em;
  white-space: nowrap;
  border-radius: ${radius.md};
  transition: transform 0.25s ${ease.out}, box-shadow 0.25s ${ease.out}, background-position 0.6s ${ease.out},
    border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;

  &:active {
    transform: translateY(1px) scale(0.99);
  }

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
`;

export const ButtonLink = styled.a<{ $variant?: ButtonVariant }>`
  ${buttonBase};
  ${({ $variant = 'primary' }) => buttonVariants[$variant]};
`;

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  ${buttonBase};
  ${({ $variant = 'primary' }) => buttonVariants[$variant]};
`;

export const IconButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${radius.md};
  color: ${color.text2};
  border: 1px solid ${color.line};
  background: ${color.bgElev};
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.25s ${ease.out};

  &:hover {
    color: ${color.accent};
    border-color: ${color.accent};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

/* ------------------------------------------------------------------ */
/* Segmented tabs                                                      */
/* ------------------------------------------------------------------ */

export const SegmentedGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
  border-radius: ${radius.md};
  background: ${color.bgSoft};
  border: 1px solid ${color.line};
`;

export const SegmentedButton = styled.button<{ $active?: boolean }>`
  position: relative;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 9px;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? color.text : color.text3)};
  transition: color 0.2s ease;
  z-index: 0;

  &:hover {
    color: ${color.text};
  }
`;

export const segmentedPill = css`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 9px;
  background: ${color.bgElev};
  box-shadow: ${shadow.sm};
  border: 1px solid ${color.line};
`;

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export const MonoLabel = styled.span`
  font-family: ${font.mono};
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: ${color.text3};
`;

export const LogoTile = styled.span<{ $size?: number }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: ${({ $size = 40 }) => $size}px;
  height: ${({ $size = 40 }) => $size}px;
  border-radius: ${radius.md};
  background: #fff;
  border: 1px solid ${color.line};
  overflow: hidden;

  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
  }
`;

/** Use with styled(motion.x, noTransient) so `$props` never reach the DOM. */
export const noTransient = { shouldForwardProp: (prop: string) => !prop.startsWith('$') };

/** Dark logos on transparent backgrounds become white silhouettes in dark mode (add class "invertOnDark"). */
export const invertLogoOnDark = css`
  html[data-theme='dark'] & img.invertOnDark {
    filter: brightness(0) invert(1);
  }
`;
