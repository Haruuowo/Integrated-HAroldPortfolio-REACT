import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only run on fine pointer (not touch)
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

    // Use RAF-throttled mousemove — no particles (saves constant DOM create/destroy)
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
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

    // Use mouseover/mouseout but throttled — only check the closest target
    const hoverTargets = 'a, button, select, label, [role="button"], input, textarea, .btn-solid, .btn-line, .btn-send, .skill, .tag, .project-card, .proj-card, .sk-cert-card, .exp-item, .csoc, .theme-dd-toggle, .theme-dd-option, .hamburger, #backToTop, .glass'

    const onMouseOver = (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.add('hover')
        ring.classList.add('hover')
      }
    }
    const onMouseOut = (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.remove('hover')
        ring.classList.remove('hover')
      }
    }

    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    // Magnetic buttons — lighter, only on buttons with the class
    const magneticBtns = document.querySelectorAll('.btn-solid, .btn-line, .btn-send, .csoc')
    magneticBtns.forEach((btn) => {
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

    // Single rAF loop — no extra work when mouse hasn't moved
    let animId
    let lastX = -1
    let lastY = -1
    const animateCursor = () => {
      const tx = mousePos.current.x
      const ty = mousePos.current.y

      // Only update dot if mouse actually moved
      if (tx !== lastX || ty !== lastY) {
        lastX = tx
        lastY = ty
        dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
      }

      // Lerp ring toward mouse
      ringPos.current.x += (tx - ringPos.current.x) * 0.15
      ringPos.current.y += (ty - ringPos.current.y) * 0.15
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
      document.removeEventListener('mouseout', onMouseOut)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}