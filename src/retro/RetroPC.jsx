import { useState, useRef, useEffect, useCallback } from 'react'
import { WALLPAPERS, INITIAL_FILESYSTEM, ABOUT_TXT, SKILLS_TXT } from './xpData'
import XPChrome from './XPChrome'
import XPIE from './XPIE'
import TetrisApp from './TetrisApp'
import MinesweeperApp from './MinesweeperApp'
import XPExplorer from './XPExplorer'
import XPDisplayProperties from './XPDisplayProperties'
import XPNotepad from './XPNotepad'
import XPImageViewer from './XPImageViewer'
import { DoomApp } from './RetroApps'
import './retro.css'

const DEFAULT_DESKTOP_ICONS = [
  // Column 1: System
  { id: 'comp', title: 'My Computer', icon: '/xp/icons/676-32.png', action: 'computer', x: 24, y: 20 },
  { id: 'ie', title: 'Internet Explorer', icon: '/xp/icons/ie.png', action: 'ie', x: 24, y: 114 },
  { id: 'docs', title: 'My Documents', icon: '/xp/icons/folder.png', action: 'documents', x: 24, y: 208 },
  { id: 'recycle', title: 'Recycle Bin', icon: '/xp/icons/recycle-bin.png', action: 'recycle', x: 24, y: 302 },

  // Column 2: Portfolio
  { id: 'about', title: 'About Harold', icon: '/xp/icons/user.png', action: 'about', x: 124, y: 20 },
  { id: 'projects', title: 'Featured Projects', icon: '/xp/icons/309-32.png', action: 'projects', x: 124, y: 114 },
  { id: 'skills', title: 'Skills Matrix', icon: '/xp/icons/74-32.png', action: 'skills', x: 124, y: 208 },
  { id: 'resume', title: 'Harold Resume', icon: '/xp/icons/308-32.png', action: 'resume', x: 124, y: 302 },

  // Column 3: Games & Switch
  { id: 'doom', title: 'DOOM (1993)', icon: '/xp/doom_icon.png', action: 'doom', x: 224, y: 20 },
  { id: 'minesweeper', title: 'Minesweeper', icon: '/xp/icons/mine.png', action: 'minesweeper', x: 224, y: 114 },
  { id: 'pinball', title: '3D Pinball', icon: '/xp/icons/pinball.png', action: 'pinball', x: 224, y: 208 },
  { id: 'switch', title: 'Switch to Web', icon: '/xp/icons/earth.png', action: 'switch', x: 224, y: 302 }
]

