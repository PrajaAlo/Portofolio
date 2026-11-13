import type { ReactNode } from 'react';
import type { Visual } from '../content';

/*
  Method illustrations for each project card. They show what kind of model
  each project is (not its results), drawn from simple deterministic math.
*/

const W = 400;
const H = 250;
const VIOLET = '#a78bfa';
const CYAN = '#22d3ee';
const INK = '#f4f2ff';
const DIM = 'rgba(255,255,255,0.14)';
const MONO = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11 } as const;

function Frame({ children, label, id }: { children: ReactNode; label: string; id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

function AntiSpoof() {
  const dots: [number, number][] = [];
  for (let y = -1; y <= 1.001; y += 0.16)
    for (let x = -1; x <= 1.001; x += 0.16) if (x * x + y * y * 0.95 <= 1) dots.push([x, y]);
  const lines = Array.from({ length: 24 }, (_, i) => 52 + i * 5.6);
  return (
    <Frame id="as" label="Real face versus spoofed face">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={120 + x * 52} cy={128 + y * 66} r={1.9} fill={INK} opacity={0.5 + 0.5 * (1 - Math.hypot(x, y) / 1.4)} />
      ))}
      <rect x={58} y={52} width={124} height={152} rx={6} fill="none" stroke="url(#as-g)" strokeWidth={2.5} />
      <rect x={58} y={34} width={46} height={16} rx={4} fill={CYAN} />
      <text x={64} y={46} {...MONO} fill="#06050c">real</text>
      <clipPath id="as-oval">
        <ellipse cx={280} cy={128} rx={54} ry={68} />
      </clipPath>
      <g clipPath="url(#as-oval)">
        {lines.map((y) => (
          <line key={y} x1={220} x2={340} y1={y} y2={y + 4} stroke={VIOLET} strokeOpacity={0.6} strokeWidth={1.2} />
        ))}
      </g>
      <rect x={218} y={52} width={124} height={152} rx={6} fill="none" stroke={INK} strokeOpacity={0.35} strokeDasharray="5 5" />
      <text x={222} y={222} {...MONO} fill={INK} fillOpacity={0.55}>spoof</text>
    </Frame>
  );
}

function Poisson() {
  const l1 = 1.55, l2 = 1.05, l3 = 0.12;
  const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
  const pois = (k: number, l: number) => (Math.exp(-l) * l ** k) / fact(k);
  const p = (x: number, y: number) => {
    let s = 0;
    for (let k = 0; k <= Math.min(x, y); k++) s += pois(x - k, l1) * pois(y - k, l2) * pois(k, l3);
    return s;
  };
  const N = 6;
  const cells = Array.from({ length: N * N }, (_, i) => ({ x: i % N, y: Math.floor(i / N), v: p(i % N, Math.floor(i / N)) }));
  const max = Math.max(...cells.map((c) => c.v));
  const s = 30, ox = 128, oy = 26;
  return (
    <Frame id="po" label="Heatmap of predicted scorelines">
      {cells.map((c) => (
        <rect key={`${c.x}${c.y}`} x={ox + c.x * s} y={oy + c.y * s} width={s - 4} height={s - 4} rx={4} fill={c.v === max ? CYAN : VIOLET} fillOpacity={c.v === max ? 1 : 0.06 + 0.9 * (c.v / max)} />
      ))}
      {Array.from({ length: N }, (_, i) => (
        <g key={i} {...MONO} fill={INK} fillOpacity={0.5}>
          <text x={ox + i * s + 9} y={oy + N * s + 12}>{i}</text>
          <text x={ox - 14} y={oy + i * s + 17}>{i}</text>
        </g>
      ))}
      <text x={ox + 52} y={oy + N * s + 30} {...MONO} fill={INK} fillOpacity={0.5}>home goals</text>
      <text x={ox - 30} y={oy + 125} {...MONO} fill={INK} fillOpacity={0.5} transform={`rotate(-90 ${ox - 30} ${oy + 125})`}>away goals</text>
    </Frame>
  );
}

function Market() {
  const g = (x: number, m: number, sd: number) => Math.exp(-((x - m) ** 2) / (2 * sd * sd));
  const a = (x: number) => 0.8 * g(x, 0.32, 0.09) + 0.35 * g(x, 0.62, 0.12);
  const b = (x: number) => 0.55 * g(x, 0.55, 0.14) + 0.25 * g(x, 0.82, 0.07);
  const xs = Array.from({ length: 81 }, (_, i) => i / 80);
  const px = (x: number) => 30 + x * 340;
  const py = (y: number) => 205 - y * 190;
  const area = (f: (x: number) => number) => `M${px(0)},${py(0)} ` + xs.map((x) => `L${px(x)},${py(f(x))}`).join(' ') + ` L${px(1)},${py(0)} Z`;
  const line = (f: (x: number) => number) => xs.map((x, i) => `${i ? 'L' : 'M'}${px(x)},${py(f(x))}`).join(' ');
  return (
    <Frame id="mk" label="Price distributions on two marketplaces">
      <line x1={30} x2={370} y1={205} y2={205} stroke={DIM} />
      <path d={area(a)} fill="url(#mk-g)" fillOpacity={0.85} />
      <path d={line(b)} fill="none" stroke={INK} strokeWidth={2.2} />
      <g {...MONO}>
        <rect x={250} y={30} width={10} height={10} rx={2} fill={VIOLET} />
        <text x={266} y={39} fill={INK} fillOpacity={0.7}>tokopedia</text>
        <line x1={250} x2={260} y1={56} y2={56} stroke={INK} strokeWidth={2.2} />
        <text x={266} y={60} fill={INK} fillOpacity={0.7}>ebay</text>
        <text x={30} y={226} fill={INK} fillOpacity={0.5}>price</text>
      </g>
    </Frame>
  );
}

