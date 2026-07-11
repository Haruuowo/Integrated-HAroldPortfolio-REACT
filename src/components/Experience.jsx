import { useEffect, useRef, useState } from 'react'

const TIMELINE_ITEMS = [
  {
    title: 'Education',
    desc: 'B.S. Computer Science — Holy Angel University',
  },
  {
    title: 'Experience',
    desc: 'Managed and monitored a community of data science scholars within the Google Developer Groups (GDG) ecosystem. Designed automated tracking systems in Google Sheets and Forms to audit weekly progress, certifications, and leaderboard rankings. Spearheaded the organization of scholars into specialized, interest-based guilds, streamlining administrative workflows and boosting community engagement.',
  },
  {
    title: 'Achievements',
    desc: 'Add your achievements or certifications here.',
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
        <div className="sec-head">
          <h2 className="sec-title">Experience</h2>
        </div>
        <div className={`timeline reveal ${visible ? 'visible' : ''}`}>
          {TIMELINE_ITEMS.map((item) => (
            <div className="tl-item glass" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}