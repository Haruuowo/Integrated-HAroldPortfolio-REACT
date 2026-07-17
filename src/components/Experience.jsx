import { useEffect, useRef, useState } from 'react'

const EDUCATION = [
  {
    title: 'Bachelor of Science in Computer Science',
    company: 'Holy Angel University',
    date: 'January 2025 — Present',
    logo: '/assets/hau.png',
    desc: 'A Computer Science student with a passion for software development and technology.',
  },
]

const EXPERIENCE_ITEMS = [
  {
    title: 'Internal Relations Officer',
    company: 'GDG on Campus · Holy Angel University',
    date: 'July 2024 — April 2025',
    logo: '/assets/gdg.jpg',
    desc: 'Handled the internal relations of the organization for GDG on Campus - Holy Angel University.',
  },
]

function ExpCard({ item }) {
  return (
    <div className="exp-item">
      <div className="exp-logo-wrap">
        <img src={item.logo} alt={`${item.company} Logo`} loading="lazy" />
      </div>
      <div className="exp-content">
        <div className="exp-header">
          <h3 className="exp-title">{item.title}</h3>
          <span className="exp-date">{item.date}</span>
        </div>
        <span className="exp-company">{item.company}</span>
        <p className="exp-desc">{item.desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
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
    <section id="experience" ref={sectionRef}>
      <div className="container">

        {/* Section header */}
        <div className="sec-head">
          <h2 className="sec-title">Experience</h2>
        </div>

        {/* Two subsections stacked */}
        <div className={`exp-body reveal ${visible ? 'visible' : ''}`}>

          <div className="exp-subsection">
            <span className="exp-subsection-label">Experience</span>
            <div className="exp-list">
              {EXPERIENCE_ITEMS.map((item, idx) => <ExpCard key={idx} item={item} />)}
            </div>
          </div>

          <div className="exp-subsection">
            <span className="exp-subsection-label">Education</span>
            <div className="exp-list">
              {EDUCATION.map((item, idx) => <ExpCard key={idx} item={item} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}