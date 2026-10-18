import { useState, useEffect, useCallback } from 'react'
import { playTerminalClick } from './retroAudio'

export default function TerminalClickEffect({ children }) {
  const [ripples, setRipples] = useState([])

  const handleClick = useCallback((e) => {
    // Only capture if not clicking interactive native inputs/scrollbars
    playTerminalClick()

    const id = Date.now() + Math.random()
    const hex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
    const labels = [`>_ EXEC`, `[0x${hex}]`, `[ACK]`, `[CMD:OK]`, `[SYS_INT]`]
    const text = labels[Math.floor(Math.random() * labels.length)]

    const newRipple = {
      id,
      x: e.clientX,
      y: e.clientY,
      text
    }

    setRipples(prev => [...prev.slice(-8), newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 650)
  }, [])

  return (
    <div className="terminal-click-container" onClickCapture={handleClick}>
      {children}

      {/* Terminal Click Phosphor Ripples */}
      <div className="terminal-click-layer" aria-hidden="true">
        {ripples.map(r => (
          <div
            key={r.id}
            className="terminal-click-marker"
            style={{ left: r.x, top: r.y }}
          >
            <div className="terminal-reticle" />
            <span className="terminal-click-text">{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
