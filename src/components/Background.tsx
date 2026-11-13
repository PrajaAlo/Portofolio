import { useRouter } from '../router';

/* Fixed aurora behind every page. Blob placement shifts per page for variety. */
const LAYOUT: Record<string, string[]> = {
  home: ['left-[-10%] top-[-15%]', 'right-[-8%] top-[20%]', 'left-[30%] bottom-[-25%]'],
  about: ['right-[-10%] top-[-10%]', 'left-[-12%] top-[35%]', 'right-[20%] bottom-[-25%]'],
  projects: ['left-[20%] top-[-20%]', 'right-[-10%] bottom-[10%]', 'left-[-15%] bottom-[-10%]'],
  skills: ['left-[-10%] bottom-[0%]', 'right-[0%] top-[-15%]', 'left-[40%] top-[30%]'],
  contact: ['left-[25%] top-[10%]', 'right-[-10%] bottom-[-20%]', 'left-[-15%] top-[-10%]'],
};

export function Background() {
  const { section } = useRouter();
  const [a, b, c] = LAYOUT[section];
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className={`blob blob-a h-[55vw] max-h-[720px] w-[55vw] max-w-[720px] bg-violet/35 transition-all duration-[1600ms] ${a}`} />
      <div className={`blob blob-b h-[45vw] max-h-[620px] w-[45vw] max-w-[620px] bg-electric/30 transition-all duration-[1600ms] ${b}`} />
      <div className={`blob blob-c h-[40vw] max-h-[560px] w-[40vw] max-w-[560px] bg-fuchsia-500/15 transition-all duration-[1600ms] ${c}`} />
      <div className="grid-lines absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
