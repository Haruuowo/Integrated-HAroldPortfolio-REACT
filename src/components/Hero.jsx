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
    const timers = []
    const instanceId = ++_heroEffectInstance

    // #region agent log
    _dbg('Hero.jsx:type-in-effect', 'effect mounted', { instanceId, nameLines }, 'H-A')
    // #endregion

    const step = () => {
      if (cancelled) {
        // #region agent log
        _dbg('Hero.jsx:step', 'step skipped (cancelled)', { instanceId, lineIdx, charIdx }, 'H-A')
        // #endregion
        return
      }
      if (lineIdx >= nameLines.length) {
        timers.push(setTimeout(() => {
          if (cancelled) return
          // #region agent log
          _dbg('Hero.jsx:step', 'type-in complete', { instanceId }, 'H-D')
          // #endregion
          setShowCursor(false)
          setNameDone(true)
        }, 600))
        return
      }
      const line = nameLines[lineIdx]
      if (charIdx < line.length) {
        const char = line[charIdx]
        // #region agent log
        _dbg('Hero.jsx:step', 'append char', { instanceId, lineIdx, charIdx, char, charIsUndefined: char === undefined, line, lineIsUndefined: line === undefined }, 'H-B')
        // #endregion
        if (lineIdx === 0) {
          setNameLine1(prev => {
            const next = prev + char
            // #region agent log
            _dbg('Hero.jsx:setNameLine1', 'state update', { instanceId, prev, char, next, charIsUndefined: char === undefined }, 'H-E')
            // #endregion
            return next
          })
        } else {
          setNameLine2(prev => {
            const next = prev + char
            // #region agent log
            _dbg('Hero.jsx:setNameLine2', 'state update', { instanceId, prev, char, next, charIsUndefined: char === undefined }, 'H-E')
            // #endregion
            return next
          })
        }
        charIdx++
        timers.push(setTimeout(step, 55 + Math.random() * 40))
      } else {
        // #region agent log
        _dbg('Hero.jsx:step', 'line transition', { instanceId, fromLineIdx: lineIdx, nextLine: nameLines[lineIdx + 1], nextLineIsUndefined: nameLines[lineIdx + 1] === undefined }, 'H-C')
        // #endregion
        lineIdx++
        charIdx = 0
        timers.push(setTimeout(step, 220))
      }
    }

    timers.push(setTimeout(step, 550))
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      // #region agent log
      _dbg('Hero.jsx:type-in-effect', 'effect cleanup', { instanceId, timersCleared: timers.length }, 'H-A')
      // #endregion
    }
  }, [])

  // #region agent log
  useEffect(() => {
    if (nameLine1.includes('undefined') || nameLine2.includes('undefined') || (nameDone && nameLine1 !== 'John Harold')) {
      _dbg('Hero.jsx:render-state', 'suspicious name state', { nameLine1, nameLine2, nameDone }, 'H-D')
    }
  }, [nameLine1, nameLine2, nameDone])
  // #endregion

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

  // Clean up scramble on unmount
  useEffect(() => {
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current)
    }
  }, [])

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

  const scrambleRef = useRef(null)

  const scramble = useCallback((setter, original) => {
    if (scrambleRef.current) {
      clearInterval(scrambleRef.current)
    }
    let iterations = 0
    scrambleRef.current = setInterval(() => {
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
        clearInterval(scrambleRef.current)
        scrambleRef.current = null
        setter(original)
      }
      iterations += 1 / 3
    }, 30)
  }, [])

  const handleNameClick = useCallback(() => {
    if (!nameDone) return
    // #region agent log
    _dbg('Hero.jsx:handleNameClick', 'scramble triggered', { nameLine1, nameLine2 }, 'H-D')
    // #endregion
    scramble(setNameLine1, 'John Harold')
    scramble(setNameLine2, 'Doton')
  }, [nameDone, scramble, nameLine1, nameLine2])

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
          {showCursor && <span className="type-cursor" style={{ marginLeft: '4px' }} />}
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