import { ArrowRight, ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { ROUTES, profile, type Route } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';
import { BrandIcon, FadeUp, RevealText } from './ui';

/* Common header for inner pages: page number, label pill, big title, intro. */
export function PageHeader({ route, label, title, intro }: { route: Route; label: string; title: string; intro?: string }) {
  const n = ROUTES.indexOf(route) + 1;
  return (
    <header className="pt-36 pb-14 md:pt-44 md:pb-20">
      <FadeUp>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-cyan tabular-nums">0{n}</span>
          <span className="h-px w-10 bg-white/25" />
          <span className="label-pill">{label}</span>
        </div>
      </FadeUp>
      <RevealText as="h1" text={title} delay={0.1} className="mt-7 block max-w-[18ch] text-[clamp(2.5rem,1.4rem+4.6vw,5.6rem)] leading-[1.02] font-bold tracking-[-0.035em]" />
      {intro && (
        <FadeUp delay={0.45}>
          <p className="mt-7 max-w-[38rem] text-lg leading-relaxed text-haze">{intro}</p>
        </FadeUp>
      )}
    </header>
  );
}

/* Big link to the following page, so the site reads like a sequence. */
export function NextPage({ from }: { from: Route }) {
  const { t } = useLanguage();
  const i = ROUTES.indexOf(from);
  const next = ROUTES[(i + 1) % ROUTES.length];
  return (
    <FadeUp inView className="mt-28 md:mt-36">
      <Link to={next} data-cursor={t.next.split(' ')[0]} className="group block border-t border-white/10 py-12 md:py-16">
        <span className="text-sm text-haze">{t.next}</span>
        <span className="mt-3 flex items-center justify-between gap-6">
          <span className="text-[clamp(2.6rem,1.5rem+5vw,6.5rem)] leading-none font-bold tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-transparent group-hover:[background:linear-gradient(100deg,#fff,#a78bfa,#22d3ee)] group-hover:[-webkit-background-clip:text] group-hover:[background-clip:text]">
            {t.pageLabel[next]}
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-violet group-hover:to-electric md:size-24">
            <ArrowRight className="size-7 md:size-9" />
          </span>
        </span>
      </Link>
    </FadeUp>
  );
}

export function PageFooter() {
  const { t } = useLanguage();
  const socials = [
    { name: 'LinkedIn', icon: 'linkedin' as const, href: profile.links.linkedin },
    { name: 'GitHub', icon: 'github' as const, href: profile.links.github },
    { name: 'Instagram', icon: 'instagram' as const, href: profile.links.instagram },
  ];
  return (
    <footer className="mt-24 border-t border-white/10 pt-14 pb-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-violet via-electric to-cyan text-xs font-extrabold text-white">{profile.initials}</span>
            <p className="text-lg font-bold">{profile.fullName}</p>
          </div>
          <p className="mt-4 max-w-[26rem] text-haze">{t.footer.tagline}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-11 place-items-center rounded-full border border-white/10 text-haze transition-all hover:-translate-y-1 hover:border-violet hover:text-ink">
                  <BrandIcon name={s.icon} className="size-[18px]" />
                </a>
              </li>
            ))}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full border border-white/10 text-haze transition-all hover:-translate-y-1 hover:border-violet hover:text-ink">
                  <Mail className="size-[18px]" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <nav aria-label={t.footer.pages} className="md:col-span-3">
          <p className="text-sm font-semibold text-ink">{t.footer.pages}</p>
          <ul className="mt-4 space-y-2.5">
            {ROUTES.map((r) => (
              <li key={r}>
                <Link to={r} className="text-haze transition-colors hover:text-cyan">{t.nav[r]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="text-sm font-semibold text-ink">{t.footer.connect}</p>
          <ul className="mt-4 space-y-2.5">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-haze transition-colors hover:text-cyan">
                  {s.name}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.fullName}. {t.contact.footer}.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-haze transition-colors hover:border-cyan hover:text-ink">
          <ArrowUp className="size-4" />
          {t.footer.top}
        </button>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { route } = useRouter();
  return (
    <main id="main" tabIndex={-1} key={route} className="mx-auto max-w-6xl px-5 outline-none sm:px-8">
      {children}
    </main>
  );
}
