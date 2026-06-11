import { BackgroundElements } from './components/BackgroundElements';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { AboutAndEducation } from './components/AboutAndEducation';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { LanguageProvider } from './contexts/LanguageContext';
import { ScrollReveal } from './components/ScrollReveal';

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative bg-[#050505] min-h-screen text-[#ededed] font-sans selection:bg-purple-500/30 selection:text-white overflow-hidden">
        {/* 
          Custom Cursor is disabled on mobile entirely using constraints inside the component. 
          It enhances the 'luxury' feel on desktop.
        */}
        <CustomCursor />
        
        <BackgroundElements />
        <Navbar />
        
        <main className="relative z-10 flex flex-col gap-12 pb-12">
          <Hero />
          <ScrollReveal>
            <Stats />
          </ScrollReveal>
          <ScrollReveal>
            <AboutAndEducation />
          </ScrollReveal>
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
      </div>
    </LanguageProvider>
  );
}
