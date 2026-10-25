import { useEffect, useRef, useState } from 'react'

const EDUCATION = [
  {
    title: 'Bachelor of Science in Computer Science',
    company: 'Holy Angel University · School of Computing',
    date: 'Expected 2025',
    logo: '/assets/hau.png',
    desc: 'Undergraduate study focused on artificial intelligence, algorithmic design, and software engineering.',
    bullets: [
      'Relevant Coursework: Data Structures & Algorithms, Machine Learning, Mobile Development, Software Engineering',
    ],
  },
]

const EXPERIENCE_ITEMS = [
  {
    title: 'Internal Officer',
    company: 'Google Developer Group (GDG) HAU',
    date: '2024 — Present',
    logo: '/assets/gdg.jpg',
    desc: 'Spearheaded technical workshops and coordinated community hackathons, facilitating hands-on learning for 100+ student developers in cloud and mobile technologies.',
    bullets: [
      'Spearheaded technical workshops and coordinated community hackathons, facilitating hands-on learning for 100+ student developers in cloud and mobile technologies.',
    ],
  },
]

function ExpCard({ item }) {
  return (
    <div className="exp-item">
      <div className="exp-logo-wrap">
        <img
          src={item.logo}
          alt={`${item.company} Logo`}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.textContent = 'HAU'
          }}
        />
      </div>
      <div className="exp-content">
        <div className="exp-header">
          <h3 className="exp-title">{item.title}</h3>
          <span className="exp-date">{item.date}</span>
        </div>
        <span className="exp-company">{item.company}</span>
        <p className="exp-desc">{item.desc}</p>
        {item.bullets && item.bullets.length > 0 && (
          <ul className="exp-bullets">
            {item.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
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
        <div className="sec-head sec-head-stack reveal">
          <span className="sec-kicker">04 — Experience</span>
          <h2 className="sec-title">Education &amp; Journey.</h2>
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