export default function RetroPC({ onSwitchToClassic, embedded = false, onExpandFullscreen }) {
  const containerRef = useRef(null)

  // Wallpaper state with localStorage persistence
  const [currentWallpaper, setCurrentWallpaper] = useState(() => {
    const saved = localStorage.getItem('xp_wallpaper')
    if (saved) {
      try { return JSON.parse(saved) } catch { /* ignore */ }
    }
    return WALLPAPERS[0]
  })

  // Instant 1-click switch to modern web portfolio
  const handleSwitchToClassicClick = () => {
    if (onSwitchToClassic) onSwitchToClassic()
  }

  // Windows manager state - adaptive responsive default
  const [windows, setWindows] = useState(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
    return {
      ie: {
        id: 'ie',
        title: 'Portfolio Projects - HaroldOS Explorer',
        icon: '/xp/icons/ie.png',
        isOpen: true,
        isMinimized: false,
        isMaximized: isMobile,
        x: isMobile ? 8 : (embedded ? 24 : 48),
        y: isMobile ? 8 : (embedded ? 18 : 28),
        width: isMobile ? 340 : (embedded ? 760 : 860),
        height: isMobile ? 400 : (embedded ? 460 : 520),
        zIndex: 10,
        component: 'ie',
        props: { initialTab: 'projects' }
      }
    }
  })

  const [activeWindowId, setActiveWindowId] = useState('ie')
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null)
  const [fileSystem, setFileSystem] = useState(INITIAL_FILESYSTEM)

  // Draggable Desktop Icons state (persisted)
  const [desktopIcons, setDesktopIcons] = useState(() => {
    try {
      const saved = localStorage.getItem('xp_desktop_icons_v6')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return DEFAULT_DESKTOP_ICONS.map(def => {
            const found = parsed.find(p => p.id === def.id)
            return found ? { ...def, x: found.x, y: found.y } : def
          })
        }
      }
    } catch { /* ignore */ }
    return DEFAULT_DESKTOP_ICONS
  })

  const iconDragRef = useRef(null)

  const handleIconPointerDown = (e, iconId) => {
    if (e.button !== 0) return
    e.stopPropagation()
    setSelectedDesktopIcon(iconId)
    const icon = desktopIcons.find(i => i.id === iconId)
    if (!icon) return

    iconDragRef.current = {
      id: iconId,
      startX: e.clientX,
      startY: e.clientY,
      initX: icon.x,
      initY: icon.y,
      moved: false
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleIconPointerMove = (e) => {
    if (!iconDragRef.current) return
    const { id, startX, startY, initX, initY } = iconDragRef.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    if (!iconDragRef.current.moved && Math.hypot(dx, dy) > 4) {
      iconDragRef.current.moved = true
    }

    if (iconDragRef.current.moved) {
      const containerW = containerRef.current?.clientWidth || window.innerWidth
      const containerH = containerRef.current?.clientHeight || window.innerHeight
      const maxX = Math.max(10, containerW - 85)
      const maxY = Math.max(10, containerH - 100)
      const nextX = Math.max(10, Math.min(maxX, initX + dx))
      const nextY = Math.max(10, Math.min(maxY, initY + dy))

      setDesktopIcons(prev => prev.map(item => item.id === id ? { ...item, x: nextX, y: nextY } : item))
    }
  }

  const handleIconPointerUp = (e, iconId, action) => {
    if (!iconDragRef.current) return
    const wasMoved = iconDragRef.current.moved
    iconDragRef.current = null

    if (wasMoved) {
      setDesktopIcons(curr => {
        localStorage.setItem('xp_desktop_icons_v6', JSON.stringify(curr))
        return curr
      })
    } else {
      if (action === 'switch') {
        handleSwitchToClassicClick()
      } else if (typeof window !== 'undefined' && window.innerWidth < 768) {
        handleDesktopIconDblClick(action)
      }
    }
  }

  const handleAutoArrangeIcons = () => {
    setDesktopIcons(DEFAULT_DESKTOP_ICONS)
    localStorage.setItem('xp_desktop_icons_v6', JSON.stringify(DEFAULT_DESKTOP_ICONS))
  }

  const zIndexCounter = useRef(20)
  const dragRef = useRef(null)
  const resizeRef = useRef(null)

  // Clock state
  const [timeStr, setTimeStr] = useState('')
  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      setTimeStr(d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 10000)
    return () => clearInterval(interval)
  }, [])

  // Lock document scroll ONLY in standalone fullscreen mode
  useEffect(() => {
    if (!embedded) {
      document.documentElement.classList.add('pc-lock')
      return () => document.documentElement.classList.remove('pc-lock')
    }
  }, [embedded])

  const bringToFront = useCallback((id) => {
    zIndexCounter.current += 1
    const nextZ = zIndexCounter.current
    setWindows(prev => {
      if (!prev[id]) return prev
      return {
        ...prev,
        [id]: { ...prev[id], isMinimized: false, zIndex: nextZ }
      }
    })
    setActiveWindowId(id)
  }, [])

  const openWindow = useCallback((id, config) => {
    setStartMenuOpen(false)
    setContextMenu(null)
    zIndexCounter.current += 1
    const nextZ = zIndexCounter.current

    setWindows(prev => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ, ...config }
        }
      }
      const isMobile = window.innerWidth < 768
      const maxW = containerRef.current?.clientWidth || window.innerWidth
      const maxH = containerRef.current?.clientHeight || window.innerHeight
      const winW = isMobile ? Math.min(maxW - 16, 420) : Math.min(config.width || 760, maxW - 32)
      const winH = isMobile ? Math.min(maxH - 44, 460) : Math.min(config.height || 480, maxH - 48)
      const offset = (Object.keys(prev).filter(k => prev[k].isOpen).length % 6) * 22

      return {
        ...prev,
        [id]: {
          id,
          title: config.title || 'Window',
          icon: config.icon || '/xp/icons/308-32.png',
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile,
          x: isMobile ? 8 : Math.max(16, Math.min(32 + offset, maxW - winW - 16)),
          y: isMobile ? 8 : Math.max(16, Math.min(20 + offset, maxH - winH - 44)),
          width: winW,
          height: winH,
          zIndex: nextZ,
          component: config.component,
          props: config.props || {}
        }
      }
    })
    setActiveWindowId(id)
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      if (!prev[id]) return prev
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: false }
      }
    })
    if (activeWindowId === id) {
      setActiveWindowId(null)
    }
  }, [activeWindowId])

  const toggleMinimize = useCallback((id) => {
    setWindows(prev => {
      const win = prev[id]
      if (!win) return prev
      const isMin = !win.isMinimized
      return {
        ...prev,
        [id]: { ...win, isMinimized: isMin }
      }
    })
    if (activeWindowId === id) {
      setActiveWindowId(null)
    }
  }, [activeWindowId])

  const toggleMaximize = useCallback((id) => {
    setWindows(prev => {
      const win = prev[id]
      if (!win) return prev
      return {
        ...prev,
        [id]: { ...win, isMaximized: !win.isMaximized }
      }
    })
  }, [])

  // Desktop double clicks
  const handleDesktopIconDblClick = (action) => {
    switch (action) {
      case 'computer':
        openWindow('explorer-comp', {
          title: 'My Computer',
          icon: '/xp/icons/676-32.png',
          component: 'explorer',
          props: { currentPath: 'C:\\' }
        })
        break
      case 'documents':
        openWindow('explorer-docs', {
          title: 'My Documents',
          icon: '/xp/icons/folder.png',
          component: 'explorer',
          props: { currentPath: 'C:\\Documents and Settings\\Harold\\My Documents' }
        })
        break
      case 'ie':
        openWindow('ie', {
          title: 'Internet Explorer - Harold Doton Portfolio',
          icon: '/xp/icons/ie.png',
          component: 'ie',
          props: { initialTab: 'projects' }
        })
        break
      case 'doom':
        openWindow('doom', {
          title: 'DOOM (1993 Shareware) - C:\\GAMES\\DOOM',
          icon: '/xp/doom_icon.png',
          component: 'doom',
          width: 700,
          height: 520
        })
        break
      case 'minesweeper':
        openWindow('minesweeper', {
          title: 'Minesweeper',
          icon: '/xp/icons/mine.png',
          component: 'minesweeper',
          width: 330,
          height: 420
        })
        break
      case 'pinball':
        openWindow('pinball', {
          title: '3D Pinball for Windows - Space Cadet',
          icon: '/xp/icons/pinball.png',
          component: 'pinball',
          width: 600,
          height: 480
        })
        break
      case 'about':
        openWindow('ie', {
          title: 'Internet Explorer - About Harold',
          icon: '/xp/icons/user.png',
          component: 'ie',
          props: { initialTab: 'about' }
        })
        break
      case 'projects':
        openWindow('ie', {
          title: 'Internet Explorer - Featured Projects',
          icon: '/xp/icons/309-32.png',
          component: 'ie',
          props: { initialTab: 'projects' }
        })
        break
      case 'skills':
        openWindow('ie', {
          title: 'Internet Explorer - Technical Skills',
          icon: '/xp/icons/74-32.png',
          component: 'ie',
          props: { initialTab: 'skills' }
        })
        break
      case 'resume':
        const a = document.createElement('a')
        a.href = '/assets/Harold_Resume.pdf'
        a.download = 'Harold_Resume.pdf'
        a.click()
        break
      case 'switch':
        handleSwitchToClassicClick()
        break
      case 'recycle':
        openWindow('recycle', {
          title: 'Recycle Bin',
          icon: '/xp/icons/recycle-bin.png',
          component: 'recycle',
          width: 540,
          height: 380
        })
        break
      default:
        break
    }
  }

  // Window Drag handling
  const handleTitlePointerDown = (e, id) => {
    if (e.target.closest('button')) return
    bringToFront(id)
    const win = windows[id]
    if (win.isMaximized || window.innerWidth < 768) return

    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialWinX: win.x,
      initialWinY: win.y
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleTitlePointerMove = (e) => {
    if (!dragRef.current) return
    const { id, startX, startY, initialWinX, initialWinY } = dragRef.current
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    setWindows(prev => {
      const win = prev[id]
      if (!win) return prev
      const newX = Math.max(-win.width + 100, Math.min(window.innerWidth - 80, initialWinX + deltaX))
      const newY = Math.max(0, Math.min(window.innerHeight - 70, initialWinY + deltaY))
      return {
        ...prev,
        [id]: { ...win, x: newX, y: newY }
      }
    })
  }

  const handleTitlePointerUp = () => {
    dragRef.current = null
  }

  // Window Resize handling (solves "can't size the tabs/windows")
  const handleResizePointerDown = (e, id, direction) => {
    e.stopPropagation()
    e.preventDefault()
    bringToFront(id)
    const win = windows[id]
    if (win.isMaximized || window.innerWidth < 768) return

    resizeRef.current = {
      id,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      initialX: win.x,
      initialY: win.y,
      initialW: win.width,
      initialH: win.height
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleResizePointerMove = (e) => {
    if (!resizeRef.current) return
    const { id, direction, startX, startY, initialX, initialY, initialW, initialH } = resizeRef.current
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    setWindows(prev => {
      const win = prev[id]
      if (!win) return prev
      let nextW = initialW
      let nextH = initialH
      let nextX = initialX
      let nextY = initialY

      if (direction.includes('e')) {
        nextW = Math.max(340, Math.min(window.innerWidth - initialX - 10, initialW + deltaX))
      }
      if (direction.includes('s')) {
        nextH = Math.max(240, Math.min(window.innerHeight - initialY - 36, initialH + deltaY))
      }
      if (direction.includes('w')) {
        const potentialW = initialW - deltaX
        if (potentialW >= 340) {
          nextW = potentialW
          nextX = initialX + deltaX
        }
      }

      return {
        ...prev,
        [id]: { ...win, width: nextW, height: nextH, x: nextX, y: nextY }
      }
    })
  }

  const handleResizePointerUp = () => {
    resizeRef.current = null
  }

  // Right-click context menu
  const handleContextMenu = (e) => {
    if (e.target.closest('.xp-window, .xp-taskbar, .xp-start-menu')) return
    e.preventDefault()
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 180),
      y: Math.min(e.clientY, window.innerHeight - 200)
    })
  }

  const handleApplyWallpaper = (wp) => {
    setCurrentWallpaper(wp)
    localStorage.setItem('xp_wallpaper', JSON.stringify(wp))
  }

  const openDisplayProperties = () => {
    setContextMenu(null)
    setStartMenuOpen(false)
    openWindow('disp-props', {
      title: 'Display Properties',
      icon: '/xp/icons/74-32.png',
      component: 'display-properties',
      width: 480,
      height: 480
    })
  }

  const openFileFromExplorer = (file) => {
    if (file.type === 'text') {
      openWindow(`file-${file.id}`, {
        title: `${file.name} - Notepad`,
        icon: '/xp/icons/327-32.png',
        component: 'notepad',
        props: { title: file.name, initialContent: file.content || '' }
      })
    } else if (file.type === 'image') {
      openWindow(`img-${file.id}`, {
        title: `${file.name} - Windows Picture Viewer`,
        icon: '/xp/icons/680-32.png',
        component: 'image',
        props: { src: file.src, title: file.name }
      })
    } else if (file.type === 'link') {
      if (file.url.includes('twitch') || file.url.includes('github')) {
        window.open(file.url, '_blank')
      } else {
        openWindow('chrome', {
          title: 'Google Chrome',
          icon: '/xp/icons/chrome.svg',
          component: 'chrome',
          props: { initialTab: 'projects' }
        })
      }
    } else if (file.type === 'pdf') {
      const a = document.createElement('a')
      a.href = file.src
      a.download = file.name
      a.click()
    }
  }

  const openWindowsList = Object.values(windows).filter(w => w.isOpen)

  return (
    <div
      ref={containerRef}
      className={`xp-os-root ${embedded ? 'is-embedded' : ''}`}
      onContextMenu={handleContextMenu}
      onClick={() => {
        setContextMenu(null)
        if (startMenuOpen) setStartMenuOpen(false)
      }}
    >

      {/* Desktop Background Area */}
      <div
        className="xp-desktop-canvas"
        style={{
          backgroundImage: currentWallpaper?.src ? `url(${currentWallpaper.src})` : 'none',
          backgroundColor: currentWallpaper?.color || '#0a0a0f'
        }}
      >
        {/* Desktop Icons - Draggable & Movable by the User */}
        <div className="xp-desktop-icons-area">
          {desktopIcons.map((icon) => {
            const isSelected = selectedDesktopIcon === icon.id
            const isSwitch = icon.action === 'switch'
            return (
              <div
                key={icon.id}
                className={`xp-desktop-icon draggable ${isSelected ? 'selected' : ''}`}
                style={{
                  position: 'absolute',
                  left: `${icon.x}px`,
                  top: `${icon.y}px`
                }}
                onPointerDown={(e) => handleIconPointerDown(e, icon.id)}
                onPointerMove={handleIconPointerMove}
                onPointerUp={(e) => handleIconPointerUp(e, icon.id, icon.action)}
                onDoubleClick={() => handleDesktopIconDblClick(icon.action)}
                title={icon.title}
              >
                <img src={icon.icon} alt={icon.title} />
                <span>{icon.title}</span>
              </div>
            )
          })}
        </div>

        {/* Windows Rendering Loop */}
        {openWindowsList.map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized
          return (
            <div
              key={win.id}
              className={`xp-window ${isActive ? 'active' : ''} ${win.isMaximized ? 'maximized' : ''}`}
              style={{
                left: win.isMaximized ? 0 : win.x,
                top: win.isMaximized ? 0 : win.y,
                width: win.isMaximized ? '100%' : win.width,
                height: win.isMaximized ? 'calc(100% - 32px)' : win.height,
                zIndex: win.zIndex,
                display: win.isMinimized ? 'none' : 'flex'
              }}
              onPointerDown={() => bringToFront(win.id)}
            >
              {/* Window Title Bar */}
              <div
                className="xp-window-titlebar"
                onPointerDown={(e) => handleTitlePointerDown(e, win.id)}
                onPointerMove={handleTitlePointerMove}
                onPointerUp={handleTitlePointerUp}
                onDoubleClick={() => toggleMaximize(win.id)}
              >
                <div className="xp-title-left">
                  <img src={win.icon} alt="" className="xp-title-icon" onError={(e) => { e.target.style.display = 'none' }} />
                  <span className="xp-title-text">{win.title}</span>
                </div>
                <div className="xp-title-controls">
                  <button
                    type="button"
                    className="xp-title-btn minimize"
                    onClick={() => toggleMinimize(win.id)}
                    aria-label="Minimize"
                    title="Minimize"
                  >
                    _
                  </button>
                  <button
                    type="button"
                    className="xp-title-btn maximize"
                    onClick={() => toggleMaximize(win.id)}
                    aria-label="Maximize"
                    title={win.isMaximized ? 'Restore' : 'Maximize'}
                  >
                    {win.isMaximized ? '❐' : '□'}
                  </button>
                  <button
                    type="button"
                    className="xp-title-btn close"
                    onClick={() => closeWindow(win.id)}
                    aria-label="Close"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="xp-window-content">
                {win.component === 'ie' && (
                  <XPIE initialTab={win.props?.initialTab || 'projects'} />
                )}

                {win.component === 'chrome' && (
                  <XPChrome initialTab={win.props?.initialTab || 'projects'} />
                )}

                {win.component === 'tetris' && (
                  <TetrisApp />
                )}

                {win.component === 'minesweeper' && (
                  <MinesweeperApp />
                )}

                {win.component === 'pinball' && (
                  <div className="xp-pinball-container" style={{ width: '100%', height: '100%', background: '#000' }}>
                    <iframe
                      src="https://alula.github.io/SpaceCadetPinball/"
                      title="3D Pinball Space Cadet"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="autoplay"
                    />
                  </div>
                )}

                {win.component === 'explorer' && (
                  <XPExplorer
                    currentPath={win.props?.currentPath}
                    fileSystem={fileSystem}
                    onOpenFile={openFileFromExplorer}
                    onOpenFolder={(f) => console.log('Folder', f)}
                  />
                )}

                {win.component === 'display-properties' && (
                  <XPDisplayProperties
                    currentWallpaper={currentWallpaper}
                    onApplyWallpaper={handleApplyWallpaper}
                    onClose={() => closeWindow(win.id)}
                  />
                )}

                {win.component === 'notepad' && (
                  <XPNotepad
                    title={win.props?.title}
                    initialContent={win.props?.initialContent}
                  />
                )}

                {win.component === 'image' && (
                  <XPImageViewer
                    src={win.props?.src}
                    title={win.props?.title}
                  />
                )}

                {win.component === 'doom' && (
                  <div className="xp-doom-container">
                    <DoomApp />
                  </div>
                )}

                {win.component === 'recycle' && (
                  <div className="xp-recycle-empty">
                    <img src="/xp/icons/recycle-bin.png" alt="" />
                    <p>The Recycle Bin is empty.</p>
                  </div>
                )}
              </div>

              {/* Window Sizing & Resize Handles */}
              {!win.isMaximized && (
                <>
                  <div
                    className="xp-win-resize-handle edge-e"
                    onPointerDown={(e) => handleResizePointerDown(e, win.id, 'e')}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    title="Resize width"
                  />
                  <div
                    className="xp-win-resize-handle edge-s"
                    onPointerDown={(e) => handleResizePointerDown(e, win.id, 's')}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    title="Resize height"
                  />
                  <div
                    className="xp-win-resize-handle corner-se"
                    onPointerDown={(e) => handleResizePointerDown(e, win.id, 'se')}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    title="Resize window"
                  />
                  <div
                    className="xp-win-resize-handle edge-w"
                    onPointerDown={(e) => handleResizePointerDown(e, win.id, 'w')}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    title="Resize width"
                  />
                  <div
                    className="xp-win-resize-handle corner-sw"
                    onPointerDown={(e) => handleResizePointerDown(e, win.id, 'sw')}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    title="Resize window"
                  />
                </>
              )}
            </div>
          )
        })}

        {/* Right-Click Desktop Context Menu */}
        {contextMenu && (
          <div
            className="xp-context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleAutoArrangeIcons() }}>
              <strong>Auto-Arrange Icons</strong>
            </div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); openDisplayProperties() }}>
              Change Desktop Wallpaper
            </div>
            <div className="xp-ctx-sep"></div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleDesktopIconDblClick('ie') }}>
              Open Internet Explorer
            </div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleDesktopIconDblClick('doom') }}>
              Play DOOM (1993)
            </div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleDesktopIconDblClick('minesweeper') }}>
              Play Minesweeper
            </div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleDesktopIconDblClick('pinball') }}>
              Play 3D Pinball
            </div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); handleSwitchToClassicClick() }}>
              Switch to Modern Web View
            </div>
            <div className="xp-ctx-sep"></div>
            <div className="xp-ctx-item" onClick={() => { setContextMenu(null); window.location.reload() }}>
              Refresh Desktop
            </div>
          </div>
        )}
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="xp-start-menu" onClick={(e) => e.stopPropagation()}>
          {/* Top User Header */}
          <div className="xp-start-header">
            <div className="xp-start-avatar">
              <img src="/assets/HAROLDPHOTO1.jpg" alt="Harold" />
            </div>
            <span className="xp-start-username">John Harold</span>
          </div>

          {/* Dual Column Layout */}
          <div className="xp-start-body">
            {/* Left Column */}
            <div className="xp-start-left">
              <div
                className="xp-start-item pinned xp-start-switch-highlight"
                onClick={() => { setStartMenuOpen(false); handleSwitchToClassicClick() }}
                title="Return to Modern Portfolio"
              >
                <div className="xp-switch-start-icon-wrap">
                  <img src="/xp/icons/earth.png" alt="" className="xp-start-ico" />
                </div>
                <div className="xp-start-text">
                  <strong>Return to Portfolio</strong>
                  <span>Switch back to modern web view</span>
                </div>
              </div>

              <div
                className="xp-start-item pinned"
                onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('ie') }}
              >
                <img src="/xp/icons/ie.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>Internet</strong>
                  <span>Internet Explorer</span>
                </div>
              </div>

              <div
                className="xp-start-item pinned"
                onClick={() => { setStartMenuOpen(false); openWindow('ie-contact', { title: 'Internet Explorer - Contact', icon: '/xp/icons/ie.png', component: 'ie', props: { initialTab: 'contact' } }) }}
              >
                <img src="/xp/icons/mail.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>E-mail</strong>
                  <span>Outlook Express</span>
                </div>
              </div>

              <div className="xp-start-sep"></div>

              <div
                className="xp-start-item"
                onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('minesweeper') }}
              >
                <img src="/xp/icons/mine.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>Minesweeper</strong>
                  <span>Classic Windows Game</span>
                </div>
              </div>

              <div
                className="xp-start-item"
                onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('pinball') }}
              >
                <img src="/xp/icons/pinball.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>3D Pinball</strong>
                  <span>Space Cadet</span>
                </div>
              </div>

              <div
                className="xp-start-item"
                onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('doom') }}
              >
                <img src="/xp/doom_icon.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>DOOM</strong>
                  <span>Shareware (1993)</span>
                </div>
              </div>

              <div
                className="xp-start-item"
                onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('about') }}
              >
                <img src="/xp/icons/user.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>About Me</strong>
                  <span>Profile &amp; Career</span>
                </div>
              </div>

              <div
                className="xp-start-item"
                onClick={() => { setStartMenuOpen(false); openDisplayProperties() }}
              >
                <img src="/xp/icons/74-32.png" alt="" className="xp-start-ico" />
                <div className="xp-start-text">
                  <strong>Display Properties</strong>
                  <span>Change Wallpaper &amp; Theme</span>
                </div>
              </div>

              <div className="xp-start-all-progs" onClick={() => handleDesktopIconDblClick('documents')}>
                <span>All Programs</span>
                <span className="xp-all-progs-arrow">▶</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="xp-start-right">
              <div className="xp-start-item bold" onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('documents') }}>
                <img src="/xp/icons/folder.png" alt="" className="xp-start-ico-sm" />
                <span>My Documents</span>
              </div>

              <div className="xp-start-item bold" onClick={() => { setStartMenuOpen(false); openWindow('explorer-projs', { title: 'Projects', icon: '/xp/icons/folder.png', component: 'explorer', props: { currentPath: 'C:\\Documents and Settings\\Harold\\My Documents\\Projects' } }) }}>
                <img src="/xp/icons/folder.png" alt="" className="xp-start-ico-sm" />
                <span>My Projects</span>
              </div>

              <div className="xp-start-item bold" onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('computer') }}>
                <img src="/xp/icons/676-32.png" alt="" className="xp-start-ico-sm" />
                <span>My Computer</span>
              </div>

              <div className="xp-start-sep"></div>

              <div className="xp-start-item" onClick={() => { setStartMenuOpen(false); openDisplayProperties() }}>
                <img src="/xp/icons/74-32.png" alt="" className="xp-start-ico-sm" />
                <span>Control Panel</span>
              </div>

              <div className="xp-start-item" onClick={() => { setStartMenuOpen(false); handleDesktopIconDblClick('ie') }}>
                <img src="/xp/icons/299-32.png" alt="" className="xp-start-ico-sm" />
                <span>Help and Support</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="xp-start-footer">
            <button
              type="button"
              className="xp-footer-btn"
              onClick={() => { setStartMenuOpen(false); alert('Logged in as: John Harold (Administrator)') }}
            >
              <img src="/xp/icons/user.png" alt="" />
              <span>Log Off</span>
            </button>
            <button
              type="button"
              className="xp-footer-btn"
              onClick={() => {
                setStartMenuOpen(false)
                if (confirm('Turn off HaroldOS? Click OK to restart session.')) {
                  window.location.reload()
                }
              }}
            >
              <img src="/xp/icons/windows-off.png" alt="" />
              <span>Turn Off Computer</span>
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <footer className="xp-taskbar" onClick={(e) => e.stopPropagation()}>
        {/* Start Button */}
        <button
          type="button"
          className={`xp-start-button ${startMenuOpen ? 'pressed' : ''}`}
          onClick={() => setStartMenuOpen(o => !o)}
          title="Click here to begin"
        >
          <img src="/xp/icons/start.png" alt="" className="xp-start-logo" onError={(e) => { e.target.style.display = 'none' }} />
          <span className="xp-start-label">start</span>
        </button>

        {/* Quick Launch */}
        <div className="xp-quick-launch">
          <button
            type="button"
            className="xp-quick-btn"
            title="Launch Internet Explorer"
            onClick={() => handleDesktopIconDblClick('ie')}
          >
            <img src="/xp/icons/ie.png" alt="Internet Explorer" />
          </button>
          <button
            type="button"
            className="xp-quick-btn"
            title="Play Minesweeper"
            onClick={() => handleDesktopIconDblClick('minesweeper')}
          >
            <img src="/xp/icons/mine.png" alt="Minesweeper" />
          </button>
          <button
            type="button"
            className="xp-quick-btn"
            title="Display Properties"
            onClick={openDisplayProperties}
          >
            <img src="/xp/icons/74-32.png" alt="Display" />
          </button>
          <button
            type="button"
            className="xp-quick-btn"
            title="Show Desktop (Minimize all)"
            onClick={() => {
              setWindows(prev => {
                const updated = {}
                Object.keys(prev).forEach(k => {
                  updated[k] = { ...prev[k], isMinimized: true }
                })
                return updated
              })
              setActiveWindowId(null)
            }}
          >
            <img src="/xp/icons/folder.png" alt="Desktop" />
          </button>
        </div>

        {/* Running Window Taskbar Buttons */}
        <div className="xp-taskbar-tasks">
          {openWindowsList.map((win) => {
            const isFront = activeWindowId === win.id && !win.isMinimized
            return (
              <button
                key={win.id}
                type="button"
                className={`xp-task-button ${isFront ? 'active' : ''}`}
                onClick={() => {
                  if (win.isMinimized) {
                    bringToFront(win.id)
                  } else if (activeWindowId === win.id) {
                    toggleMinimize(win.id)
                  } else {
                    bringToFront(win.id)
                  }
                }}
              >
                <img src={win.icon} alt="" className="xp-task-icon" onError={(e) => { e.target.style.display = 'none' }} />
                <span className="xp-task-title">{win.title}</span>
              </button>
            )
          })}
        </div>

        {/* System Tray */}
        <div className="xp-system-tray">
          <div className="xp-tray-icons">
            {embedded && onExpandFullscreen && (
              <button
                type="button"
                className="xp-tray-web-toggle"
                onClick={onExpandFullscreen}
                title="Expand to Fullscreen Experience"
              >
                <span>⛶ FULLSCREEN</span>
              </button>
            )}
            <button
              type="button"
              className="xp-tray-web-toggle"
              onClick={handleSwitchToClassicClick}
              title="Return to Modern Portfolio"
            >
              <span>← PORTFOLIO</span>
            </button>
            <img src="/xp/icons/earth.png" alt="" className="xp-tray-ico-img" title="Local Area Connection: Connected" />
            <img src="/xp/icons/winamp.png" alt="" className="xp-tray-ico-img" title="Audio Device: Active" />
          </div>
          <span className="xp-clock">{timeStr}</span>
        </div>
      </footer>
    </div>
  )
}
