// All site copy lives here. Edit this file to update the portfolio; components only render it.

export type Lang = 'en' | 'id';
export type Route = 'home' | 'about' | 'projects' | 'skills' | 'contact';
export const ROUTES: Route[] = ['home', 'about', 'projects', 'skills', 'contact'];

export const profile = {
  firstName: 'Praja',
  fullName: 'Praja Lohphinesti Subiarto',
  initials: 'PLS',
  photo: 'profile.jpeg',
  githubUser: 'PrajaAlo',
  /** Fill these in to show an email link and a "Download CV" button. Put the PDF in /public. */
  email: '',
  cv: '',
  links: {
    github: 'https://github.com/PrajaAlo',
    linkedin: 'https://www.linkedin.com/in/praja-lohphinesti',
    instagram: 'https://instagram.com/praja.loo',
  },
};

/** Tools shown as logos. `icon` is a simple-icons key, or omitted for a text-only badge. */
export const stackLogos: { name: string; icon?: string }[] = [
  { name: 'Python', icon: 'python' },
  { name: 'PyTorch', icon: 'pytorch' },
  { name: 'scikit-learn', icon: 'scikitlearn' },
  { name: 'OpenCV', icon: 'opencv' },
  { name: 'SciPy', icon: 'scipy' },
  { name: 'SQL', icon: 'mysql' },
  { name: 'R', icon: 'r' },
  { name: 'Jupyter', icon: 'jupyter' },
  { name: 'Google Colab', icon: 'googlecolab' },
  { name: 'Streamlit', icon: 'streamlit' },
  { name: 'Tableau' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
];

export type Visual = 'antispoof' | 'poisson' | 'market' | 'newton' | 'sarimax';
export type Category = 'cv' | 'predictive' | 'analytics' | 'numerical' | 'timeseries';

export type Project = {
  slug: string;
  short: string;
  title: string;
  summary: string;
  context?: string;
  year?: string;
  category: Category;
  stack: string[];
  repo: string;
  visual: Visual;
  overview: string;
  problem: string;
  approach: string[];
  decisions: string;
};

type Copy = {
  nav: Record<Route, string> & { menu: string; close: string };
  pageLabel: Record<Route, string>;
  next: string;
  loading: string;
  hero: {
    badge: string;
    hello: string;
    roles: string[];
    intro: string;
    ctaWork: string;
    ctaAbout: string;
    cv: string;
    stats: { value: number; decimals?: number; suffix?: string; label: string }[];
    chips: string[];
    photoAlt: string;
    footer: string;
  };
  home: {
    stackLabel: string;
    featuredLabel: string;
    featuredTitle: string;
    seeAll: string;
    focusLabel: string;
    focusTitle: string;
    focus: { title: string; body: string; route: Route }[];
    exploreLabel: string;
    exploreTitle: string;
    explore: { title: string; body: string; route: Route }[];
  };
  about: {
    label: string;
    title: string;
    body: string[];
    facts: { label: string; value: string }[];
    educationTitle: string;
    university: string;
    degree: string;
    period: string;
    gpa: string;
    coursesLabel: string;
    courses: string[];
    timelineTitle: string;
    timeline: { year: string; title: string; detail: string; skills?: string[] }[];
    githubLabel: string;
    githubTitle: string;
    githubBody: string;
    githubStats: { repos: string; followers: string; stars: string };
    githubFallback: string;
    githubOpen: string;
  };
  work: {
    label: string;
    title: string;
    intro: string;
    all: string;
    categories: Record<Category, string>;
    competition: string;
    personal: string;
    openRepo: string;
    readCase: string;
    allRepos: string;
    back: string;
    meta: { type: string; year: string; category: string; stack: string; code: string };
    sections: { overview: string; problem: string; approach: string; decisions: string };
    nextProject: string;
    projects: Project[];
  };
  skills: {
    label: string;
    title: string;
    intro: string;
    groups: { name: string; icon: 'code' | 'brain' | 'chart' | 'eye' | 'tools'; items: string[] }[];
  };
  contact: {
    label: string;
    title: string;
    body: string;
    status: string;
    footer: string;
    home: string;
  };
  footer: {
    tagline: string;
    pages: string;
    connect: string;
    top: string;
  };
  langSwitch: string;
  skip: string;
};

const repo = (slug: string) => `${profile.links.github}/${slug}`;

const projectsEn: Project[] = [
  {
    slug: 'face-antispoofing',
    short: 'Face anti-spoofing',
    title: 'Face anti-spoofing with ConvNeXt',
    summary: 'A computer vision model that separates real faces from fake ones.',
    context: 'FIND IT UGM 2026',
    year: '2026',
    category: 'cv',
    stack: ['Python', 'PyTorch', 'ConvNeXt', 'OpenCV'],
    repo: repo('find-it-face-antispoofing'),
    visual: 'antispoof',
    overview:
      'Built for the FIND IT 2026 data competition at Universitas Gadjah Mada: an image classification model that decides whether a face in a photo is a real person or a spoof.',
    problem:
      'Face recognition can be fooled by holding up a printed photo or a screen instead of a real face. The goal is to catch these presentation attacks from the image alone, so a system only accepts genuine faces.',
    approach: [
      'Loaded and prepared the face images with OpenCV.',
      'Fine-tuned a ConvNeXt network in PyTorch as a two-class classifier: real or spoof.',
      'Evaluated the model on the competition’s held-out data and submitted predictions.',
    ],
    decisions:
      'ConvNeXt is a modern convolutional architecture that is strong at picking up fine visual cues, such as the texture, reflection and edge differences between skin and a printed or displayed face. Starting from pretrained weights lets the model learn those cues from a competition-sized dataset.',
  },
  {
    slug: 'football-poisson',
    short: 'Football scores',
    title: 'Football score prediction with bivariate Poisson',
    summary: 'A statistical model that predicts the final score of football matches.',
    context: 'GAMMAFEST IPB 2026',
    year: '2026',
    category: 'predictive',
    stack: ['Python', 'Statistics', 'Feature engineering'],
    repo: repo('gammafest-football-score-prediction'),
    visual: 'poisson',
    overview: 'Built for GAMMAFEST 2026 at IPB University: a statistical model that predicts the final score of a football match, not just who wins.',
    problem:
      'Predicting an exact scoreline is harder than predicting a winner. Goals are rare, count-valued events, and the two teams’ scores are not independent of each other.',
    approach: [
      'Engineered team-level features from historical match data.',
      'Modeled home and away goals together with a bivariate Poisson distribution.',
      'Read the most likely scoreline from the resulting table of joint probabilities.',
    ],
    decisions:
      'A Poisson distribution suits goal counts, and the bivariate form adds a shared term so the two teams’ goals can be correlated. That gives a full probability for every scoreline, which is more useful than a single win, draw or loss label.',
  },
  {
    slug: 'marketplace-analysis',
    short: 'Market analysis',
    title: 'Tokopedia and eBay market analysis',
    summary: 'Scraped Tokopedia and eBay product data and analyzed the market to produce business insights.',
    category: 'analytics',
    stack: ['Python', 'Tableau', 'Streamlit'],
    repo: repo('scrapping-tokopedia-ebay'),
    visual: 'market',
    overview: 'A market analysis that compares product listings on Tokopedia and eBay, from collecting the data to presenting the insights.',
    problem: 'Marketplace data is spread across thousands of listings and is not available as a ready-made dataset. To compare markets, the data first has to be collected and cleaned.',
    approach: [
      'Scraped product listings from Tokopedia and eBay with Python.',
      'Cleaned the data and compared the two marketplaces.',
      'Presented the insights in Tableau and an interactive Streamlit app.',
    ],
    decisions: 'Tableau is quick for exploring and sharing visual insight, while Streamlit turns the analysis into a small app that others can use without running the notebook.',
  },
  {
    slug: 'kinetic-modeling',
    short: 'Kinetic modeling',
    title: 'Nonlinear kinetic data modeling',
    summary: 'Estimated nonlinear kinetic parameters with the Newton–Raphson and bisection methods.',
    category: 'numerical',
    stack: ['Python', 'SciPy'],
    repo: repo('nonlinear-kinetic-data-modeling'),
    visual: 'newton',
    overview: 'A numerical methods project that estimates the parameters of a nonlinear kinetic model from data.',
    problem: 'Kinetic models are nonlinear in their parameters, so the equations that define the best estimate usually have no closed-form solution and must be solved numerically.',
    approach: [
      'Set up the nonlinear equations for the kinetic parameters.',
      'Solved them with the Newton–Raphson method.',
      'Used the bisection method on the same problem to compare results and robustness.',
    ],
    decisions:
      'Newton–Raphson converges quickly when it starts near the root but can diverge from a poor start. Bisection is slower but always converges inside a valid bracket, which makes it a good check on the faster method.',
  },
  {
    slug: 'weather-sarimax',
    short: 'Weather forecast',
    title: 'Weather forecasting with SARIMAX',
    summary: 'Compared ARIMA and SARIMAX models and tuned their parameters to improve forecast accuracy.',
    category: 'timeseries',
    stack: ['Python', 'ARIMA', 'SARIMAX'],
    repo: repo('weather-forecasting-SARIMAX'),
    visual: 'sarimax',
    overview: 'A time series project that forecasts weather data and compares a plain ARIMA model with a seasonal SARIMAX model.',
    problem: 'Weather follows strong seasonal cycles. A model that ignores seasonality will miss those repeating patterns and forecast poorly.',
    approach: [
      'Explored the series for trend and seasonality.',
      'Fitted an ARIMA model as a baseline.',
      'Fitted SARIMAX with seasonal terms and tuned its parameters to improve accuracy.',
    ],
    decisions: 'SARIMAX extends ARIMA with seasonal components and optional external variables, which suits data with a regular yearly or daily cycle.',
  },
];

const projectsId: Project[] = [
  {
    ...projectsEn[0],
    short: 'Face anti-spoofing',
    title: 'Face anti-spoofing dengan ConvNeXt',
    summary: 'Model computer vision untuk membedakan wajah asli dan wajah palsu.',
    overview: 'Dibuat untuk kompetisi data FIND IT 2026 di Universitas Gadjah Mada: model klasifikasi gambar yang menentukan apakah wajah di foto adalah orang asli atau palsu (spoof).',
    problem:
      'Sistem pengenalan wajah bisa dikelabui dengan menunjukkan foto cetak atau layar, bukan wajah asli. Tujuannya mendeteksi serangan seperti ini hanya dari gambar, agar sistem hanya menerima wajah asli.',
    approach: [
      'Memuat dan menyiapkan gambar wajah dengan OpenCV.',
      'Melakukan fine-tuning jaringan ConvNeXt di PyTorch sebagai klasifikasi dua kelas: asli atau spoof.',
      'Mengevaluasi model pada data uji kompetisi lalu mengirim prediksi.',
    ],
    decisions:
      'ConvNeXt adalah arsitektur konvolusional modern yang kuat menangkap detail visual halus, seperti perbedaan tekstur, pantulan, dan tepi antara kulit dan wajah yang dicetak atau ditampilkan di layar. Memulai dari bobot pretrained membuat model bisa mempelajarinya dari dataset seukuran kompetisi.',
  },
  {
    ...projectsEn[1],
    short: 'Skor sepak bola',
    title: 'Prediksi skor sepak bola dengan bivariate Poisson',
    summary: 'Model statistik untuk memprediksi skor akhir pertandingan sepak bola.',
    stack: ['Python', 'Statistika', 'Feature engineering'],
    overview: 'Dibuat untuk GAMMAFEST 2026 di IPB University: model statistik yang memprediksi skor akhir pertandingan sepak bola, bukan hanya pemenangnya.',
    problem: 'Memprediksi skor tepat lebih sulit daripada memprediksi pemenang. Gol adalah kejadian langka berupa hitungan, dan skor kedua tim tidak saling bebas.',
    approach: [
      'Merancang fitur tingkat tim dari data pertandingan historis.',
      'Memodelkan gol kandang dan tandang bersamaan dengan distribusi bivariate Poisson.',
      'Mengambil skor paling mungkin dari tabel probabilitas gabungan yang dihasilkan.',
    ],
    decisions:
      'Distribusi Poisson cocok untuk jumlah gol, dan bentuk bivariat menambahkan komponen bersama sehingga gol kedua tim bisa berkorelasi. Hasilnya adalah probabilitas untuk setiap skor, lebih berguna daripada sekadar label menang, seri, atau kalah.',
  },
  {
    ...projectsEn[2],
    short: 'Analisis pasar',
    title: 'Analisis pasar Tokopedia dan eBay',
    summary: 'Scraping data produk Tokopedia dan eBay, lalu menganalisis pasarnya untuk menghasilkan insight bisnis.',
    overview: 'Analisis pasar yang membandingkan listing produk di Tokopedia dan eBay, mulai dari pengumpulan data sampai penyajian insight.',
    problem: 'Data marketplace tersebar di ribuan listing dan tidak tersedia sebagai dataset siap pakai. Untuk membandingkan pasar, datanya harus dikumpulkan dan dibersihkan dulu.',
    approach: [
      'Scraping listing produk dari Tokopedia dan eBay dengan Python.',
      'Membersihkan data dan membandingkan kedua marketplace.',
      'Menyajikan insight di Tableau dan aplikasi interaktif Streamlit.',
    ],
    decisions: 'Tableau cepat untuk mengeksplorasi dan membagikan insight visual, sedangkan Streamlit mengubah analisis menjadi aplikasi kecil yang bisa dipakai orang lain tanpa menjalankan notebook.',
  },
  {
    ...projectsEn[3],
    short: 'Pemodelan kinetik',
    title: 'Pemodelan data kinetik nonlinear',
    summary: 'Mengestimasi parameter kinetik nonlinear dengan metode Newton–Raphson dan biseksi.',
    overview: 'Proyek metode numerik yang mengestimasi parameter model kinetik nonlinear dari data.',
    problem: 'Model kinetik bersifat nonlinear terhadap parameternya, sehingga persamaan untuk estimasi terbaik biasanya tidak punya solusi tertutup dan harus diselesaikan secara numerik.',
    approach: [
      'Menyusun persamaan nonlinear untuk parameter kinetik.',
      'Menyelesaikannya dengan metode Newton–Raphson.',
      'Memakai metode biseksi pada masalah yang sama untuk membandingkan hasil dan kestabilannya.',
    ],
    decisions:
      'Newton–Raphson konvergen cepat bila titik awalnya dekat akar, tetapi bisa divergen bila titik awalnya buruk. Biseksi lebih lambat namun selalu konvergen di dalam interval yang valid, sehingga cocok sebagai pembanding metode yang lebih cepat.',
  },
  {
    ...projectsEn[4],
    short: 'Prakiraan cuaca',
    title: 'Prakiraan cuaca dengan SARIMAX',
    summary: 'Membandingkan model ARIMA dan SARIMAX serta menyetel parameternya agar prakiraan lebih akurat.',
    overview: 'Proyek deret waktu untuk meramalkan data cuaca dan membandingkan model ARIMA biasa dengan model musiman SARIMAX.',
    problem: 'Cuaca mengikuti siklus musiman yang kuat. Model yang mengabaikan musiman akan melewatkan pola berulang itu dan menghasilkan prakiraan yang buruk.',
    approach: [
      'Mengeksplorasi tren dan pola musiman pada data.',
      'Membangun model ARIMA sebagai pembanding dasar.',
      'Membangun SARIMAX dengan komponen musiman dan menyetel parameternya agar lebih akurat.',
    ],
    decisions: 'SARIMAX memperluas ARIMA dengan komponen musiman dan variabel eksternal opsional, sehingga cocok untuk data dengan siklus tahunan atau harian yang teratur.',
  },
];

export const copy: Record<Lang, Copy> = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact', menu: 'Menu', close: 'Close' },
    pageLabel: { home: 'Home', about: 'About me', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    next: 'Next page',
    loading: 'Loading portfolio',
    hero: {
      badge: 'Data science portfolio 2026',
      hello: 'Hi, I’m',
      roles: ['Data science student', 'Machine learning enthusiast', 'Computer vision builder', 'Competition participant'],
      intro:
        'Data science student at UPN “Veteran” Jawa Timur. I build computer vision, forecasting and statistical models, and test them in national data science competitions.',
      ctaWork: 'View projects',
      ctaAbout: 'About me',
      cv: 'Download CV',
      stats: [
        { value: 3.73, decimals: 2, label: 'GPA out of 4.00' },
        { value: 5, label: 'Data science projects' },
        { value: 2, label: 'National competitions' },
      ],
      chips: ['Computer vision', 'Forecasting', 'Machine learning'],
      photoAlt: 'Portrait of Praja Lohphinesti Subiarto',
      footer: 'Portfolio 2026',
    },
    home: {
      stackLabel: 'Tools I work with',
      featuredLabel: 'Case studies',
      featuredTitle: 'Competition work',
      seeAll: 'See all projects',
      focusLabel: 'What I do',
      focusTitle: 'Three kinds of problems I like to solve',
      focus: [
        { title: 'Computer vision', body: 'Teaching models to read images, like telling a real face from a spoofed one.', route: 'projects' },
        { title: 'Prediction and forecasting', body: 'Statistical and time series models that put a number on what happens next.', route: 'projects' },
        { title: 'Data analytics', body: 'Collecting messy data, cleaning it and turning it into insight people can use.', route: 'projects' },
      ],
      exploreLabel: 'Explore',
      exploreTitle: 'More about me',
      explore: [
        { title: 'Behind the work', body: 'Education, competitions and how I got here.', route: 'about' },
        { title: 'Toolkit', body: 'The languages, libraries and tools I use.', route: 'skills' },
        { title: 'Say hello', body: 'Open to internships. Let’s talk.', route: 'contact' },
      ],
    },
    about: {
      label: 'About me',
      title: 'Transforming complex data into intelligent solutions.',
      body: [
        'I am a data science student at Universitas Pembangunan Nasional “Veteran” Jawa Timur with a deep interest in machine learning, computer vision, data mining and artificial intelligence.',
        'I develop predictive models, analyze complex data and take part in national data science competitions. I work mainly in Python and SQL, using a range of machine learning methods to deliver data-driven solutions.',
      ],
      facts: [
        { label: 'Based in', value: 'Surabaya, Indonesia' },
        { label: 'Studying', value: 'Data Science' },
        { label: 'Since', value: '2024' },
        { label: 'Open to', value: 'Internships' },
      ],
      educationTitle: 'Academic milestones',
      university: 'Universitas Pembangunan Nasional “Veteran” Jawa Timur',
      degree: 'Bachelor of Data Science',
      period: '2024 – present',
      gpa: 'GPA 3.73 / 4.00',
      coursesLabel: 'Relevant coursework',
      courses: ['Machine Learning', 'Deep Learning', 'Data Mining', 'Statistical Modeling', 'Big Data Processing'],
      timelineTitle: 'Experience and activities',
      timeline: [
        { year: '2026', title: 'FIND IT, Universitas Gadjah Mada', detail: 'Participant, face anti-spoofing with ConvNeXt', skills: ['Computer vision', 'PyTorch', 'ConvNeXt'] },
        { year: '2026', title: 'GAMMAFEST, IPB University', detail: 'Participant, football score prediction', skills: ['Statistical modeling', 'Feature engineering'] },
        { year: '2025', title: 'Akshaya', detail: 'Member of the PDD division' },
        { year: '2024', title: 'UPN “Veteran” Jawa Timur', detail: 'Started the Data Science program' },
      ],
      githubLabel: 'Open source',
      githubTitle: 'Code and contributions',
      githubBody: 'All my notebooks and models live on GitHub.',
      githubStats: { repos: 'Public repositories', followers: 'Followers', stars: 'Stars' },
      githubFallback: 'Live GitHub stats are not available here. Open my profile to see the latest activity.',
      githubOpen: 'Open GitHub profile',
    },
    work: {
      label: 'Selected work',
      title: 'Featured projects',
      intro: 'Five models, from faces to football to the weather. Open a card to read how each one works.',
      all: 'All',
      categories: { cv: 'Computer vision', predictive: 'Predictive modeling', analytics: 'Analytics', numerical: 'Numerical methods', timeseries: 'Time series' },
      competition: 'Competition',
      personal: 'Project',
      openRepo: 'View code',
      readCase: 'Read case study',
      allRepos: 'All repositories',
      back: 'Back to projects',
      meta: { type: 'Type', year: 'Year', category: 'Field', stack: 'Tech stack', code: 'Source code' },
      sections: { overview: 'Overview', problem: 'The problem and objective', approach: 'Approach', decisions: 'Key decisions' },
      nextProject: 'Next project',
      projects: projectsEn,
    },
    skills: {
      label: 'Technical expertise',
      title: 'Technical stack',
      intro: 'The tools I use to explore data, build models and present results.',
      groups: [
        { name: 'Programming', icon: 'code', items: ['Python', 'SQL', 'R'] },
        { name: 'Machine learning', icon: 'brain', items: ['scikit-learn', 'PyTorch', 'Deep learning', 'Predictive modeling', 'Feature engineering'] },
        { name: 'Computer vision', icon: 'eye', items: ['ConvNeXt', 'OpenCV', 'Image classification'] },
        { name: 'Data analytics', icon: 'chart', items: ['EDA', 'Statistical analysis', 'Time series', 'Data mining', 'Data wrangling', 'Tableau', 'Streamlit', 'Matplotlib', 'Seaborn'] },
        { name: 'Tools and environment', icon: 'tools', items: ['Jupyter Notebook', 'Google Colab', 'Git', 'VS Code'] },
      ],
    },
    contact: {
      label: 'Contact',
      title: 'Let’s connect and build something with data.',
      body: 'I am looking for opportunities as a data scientist, machine learning engineer or research assistant. Reach me on LinkedIn, or browse my code on GitHub.',
      status: 'Open to internships',
      footer: 'Designed and built by Praja Lohphinesti Subiarto',
      home: 'Back to home',
    },
    footer: {
      tagline: 'Data science student turning complex data into intelligent solutions.',
      pages: 'Pages',
      connect: 'Connect',
      top: 'Back to top',
    },
    langSwitch: 'ID',
    skip: 'Skip to content',
  },

  id: {
    nav: { home: 'Beranda', about: 'Tentang', projects: 'Proyek', skills: 'Keahlian', contact: 'Kontak', menu: 'Menu', close: 'Tutup' },
    pageLabel: { home: 'Beranda', about: 'Tentang saya', projects: 'Proyek', skills: 'Keahlian', contact: 'Kontak' },
    next: 'Halaman berikutnya',
    loading: 'Memuat portofolio',
    hero: {
      badge: 'Portofolio data science 2026',
      hello: 'Halo, saya',
      roles: ['Mahasiswa sains data', 'Antusias machine learning', 'Pembangun computer vision', 'Peserta kompetisi'],
      intro:
        'Mahasiswa sains data di UPN “Veteran” Jawa Timur. Saya membangun model computer vision, peramalan, dan statistik, lalu mengujinya di kompetisi data science tingkat nasional.',
      ctaWork: 'Lihat proyek',
      ctaAbout: 'Tentang saya',
      cv: 'Unduh CV',
      stats: [
        { value: 3.73, decimals: 2, label: 'IPK dari 4,00' },
        { value: 5, label: 'Proyek data science' },
        { value: 2, label: 'Kompetisi nasional' },
      ],
      chips: ['Computer vision', 'Peramalan', 'Machine learning'],
      photoAlt: 'Foto Praja Lohphinesti Subiarto',
      footer: 'Portofolio 2026',
    },
    home: {
      stackLabel: 'Alat yang saya pakai',
      featuredLabel: 'Studi kasus',
      featuredTitle: 'Karya kompetisi',
      seeAll: 'Lihat semua proyek',
      focusLabel: 'Yang saya kerjakan',
      focusTitle: 'Tiga jenis masalah yang saya suka selesaikan',
      focus: [
        { title: 'Computer vision', body: 'Mengajari model membaca gambar, seperti membedakan wajah asli dari wajah palsu.', route: 'projects' },
        { title: 'Prediksi dan peramalan', body: 'Model statistik dan deret waktu yang memberi angka pada apa yang terjadi berikutnya.', route: 'projects' },
        { title: 'Analitik data', body: 'Mengumpulkan data berantakan, membersihkannya, lalu mengubahnya menjadi insight yang bisa dipakai.', route: 'projects' },
      ],
      exploreLabel: 'Jelajahi',
      exploreTitle: 'Lebih jauh tentang saya',
      explore: [
        { title: 'Di balik karya', body: 'Pendidikan, kompetisi, dan perjalanan saya.', route: 'about' },
        { title: 'Perkakas', body: 'Bahasa, library, dan alat yang saya pakai.', route: 'skills' },
        { title: 'Sapa saya', body: 'Terbuka untuk magang. Mari ngobrol.', route: 'contact' },
      ],
    },
    about: {
      label: 'Tentang saya',
      title: 'Mengubah data kompleks menjadi solusi cerdas.',
      body: [
        'Saya mahasiswa Sains Data Universitas Pembangunan Nasional “Veteran” Jawa Timur dengan minat mendalam pada machine learning, computer vision, data mining, dan kecerdasan buatan.',
        'Saya mengembangkan model prediktif, menganalisis data kompleks, dan mengikuti kompetisi data science tingkat nasional. Saya bekerja terutama dengan Python dan SQL, memakai berbagai metode machine learning untuk menghasilkan solusi berbasis data.',
      ],
      facts: [
        { label: 'Domisili', value: 'Surabaya, Indonesia' },
        { label: 'Jurusan', value: 'Sains Data' },
        { label: 'Angkatan', value: '2024' },
        { label: 'Terbuka untuk', value: 'Magang' },
      ],
      educationTitle: 'Riwayat akademik',
      university: 'Universitas Pembangunan Nasional “Veteran” Jawa Timur',
      degree: 'S1 Sains Data',
      period: '2024 – sekarang',
      gpa: 'IPK 3,73 / 4,00',
      coursesLabel: 'Mata kuliah terkait',
      courses: ['Pembelajaran Mesin', 'Deep Learning', 'Penambangan Data', 'Pemodelan Statistik', 'Pemrosesan Big Data'],
      timelineTitle: 'Pengalaman dan kegiatan',
      timeline: [
        { year: '2026', title: 'FIND IT, Universitas Gadjah Mada', detail: 'Peserta, face anti-spoofing dengan ConvNeXt', skills: ['Computer vision', 'PyTorch', 'ConvNeXt'] },
        { year: '2026', title: 'GAMMAFEST, IPB University', detail: 'Peserta, prediksi skor sepak bola', skills: ['Pemodelan statistik', 'Feature engineering'] },
        { year: '2025', title: 'Akshaya', detail: 'Anggota divisi PDD' },
        { year: '2024', title: 'UPN “Veteran” Jawa Timur', detail: 'Mulai kuliah di program Sains Data' },
      ],
      githubLabel: 'Open source',
      githubTitle: 'Kode dan kontribusi',
      githubBody: 'Semua notebook dan model saya ada di GitHub.',
      githubStats: { repos: 'Repositori publik', followers: 'Pengikut', stars: 'Bintang' },
      githubFallback: 'Statistik GitHub langsung tidak tersedia di sini. Buka profil saya untuk melihat aktivitas terbaru.',
      githubOpen: 'Buka profil GitHub',
    },
    work: {
      label: 'Karya terpilih',
      title: 'Proyek unggulan',
      intro: 'Lima model, dari wajah, sepak bola, sampai cuaca. Buka kartunya untuk membaca cara kerja masing-masing.',
      all: 'Semua',
      categories: { cv: 'Computer vision', predictive: 'Pemodelan prediktif', analytics: 'Analitik', numerical: 'Metode numerik', timeseries: 'Deret waktu' },
      competition: 'Kompetisi',
      personal: 'Proyek',
      openRepo: 'Lihat kode',
      readCase: 'Baca studi kasus',
      allRepos: 'Semua repositori',
      back: 'Kembali ke proyek',
      meta: { type: 'Jenis', year: 'Tahun', category: 'Bidang', stack: 'Tech stack', code: 'Kode sumber' },
      sections: { overview: 'Gambaran umum', problem: 'Masalah dan tujuan', approach: 'Pendekatan', decisions: 'Keputusan utama' },
      nextProject: 'Proyek berikutnya',
      projects: projectsId,
    },
    skills: {
      label: 'Keahlian teknis',
      title: 'Tumpukan teknologi',
      intro: 'Alat yang saya pakai untuk mengeksplorasi data, membangun model, dan menyajikan hasil.',
      groups: [
        { name: 'Pemrograman', icon: 'code', items: ['Python', 'SQL', 'R'] },
        { name: 'Machine learning', icon: 'brain', items: ['scikit-learn', 'PyTorch', 'Deep learning', 'Pemodelan prediktif', 'Feature engineering'] },
        { name: 'Computer vision', icon: 'eye', items: ['ConvNeXt', 'OpenCV', 'Klasifikasi gambar'] },
        { name: 'Analitik data', icon: 'chart', items: ['EDA', 'Analisis statistik', 'Deret waktu', 'Data mining', 'Data wrangling', 'Tableau', 'Streamlit', 'Matplotlib', 'Seaborn'] },
        { name: 'Alat dan lingkungan kerja', icon: 'tools', items: ['Jupyter Notebook', 'Google Colab', 'Git', 'VS Code'] },
      ],
    },
    contact: {
      label: 'Kontak',
      title: 'Mari terhubung dan berkarya dengan data.',
      body: 'Saya sedang mencari peluang sebagai data scientist, machine learning engineer, atau asisten riset. Hubungi saya lewat LinkedIn, atau lihat kode saya di GitHub.',
      status: 'Terbuka untuk magang',
      footer: 'Dirancang dan dibangun oleh Praja Lohphinesti Subiarto',
      home: 'Kembali ke beranda',
    },
    footer: {
      tagline: 'Mahasiswa sains data yang mengubah data kompleks menjadi solusi cerdas.',
      pages: 'Halaman',
      connect: 'Terhubung',
      top: 'Kembali ke atas',
    },
    langSwitch: 'EN',
    skip: 'Langsung ke konten',
  },
};
