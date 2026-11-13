import { BrainCircuit, ChartColumn, CodeXml, ScanFace, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { NextPage, PageFooter, PageHeader } from '../components/Page';
import { EASE, Spark, spotlight } from '../components/ui';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../router';

const ICONS = { code: CodeXml, brain: BrainCircuit, chart: ChartColumn, eye: ScanFace, tools: Wrench };
const TINTS = ['from-electric to-cyan', 'from-violet to-fuchsia-500', 'from-cyan to-electric', 'from-violet-2 to-electric', 'from-slate-400 to-violet'];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((s) => (
        <li key={s} className="flex items-center gap-8 pr-8 whitespace-nowrap">
          <span className="text-[clamp(2rem,1.2rem+3vw,4rem)] font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.35)] transition-colors hover:text-ink">{s}</span>
          <Spark className="size-5 text-violet" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-mask overflow-hidden py-2" aria-hidden="true">
      <div className={`marquee ${reverse ? 'reverse' : ''}`}>
        {row}
        {row}
      </div>
    </div>
  );
}

export function Skills() {
  const { t } = useLanguage();
  const { ready } = useRouter();
  const s = t.skills;
  const all = s.groups.flatMap((g) => g.items);

  return (
    <>
      <PageHeader route="skills" label={s.label} title={s.title} intro={s.intro} />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {s.groups.map((g, i) => {
          const Icon = ICONS[g.icon];
          const wide = i < 2;
          return (
            <motion.li
              key={g.name}
              onPointerMove={spotlight}
              className={`spot glass group rounded-[1.75rem] p-7 ${wide ? 'lg:col-span-3' : 'lg:col-span-2'} ${i === s.groups.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 + i * 0.08 }}
            >
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${TINTS[i]} shadow-[0_10px_30px_-10px_rgb(139_92_246/0.8)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon className="size-6 text-white" />
                </span>
                <span className="text-sm font-semibold text-mute tabular-nums">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <h2 className="mt-6 text-xl font-bold text-ink">{g.name}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item, k) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={ready ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.08 + k * 0.04 }}
                    className="rounded-xl border border-white/10 bg-void/50 px-3.5 py-2 text-sm text-haze transition-colors hover:border-cyan/60 hover:text-ink"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-24 -mx-5 space-y-2 sm:-mx-8">
        <Marquee items={all.slice(0, Math.ceil(all.length / 2))} />
        <Marquee items={all.slice(Math.ceil(all.length / 2))} reverse />
      </div>

      <NextPage from="skills" />
      <PageFooter />
    </>
  );
}
