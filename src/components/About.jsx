import { useState } from 'react'

const PILLARS = [
  {
    title: 'AI & Autonomous Systems',
    desc: 'Custom LLM brains, speech synthesis pipelines (ElevenLabs, Groq), and autonomous streaming agents.',
  },
  {
    title: 'Modern Full-Stack',
    desc: 'Fast, responsive web apps with React, Node.js, REST APIs, and clean, intuitive interfaces.',
  },
  {
    title: 'Applied Engineering',
    desc: 'Pathfinding algorithms, automated data-sync dashboards, and practical developer tools.',
  },
]

const FACTS = [
  { label: 'Based in', value: 'Pampanga, Philippines' },
  { label: 'University', value: 'Holy Angel University' },
  { label: 'Studying', value: 'BS Computer Science' },
  { label: 'Community', value: 'GDG on Campus · Internal Relations' },
]

const TAGS = [
  'Artificial Intelligence',
  'Software Engineering',
  'Full-Stack Web',
  'Autonomous Agents',
  'Computer Vision',
  'REST APIs'
]

export default function About() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('harolddoton@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about">
      <div className="container">
        <div className="sec-head sec-head-stack">
          <span className="sec-kicker">01 — About</span>
          <h2 className="sec-title">A student who ships.</h2>
        </div>

        <div className="about-layout">
          <figure className="about-photo">
            <div className="about-photo-frame">
              <img
                src="/assets/PHOTO.jpg"
                alt="John Harold Doton"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <figcaption>
              <strong>John Harold Doton</strong>
              <span>Computer Science Student &amp; Developer</span>
            </figcaption>
          </figure>

          <div className="about-copy">
            <p className="story-lead">
              I'm Harold — I turn imaginative technical ideas into working software that
              delivers genuine utility.
            </p>
            <p className="story-body">
              My work spans fully autonomous AI streamers powered by custom LLM brains and
              real-time voice synthesis, to responsive web dashboards for student developer
              communities. I like the boundary where artificial intelligence meets clean human
              interfaces — shipping code that is performant, practical, and fun.
            </p>

            <dl className="about-facts">
              {FACTS.map((f) => (
                <div key={f.label} className="about-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about-tagstrip">
              {TAGS.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <button
              type="button"
              className="btn-copy-email"
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied to clipboard' : 'harolddoton@gmail.com'}
            </button>
          </div>
        </div>

        <ol className="pillars-list">
          {PILLARS.map((p, idx) => (
            <li className="pillar" key={p.title}>
              <span className="pillar-num">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}