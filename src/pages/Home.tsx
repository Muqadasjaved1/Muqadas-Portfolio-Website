import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { EducationSection } from '@/sections/EducationSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { QuoteSection } from '@/sections/QuoteSection';
import { Footer } from '@/Components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <QuoteSection />
      <Footer />
    </main>
  );
}

