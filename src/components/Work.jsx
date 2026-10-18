import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    title: 'Luna AI Vtuber',
    category: 'Autonomous AI Streamer',
    dates: 'Jan 2025 — Present',
    image: '/assets/FlagProject.png',
    desc: 'An AI-powered virtual streamer that goes live on Twitch and TikTok with zero human puppeteering. Features autonomous event reactions, gameplay, and real-time voice chat via custom LLM brains, ElevenLabs synthesis, and Groq inference.',
    tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'Vite', 'React'],
    website: 'https://twitch.tv/luna_ai_vtuber',
    source: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
    featured: true,
  },
  {
    title: 'ScholarFlow Analytics',
    category: 'Automated Dashboard',
    dates: 'Sep 2024 — Dec 2024',
    image: '/assets/scholarflow.png',
    desc: 'Automated analytics platform for GDG scholars. Integrates with Google Sheets API to track weekly cohort progression, compute dynamic leaderboard rankings, and broadcast automated updates to Discord.',
    tags: ['Node.js', 'Google Sheets API', 'Firebase', 'Discord Bot'],
    website: null,
    source: 'https://github.com/Haruuowo/ScholarFlow',
    featured: false,
  },
  {
    title: 'AetherCraft Autopilot',
    category: 'Reinforcement Learning',
    dates: 'May 2024 — Aug 2024',
    image: '/assets/aethercraft.png',
    desc: 'Autonomous reinforcement learning agent that navigates complex voxel environments, automates resource gathering, and mitigates hazards using computer vision, telemetry loops, and pathfinding algorithms.',
    tags: ['Python', 'OpenCV', 'Mineflayer', 'Machine Learning'],
    website: null,
    source: 'https://github.com/Haruuowo',
    featured: false,
  },
  {
    title: 'HAU CampusNav',
    category: 'Mobile Indoor Navigation',
    dates: 'Feb 2024 — May 2024',
    image: '/assets/campusnav.png',
    desc: "Indoor campus navigation application for Holy Angel University students. Implements Dijkstra's shortest path algorithm to map optimal routes across multi-floor campus facilities in real-time.",
    tags: ['Flutter', 'Dart', 'Figma', 'Algorithms'],
    website: null,
    source: 'https://github.com/Haruuowo',
    featured: false,
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef}>
      <div className="container">

        {/* Section Header */}
        <div className={`proj-header reveal ${visible ? 'visible' : ''}`}>
          <div className="proj-header-left">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2 className="sec-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="sec-title-icon">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                Projects
              </h2>
              <span className="sec-note">Things I've built</span>
            </div>
            <p className="proj-intro">
              From AI agents to mobile apps — a collection of things I've shipped, broken, and shipped again.
            </p>
          </div>
          <a
            href="https://github.com/Haruuowo"
            target="_blank"
            rel="noreferrer"
            className="proj-github-link"
          >
            View all on GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className={`proj-grid reveal ${visible ? 'visible' : ''}`}>
          {PROJECTS.map((p, idx) => (
            <div key={idx} className="proj-card">
              {/* Image Container with Badges */}
              <div className="proj-card-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="proj-card-links">
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-link-badge"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Website
                    </a>
                  )}
                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-link-badge"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Source
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="proj-card-body">
                <div className="proj-card-header">
                  <span className="proj-cat-badge">{p.category}</span>
                  <span className="proj-card-dates">{p.dates}</span>
                </div>
                <h4 className="proj-card-title">
                  {p.title}
                </h4>
                <p className="proj-card-desc">{p.desc}</p>
                <div className="proj-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-tag proj-tag-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="proj-card-actions">
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-btn proj-btn-live"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Live Demo ↗
                    </a>
                  )}
                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-btn proj-btn-code"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}