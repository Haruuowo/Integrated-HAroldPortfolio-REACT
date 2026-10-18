import { useState } from 'react'

export default function XPNotepad({ title = 'Untitled - Notepad', initialContent = '' }) {
  const [content, setContent] = useState(initialContent)
  const [wordWrap, setWordWrap] = useState(true)

  return (
    <div className="xp-notepad-win">
      <div className="xp-ie-menubar">
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span onClick={() => setWordWrap(!wordWrap)} style={{ cursor: 'pointer' }}>
          <u>F</u>ormat {wordWrap ? '✓' : ''}
        </span>
        <span><u>V</u>iew</span>
        <span><u>H</u>elp</span>
      </div>
      <div className="xp-notepad-body">
        <textarea
          className={`xp-notepad-textarea ${wordWrap ? 'wrap' : 'nowrap'}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="false"
        ></textarea>
      </div>
      <div className="xp-ie-statusbar">
        <div className="xp-ie-status-left">
          <span>{title}</span>
        </div>
        <div className="xp-ie-status-right">
          <span>Lines: {content.split('\n').length} | Windows (CRLF)</span>
        </div>
      </div>
    </div>
  )
}
