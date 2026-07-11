import { useEffect, useRef, useState } from 'react'

const TAGS = ['Software Engineering', 'AI/ML Engineer', 'Frontend Developer', 'Backend Developer']

const TYPED_SEGMENTS = [
  { text: "HI! im Harold, I'm a Computer Science student at Holy Angel University, focused on ", bold: true },
  { text: "artificial intelligence, software engineering", bold: true },
  { text: ", and building things people actually use. I like turning ideas AI tools, clean interfaces, I occasionally like creating silly projects that i could turn into real working code.", bold: true },
]

export default function About() {
  const wrapRef = useRef(null)
  const [typedHtml, setTypedHtml] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [tagsVisible, setTagsVisible] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            typeAbout()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const typeAbout = () => {
    let segIndex = 0
    let charIndex = 0
    let currentHtml = ''
    let inBold = false

    const step = () => {
      if (segIndex >= TYPED_SEGMENTS.length) {
        setTimeout(() => {
          setShowCursor(false)
          setTagsVisible(true)
        }, 500)
        return
      }
      const seg = TYPED_SEGMENTS[segIndex]
      if (charIndex < seg.text.length) {
        const ch = seg.text[charIndex]
        if (seg.bold && !inBold) {
          currentHtml += '<strong>'
          inBold = true
        }
        currentHtml += ch
        setTypedHtml(currentHtml + (inBold ? '</strong>' : ''))
        charIndex++
        setTimeout(step, 7 + Math.random() * 10)
      } else {
        if (inBold) {
          currentHtml += '</strong>'
          inBold = false
        }
        segIndex++
        charIndex = 0
        setTimeout(step, 30)
      }
    }
    step()
  }

  return (
    <section id="about">
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">About</h2>
        </div>
        <div className={`about-grid reveal ${visible ? 'visible' : ''}`}>
          <div className="avatar">
            <img
              src="/assets/HAROLDPHOTO1.jpg"
              alt="John Harold Doton"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.textContent = 'JD'
              }}
            />
          </div>
          <div className="about-body">
            <p className="about-typed-wrap" ref={wrapRef}>
              <span className="sr-only">
                HI! im Harold, I'm a Computer Science student at Holy Angel University, focused on
                artificial intelligence, software engineering, and building things people actually use.
                I like turning ideas AI tools, clean interfaces, I occasionally like creating silly
                projects that i could turn into real working code.
              </span>
              <span
                id="aboutTyped"
                className="about-typed"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: typedHtml + (showCursor ? '<span class="type-cursor"></span>' : '') }}
              />
            </p>
            <div className={`tagstrip ${tagsVisible ? 'stagger-in' : ''}`}>
              {TAGS.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}