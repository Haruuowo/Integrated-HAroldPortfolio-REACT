import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [formStatusType, setFormStatusType] = useState('')

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById('fname').value.trim()
    const email = document.getElementById('femail').value.trim()
    const subject = document.getElementById('fsubject').value.trim()
    const message = document.getElementById('fmsg').value.trim()

    if (!name || !email || !message) {
      setFormStatus('Please fill in all fields.')
      setFormStatusType('error')
      return
    }

    const sub = encodeURIComponent((subject || 'Portfolio Contact') + ' — from ' + name)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = 'mailto:harolddoton@gmail.com?subject=' + sub + '&body=' + body

    setFormStatus('Opening your mail app...')
    setFormStatusType('success')
    setTimeout(() => {
      setFormStatus('')
      e.target.reset()
    }, 3000)
  }

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-split">
          {/* LEFT */}
          <div className={`contact-left reveal ${visible ? 'visible' : ''}`}>
            <h2 className="contact-hed">
              Let's build<br />something <em>real.</em>
            </h2>
            <p className="contact-sub">
              Open to internships, collaborations, and interesting conversations. I usually reply within a day.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <span className="contact-info-label">Email</span>
                  <a href="mailto:harolddoton@gmail.com" className="contact-info-val">harolddoton@gmail.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <span className="contact-info-label">Based in</span>
                  <span className="contact-info-val">Pampanga, Philippines</span>
                </div>
              </div>
            </div>

            <div className="contact-socials-label">Find me online</div>
            <div className="contact-socials">
              <a href="https://github.com/Haruuowo" target="_blank" rel="noreferrer" className="csoc" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/harold-doton-606b18317/" target="_blank" rel="noreferrer" className="csoc" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://discord.com/users/kairuuowo" target="_blank" rel="noreferrer" className="csoc" aria-label="Discord">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className={`contact-right reveal ${visible ? 'visible' : ''}`} id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">Name</label>
                <input type="text" id="fname" placeholder="Your name" autoComplete="off" />
              </div>
              <div className="form-group">
                <label htmlFor="femail">Email</label>
                <input type="email" id="femail" placeholder="your@email.com" autoComplete="off" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fsubject">Subject</label>
              <input type="text" id="fsubject" placeholder="What's this about?" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="fmsg">Message</label>
              <textarea id="fmsg" rows="6" placeholder="Tell me about your project or idea..."></textarea>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn-send">
                Send message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22 11 13 2 9l20-7z" />
                </svg>
              </button>
              <span className={`form-status ${formStatusType}`}>{formStatus}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}