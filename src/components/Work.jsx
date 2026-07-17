import { useEffect, useRef, useState } from 'react'

const FEATURED_PROJECT = {
  title: 'Luna AI Vtuber',
  year: '2025',
  link: 'https://github.com/Haruuowo/AI_VirtualYoutuber',
  image: '/assets/FlagProject.png',
  desc: 'An AI-powered virtual streamer that goes live on Twitch and TikTok with zero human puppeteering. Built in Python with a Node.js bridge — she talks to chat, reacts to events, and plays Minecraft on her own using a custom LLM personality, real-time voice synthesis via ElevenLabs, and a Groq-powered brain.',
  tags: ['Python', 'Groq', 'ElevenLabs', 'Node.js'],
}

const PROJECTS = [
  {
    num: '01',
    title: 'ScholarFlow Analytics',
    year: '2024',
    role: 'Sole Developer',
    link: 'https://github.com/john-harold',
    desc: 'Automated dashboard for GDG scholars. Syncs with Google Sheets API to track weekly stats, compute leaderboard rankings, and push updates to Discord.',
    tags: ['Node.js', 'Google Sheets API', 'Firebase'],
  },
  {
    num: '02',
    title: 'AetherCraft Autopilot',
    year: '2024',
    role: 'Sole Developer',
    link: 'https://github.com/john-harold',
    desc: 'Autonomous reinforcement learning bot that navigates Minecraft environments, gathers resources, and avoids threats using computer vision and pathfinding.',
    tags: ['Python', 'OpenCV', 'Mineflayer'],
  },
  {
    num: '03',
    title: 'HAU CampusNav',
    year: '2024',
    role: 'Lead Developer',
    link: 'https://github.com/john-harold',
    desc: "Indoor navigation app for Holy Angel University. Uses Dijkstra's algorithm to map the fastest routes across campus halls in real-time.",
    tags: ['Flutter', 'Dart', 'Figma'],
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

        {/* Featured Hero Card */}
        <div className={`proj-hero reveal ${visible ? 'visible' : ''}`}>
          <a
            href={FEATURED_PROJECT.link}
            target="_blank"
            rel="noreferrer"
            className="proj-hero-img-wrap"
          >
            <img src={FEATURED_PROJECT.image} alt={FEATURED_PROJECT.title} loading="lazy" />
            <div className="proj-hero-overlay">
              <span className="proj-hero-hint">View project ↗</span>
            </div>
          </a>
          <div className="proj-hero-body">
            <div className="proj-hero-top">
              <span className="proj-badge">Featured</span>
              <span className="proj-year-tag">{FEATURED_PROJECT.year}</span>
            </div>
            <h3 className="proj-hero-title">{FEATURED_PROJECT.title}</h3>
            <p className="proj-hero-desc">{FEATURED_PROJECT.desc}</p>
            <div className="proj-hero-tags">
              {FEATURED_PROJECT.tags.map(t => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
            <a href={FEATURED_PROJECT.link} target="_blank" rel="noreferrer" className="proj-cta">
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className={`proj-grid reveal ${visible ? 'visible' : ''}`}>
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="proj-card"
            >
              <div className="proj-card-top">
                <span className="proj-card-num">{p.num}</span>
                <span className="proj-card-year">{p.year}</span>
              </div>
              <h4 className="proj-card-title">{p.title}</h4>
              <p className="proj-card-desc">{p.desc}</p>
              <div className="proj-card-tags">
                {p.tags.map(t => (
                  <span key={t} className="proj-tag proj-tag-sm">{t}</span>
                ))}
              </div>
              <div className="proj-card-footer">
                <span className="proj-card-role">{p.role}</span>
                <span className="proj-card-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}