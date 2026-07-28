import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const TAGS = ['Software Engineering', 'AI/ML Engineer', 'Frontend Developer', 'Backend Developer']

const FULL_TEXT = "Hi, I'm Harold, a Computer Science student at Holy Angel University focused on artificial intelligence, software engineering, and building things people actually use. I like turning ideas into AI tools and clean interfaces, and I occasionally like creating silly projects that I can turn into real working code."

export default function About() {
  const sectionRef = useRef(null)
  const avatarRef = useRef(null)
  const textRef = useRef(null)
  const tagsRef = useRef(null)
  const [tagsVisible, setTagsVisible] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const avatar = avatarRef.current
    const text = textRef.current
    if (!section || !avatar || !text) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // BlurFade for the avatar
            gsap.fromTo(avatar,
              { opacity: 0, filter: 'blur(8px)', y: 20 },
              { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power2.out' }
            )

            // BlurFade for the description text block
            gsap.fromTo(text,
              { opacity: 0, filter: 'blur(8px)', y: 20 },
              {
                opacity: 1, filter: 'blur(0px)', y: 0,
                duration: 0.8, ease: 'power2.out', delay: 0.15,
                onComplete: () => setTagsVisible(true)
              }
            )

            if (tagsRef.current) {
              gsap.from(tagsRef.current.children, {
                y: 10, opacity: 0, duration: 0.35,
                stagger: 0.07, ease: 'power2.out', delay: 0.25,
              })
            }

            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="sec-title-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            About Me
          </h2>
        </div>
        <div className="about-grid">
          <div className="avatar" ref={avatarRef}>
            <img
              src="/assets/HAROLDPHOTO1.jpg"
              alt="John Harold Doton"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.textContent = 'JD'
              }}
            />
          </div>
          <div className="about-body" ref={textRef}>
            <p className="about-text-desc">
              {FULL_TEXT}
            </p>
            <div className={`tagstrip ${tagsVisible ? 'stagger-in' : ''}`} ref={tagsRef}>
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