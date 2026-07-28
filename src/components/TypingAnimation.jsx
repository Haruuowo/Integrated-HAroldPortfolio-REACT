import { useEffect, useState } from 'react'

export default function TypingAnimation({
  text,
  duration = 80,
  delay = 0,
  className = '',
}) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    let timer

    const startTyping = () => {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
        }
      }, duration)
    }

    const startTimer = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(startTimer)
      clearInterval(timer)
    }
  }, [text, duration, delay])

  return <span className={className}>{displayedText}</span>
}
