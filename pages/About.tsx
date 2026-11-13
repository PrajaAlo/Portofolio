import { ArrowUpRight, GitFork, GraduationCap, MapPin, Star, Users } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '../components/Logos';
import { NextPage, PageFooter, PageHeader } from '../components/Page';
import { BrandIcon, CountUp, EASE, FadeUp, Tilt, spotlight } from '../components/ui';
import { profile, stackLogos } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../router';

function Timeline() {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const ref = useRef<HTMLOListElement>(null);
  const seen = useInView(ref, { once: true, margin: '-100px' });
  const show = ready && seen;

  return (
    <ol ref={ref} className="relative ml-2 space-y-10 pl-10">
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-cyan via-violet to-transparent"
        initial={{ scaleY: 0 }}
        animate={show ? { scaleY: 1 } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      />
      {t.about.timeline.map((item, i) => (
        <motion.li
          key={item.title}
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={show ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.15 }}
        >
          <span aria-hidden="true" className="absolute top-1.5 -left-[2.85rem] grid size-4 place-items-center rounded-full bg-void ring-2 ring-violet">
            <span className="size-1.5 rounded-full bg-cyan" />
          </span>
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan">{item.year}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{item.title}</p>
          <p className="mt-1 text-haze">{item.detail}</p>
          {item.skills && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {item.skills.map((sk) => (
                <li key={sk} className="rounded-full bg-violet/15 px-2.5 py-1 text-xs font-medium text-violet-200">
                  {sk}
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

type GH = { repos: number; followers: number; stars: number };

/* Live numbers from the GitHub API, with a calm fallback when it can't be reached. */
function GitHubSection() {
  const { t } = useLanguage();
  const a = t.about;
  const [data, setData] = useState<GH | 'error' | null>(null);
  const [chart, setChart] = useState(true);

  useEffect(() => {
    const user = profile.githubUser;
    Promise.all([
      fetch(`https://api.github.com/users/${user}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100`).then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([u, repos]: [{ public_repos: number; followers: number }, { stargazers_count: number }[]]) =>
        setData({ repos: u.public_repos, followers: u.followers, stars: repos.reduce((n, r) => n + r.stargazers_count, 0) }),
      )
      .catch(() => setData('error'));
  }, []);

  const stats = data && data !== 'error'
    ? [
        { icon: GitFork, label: a.githubStats.repos, value: data.repos },
        { icon: Users, label: a.githubStats.followers, value: data.followers },
        { icon: Star, label: a.githubStats.stars, value: data.stars },
      ].filter((st) => st.value > 0) // a zero reads as a weakness, so only show what has grown
    : null;

  return (
    <section className="mt-28">
      <FadeUp inView>
        <span className="label-pill">{a.githubLabel}</span>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-tight font-bold tracking-[-0.03em]">{a.githubTitle}</h2>
            <p className="mt-2 text-haze">{a.githubBody}</p>
          </div>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
            <BrandIcon name="github" className="size-5" />
            {a.githubOpen}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </FadeUp>

      <FadeUp inView delay={0.1}>
        <div onPointerMove={spotlight} className="spot glass mt-8 rounded-[1.75rem] p-6 md:p-8">
          {chart && (
            <div className="overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/8b5cf6/${profile.githubUser}`}
                alt={`GitHub contributions of ${profile.githubUser}`}
                onError={() => setChart(false)}
                className="min-w-[640px] [filter:invert(1)_hue-rotate(180deg)_brightness(1.1)] opacity-90"
              />
            </div>
          )}
          {stats ? (
            <dl className={`grid gap-3 sm:grid-cols-3 ${chart ? 'mt-8' : ''}`}>
              {stats.map((st) => (
                <div key={st.label} className="flex flex-col rounded-2xl border border-white/10 bg-void/40 p-5">
                  <st.icon className="size-5 text-cyan" aria-hidden="true" />
                  <dt className="order-last mt-1 text-sm text-mute">{st.label}</dt>
                  <dd className="text-gradient mt-3 text-3xl font-bold">
                    <CountUp value={st.value} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            data === 'error' && !chart && <p className="text-haze">{a.githubFallback}</p>
          )}
        </div>
      </FadeUp>
    </section>
  );
}

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHeader route="about" label={a.label} title={a.title} />

      <section className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <FadeUp delay={0.5} className="lg:col-span-5">
          <Tilt className="spot glass overflow-hidden rounded-[2rem] p-3">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src={profile.photo} alt="" width={640} height={640} className="aspect-[4/5] w-full object-cover object-[50%_30%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xl font-bold text-ink">{profile.fullName}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-haze">
                  <MapPin className="size-4 text-cyan" />
                  {a.facts[0].value}
                </p>
              </div>
            </div>
          </Tilt>
        </FadeUp>

        <div className="lg:col-span-7">
          {a.body.map((p, i) => (
            <FadeUp key={p} delay={0.6 + i * 0.1}>
              <p className={i === 0 ? 'text-[clamp(1.25rem,1rem+0.9vw,1.6rem)] leading-snug font-medium text-ink' : 'mt-6 text-lg leading-relaxed text-haze'}>{p}</p>
            </FadeUp>
          ))}

          <FadeUp delay={0.75}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {stackLogos.filter((l) => l.icon).slice(0, 8).map((l) => (
                <li key={l.name} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-haze transition-colors hover:border-white/25 hover:text-ink">
                  <span className="group-hover:[&_svg]:fill-[var(--brand)]">
                    <Logo {...l} className="size-4" />
                  </span>
                  {l.name}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.8}>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {a.facts.map((f) => (
                <div key={f.label} onPointerMove={spotlight} className="spot glass rounded-2xl p-5">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-mute uppercase">{f.label}</dt>
                  <dd className="mt-2 font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      <section className="mt-28 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <FadeUp inView>
          <h2 className="text-2xl font-bold tracking-tight">{a.educationTitle}</h2>
          <div onPointerMove={spotlight} className="spot glass mt-6 rounded-[1.75rem] p-7 md:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xl leading-snug font-bold text-ink">{a.university}</p>
                <p className="mt-2 font-medium text-cyan">{a.degree}</p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet to-electric">
                <GraduationCap className="size-6" />
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-white/8 px-3 py-1 text-haze">{a.period}</span>
              <span className="rounded-full bg-white/8 px-3 py-1 text-haze">{a.gpa}</span>
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm font-semibold text-mute">{a.coursesLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.courses.map((c) => (
                <li key={c} className="rounded-full border border-white/10 bg-void/40 px-3.5 py-1.5 text-sm text-haze transition-colors hover:border-violet hover:text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp inView delay={0.1}>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">{a.timelineTitle}</h2>
          <Timeline />
        </FadeUp>
      </section>

      <GitHubSection />

      <NextPage from="about" />
      <PageFooter />
    </>
  );
}
