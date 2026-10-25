import { useEffect, useRef, useState, useMemo } from 'react'
import { fetchGitHubProjects, FALLBACK_PROJECTS } from '../services/github'

const CURATED_REPO_KEYS = [
  'AI_VirtualYoutuber',
  'SmartSort',
  'procastimate_app',
  'CityPopDiscography-APSI',
  'Reaction-image-project',
]

export default function Work() {
  const sectionRef = useRef(null)
  const toolbarRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState('syncing') // 'synced' | 'syncing' | 'cached' | 'error'

  // Load GitHub projects
  const loadProjects = async (forceRefresh = false) => {
    setIsSyncing(true)
    setSyncStatus('syncing')
    try {
      const result = await fetchGitHubProjects(forceRefresh)
      if (result.projects && result.projects.length > 0) {
        setProjects(result.projects)
        setSyncStatus(result.source === 'live' ? 'synced' : 'cached')
      } else {
        setSyncStatus('error')
      }
    } catch {
      setSyncStatus('error')
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    loadProjects(false)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Curated 5 useful projects specifically kept on main page
  const curatedProjects = useMemo(() => {
    const list = []
    CURATED_REPO_KEYS.forEach((repoKey) => {
      const match = projects.find(
        (p) =>
          p.repoName === repoKey ||
          p.id === repoKey ||
          p.source?.toLowerCase().endsWith(`/${repoKey.toLowerCase()}`)
      )
      if (match) {
        list.push(match)
      } else {
        const fb = FALLBACK_PROJECTS.find(
          (f) => f.repoName === repoKey || f.id === repoKey
        )
        if (fb) list.push(fb)
      }
    })
    return list
  }, [projects])

  // Filter projects by category/tag when expanded
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    if (activeFilter === 'featured') return curatedProjects
    if (activeFilter === 'python') {
      return projects.filter(
        (p) =>
          p.language?.toLowerCase() === 'python' ||
          p.tags?.some((t) => t.toLowerCase().includes('python'))
      )
    }
    if (activeFilter === 'flutter') {
      return projects.filter(
        (p) =>
          p.language?.toLowerCase() === 'dart' ||
          p.tags?.some(
            (t) =>
              t.toLowerCase().includes('flutter') ||
              t.toLowerCase().includes('dart')
          )
      )
    }
    if (activeFilter === 'web') {
      return projects.filter(
        (p) =>
          p.language?.toLowerCase() === 'javascript' ||
          p.language?.toLowerCase() === 'html' ||
          p.tags?.some(
            (t) =>
              t.toLowerCase().includes('react') ||
              t.toLowerCase().includes('javascript') ||
              t.toLowerCase().includes('node') ||
              t.toLowerCase().includes('html')
          )
      )
    }
    return projects
  }, [projects, activeFilter, curatedProjects])

  // Display only the curated 5 projects initially on the main page
  const displayedProjects = isExpanded ? filteredProjects : curatedProjects

  const handleExpandToTabs = () => {
    setIsExpanded(true)
    setActiveFilter('all')
    setTimeout(() => {
      toolbarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleCollapseToCurated = () => {
    setIsExpanded(false)
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <section id="work" ref={sectionRef}>
      <div className="container">

        {/* Section Header */}
        <div className={`proj-header reveal ${visible ? 'visible' : ''}`}>
          <div className="proj-header-left">
            <div className="sec-head sec-head-stack" style={{ marginBottom: '16px' }}>
              <span className="sec-kicker">03 — Projects</span>
              <h2 className="sec-title">
                {isExpanded ? 'All Repositories.' : 'Featured Works.'}
              </h2>
            </div>
            <p className="proj-intro">
              {isExpanded
                ? 'Explore all live synced GitHub repositories across Python, Flutter, Mobile, and Web Engineering.'
                : 'Curated software works — autonomous AI streamers, desktop utilities, productivity mobile apps, and vintage web platforms.'}
            </p>
          </div>
          <a
            href="https://github.com/Haruuowo?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="proj-github-link"
          >
            View all on GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* GitHub Live Sync Toolbar & Filters (Accessible when expanded into tabs) */}
        {isExpanded && (
          <div ref={toolbarRef} className={`proj-toolbar reveal ${visible ? 'visible' : ''}`}>
            <div className="proj-filters">
              <button
                type="button"
                className={`proj-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All ({projects.length})
              </button>
              <button
                type="button"
                className={`proj-filter-btn ${activeFilter === 'featured' ? 'active' : ''}`}
                onClick={() => setActiveFilter('featured')}
              >
                ★ Featured ({curatedProjects.length})
              </button>
              <button
                type="button"
                className={`proj-filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
                onClick={() => setActiveFilter('python')}
              >
                Python & AI
              </button>
              <button
                type="button"
                className={`proj-filter-btn ${activeFilter === 'flutter' ? 'active' : ''}`}
                onClick={() => setActiveFilter('flutter')}
              >
                Flutter & Mobile
              </button>
              <button
                type="button"
                className={`proj-filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                onClick={() => setActiveFilter('web')}
              >
                Web & Fullstack
              </button>
            </div>

            <div className="proj-sync-status">
              <span className="proj-sync-pill">
                <span className="proj-sync-dot" />
                {isSyncing ? 'Syncing GitHub...' : 'Live GitHub Sync'}
              </span>
              <button
                type="button"
                className="proj-sync-refresh-btn"
                onClick={() => loadProjects(true)}
                disabled={isSyncing}
                title="Refresh repositories from GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="13"
                  height="13"
                  className={isSyncing ? 'spinning' : ''}
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className={`proj-grid reveal ${visible ? 'visible' : ''}`}>
          {displayedProjects.map((p, idx) => {
            const moreUrl = p.source || p.website || (p.repoName ? `https://github.com/Haruuowo/${p.repoName}` : 'https://github.com/Haruuowo')
            return (
              <div key={p.id || p.repoName || idx} className="proj-card">
                {/* Image Container with Badges */}
                <div className="proj-card-img-wrap">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="proj-card-code-preview">
                      <div className="proj-code-window-bar">
                        <div className="proj-code-dots">
                          <span className="proj-code-dot red" />
                          <span className="proj-code-dot yellow" />
                          <span className="proj-code-dot green" />
                        </div>
                        <span className="proj-code-repo-name">Haruuowo/{p.repoName || p.title}</span>
                      </div>

                      <div className="proj-code-center">
                        <div className="proj-code-lang-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        </div>
                        <span className="proj-code-title">{p.title}</span>
                      </div>

                      <div className="proj-code-footer">
                        <span>{p.language || 'Code'}</span>
                        {p.stars > 0 && (
                          <span className="proj-stars-count">★ {p.stars}</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="proj-card-links">
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link-badge"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                        </svg>
                        Website
                      </a>
                    )}
                    {p.source && (
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link-badge"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="proj-card-body">
                  <div className="proj-card-header">
                    <span className="proj-cat-badge">{p.category}</span>
                    <span className="proj-card-dates">
                      {p.stars > 0 && <span style={{ color: 'var(--gold)', marginRight: '6px' }}>★ {p.stars} ·</span>}
                      {p.dates}
                    </span>
                  </div>

                  <a
                    href={moreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-card-title-link"
                    title={`Open ${p.title} in another tab`}
                  >
                    <h4 className="proj-card-title">
                      <span>{p.title}</span>
                      <span className="proj-card-arrow">↗</span>
                    </h4>
                  </a>

                  <p className="proj-card-desc">{p.desc}</p>

                  <div className="proj-card-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="proj-tag proj-tag-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="proj-card-actions">
                    <a
                      href={moreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-btn proj-btn-more"
                      title="Open project details in another tab"
                    >
                      <span>Click More</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>

                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-btn proj-btn-live"
                        title="Open live website in another tab"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                        </svg>
                        Live Demo ↗
                      </a>
                    )}

                    {p.source && moreUrl !== p.source && (
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-btn proj-btn-code"
                        title="Open GitHub repository in another tab"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Underneath: See More Projects CTA / Action Bar */}
        <div className="proj-footer-cta">
          {!isExpanded ? (
            <div className="proj-see-more-bar">
              <button
                type="button"
                className="proj-cta-btn proj-cta-expand"
                onClick={handleExpandToTabs}
              >
                <span>See More Projects</span>
                <span className="proj-cta-count">({projects.length} repos)</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <a
                href="https://github.com/Haruuowo?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta-btn proj-cta-github"
                title="Open Haruuowo repositories in another tab"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>View on GitHub ↗</span>
              </a>
            </div>
          ) : (
            <div className="proj-see-more-bar">
              <button
                type="button"
                className="proj-cta-btn proj-cta-collapse"
                onClick={handleCollapseToCurated}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                <span>Show Featured Only ({curatedProjects.length})</span>
              </button>

              <a
                href="https://github.com/Haruuowo?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta-btn proj-cta-github"
                title="Open Haruuowo repositories in another tab"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>View on GitHub ↗</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}