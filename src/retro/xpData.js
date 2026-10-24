export const WALLPAPERS = [
  { id: 'night', name: 'Cyber Midnight', src: '/assets/background_images/betternightimage.png' },
  { id: 'summer', name: 'Sunset Amber', src: '/assets/background_images/summer.png' },
  { id: 'bliss', name: 'Classic Bliss', src: '/xp/bliss_full.jpg' },
  { id: 'light', name: 'Daylight Warm', src: '/assets/background_images/backgroundimage_light.png' },
  { id: 'dark', name: 'Dark Slate Solid', src: null, color: '#0a0a0f' }
]

export const PROJECTS = [
  {
    id: 'luna',
    title: 'Luna AI Vtuber',
    folderName: 'Luna_AI_Vtuber',
    category: 'Autonomous AI Streamer',
    dates: 'Jan 2025 – Present',
    image: '/assets/FlagProject.png',
    summary: 'An autonomous AI-powered virtual streamer that broadcasts on Twitch and TikTok with zero human puppeteering.',
    desc: 'Luna autonomously interacts with stream chat, plays games, and reacts in real-time. Driven by custom LLM prompt architectures, Groq ultra-low-latency inference, and ElevenLabs speech synthesis.',
    tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'Vite', 'React', 'LLMs'],
    website: 'https://twitch.tv/luna_ai_vtuber',
    source: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
    specs: [
      'Zero-human intervention livestream orchestration',
      'Real-time voice generation with ElevenLabs custom voice clones',
      'High-speed sentiment analysis and chat comprehension via Groq',
      'Dynamic OBS websocket visual overlay controllers'
    ]
  },
  {
    id: 'scholarflow',
    title: 'ScholarFlow Analytics',
    folderName: 'ScholarFlow_Analytics',
    category: 'Automated Dashboard',
    dates: 'Sep 2024 – Dec 2024',
    image: '/assets/scholarflow.png',
    summary: 'Automated performance sync and progress platform for Google Developer Group scholars.',
    desc: 'Integrates directly with Google Sheets API to compute real-time leaderboards, track cohort task completion rates, and dispatch automated alerts to Discord.',
    tags: ['Node.js', 'Google Sheets API', 'Firebase', 'Discord Bot', 'REST APIs'],
    website: null,
    source: 'https://github.com/Haruuowo/ScholarFlow',
    specs: [
      'Synchronizes weekly scholar metrics across distributed cohorts',
      'Automated cron sync pipelines saving 10+ leadership hours/week',
      'Dynamic Discord embed notifications via webhook automation'
    ]
  },
  {
    id: 'aethercraft',
    title: 'AetherCraft Autopilot',
    folderName: 'AetherCraft_Agent',
    category: 'Reinforcement Learning',
    dates: 'May 2024 – Aug 2024',
    image: '/assets/aethercraft.png',
    summary: 'Autonomous reinforcement learning agent navigating 3D voxel sandbox environments.',
    desc: 'Uses computer vision and spatial pathfinding to navigate complex voxel terrains, gather resources, craft equipment, and survive hostile encounters.',
    tags: ['Python', 'OpenCV', 'Mineflayer', 'Machine Learning', 'A* Pathfinding'],
    website: null,
    source: 'https://github.com/Haruuowo',
    specs: [
      'Autonomous spatial navigation using 3D A* and jump-point search',
      'Object recognition and block telemetry with OpenCV loops',
      'Long-horizon goal planner for multi-step crafting trees'
    ]
  },
  {
    id: 'campusnav',
    title: 'HAU CampusNav',
    folderName: 'HAU_CampusNav',
    category: 'Mobile Indoor Navigation',
    dates: 'Feb 2024 – May 2024',
    image: '/assets/campusnav.png',
    summary: 'Turn-by-turn indoor routing app for Holy Angel University students.',
    desc: "Mobile application mapping optimal indoor paths between complex campus buildings, departments, and classrooms using Dijkstra's shortest-path algorithm.",
    tags: ['Flutter', 'Dart', 'Figma', 'Dijkstra Algorithm', 'Mobile Dev'],
    website: null,
    source: 'https://github.com/Haruuowo',
    specs: [
      'Multi-floor indoor campus blueprint graph navigation',
      'Real-time path computation with accessibility elevators routing',
      'Custom SVG-based interactive floor maps and search directory'
    ]
  }
]

export const ABOUT_TXT = `JOHN HAROLD DOTON
==================================================
Computer Science Student & Software Engineer
Holy Angel University · Pampanga, Philippines
Contact: harolddoton@gmail.com
GitHub:  https://github.com/Haruuowo
LinkedIn: https://www.linkedin.com/in/harolddoton

ABOUT ME:
--------------------------------------------------
I am a passionate Computer Science student and software 
engineer who builds autonomous AI agents, machine learning 
systems, and full-stack web applications.

Whether it is engineering an autonomous AI streamer like 
Luna that runs 24/7 on Twitch and TikTok, training RL agents 
in sandbox games, or building student community tools for 
Google Developer Groups, I love shipping software that 
combines real engineering rigor with creative utility.

LEADERSHIP & AFFILIATIONS:
--------------------------------------------------
* Internal Relations Officer — GDG on Campus HAU (2024 - 2025)
* BS Computer Science — Holy Angel University (2023 - Present)

CORE FOCUS AREAS:
--------------------------------------------------
1. AI & Autonomous Systems (Groq, ElevenLabs, LLMs, Computer Vision)
2. Full-Stack Web Development (React, Node.js, Vite, REST APIs)
3. Systems & Mobile Engineering (Flutter, Dart, Python, Java, SQL)
`

