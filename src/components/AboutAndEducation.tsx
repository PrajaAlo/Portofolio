import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutAndEducation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative z-10">
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* About */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-purple-500/50" />
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#8b5cf6]">{t.about.identity}</h2>
            </div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
            {t.about.transforming} <span className="text-white/40 font-light">{t.about.intelligentSolutions}</span>
          </h3>
          <div className="glass-panel p-8 md:p-10 rounded-[2rem] flex-grow relative overflow-hidden group">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 p-40 bg-blue-500/5 rounded-bl-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-700" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 relative z-10">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-purple-500/30 glass-panel shadow-[0_0_30px_rgba(139,92,246,0.2)] shrink-0">
                 <img 
                   src="/profile.jpeg" 
                   alt="Praja Lohphinesti Subiarto" 
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                 />
              </div>
              <div className="flex flex-col justify-center h-full md:mt-10 items-center md:items-start text-center md:text-left">
                <h4 className="font-display text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 mb-2 drop-shadow-sm">
                  Praja Lohphinesti Subiarto
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-3" />
                <p className="text-white/50 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                  Undergraduate Data Science Student
                </p>
              </div>
            </div>
            
            <p className="text-white/60 leading-relaxed text-base md:text-lg relative z-10 font-light mb-6 text-justify">
              {t.about.desc1}
            </p>
            <p className="text-white/60 leading-relaxed text-base md:text-lg relative z-10 font-light text-justify">
              {t.about.desc2}
            </p>
            
            <div className="flex items-center gap-3 mt-10 text-white/50 text-sm font-mono relative z-10 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5">
               <MapPin className="w-4 h-4 text-purple-400" /> {language === 'id' ? 'Surabaya, Jawa Timur, Indonesia' : 'Surabaya, East Java, Indonesia'}
            </div>
          </div>
        </motion.div>

        {/* Education & Achievements */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-6 space-y-6 lg:pt-[104px]"
        >
          <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">Universitas Pembangunan Nasional<br/>"Veteran" Jawa Timur</h4>
                <p className="text-purple-400 font-medium">{t.about.dataScienceStudent}</p>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-br from-white/10 to-white/0 border border-white/10 hidden sm:block">
                 <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex gap-4 text-xs font-mono text-white/40 mb-8 uppercase tracking-wider relative z-10">
              <span className="bg-white/5 px-3 py-1 rounded-full text-white/70">{language === 'id' ? '2024 - Sekarang' : '2024 - Present'}</span>
              <span className="bg-white/5 px-3 py-1 rounded-full text-white/70">GPA: 3.73 / 4.00</span>
            </div>

            <div className="pt-8 border-t border-white/5 relative z-10">
               <div className="flex items-center gap-2 text-white/80 font-medium mb-4 text-sm">
                 <BookOpen className="w-4 h-4 text-purple-400" /> {t.about.relatedCoursework}
               </div>
               <div className="flex flex-wrap gap-2">
                 {t.about.relevantCourses.split(', ').map((course: string) => (
                   <span key={course} className="px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-xs text-white/60 hover:text-white transition-colors cursor-default">
                     {course}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Award className="w-5 h-5" />
                 </div>
                 <h4 className="text-lg font-bold text-white font-display tracking-wide">{language === 'id' ? 'Pencapaian & Aktivitas' : 'Milestones & Activities'}</h4>
             </div>
             <ul className="space-y-4">
               {(language === 'id' ? [
                 'Peserta FIND IT 2026 UGM',
                 'Peserta GAMMAFEST 2026 IPB',
                 'Akshaya 2025 - Anggota Divisi PDD',
                 'Peserta Aktif Kompetisi Data Science'
               ] : [
                 'Participant FIND IT 2026 UGM',
                 'Participant GAMMAFEST 2026 IPB',
                 'Akshaya 2025 - PDD Division Member',
                 'Active Data Science Competition Participant'
               ]).map((achievement, i) => (
                 <li key={i} className="flex items-start gap-4 group">
                   <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-purple-500/50 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-purple-400 transition-colors" />
                   </div>
                   <span className="text-white/60 text-sm md:text-base font-light group-hover:text-white/90 transition-colors">{achievement}</span>
                 </li>
               ))}
             </ul>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
