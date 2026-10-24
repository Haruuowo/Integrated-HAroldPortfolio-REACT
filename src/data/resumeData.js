/* ─── Resume Data ─────────────────────────────────────────────────────── */

export const PERSONAL_INFO = {
  name: 'John Harold D. Doton',
  title: 'AI/ML Engineer | Computer Science Student',
  location: 'San Rafael, Bulaon, San Fernando, Pampanga, Philippines',
  email: 'harolddoton@gmail.com',
  phone: '0936-029-6134',
  linkedin: 'linkedin.com/in/harolddoton',
  linkedinUrl: 'https://www.linkedin.com/in/harolddoton',
  github: 'github.com/Haruuowo',
  githubUrl: 'https://github.com/Haruuowo',
  portfolio: 'haroldportfolio.vercel.app',
  portfolioUrl: 'https://haroldportfolio.vercel.app',
}

export const TECHNICAL_SKILLS = {
  languages: ['Python', 'JavaScript/TypeScript', 'Java', 'Go', 'Kotlin'],
  ai_ml: [
    'Transformer fine-tuning (Whisper/HuggingFace)',
    'transfer learning',
    'RAG',
    'TTS pipelines',
    'scikit-learn',
  ],
  mobile: ['Android (Accessibility Service API)', 'Kotlin'],
  web: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'REST APIs', 'Supabase'],
  tools_platforms: [
    'Git',
    'GitHub',
    'Supabase',
    'Google Colab',
    'Node.js',
    'LibreOffice',
    'whisper.cpp',
    'VS Code',
    'Antigravity',
  ],
  concepts: [
    'Data Structures & Algorithms (NeetCode 150)',
    'ML theory fundamentals',
    'offline-first architecture',
  ],
}

export const EXPERIENCE_ITEMS = [
  {
    title: 'Internal Officer',
    company: 'Google Developer Group (GDG) HAU',
    location: 'Angeles City, Pampanga',
    date: '2024 – Present',
    logo: '/assets/gdg.jpg',
    role_type: 'Leadership',
    highlights: [
      'Spearheaded technical workshops and coordinated community hackathons, facilitating hands-on learning for 100+ student developers in cloud and mobile technologies.',
    ],
  },
]

export const PROJECTS = [
  {
    title: 'HandsFree (Capstone): Offline Voice-Controlled Android App',
    shortTitle: 'HandsFree',
    type: 'Capstone Project',
    date: '2024 – Present',
    role: 'Lead Developer & Researcher',
    stack: 'Kotlin, Whisper, Android Accessibility Service API',
    technologies: ['Android', 'Kotlin', 'OpenAI Whisper', 'WebRTC', 'RNNoise', 'Accessibility Service API'],
    link: 'https://github.com/Haruuowo',
    image: '/assets/FlagProject.png',
    highlights: [
      'Designed an offline overlay Android app capturing voice commands in Filipino, English, and Taglish with zero network dependency and zero data transmission.',
      'Architected a translation normalization layer, a transformer-based ASR fine-tuning pipeline (OpenAI Whisper), and an intent classifier dispatching simulated gestures via the Accessibility Service API.',
      'Fine-tuned on a Tagalog-English-Taglish corpus (Mozilla Common Voice, Google FLEURS, LibriSpeech) using cross-entropy loss and gradient-based optimization.',
      'Implemented noise suppression (WebRTC/RNNoise) and confidence thresholding for out-of-vocabulary rejection.',
      'Delivered five core functions: App Launching, Smart Search, Messaging, Accepting Calls, and Scheduling.',
    ],
  },
  {
    title: 'Luna (AI VTuber)',
    shortTitle: 'Luna AI VTuber',
    type: 'Personal Project',
    date: '2026 – Present',
    role: 'Solo Developer',
    stack: 'LLM, TTS, RAG',
    technologies: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'LLM', 'TTS', 'RAG'],
    link: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
    image: '/assets/FlagProject.png',
    highlights: [
      'Building a real-time AI virtual streamer powered by an LLM/TTS/RAG stack with Twitch and TikTok Live integration.',
      'Architecting a RAG memory layer and speech synthesis pipeline for interactive, personality-consistent live responses.',
    ],
  },
  {
    title: 'SmartSort (Intelligent File Organizer)',
    shortTitle: 'SmartSort',
    type: 'Desktop Application',
    date: '2026',
    role: 'Solo Developer',
    stack: 'Python, PyWebView, HTML/CSS/JS, SQLite',
    technologies: ['Python', 'PyWebView', 'HTML/CSS/JS', 'SQLite', 'PyInstaller', 'pytest'],
    link: 'https://github.com/Haruuowo/SmartSort',
    image: '/assets/smartsort.png',
    highlights: [
      'Built a desktop file organizer with a modern dashboard UI that classifies files by content signatures instead of extensions, with EXIF-aware photo sorting by year and month.',
      'Implemented a YAML-based custom rule engine, exact-duplicate detection, dry run mode, and real-time folder watching for automatic organization.',
      'Designed a SQLite history system that logs every file move so any operation can be undone; added unit tests with pytest and packaged a standalone Windows executable with PyInstaller.',
    ],
  },
  {
    title: 'PhishPolluter (Anti-Phishing Data Pollution Tool)',
    shortTitle: 'PhishPolluter',
    type: 'Security & Automation Tool',
    date: '2026',
    role: 'Solo Developer',
    stack: 'Python',
    technologies: ['Python', 'Automation', 'Ethical Security', 'REST APIs'],
    link: 'https://github.com/Haruuowo',
    image: null,
    highlights: [
      'Built a Python tool demonstrating web automation, rate limiting, rotating user-agents, and human-like request pacing as a study in ethical offensive security.',
      'Added ethical guardrails: configurable submission limits, disclaimer documentation, and a reporting workflow (Google Safe Browsing, DICT-CICC, registrar abuse channels).',
    ],
  },
  {
    title: 'ReactionCam (Real-Time Gesture & Expression Detector)',
    shortTitle: 'ReactionCam',
    type: 'Computer Vision Application',
    date: '2024',
    role: 'Solo Developer',
    stack: 'Python, MediaPipe, OpenCV, Pygame',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'Computer Vision'],
    link: 'https://github.com/Haruuowo/Reaction-image-project',
    image: '/assets/reactionimage.png',
    highlights: [
      'Developed a real-time computer vision app using MediaPipe and OpenCV to identify 8 distinct facial affects and manual gestures from live video.',
      'Engineered a synchronized pipeline integrating facial landmark triangulation and hand pose estimation with event-driven audio-visual feedback via Pygame.',
    ],
  },
]

export const FEATURED_PROJECTS = PROJECTS

export const EDUCATION = [
  {
    school: 'Holy Angel University',
    location: 'Angeles City, Pampanga',
    degree: 'Bachelor of Science in Computer Science, School of Computing',
    date: 'Expected 2025',
    logo: '/assets/hau.png',
    relevant_coursework: [
      'Data Structures & Algorithms',
      'Machine Learning',
      'Mobile Development',
      'Software Engineering',
    ],
  },
]

export const CERTIFICATIONS = [
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: '2023',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    url: 'https://www.freecodecamp.org/certification/haruuowo/responsive-web-design',
  },
  {
    name: 'Relational Database V8',
    issuer: 'freeCodeCamp',
    year: '2025',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    url: 'https://www.freecodecamp.org/certification/haruuowo/relational-database-v8',
  },
]
