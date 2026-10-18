import { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Work from '../components/Work'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

const CHROME_TABS = [
  { id: 'home', title: 'Home · Harold Doton', url: 'https://harold.dev/', icon: '🏠' },
  { id: 'about', title: 'About · John Harold', url: 'https://harold.dev/about', icon: '👤' },
  { id: 'projects', title: 'Projects · Featured Work', url: 'https://harold.dev/projects', icon: '💼' },
  { id: 'skills', title: 'Skills · Tech Matrix', url: 'https://harold.dev/skills', icon: '⚡' },
  { id: 'contact', title: 'Contact · Get in Touch', url: 'https://harold.dev/contact', icon: '📬' },
  { id: 'google', title: 'New Tab', url: 'https://www.google.com/', icon: '🔍' }
]

export default function XPChrome({ initialTab = 'projects' }) {
  const [openTabs, setOpenTabs] = useState(() => CHROME_TABS.map(t => t.id))
  const [activeTab, setActiveTab] = useState(initialTab)
  const currentTabObj = CHROME_TABS.find(t => t.id === activeTab) || CHROME_TABS[0]
  const [addressVal, setAddressVal] = useState(currentTabObj.url)
  const [history, setHistory] = useState([initialTab])
  const [historyIdx, setHistoryIdx] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)

  const navigateTo = (tabKey) => {
    const target = CHROME_TABS.find(t => t.id === tabKey)
    if (!target) return

    if (!openTabs.includes(tabKey)) {
      setOpenTabs(prev => [...prev, tabKey])
    }
    setActiveTab(tabKey)
    setAddressVal(target.url)

    const nextHistory = history.slice(0, historyIdx + 1).concat(tabKey)
    setHistory(nextHistory)
    setHistoryIdx(nextHistory.length - 1)
  }

  const closeTab = (e, tabId) => {
    e.stopPropagation()
    if (openTabs.length <= 1) return // keep at least one tab
    const nextTabs = openTabs.filter(id => id !== tabId)
    setOpenTabs(nextTabs)
    if (activeTab === tabId) {
      const nextActive = nextTabs[nextTabs.length - 1]
      setActiveTab(nextActive)
      const obj = CHROME_TABS.find(t => t.id === nextActive)
      if (obj) setAddressVal(obj.url)
    }
  }

  const handleNewTab = () => {
    if (!openTabs.includes('google')) {
      setOpenTabs(prev => [...prev, 'google'])
    }
    setActiveTab('google')
    setAddressVal('https://www.google.com/')
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    const lower = addressVal.toLowerCase().trim()
    if (lower.includes('about')) navigateTo('about')
    else if (lower.includes('project') || lower.includes('work')) navigateTo('projects')
    else if (lower.includes('skill')) navigateTo('skills')
    else if (lower.includes('contact') || lower.includes('mail')) navigateTo('contact')
    else if (lower.includes('google') || lower.includes('newtab')) navigateTo('google')
    else if (lower.includes('home') || lower === 'https://harold.dev' || lower === 'harold.dev') navigateTo('home')
    else {
      setSearchQuery(addressVal)
      setActiveTab('google')
    }
  }

  const goBack = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1]
      setHistoryIdx(historyIdx - 1)
      setActiveTab(prev)
      const obj = CHROME_TABS.find(t => t.id === prev)
      if (obj) setAddressVal(obj.url)
    }
  }

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1]
      setHistoryIdx(historyIdx + 1)
      setActiveTab(next)
      const obj = CHROME_TABS.find(t => t.id === next)
      if (obj) setAddressVal(obj.url)
    }
  }

  return (
    <div className="xp-chrome-window">
      {/* Chrome Tab Strip Header */}
      <div className="xp-chrome-header">
        <div className="xp-chrome-tabs-strip">
          {openTabs.map((tabId) => {
            const tab = CHROME_TABS.find(t => t.id === tabId)
            if (!tab) return null
            const isActive = activeTab === tabId

            return (
              <div
                key={tab.id}
                className={`xp-chrome-tab ${isActive ? 'active' : ''}`}
                onClick={() => navigateTo(tab.id)}
                title={tab.title}
              >
                <span className="chrome-tab-ico">{tab.icon}</span>
                <span className="chrome-tab-title">{tab.title}</span>
                {openTabs.length > 1 && (
                  <button
                    type="button"
                    className="chrome-tab-close"
                    onClick={(e) => closeTab(e, tab.id)}
                    title="Close tab"
                  >
                    ✕
                  </button>
                )}
              </div>
            )
          })}

          <button
            type="button"
            className="chrome-newtab-btn"
            onClick={handleNewTab}
            title="New tab"
          >
            +
          </button>
        </div>
      </div>

      {/* Chrome Navigation & Omnibox Bar */}
      <div className="xp-chrome-toolbar">
        <div className="chrome-nav-buttons">
          <button
            type="button"
            className="chrome-btn nav"
            onClick={goBack}
            disabled={historyIdx <= 0}
            title="Click to go back"
          >
            ◀
          </button>
          <button
            type="button"
            className="chrome-btn nav"
            onClick={goForward}
            disabled={historyIdx >= history.length - 1}
            title="Click to go forward"
          >
            ▶
          </button>
          <button
            type="button"
            className="chrome-btn nav"
            onClick={() => navigateTo(activeTab)}
            title="Reload this page"
          >
            ↻
          </button>
          <button
            type="button"
            className="chrome-btn nav"
            onClick={() => navigateTo('home')}
            title="Open the home page"
          >
            🏠
          </button>
        </div>

        {/* Omnibox / URL Bar */}
        <form className="chrome-omnibox-form" onSubmit={handleAddressSubmit}>
          <div className="chrome-omnibox">
            <span className="chrome-lock-icon" title="View site information">
              🔒
            </span>
            <input
              type="text"
              className="chrome-omnibox-input"
              value={addressVal}
              onChange={(e) => setAddressVal(e.target.value)}
              spellCheck="false"
            />
            <button
              type="button"
              className={`chrome-star-btn ${isBookmarked ? 'active' : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              title="Bookmark this tab"
            >
              {isBookmarked ? '★' : '☆'}
            </button>
          </div>
        </form>

        {/* Extensions & Profile */}
        <div className="chrome-actions-right">
          <span className="chrome-action-badge" title="Extensions">🧩</span>
          <div className="chrome-profile-avatar" title="Google Account: John Harold">
            <img src="/assets/HAROLDPHOTO1.jpg" alt="Profile" />
          </div>
        </div>
      </div>

      {/* Chrome Bookmarks Bar */}
      <div className="xp-chrome-bookmarks">
        <button type="button" className="chrome-bm-item" onClick={() => navigateTo('projects')}>
          <span>📁 Featured Work</span>
        </button>
        <button type="button" className="chrome-bm-item" onClick={() => navigateTo('about')}>
          <span>👤 About Harold</span>
        </button>
        <button type="button" className="chrome-bm-item" onClick={() => navigateTo('skills')}>
          <span>⚡ Tech Stack</span>
        </button>
        <a
          href="https://twitch.tv/luna_ai_vtuber"
          target="_blank"
          rel="noreferrer"
          className="chrome-bm-item"
        >
          <span>📺 Luna AI Streamer</span>
        </a>
        <a
          href="https://github.com/Haruuowo"
          target="_blank"
          rel="noreferrer"
          className="chrome-bm-item"
        >
          <span>🐙 GitHub (@Haruuowo)</span>
        </a>
        <a
          href="/assets/Harold_Resume.pdf"
          download="Harold_Resume.pdf"
          className="chrome-bm-item"
        >
          <span>📄 Harold_Resume.pdf</span>
        </a>
      </div>

      {/* Browser Viewport with Original Sections */}
      <div className={`xp-chrome-viewport ${activeTab === 'google' ? 'chrome-viewport-light' : 'original-portfolio-theme'}`}>
        {activeTab === 'home' && (
          <div className="ie-original-section-container">
            <Hero onNavigate={navigateTo} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="ie-original-section-container">
            <About />
            <Experience />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="ie-original-section-container">
            <Work />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="ie-original-section-container">
            <Skills />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="ie-original-section-container">
            <Contact />
          </div>
        )}

        {activeTab === 'google' && (
          <div className="chrome-google-page">
            <div className="ie-google-center">
              <h1 className="google-logo">
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
              </h1>
              <form
                className="google-search-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchQuery) {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank')
                  }
                }}
              >
                <input
                  type="text"
                  className="google-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Google or type a URL..."
                  autoFocus
                />
                <div className="google-btn-row">
                  <button type="submit" className="xp-win-btn">Google Search</button>
                  <button
                    type="button"
                    className="xp-win-btn"
                    onClick={() => navigateTo('projects')}
                  >
                    I'm Feeling Lucky
                  </button>
                </div>
              </form>
              <div className="google-tips">
                <span>Quick bookmarks:</span>
                <button type="button" onClick={() => navigateTo('projects')}>Projects</button>
                <button type="button" onClick={() => navigateTo('about')}>About Harold</button>
                <button type="button" onClick={() => navigateTo('skills')}>Skills</button>
                <button type="button" onClick={() => navigateTo('contact')}>Contact</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
