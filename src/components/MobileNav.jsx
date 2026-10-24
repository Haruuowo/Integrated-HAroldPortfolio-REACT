import { useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function MobileNav({ isOpen, onClose, onSwitchToRetro }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open')
    } else {
      document.body.classList.remove('nav-open')
    }
  }, [isOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) onClose()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onClose])

  return (
    <>
      <div
        className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <nav
        id="mobileNav"
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  setTimeout(() => {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }, 350)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          {onSwitchToRetro && (
            <li className="mobile-nav-retro-wrap">
              <button
                type="button"
                className="mobile-nav-retro-btn"
                onClick={() => {
                  onClose()
                  onSwitchToRetro()
                }}
              >
                <span className="retro-os-btn-dot" />
                <span>Launch Virtual PC</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}