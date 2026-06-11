import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const STATS = language === 'en' ? [
    { value: "3.73", label: "Cumulative GPA", suffix: "/4.0" },
    { value: "5+", label: "Data Science Projects", suffix: "" },
    { value: "2", label: "National Competitions", suffix: "" },
    { value: "1+", label: "Years Experience", suffix: "" }
  ] : [
    { value: "3.73", label: "IPK Kumulatif", suffix: "/4.0" },
    { value: "5+", label: "Proyek Data Science", suffix: "" },
    { value: "2", label: "Kompetisi Nasional", suffix: "" },
    { value: "1+", label: "Tahun Pengalaman", suffix: "" }
  ];

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 z-10 relative">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-8"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 glass-panel p-6 md:p-8 rounded-[2rem] border-white/5 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center text-center group"
          >
            <h3 className="text-4xl md:text-5xl font-display font-light text-white mb-2 group-hover:scale-105 transition-transform duration-500 group-hover:text-purple-300">
              {stat.value}<span className="text-xl md:text-2xl text-white/30 font-sans tracking-tight">{stat.suffix}</span>
            </h3>
            <p className="text-[11px] md:text-xs font-mono text-white/40 tracking-widest uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
