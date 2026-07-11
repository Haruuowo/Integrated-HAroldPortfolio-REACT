import { useEffect, useRef, useState, useCallback } from 'react'

const WORDS = ['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', 'Mobile App Developer']

export default function Hero() {
  const heroRef = useRef(null)
  const [nameLine1, setNameLine1] = useState('')
  const [nameLine2, setNameLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [nameDone, setNameDone] = useState(false)
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Hero name type-in effect
  useEffect(() => {
    const nameLines = ['John Harold', 'Doton']
    let lineIdx = 0
    let charIdx = 0
    let cancelled = false

    const step = () => {
      if (cancelled) return
      if (lineIdx >= nameLines.length) {
        setTimeout(() => {
          if (cancelled) return
          setShowCursor(false)
          setNameDone(true)
        }, 600)
        return
      }
      const line = nameLines[lineIdx]
      if (charIdx < line.length) {
        const ch = line[charIdx]
        if (lineIdx === 0) setNameLine1(prev => prev + ch)
        else setNameLine2(prev => prev + ch)
        charIdx++
        setTimeout(step, 55 + Math.random() * 40)
      } else {
        lineIdx++
        charIdx = 0
        setTimeout(step, 220)
      }
    }

    const timer = setTimeout(step, 550)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

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

  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  const scramble = useCallback((setter, original) => {
    let iterations = 0
    const interval = setInterval(() => {
      setter(
        original
          .split('')
          .map((char, i) =>
            i < Math.floor(iterations)
              ? original[i]
              : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          )
          .join('')
      )
      if (Math.floor(iterations) >= original.length) {
        clearInterval(interval)
        setter(original) // ensure final state is correct
      }
      iterations += 1 / 3
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const handleNameClick = useCallback(() => {
    if (!nameDone) return
    scramble(setNameLine1, 'John Harold')
    scramble(setNameLine2, 'Doton')
  }, [nameDone, scramble])

  return (
    <section id="hero" ref={heroRef}>
      <div>
        <p className="hero-tag">Portfolio · 2026</p>
        <h1 id="heroName" className={nameDone ? 'name-flicker' : ''}>
          <span className="sr-only">John Harold Doton</span>
          <span aria-hidden="true">
            <span id="heroNameLine1" onClick={handleNameClick} style={{ cursor: nameDone ? 'pointer' : 'default' }}>
              {nameLine1}
            </span>
            <br />
            <span id="heroNameLine2" onClick={handleNameClick} style={{ cursor: nameDone ? 'pointer' : 'default' }}>
              {nameLine2}
            </span>
            {showCursor && <span className="type-cursor" />}
          </span>
        </h1>
        <p className="hero-sub">
          <span id="typing">{typedWord}</span>
        </p>
        <p className="hero-sub" style={{ marginTop: '12px' }}>
          Building modern web applications and creative digital experiences.
        </p>
        <div className="hero-row">
          <a
            href="#work"
            className="btn-solid"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View projects
          </a>
          <a href="/assets/resume.pdf" className="btn-line" download>
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}