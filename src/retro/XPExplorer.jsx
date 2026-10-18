import { useState } from 'react'

export default function XPExplorer({
  currentPath = 'C:\\Documents and Settings\\Harold\\My Documents',
  fileSystem,
  onOpenFile,
  onOpenFolder
}) {
  const [navPath, setNavPath] = useState(currentPath)
  const [history, setHistory] = useState([currentPath])
  const [historyIdx, setHistoryIdx] = useState(0)
  const [selectedId, setSelectedId] = useState(null)

  // Resolve directory items from path
  const resolveFolder = (path) => {
    if (path === 'C:\\' || path === 'C:') {
      return fileSystem.children || []
    }
    if (path.includes('My Documents')) {
      const myDocs = fileSystem.children?.find(c => c.id === 'my-documents')
      if (path.includes('Projects')) {
        const projFolder = myDocs?.children?.find(c => c.id === 'projects-folder')
        // Check if subproject
        for (const child of projFolder?.children || []) {
          if (path.includes(child.name)) return child.children || []
        }
        return projFolder?.children || []
      }
      return myDocs?.children || []
    }
    return fileSystem.children || []
  }

  const items = resolveFolder(navPath)
  const selectedItem = items.find(it => it.id === selectedId)

  const goTo = (newPath) => {
    setNavPath(newPath)
    setSelectedId(null)
    const newHist = history.slice(0, historyIdx + 1).concat(newPath)
    setHistory(newHist)
    setHistoryIdx(newHist.length - 1)
  }

  const goBack = () => {
    if (historyIdx > 0) {
      const p = history[historyIdx - 1]
      setHistoryIdx(historyIdx - 1)
      setNavPath(p)
      setSelectedId(null)
    }
  }

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      const p = history[historyIdx + 1]
      setHistoryIdx(historyIdx + 1)
      setNavPath(p)
      setSelectedId(null)
    }
  }

  const goUp = () => {
    const parts = navPath.split('\\').filter(Boolean)
    if (parts.length > 1) {
      parts.pop()
      goTo(parts.join('\\'))
    } else {
      goTo('C:\\')
    }
  }

  const handleItemDblClick = (item) => {
    if (item.type === 'folder') {
      goTo(`${navPath}\\${item.name}`)
      if (onOpenFolder) onOpenFolder(item)
    } else {
      if (onOpenFile) onOpenFile(item)
    }
  }

  const getItemIcon = (item) => {
    if (item.type === 'folder') return '/xp/icons/folder.png'
    if (item.type === 'image') return '/xp/icons/680-32.png'
    if (item.type === 'text') return '/xp/icons/327-32.png'
    if (item.type === 'pdf') return '/xp/icons/308-32.png'
    if (item.type === 'link') return '/xp/icons/ie.png'
    return '/xp/icons/308-32.png'
  }

  return (
    <div className="xp-explorer-window">
      {/* Menubar */}
      <div className="xp-ie-menubar">
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span><u>V</u>iew</span>
        <span>F<u>a</u>vorites</span>
        <span><u>T</u>ools</span>
        <span><u>H</u>elp</span>
      </div>

      {/* Explorer Toolbar */}
      <div className="xp-ie-toolbar">
        <button type="button" className="xp-ie-tool-btn" onClick={goBack} disabled={historyIdx <= 0} title="Back">
          <img src="/xp/icons/back.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Back</span>
        </button>
        <button type="button" className="xp-ie-tool-btn" onClick={goForward} disabled={historyIdx >= history.length - 1} title="Forward">
          <img src="/xp/icons/forward.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
        </button>
        <button type="button" className="xp-ie-tool-btn" onClick={goUp} title="Up one level">
          <img src="/xp/icons/up.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
        </button>
        <span className="xp-ie-tool-sep"></span>
        <button type="button" className="xp-ie-tool-btn" title="Search">
          <img src="/xp/icons/299-32.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Search</span>
        </button>
        <button type="button" className="xp-ie-tool-btn" title="Folders">
          <img src="/xp/icons/folder.png" alt="" className="ie-tool-icon" onError={(e) => { e.target.style.display = 'none' }} />
          <span>Folders</span>
        </button>
        <div className="xp-ie-logo-throbber">
          <img src="/xp/icons/windows.png" alt="Windows" />
        </div>
      </div>

      {/* Address Bar */}
      <div className="xp-ie-addressbar">
        <span className="xp-ie-addr-label">Address</span>
        <div className="xp-ie-addr-input-wrap">
          <img src="/xp/icons/folder.png" alt="" className="xp-ie-addr-icon" />
          <input
            type="text"
            className="xp-ie-addr-input"
            value={navPath}
            onChange={(e) => setNavPath(e.target.value)}
            spellCheck="false"
          />
          <button type="button" className="xp-ie-go-btn" onClick={() => goTo(navPath)}>
            <img src="/xp/icons/290.png" alt="Go" onError={(e) => { e.target.parentElement.textContent = 'Go' }} />
            <span>Go</span>
          </button>
        </div>
      </div>

      {/* Two Pane Layout */}
      <div className="xp-exp-body">
        {/* Left Side Tasks Pane */}
        <aside className="xp-exp-sidebar">
          {/* File Tasks Box */}
          <div className="xp-task-box">
            <div className="xp-task-header">
              <span>File and Folder Tasks</span>
            </div>
            <div className="xp-task-content">
              {selectedItem ? (
                <>
                  <div className="xp-task-action" onClick={() => handleItemDblClick(selectedItem)}>
                    <img src={getItemIcon(selectedItem)} alt="" />
                    <span>Open this {selectedItem.type}</span>
                  </div>
                  {selectedItem.type === 'text' && (
                    <div className="xp-task-action" onClick={() => onOpenFile && onOpenFile(selectedItem)}>
                      <img src="/xp/icons/327-32.png" alt="" />
                      <span>Edit with Notepad</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="xp-task-action" onClick={() => alert('Folder created in virtual system')}>
                    <img src="/xp/icons/folder.png" alt="" />
                    <span>Make a new folder</span>
                  </div>
                  <div className="xp-task-action" onClick={() => goTo('C:\\Documents and Settings\\Harold\\My Documents\\Projects')}>
                    <img src="/xp/icons/308-32.png" alt="" />
                    <span>Publish to Web</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Other Places Box */}
          <div className="xp-task-box">
            <div className="xp-task-header">
              <span>Other Places</span>
            </div>
            <div className="xp-task-content">
              <div className="xp-task-action" onClick={() => goTo('C:\\Documents and Settings\\Harold\\My Documents')}>
                <img src="/xp/icons/308-32.png" alt="" />
                <span>My Documents</span>
              </div>
              <div className="xp-task-action" onClick={() => goTo('C:\\Documents and Settings\\Harold\\My Documents\\Projects')}>
                <img src="/xp/icons/folder.png" alt="" />
                <span>My Projects</span>
              </div>
              <div className="xp-task-action" onClick={() => goTo('C:\\')}>
                <img src="/xp/icons/676-32.png" alt="" />
                <span>My Computer</span>
              </div>
            </div>
          </div>

          {/* Details Box */}
          <div className="xp-task-box">
            <div className="xp-task-header">
              <span>Details</span>
            </div>
            <div className="xp-task-content xp-task-details">
              <strong>{selectedItem ? selectedItem.name : navPath.split('\\').pop() || 'Computer'}</strong>
              <span>{selectedItem ? `File Type: ${selectedItem.type.toUpperCase()}` : 'System Folder'}</span>
              <span>Status: Online &amp; Loaded</span>
            </div>
          </div>
        </aside>

        {/* Right Side File Grid */}
        <main className="xp-exp-grid" onPointerDown={() => setSelectedId(null)}>
          {items.map((item) => {
            const isSel = selectedId === item.id
            return (
              <div
                key={item.id}
                className={`xp-file-item ${isSel ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedId(item.id)
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  handleItemDblClick(item)
                }}
              >
                <div className="xp-file-icon-wrap">
                  <img src={getItemIcon(item)} alt="" className="xp-file-icon" />
                </div>
                <span className="xp-file-name">{item.name}</span>
              </div>
            )
          })}
        </main>
      </div>

      {/* Explorer Status Bar */}
      <div className="xp-ie-statusbar">
        <div className="xp-ie-status-left">
          <span>{items.length} objects (Disk free space: 24.8 GB)</span>
        </div>
        <div className="xp-ie-status-right">
          <span>My Computer</span>
        </div>
      </div>
    </div>
  )
}
