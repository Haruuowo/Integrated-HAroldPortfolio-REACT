/**
 * GitHub API Integration Service
 * Fetches public repositories for Haruuowo and normalizes them for the portfolio.
 */

const GITHUB_USERNAME = 'Haruuowo'
const CACHE_KEY = `gh_repos_${GITHUB_USERNAME}_v3`
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes cache

// Curated metadata enhancements for known repos
const REPO_METADATA_OVERRIDES = {
  AI_VirtualYoutuber: {
    title: 'Luna AI Vtuber',
    category: 'Autonomous AI Streamer',
    image: '/assets/FlagProject.png',
    featured: true,
    curated: true,
    customDesc: 'An AI-powered virtual streamer that goes live on Twitch and TikTok with zero human puppeteering. Driven by LLM brains, ElevenLabs synthesis, and Groq inference.',

    tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'Vite', 'React'],
  },
  SmartSort: {
    title: 'SmartSort — Desktop File Organizer',
    category: 'Intelligent Desktop GUI',
    image: '/assets/smartsort.png',
    featured: true,
    curated: true,
    tags: ['Python', 'CustomTkinter', 'Desktop App', 'Automation', 'File Management'],
    customDesc: 'An intelligent, rule-based file organizer with a sleek desktop GUI for automated workspace cleanup and file categorizations.',
  },
  procastimate_app: {
    title: 'Procastimate Mobile App',
    category: 'Mobile / Productivity',
    image: '/assets/procastimate.png',
    featured: true,
    curated: true,
    tags: ['Flutter', 'Dart', 'Mobile UI', 'State Management'],
    customDesc: 'A productivity and focus companion built in Flutter, tackling procrastination through interactive task tracking and minimalist mobile design.',
  },
  'CityPopDiscography-APSI': {
    title: 'CityPop Discography',
    category: 'Web Application',
    image: '/assets/citypopreact.png',
    website: 'https://city-pop-discography-apsi.vercel.app',
    featured: true,
    curated: true,
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel', 'Audio'],
    customDesc: 'Interactive discography portal celebrating vintage City Pop culture and Japanese 80s aesthetics with album discovery and audio showcase.',
  },
  'Reaction-image-project': {
    title: 'Reaction Image Bot',
    category: 'Python Automation',
    image: '/assets/reactionimage.png',
    featured: true,
    curated: true,
    tags: ['Python', 'Image Processing', 'CLI / Automation'],
    customDesc: 'Automated media classifier and reaction gif/image pipeline for fast contextual chat interactions.',
  },
  WEBCS_Website: {
    title: 'WebCS Showcase Portal',
    category: 'Web Engineering',
    tags: ['JavaScript', 'HTML5', 'Responsive Design', 'CSS3'],
    customDesc: 'Official Computer Science web portal and resources hub featuring responsive layouts and modern interactive components.',
  },
  PhishingPolluter: {
    title: 'PhishingPolluter',
    category: 'Cybersecurity / Anti-Fraud',
    tags: ['Python', 'Cybersecurity', 'Automation', 'Network Requests'],
    customDesc: 'Security testing utility that generates deceptive synthetic telemetry to disrupt malicious phishing credential harvesters.',
  },
  'INTELSYS-FIINALSPROJ-giT': {
    title: 'Intelligent Systems ML Engine',
    category: 'Machine Learning / Data Science',
    tags: ['Python', 'Jupyter Notebook', 'Machine Learning', 'Data Analysis'],
    customDesc: 'Machine learning classification and predictive intelligence pipeline built for Intelligent Systems coursework finals.',
  },
  ScholarFlow: {
    title: 'ScholarFlow Analytics',
    category: 'Automated Dashboard',
    image: '/assets/scholarflow.png',
    featured: false,
    tags: ['Node.js', 'Google Sheets API', 'Firebase', 'Discord Bot'],
    customDesc: 'Automated analytics platform for GDG scholars. Integrates with Google Sheets API to compute real-time leaderboards and dispatch Discord updates.',
  },
  AetherCraft: {
    title: 'AetherCraft Autopilot',
    category: 'Reinforcement Learning',
    image: '/assets/aethercraft.png',
    featured: false,
    tags: ['Python', 'OpenCV', 'Mineflayer', 'Machine Learning'],
    customDesc: 'Autonomous reinforcement learning agent that navigates complex voxel environments using computer vision and 3D pathfinding.',
  },
  CampusNav: {
    title: 'HAU CampusNav',
    category: 'Mobile Indoor Navigation',
    image: '/assets/campusnav.png',
    featured: false,
    tags: ['Flutter', 'Dart', 'Figma', 'Dijkstra'],
    customDesc: 'Indoor campus navigation application for Holy Angel University students. Implements Dijkstra algorithm to map optimal paths across campus buildings.',
  },
}

