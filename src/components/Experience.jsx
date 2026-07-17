import { useEffect, useRef, useState } from 'react'

const TIMELINE_ITEMS = [
  {
    title: 'Education',
    company: 'Holy Angel University',
    date: 'January 2025 — Present',
    logo: '/assets/hau.png',
    desc: 'A Computer Science student with a passion for software development and technology.',
  },
  {
    title: 'Internal Relations Officer',
    company: 'GDG on Campus - Holy Angel University',
    date: 'July 2024 — April 2025',
    logo: '/assets/gdg.jpg',
    desc: 'Handled the internal relations of the organization for GDG on Campus - Holy Angel University.',
  },
  {
    title: 'Vice President',
    company: 'The Loop - Holy Angel University',
    date: 'July 2023 — June 2024',
    logo: '/assets/loop_logo.png',
    desc: 'Help cultivate a learning-driven environment at Holy Angel University through organizing and facilitating CS-focused workshops, seminars, and tutorials.',
  },
]

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
        <div className="experience-split">
          <div className="experience-left">
            <div className="experience-sec-head">
              <span className="sec-note-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sec-note-icon">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                LEADERSHIP & SERVICE
              </span>
              <h2 className="sec-title-large">Experience</h2>
            </div>
          </div>
          <div className={`experience-right reveal ${visible ? 'visible' : ''}`}>
            <div className="exp-list">
              {TIMELINE_ITEMS.map((item, idx) => (
                <div className="exp-item" key={idx}>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}