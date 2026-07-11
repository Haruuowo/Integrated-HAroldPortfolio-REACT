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
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'

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

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Hover detection
    const hoverTargets = 'a, button, .btn-solid, .btn-line, .skill, .tag, .project-card, .project-featured-img, .csoc, input, textarea, .theme-dd-option, .hamburger'
    const onMouseOver = (e) => {
      if (e.target.matches(hoverTargets)) {
        dot.classList.add('hover')
        ring.classList.add('hover')
      }
    }
    const onMouseOut = (e) => {
      if (e.target.matches(hoverTargets)) {
        dot.classList.remove('hover')
        ring.classList.remove('hover')
      }
    }
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll('.btn-solid, .btn-line, .btn-send, .csoc')
    magneticBtns.forEach((btn) => {
      btn.classList.add('magnetic')
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
      })
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''
      })
    })

    // Animate ring
    let animId
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'
      animId = requestAnimationFrame(animateRing)
    }
    animateRing()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
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
  p.style.left = x + 'px'
  p.style.top = y + 'px'
  document.body.appendChild(p)
  setTimeout(() => p.remove(), 600)
}