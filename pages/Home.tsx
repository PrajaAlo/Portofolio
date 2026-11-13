import { ArrowRight, ArrowUpRight, ChartColumn, ChartLine, Download, Mail, ScanFace, Trophy } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { ROUTES, profile } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';
import { LogoStrip } from '../components/Logos';
import { PageFooter } from '../components/Page';
import { ProjectVisual } from '../components/Visuals';
import { BrandIcon, CountUp, EASE, FadeUp, Magnetic, RevealText, Spark, Tilt, spotlight } from '../components/ui';

function RotatingRole() {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % t.hero.roles.length), 2800);
    return () => clearInterval(id);
  }, [t.hero.roles.length]);
  const role = t.hero.roles[i % t.hero.roles.length];
  return (
    <span className="relative inline-flex h-9 items-center overflow-hidden rounded-md bg-gradient-to-r from-electric to-violet px-3 text-[0.72rem] font-bold tracking-[0.16em] text-white uppercase shadow-[0_8px_30px_-8px_rgb(59_130_246/0.9)] sm:text-xs">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={role}
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="block whitespace-nowrap"
          aria-live="polite"
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Portrait() {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const photoX = useTransform(sx, (v) => v * 14);
  const photoY = useTransform(sy, (v) => v * 10);
  const chipX = useTransform(sx, (v) => v * -26);
  const chipY = useTransform(sy, (v) => v * -18);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);

  return (
    <motion.div
      className="relative mx-auto aspect-[4/5] w-full max-w-[290px] sm:max-w-[380px] lg:max-w-[460px]"
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px)' }}
      animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
    >
      <div className="halo absolute inset-[8%] rounded-full opacity-80" aria-hidden="true" />
      <motion.div className="absolute inset-0" style={{ x: photoX, y: photoY }}>
        <div className="portrait-mask relative h-full w-full overflow-hidden rounded-[2rem]">
          <img src={profile.photo} alt={t.hero.photoAlt} width={640} height={640} className="h-full w-full object-cover object-[50%_30%] [filter:contrast(1.08)_brightness(0.9)]" />
          {/* violet/blue stage light over the grey studio backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet/60 via-transparent to-electric/60 mix-blend-color" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_50%_42%,transparent_35%,rgb(10_8_28/0.82)_100%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {t.hero.chips.map((c, i) => (
          <motion.div
            key={c}
            className={`absolute ${['top-[10%] left-0 sm:-left-[6%]', 'top-[46%] right-0 sm:-right-[8%]', 'bottom-[16%] left-[2%]'][i]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.15 }}
          >
            <div className="float glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-ink shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)]" style={{ animationDelay: `${i * -1.6}s` }}>
              <span className={`size-2 rounded-full ${['bg-cyan', 'bg-violet-2', 'bg-electric'][i]}`} />
              {c}
            </div>
          </motion.div>
        ))}
        <Spark className="absolute top-[4%] right-[6%] size-9 text-amber drop-shadow-[0_0_14px_rgb(255_165_58/0.8)]" />
        <Spark className="absolute right-[18%] bottom-[30%] size-4 text-cyan" />
      </motion.div>
    </motion.div>
  );
}

const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin' as const, href: profile.links.linkedin },
  { name: 'GitHub', icon: 'github' as const, href: profile.links.github },
  { name: 'Instagram', icon: 'instagram' as const, href: profile.links.instagram },
];

function SectionHead({ label, title, action }: { label: string; title: string; action?: React.ReactNode }) {
  return (
    <FadeUp inView className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="label-pill">{label}</span>
        <h2 className="mt-5 max-w-[22ch] text-[clamp(2rem,1.3rem+2.6vw,3.4rem)] leading-[1.05] font-bold tracking-[-0.03em]">{title}</h2>
      </div>
      {action}
    </FadeUp>
  );
}

const FOCUS_ICONS = [ScanFace, ChartLine, ChartColumn];

function HomeSections() {
  const { t } = useLanguage();
  const h = t.home;
  const featured = t.work.projects.filter((p) => p.context);

  return (
    <>
      <section aria-label={h.stackLabel} className="-mx-5 border-y border-white/10 bg-white/[0.02] py-6 sm:-mx-8">
        <p className="mb-3 text-center text-xs font-semibold tracking-[0.2em] text-mute uppercase">{h.stackLabel}</p>
        <LogoStrip />
      </section>

      <section className="pt-28">
        <SectionHead
          label={h.featuredLabel}
          title={h.featuredTitle}
          action={
            <Link to="projects" className="group inline-flex items-center gap-2 font-semibold text-cyan">
              {h.seeAll}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <FadeUp key={p.slug} inView delay={i * 0.12}>
              <Tilt max={5} className="spot glass group h-full rounded-[1.75rem]">
                <div data-cursor={t.work.readCase.split(' ')[0]} className="relative flex h-full flex-col p-3">
                  <div className="relative overflow-hidden rounded-[1.25rem] bg-[radial-gradient(ellipse_at_top,rgb(139_92_246/0.25),transparent_70%),#0b0916] p-5">
                    <div className="transition-transform duration-700 group-hover:scale-[1.06]">
                      <ProjectVisual kind={p.visual} />
                    </div>
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-amber px-2.5 py-1 text-[0.68rem] font-bold text-void">
                      <Trophy className="size-3.5" />
                      {p.context}
                    </span>
                  </div>
                  <div className="px-3 pt-5 pb-3">
                    <h3 className="text-xl leading-snug font-bold md:text-2xl">
                      <Link to={`work-${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-haze">{p.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                      {t.work.readCase}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Tilt>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="pt-28">
        <SectionHead label={h.focusLabel} title={h.focusTitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {h.focus.map((f, i) => {
            const Icon = FOCUS_ICONS[i];
            return (
              <FadeUp key={f.title} inView delay={i * 0.1}>
                <div onPointerMove={spotlight} className="spot glass group h-full rounded-[1.75rem] p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-electric shadow-[0_10px_30px_-10px_rgb(139_92_246/0.9)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-haze">{f.body}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <section className="pt-28">
        <SectionHead label={h.exploreLabel} title={h.exploreTitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {h.explore.map((e, i) => (
            <FadeUp key={e.title} inView delay={i * 0.1}>
              <Link
                to={e.route}
                onPointerMove={spotlight}
                className="spot glass group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7"
              >
                {i === 0 && (
                  <img src={profile.photo} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_25%] opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40" />
                )}
                {i === 0 && <span className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/70 to-transparent" aria-hidden="true" />}
                <span className="grid size-11 place-items-center self-end rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-void">
                  <ArrowUpRight className="size-5" />
                </span>
                <span>
                  <span className="block text-2xl font-bold">{e.title}</span>
                  <span className="mt-1 block text-haze">{e.body}</span>
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <PageFooter />
    </>
  );
}

export function Home() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <>
    <div className="relative flex min-h-[100svh] flex-col pt-28 md:pt-32">
      <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <FadeUp>
            <span className="label-pill">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan" />
              </span>
              {h.badge}
            </span>
          </FadeUp>

          <h1 className="mt-7">
            <RevealText text={h.hello} className="block text-[clamp(1.4rem,1rem+1.4vw,2.1rem)] font-medium text-haze" delay={0.05} />
            <RevealText
              text={profile.fullName}
              delay={0.2}
              className="mt-2 block text-[clamp(2.6rem,1.2rem+5.6vw,4.4rem)] lg:text-[clamp(3rem,1rem+3.6vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.04em] text-ink"
            />
          </h1>

          <FadeUp delay={0.65} className="mt-6">
            <RotatingRole />
          </FadeUp>

          <FadeUp delay={0.8}>
            <p className="mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-haze">{h.intro}</p>
          </FadeUp>

          <FadeUp delay={0.95} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link to="projects" className="btn-primary">
                {h.ctaWork}
                <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="about" className="btn-ghost">
                {h.ctaAbout}
                <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
            {profile.cv && (
              <Magnetic>
                <a href={profile.cv} download className="btn-ghost">
                  <Download className="size-4" />
                  {h.cv}
                </a>
              </Magnetic>
            )}
          </FadeUp>

          <FadeUp delay={1.05} className="mt-7 flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-haze transition-all hover:-translate-y-1 hover:border-violet hover:text-ink hover:shadow-[0_8px_24px_-8px_rgb(139_92_246/0.8)]"
              >
                <BrandIcon name={s.icon} className="size-4" />
              </a>
            ))}
            {profile.email && (
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-haze transition-all hover:-translate-y-1 hover:border-violet hover:text-ink">
                <Mail className="size-4" />
              </a>
            )}
          </FadeUp>

          <FadeUp delay={1.1}>
            <dl className="mt-12 grid max-w-[34rem] grid-cols-3 divide-x divide-white/10">
              {h.stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col ${i ? 'pl-5' : ''} pr-3`}>
                  <dt className="order-2 mt-1 text-xs leading-snug text-mute">{s.label}</dt>
                  <dd className="text-gradient text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] leading-none font-bold">
                    <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} delay={1.1 + i * 0.1} />
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <Portrait />
        </div>
      </div>

      <FadeUp delay={1.3} className="mt-14 mb-8 flex items-center gap-5 text-xs font-semibold tracking-[0.2em] text-mute uppercase">
        <span className="tabular-nums text-cyan">01 / 0{ROUTES.length}</span>
        <motion.span className="h-px flex-1 origin-left bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
        <span>{h.footer}</span>
      </FadeUp>
    </div>
    <HomeSections />
    </>
  );
}
