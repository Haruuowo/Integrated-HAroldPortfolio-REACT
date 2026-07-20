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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
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
