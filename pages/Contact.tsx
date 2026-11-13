import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageFooter } from '../components/Page';
import { BrandIcon, EASE, FadeUp, Magnetic, RevealText, Spark, spotlight } from '../components/ui';
import { ROUTES, profile } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useRouter } from '../router';

const NETWORKS = [
  { name: 'LinkedIn', icon: 'linkedin', handle: 'in/praja-lohphinesti', href: profile.links.linkedin, tint: 'from-electric to-cyan' },
  { name: 'GitHub', icon: 'github', handle: 'PrajaAlo', href: profile.links.github, tint: 'from-violet to-electric' },
  { name: 'Instagram', icon: 'instagram', handle: '@praja.loo', href: profile.links.instagram, tint: 'from-fuchsia-500 to-violet' },
] as const;

export function Contact() {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const c = t.contact;

  return (
    <>
      <section className="flex min-h-[85svh] flex-col justify-center pt-36 pb-10 md:pt-44">
        <FadeUp>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-cyan tabular-nums">0{ROUTES.length}</span>
            <span className="h-px w-10 bg-white/25" />
            <span className="label-pill">{c.label}</span>
          </div>
        </FadeUp>

        <div className="relative">
          <RevealText as="h1" text={c.title} delay={0.1} className="text-gradient mt-8 block max-w-[16ch] text-[clamp(2.8rem,1.3rem+6vw,7rem)] leading-[1] font-bold tracking-[-0.045em]" />
          <motion.span
            className="absolute top-0 right-0 hidden md:block"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={ready ? { opacity: 1, rotate: 0, scale: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.7 }}
          >
            <Spark className="size-20 text-amber drop-shadow-[0_0_30px_rgb(255_165_58/0.7)]" />
          </motion.span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <FadeUp delay={0.5} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-haze">{c.body}</p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {c.status}
            </p>
          </FadeUp>

          <ul className="space-y-3 lg:col-span-7">
            {NETWORKS.map((n, i) => (
              <motion.li
                key={n.name}
                initial={{ opacity: 0, x: 60 }}
                animate={ready ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: 0.55 + i * 0.1 }}
              >
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={spotlight}
                  className="spot glass group relative flex items-center gap-5 overflow-hidden rounded-[1.5rem] p-5 md:p-6"
                >
                  <span className={`absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r ${n.tint} opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100`} aria-hidden="true" />
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/8 transition-colors duration-500 group-hover:bg-white/20">
                    <BrandIcon name={n.icon} className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-2xl font-bold tracking-tight text-ink md:text-3xl">{n.name}</span>
                    <span className="text-sm text-haze transition-colors group-hover:text-white/85">{n.handle}</span>
                  </span>
                  <span className="grid size-12 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-void">
                    <ArrowUpRight className="size-5" />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <FadeUp delay={0.9} className="mt-16">
          <Magnetic>
            <Link to="home" className="btn-ghost">
              {c.home}
            </Link>
          </Magnetic>
        </FadeUp>
      </section>
      <PageFooter />
    </>
  );
}
