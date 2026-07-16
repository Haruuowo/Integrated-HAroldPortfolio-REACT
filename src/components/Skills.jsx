import { useEffect, useRef, useCallback, useState } from 'react'

/* ─── Skill proficiency data (years = display label, pct = bar fill 0-100) ── */
const ALL_SKILLS = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', years: '2 yrs', pct: 80 },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', years: '2 yrs', pct: 75 },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', years: '2.5 yrs', pct: 82 },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', years: '3 mo', pct: 40 },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', years: '1.5 yrs', pct: 75 },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', years: '1.5 yrs', pct: 70 },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', years: '1 yr', pct: 65, mono: true },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', years: '3 yrs', pct: 90 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', years: '1 yr', pct: 60 },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', years: '1.5 yrs', pct: 68 },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', years: '3 yrs', pct: 88 },
  { name: 'Dart / Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', years: '1 yr', pct: 60 },
  { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', years: '3 yrs', pct: 85 },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', years: '1.5 yrs', pct: 65 },
  { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', years: '1 yr', pct: 55 },
]


/* ─── Soft Skills data ─────────────────────────────────────────── */
const SOFT_SKILLS = [
  { label: 'Problem Solving', level: 'Advanced', icon: '🧩' },
  { label: 'Team Collaboration', level: 'Advanced', icon: '🤝' },
  { label: 'Communication', level: 'Intermediate', icon: '💬' },
  { label: 'Critical Thinking', level: 'Advanced', icon: '🧠' },
  { label: 'Adaptability', level: 'Advanced', icon: '⚡' },
  { label: 'Time Management', level: 'Intermediate', icon: '⏱️' },
  { label: 'Project Leadership', level: 'Intermediate', icon: '🎯' },
  { label: 'Attention to Detail', level: 'Advanced', icon: '🔍' },
  { label: 'Creative Thinking', level: 'Advanced', icon: '💡' },
  { label: 'Continuous Learning', level: 'Advanced', icon: '📚' },
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
    paused: false, raf: null,
    points: fibonacciSphere(ALL_SKILLS.length),
    radius: isSmall ? 190 : 260,
  })

  const getRadius = () => {
    const w = window.innerWidth
    if (w < 480) return 130
    if (w < 768) return 160
    if (w < 1024) return 180
    return isSmall ? 190 : 260
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
    if (!s.paused && !s.dragging) {
      s.rotY += s.velY
      s.rotX = Math.max(-0.6, Math.min(0.6, s.rotX + s.velX))
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
      onMouseEnter={() => { stateRef.current.paused = true }}
      onMouseLeave={() => { stateRef.current.paused = false; stateRef.current.dragging = false }}
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
    <div className="sk-panel sk-soft-skills">
      {SOFT_SKILLS.map((item, i) => (
        <div className="sk-soft-card glass" key={i}>
          <div className="sk-soft-header">
            <span className="sk-soft-icon">{item.icon}</span>
            <h4 className="sk-soft-title">{item.label}</h4>
          </div>
          <span className="sk-soft-level">{item.level}</span>
        </div>
      ))}
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

export default function Skills() {
  const [activeTab, setActiveTab] = useState('skills')
  const [showSphere, setShowSphere] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (activeTab === 'skills') {
      setAnimate(false)
      const timer = setTimeout(() => setAnimate(true), 100)
      return () => clearTimeout(timer)
    }
  }, [activeTab])

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
            <div className={`skills-container${showSphere ? ' with-sphere' : ''}`}>
              {showSphere && (
                <div className="skills-sphere-wrapper">
                  <SkillsSphere isSmall={true} />
                </div>
              )}
              <div className="skills-list-wrapper">
                <div className="skills-list-header">
                  <h3 className="skills-list-title">TECHNICAL SKILLS</h3>
                  <button
                    onClick={() => setShowSphere(!showSphere)}
                    className="sphere-toggle-btn"
                    type="button"
                  >
                    {showSphere ? 'Hide Sphere' : '← Show Sphere'}
                  </button>
                </div>
                <div className="skills-progress-list">
                  {[...ALL_SKILLS]
                    .sort((a, b) => b.pct - a.pct)
                    .map((skill) => (
                    <div className="skill-progress-item" key={skill.name}>
                      <div className="skill-progress-meta">
                        <span className="skill-progress-name">{skill.name}</span>
                        <span className="skill-progress-years">{skill.years}</span>
                      </div>
                      <div className="skill-progress-bar-bg">
                        <div
                          className="skill-progress-bar-fill"
                          style={{ width: animate ? `${skill.pct}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
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