import { useEffect, useRef, useState, useCallback } from 'react'

const DEFAULT_CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default function HyperText({
  text,
  duration = 1600,
  delay = 200,
  animateOnHover = true,
  className = '',
  style = {},
  onClick,
  characterSet = DEFAULT_CHARACTER_SET,
}) {
  const [displayText, setDisplayText] = useState(text.split(''))
  const isAnimating = useRef(false)
  const intervalRef = useRef(null)

  const triggerAnimation = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    let step = 0
    const totalSteps = Math.max(20, Math.floor(duration / 45))
    const charsPerStep = text.length / totalSteps

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      step += 1
      const revealedCount = Math.floor(step * charsPerStep)

      if (revealedCount >= text.length) {
        setDisplayText(text.split(''))
        isAnimating.current = false
        clearInterval(intervalRef.current)
        intervalRef.current = null
      } else {
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealedCount) return text[i]
            return characterSet[Math.floor(Math.random() * characterSet.length)]
          })
        )
      }
    }, 45)
  }, [text, duration, characterSet])

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAnimation()
    }, delay)
    return () => {
      clearTimeout(timer)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [delay, triggerAnimation])

  return (
    <span
      className={`hyper-text ${className}`}
      style={{ cursor: 'pointer', display: 'inline-block', ...style }}
      onMouseEnter={() => animateOnHover && triggerAnimation()}
      onClick={(e) => {
        triggerAnimation()
        if (onClick) onClick(e)
      }}
    >
      {displayText.join('')}
    </span>
  )
}
