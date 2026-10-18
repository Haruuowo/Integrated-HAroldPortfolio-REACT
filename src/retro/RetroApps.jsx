import { useEffect, useRef, useState } from 'react'
import { ALL_SKILLS } from '../data/skillsData'
import { PROJECTS, EXPERIENCE, CONTACT_LINKS, README_TEXT } from './pcData'

/* ───────── README.txt (Notepad) ───────── */
export function ReadmeApp() {
  return (
    <div className="rw-notepad">
      <div className="rw-menubar" aria-hidden="true">
        <span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>S</u>earch</span><span><u>H</u>elp</span>
      </div>
      <div className="rw-notepad-body">
        <img className="rw-notepad-photo" src="/assets/HAROLDPHOTO1.jpg" alt="John Harold Doton" />
        <pre>{README_TEXT}</pre>
      </div>
    </div>
  )
}

/* ───────── PROJECTS (Explorer) ───────── */
export function ProjectsApp() {
  const [sel, setSel] = useState(PROJECTS[0].id)
  const p = PROJECTS.find((x) => x.id === sel)
  return (
    <div className="rw-explorer">
      <div className="rw-menubar" aria-hidden="true">
        <span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>V</u>iew</span><span><u>H</u>elp</span>
      </div>
      <div className="rw-explorer-main">
        <ul className="rw-tree rw-sunken" role="listbox" aria-label="Projects">
          {PROJECTS.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                role="option"
                aria-selected={x.id === sel}
                className={x.id === sel ? 'sel' : ''}
                onClick={() => setSel(x.id)}
              >
                <span className="rw-tree-ico" />
                {x.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="rw-detail rw-sunken">
          <img src={p.image} alt={p.title} className="rw-detail-img" />
          <h3>{p.title}</h3>
          <p className="rw-detail-meta">{p.category} · {p.dates}</p>
          <p>{p.desc}</p>
          <div className="rw-tags">
            {p.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="rw-btn-row">
            {p.website && <a className="rw-btn" href={p.website} target="_blank" rel="noreferrer">Open Live</a>}
            {p.source && <a className="rw-btn" href={p.source} target="_blank" rel="noreferrer">View Source</a>}
          </div>
        </div>
      </div>
      <div className="rw-statusbar">{PROJECTS.length} object(s)</div>
    </div>
  )
}

/* ───────── SKILLS (property sheet) ───────── */
const SKILL_TABS = [
  { id: 'Languages', label: 'Languages' },
  { id: 'AI & ML', label: 'AI & ML' },
  { id: 'Frameworks', label: 'Frameworks' },
  { id: 'Databases', label: 'Databases' },
  { id: 'Tools', label: 'Tools' },
  { id: 'Design', label: 'Design' },
]

export function SkillsApp() {
  const [tab, setTab] = useState('Languages')
  const items = ALL_SKILLS.filter((s) => s.cat === tab)
  return (
    <div className="rw-sheet">
      <div className="rw-tabs" role="tablist">
        {SKILL_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rw-sheet-body">
        <p className="rw-sheet-lead">Installed technologies · {items.length} item(s)</p>
        <ul className="rw-skill-list rw-sunken">
          {items.map((s) => (
            <li key={s.name}>
              <img src={s.icon} alt="" />
              <span className="n">{s.name}</span>
              <span className="y">{s.years}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ───────── EXPERIENCE ───────── */
export function ExperienceApp() {
  return (
    <div className="rw-doc">
      {EXPERIENCE.map((e) => (
        <article key={e.title} className="rw-exp">
          <img src={e.logo} alt="" onError={(ev) => { ev.currentTarget.style.display = 'none' }} />
          <div>
            <h3>{e.title}</h3>
            <p className="rw-detail-meta">{e.org} · {e.date}</p>
            <p>{e.desc}</p>
            <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ───────── CONTACT (Mail) ───────── */
export function ContactApp() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const send = (e) => {
    e.preventDefault()
    window.location.href =
      'mailto:harolddoton@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body)
  }
  return (
    <form className="rw-mail" onSubmit={send}>
      <div className="rw-mail-links">
        {CONTACT_LINKS.map((c) => (
          <div key={c.label} className="rw-mail-link">
            <b>{c.label}:</b>{' '}
            {c.href ? <a href={c.href} target="_blank" rel="noreferrer">{c.value}</a> : c.value}
          </div>
        ))}
      </div>
      <label className="rw-field">To:
        <input value="harolddoton@gmail.com" readOnly className="rw-sunken" />
      </label>
      <label className="rw-field">Subject:
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="rw-sunken" placeholder="Let's build something" />
      </label>
      <textarea
        className="rw-sunken"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message here..."
        rows={6}
      />
      <div className="rw-btn-row">
        <button type="submit" className="rw-btn">Send</button>
      </div>
    </form>
  )
}

/* ───────── DOOM (js-dos, running locally in the browser) ───────── */
let jsDosPromise = null
function loadJsDos() {
  if (window.Dos) return Promise.resolve()
  if (jsDosPromise) return jsDosPromise
  jsDosPromise = new Promise((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://v8.js-dos.com/latest/js-dos.css'
    document.head.appendChild(css)
    const s = document.createElement('script')
    s.src = 'https://v8.js-dos.com/latest/js-dos.js'
    s.onload = resolve
    s.onerror = () => { jsDosPromise = null; reject(new Error('Could not load the DOS emulator.')) }
    document.head.appendChild(s)
  })
  return jsDosPromise
}

export function DoomApp() {
  const hostRef = useRef(null)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let instance = null
    let cancelled = false
    loadJsDos()
      .then(() => {
        if (cancelled || !hostRef.current) return
        instance = window.Dos(hostRef.current, {
          url: '/doom/doom.jsdos',
          theme: 'dark',
          autoStart: false,
          kiosk: false,
        })
        setReady(true)
      })
      .catch((e) => setError(e.message))
    return () => {
      cancelled = true
      try { instance?.stop?.() } catch { /* already stopped */ }
    }
  }, [])

  return (
    <div className="rw-doom">
      {!ready && !error && <p className="rw-doom-msg">Loading DOS emulator…</p>}
      {error && <p className="rw-doom-msg">{error}</p>}
      <div ref={hostRef} className="rw-doom-host" />
    </div>
  )
}
