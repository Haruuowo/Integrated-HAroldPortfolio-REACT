import { useState, useRef, useEffect } from 'react'
import { ALL_SKILLS } from '../data/skillsData'

const COMMAND_LIST = {
  help: 'Show list of available commands',
  about: 'Short bio about my journey and focus',
  skills: 'Display technical skills in terminal-friendly format',
  projects: 'List highlighted projects I have worked on',
  contact: 'Print my email, GitHub, and LinkedIn links',
  clear: 'Clear the terminal output screen',
  matrix: 'Trigger a falling green code screen (press Esc or click to exit)',
  sudo: 'Run command with administrative privileges',
}

const BIO_TEXT = `Hi, I'm Harold, a Computer Science student at Holy Angel University focused on AI/ML and software engineering. I enjoy building things that solve real-world problems and creating polished, interactive experiences.`

const PROJECT_LIST = [
  { name: 'Luna AI Vtuber', desc: 'Autonomous AI-powered virtual streamer using custom LLMs and voice synthesis.' },
  { name: 'ScholarFlow Analytics', desc: 'Automated stats dashboard for GDG scholars using Google Sheets API.' },
  { name: 'AetherCraft Autopilot', desc: 'Autonomous reinforcement learning bot for Minecraft navigation.' },
  { name: 'HAU CampusNav', desc: 'Indoor halls mapping app using Dijkstra\'s pathfinding algorithm.' }
]

