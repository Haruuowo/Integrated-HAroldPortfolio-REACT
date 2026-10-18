import { useState, useEffect } from 'react'
import { playBiosBeep, playTerminalClick } from './retroAudio'

export default function BootScreen({ onSelectMode }) {
  const [selectedIdx, setSelectedIdx] = useState(0) // 0: Retro PC, 1: Modern Portfolio
  const [countdown, setCountdown] = useState(12)
  const [autoBootPaused, setAutoBootPaused] = useState(false)

  const MODES = [
    {
      id: 'retro',
      title: 'HaroldOS Virtual PC (Windows Edition)',
      tag: 'Interactive OS & Workstation',
      desc: 'Interactive virtual desktop with draggable Windows icons, original portfolio sections, and retro games.',
      badge: 'RECOMMENDED'
    },
    {
      id: 'classic',
      title: 'Modern Web Portfolio',
      tag: 'Full-Stack Showcase',
      desc: 'Clean dark-gloss scrolling portfolio with warm gold accents, project case studies, and responsive layout.',
      badge: 'DIRECT VIEW'
    }
  ]

  // Keyboard navigation (1, 2, Up, Down, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      setAutoBootPaused(true)
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx(prev => (prev === 0 ? 1 : 0))
        playBiosBeep(650, 0.03)
      } else if (e.key === '1') {
        setSelectedIdx(0)
        playBiosBeep(650, 0.03)
      } else if (e.key === '2') {
        setSelectedIdx(1)
        playBiosBeep(650, 0.03)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleBoot(MODES[selectedIdx].id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIdx])

  // Auto-boot countdown timer
  useEffect(() => {
    if (autoBootPaused || countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer)
          handleBoot('retro')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [autoBootPaused, countdown])

  const handleBoot = (modeId) => {
    playBiosBeep(900, 0.08)
    onSelectMode(modeId)
  }

  return (
    <div className="xp-boot-screen" onClick={playTerminalClick}>
      <div className="xp-boot-scanlines" />
      <div className="xp-boot-vignette" />

      <div className="xp-boot-container">
        {/* BIOS Terminal Header */}
        <div className="xp-boot-header">
          <div className="bios-row title">
            <span className="bios-brand">HAROLD BIOS v4.02</span>
            <span className="bios-copy">(C) 2004-2026 Harold Doton Systems</span>
          </div>
          <div className="bios-divider">---------------------------------------------------------------------------------</div>
          <div className="bios-row info">
            <span>Processor: Autonomous AI Agent Core @ 4.80GHz</span>
            <span>Memory: 32,768 KB OK</span>
          </div>
          <div className="bios-row info">
            <span>Primary Disk: DOTON_SYSTEM_512GB (Online)</span>
            <span>Display: CRT High-Resolution 1024x768</span>
          </div>
          <div className="bios-divider">---------------------------------------------------------------------------------</div>
          <p className="bios-prompt">
            SELECT BOOT ENVIRONMENT:
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="xp-boot-options" role="radiogroup">
          {MODES.map((mode, idx) => {
            const isSelected = selectedIdx === idx
            return (
              <div
                key={mode.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                className={`xp-boot-card ${isSelected ? 'selected' : ''}`}
                onMouseEnter={() => {
                  setSelectedIdx(idx)
                  setAutoBootPaused(true)
                  playBiosBeep(550, 0.02)
                }}
                onClick={() => handleBoot(mode.id)}
              >
                <div className="boot-card-left">
                  <span className="boot-cursor-arrow">{isSelected ? '>' : ' '}</span>
                  <span className="boot-key-shortcut">[{idx + 1}]</span>
                </div>
                <div className="boot-card-content">
                  <div className="boot-card-title-row">
                    <h3 className="boot-card-title">{mode.title}</h3>
                    <span className="boot-card-badge">{mode.badge}</span>
                  </div>
                  <p className="boot-card-desc">{mode.desc}</p>
                  <span className="boot-card-tag">[ {mode.tag} ]</span>
                </div>
                <div className="boot-card-action">
                  <button type="button" className="boot-enter-btn">
                    {isSelected ? 'ENTER' : 'SELECT'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* BIOS Bottom Status Bar */}
        <div className="xp-boot-footer">
          <div className="bios-divider">---------------------------------------------------------------------------------</div>
          <div className="bios-status-row">
            <span className="bios-keys">
              [UP / DOWN] Select &nbsp;|&nbsp; [1 / 2] Quick Key &nbsp;|&nbsp; [ENTER] Boot
            </span>
            <span className="bios-countdown">
              {countdown > 0 && !autoBootPaused ? (
                <>Auto-booting in {countdown}s...</>
              ) : (
                <>Select an option to boot</>
              )}
            </span>
          </div>
          <div className="bios-command-line">
            <span>root@harold-system:~# boot --target={MODES[selectedIdx].id}</span>
            <span className="bios-cursor-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
