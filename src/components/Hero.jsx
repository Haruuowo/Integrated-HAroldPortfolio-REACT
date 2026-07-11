import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', 'Mobile App Developer']
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

/* ============================================================
   MAGNETIC BUTTON COMPONENT
   ============================================================ */
function MagneticButton({ children, className, as: Tag = 'button', ...props }) {
  const btnRef = useRef(null)

  const handleMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <Tag
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ============================================================
   SMOOTH TYPEWRITER UTIL (GSAP-powered, sequential)
   ============================================================ */
function typeWriter(element, text, duration = 1.0) {
  if (!element) return Promise.resolve()
  const chars = text.split('')
  element.textContent = ''

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    })

    chars.forEach((char, i) => {
      tl.call(() => {
        element.textContent += char
      }, [], i * (duration / chars.length))
    })
  })
}

/* ============================================================
   SMOOTH SCRAMBLE UTIL (GSAP-powered)
   ============================================================ */
function scrambleText(element, finalText, duration = 0.7) {
  if (!element) return
  const chars = SCRAMBLE_CHARS
  const obj = { progress: 0 }

  gsap.to(obj, {
    progress: 1,
    duration: duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      const revealedCount = Math.floor(obj.progress * finalText.length)
      let output = ''
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealedCount) {
          output += finalText[i]
        } else if (finalText[i] === ' ') {
          output += ' '
        } else {
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      element.textContent = output
    },
    onComplete: () => {
      element.textContent = finalText
    },
  })
}

/* ============================================================
   HERO COMPONENT
   ============================================================ */
export default function Hero() {
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)
  const nameLine1Ref = useRef(null)
  const nameLine2Ref = useRef(null)
  const typingRef = useRef(null)
  const cursorRef = useRef(null)
  const [nameDone, setNameDone] = useState(false)
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  /* ---------- GSAP: HERO ENTRANCE SEQUENCE ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // 1. Hero tag fades up
      tl.from('.hero-tag', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      // 2. Name line 1: type-in (waits for completion)
      .add(() => typeWriter(nameLine1Ref.current, 'John Harold', 1.0))
      // 3. Name line 2: type-in (starts after line 1 finishes)
      .add(() => typeWriter(nameLine2Ref.current, 'Doton', 0.7))
      // 4. Cursor appears with bounce
      .from(cursorRef.current, {
        opacity: 0,
        scaleY: 0,
        duration: 0.3,
        ease: 'back.out(2)',
      })
      // 5. Subtitle lines stagger in
      .from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.2')
      // 6. Buttons fade in
      .from('.hero-row', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      // 7. Mark as done
      .add(() => setNameDone(true), '+=0.2')

    }, heroContentRef)

    return () => ctx.revert()
  }, [])

  /* ---------- GSAP: CURSOR BLINK ---------- */
  useEffect(() => {
    if (!cursorRef.current || !showCursor) return
    const ctx = gsap.context(() => {
      gsap.to(cursorRef.current, {
        opacity: 0.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
    return () => ctx.revert()
  }, [showCursor])

  /* ---------- GSAP: PARALLAX BACKGROUND ON SCROLL ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#hero', {
        backgroundPosition: 'center 30%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  /* ---------- TYPING EFFECT FOR ROLE WORDS ---------- */
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

  /* ---------- VHS GLITCH EFFECT ---------- */
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

  /* ---------- CLICK TO RE-SCRAMBLE ---------- */
  const handleNameClick = useCallback(() => {
    if (!nameDone) return
    scrambleText(nameLine1Ref.current, 'John Harold', 0.6)
    scrambleText(nameLine2Ref.current, 'Doton', 0.5)
  }, [nameDone])

  return (
    <section id="hero" ref={heroRef}>
      <div ref={heroContentRef}>
        <p className="hero-tag">Portfolio · 2026</p>
        <h1 id="heroName" className={nameDone ? 'name-flicker' : ''}>
          <span className="sr-only">John Harold Doton</span>
          <span aria-hidden="true">
            <span
              id="heroNameLine1"
              ref={nameLine1Ref}
              onClick={handleNameClick}
              style={{ cursor: nameDone ? 'pointer' : 'default' }}
            />
            <br />
            <span
              id="heroNameLine2"
              ref={nameLine2Ref}
              onClick={handleNameClick}
              style={{ cursor: nameDone ? 'pointer' : 'default' }}
            />
            {showCursor && (
              <span
                ref={cursorRef}
                className="type-cursor"
                style={{ display: 'inline-block' }}
              />
            )}
          </span>
        </h1>
        <p className="hero-sub">
          <span id="typing" ref={typingRef}>{typedWord}</span>
        </p>
        <p className="hero-sub" style={{ marginTop: '12px' }}>
          Building modern web applications and creative digital experiences.
        </p>
        <div className="hero-row">
          <MagneticButton
            as="a"
            href="#work"
            className="btn-solid"
            onClick={(e) => {
              e.preventDefault()
              gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: '#work', offsetY: 70 },
                ease: 'power3.inOut',
              })
            }}
          >
            View projects
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/assets/resume.pdf"
            className="btn-line"
            download
          >
            Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}