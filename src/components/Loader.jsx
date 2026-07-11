import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity .5s',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '.9rem',
          letterSpacing: '.35em',
          color: '#E8D9B8',
          textTransform: 'uppercase',
        }}
      >
        Loading
      </span>
    </div>
  )
}