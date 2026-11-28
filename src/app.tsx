import { MotionConfig } from 'motion/react';
import { AiSystemsSection } from './components/aiSystemsSection';
import { BrandMarquee } from './components/brandMarquee';
import { CaseStudiesSection } from './components/caseStudiesSection';
import { ContactSection } from './components/contactSection';
import { ExperienceSection } from './components/experienceSection';
import { HeroSection } from './components/heroSection';
import { PlatformsSection } from './components/platformsSection';
import { SiteFooter } from './components/siteFooter';
import { SiteHeader } from './components/siteHeader';
import { SkillsSection } from './components/skillsSection';
import { WorksGallery } from './components/worksGallery';
import { useTheme } from './hooks/useTheme';
import { GlobalStyles } from './styles/globalStyles';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <GlobalStyles />
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <HeroSection />
        <BrandMarquee />
        <PlatformsSection />
        <AiSystemsSection />
        <CaseStudiesSection />
        <ExperienceSection />
        <SkillsSection />
        <WorksGallery />
        <ContactSection />
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}
