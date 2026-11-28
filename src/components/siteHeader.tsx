import styled from '@emotion/styled';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { FileDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';
import type { ThemeMode } from '../hooks/useTheme';
import { ButtonLink, Container, IconButton } from '../styles/primitives';
import { color, ease, font, gradient, mq, radius } from '../styles/theme';

export const NAV_ITEMS = [
  { id: 'platforms', label: 'Platforms' },
  { id: 'ai-systems', label: 'AI Systems' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

const Bar = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ $scrolled }) =>
    $scrolled ? `color-mix(in srgb, ${color.bg} 82%, transparent)` : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(160%) blur(14px)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? color.line : 'transparent')};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 68px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${font.display};
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

const Monogram = styled.span`
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: ${color.onAccent};
  font-size: 13px;
  letter-spacing: 0;
  background: ${color.accent};
  box-shadow: 0 8px 20px -8px ${color.glow};
`;

const BrandText = styled.span`
  display: none;
  ${mq.sm} {
    display: inline;
  }
`;

const Nav = styled.nav`
  display: none;
  ${mq.lg} {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  position: relative;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${radius.sm};
  color: ${({ $active }) => ($active ? color.text : color.text3)};
  transition: color 0.2s ease;

  &:hover {
    color: ${color.text};
  }
`;

const ActiveUnderline = styled(motion.span)`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: ${gradient.brand};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResumeButton = styled(ButtonLink)`
  min-height: 40px;
  padding: 0 14px;
  font-size: 13.5px;
`;

const MenuButton = styled(IconButton)`
  ${mq.lg} {
    display: none;
  }
`;

const Progress = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  transform-origin: 0% 50%;
  background: ${gradient.brand};
`;

const Drawer = styled(motion.div)`
  overflow: hidden;
  border-top: 1px solid ${color.line};
  background: ${color.bgElev};

  ${mq.lg} {
    display: none;
  }
`;

const DrawerNav = styled.nav`
  display: grid;
  gap: 2px;
  padding: 12px 0 18px;

  a {
    padding: 12px 4px;
    font-weight: 600;
    border-bottom: 1px solid ${color.line};
    transition: color 0.2s ${ease.out}, padding 0.2s ${ease.out};
  }
  a:hover {
    color: ${color.accent};
    padding-left: 10px;
  }
`;

interface SiteHeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Bar $scrolled={scrolled || menuOpen}>
      <Inner>
        <Brand href="#top" aria-label={`${PROFILE.name}, back to top`}>
          <Monogram aria-hidden="true">VC</Monogram>
          <BrandText>{PROFILE.name}</BrandText>
        </Brand>

        <Nav aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} href={`#${item.id}`} $active={active === item.id}>
              {item.label}
              {active === item.id && <ActiveUnderline layoutId="navUnderline" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            </NavLink>
          ))}
        </Nav>

        <Actions>
          <IconButton
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid' }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </motion.span>
            </AnimatePresence>
          </IconButton>
          <ResumeButton href={PROFILE.resumePdfUrl} download={PROFILE.resumeFileName} $variant="primary">
            <FileDown aria-hidden="true" />
            <span>Resume</span>
          </ResumeButton>
          <MenuButton
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </MenuButton>
        </Actions>
      </Inner>

      <Progress style={{ scaleX: progress }} aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <Drawer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container>
              <DrawerNav aria-label="Mobile">
                {NAV_ITEMS.map((item) => (
                  <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </DrawerNav>
            </Container>
          </Drawer>
        )}
      </AnimatePresence>
    </Bar>
  );
}
