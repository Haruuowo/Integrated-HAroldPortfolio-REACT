import { useState, useRef, useEffect, useCallback } from 'react'
import { ALL_SKILLS } from '../data/skillsData'

const COMMAND_LIST = {
  help: 'Show list of available commands',
  about: 'Short bio about my journey and focus',
  skills: 'Display technical skills in terminal-friendly format',
  projects: 'List highlighted projects I have worked on',
  contact: 'Print my email, GitHub, and LinkedIn links',
  clear: 'Clear the terminal output screen',
  cat: 'Show my cute virtual cat companion',
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

  // --- Drag state ---
  // pos: null = use CSS default (bottom-right), otherwise {x, y} = left/top in px
  const [pos, setPos] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef(null) // { pointerX, pointerY, winX, winY }

  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const outputEndRef = useRef(null)

  // Reset position when terminal is closed so it returns to default spot
  useEffect(() => {
    if (!isOpen) {
      // Small delay so the close animation plays before snapping back
      const t = setTimeout(() => setPos(null), 420)
      return () => clearTimeout(t)
    }
  }, [isOpen])

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
    inputRef.current?.focus()
  }

  // Close terminal on ESC key if active
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDownGlobal)
    return () => window.removeEventListener('keydown', handleKeyDownGlobal)
  }, [isOpen, onClose])

  // ---- Drag logic ----
  const onPointerDown = useCallback((e) => {
    // Only drag on the header bar itself (not on dots/buttons inside it)
    if (e.target.closest('.window-dots, .terminal-actions, .dot, .action-btn')) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)

    const el = terminalRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    setIsDragging(true)
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      winX: rect.left,
      winY: rect.top,
    }
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging || !dragStartRef.current) return
    const { pointerX, pointerY, winX, winY } = dragStartRef.current
    const dx = e.clientX - pointerX
    const dy = e.clientY - pointerY

    const el = terminalRef.current
    if (!el) return
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = el.offsetWidth
    const h = el.offsetHeight

    // Clamp so it can't go off-screen
    const newX = Math.min(Math.max(winX + dx, 0), vw - w)
    const newY = Math.min(Math.max(winY + dy, 0), vh - h)

    setPos({ x: newX, y: newY })
  }, [isDragging])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
    dragStartRef.current = null
  }, [])

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
              {ALL_SKILLS.map(skill => (
                <div key={skill.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '8px', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--white)' }}>▸ {skill.name}</span>
                  <span style={{ color: 'var(--gold)' }}>{skill.years}</span>
                </div>
              ))}
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

      case 'cat':
        response.push({
          type: 'output',
          component: (
            <div className="term-cat-container" style={{ margin: '10px 0', userSelect: 'none' }}>
              <p style={{ color: 'var(--gold)', marginBottom: '8px', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                🐱 visitor@harold-dev:~$ show_cat_companion.jpg
              </p>
              <img
                src="/assets/cat.jpg"
                alt="Harold's Cat"
                style={{
                  maxWidth: '200px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  display: 'block',
                  marginBottom: '6px'
                }}
              />
              <p style={{ color: 'var(--dim)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                *meow* "Greetings human, welcome to Harold's console!"
              </p>
            </div>
          )
        })
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

  // Build inline style: use dragged position (top/left) or default CSS (bottom/right)
  const windowStyle = pos
    ? {
      top: `${pos.y}px`,
      left: `${pos.x}px`,
      bottom: 'auto',
      right: 'auto',
      // While dragged, suppress the CSS transition so it tracks instantly
      transition: isDragging
        ? 'border-color 0.4s, box-shadow 0.4s'
        : 'border-color 0.4s, box-shadow 0.4s, opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
    }
    : {}

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={`terminal-window ${isOpen ? 'open' : ''} ${isShifted && !pos ? 'shifted-up' : ''}`}
      style={windowStyle}
    >

      {/* Top Title Bar — acts as drag handle */}
      <div
        className={`terminal-header${isDragging ? ' dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
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
