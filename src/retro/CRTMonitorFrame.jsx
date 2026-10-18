import { useState } from 'react'
import { playDegaussSound, playTerminalClick, playBiosBeep } from './retroAudio'
import TerminalClickEffect from './TerminalClickEffect'

export default function CRTMonitorFrame({ children, onSwitchToClassic, onOpenBootScreen }) {
  const [isMonitorMode, setIsMonitorMode] = useState(() => {
    // Default to CRT monitor frame on larger screens, borderless on small phones
    return typeof window !== 'undefined' ? window.innerWidth >= 900 : true
  })
  const [isPowerOn, setIsPowerOn] = useState(true)
  const [isDegaussing, setIsDegaussing] = useState(false)
  const [brightness, setBrightness] = useState(100)

  const handleDegauss = () => {
    if (!isPowerOn) return
    setIsDegaussing(true)
    playDegaussSound()
    setTimeout(() => setIsDegaussing(false), 700)
  }

  const handleTogglePower = () => {
    playTerminalClick()
    setIsPowerOn(p => !p)
  }

  const handleCycleBrightness = () => {
    playTerminalClick()
    setBrightness(b => (b === 100 ? 115 : b === 115 ? 85 : 100))
  }

  return (
    <div className={`crt-desk-environment ${isMonitorMode ? 'with-crt-frame' : 'borderless-mode'}`}>


      {/* Retro CRT Physical Monitor Chassis */}
      <div className={`crt-monitor-chassis ${isDegaussing ? 'degauss-active' : ''}`}>
        {/* Top Ventilation Grille */}
        <div className="crt-vents-row" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="crt-vent-slot" />
          ))}
        </div>

        {/* Outer Bevel Frame */}
        <div className="crt-bezel-outer">
          {/* Inner Recessed Dark Screen Rim */}
          <div className="crt-bezel-inner">
            {/* Curved Glass CRT Display Tube */}
            <div
              className={`crt-glass-screen ${!isPowerOn ? 'power-off' : ''}`}
              style={{ filter: `brightness(${brightness}%)` }}
            >
              {/* Scanlines Overlay */}
              <div className="crt-scanlines-layer" aria-hidden="true" />
              {/* Curved Vignette & Phosphor Shadow Mask */}
              <div className="crt-vignette-layer" aria-hidden="true" />
              {/* Glass Glare Reflection */}
              <div className="crt-glare-layer" aria-hidden="true" />

              {/* OS / Desktop Content with Terminal Click Effect */}
              {isPowerOn ? (
                <TerminalClickEffect>
                  {children}
                </TerminalClickEffect>
              ) : (
                <div className="crt-screen-off">
                  <div className="crt-phosphor-dot" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CRT Monitor Control Panel */}
        <div className="crt-controls-panel">
          {/* Left Brand Badge */}
          <div className="crt-brand-badge">
            <span className="badge-logo">◆</span>
            <span className="badge-name">HAROLDVISION</span>
            <span className="badge-model">MULTISYNC CRT-17</span>
          </div>

          {/* Right Tactile Buttons & Indicators */}
          <div className="crt-buttons-cluster">
            {/* Degauss Button */}
            <button
              type="button"
              className="crt-hardware-btn degauss"
              onClick={handleDegauss}
              title="Degauss CRT Tube"
            >
              <span className="hw-label">DEGAUSS</span>
            </button>

            {/* Brightness Adjustment Button */}
            <button
              type="button"
              className="crt-hardware-btn"
              onClick={handleCycleBrightness}
              title="Adjust Brightness"
            >
              <span className="hw-label">BRIGHT</span>
            </button>

            {/* Fullscreen / Bezel Toggle */}
            <button
              type="button"
              className="crt-hardware-btn frame-toggle"
              onClick={() => { playTerminalClick(); setIsMonitorMode(m => !m); }}
              title={isMonitorMode ? 'Expand to Fullscreen' : 'Show Retro Monitor Frame'}
            >
              <span className="hw-label">{isMonitorMode ? 'FULLSCREEN' : 'FRAME'}</span>
            </button>

            {/* Power Button & Status LED */}
            <div className="crt-power-cluster">
              <span className={`crt-power-led ${isPowerOn ? 'on' : 'off'}`} title={isPowerOn ? 'Power: ON' : 'Power: OFF'} />
              <button
                type="button"
                className={`crt-power-btn ${isPowerOn ? 'active' : ''}`}
                onClick={handleTogglePower}
                title="CRT Power Button"
              >
                POWER
              </button>
            </div>
          </div>
        </div>

        {/* Monitor Swivel Stand Base */}
        <div className="crt-stand-pedestal" aria-hidden="true">
          <div className="crt-stand-neck" />
          <div className="crt-stand-foot" />
        </div>
      </div>
    </div>
  )
}
