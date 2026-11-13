import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { Background } from './components/Background';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { PageShell } from './components/Page';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import type { Route } from './content';
import { RouterProvider, useRouter } from './router';

const PAGES = { home: Home, about: About, projects: Projects, skills: Skills, contact: Contact };

function Site() {
  const { route } = useRouter();
  const { t } = useLanguage();
  const slug = route.startsWith('work-') ? route.slice(5) : null;
  const Page = slug ? null : PAGES[route as Route];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const project = slug ? t.work.projects.find((p) => p.slug === slug) : null;
    const name = project ? project.title : t.pageLabel[route as Route];
    document.title = route === 'home' ? 'Praja Lohphinesti Subiarto · Data Science Portfolio' : `${name} · Praja Lohphinesti Subiarto`;
  }, [route, slug, t]);

  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-void">
        {t.skip}
      </a>
      <Background />
      <Nav />
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet via-electric to-cyan" style={{ scaleX: progress }} />
      <PageShell>{slug ? <ProjectDetail slug={slug} /> : Page && <Page />}</PageShell>
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <RouterProvider>
          <Site />
        </RouterProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
