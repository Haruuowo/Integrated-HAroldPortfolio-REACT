import { useEffect, useRef, useCallback, useState } from 'react'
import { ALL_SKILLS } from '../data/skillsData'



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
    name: 'Google Data Analytics Certificate',
    issuer: 'Google / Coursera',
    year: '2024',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: '2023',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2023',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React – The Complete Guide',
    issuer: 'Udemy',
    year: '2024',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
]

/* ─── Fibonacci sphere helper ──────────────────────────────────── */
function fibonacciSphere(count) {
  const points = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })
  }
  return points
}

/* ─── Sphere sub-component ─────────────────────────────────────── */
function SkillsSphere({ isSmall }) {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const stateRef = useRef({
    rotX: 0.3, rotY: 0,
    velX: 0, velY: 0.003,
    dragging: false, lastX: 0, lastY: 0,
    hovered: false, raf: null,
    points: fibonacciSphere(ALL_SKILLS.length),
    radius: isSmall ? 150 : 210,
  })

  const getRadius = () => {
    const w = window.innerWidth
    if (w < 480) return 100
    if (w < 768) return 130
    if (w < 1024) return 150
    return isSmall ? 150 : 210
  }

  const project = useCallback(() => {
    const s = stateRef.current
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const p = s.points[i]
      const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX)
      const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY)
      const x1 = p.x * cosY - p.z * sinY
      const z1 = p.x * sinY + p.z * cosY
      const y1 = p.y * cosX - z1 * sinX
      const z2 = p.y * sinX + z1 * cosX
      const scale = (z2 + 1.8) / 2.8
      const opacity = 0.25 + scale * 0.75
      el.style.transform = `translate(-50%,-50%) translate3d(${x1 * s.radius}px,${y1 * s.radius}px,0) scale(${0.55 + scale * 0.55})`
      el.style.opacity = opacity
      el.style.zIndex = Math.round(scale * 100)
      el.style.filter = z2 < -0.2 ? `blur(${(-z2 - 0.2) * 2}px)` : 'none'
    })
  }, [])

  const tick = useCallback(() => {
    const s = stateRef.current
    if (!s.dragging) {
      const speedMultiplier = s.hovered ? 0.15 : 1
      s.rotY += s.velY * speedMultiplier
      s.rotX = Math.max(-0.6, Math.min(0.6, s.rotX + s.velX * speedMultiplier))
    }
    if (s.dragging) { s.velY *= 0.92; s.velX *= 0.92 }
    project()
    s.raf = requestAnimationFrame(tick)
  }, [project])

  const onMouseDown = useCallback((e) => {
    const s = stateRef.current
    s.dragging = true; s.lastX = e.clientX; s.lastY = e.clientY
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
  }, [])
  const onMouseMove = useCallback((e) => {
    const s = stateRef.current
    if (!s.dragging) return
    const dx = e.clientX - s.lastX; const dy = e.clientY - s.lastY
    s.velY = dx * 0.006; s.velX = dy * 0.006
    s.rotY += s.velY; s.rotX += s.velX
    s.lastX = e.clientX; s.lastY = e.clientY
  }, [])
  const onMouseUp = useCallback(() => {
    stateRef.current.dragging = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }, [])
  const onTouchStart = useCallback((e) => {
    const s = stateRef.current
    s.dragging = true; s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY
  }, [])
  const onTouchMove = useCallback((e) => {
    e.preventDefault()
    const s = stateRef.current
    if (!s.dragging) return
    const dx = e.touches[0].clientX - s.lastX; const dy = e.touches[0].clientY - s.lastY
    s.velY = dx * 0.006; s.velX = dy * 0.006
    s.rotY += s.velY; s.rotX += s.velX
    s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY
  }, [])
  const onTouchEnd = useCallback(() => { stateRef.current.dragging = false }, [])

  useEffect(() => {
    const s = stateRef.current
    s.radius = getRadius()
    const onResize = () => { s.radius = getRadius() }
    window.addEventListener('resize', onResize)
    window.addEventListener('mouseup', onMouseUp)
    s.raf = requestAnimationFrame(tick)
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [tick, onMouseUp, isSmall])

  return (
    <div
      ref={containerRef}
      className="sphere-scene"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseEnter={() => { stateRef.current.hovered = true }}
      onMouseLeave={() => { stateRef.current.hovered = false; stateRef.current.dragging = false }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="sphere-stage">
        {ALL_SKILLS.map((skill, i) => (
          <div
            key={skill.name}
            ref={el => cardRefs.current[i] = el}
            className={`sphere-pill${skill.mono ? ' mono' : ''}`}
          >
            <img src={skill.icon} alt={skill.name} loading="lazy" draggable={false} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
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
      {CERTS.map((cert, i) => (
        <div className="sk-cert-card" key={i}>
          <div className="sk-cert-icon">
            <img src={cert.icon} alt={cert.issuer} loading="lazy" />
          </div>
          <div className="sk-cert-info">
            <p className="sk-cert-name">{cert.name}</p>
            <p className="sk-cert-meta">{cert.issuer} · {cert.year}</p>
          </div>
          <span className="sk-cert-badge">Certified</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Main Skills section ──────────────────────────────────────── */
const TABS = [
  { id: 'skills', label: 'Technical Skills', hint: 'drag to spin · hover to slow' },
  { id: 'soft', label: 'Soft Skills', hint: '' },
  { id: 'certs', label: 'Certifications', hint: '' },
]

const SKILL_CATS = ['Languages', 'Frameworks', 'Databases', 'Tools', 'Design']

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