// Fallback curated projects if GitHub API is unreachable/offline
export const FALLBACK_PROJECTS = [
  {
    id: 'luna',
    repoName: 'AI_VirtualYoutuber',
    title: 'Luna AI Vtuber',
    category: 'Autonomous AI Streamer',
    dates: 'Jan 2025 – Present',
    image: '/assets/FlagProject.png',
    desc: 'An AI-powered virtual streamer that goes live on Twitch and TikTok with zero human puppeteering. Features autonomous event reactions, gameplay, and real-time voice chat via custom LLM brains, ElevenLabs synthesis, and Groq inference.',
    tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'Vite', 'React'],
    website: 'https://twitch.tv/luna_ai_vtuber',
    source: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
    stars: 1,
    featured: true,
    curated: true,
  },
  {
    id: 'smartsort',
    repoName: 'SmartSort',
    title: 'SmartSort — Desktop File Organizer',
    category: 'Intelligent Desktop GUI',
    dates: 'Updated Oct 2026',
    image: '/assets/smartsort.png',
    desc: 'An intelligent, rule-based file organizer with a sleek desktop GUI for automated workspace cleanup and file categorizations.',
    tags: ['Python', 'CustomTkinter', 'Desktop App', 'Automation'],
    website: null,
    source: 'https://github.com/Haruuowo/SmartSort',
    stars: 2,
    featured: true,
    curated: true,
  },
  {
    id: 'procastimate',
    repoName: 'procastimate_app',
    title: 'Procastimate Mobile App',
    category: 'Mobile / Productivity',
    dates: '2025 – Present',
    image: '/assets/procastimate.png',
    desc: 'A productivity and focus companion built in Flutter, tackling procrastination through interactive task tracking and minimalist mobile design.',
    tags: ['Flutter', 'Dart', 'Mobile UI'],
    website: null,
    source: 'https://github.com/Haruuowo/procastimate_app',
    stars: 0,
    featured: true,
    curated: true,
  },
  {
    id: 'citypop',
    repoName: 'CityPopDiscography-APSI',
    title: 'CityPop Discography',
    category: 'Web Application',
    dates: 'Aug 2026 – Present',
    image: '/assets/citypopreact.png',
    desc: 'Interactive discography portal celebrating vintage City Pop culture and Japanese 80s aesthetics with album discovery and audio showcase.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
    website: 'https://city-pop-discography-apsi.vercel.app',
    source: 'https://github.com/Haruuowo/CityPopDiscography-APSI',
    stars: 0,
    featured: true,
    curated: true,
  },
  {
    id: 'reaction-image',
    repoName: 'Reaction-image-project',
    title: 'Reaction Image Bot',
    category: 'Python Automation',
    dates: 'Updated 2026',
    image: '/assets/reactionimage.png',
    desc: 'Automated media classifier and reaction gif/image pipeline for fast contextual chat interactions.',
    tags: ['Python', 'Image Processing', 'CLI / Automation'],
    website: null,
    source: 'https://github.com/Haruuowo/Reaction-image-project',
    stars: 0,
    featured: true,
    curated: true,
  },
  {
    id: 'scholarflow',
    repoName: 'ScholarFlow',
    title: 'ScholarFlow Analytics',
    category: 'Automated Dashboard',
    dates: 'Sep 2024 – Dec 2024',
    image: '/assets/scholarflow.png',
    desc: 'Automated analytics platform for GDG scholars. Integrates with Google Sheets API to track weekly cohort progression, compute dynamic leaderboard rankings, and broadcast automated updates to Discord.',
    tags: ['Node.js', 'Google Sheets API', 'Firebase', 'Discord Bot'],
    website: null,
    source: 'https://github.com/Haruuowo/ScholarFlow',
    stars: 0,
    featured: false,
    curated: false,
  },
  {
    id: 'campusnav',
    repoName: 'CampusNav',
    title: 'HAU CampusNav',
    category: 'Mobile Indoor Navigation',
    dates: 'Feb 2024 – May 2024',
    image: '/assets/campusnav.png',
    desc: "Indoor campus navigation application for Holy Angel University students. Implements Dijkstra's shortest path algorithm to map optimal routes across multi-floor campus facilities in real-time.",
    tags: ['Flutter', 'Dart', 'Figma', 'Algorithms'],
    website: null,
    source: 'https://github.com/Haruuowo',
    stars: 0,
    featured: false,
    curated: false,
  },
]

