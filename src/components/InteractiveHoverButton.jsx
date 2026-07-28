export default function InteractiveHoverButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  download,
  type = 'button',
  ...props
}) {
  const content = (
    <>
      <div className="btn-initial-content">
        <span className="btn-dot" />
        <span className="btn-text">{children}</span>
      </div>
      <div className="btn-hover-content">
        <span>{children}</span>
        {download ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`interactive-hover-btn ${className}`}
        onClick={onClick}
        target={target}
        rel={rel}
        download={download}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={`interactive-hover-btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  )
}
