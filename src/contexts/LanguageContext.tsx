import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

type Translations = {
  [key in Language]: {
    nav: {
      about: string;
      skills: string;
      projects: string;
      contact: string;
    },
    hero: {
      dataScience: string;
      portfolio: string;
      description: string;
      buildingIntelligent: string;
      currentlyA: string;
      portfolioPresentation: string;
    },
    stats: {
      projectsDone: string;
      competitions: string;
      technologies: string;
    },
    about: {
      identity: string;
      transforming: string;
      intelligentSolutions: string;
      desc1: string;
      desc2: string;
      viewResume: string;
      education: string;
      upn: string;
      dataScienceStudent: string;
      relatedCoursework: string;
      relevantCourses: string;
    },
    skills: {
      technicalExpertise: string;
      toolsAndMethods: string;
    },
    projects: {
      selectedWork: string;
      featuredProjects: string;
      viewProject: string;
      p1_title: string;
      p1_desc: string;
      p2_title: string;
      p2_desc: string;
      p3_title: string;
      p3_desc: string;
      p4_title: string;
      p4_desc: string;
      p5_title: string;
      p5_desc: string;
    },
    contact: {
      letsConnect: string;
      andCreate: string;
      seekingOpportunities: string;
      designedBuilt: string;
    }
  }
};