/**
 * Format ISO date string into readable "Month Year"
 */
function formatDate(isoStr) {
  if (!isoStr) return 'Active'
  try {
    const d = new Date(isoStr)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return 'Active'
  }
}

/**
 * Clean up raw repository name into human-readable title
 */
function humanizeRepoName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Normalizes a raw GitHub repository item into the project card schema
 */
export function normalizeRepo(repo) {
  const override = REPO_METADATA_OVERRIDES[repo.name] || {}

  // Gather tags: prioritize language and topics
  const tagsSet = new Set()
  if (override.tags) {
    override.tags.forEach((t) => tagsSet.add(t))
  } else {
    if (repo.language) tagsSet.add(repo.language)
    if (Array.isArray(repo.topics)) {
      repo.topics.slice(0, 4).forEach((top) => {
        // Beautify common topic slugs
        const pretty = top.replace(/-/g, ' ')
        tagsSet.add(pretty.charAt(0).toUpperCase() + pretty.slice(1))
      })
    }
    if (tagsSet.size === 0) tagsSet.add('Software')
  }

  const category =
    override.category ||
    (repo.language ? `${repo.language} Project` : 'Software Project')

  const title = override.title || humanizeRepoName(repo.name)
  const desc =
    override.customDesc ||
    repo.description ||
    `Open source ${repo.language || 'software'} project on GitHub.`

  const dates = override.dates || `Updated ${formatDate(repo.pushed_at || repo.updated_at)}`
  const website = override.website || repo.homepage || null
  const source = repo.html_url

  const CURATED_REPOS = [
    'AI_VirtualYoutuber',
    'SmartSort',
    'procastimate_app',
    'CityPopDiscography-APSI',
    'Reaction-image-project',
  ]
  const isCurated = CURATED_REPOS.includes(repo.name)

  return {
    id: repo.id ? String(repo.id) : repo.name,
    repoName: repo.name,
    title,
    category,
    dates,
    image: override.image || null,
    desc,
    tags: Array.from(tagsSet),
    website,
    source,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    pushedAt: repo.pushed_at,
    featured: isCurated,
    curated: isCurated,
    language: repo.language,
  }
}

/**
 * Fetch Haruuowo's public repositories with localStorage caching
 */
export async function fetchGitHubProjects(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { timestamp, data } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
          return { projects: data, source: 'cache', timestamp }
        }
      }
    } catch (err) {
      console.warn('GitHub cache read error:', err)
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`)
    }

    const repos = await res.json()
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response format from GitHub')
    }

    const EXCLUDED_REPOS = [
      'integrated-haroldportfolio-react',
      'harold-portfolio',
      'my-portfolio',
      'john-harold-portfolio',
    ]

    // Exclude forks, portfolio repos, and normalize
    const normalized = repos
      .filter((r) => {
        if (r.fork) return false
        const lower = r.name.toLowerCase()
        if (EXCLUDED_REPOS.includes(lower)) return false
        if (lower.includes('portfolio')) return false
        return true
      })
      .map(normalizeRepo)

    // Save to localStorage
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: normalized,
        })
      )
    } catch (e) {
      console.warn('Failed to cache GitHub repos to localStorage:', e)
    }

    return { projects: normalized, source: 'live', timestamp: Date.now() }
  } catch (err) {
    console.error('Failed to fetch from GitHub API:', err)

    // Fall back to cached data even if expired, else fallback projects
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached)
        if (Array.isArray(data) && data.length > 0) {
          return { projects: data, source: 'stale-cache', error: err.message }
        }
      }
    } catch {
      // ignore
    }

    return { projects: FALLBACK_PROJECTS, source: 'fallback', error: err.message }
  }
}
