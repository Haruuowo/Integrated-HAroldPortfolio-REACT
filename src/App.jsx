import { useState, useEffect } from 'react'
import BootScreen from './retro/BootScreen'
import CRTMonitorFrame from './retro/CRTMonitorFrame'
import RetroPC from './retro/RetroPC'
import ClassicPortfolio from './ClassicPortfolio'

function App() {
  const [viewMode, setViewMode] = useState(() => {
    // Default directly to the clean modern portfolio
    return localStorage.getItem('portfolio_view_mode') || 'classic'
  })

  useEffect(() => {
    if (viewMode !== 'boot') {
      localStorage.setItem('portfolio_view_mode', viewMode)
    }
  }, [viewMode])

  const openBootScreen = () => setViewMode('boot')
  const switchToClassic = () => setViewMode('classic')
  const switchToRetro = () => setViewMode('retro')

  if (viewMode === 'boot') {
    return <BootScreen onSelectMode={(mode) => setViewMode(mode)} />
  }

  if (viewMode === 'classic') {
    return (
      <ClassicPortfolio
        onSwitchToRetro={switchToRetro}
        onOpenBootScreen={openBootScreen}
      />
    )
  }

  return (
    <CRTMonitorFrame
      onSwitchToClassic={switchToClassic}
      onOpenBootScreen={openBootScreen}
    >
      <RetroPC onSwitchToClassic={switchToClassic} />
    </CRTMonitorFrame>
  )
}

export default App
