import styled from '@emotion/styled';
import { motion, type Variants } from 'motion/react';
import { noTransient } from '../styles/primitives';
import { color, font } from '../styles/theme';

interface SectionHeadingProps {
  id: string;
  /** Main part of the title (strong colour). */
  text: string;
  /** Optional trailing phrase shown in a muted tone. */
  highlight?: string;
  size?: 'md' | 'lg';
}

const Title = styled(motion.h2, noTransient)<{ $size: 'md' | 'lg' }>`
  font-family: ${font.display};
  font-size: ${({ $size }) =>
    $size === 'lg' ? 'clamp(2rem, 1.4rem + 2.4vw, 3.2rem)' : 'clamp(1.9rem, 1.3rem + 2.2vw, 3rem)'};
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

/* Each word sits in a clipping box so it can slide up from below the baseline. */
const WordMask = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
`;

const Word = styled(motion.span, noTransient)<{ $muted?: boolean }>`
  display: inline-block;
  color: ${({ $muted }) => ($muted ? color.text3 : 'inherit')};
`;

const Underline = styled(motion.span)`
  display: block;
  width: 64px;
  height: 3px;
  margin-top: 18px;
  border-radius: 3px;
  background: ${color.accent};
  transform-origin: left center;
`;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { y: '110%', rotate: 4, opacity: 0 },
  visible: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const underline: Variants = {
  hidden: { scaleX: 0 },
  // custom = word count, so the line starts drawing as the last word lands
  visible: (wordCount: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.25 + wordCount * 0.055, ease: [0.65, 0, 0.35, 1] },
  }),
};

/**
 * Section <h2> whose words rise into place one after another the first time it scrolls
 * into view, followed by a short underline that draws itself.
 * The full sentence stays in the DOM (and in aria-label), so SEO and screen readers are unaffected.
 */
export function SectionHeading({ id, text, highlight, size = 'md' }: SectionHeadingProps) {
  const words = [
    ...text.split(' ').map((w) => ({ w, muted: false })),
    ...(highlight ? highlight.split(' ').map((w) => ({ w, muted: true })) : []),
  ];
  const full = highlight ? `${text} ${highlight}` : text;

  return (
    <div>
      <Title
        id={id}
        $size={size}
        aria-label={full}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {words.map(({ w, muted }, i) => (
          <span key={`${w}-${i}`} aria-hidden="true">
            <WordMask>
              <Word variants={word} $muted={muted}>
                {w}
              </Word>
            </WordMask>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Title>
      <Underline
        aria-hidden="true"
        variants={underline}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        custom={words.length}
      />
    </div>
  );
}
