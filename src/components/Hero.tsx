import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { t, language } = useLanguage();

  const ROLES = language === 'en' ? [
    "Data Science Student",
    "Machine Learning Enthusiast",
    "Computer Vision Researcher",
    "Future AI Engineer"
  ] : [
    "Mahasiswa Sains Data",
    "Antusias Machine Learning",
    "Peneliti Computer Vision",
    "Insinyur AI Masa Depan"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [ROLES.length]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden z-10" id="hero">
      
      {/* Center Massive Typography */}
      <div className="flex-grow flex flex-col items-center justify-center pointer-events-none mt-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400 drop-shadow-md text-xl md:text-2xl tracking-widest uppercase"
        >
          Praja Lohphinesti Subiarto
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-bold text-center leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] drop-shadow-lg"
        >
          {t.hero.dataScience}
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-bold text-center leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] drop-shadow-[0_0_40px_rgba(168,85,247,0.4)] filter"
        >
          {t.hero.portfolio}
        </motion.h1>
      </div>

      {/* Middle Text Descriptions */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-12 mt-16 px-6 lg:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full"
        >
          <p className="text-gray-400 text-sm md:text-base font-sans max-w-[320px] md:max-w-[400px] leading-relaxed text-center">
            {t.hero.buildingIntelligent}
            <br />
            {t.hero.currentlyA} <span className="font-medium text-gray-300">{ROLES[roleIndex]}</span>.
          </p>
        </motion.div>
      </div>

      {/* Bottom Footer Info Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-center items-center mt-24 px-6 md:px-12 text-xs font-sans text-white/50 tracking-wider uppercase mb-4"
      >
        <span>{t.hero.portfolioPresentation}</span>
      </motion.div>
      
    </section>
  );
}
