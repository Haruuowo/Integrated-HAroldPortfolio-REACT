import { useState, useEffect, useRef, useCallback } from 'react'

const COLS = 10
const ROWS = 20
const BLOCK_SIZE = 24

const SHAPES = {
  I: { shape: [[1, 1, 1, 1]], color: '#00f0f0', shadow: '#00a0a0' },
  O: { shape: [[1, 1], [1, 1]], color: '#f0f000', shadow: '#a0a000' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0', shadow: '#6000a0' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000', shadow: '#00a000' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000', shadow: '#a00000' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0', shadow: '#0000a0' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000', shadow: '#a06000' }
}

const SHAPE_KEYS = Object.keys(SHAPES)

const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0))

export default function TetrisApp() {
  const [board, setBoard] = useState(createEmptyBoard)
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPieceKey, setNextPieceKey] = useState(() => SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)])
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('xp_tetris_hi') || 0))

  const boardRef = useRef(board)
  boardRef.current = board
  const pieceRef = useRef(currentPiece)
  pieceRef.current = currentPiece
  const gameOverRef = useRef(gameOver)
  gameOverRef.current = gameOver
  const isPausedRef = useRef(isPaused)
  isPausedRef.current = isPaused

  const spawnPiece = useCallback((shapeKey = null) => {
    const key = shapeKey || nextPieceKey
    const nextKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
    setNextPieceKey(nextKey)

    const shapeData = SHAPES[key]
    const p = {
      shape: shapeData.shape,
      color: shapeData.color,
      shadow: shapeData.shadow,
      x: Math.floor((COLS - shapeData.shape[0].length) / 2),
      y: 0
    }

    // Check collision on spawn
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] && boardRef.current[r + p.y]?.[c + p.x]) {
          setGameOver(true)
          return
        }
      }
    }
    setCurrentPiece(p)
  }, [nextPieceKey])

  const checkCollision = (p, b, offsetX = 0, offsetY = 0, newShape = null) => {
    const shape = newShape || p.shape
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newX = p.x + c + offsetX
          const newY = p.y + r + offsetY
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true
          if (newY >= 0 && b[newY] && b[newY][newX]) return true
        }
      }
    }
    return false
  }

  const rotate = (matrix) => {
    const rows = matrix.length
    const cols = matrix[0].length
    const rotated = Array.from({ length: cols }, () => Array(rows).fill(0))
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        rotated[c][rows - 1 - r] = matrix[r][c]
      }
    }
    return rotated
  }

  const lockPiece = useCallback((p) => {
    const newBoard = boardRef.current.map(row => [...row])
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c]) {
          const by = p.y + r
          const bx = p.x + c
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            newBoard[by][bx] = p.color
          }
        }
      }
    }

    // Clear completed lines
    let clearedLines = 0
    const filteredBoard = newBoard.filter(row => {
      const isFull = row.every(cell => cell !== 0)
      if (isFull) clearedLines++
      return !isFull
    })

    while (filteredBoard.length < ROWS) {
      filteredBoard.unshift(Array(COLS).fill(0))
    }

    if (clearedLines > 0) {
      const lineScores = [0, 100, 300, 500, 800]
      const pts = (lineScores[clearedLines] || 100) * level
      setScore(s => {
        const next = s + pts
        if (next > highScore) {
          setHighScore(next)
          localStorage.setItem('xp_tetris_hi', String(next))
        }
        return next
      })
      setLines(l => {
        const nextL = l + clearedLines
        setLevel(Math.floor(nextL / 10) + 1)
        return nextL
      })
    }

    setBoard(filteredBoard)
    spawnPiece()
  }, [level, highScore, spawnPiece])

  const moveDown = useCallback(() => {
    if (gameOverRef.current || isPausedRef.current || !pieceRef.current) return
    const p = pieceRef.current
    if (!checkCollision(p, boardRef.current, 0, 1)) {
      setCurrentPiece({ ...p, y: p.y + 1 })
    } else {
      lockPiece(p)
    }
  }, [lockPiece])

  const moveLeft = () => {
    if (gameOverRef.current || isPausedRef.current || !pieceRef.current) return
    const p = pieceRef.current
    if (!checkCollision(p, boardRef.current, -1, 0)) {
      setCurrentPiece({ ...p, x: p.x - 1 })
    }
  }

  const moveRight = () => {
    if (gameOverRef.current || isPausedRef.current || !pieceRef.current) return
    const p = pieceRef.current
    if (!checkCollision(p, boardRef.current, 1, 0)) {
      setCurrentPiece({ ...p, x: p.x + 1 })
    }
  }

  const rotatePiece = () => {
    if (gameOverRef.current || isPausedRef.current || !pieceRef.current) return
    const p = pieceRef.current
    const rotated = rotate(p.shape)
    if (!checkCollision(p, boardRef.current, 0, 0, rotated)) {
      setCurrentPiece({ ...p, shape: rotated })
    } else if (!checkCollision(p, boardRef.current, -1, 0, rotated)) {
      setCurrentPiece({ ...p, shape: rotated, x: p.x - 1 })
    } else if (!checkCollision(p, boardRef.current, 1, 0, rotated)) {
      setCurrentPiece({ ...p, shape: rotated, x: p.x + 1 })
    }
  }

  const hardDrop = () => {
    if (gameOverRef.current || isPausedRef.current || !pieceRef.current) return
    let p = { ...pieceRef.current }
    let dropY = p.y
    while (!checkCollision(p, boardRef.current, 0, 1)) {
      p.y += 1
      dropY = p.y
    }
    setCurrentPiece({ ...p, y: dropY })
    lockPiece(p)
  }

  // Handle Keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
      }
      if (e.key === 'ArrowLeft') moveLeft()
      else if (e.key === 'ArrowRight') moveRight()
      else if (e.key === 'ArrowUp') rotatePiece()
      else if (e.key === 'ArrowDown') moveDown()
      else if (e.key === ' ') hardDrop()
      else if (e.key.toLowerCase() === 'p') setIsPaused(p => !p)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveDown])

  // Game loop tick
  useEffect(() => {
    if (gameOver || isPaused) return
    const speed = Math.max(120, 800 - (level - 1) * 70)
    const timer = setInterval(moveDown, speed)
    return () => clearInterval(timer)
  }, [moveDown, level, gameOver, isPaused])

  // Initialize game
  const resetGame = () => {
    setBoard(createEmptyBoard())
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameOver(false)
    setIsPaused(false)
    const firstKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
    const nextKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
    setNextPieceKey(nextKey)
    const shapeData = SHAPES[firstKey]
    setCurrentPiece({
      shape: shapeData.shape,
      color: shapeData.color,
      shadow: shapeData.shadow,
      x: Math.floor((COLS - shapeData.shape[0].length) / 2),
      y: 0
    })
  }

  useEffect(() => {
    resetGame()
  }, [])

  // Render combined grid with active falling piece
  const displayGrid = board.map(row => [...row])
  if (currentPiece) {
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const by = currentPiece.y + r
          const bx = currentPiece.x + c
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            displayGrid[by][bx] = currentPiece.color
          }
        }
      }
    }
  }

  const nextShape = SHAPES[nextPieceKey]?.shape || []
  const nextColor = SHAPES[nextPieceKey]?.color || '#ffffff'

  return (
    <div className="xp-tetris-app">
      {/* Menu / Top Banner */}
      <div className="xp-tetris-menubar">
        <span><u>G</u>ame</span>
        <span><u>O</u>ptions</span>
        <span><u>H</u>elp</span>
      </div>

      <div className="xp-tetris-body">
        {/* Playfield Area */}
        <div className="xp-tetris-board-frame">
          <div
            className="xp-tetris-board"
            style={{
              width: COLS * BLOCK_SIZE,
              height: ROWS * BLOCK_SIZE
            }}
          >
            {displayGrid.map((row, r) => (
              <div key={r} className="xp-tetris-row">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className={`xp-tetris-cell ${cell ? 'filled' : ''}`}
                    style={{
                      backgroundColor: cell || '#12121a',
                      boxShadow: cell ? `inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.5)` : 'none'
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Overlays */}
            {gameOver && (
              <div className="xp-tetris-overlay">
                <div className="xp-tetris-modal">
                  <h3>GAME OVER</h3>
                  <p>Final Score: {score}</p>
                  <button type="button" className="xp-win-btn primary" onClick={resetGame}>
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="xp-tetris-overlay">
                <div className="xp-tetris-modal">
                  <h3>PAUSED</h3>
                  <button type="button" className="xp-win-btn" onClick={() => setIsPaused(false)}>
                    Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info & Controls */}
        <div className="xp-tetris-sidebar">
          {/* Next Piece Box */}
          <div className="xp-tetris-panel">
            <h4>NEXT</h4>
            <div className="xp-tetris-preview">
              {nextShape.map((row, r) => (
                <div key={r} className="preview-row">
                  {row.map((cell, c) => (
                    <div
                      key={c}
                      className="preview-cell"
                      style={{
                        backgroundColor: cell ? nextColor : 'transparent',
                        boxShadow: cell ? `inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.4)` : 'none'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="xp-tetris-panel stats">
            <div className="stat-row">
              <span className="stat-label">SCORE</span>
              <span className="stat-val">{score}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">LINES</span>
              <span className="stat-val">{lines}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">LEVEL</span>
              <span className="stat-val">{level}</span>
            </div>
            <div className="stat-row hi">
              <span className="stat-label">TOP</span>
              <span className="stat-val">{highScore}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="xp-tetris-actions">
            <button
              type="button"
              className="xp-win-btn full"
              onClick={() => setIsPaused(p => !p)}
            >
              {isPaused ? 'Resume (P)' : 'Pause (P)'}
            </button>
            <button
              type="button"
              className="xp-win-btn full"
              onClick={resetGame}
            >
              Restart
            </button>
          </div>

          {/* Touch / Click Onscreen Controls */}
          <div className="xp-tetris-dpad">
            <button type="button" className="dpad-btn rotate" onClick={rotatePiece} title="Rotate (Up)">↻</button>
            <div className="dpad-mid">
              <button type="button" className="dpad-btn left" onClick={moveLeft} title="Left">◀</button>
              <button type="button" className="dpad-btn down" onClick={moveDown} title="Soft Drop">▼</button>
              <button type="button" className="dpad-btn right" onClick={moveRight} title="Right">▶</button>
            </div>
            <button type="button" className="dpad-btn drop" onClick={hardDrop} title="Hard Drop (Space)">⤓ DROP</button>
          </div>
        </div>
      </div>
    </div>
  )
}
