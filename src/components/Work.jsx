import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    title: 'Luna AI Vtuber',
    dates: 'Jan 2025 — Present',
    image: '/assets/FlagProject.png',
    desc: 'An AI-powered virtual streamer that goes live on Twitch and TikTok with zero human puppeteering. She reacts to events, plays Minecraft, and talks to chat using a custom LLM brain, ElevenLabs voice synthesis, and Groq inference.',
    tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js', 'Vite', 'React'],
    website: 'https://twitch.tv/luna_ai_vtuber',
    source: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
  },
  {
    title: 'ScholarFlow Analytics',
    dates: 'Sep 2024 — Dec 2024',
    image: '/assets/scholarflow.png',
    desc: 'Automated dashboard for GDG scholars. Syncs with Google Sheets API to track weekly stats, compute leaderboard rankings, and push updates to Discord.',
    tags: ['Node.js', 'Google Sheets API', 'Firebase'],
    website: null,
    source: 'https://github.com/Haruuowo/ScholarFlow',
  },
  {
    title: 'AetherCraft Autopilot',
    dates: 'May 2024 — Aug 2024',
    image: '/assets/aethercraft.png',
    desc: 'Autonomous reinforcement learning bot that navigates Minecraft environments, gathers resources, and avoids threats using computer vision and pathfinding.',
    tags: ['Python', 'OpenCV', 'Mineflayer'],
    website: null,
    source: 'https://github.com/john-harold',
  },
  {
    title: 'HAU CampusNav',
    dates: 'Feb 2024 — May 2024',
    image: '/assets/campusnav.png',
    desc: "Indoor navigation app for Holy Angel University. Uses Dijkstra's algorithm to map the fastest routes across campus halls in real-time.",
    tags: ['Flutter', 'Dart', 'Figma'],
    website: null,
    source: 'https://github.com/john-harold',
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

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
              <h2 className="sec-title">Projects</h2>
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
                <h4 className="proj-card-title">
                  {p.title}
                  <span className="proj-card-arrow">↗</span>
                </h4>
                <span className="proj-card-dates">{p.dates}</span>
                <p className="proj-card-desc">{p.desc}</p>
                <div className="proj-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-tag proj-tag-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}