import styled from '@emotion/styled';
import { NATION_BRAND_PLATFORMS } from '../data/portfolioData';
import { invertLogoOnDark, marquee } from '../styles/primitives';
import { color } from '../styles/theme';

const Strip = styled.div`
  position: relative;
  overflow: hidden;
  padding: 18px 0;
  border-top: 1px solid ${color.line};
  background: ${color.bgElev};
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &:hover > div {
    animation-play-state: paused;
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 40s linear infinite;
`;

/* Bare logo, no frame. Every logo gets the same height (square logos end up square);
   spacing uses margin (not flex gap) so the -50% loop stays seamless. */
const LOGO_HEIGHT = 48;

const Item = styled.a`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 44px;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.04);
  }

  ${invertLogoOnDark};

  img {
    height: ${LOGO_HEIGHT}px;
    width: auto;
    max-width: ${LOGO_HEIGHT * 3}px;
    object-fit: contain;
    border-radius: 10px;
  }
`;

/** Infinite logo strip of the live sites (duplicated once for a seamless loop). */
export function BrandMarquee() {
  const items = [...NATION_BRAND_PLATFORMS, ...NATION_BRAND_PLATFORMS];
  return (
    <Strip aria-label="Nation Group news sites">
      <Track>
        {items.map((brand, i) => (
          <Item
            key={`${brand.id}-${i}`}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={brand.name}
            title={brand.name}
            aria-hidden={i >= NATION_BRAND_PLATFORMS.length ? true : undefined}
            tabIndex={i >= NATION_BRAND_PLATFORMS.length ? -1 : undefined}
          >
            <img
              src={brand.logo}
              alt=""
              height={LOGO_HEIGHT}
              loading="lazy"
              className={brand.invertLogoOnDark ? 'invertOnDark' : undefined}
            />
          </Item>
        ))}
      </Track>
    </Strip>
  );
}
