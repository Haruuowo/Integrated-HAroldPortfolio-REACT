import InteractiveHoverButton from './InteractiveHoverButton'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Haruuowo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/harold-doton-606b18317',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:harolddoton@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
]

const FOCUS = ['AI Agents', 'Full-Stack Web', 'Computer Vision']

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-container">
        <div className="hero-left">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Computer Science · Holy Angel University
          </p>

          <h1 id="heroName">
            Hi, I'm <span className="hero-highlight">John Harold</span>
            <span className="hero-h1-sub">I build intelligent software.</span>
          </h1>

          <p className="hero-sub">
            I turn imaginative ideas into autonomous AI agents, machine learning
            pipelines, and clean, dependable web experiences.
          </p>

          <ul className="hero-focus">
            {FOCUS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="hero-row">
            <InteractiveHoverButton
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Projects
            </InteractiveHoverButton>
            <InteractiveHoverButton
              href="/assets/Harold_Resume.pdf"
              download="Harold_Resume.pdf"
              className="btn-red"
            >
              Download CV
            </InteractiveHoverButton>
          </div>

          <div className="hero-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="hero-social"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-right" aria-hidden="false">
          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <img
                src="/assets/HAROLDPHOTO1.jpg"
                alt="Portrait of John Harold Doton"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}