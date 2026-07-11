import { useEffect, useRef, useState } from 'react'

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
  const colsRef = useRef(null)
  const [pixelateIn, setPixelateIn] = useState(false)
  const [visible, setVisible] = useState(false)

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

  return (
    <section id="skills">
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">Skills</h2>
        </div>
        <div className={`skills-cols reveal ${pixelateIn ? 'pixelate-in' : ''} ${visible ? 'visible' : ''}`} ref={colsRef}>
          <div className="skills-col">
            <span className="col-label">Development</span>
            <div className="skill-flow">
              {DEV_SKILLS.map((skill) => (
                <div className="skill" key={skill.name}>
                  <img
                    className={`skill-icon ${skill.mono ? 'mono' : ''}`}
                    src={skill.icon}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-col">
            <span className="col-label">Tools and design</span>
            <div className="skill-flow">
              {TOOL_SKILLS.map((skill) => (
                <div className="skill" key={skill.name}>
                  <img
                    className={`skill-icon ${skill.mono ? 'mono' : ''}`}
                    src={skill.icon}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}