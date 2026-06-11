import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-panel border-b border-white/5' : 'py-6 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:opacity-80 tracking-widest text-xl md:text-2xl transition-all duration-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          PLS.
        </a>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/50">
          <a href="#about" className="hover:text-white transition-colors duration-300">{t.nav.about}</a>
          <a href="#skills" className="hover:text-white transition-colors duration-300">{t.nav.skills}</a>
          <a href="#projects" className="hover:text-white transition-colors duration-300">{t.nav.projects}</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full glass-panel text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/10">{t.nav.contact}</a>
        </div>
      </div>
    </motion.nav>
  );
}
