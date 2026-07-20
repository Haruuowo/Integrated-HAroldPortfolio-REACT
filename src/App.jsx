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
import CustomCursor from '@components/CustomCursor'
import ScrollProgress from '@components/ScrollProgress'

function App() {
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
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
    const onScroll = () => setShowBackToTop(window.scrollY > 450)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
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
      <BackToTop />

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

export default App