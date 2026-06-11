import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="lg:col-span-6 flex flex-col justify-center"
          >
             <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
               {t.contact.letsConnect} <br/> 
               <span className="text-white/30">{t.contact.andCreate}</span>
             </h2>
             <p className="text-white/50 mb-12 text-lg md:text-xl font-light max-w-lg leading-relaxed">
               {t.contact.seekingOpportunities}
             </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
             transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="lg:col-span-6 flex flex-col justify-between h-full relative"
          >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-xs font-mono text-white/30 mb-8 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-white/20" /> {language === 'id' ? 'Jejaring' : 'Networks'}
                </p>
                <div className="space-y-4">
                  {[
                    { name: 'LinkedIn', handle: 'Praja Lohphinesti', icon: Linkedin, url: 'https://www.linkedin.com/in/praja-lohphinesti' },
                    { name: 'GitHub', handle: 'PrajaAlo', icon: Github, url: 'https://github.com/PrajaAlo' },
                    { name: 'Instagram', handle: '@praja.loo', icon: Instagram, url: 'https://instagram.com/praja.loo' }
                  ].map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-6 rounded-3xl hover:bg-white/5 group transition-all duration-300 glass-panel border border-white/5 hover:border-white/20">
                      <span className="flex items-center gap-6 text-white/60 group-hover:text-white transition-colors text-xl font-medium">
                        <social.icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                        <div className="flex flex-col text-left">
                          <span className="text-white font-sans">{social.name}</span>
                          <span className="text-sm font-sans text-white/40 font-normal mt-0.5">{social.handle}</span>
                        </div>
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-xs font-mono leading-relaxed">
                    {t.contact.designedBuilt} <br/> &copy; 2026 Praja Lohphinesti Subiarto.
                  </p>
                  <div className="text-[10px] font-mono tracking-widest text-[#8b5cf6] border border-[#8b5cf6]/30 px-3 py-1 rounded-full bg-[#8b5cf6]/10">
                    {language === 'id' ? 'SISTEM: AKTIF' : 'SYSTEM: ONLINE'}
                  </div>
                </div>
              </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