function Newton() {
  const f = (x: number) => x ** 3 - 2 * x - 5;
  const df = (x: number) => 3 * x * x - 2;
  const x0 = 1.4, x1 = 3.3, y0 = -8, y1 = 25;
  const px = (x: number) => 30 + ((x - x0) / (x1 - x0)) * 340;
  const py = (y: number) => 215 - ((y - y0) / (y1 - y0)) * 190;
  const curve = Array.from({ length: 80 }, (_, i) => x0 + (i / 79) * (x1 - x0)).map((x, i) => `${i ? 'L' : 'M'}${px(x)},${py(f(x))}`).join(' ');
  const its = [3.2];
  for (let i = 0; i < 3; i++) its.push(its[i] - f(its[i]) / df(its[i]));
  return (
    <Frame id="nr" label="Newton–Raphson iterations converging to a root">
      <line x1={30} x2={370} y1={py(0)} y2={py(0)} stroke={DIM} strokeWidth={1.5} />
      <path d={curve} fill="none" stroke={INK} strokeWidth={2.2} />
      {its.slice(0, 3).map((x, i) => (
        <g key={i}>
          <line x1={px(x)} x2={px(x)} y1={py(0)} y2={py(f(x))} stroke={INK} strokeOpacity={0.3} strokeDasharray="3 4" />
          <line x1={px(x)} y1={py(f(x))} x2={px(its[i + 1])} y2={py(0)} stroke={VIOLET} strokeWidth={2} />
          <circle cx={px(x)} cy={py(f(x))} r={4} fill={CYAN} />
          <text x={px(x) - 6} y={py(0) + 18} {...MONO} fill={INK} fillOpacity={0.6}>{`x${i}`}</text>
        </g>
      ))}
      <circle cx={px(its[3])} cy={py(0)} r={6} fill="none" stroke={CYAN} strokeWidth={2.5} />
    </Frame>
  );
}

function Sarimax() {
  const n = 54, h = 18;
  const v = (t: number) => 0.5 + 0.004 * t + 0.22 * Math.sin((t / 12) * Math.PI * 2) + 0.05 * Math.sin(t * 2.3) + 0.03 * Math.cos(t * 5.1);
  const fc = (t: number) => 0.5 + 0.004 * t + 0.22 * Math.sin((t / 12) * Math.PI * 2);
  const px = (t: number) => 25 + (t / (n + h)) * 350;
  const py = (y: number) => 220 - y * 190;
  const hist = Array.from({ length: n }, (_, t) => `${t ? 'L' : 'M'}${px(t)},${py(v(t))}`).join(' ');
  const fut = Array.from({ length: h + 1 }, (_, i) => n - 1 + i);
  const up = fut.map((t, i) => `${i ? 'L' : 'M'}${px(t)},${py(fc(t) + 0.03 + (t - n) * 0.007)}`).join(' ');
  const lo = [...fut].reverse().map((t) => `L${px(t)},${py(fc(t) - 0.03 - (t - n) * 0.007)}`).join(' ');
  const mid = fut.map((t, i) => `${i ? 'L' : 'M'}${px(t)},${py(fc(t))}`).join(' ');
  return (
    <Frame id="sx" label="Seasonal time series with a forecast interval">
      <line x1={px(n - 1)} x2={px(n - 1)} y1={20} y2={225} stroke={DIM} strokeDasharray="4 4" />
      <path d={`${up} ${lo} Z`} fill={VIOLET} fillOpacity={0.28} />
      <path d={hist} fill="none" stroke={INK} strokeOpacity={0.85} strokeWidth={2} />
      <path d={mid} fill="none" stroke={CYAN} strokeWidth={2.5} />
      <text x={px(n - 1) + 8} y={238} {...MONO} fill={CYAN}>forecast</text>
    </Frame>
  );
}

export function ProjectVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'antispoof':
      return <AntiSpoof />;
    case 'poisson':
      return <Poisson />;
    case 'market':
      return <Market />;
    case 'newton':
      return <Newton />;
    case 'sarimax':
      return <Sarimax />;
  }
}
