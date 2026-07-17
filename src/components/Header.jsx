import { useState, useEffect, useRef } from 'react'

const THEME_META = {
  dark:   { icon: '●', label: 'Night mode' },
  white:  { icon: '○', label: 'Day mode' },
  sunset: { icon: '◐', label: 'Sunset mode' },
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ theme, setTheme, mobileNavOpen, setMobileNavOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  const meta = THEME_META[theme] || THEME_META.dark

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      let cur = ''
      document.querySelectorAll('section').forEach(s => {
        if (window.scrollY >= s.offsetTop - 160) cur = s.id
      })
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
      if (isAtBottom) {
        cur = 'contact'
      }
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMobileNavOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setMobileNavOpen])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setDropdownOpen(false)
  }

  return (
    <header style={{ boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,.15)' : 'none' }}>
      <div className="logo">
        <a href="#hero" onClick={(e) => {
          e.preventDefault()
          document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
        }}>
          <img src="/assets/my-notion-face-transparent.png" alt="John Harold Doton Logo" />
        </a>
      </div>

      <nav>
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-right">
        <div className={`theme-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
          <button
            className="theme-dd-toggle"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen(!dropdownOpen)
            }}
          >
            <span className="theme-dd-icon">{meta.icon}</span>
            <span className="theme-dd-label">{meta.label}</span>
            <svg className="theme-dd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul className="theme-dd-menu" role="listbox">
            {Object.entries(THEME_META).map(([key, m]) => (
              <li
                key={key}
                role="option"
                data-theme={key}
                className={`theme-dd-option ${theme === key ? 'active' : ''}`}
                onClick={() => handleThemeChange(key)}
              >
                <span>{m.icon}</span>{m.label}
              </li>
            ))}
          </ul>
        </div>

        <button
          className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
          type="button"
          aria-label="Open menu"
          aria-haspopup="true"
          aria-expanded={mobileNavOpen}
          aria-controls="mobileNav"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}