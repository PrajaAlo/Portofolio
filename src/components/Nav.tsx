import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ROUTES, profile } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';
import { EASE } from './ui';

export function Nav() {
  const { t, toggle } = useLanguage();
  const { section: route, ready } = useRouter();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      initial={{ y: -90, opacity: 0 }}
      animate={ready || open ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
    >
      <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5">
        <Link to="home" className="flex items-center gap-2 font-bold tracking-tight" aria-label={profile.fullName}>
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet via-electric to-cyan text-[0.7rem] font-extrabold text-white">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.firstName}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1" onPointerLeave={() => setHover(null)}>
            {ROUTES.map((r) => (
              <li key={r} className="relative" onPointerEnter={() => setHover(r)}>
                {(hover ?? route) === r && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${route === r ? 'bg-gradient-to-r from-electric to-violet shadow-[0_0_24px_-4px_rgb(59_130_246/0.8)]' : 'bg-white/10'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Link
                  to={r}
                  className={`relative block rounded-full px-4 py-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition-colors ${route === r ? 'text-white' : 'text-haze hover:text-white'}`}
                >
                  {t.nav[r]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.langSwitch === 'ID' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
            className="grid size-10 place-items-center rounded-full border border-white/15 text-xs font-bold text-ink transition-colors hover:border-cyan hover:text-cyan"
          >
            {t.langSwitch}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full bg-white text-void md:hidden"
          >
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span aria-hidden="true" className="relative block h-3 w-4">
              <motion.span className="absolute left-0 h-0.5 w-4 rounded bg-void" animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }} />
              <motion.span className="absolute left-0 h-0.5 w-4 rounded bg-void" animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {ROUTES.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                  className="border-b border-white/10"
                >
                  <Link to={r} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                    <span className="text-xs font-semibold text-cyan tabular-nums">0{i + 1}</span>
                    <span className={`text-4xl font-bold tracking-tight ${route === r ? 'text-gradient' : 'text-ink'}`}>{t.nav[r]}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
