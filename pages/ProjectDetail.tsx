import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Logo, logoFor } from '../components/Logos';
import { PageFooter } from '../components/Page';
import { BrandIcon, EASE, FadeUp, Magnetic, RevealText, Tilt } from '../components/ui';
import { ProjectVisual } from '../components/Visuals';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';

type SectionId = 'overview' | 'problem' | 'approach' | 'decisions';
const SECTIONS: SectionId[] = ['overview', 'problem', 'approach', 'decisions'];

/* Highlights the section currently in view for the side table of contents. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>('overview');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace('cs-', '') as SectionId);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`cs-${s}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const w = t.work;
  const i = w.projects.findIndex((p) => p.slug === slug);
  const p = w.projects[i];
  const next = w.projects[(i + 1) % w.projects.length];
  const active = useActiveSection();

  const meta = [
    { label: w.meta.type, value: p.context ? `${w.competition}, ${p.context}` : w.personal },
    ...(p.year ? [{ label: w.meta.year, value: p.year }] : []),
    { label: w.meta.category, value: w.categories[p.category] },
  ];

  return (
    <>
      <header className="pt-32 md:pt-40">
        <FadeUp>
          <Link to="projects" className="group inline-flex items-center gap-2 text-sm font-medium text-haze transition-colors hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            {w.back}
          </Link>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-8 flex flex-wrap items-center gap-2">
          <span className="label-pill">{w.categories[p.category]}</span>
          {p.context && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1.5 text-[0.7rem] font-bold text-void">
              <Trophy className="size-3.5" />
              {p.context}
            </span>
          )}
        </FadeUp>

        <RevealText as="h1" text={p.title} delay={0.15} className="mt-6 block max-w-[20ch] text-[clamp(2.3rem,1.3rem+4vw,4.8rem)] leading-[1.04] font-bold tracking-[-0.035em]" />
        <FadeUp delay={0.45}>
          <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-haze">{p.summary}</p>
        </FadeUp>

        <FadeUp delay={0.55}>
          <dl className="glass mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-void/30 p-5">
                <dt className="text-xs font-semibold tracking-[0.14em] text-mute uppercase">{m.label}</dt>
                <dd className="mt-1.5 font-semibold text-ink">{m.value}</dd>
              </div>
            ))}
            <div className="bg-void/30 p-5">
              <dt className="text-xs font-semibold tracking-[0.14em] text-mute uppercase">{w.meta.code}</dt>
              <dd className="mt-1.5">
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:underline">
                  GitHub
                  <ArrowUpRight className="size-4" />
                </a>
              </dd>
            </div>
          </dl>
        </FadeUp>
      </header>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay: 0.65 }}
      >
        <Tilt max={3} className="spot glass rounded-[2rem] p-3">
          <div className="rounded-[1.5rem] bg-[radial-gradient(ellipse_at_top,rgb(139_92_246/0.28),transparent_70%),#0b0916] px-[8%] py-8">
            <ProjectVisual kind={p.visual} />
          </div>
        </Tilt>
      </motion.div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <ul className="space-y-1 border-l border-white/10">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => document.getElementById(`cs-${s}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className={`relative -ml-px block border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${active === s ? 'border-cyan font-semibold text-ink' : 'border-transparent text-mute hover:text-haze'}`}
                  >
                    {w.sections[s]}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs font-semibold tracking-[0.14em] text-mute uppercase">{w.meta.stack}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => {
                const l = logoFor(s);
                return (
                  <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-void/50 px-3 py-1.5 text-xs text-haze">
                    {l?.icon && <Logo {...l} className="size-3.5" />}
                    {s}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <article className="space-y-16 lg:col-span-8 lg:col-start-5">
          <FadeUp inView>
            <section id="cs-overview" className="scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{w.sections.overview}</h2>
              <p className="mt-4 text-lg leading-relaxed text-haze">{p.overview}</p>
              <ul className="mt-6 flex flex-wrap gap-2 lg:hidden">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-white/10 bg-void/50 px-3 py-1.5 text-xs text-haze">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </FadeUp>

          <FadeUp inView>
            <section id="cs-problem" className="scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{w.sections.problem}</h2>
              <blockquote className="mt-5 border-l-2 border-violet pl-5 text-lg leading-relaxed text-ink/90">{p.problem}</blockquote>
            </section>
          </FadeUp>

          <FadeUp inView>
            <section id="cs-approach" className="scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{w.sections.approach}</h2>
              <ol className="mt-6 space-y-3">
                {p.approach.map((step, k) => (
                  <li key={step} className="glass flex gap-4 rounded-2xl p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-electric text-sm font-bold">{k + 1}</span>
                    <p className="pt-1 leading-relaxed text-haze">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </FadeUp>

          <FadeUp inView>
            <section id="cs-decisions" className="scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{w.sections.decisions}</h2>
              <p className="mt-4 text-lg leading-relaxed text-haze">{p.decisions}</p>
              <div className="mt-8">
                <Magnetic>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <BrandIcon name="github" className="size-5" />
                    {w.openRepo}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Magnetic>
              </div>
            </section>
          </FadeUp>
        </article>
      </div>

      <FadeUp inView className="mt-28">
        <Link to={`work-${next.slug}`} data-cursor="Next" className="spot glass group grid items-center gap-6 overflow-hidden rounded-[2rem] p-4 sm:grid-cols-[minmax(0,1fr)_14rem] sm:p-6">
          <div className="p-2">
            <span className="text-sm text-haze">{w.nextProject}</span>
            <span className="mt-2 block text-[clamp(1.8rem,1.2rem+2.4vw,3.2rem)] leading-tight font-bold tracking-tight">{next.title}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
              {w.readCase}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="hidden overflow-hidden rounded-2xl bg-[#0b0916] p-3 sm:block">
            <div className="transition-transform duration-700 group-hover:scale-110">
              <ProjectVisual kind={next.visual} />
            </div>
          </div>
        </Link>
      </FadeUp>

      <PageFooter />
    </>
  );
}
