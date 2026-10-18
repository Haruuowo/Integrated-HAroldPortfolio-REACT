import { useState, useEffect, useRef } from 'react'

const GRID_SIZE = 9
const MINES_COUNT = 10

export default function MinesweeperApp() {
  const [grid, setGrid] = useState([])
  const [gameState, setGameState] = useState('idle') // idle, playing, won, lost
  const [flagsLeft, setFlagsLeft] = useState(MINES_COUNT)
  const [timer, setTimer] = useState(0)
  const timerRef = useRef(null)

  const initGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimer(0)
    setGameState('idle')
    setFlagsLeft(MINES_COUNT)

    // Build empty 9x9 grid
    const newGrid = []
    for (let r = 0; r < GRID_SIZE; r++) {
      const row = []
      for (let c = 0; c < GRID_SIZE; c++) {
        row.push({
          r,
          c,
          isMine: false,
          revealed: false,
          flagged: false,
          count: 0
        })
      }
      newGrid.push(row)
    }
    setGrid(newGrid)
  }

  useEffect(() => {
    initGame()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startWithMines = (firstR, firstC) => {
    // Place 10 mines avoiding the first clicked cell
    let placed = 0
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })))
    while (placed < MINES_COUNT) {
      const r = Math.floor(Math.random() * GRID_SIZE)
      const c = Math.floor(Math.random() * GRID_SIZE)
      if ((r === firstR && c === firstC) || newGrid[r][c].isMine) continue
      newGrid[r][c].isMine = true
      placed++
    }

    // Calculate neighbor mine counts
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c].isMine) continue
        let cnt = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].isMine) {
              cnt++
            }
          }
        }
        newGrid[r][c].count = cnt
      }
    }

    setGameState('playing')
    timerRef.current = setInterval(() => {
      setTimer(t => Math.min(999, t + 1))
    }, 1000)

    revealCellRecursive(newGrid, firstR, firstC)
  }

  const revealCellRecursive = (board, r, c) => {
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return
    const cell = board[r][c]
    if (cell.revealed || cell.flagged) return

    cell.revealed = true

    if (cell.count === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) {
            revealCellRecursive(board, r + dr, c + dc)
          }
        }
      }
    }
  }

  const checkWinCondition = (board) => {
    let unrevealedNonMines = 0
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = board[r][c]
        if (!cell.isMine && !cell.revealed) {
          unrevealedNonMines++
        }
      }
    }
    if (unrevealedNonMines === 0) {
      setGameState('won')
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const handleCellClick = (r, c) => {
    if (gameState === 'won' || gameState === 'lost') return

    if (gameState === 'idle') {
      startWithMines(r, c)
      return
    }

    const currentCell = grid[r][c]
    if (currentCell.flagged || currentCell.revealed) return

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })))
    if (newGrid[r][c].isMine) {
      // Game Over - reveal all mines
      newGrid.forEach(row => {
        row.forEach(cell => {
          if (cell.isMine) cell.revealed = true
        })
      })
      setGrid(newGrid)
      setGameState('lost')
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    revealCellRecursive(newGrid, r, c)
    setGrid(newGrid)
    checkWinCondition(newGrid)
  }

  const handleCellRightClick = (e, r, c) => {
    e.preventDefault()
    if (gameState !== 'playing' && gameState !== 'idle') return

    const cell = grid[r][c]
    if (cell.revealed) return

    const newGrid = grid.map(row => row.map(cl => ({ ...cl })))
    const target = newGrid[r][c]

    if (target.flagged) {
      target.flagged = false
      setFlagsLeft(f => f + 1)
    } else if (flagsLeft > 0) {
      target.flagged = true
      setFlagsLeft(f => f - 1)
    }

    setGrid(newGrid)
  }

  const getNumberColor = (count) => {
    switch (count) {
      case 1: return '#0000ff'
      case 2: return '#008000'
      case 3: return '#ff0000'
      case 4: return '#000080'
      case 5: return '#800000'
      case 6: return '#008080'
      case 7: return '#000000'
      case 8: return '#808080'
      default: return '#000000'
    }
  }

  return (
    <div className="xp-minesweeper-app">
      <div className="xp-ms-menubar">
        <span><u>G</u>ame</span>
        <span><u>H</u>elp</span>
      </div>

      <div className="xp-ms-body">
        {/* Header with Counters and Smiley */}
        <div className="xp-ms-header">
          <div className="xp-ms-lcd">
            {String(Math.max(0, flagsLeft)).padStart(3, '0')}
          </div>
          <button
            type="button"
            className="xp-ms-face"
            onClick={initGame}
            title="Reset Game"
          >
            {gameState === 'idle' && '🙂'}
            {gameState === 'playing' && '🙂'}
            {gameState === 'lost' && '😵'}
            {gameState === 'won' && '😎'}
          </button>
          <div className="xp-ms-lcd">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Board */}
        <div className="xp-ms-board">
          {grid.map((row, r) => (
            <div key={r} className="xp-ms-row">
              {row.map((cell, c) => {
                let content = ''
                if (cell.flagged) {
                  content = '🚩'
                } else if (cell.revealed) {
                  if (cell.isMine) {
                    content = '💣'
                  } else if (cell.count > 0) {
                    content = cell.count
                  }
                }

                return (
                  <button
                    key={c}
                    type="button"
                    className={`xp-ms-cell ${cell.revealed ? 'revealed' : ''} ${cell.isMine && cell.revealed ? 'mine' : ''}`}
                    onClick={() => handleCellClick(r, c)}
                    onContextMenu={(e) => handleCellRightClick(e, r, c)}
                    style={{
                      color: cell.count ? getNumberColor(cell.count) : 'inherit'
                    }}
                  >
                    {content}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
