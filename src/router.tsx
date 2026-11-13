import { AnimatePresence, motion } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ROUTES, copy, type Route } from './content';
import { useLanguage } from './contexts/LanguageContext';

/*
  Hash routing (#about, #projects …) so every page has its own address,
  the back button works, and the site runs on any static host.
  A navigation plays: curtain rises over the old page -> page swaps -> curtain
  lifts off the new one. `ready` tells pages when to start their entrance.
*/

/** A top-level page, or a project case study (#work-<slug>). */
export type PageKey = Route | `work-${string}`;
const SLUGS = copy.en.work.projects.map((p) => p.slug);

const parse = (): PageKey => {
  const h = window.location.hash.slice(1);
  if (ROUTES.includes(h as Route)) return h as Route;
  if (h.startsWith('work-') && SLUGS.includes(h.slice(5))) return h as PageKey;
  return 'home';
};

/** The top-level section a page belongs to (case studies live under Projects). */
export const sectionOf = (k: PageKey): Route => (k.startsWith('work-') ? 'projects' : (k as Route));

type Ctx = { route: PageKey; section: Route; ready: boolean; navigate: (to: PageKey) => void };
const RouterContext = createContext<Ctx | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<PageKey>(parse);
  const [booting, setBooting] = useState(true);
  const [cover, setCover] = useState<PageKey | null>(null);
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    const onHash = () => {
      const next = parse();
      if (next !== routeRef.current) setCover(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: PageKey) => {
    if (to === routeRef.current) return;
    window.location.hash = to;
  }, []);

  const covered = () => {
    if (!cover) return;
    setRoute(cover);
    window.scrollTo(0, 0);
    // let the new page paint under the curtain before lifting it
    requestAnimationFrame(() => requestAnimationFrame(() => setCover(null)));
  };

  const ready = !booting && cover === null;

  return (
    <RouterContext.Provider value={{ route, section: sectionOf(route), ready, navigate }}>
      {children}
      <Curtain target={cover} onCovered={covered} />
      <Preloader done={!booting} onDone={() => setBooting(false)} />
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider');
  return ctx;
}

/* <Link to="about"> navigates with the transition. */
export function Link({ to, children, className, onClick, ...rest }: { to: PageKey; children: ReactNode; className?: string; onClick?: () => void } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { navigate, route } = useRouter();
  return (
    <a
      href={`#${to}`}
      aria-current={route === to ? 'page' : undefined}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

const EASE = [0.76, 0, 0.24, 1] as const;

function Curtain({ target, onCovered }: { target: PageKey | null; onCovered: () => void }) {
  const { t } = useLanguage();
  // keep the last target so the label stays put while the curtain exits
  const last = useRef<PageKey>('home');
  if (target) last.current = target;
  const key = last.current;
  const index = ROUTES.indexOf(sectionOf(key)) + 1;
  const project = key.startsWith('work-') ? t.work.projects.find((p) => `work-${p.slug}` === key) : undefined;
  const label = project ? project.short : t.pageLabel[key as Route];

  return (
    <AnimatePresence>
      {target && (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.65, ease: EASE }}
          onAnimationComplete={(def) => {
            if ((def as { clipPath?: string }).clipPath === 'inset(0% 0% 0% 0%)') onCovered();
          }}
          style={{ background: 'radial-gradient(ellipse at 30% 20%, #4c1d95 0%, #1e1b4b 35%, #06050c 75%)' }}
        >
          <div className="grid-lines pointer-events-none absolute inset-0" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan tabular-nums">
              {String(index).padStart(2, '0')} / {String(ROUTES.length).padStart(2, '0')}
            </p>
            <p className="text-gradient text-[clamp(3rem,10vw,8rem)] leading-none font-bold tracking-tight">{label}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Preloader({ done, onDone }: { done: boolean; onDone: () => void }) {
  const { t } = useLanguage();
  const [n, setN] = useState(0);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = still ? 200 : 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setN(Math.round((1 - (1 - p) ** 3) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-label={t.loading}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-void p-6 sm:p-10"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="blob blob-a left-[10%] top-[15%] h-[40vh] w-[40vh] bg-violet/40" />
          <div className="blob blob-b right-[5%] bottom-[10%] h-[45vh] w-[45vh] bg-electric/30" />
          <p className="relative text-sm font-semibold tracking-[0.3em] text-haze uppercase">{t.loading}</p>
          <div className="relative">
            <p className="text-[clamp(1.4rem,3vw,2.2rem)] font-semibold text-ink">Praja Lohphinesti Subiarto</p>
            <div className="mt-6 flex items-end justify-between gap-6">
              <div className="h-[2px] flex-1 overflow-hidden bg-white/10">
                <div className="h-full bg-gradient-to-r from-violet via-electric to-cyan" style={{ width: `${n}%` }} />
              </div>
              <p className="text-gradient text-[clamp(4rem,14vw,11rem)] leading-[0.8] font-bold tabular-nums">{n}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
