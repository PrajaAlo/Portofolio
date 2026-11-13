import {
  siGit, siGithub, siGooglecolab, siJupyter, siMysql, siOpencv, siPython, siPytorch, siR, siScikitlearn, siScipy, siStreamlit,
} from 'simple-icons';
import { stackLogos } from '../content';

const ICONS: Record<string, { path: string; hex: string }> = {
  python: siPython, pytorch: siPytorch, scikitlearn: siScikitlearn, opencv: siOpencv, scipy: siScipy, mysql: siMysql,
  r: siR, jupyter: siJupyter, googlecolab: siGooglecolab, streamlit: siStreamlit, git: siGit, github: siGithub,
};

/* Logo shown in grey, turning to its brand colour on hover. */
export function Logo({ name, icon, className = 'size-6' }: { name: string; icon?: string; className?: string }) {
  const i = icon ? ICONS[icon] : undefined;
  if (!i) return <span className="text-sm font-bold tracking-tight">{name}</span>;
  const hex = ['181717'].includes(i.hex) ? 'ffffff' : i.hex;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current transition-colors duration-300`} style={{ ['--brand' as string]: `#${hex}` }}>
      <path d={i.path} />
    </svg>
  );
}

/** Find a logo for a tool name used in the copy (case-insensitive). */
export const logoFor = (tool: string) => stackLogos.find((l) => l.name.toLowerCase() === tool.toLowerCase());

/* Infinite strip of tool logos with names. */
export function LogoStrip() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {stackLogos.map((l) => (
        <li key={l.name} className="group flex items-center gap-3 px-7 text-haze">
          <span className="group-hover:[&_svg]:fill-[var(--brand)]">
            <Logo {...l} className="size-7" />
          </span>
          <span className="text-base font-semibold whitespace-nowrap transition-colors group-hover:text-ink">{l.icon ? l.name : ''}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-mask overflow-hidden py-3">
      <div className="marquee [animation-duration:55s] hover:[animation-play-state:paused]">
        {row}
        <div aria-hidden="true" className="flex">{row}</div>
      </div>
    </div>
  );
}
