import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const TAGS = ['Software Engineering', 'AI/ML Engineer', 'Frontend Developer', 'Backend Developer']

const FULL_TEXT = "Hi, I'm Harold, a Computer Science student at Holy Angel University focused on artificial intelligence, software engineering, and building things people actually use. I like turning ideas into AI tools and clean interfaces, and I occasionally like creating silly projects that I can turn into real working code."

export default function About() {
  const sectionRef = useRef(null)
  const avatarRef = useRef(null)
  const textRef = useRef(null)
  const headingRef = useRef(null)
  const tagsRef = useRef(null)
  const [tagsVisible, setTagsVisible] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const avatar = avatarRef.current
    const text = textRef.current
    const heading = headingRef.current
    if (!section || !avatar || !text || !heading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            gsap.from(avatar, {
              x: -80,
              opacity: 0,
              scale: 0.85,
              duration: 1.2,
              ease: 'power3.out',
            })

            gsap.from(text, {
              x: 80,
              opacity: 0,
              duration: 1.2,
              ease: 'power3.out',
              delay: 0.2,
            })

            // ScrambleText — start from empty string, reveal to full text
            gsap.fromTo(heading, 
              { scrambleText: { text: "" } },
              {
                duration: 2.5,
                scrambleText: {
                  text: FULL_TEXT,
                  chars: "lowerCase", // only lowercase — much narrower
                  revealDelay: 0.3,
                  speed: 0.6,
                },
                ease: "none",
                delay: 0.5,
                onStart: () => {
                  heading.classList.add('scrambling');
                },
                onComplete: () => {
                  heading.classList.remove('scrambling');
                  setTagsVisible(true);
                }
              }
            )

            if (tagsRef.current) {
              gsap.from(tagsRef.current.children, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 3,
              })
            }

            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">About</h2>
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
            <p className="about-typed-wrap">
              <span className="about-typed-ghost" aria-hidden="true">
                {FULL_TEXT}
              </span>
              <span
                ref={headingRef}
                className="about-typed animate-text"
                aria-hidden="true"
              >
                {FULL_TEXT}
              </span>
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