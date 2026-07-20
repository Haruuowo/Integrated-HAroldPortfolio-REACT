import { useEffect, useRef, useState } from 'react'

const CERTS = [
  {
    id: 'fcc-relational-db',
    name: 'Relational Database',
    type: 'Developer Certification',
    issuer: 'freeCodeCamp',
    issuerLogo: 'https://design.freecodecamp.org/img/fcc_primary_large.svg',
    date: 'February 7, 2025',
    hours: '~300 hours',
    link: 'https://www.freecodecamp.org/certification/haruuowo/relational-database-v8',
    tags: ['SQL', 'PostgreSQL', 'Bash', 'Linux', 'Git'],
  },
]

export default function Certifications() {
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
    <section id="certifications" ref={sectionRef}>
      <div className="container">

        <div className="sec-head">
          <h2 className="sec-title">Certifications</h2>
          <span className="sec-note">Verified credentials</span>
        </div>

        <div className={`cert-list reveal ${visible ? 'visible' : ''}`}>
          {CERTS.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="cert-card"
              aria-label={`${cert.name} by ${cert.issuer} — verify credential`}
            >
              {/* Left: issuer badge */}
              <div className="cert-badge">
                <div className="cert-badge-inner">
                  {/* fCC flame icon inline so it never breaks */}
                  <svg viewBox="0 0 32 32" className="cert-flame" aria-hidden="true" focusable="false">
                    <path
                      d="M16 2C16 2 10 9 10 15c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2-.8-3.8-2.1-5.1C19.3 11.5 19 13 19 13s-1.2-1.8-1.5-4C17.2 7.2 16 2 16 2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="cert-issuer-name">{cert.issuer}</span>
              </div>

              {/* Center: cert details */}
              <div className="cert-info">
                <div className="cert-meta-row">
                  <span className="cert-type">{cert.type}</span>
                  <span className="cert-dot" aria-hidden="true">·</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <h3 className="cert-name">{cert.name}</h3>
                <div className="cert-hours">{cert.hours} of coursework</div>
                <div className="cert-tags">
                  {cert.tags.map(t => (
                    <span key={t} className="cert-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Right: verify link cue */}
              <div className="cert-verify">
                <span className="cert-verify-label">Verify</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-verify-icon" aria-hidden="true">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
