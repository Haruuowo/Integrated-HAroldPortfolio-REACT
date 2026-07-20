/* ─── Resume Data ─────────────────────────────────────────────────────── */

export const PERSONAL_INFO = {
  name: 'Harold',
  title: 'Software Engineer & AI/ML Enthusiast',
  location: 'Bulaon, Pampanga, Philippines',
  email: 'harold@email.com',
  linkedin: 'linkedin.com/in/harold',
  github: 'github.com/harold',
}

export const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Holy Angel University',
    location: 'Angeles City, Pampanga, Philippines',
    date: 'Expected 2025',
    logo: '/assets/hau.png',
    details: 'School of Computing',
    relevant_coursework: ['Data Structures & Algorithms', 'Machine Learning', 'Mobile Development', 'Software Engineering'],
    capstone: 'HandsFree — Offline Voice-Controlled Android App (Tagalog/English/Taglish ASR)',
  },
]

export const EXPERIENCE_ITEMS = [
  {
    title: 'Lead Developer & Researcher',
    company: 'HandsFree: Offline Hands-Free Android Application',
    organization: 'Holy Angel University',
    date: 'January 2024 — Present',
    logo: '/assets/handsfree.png',
    role_type: 'Capstone/Research',
    highlights: [
      'Designed an offline overlay Android app capturing voice commands in Filipino, English, and Taglish with zero network dependency and zero data transmission.',
      'Architected a translation normalization layer, transformer-based ASR fine-tuning pipeline (OpenAI Whisper), and intent classifier dispatching simulated gestures via Android Accessibility Service API.',
      'Applied transfer learning via fine-tuning on Tagalog-English-Taglish corpus (Mozilla Common Voice, Google FLEURS, LibriSpeech) using cross-entropy loss and gradient-based optimization.',
      'Implemented noise suppression preprocessing (WebRTC/RNNoise) and confidence thresholding for out-of-vocabulary rejection.',
      'Delivered five core app functions: App Launching, Smart Search, Messaging, Accepting Calls, and Scheduling.',
    ],
  },
  {
    title: 'Internal Relations Officer',
    company: 'Google Developer Group (GDG) HAU',
    organization: 'Holy Angel University Chapter',
    date: 'January 2024 — Present',
    logo: '/assets/gdg.jpg',
    role_type: 'Leadership',
    highlights: [],
  },
]

export const FEATURED_PROJECTS = [
  {
    title: 'Luna — AI VTuber',
    type: 'Personal Project',
    date: '2024 — Present',
    status: 'In Development',
    link: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
    image: '/assets/FlagProject.png',
    description: 'Building a real-time AI virtual streamer powered by an LLM/TTS/RAG stack with Twitch and TikTok Live integration.',
    highlights: [
      'Building a real-time AI virtual streamer powered by an LLM/TTS/RAG stack with Twitch and TikTok Live integration.',
      'Architecting retrieval-augmented generation (RAG) memory layer and speech synthesis pipeline for interactive, personality-consistent live responses.',
    ],
    technologies: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'LLM', 'TTS', 'RAG'],
    role: 'Solo Developer',
  },
  {
    title: 'HandsFree',
    type: 'Capstone Project',
    date: '2024 — Present',
    status: 'Active Development',
    link: 'https://github.com/Haruuowo',
    image: '/assets/handsfree.png',
    description: 'Offline voice-controlled Android application with support for Tagalog, English, and Taglish (ASR).',
    highlights: [
      'Zero network dependency and zero data transmission',
      'Transformer-based ASR fine-tuning using OpenAI Whisper',
      'Android Accessibility Service API for gesture simulation',
      'Five core functions: App Launching, Smart Search, Messaging, Accepting Calls, Scheduling',
    ],
    technologies: ['Android', 'Kotlin', 'OpenAI Whisper', 'Python', 'WebRTC', 'RNNoise'],
    role: 'Lead Developer & Researcher',
  },
]

export const TECHNICAL_SKILLS = {
  languages: ['Python', 'JavaScript/TypeScript', 'Java', 'Go', 'Kotlin'],
  ai_ml: ['Transformer fine-tuning (Whisper/HuggingFace)', 'Transfer learning', 'RAG', 'TTS pipelines', 'scikit-learn'],
  mobile: ['Android', 'Accessibility Service API', 'Kotlin'],
  tools_platforms: ['Git', 'GitHub', 'Google Colab', 'Node.js', 'whisper.cpp', 'sherpa-onnx'],
  concepts: ['Data Structures & Algorithms (NeetCode 150)', 'ML theory fundamentals', 'Offline-first architecture'],
}

export const ADDITIONAL_INFO = {
  languages: ['Filipino (native)', 'English (professional proficiency)', 'Taglish'],
  interests: ['AI/ML Engineering', 'Speech Recognition', 'VTubing Technology', 'Competitive Programming'],
}

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
