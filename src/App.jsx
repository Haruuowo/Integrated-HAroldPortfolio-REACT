import { useEffect } from 'react'
import ClassicPortfolio from './ClassicPortfolio'

function App() {
  useEffect(() => {
    // Clear any stale view mode saved from the removed Virtual PC mode
    localStorage.removeItem('portfolio_view_mode')
  }, [])

  return <ClassicPortfolio />
}

export default App
