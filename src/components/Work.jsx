import { useEffect, useRef, useState } from 'react'

const FEATURED_PROJECT = {
  title: 'Luna AI Vtuber',
  year: '2025',
  link: 'https://github.com/john-harold',
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
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="work-header">
          <div>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2 className="sec-title">Work</h2>
              <span className="sec-note">Projects</span>
            </div>
            <p className="work-intro">
              Things I've built — from AI agents to mobile apps.
            </p>
          </div>
        </div>

        {/* Featured */}
        <div className={`wk-featured reveal ${visible ? 'visible' : ''}`}>
          <div className="wk-featured-img-wrap">
            <a href={FEATURED_PROJECT.link} target="_blank" rel="noreferrer">
              <img src={FEATURED_PROJECT.image} alt={FEATURED_PROJECT.title} loading="lazy" />
              <div className="wk-img-overlay">
                <span>View project ↗</span>
              </div>
            </a>
          </div>
          <div className="wk-featured-info">
            <div className="wk-featured-meta">
              <span className="wk-badge">Featured</span>
              <span className="wk-year">{FEATURED_PROJECT.year}</span>
            </div>
            <h3 className="wk-featured-title">{FEATURED_PROJECT.title}</h3>
            <p className="wk-featured-desc">{FEATURED_PROJECT.desc}</p>
            <div className="wk-featured-tags">
              {FEATURED_PROJECT.tags.map(t => (
                <span key={t} className="wk-tag">{t}</span>
              ))}
            </div>
            <a href={FEATURED_PROJECT.link} target="_blank" rel="noreferrer" className="wk-link">
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project Table */}
        <div className={`wk-table reveal ${visible ? 'visible' : ''}`}>
          <div className="wk-table-head">
            <span>No.</span>
            <span>Project</span>
            <span className="wk-col-role">Role</span>
            <span className="wk-col-year">Year</span>
            <span className="wk-col-tags">Stack</span>
          </div>
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="wk-table-row"
            >
              <span className="wk-num">{p.num}</span>
              <div className="wk-row-main">
                <span className="wk-row-title">{p.title}</span>
                <span className="wk-row-desc">{p.desc}</span>
              </div>
              <span className="wk-col-role wk-row-role">{p.role}</span>
              <span className="wk-col-year wk-row-year">{p.year}</span>
              <div className="wk-col-tags wk-row-tags">
                {p.tags.map(t => (
                  <span key={t} className="wk-tag wk-tag-sm">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}