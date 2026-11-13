import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

/* Dot + trailing ring. Ring grows over links and shows a label over [data-cursor]. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element;
      const tagged = el.closest?.('[data-cursor]');
      if (tagged) {
        setMode('label');
        setLabel(tagged.getAttribute('data-cursor') || '');
      } else setMode(el.closest?.('a, button') ? 'link' : 'idle');
    };
    const leave = () => setVisible(false);
    const reset = () => setMode('idle');
    window.addEventListener('hashchange', reset);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('hashchange', reset);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === 'label' ? 92 : mode === 'link' ? 56 : 36;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[120] flex items-center justify-center rounded-full border border-white/40 text-[0.7rem] font-semibold tracking-wide text-white"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: mode === 'label' ? 'rgba(124,58,237,0.85)' : mode === 'link' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          borderColor: mode === 'idle' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {mode === 'label' && label}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[121] size-1.5 rounded-full bg-cyan"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode !== 'label' ? 1 : 0, scale: mode === 'link' ? 0 : 1 }}
      />
    </>
  );
}
