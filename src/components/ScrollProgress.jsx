import { useEffect, useState } from 'react'

export default function ScrollProgress({ className = '' }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`scroll-progress-bar ${className}`}>
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
