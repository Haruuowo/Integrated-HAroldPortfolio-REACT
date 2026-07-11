import { useEffect, useRef, useState } from 'react'

const FEATURED_PROJECT = {
  title: 'Luna AI Vtuber',
  year: '2026',
  link: 'https://your-flag-project-link.com',
  image: '/assets/FlagProject.png',
  desc: 'Luna is an AI-powered virtual streamer that broadcasts live on Twitch and TikTok, engaging with chat in real time through natural conversation, voice interaction, and autonomous gameplay in Minecraft. Built in Python with a Node.js bridge for game control, Luna combines a custom LLM-driven personality with real-time text-to-speech, giving her a distinct, sarcastic, and unscripted on-stream presence, with no human puppeteering required.',
  tags: ['Python', 'Groq', 'ElevenLabs'],
}

const PROJECTS = [
  {
    title: 'Project Two',
    status: 'Completed',
    link: 'https://project-two-link.com',
    desc: 'Short description of this project. What it does and what you built.',
    tags: ['Unity', 'C#', 'Firebase'],
  },
  {
    title: 'Project Three',
    status: 'Completed',
    link: 'https://project-three-link.com',
    desc: 'Short description of this project. What it does and what you built.',
    tags: ['Python', 'FastAPI', 'Android'],
  },
  {
    title: 'Project Four',
    status: 'Completed',
    link: 'https://project-four-link.com',
    desc: 'Short description of this project. What it does and what you built.',
    tags: ['React', 'Tailwind', 'Vercel'],
  },
]

function PlaceholderImage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef}>
      <div className="container">
        <div className="work-header">
          <div>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2 className="sec-title">Work</h2>
              <span className="sec-note">Projects</span>
            </div>
            <p className="work-intro">
              A selection of things I've built, from AI agents to interactive applications.
            </p>
          </div>
        </div>

        {/* Featured Project */}
        <div className={`project-featured reveal ${visible ? 'visible' : ''}`}>
          <a href={FEATURED_PROJECT.link} target="_blank" rel="noreferrer" className="project-featured-img">
            <img src={FEATURED_PROJECT.image} alt={`${FEATURED_PROJECT.title} Preview`} loading="lazy" />
            <div className="project-img-overlay">
              <span className="project-view-hint">View Case Study</span>
            </div>
          </a>
          <div className="project-featured-content">
            <div className="project-meta-row">
              <span className="project-featured-label">Featured Project</span>
              <span className="project-year">{FEATURED_PROJECT.year}</span>
            </div>
            <h3 className="project-featured-title">{FEATURED_PROJECT.title}</h3>
            <p className="project-featured-desc">{FEATURED_PROJECT.desc}</p>
            <div className="project-featured-tags">
              {FEATURED_PROJECT.tags.map((tag) => (
                <span key={tag} className="project-featured-tag">{tag}</span>
              ))}
            </div>
            <a href={FEATURED_PROJECT.link} target="_blank" rel="noreferrer" className="project-featured-link">
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project List */}
        <div className={`project-list reveal ${visible ? 'visible' : ''}`}>
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-list-item"
            >
              <div className="project-list-visual">
                <div className="project-list-img-wrap no-image-placeholder">
                  <PlaceholderImage />
                </div>
              </div>
              <div className="project-list-body">
                <div className="project-list-top">
                  <h4 className="project-list-title">{project.title}</h4>
                  <span className="project-list-status">{project.status}</span>
                </div>
                <p className="project-list-desc">{project.desc}</p>
                <div className="project-list-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-list-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}