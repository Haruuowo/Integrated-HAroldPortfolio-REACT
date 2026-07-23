import { useEffect, useRef, useState } from 'react'
import HyperText from './HyperText'
import InteractiveHoverButton from './InteractiveHoverButton'

const WORDS = ['Software Engineer', 'AI/ML Engineer', 'Mobile Developer', 'Full Stack Developer']

export default function Hero() {
  const heroRef = useRef(null)
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing effect for role words
  useEffect(() => {
    const w = WORDS[wordIndex]
    const delay = isDeleting ? 45 : 95
    const pause = isDeleting ? 0 : (charIndex === w.length ? 1800 : 0)

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < w.length) {
        setTypedWord(w.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setTypedWord(w.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === w.length) {
        setIsDeleting(true)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setWordIndex((wordIndex + 1) % WORDS.length)
      }
    }, delay + pause)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, wordIndex])

  // VHS glitch effect
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let glitchTimer
    const scheduleGlitch = () => {
      glitchTimer = setTimeout(() => {
        hero.classList.add('vhs-glitch')
        setTimeout(() => hero.classList.remove('vhs-glitch'), 400)
        scheduleGlitch()
      }, 4000 + Math.random() * 5000)
    }
    scheduleGlitch()
    return () => clearTimeout(glitchTimer)
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <div>
        <p className="hero-tag">Portfolio · 2026</p>
        <h1 id="heroName" className="name-flicker">
          <span className="sr-only">Hello, I'm John Harold</span>
          <span aria-hidden="true">
            <HyperText text="Hello, I'm" duration={1800} delay={200} />
            <br />
            <HyperText text="John Harold" duration={1400} delay={450} />
          </span>
        </h1>
        <p className="hero-sub"><span id="typing">{typedWord}</span></p>
        <p className="hero-sub" style={{ marginTop: '12px' }}>
          Building modern web applications and creative digital experiences.
        </p>
        <div className="hero-row">
          <InteractiveHoverButton
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View projects
          </InteractiveHoverButton>
          <InteractiveHoverButton
            href="https://drive.google.com/file/d/1e6JNqWsuSjulSiw6UUHZ7uH9UR5Iwpmb/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  )
}