import { useState, useEffect } from 'react'
import Loader from '@components/Loader'
import Header from '@components/Header'
import MobileNav from '@components/MobileNav'
import Hero from '@components/Hero'
import Terminal from '@components/Terminal'
import About from '@components/About'
import Skills from '@components/Skills'
import Work from '@components/Work'
import Experience from '@components/Experience'
import Contact from '@components/Contact'
import Footer from '@components/Footer'
import BackToTop from '@components/BackToTop'

export default function ClassicPortfolio() {
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    // Remove XP lock when in classic mode so scrolling works normally
    document.documentElement.classList.remove('pc-lock')
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-white', 'theme-sunset', 'theme-fuji')
    if (theme === 'white') document.body.classList.add('theme-white')
    if (theme === 'sunset') document.body.classList.add('theme-sunset')
    if (theme === 'fuji') document.body.classList.add('theme-fuji')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 450
      setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Subtle scroll reveal observer for all section elements
    const setupReveal = () => {
      const targets = document.querySelectorAll('.reveal:not(.visible)')
      if (!targets.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )

      targets.forEach((el) => observer.observe(el))
      return observer
    }

    const timer = setTimeout(setupReveal, 100)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <>
      {loading && <Loader />}
      <Header
        theme={theme}
        setTheme={setTheme}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop show={showBackToTop} />

      {/* Floating Terminal Trigger Button */}
      <button
        id="terminalToggle"
        className={`${terminalOpen ? 'active' : ''} ${showBackToTop ? 'shifted-up' : ''}`}
        onClick={() => setTerminalOpen(!terminalOpen)}
        aria-label="Toggle Terminal Console"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </button>

      {/* Terminal Drawer Popup */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        isShifted={showBackToTop}
      />
    </>
  )
}
