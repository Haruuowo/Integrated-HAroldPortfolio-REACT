    import { useEffect, useRef, useState } from 'react'
    import gsap from 'gsap'

    const DEV_SKILLS = [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', mono: true },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    ]

    const TOOL_SKILLS = [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', mono: true },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ]

    export default function Skills() {
      const devWheelRef = useRef(null)
      const toolWheelRef = useRef(null)
      const devContainerRef = useRef(null)
      const toolContainerRef = useRef(null)
      const colsRef = useRef(null)
      const [pixelateIn, setPixelateIn] = useState(false)
      const [visible, setVisible] = useState(false)

      // 3D Cylinder animation
      useEffect(() => {
        const setupWheel = (wheelRef, containerRef, radius = 260) => {
          const wheel = wheelRef.current
          const container = containerRef.current
          if (!wheel || !container) return null

          const cards = wheel.querySelectorAll('.skill-card')
          const total = cards.length
          const angleStep = 360 / total

          cards.forEach((card, i) => {
            const angle = angleStep * i
            gsap.set(card, {
              rotationY: angle,
              z: radius,
              transformOrigin: `50% 50% -${radius}px`,
            })
          })

          const spin = gsap.to(wheel, {
            rotationY: -360,
            duration: 35,
            ease: 'none',
            repeat: -1,
          })

          const onEnter = () => gsap.to(spin, { timeScale: 0.15, duration: 0.6 })
          const onLeave = () => gsap.to(spin, { timeScale: 1, duration: 0.6 })

          container.addEventListener('mouseenter', onEnter)
          container.addEventListener('mouseleave', onLeave)

          return { spin, onEnter, onLeave, container }
        }

        const dev = setupWheel(devWheelRef, devContainerRef, 260)
        const tool = setupWheel(toolWheelRef, toolContainerRef, 220)

        return () => {
          dev?.spin.kill()
          tool?.spin.kill()
          if (dev) {
            dev.container.removeEventListener('mouseenter', dev.onEnter)
            dev.container.removeEventListener('mouseleave', dev.onLeave)
          }
          if (tool) {
            tool.container.removeEventListener('mouseenter', tool.onEnter)
            tool.container.removeEventListener('mouseleave', tool.onLeave)
          }
        }
      }, [])

      // Scroll reveal
      useEffect(() => {
        const el = colsRef.current
        if (!el) return

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible(true)
                setPixelateIn(true)
                observer.disconnect()
              }
            })
          },
          { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
      }, [])

      const SkillCard = ({ skill }) => (
        <div className="skill-card">
          <div className="skill-card-inner">
            <img
              className={`skill-icon ${skill.mono ? 'mono' : ''}`}
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
            />
            <span>{skill.name}</span>
          </div>
        </div>
      )

      return (
        <section id="skills">
          <div className="container">
            <div className="sec-head">
              <h2 className="sec-title">Skills</h2>
              <span className="sec-note">hover to slow down</span>
            </div>
            
            <div 
              className={`skills-cols reveal ${pixelateIn ? 'pixelate-in' : ''} ${visible ? 'visible' : ''}`} 
              ref={colsRef}
            >
              {/* Development Column */}
              <div className="skills-col">
                <span className="col-label">Development</span>
                <div 
                  ref={devContainerRef}
                  style={{ 
                    perspective: 1000,
                    height: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 60,
                    background: 'linear-gradient(to right, var(--bg), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 60,
                    background: 'linear-gradient(to left, var(--bg), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }} />
                  
                  <div 
                    ref={devWheelRef}
                    style={{ 
                      position: 'relative',
                      width: 140,
                      height: 100,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {DEV_SKILLS.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools Column */}
              <div className="skills-col">
                <span className="col-label">Tools and design</span>
                <div 
                  ref={toolContainerRef}
                  style={{ 
                    perspective: 1000,
                    height: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 60,
                    background: 'linear-gradient(to right, var(--bg), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 60,
                    background: 'linear-gradient(to left, var(--bg), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }} />
                  
                  <div 
                    ref={toolWheelRef}
                    style={{ 
                      position: 'absolute',
                      width: 140,
                      height: 100,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {TOOL_SKILLS.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }