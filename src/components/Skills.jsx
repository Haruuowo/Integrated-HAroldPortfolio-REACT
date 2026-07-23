import { useEffect, useRef, useCallback, useState } from 'react'
import { ALL_SKILLS } from '../data/skillsData'
import { Cloud } from 'react-icon-cloud'

/* ─── Soft Skills data ─────────────────────────────────────────── */
const SOFT_SKILLS = [
  {
    label: 'Self-Directed Learning',
    desc: 'Constantly picking up new tools outside of class — currently deep into ML pipelines and AI integrations.'
  },
  {
    label: 'Adaptability',
    desc: 'Comfortable jumping between different tech stacks and problem domains depending on what the project needs.'
  },
  {
    label: 'Time Management',
    desc: 'Balancing a full CS degree, personal projects, and structured interview prep all at once.'
  },
  {
    label: 'Communication',
    desc: 'Used to keeping teammates aligned and flagging blockers early, especially during crunch periods.'
  },
  {
    label: 'Problem Solving',
    desc: 'Breaking down vague or difficult requirements into scoped, actionable steps — then actually shipping them.'
  }
]

/* ─── Certifications data ──────────────────────────────────────── */
const CERTS = [
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

const cloudOptions = {
  clickToFront: 500,
  depth: 0.9,
  imageScale: 2,
  initial: [0.1, -0.1],
  outlineColour: '#0000',
  reverse: true,
  tooltip: 'native',
  tooltipDelay: 0,
  wheelZoom: false,
  dragControl: true,
  noSelect: true,
  pinchZoom: false,
  freezeActive: false,
  minSpeed: 0.008,
  maxSpeed: 0.03,
}

/* ─── Sphere sub-component (Magic UI react-icon-cloud) ─────────── */
function SkillsSphere() {
  return (
    <div className="sphere-scene" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '360px' }}>
      <Cloud options={cloudOptions}>
        {ALL_SKILLS.map((skill) => (
          <a
            key={skill.name}
            href="#"
            onClick={(e) => e.preventDefault()}
            title={`${skill.name} (${skill.years})`}
            style={{ display: 'inline-block', padding: '10px' }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              height="42"
              width="42"
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </a>
        ))}
      </Cloud>
    </div>
  )
}

/* ─── Soft Skills sub-component ────────────────────────────────── */
function SoftSkillsPanel() {
  return (
    <div className="sk-panel sk-soft-skills-container">
      <ul className="sk-soft-list">
        {SOFT_SKILLS.map((item, i) => (
          <li className="sk-soft-item" key={i}>
            <span className="sk-soft-bullet">▸</span>
            <div className="sk-soft-content">
              <h4 className="sk-soft-title">{item.label}</h4>
              <p className="sk-soft-desc">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Certifications sub-component ────────────────────────────── */
function CertsPanel() {
  return (
    <div className="sk-panel sk-certs">
      {CERTS.map((cert, i) => {
        const cardInner = (
          <>
            <div className="sk-cert-icon">
              <img src={cert.icon} alt={cert.issuer} loading="lazy" />
            </div>
            <div className="sk-cert-info">
              <p className="sk-cert-name">{cert.name}</p>
              <p className="sk-cert-meta">{cert.issuer} · {cert.year}</p>
            </div>
            <span className="sk-cert-badge">Certified</span>
          </>
        )

        return cert.url ? (
          <a
            key={i}
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="sk-cert-card"
          >
            {cardInner}
          </a>
        ) : (
          <div className="sk-cert-card" key={i}>
            {cardInner}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main Skills section ──────────────────────────────────────── */
const TABS = [
  { id: 'skills', label: 'Technical Skills', hint: 'drag to spin · hover to slow' },
  { id: 'soft', label: 'Soft Skills', hint: '' },
  { id: 'certs', label: 'Certifications', hint: '' },
]

const SKILL_CATS = ['Languages', 'Tools', 'LLMs', 'Frameworks', 'Design', 'Databases']

export default function Skills() {
  const [activeTab, setActiveTab] = useState('skills')
  const [showList, setShowList] = useState(false)

  return (
    <section id="skills">
      <div className="container">
        {/* Section header with tab switcher */}
        <div className="sk-header">
          <div className="sk-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`sk-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'skills' && (
            <span className="sec-note">drag to spin · hover to slow</span>
          )}
        </div>

        {/* Panel content — key forces remount → re-triggers fade animation */}
        <div className="sk-content" key={activeTab}>
          {activeTab === 'skills' && (
            <div className={`skills-container${showList ? ' with-sphere' : ''}`}>
              <div className="skills-sphere-wrapper" style={{ flexDirection: 'column', gap: '20px' }}>
                <SkillsSphere isSmall={showList} />
                {!showList && (
                  <button
                    onClick={() => setShowList(true)}
                    className="sphere-toggle-btn"
                    style={{ padding: '8px 18px', fontSize: '0.75rem', marginTop: '10px' }}
                    type="button"
                  >
                    Show Proficiency List
                  </button>
                )}
              </div>
              <div className={`skills-list-wrapper ${showList ? 'visible' : 'hidden'}`}>
                <div className="skills-list-header">
                  <h3 className="skills-list-title">TECHNICAL SKILLS</h3>
                  <button
                    onClick={() => setShowList(false)}
                    className="sphere-toggle-btn"
                    type="button"
                  >
                    Hide Details
                  </button>
                </div>
                <div className="skills-cat-list">
                  {SKILL_CATS.map(cat => {
                    const items = ALL_SKILLS.filter(s => s.cat === cat)
                    if (!items.length) return null
                    return (
                      <div className="skill-cat-group" key={cat}>
                        <span className="skill-cat-label">{cat}</span>
                        <div className="skill-cat-items">
                          {items.map(skill => (
                            <div className="skill-cat-row" key={skill.name}>
                              <img src={skill.icon} alt={skill.name} className="skill-cat-icon" loading="lazy" />
                              <span className="skill-cat-name">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'soft' && <SoftSkillsPanel />}
          {activeTab === 'certs' && <CertsPanel />}
        </div>
      </div>
    </section>
  )
}