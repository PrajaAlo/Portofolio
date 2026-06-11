import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();

  const PROJECTS = [
    {
      title: t.projects.p1_title,
      category: "Computer Vision",
      description: t.projects.p1_desc,
      tech: ["Python", "PyTorch", "ConvNeXt", "OpenCV"],
      featured: true,
      github: "https://github.com/PrajaAlo/find-it-face-antispoofing"
    },
    {
      title: t.projects.p2_title,
      category: "Predictive Analytics",
      description: t.projects.p2_desc,
      tech: ["Python", "Statistics", "Feature Eng."],
      featured: true,
      github: "https://github.com/PrajaAlo/gammafest-football-score-prediction"
    },
    {
      title: t.projects.p3_title,
      category: "Big Data",
      description: t.projects.p3_desc,
      tech: ["Scraping", "Tableau", "Streamlit"],
      featured: false,
      github: "https://github.com/PrajaAlo/scrapping-tokopedia-ebay"
    },
    {
      title: t.projects.p4_title,
      category: "Scientific Computing",
      description: t.projects.p4_desc,
      tech: ["Python", "SciPy", "Numerical"],
      featured: false,
      github: "https://github.com/PrajaAlo/nonlinear-kinetic-data-modeling"
    },
    {
      title: t.projects.p5_title,
      category: "Time Series",
      description: t.projects.p5_desc,
      tech: ["Python", "SARIMAX", "Forecasting"],
      featured: false,
      github: "https://github.com/PrajaAlo/weather-forecasting-SARIMAX"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
             <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-8 bg-blue-500/50" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#3b82f6]">{t.projects.selectedWork}</h2>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {language === 'id' ? 'Kecerdasan' : 'Engineering'} <span className="text-white/40">{language === 'id' ? 'Sistematis.' : 'Intelligence.'}</span>
              </h3>
          </div>
          <a href="#" className="hidden md:flex text-sm font-medium text-white/50 hover:text-white items-center gap-2 transition-colors group px-6 py-3 rounded-full border border-white/10 hover:bg-white/5">
             View GitHub <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
             <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-panel p-8 rounded-[2rem] group relative overflow-hidden flex flex-col h-full hover:border-white/20 transition-all duration-500`}
             >
                {/* Visual Accent */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="mb-8 flex justify-between items-start relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-mono tracking-wider text-white/70 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <a href={project.github || "#"} target={project.github ? "_blank" : "_self"} rel={project.github ? "noopener noreferrer" : ""} className="p-2.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex-grow space-y-4 relative z-10">
                  <h4 className={`font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all text-xl md:text-2xl`}>
                    {project.title}
                  </h4>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 relative z-10 flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/40 text-white/40">
                      {t}
                    </span>
                  ))}
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
