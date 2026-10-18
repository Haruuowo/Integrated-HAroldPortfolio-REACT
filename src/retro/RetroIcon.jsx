/* Pixel-style SVG icons (32x32 viewBox, crisp edges) for the retro desktop */
const base = { viewBox: '0 0 32 32', shapeRendering: 'crispEdges', 'aria-hidden': true }

export default function RetroIcon({ name, size = 32 }) {
  const p = { ...base, width: size, height: size }
  switch (name) {
    case 'readme':
      return (
        <svg {...p}>
          <path d="M6 2h14l6 6v22H6z" fill="#fff" stroke="#000" />
          <path d="M20 2v6h6" fill="#c0c0c0" stroke="#000" />
          <g fill="#000080">
            <rect x="9" y="12" width="14" height="2" />
            <rect x="9" y="16" width="14" height="2" />
            <rect x="9" y="20" width="14" height="2" />
            <rect x="9" y="24" width="9" height="2" />
          </g>
        </svg>
      )
    case 'projects':
      return (
        <svg {...p}>
          <path d="M2 8h10l2 3h16v17H2z" fill="#ffd84a" stroke="#000" />
          <path d="M2 14h28v14H2z" fill="#f5c211" stroke="#000" />
          <rect x="4" y="16" width="24" height="2" fill="#fff3a8" />
        </svg>
      )
    case 'skills':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="24" height="18" fill="#c0c0c0" stroke="#000" />
          <rect x="7" y="7" width="18" height="12" fill="#008080" stroke="#000" />
          <rect x="9" y="9" width="8" height="2" fill="#fff" />
          <rect x="9" y="13" width="12" height="2" fill="#fff" />
          <rect x="10" y="24" width="12" height="3" fill="#c0c0c0" stroke="#000" />
          <rect x="7" y="27" width="18" height="3" fill="#c0c0c0" stroke="#000" />
        </svg>
      )
    case 'experience':
      return (
        <svg {...p}>
          <rect x="3" y="10" width="26" height="17" fill="#a0522d" stroke="#000" />
          <path d="M11 10V6h10v4" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="3" y="17" width="26" height="2" fill="#6b3410" />
          <rect x="14" y="16" width="4" height="4" fill="#ffd84a" stroke="#000" />
        </svg>
      )
    case 'contact':
      return (
        <svg {...p}>
          <rect x="3" y="7" width="26" height="18" fill="#fff" stroke="#000" />
          <path d="M3 7l13 11L29 7" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="22" y="3" width="8" height="6" fill="#ff3b3b" stroke="#000" />
        </svg>
      )
    case 'doom':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="28" height="28" fill="#2a0606" stroke="#000" />
          <rect x="4" y="4" width="24" height="24" fill="#7a1010" />
          <path d="M8 22V10h5c4 0 6 2 6 6s-2 6-6 6zM11 13v6h2c2 0 3-1 3-3s-1-3-3-3z" fill="#ffb000" fillRule="evenodd" />
          <rect x="21" y="10" width="3" height="12" fill="#ffb000" />
        </svg>
      )
    case 'resume':
      return (
        <svg {...p}>
          <path d="M6 2h14l6 6v22H6z" fill="#fff" stroke="#000" />
          <path d="M20 2v6h6" fill="#c0c0c0" stroke="#000" />
          <rect x="9" y="14" width="14" height="8" fill="#d0021b" />
          <g fill="#fff"><rect x="10" y="16" width="2" height="4" /><rect x="14" y="16" width="2" height="4" /><rect x="18" y="16" width="3" height="2" /></g>
          <rect x="9" y="25" width="14" height="2" fill="#808080" />
        </svg>
      )
    case 'shutdown':
      return (
        <svg {...p}>
          <rect x="3" y="4" width="26" height="18" fill="#c0c0c0" stroke="#000" />
          <rect x="6" y="7" width="20" height="12" fill="#000" />
          <circle cx="16" cy="13" r="4" fill="none" stroke="#ff3b3b" strokeWidth="2" />
          <rect x="15" y="8" width="2" height="6" fill="#ff3b3b" />
          <rect x="10" y="24" width="12" height="4" fill="#c0c0c0" stroke="#000" />
        </svg>
      )
    default:
      return <svg {...p}><rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" /></svg>
  }
}