export const SKILLS_TXT = `INSTALLED SYSTEM SKILLS & TECHNOLOGIES
==================================================
PROGRAMMING LANGUAGES:
  * Python (3 years) — AI/ML, Agents, Automation, Scripting
  * JavaScript / TypeScript (2.5 years) — React, Node, Web APIs
  * Java (3 years) — Object-Oriented Software & Algorithms
  * Dart / Flutter (1 year) — Mobile App Development
  * SQL (2 years) — PostgreSQL, MySQL, Data Modeling
  * HTML5 / CSS3 (3 years) — Responsive UI Design & Animations

AI & MACHINE LEARNING:
  * Groq API (High-speed Llama3 / Mixtral inference)
  * ElevenLabs (TTS & real-time voice synthesis)
  * OpenAI & Google Gemini APIs (RAG, agent pipelines)
  * OpenCV (Computer vision & image analysis)
  * PyTorch & HuggingFace (Model fine-tuning)

FRAMEWORKS & LIBRARIES:
  * React & Vite (Modern frontend applications)
  * Node.js & Express (Backend APIs & webhooks)
  * Flutter (Cross-platform iOS/Android)

DATABASES & CLOUD:
  * PostgreSQL & MySQL
  * Firebase & Supabase
  * AWS & Linux Servers (Ubuntu / Debian / Docker)
  * Git & GitHub
`

export const INITIAL_FILESYSTEM = {
  id: 'root',
  name: 'My Computer',
  path: 'C:\\',
  children: [
    {
      id: 'my-documents',
      name: 'My Documents',
      path: 'C:\\Documents and Settings\\Harold\\My Documents',
      type: 'folder',
      icon: 'documents',
      children: [
        {
          id: 'projects-folder',
          name: 'Projects',
          path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects',
          type: 'folder',
          icon: 'folder',
          children: [
            {
              id: 'proj-luna',
              name: 'Luna_AI_Vtuber',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\Luna_AI_Vtuber',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'luna-readme', name: 'README.txt', type: 'text', content: 'Luna AI Vtuber: Autonomous AI Streamer on Twitch & TikTok powered by Groq and ElevenLabs.' },
                { id: 'luna-img', name: 'Screenshot.png', type: 'image', src: '/assets/FlagProject.png' },
                { id: 'luna-link', name: 'Twitch_Stream.url', type: 'link', url: 'https://twitch.tv/luna_ai_vtuber' },
                { id: 'luna-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo/AI_VirtualYoutuber' }
              ]
            },
            {
              id: 'proj-scholarflow',
              name: 'ScholarFlow_Analytics',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\ScholarFlow_Analytics',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'sf-readme', name: 'README.txt', type: 'text', content: 'ScholarFlow Analytics: Automated dashboard synchronizing GDG scholar performance metrics via Google Sheets API.' },
                { id: 'sf-img', name: 'Dashboard.png', type: 'image', src: '/assets/scholarflow.png' },
                { id: 'sf-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo/ScholarFlow' }
              ]
            },
            {
              id: 'proj-aethercraft',
              name: 'AetherCraft_Agent',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\AetherCraft_Agent',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'ac-readme', name: 'README.txt', type: 'text', content: 'AetherCraft Autopilot: Autonomous reinforcement learning agent with 3D pathfinding and computer vision.' },
                { id: 'ac-img', name: 'Preview.png', type: 'image', src: '/assets/aethercraft.png' },
                { id: 'ac-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo' }
              ]
            },
            {
              id: 'proj-smartsort',
              name: 'SmartSort_Organizer',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\SmartSort_Organizer',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'ss-readme', name: 'README.txt', type: 'text', content: 'SmartSort: An intelligent, rule-based desktop file organizer built with Python and CustomTkinter.' },
                { id: 'ss-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo/SmartSort' }
              ]
            },
            {
              id: 'proj-procastimate',
              name: 'Procastimate_Flutter_App',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\Procastimate_Flutter_App',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'pc-readme', name: 'README.txt', type: 'text', content: 'Procastimate App: Cross-platform mobile focus companion engineered with Flutter and Dart.' },
                { id: 'pc-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo/procastimate_app' }
              ]
            },
            {
              id: 'proj-campusnav',
              name: 'HAU_CampusNav',
              path: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects\\HAU_CampusNav',
              type: 'folder',
              icon: 'folder',
              children: [
                { id: 'cn-readme', name: 'README.txt', type: 'text', content: 'HAU CampusNav: Mobile indoor wayfinding app using Dijkstra algorithm for Holy Angel University.' },
                { id: 'cn-img', name: 'App_Interface.png', type: 'image', src: '/assets/campusnav.png' },
                { id: 'cn-gh', name: 'GitHub_Repository.url', type: 'link', url: 'https://github.com/Haruuowo' }
              ]
            }
          ]
        },
        {
          id: 'about-doc',
          name: 'About_Me.txt',
          type: 'text',
          content: ABOUT_TXT
        },
        {
          id: 'skills-doc',
          name: 'Skills_Overview.txt',
          type: 'text',
          content: SKILLS_TXT
        },
        {
          id: 'photo-doc',
          name: 'Harold_Photo.jpg',
          type: 'image',
          src: '/assets/HAROLDPHOTO1.jpg'
        },
        {
          id: 'resume-doc',
          name: 'Harold_Resume.pdf',
          type: 'pdf',
          src: '/assets/Harold_Resume.pdf'
        }
      ]
    }
  ]
}