export default function Terminal({ isOpen, onClose, isShifted }) {
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [inputVal, setInputVal] = useState('')
  const [outputs, setOutputs] = useState([
    { type: 'header', text: 'john-harold-portfolio v1.0.0 (Type "help" to start)' }
  ])
  const [matrixActive, setMatrixActive] = useState(false)

  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const outputEndRef = useRef(null)
  const canvasRef = useRef(null)

  // Focus terminal input when it opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [outputs])

  // Focus terminal input on container click
  const handleTerminalClick = (e) => {
    e.stopPropagation()
    if (matrixActive) {
      setMatrixActive(false)
    } else {
      inputRef.current?.focus()
    }
  }

  // Close terminal on ESC key if active
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Escape') {
        if (matrixActive) {
          setMatrixActive(false)
        } else if (isOpen) {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDownGlobal)
    return () => window.removeEventListener('keydown', handleKeyDownGlobal)
  }, [isOpen, matrixActive, onClose])

  // Handle matrix canvas animation
  useEffect(() => {
    if (!matrixActive || !isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    const columns = Math.floor(canvas.width / 16)
    const drops = Array(columns).fill(1)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ'

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * 16, drops[i] * 16)

        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [matrixActive, isOpen])

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const parts = trimmed.split(' ')
    const primaryCmd = parts[0]

    let response = []

    if (primaryCmd) {
      response.push({ type: 'input', text: `visitor@harold-dev:~$ ${cmd}` })
    }

    switch (primaryCmd) {
      case 'help':
        response.push({
          type: 'output',
          component: (
            <div className="term-help">
              <p style={{ color: 'var(--gold)', marginBottom: '8px' }}>Available Commands:</p>
              {Object.entries(COMMAND_LIST).map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px' }}>
                  <span style={{ color: 'var(--white)', fontFamily: 'monospace' }}>{k}</span>
                  <span style={{ color: 'var(--dim)' }}>{v}</span>
                </div>
              ))}
            </div>
          )
        })
        break

      case 'about':
        response.push({ type: 'output', text: BIO_TEXT })
        break

      case 'skills':
        response.push({
          type: 'output',
          component: (
            <div className="term-skills" style={{ fontFamily: 'monospace', lineHeight: '1.5' }}>
              <p style={{ color: 'var(--gold)', marginBottom: '8px' }}>TECHNICAL PROFICIENCY:</p>
              {ALL_SKILLS.map(skill => {
                const barSize = 10
                const filled = Math.round((skill.pct / 100) * barSize)
                const empty = barSize - filled
                const bar = '[' + '='.repeat(filled) + '-'.repeat(empty) + ']'
                return (
                  <div key={skill.name} style={{ display: 'grid', gridTemplateColumns: '110px 130px 1fr', gap: '8px', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--white)' }}>{skill.name}</span>
                    <span style={{ color: 'var(--gold)' }}>{bar}</span>
                    <span style={{ color: 'var(--muted)' }}>{skill.pct}%</span>
                  </div>
                )
              })}
            </div>
          )
        })
        break

      case 'projects':
        response.push({
          type: 'output',
          component: (
            <div className="term-projects">
              <p style={{ color: 'var(--gold)', marginBottom: '8px' }}>HIGHLIGHTED PROJECTS:</p>
              {PROJECT_LIST.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  <p style={{ color: 'var(--white)', fontWeight: 'bold', fontSize: '0.78rem' }}>▸ {proj.name}</p>
                  <p style={{ color: 'var(--dim)', paddingLeft: '12px', fontSize: '0.78rem' }}>{proj.desc}</p>
                </div>
              ))}
            </div>
          )
        })
        break

      case 'contact':
        response.push({
          type: 'output',
          component: (
            <div className="term-contact">
              <p style={{ color: 'var(--gold)', marginBottom: '4px' }}>CONTACT DETAILS:</p>
              <p>Email: <a href="mailto:harolddoton@gmail.com" style={{ color: 'var(--white)', textDecoration: 'underline' }}>harolddoton@gmail.com</a></p>
              <p>GitHub: <a href="https://github.com/Haruuowo" target="_blank" rel="noreferrer" style={{ color: 'var(--white)', textDecoration: 'underline' }}>github.com/Haruuowo</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/harold-doton-606b18317/" target="_blank" rel="noreferrer" style={{ color: 'var(--white)', textDecoration: 'underline' }}>linkedin.com/in/harold-doton</a></p>
            </div>
          )
        })
        break

      case 'clear':
        setOutputs([])
        return

      case 'matrix':
        setMatrixActive(true)
        response.push({ type: 'output', text: 'Matrix mode active. Press ESC or click anywhere to exit.' })
        break

      case 'sudo':
        response.push({ type: 'error', text: 'Permission Denied: You are not root... yet.' })
        break

      case '':
        break

      default:
        response.push({ type: 'error', text: `Command not found: "${primaryCmd}". Type "help" for a list of commands.` })
    }

    setOutputs(prev => [...prev, ...response])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal
      setInputVal('')
      if (cmd.trim()) {
        const newHistory = [...history, cmd]
        setHistory(newHistory)
        setHistoryIdx(newHistory.length)
      }
      executeCommand(cmd)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const newIdx = Math.max(0, historyIdx - 1)
      setHistoryIdx(newIdx)
      setInputVal(history[newIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.min(history.length, historyIdx + 1)
      setHistoryIdx(newIdx)
      setInputVal(history[newIdx] || '')
    }
  }

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={`terminal-window ${isOpen ? 'open' : ''} ${matrixActive ? 'matrix-mode' : ''} ${isShifted ? 'shifted-up' : ''}`}
    >
      {matrixActive && <canvas ref={canvasRef} className="matrix-canvas" />}
      
      {/* Top Title Bar */}
      <div className="terminal-header">
        <div className="window-dots">
          <span className="dot red" onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ cursor: 'pointer' }} />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-title">visitor@harold-dev:~</div>
        <div className="terminal-actions">
          <span className="action-btn min" onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ cursor: 'pointer' }} />
          <span className="action-btn max" />
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="terminal-body">
        {outputs.map((out, idx) => (
          <div key={idx} className={`terminal-row ${out.type}`}>
            {out.component ? (
              out.component
            ) : (
              <p>{out.text}</p>
            )}
          </div>
        ))}
        
        {/* Input Row */}
        <div className="terminal-row input-row">
          <span className="prompt">visitor@harold-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={outputEndRef} />
      </div>
    </div>
  )
}