const translations: Translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      dataScience: "DATA SCIENCE",
      portfolio: "PORTFOLIO",
      description: "A Showcase of Machine Learning, Predictive Analytics, \nand Visual Identity",
      buildingIntelligent: "Building intelligent systems through computer vision and data-driven innovation.",
      currentlyA: "Currently a",
      portfolioPresentation: "DATA SCIENCE & ML PORTFOLIO PRESENTATION"
    },
    stats: {
      projectsDone: "Projects Done",
      competitions: "Competitions",
      technologies: "Technologies"
    },
    about: {
      identity: "Identity",
      transforming: "Transforming Complex Data into",
      intelligentSolutions: "Intelligent Solutions.",
      desc1: "I am a Data Science student at Universitas Pembangunan Nasional 'Veteran' Jawa Timur with a profound interest in Machine Learning, Computer Vision, Data Mining, and Artificial Intelligence.",
      desc2: "Experienced in developing predictive models, performing complex data analysis, and actively participating in national-level data science competitions. Skilled in Python, SQL, and various machine learning methods to deliver impactful, data-driven solutions.",
      viewResume: "View Resume",
      education: "Education",
      upn: "Universitas Pembangunan Nasional 'Veteran' Jawa Timur",
      dataScienceStudent: "Data Science Student",
      relatedCoursework: "Related Coursework:",
      relevantCourses: "Machine Learning, Deep Learning, Data Mining, Statistical Modeling, Big Data Processing"
    },
    skills: {
      technicalExpertise: "Technical Expertise",
      toolsAndMethods: "Tools & Methods"
    },
    projects: {
      selectedWork: "Selected Work",
      featuredProjects: "Featured Projects",
      viewProject: "View Project",
      p1_title: "Face Anti-Spoofing Recognition Using ConvNeXt",
      p1_desc: "Developed a Computer Vision model using ConvNeXt for detecting real and fake faces at the FIND IT UGM 2026 competition.",
      p2_title: "Football Score Prediction Using Bivariate Poisson",
      p2_desc: "Built a statistical model to predict football match scores for the GAMMAFEST IPB 2026 competition.",
      p3_title: "Tokopedia & eBay Market Analysis",
      p3_desc: "Conducted web scraping and market analysis using Tokopedia and eBay data to generate strategic business insights.",
      p4_title: "Nonlinear Kinetic Data Modeling",
      p4_desc: "Developed a nonlinear estimation model utilizing Newton-Raphson and Bisection methods for kinetic data analysis.",
      p5_title: "Weather Forecasting Using SARIMAX",
      p5_desc: "Constructed a weather prediction model using ARIMA and SARIMAX with parameter optimization to enhance forecasting accuracy."
    },
    contact: {
      letsConnect: "Let's connect",
      andCreate: "and create.",
      seekingOpportunities: "I'm currently seeking opportunities for Data Scientist, ML Engineer, or Research Assistant roles.",
      designedBuilt: "Designed & Built"
    }
  },
  id: {
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      contact: "Kontak"
    },
    hero: {
      dataScience: "DATA SCIENCE",
      portfolio: "PORTOFOLIO",
      description: "Sebuah Etalase dari Machine Learning, Analitik Prediktif, \ndan Identitas Visual",
      buildingIntelligent: "Membangun sistem cerdas melalui computer vision dan inovasi berbasis data.",
      currentlyA: "Saat ini sebagai",
      portfolioPresentation: "PRESENTASI PORTOFOLIO DATA SCIENCE & ML"
    },
    stats: {
      projectsDone: "Proyek Selesai",
      competitions: "Kompetisi",
      technologies: "Teknologi"
    },
    about: {
      identity: "Identitas",
      transforming: "Mengubah Data Kompleks Menjadi",
      intelligentSolutions: "Solusi Cerdas.",
      desc1: "Saya adalah mahasiswa Sains Data Universitas Pembangunan Nasional 'Veteran' Jawa Timur. Memiliki minat mendalam pada Machine Learning, Computer Vision, Data Mining, dan Artificial Intelligence.",
      desc2: "Berpengalaman dalam mengembangkan model prediktif, melakukan analisis data kompleks, serta mengikuti kompetisi data science tingkat nasional. Terampil menggunakan Python, SQL, dan berbagai metode machine learning untuk menghasilkan solusi berbasis data yang berdampak.",
      viewResume: "Lihat Resume",
      education: "Pendidikan",
      upn: "Universitas Pembangunan Nasional 'Veteran' Jawa Timur",
      dataScienceStudent: "Mahasiswa Sains Data",
      relatedCoursework: "Mata Kuliah Terkait:",
      relevantCourses: "Pembelajaran Mesin, Deep Learning, Penambangan Data, Pemodelan Statistik, Pemrosesan Big Data"
    },
    skills: {
      technicalExpertise: "Keahlian Teknis",
      toolsAndMethods: "Alat & Metode"
    },
    projects: {
      selectedWork: "Karya Terpilih",
      featuredProjects: "Proyek Unggulan",
      viewProject: "Lihat Proyek",
      p1_title: "Pengenalan Wajah Anti-Spoofing Menggunakan ConvNeXt",
      p1_desc: "Mengembangkan model Computer Vision menggunakan ConvNeXt untuk mendeteksi wajah asli dan palsu pada kompetisi FIND IT UGM 2026.",
      p2_title: "Prediksi Skor Sepak Bola Menggunakan Bivariate Poisson",
      p2_desc: "Membangun model statistik untuk memprediksi skor pertandingan sepak bola pada kompetisi GAMMAFEST IPB 2026.",
      p3_title: "Analisis Pasar Tokopedia & eBay",
      p3_desc: "Melakukan web scraping dan analisis pasar menggunakan data Tokopedia dan eBay untuk menghasilkan insight bisnis yang strategis.",
      p4_title: "Pemodelan Data Kinetik Nonlinear",
      p4_desc: "Mengembangkan model estimasi nonlinear menggunakan metode Newton-Raphson dan Bisection untuk analisis data kinetik.",
      p5_title: "Prakiraan Cuaca Menggunakan SARIMAX",
      p5_desc: "Membangun model prediksi cuaca menggunakan ARIMA dan SARIMAX dengan optimasi parameter untuk meningkatkan akurasi prakiraan."
    },
    contact: {
      letsConnect: "Mari terhubung",
      andCreate: "dan berkreasi.",
      seekingOpportunities: "Saat ini saya sedang mencari peluang untuk peran Data Scientist, ML Engineer, atau Research Assistant.",
      designedBuilt: "Dirancang & Dibangun"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Default is english

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
