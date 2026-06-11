import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, BrainCircuit, BarChart3, Presentation, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SKILL_CATEGORIES = [
  {
    title: "Programming",
    title_id: "Pemrograman",
    icon: Code2,
    colors: "from-blue-500/20 to-cyan-500/5",
    skills: ["Python", "SQL", "R"]
  },
  {
    title: "Machine Learning",
    title_id: "Machine Learning",
    icon: BrainCircuit,
    colors: "from-purple-500/20 to-fuchsia-500/5",
    skills: ["Scikit-Learn", "Deep Learning", "Computer Vision", "Predictive Modeling", "Feature Engineering"]
  },
  {
    title: "Data Analytics",
    title_id: "Analitik Data",
    icon: BarChart3,
    colors: "from-emerald-500/20 to-teal-500/5",
    skills: ["Data Mining", "Data Wrangling", "Statistical Analysis", "EDA", "Time Series Analysis"]
  },
  {
    title: "Visualization",
    title_id: "Visualisasi",
    icon: Presentation,
    colors: "from-orange-500/20 to-amber-500/5",
    skills: ["Tableau", "Streamlit", "Matplotlib", "Seaborn"]
  },
  {
    title: "Tools & Environment",
    title_id: "Alat & Lingkungan Kerja",
    icon: Wrench,
    colors: "from-zinc-500/20 to-stone-500/5",
    skills: ["Jupyter Notebook", "Git", "Google Colab", "VS Code"]
  }
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative z-10">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-purple-500/50" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#8b5cf6]">{t.skills.technicalExpertise}</h2>
            <div className="h-[1px] w-8 bg-purple-500/50" />
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'id' ? 'Tumpukan Teknologi' : 'Technical Stack'}
          </h3>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            {language === 'id' 
              ? 'Perangkat komprehensif untuk mengekstraksi insight, membangun model prediktif, dan mengimplementasikan aplikasi cerdas berbasis data.'
              : 'Comprehensive toolkit for extracting insights, building predictive models, and deploying intelligent data-driven applications.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Dynamic subtle glow based on category */}
              <div className={`absolute top-0 right-0 p-24 bg-gradient-to-bl ${cat.colors} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />

              <div className="relative z-10">
                <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl w-fit mb-8 border border-white/10 group-hover:border-white/20 transition-colors">
                  <cat.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-6 font-display tracking-wide">{language === 'id' ? cat.title_id : cat.title}</h4>
                
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-4 py-2 rounded-xl bg-black/60 border border-white/5 text-sm text-white/50 group-hover:text-white/80 hover:!text-white hover:border-white/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
