import styled from '@emotion/styled';
import { motion, useInView } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { LATEST_MONTH, MONTHLY_BRAND_ENTRIES, MONTHLY_NETWORK } from '../data/truehits';
import { useCountUp } from '../hooks/useCountUp';
import { formatCompact, formatNumber } from '../utils/format';
import { invertLogoOnDark, LogoTile, MonoLabel, spin } from '../styles/primitives';
import { color, font, radius, shadow } from '../styles/theme';

/*
 * Hero card: the latest full month from Truehits (monthly reports are final numbers,
 * unlike the daily ranking, which swings day to day).
 */

const Shell = styled.div`
  position: relative;
  border-radius: ${radius.xl};
  padding: 1px;
  background: linear-gradient(140deg, color-mix(in srgb, var(--c-accent) 60%, transparent), ${color.line} 40%, color-mix(in srgb, var(--c-violet) 55%, transparent));
  box-shadow: ${shadow.lg};
  overflow: hidden;

  /* rotating highlight running around the border */
  &::before {
    content: '';
    position: absolute;
    inset: -60%;
    background: conic-gradient(from 0deg, transparent 0 75%, var(--c-cyan) 85%, transparent 95%);
    animation: ${spin} 7s linear infinite;
    opacity: 0.7;
  }
`;

const Body = styled.div`
  position: relative;
  display: grid;
  gap: 20px;
  padding: 22px;
  border-radius: calc(${radius.xl} - 1px);
  background: ${color.bgElev};

  @media (min-width: 640px) {
    padding: 26px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  color: ${color.onAccent};
  background: ${color.accent};
`;

const Big = styled.div`
  display: grid;
  gap: 6px;
`;

const BigRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 14px;
`;

const BigNumber = styled.p`
  font-family: ${font.display};
  font-size: clamp(2.4rem, 2rem + 2vw, 3.3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
`;

const Delta = styled.span<{ $up: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-family: ${font.mono};
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ $up }) => ($up ? color.success : color.danger)};
`;

const BigLabel = styled.p`
  font-size: 13.5px;
  color: ${color.text2};
`;

const Bars = styled.ol`
  display: grid;
  gap: 10px;
`;

const BarRow = styled.li`
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;

  ${invertLogoOnDark};
`;

const BarMeta = styled.div`
  display: grid;
  gap: 5px;
  min-width: 0;
`;

const BarName = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;

  span:last-of-type {
    font-family: ${font.mono};
    font-weight: 500;
    color: ${color.text3};
    font-variant-numeric: tabular-nums;
  }
`;

const Track = styled.span`
  position: relative;
  height: 7px;
  border-radius: 99px;
  background: ${color.bgSoft};
  overflow: hidden;
`;

const Fill = styled(motion.span)`
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
`;

const RankBadge = styled.span<{ $top: boolean }>`
  min-width: 52px;
  padding: 4px 8px;
  font-family: ${font.mono};
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  border-radius: 7px;
  color: ${({ $top }) => ($top ? color.onAccent : color.text3)};
  background: ${({ $top }) => ($top ? color.accent : color.bgSoft)};
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px dashed ${color.line};
  font-size: 12.5px;
  color: ${color.text2};

  b {
    color: ${color.text};
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
    color: ${color.text};
  }
  a:hover {
    text-decoration: underline;
  }
`;

export function NetworkPulseCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const total = useCountUp(MONTHLY_NETWORK.pageviews, inView, 1800);

  if (!LATEST_MONTH) return null;

  const topBrands = MONTHLY_BRAND_ENTRIES.slice(0, 6);
  const max = topBrands[0]?.pageviews ?? 1;
  const delta = MONTHLY_NETWORK.changePct;

  return (
    <Shell ref={ref}>
      <Body>
        <Top>
          <Tag>Monthly traffic</Tag>
          <MonoLabel>Truehits · {LATEST_MONTH.monthLabel}</MonoLabel>
        </Top>

        <Big>
          <BigRow>
            <BigNumber aria-label={`${formatNumber(MONTHLY_NETWORK.pageviews)} pageviews`}>{formatNumber(total)}</BigNumber>
            {delta !== null && (
              <Delta $up={delta >= 0} title={`vs. ${MONTHLY_NETWORK.previousLabel}`}>
                {delta >= 0 ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                {Math.abs(delta).toFixed(1)}% vs {MONTHLY_NETWORK.previousShortLabel}
              </Delta>
            )}
          </BigRow>
          <BigLabel>
            pageviews in {LATEST_MONTH.monthLabel} across the {MONTHLY_BRAND_ENTRIES.length} Nation Group sites I lead
          </BigLabel>
        </Big>

        <Bars aria-label={`Top sites by pageviews, ${LATEST_MONTH.monthLabel}`}>
          {topBrands.map(({ brand, pageviews, rank }, index) => (
            <BarRow key={brand.id}>
              <LogoTile $size={30}>
                <img
                  src={brand.logo}
                  alt=""
                  width="22"
                  height="22"
                  loading="lazy"
                  className={brand.invertLogoOnDark ? 'invertOnDark' : undefined}
                />
              </LogoTile>
              <BarMeta>
                <BarName>
                  <span>{brand.name}</span>
                  <span>{formatCompact(pageviews)}</span>
                </BarName>
                <Track>
                  <Fill
                    style={{ background: brand.themeColor }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(pageviews / max) * 100}%` } : undefined}
                    transition={{ duration: 1.1, delay: 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Track>
              </BarMeta>
              <RankBadge $top={rank > 0 && rank <= 20} title={`Thailand rank in ${LATEST_MONTH.monthLabel} (Truehits)`}>
                #{rank} TH
              </RankBadge>
            </BarRow>
          ))}
        </Bars>

        <Foot>
          <span>
            <b>{MONTHLY_NETWORK.top25Count}</b> sites in Thailand’s top 25 this month
          </span>
          <a href={LATEST_MONTH.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </Foot>
      </Body>
    </Shell>
  );
}
