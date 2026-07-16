import { useEffect, useRef, useState, useCallback } from 'react'

const WORDS = ['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', 'Mobile App Developer']

// #region agent log
let _heroEffectInstance = 0
const _dbg = (location, message, data, hypothesisId) => {
  fetch('http://127.0.0.1:7690/ingest/67716fa6-5a36-491e-8f79-4850ffe8f44f', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '5435af' }, body: JSON.stringify({ sessionId: '5435af', location, message, data, hypothesisId, timestamp: Date.now(), runId: 'pre-fix' }) }).catch(() => {})
}
// #endregion

export default function Hero() {
  const heroRef = useRef(null)
  const scramble1Ref = useRef(null)
  const scramble2Ref = useRef(null)
  const [nameLine1, setNameLine1] = useState('')
  const [nameLine2, setNameLine2] = useState('')
  const [nameDone, setNameDone] = useState(false)
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  const scramble = useCallback((setter, original, ref, onComplete) => {
    if (ref.current) {
      clearInterval(ref.current)
    }
    let iterations = 0
    ref.current = setInterval(() => {
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
        clearInterval(ref.current)
        ref.current = null
        setter(original)
        if (onComplete) onComplete()
      }
      iterations += 1 / 3
    }, 30)
  }, [])

  // Scramble name reveal on mount
  useEffect(() => {
    let line1Completed = false
    let line2Completed = false

    const checkComplete = () => {
      if (line1Completed && line2Completed) {
        setNameDone(true)
      }
    }

    scramble(setNameLine1, 'John Harold', scramble1Ref, () => {
      line1Completed = true
      checkComplete()
    })
    scramble(setNameLine2, 'Doton', scramble2Ref, () => {
      line2Completed = true
      checkComplete()
    })

    return () => {
      if (scramble1Ref.current) clearInterval(scramble1Ref.current)
      if (scramble2Ref.current) clearInterval(scramble2Ref.current)
    }
  }, [scramble])

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

  const handleNameClick = useCallback(() => {
    if (!nameDone) return
    // #region agent log
    _dbg('Hero.jsx:handleNameClick', 'scramble triggered', { nameLine1, nameLine2 }, 'H-D')
    // #endregion
    scramble(setNameLine1, 'John Harold', scramble1Ref)
    scramble(setNameLine2, 'Doton', scramble2Ref)
  }, [nameDone, scramble])

  return (
    <section id="hero" ref={heroRef}>
      <div>
        <p className="hero-tag">Portfolio · 2026</p>
        <h1 id="heroName" className={nameDone ? 'name-flicker' : ''}>
          <span className="sr-only">John Harold Doton</span>
          <span aria-hidden="true">
            <span id="heroNameLine1" onClick={handleNameClick}>{nameLine1}</span>
            <br />
            <span id="heroNameLine2" onClick={handleNameClick}>{nameLine2}</span>
          </span>
        </h1>
        <p className="hero-sub"><span id="typing">{typedWord}</span></p>
        <p className="hero-sub" style={{ marginTop: '12px' }}>
          Building modern web applications and creative digital experiences.
        </p>
        <div className="hero-row">
          <a href="#work" className="btn-solid" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
          }}>View projects</a>
          <a href="/assets/resume.pdf" className="btn-line" download>Resume</a>
        </div>
      </div>
    </section>
  )
}