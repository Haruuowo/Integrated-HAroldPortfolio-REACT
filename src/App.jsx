import { useState, useEffect } from 'react'
import Loader from '@components/Loader'
import Header from '@components/Header'
import MobileNav from '@components/MobileNav'
import Hero from '@components/Hero'
import About from '@components/About'
import Skills from '@components/Skills'
import Work from '@components/Work'
import Experience from '@components/Experience'
import Contact from '@components/Contact'
import Footer from '@components/Footer'
import BackToTop from '@components/BackToTop'
import CustomCursor from '@components/CustomCursor'

function App() {
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-white', 'theme-sunset')
    if (theme === 'white') document.body.classList.add('theme-white')
    if (theme === 'sunset') document.body.classList.add('theme-sunset')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
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
    </>
  )
}

export default App