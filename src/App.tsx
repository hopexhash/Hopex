import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  return (
    <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
      <FooterSection />
    </div>
  );
}
