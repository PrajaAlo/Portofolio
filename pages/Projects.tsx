import { ArrowUpRight, Trophy } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';
import { NextPage, PageFooter, PageHeader } from '../components/Page';
import { EASE, FadeUp, Magnetic, Tilt, BrandIcon } from '../components/ui';
import { ProjectVisual } from '../components/Visuals';
import { profile, type Category } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';

export function Projects() {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const w = t.work;
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const cats = ['all', ...Array.from(new Set(w.projects.map((p) => p.category)))] as (Category | 'all')[];
  const shown = w.projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <PageHeader route="projects" label={w.label} title={w.title} intro={w.intro} />

      <FadeUp delay={0.55}>
        <LayoutGroup id="filters">
          <div role="group" aria-label="Filter" className="glass inline-flex max-w-full flex-wrap gap-1 rounded-3xl p-1.5 sm:rounded-full">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c ? 'text-white' : 'text-haze hover:text-white'}`}
              >
                {filter === c && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-electric" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{c === 'all' ? w.all : w.categories[c]}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </FadeUp>

      <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.repo}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.8, ease: EASE, delay: ready ? 0.6 + i * 0.08 : 0 }}
              className={filter !== 'all' ? 'lg:col-span-3' : i < 2 ? 'lg:col-span-3' : `lg:col-span-2 ${i === shown.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <Tilt max={5} className="spot glass group h-full rounded-[1.75rem]">
                <div data-cursor={w.readCase.split(' ')[0]} className="relative flex h-full flex-col p-3">
                  <div className="relative overflow-hidden rounded-[1.25rem] bg-[radial-gradient(ellipse_at_top,rgb(139_92_246/0.22),transparent_70%),#0b0916] p-4">
                    <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                      <ProjectVisual kind={p.visual} />
                    </div>
                    {p.context && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-amber px-2.5 py-1 text-[0.68rem] font-bold text-void">
                        <Trophy className="size-3.5" />
                        {p.context}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                    <p className="text-xs font-semibold tracking-[0.14em] text-cyan uppercase">{w.categories[p.category]}</p>
                    <h2 className="mt-2 text-xl leading-snug font-bold text-ink md:text-[1.4rem]">
                      <Link to={`work-${p.slug}`} className="after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-haze">{p.summary}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                      <ul className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <li key={s} className="rounded-full border border-white/10 bg-void/50 px-2.5 py-1 text-xs text-haze">
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="GitHub"
                        className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:border-transparent hover:bg-white hover:text-void"
                      >
                        <BrandIcon name="github" className="size-5" />
                        <span className="sr-only">{w.openRepo}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <FadeUp inView className="mt-12 flex justify-center">
        <Magnetic>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <BrandIcon name="github" className="size-5" />
            {w.allRepos}
            <ArrowUpRight className="size-4" />
          </a>
        </Magnetic>
      </FadeUp>

      <NextPage from="projects" />
      <PageFooter />
    </>
  );
}
