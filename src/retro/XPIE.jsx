import { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Work from '../components/Work'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

const BROWSER_PAGES = {
  home: {
    id: 'home',
    title: 'Harold Doton - Home',
    url: 'http://harold.dev/',
    icon: '/xp/icons/home.png'
  },
  about: {
    id: 'about',
    title: 'About Harold - Holy Angel University',
    url: 'http://harold.dev/about',
    icon: '/xp/icons/user.png'
  },
  projects: {
    id: 'projects',
    title: 'Featured Projects - HaroldOS',
    url: 'http://harold.dev/projects',
    icon: '/xp/icons/folder.png'
  },
  skills: {
    id: 'skills',
    title: 'Tech Stack & Skills Matrix',
    url: 'http://harold.dev/skills',
    icon: '/xp/icons/74-32.png'
  },
  contact: {
    id: 'contact',
    title: 'Contact Harold Doton',
    url: 'http://harold.dev/contact',
    icon: '/xp/icons/mail.png'
  },
  google: {
    id: 'google',
    title: 'Google Search',
    url: 'http://www.google.com/',
    icon: '/xp/icons/earth.png'
  }
}

export default function XPIE({ initialTab = 'projects' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [addressVal, setAddressVal] = useState(BROWSER_PAGES[initialTab]?.url || 'http://harold.dev/')
  const [history, setHistory] = useState([initialTab])
  const [historyIdx, setHistoryIdx] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const navigateTo = (tabKey) => {
    if (BROWSER_PAGES[tabKey]) {
      setActiveTab(tabKey)
      setAddressVal(BROWSER_PAGES[tabKey].url)
      const newHistory = history.slice(0, historyIdx + 1).concat(tabKey)
      setHistory(newHistory)
      setHistoryIdx(newHistory.length - 1)
    }
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    const lower = addressVal.toLowerCase().trim()
    if (lower.includes('about')) navigateTo('about')
    else if (lower.includes('project') || lower.includes('work')) navigateTo('projects')
    else if (lower.includes('skill')) navigateTo('skills')
    else if (lower.includes('contact') || lower.includes('mail')) navigateTo('contact')
    else if (lower.includes('google')) navigateTo('google')
    else if (lower.includes('home') || lower === 'http://harold.dev/' || lower === 'harold.dev') navigateTo('home')
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
      setAddressVal(BROWSER_PAGES[prev]?.url || 'http://harold.dev/')
    }
  }

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1]
      setHistoryIdx(historyIdx + 1)
      setActiveTab(next)
      setAddressVal(BROWSER_PAGES[next]?.url || 'http://harold.dev/')
    }
  }

  return (
    <div className="xp-ie-window">
      {/* Menu Bar */}
      <div className="xp-ie-menubar">
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span><u>V</u>iew</span>
        <span>F<u>a</u>vorites</span>
        <span><u>T</u>ools</span>
        <span><u>H</u>elp</span>
      </div>

      {/* Navigation Toolbar */}
      <div className="xp-ie-toolbar">
        <button
          type="button"
          className="xp-ie-tool-btn"
          onClick={goBack}
          disabled={historyIdx <= 0}
          title="Back"
        >
          <img src="/xp/icons/back.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Back</span>
        </button>

        <button
          type="button"
          className="xp-ie-tool-btn"
          onClick={goForward}
          disabled={historyIdx >= history.length - 1}
          title="Forward"
        >
          <img src="/xp/icons/forward.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Forward</span>
        </button>

        <button type="button" className="xp-ie-tool-btn" onClick={() => navigateTo(activeTab)} title="Stop">
          <img src="/xp/icons/stop.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Stop</span>
        </button>

        <button type="button" className="xp-ie-tool-btn" onClick={() => navigateTo(activeTab)} title="Refresh">
          <img src="/xp/icons/refresh.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Refresh</span>
        </button>

        <button type="button" className="xp-ie-tool-btn" onClick={() => navigateTo('home')} title="Home">
          <img src="/xp/icons/home.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Home</span>
        </button>

        <span className="xp-ie-tool-sep"></span>

        <button type="button" className="xp-ie-tool-btn" onClick={() => navigateTo('google')} title="Search">
          <img src="/xp/icons/299-32.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Search</span>
        </button>

        <button type="button" className="xp-ie-tool-btn" onClick={() => navigateTo('contact')} title="Mail">
          <img src="/xp/icons/mail.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Mail</span>
        </button>

        <div className="xp-ie-logo-throbber">
          <img src="/xp/icons/windows.png" alt="Windows Logo" />
        </div>
      </div>

      {/* Address Bar */}
      <form className="xp-ie-addressbar" onSubmit={handleAddressSubmit}>
        <span className="xp-ie-addr-label">Address</span>
        <div className="xp-ie-addr-input-wrap">
          <img src="/xp/icons/earth.png" alt="" className="xp-ie-addr-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <input
            type="text"
            className="xp-ie-addr-input"
            value={addressVal}
            onChange={(e) => setAddressVal(e.target.value)}
            spellCheck="false"
          />
          <button type="submit" className="xp-ie-go-btn" title="Go">
            <img src="/xp/icons/290.png" alt="Go" onError={(e) => { e.target.parentElement.textContent = 'Go' }} />
            <span>Go</span>
          </button>
        </div>
      </form>

      {/* Browser Tab Bar */}
      <div className="xp-ie-tabs" role="tablist">
        {Object.keys(BROWSER_PAGES).map((key) => {
          const tab = BROWSER_PAGES[key]
          const isActive = activeTab === key
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`xp-ie-tab ${isActive ? 'active' : ''}`}
              onClick={() => navigateTo(tab.id)}
            >
              <img src={tab.icon} alt="" className="xp-ie-tab-img" onError={(e) => { e.target.style.display = 'none' }} />
              <span className="xp-ie-tab-title">{tab.id.toUpperCase()}</span>
            </button>
          )
        })}
      </div>

      {/* Browser Content Viewport */}
      <div className={`xp-ie-viewport ${activeTab === 'google' ? 'ie-viewport-light' : 'original-portfolio-theme'}`}>
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
          <div className="ie-page ie-google">
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
                  placeholder="Search the Web or type a portfolio topic..."
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
                <span>Quick links:</span>
                <button type="button" onClick={() => navigateTo('projects')}>Projects</button>
                <button type="button" onClick={() => navigateTo('about')}>About Harold</button>
                <button type="button" onClick={() => navigateTo('skills')}>Skills</button>
                <button type="button" onClick={() => navigateTo('contact')}>Contact</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="xp-ie-statusbar">
        <div className="xp-ie-status-left">
          <span className="xp-ie-status-dot">●</span>
          <span>Done</span>
        </div>
        <div className="xp-ie-status-right">
          <span className="xp-ie-zone">
            <img src="/xp/icons/earth.png" alt="" className="ie-status-ico" onError={(e) => { e.target.style.display = 'none' }} />
            Internet | Protected Mode: Off
          </span>
        </div>
      </div>
    </div>
  )
}
