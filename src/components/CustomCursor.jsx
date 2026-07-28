import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)
  const moveTimeout = useRef(null)

  useEffect(() => {
    // Check if fine pointer (not touch)
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const dot = document.createElement('div')
    dot.id = 'cursor-dot'
    document.body.appendChild(dot)
    dotRef.current = dot

    const ring = document.createElement('div')
    ring.id = 'cursor-ring'
    document.body.appendChild(ring)
    ringRef.current = ring

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (isMoving.current && Math.random() > 0.85) {
        createParticle(e.clientX, e.clientY)
      }
      isMoving.current = true
      clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => { isMoving.current = false }, 100)
    }

    const onMouseDown = () => {
      dot.classList.add('click')
      ring.classList.add('click')
    }
    const onMouseUp = () => {
      dot.classList.remove('click')
      ring.classList.remove('click')
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown, { passive: true })
    document.addEventListener('mouseup', onMouseUp, { passive: true })

    // Hover detection supporting nested child elements
    const hoverTargets = 'a, button, select, label, [role="button"], input, textarea, .btn-solid, .btn-line, .btn-send, .skill, .tag, .project-card, .proj-card, .sk-cert-card, .exp-item, .project-featured-img, .csoc, .theme-dd-toggle, .theme-dd-option, .hamburger, #heroNameLine1, #heroNameLine2, .terminal-header, .dot, .action-btn, #backToTop, .glass'
    const onMouseOver = (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.add('hover')
        ring.classList.add('hover')
      } else {
        dot.classList.remove('hover')
        ring.classList.remove('hover')
      }
    }
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll('.btn-solid, .btn-line, .btn-send, .csoc')
    magneticBtns.forEach((btn) => {
      btn.classList.add('magnetic')
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`
      }, { passive: true })
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''
      }, { passive: true })
    })

    // Animate ring and dot
    let animId
    const animateCursor = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
      
      dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      
      animId = requestAnimationFrame(animateCursor)
    }
    animateCursor()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}

function createParticle(x, y) {
  const p = document.createElement('div')
  p.className = 'cursor-particle'
  const size = 2 + Math.random() * 4
  p.style.width = size + 'px'
  p.style.height = size + 'px'
  p.style.setProperty('--x', `${x}px`)
  p.style.setProperty('--y', `${y}px`)
  document.body.appendChild(p)
  setTimeout(() => p.remove(), 600)
}