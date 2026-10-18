import { useState, useRef } from 'react'
import { WALLPAPERS } from './xpData'

export default function XPDisplayProperties({
  currentWallpaper,
  onApplyWallpaper,
  onClose
}) {
  const [selectedWp, setSelectedWp] = useState(currentWallpaper || WALLPAPERS[0])
  const [activeTab, setActiveTab] = useState('desktop')
  const [position, setPosition] = useState('stretch')
  const fileInputRef = useRef(null)

  const handleCustomFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const customObj = {
          id: `custom-${Date.now()}`,
          name: file.name.substring(0, 20),
          src: event.target?.result
        }
        setSelectedWp(customObj)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleApply = () => {
    if (onApplyWallpaper) {
      onApplyWallpaper(selectedWp)
    }
  }

  const handleOk = () => {
    handleApply()
    if (onClose) onClose()
  }

  return (
    <div className="xp-disp-prop">
      {/* Tabs */}
      <div className="xp-ie-tabs" role="tablist">
        {['Themes', 'Desktop', 'Screen Saver', 'Appearance', 'Settings'].map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={activeTab === t.toLowerCase()}
            className={`xp-ie-tab ${activeTab === t.toLowerCase() ? 'active' : ''}`}
            onClick={() => setActiveTab(t.toLowerCase())}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="xp-disp-body">
        {activeTab === 'desktop' ? (
          <>
            {/* Monitor Live Preview */}
            <div className="xp-monitor-preview-wrap">
              <div className="xp-monitor-case">
                <div
                  className="xp-monitor-screen"
                  style={{
                    backgroundImage: selectedWp?.src ? `url(${selectedWp.src})` : 'none',
                    backgroundColor: selectedWp?.color || '#004e98',
                    backgroundSize: position === 'tile' ? 'auto' : position === 'center' ? 'auto' : 'cover',
                    backgroundRepeat: position === 'tile' ? 'repeat' : 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="xp-mini-taskbar"></div>
                </div>
              </div>
              <div className="xp-monitor-stand"></div>
              <div className="xp-monitor-base"></div>
            </div>

            {/* Controls */}
            <div className="xp-disp-controls">
              <div className="xp-disp-left">
                <label className="xp-disp-label" htmlFor="wp-list">Background:</label>
                <div className="xp-disp-listbox" id="wp-list" role="listbox">
                  {WALLPAPERS.map((wp) => (
                    <div
                      key={wp.id}
                      role="option"
                      aria-selected={selectedWp?.id === wp.id}
                      className={`xp-disp-item ${selectedWp?.id === wp.id ? 'selected' : ''}`}
                      onClick={() => setSelectedWp(wp)}
                    >
                      <img src="/xp/icons/680-16.png" alt="" className="xp-disp-ico" onError={(e) => { e.target.style.display = 'none' }} />
                      <span>{wp.name}</span>
                    </div>
                  ))}
                  {selectedWp?.id?.startsWith('custom-') && (
                    <div className="xp-disp-item selected" role="option" aria-selected="true">
                      <img src="/xp/icons/680-16.png" alt="" className="xp-disp-ico" />
                      <span>{selectedWp.name} (Custom)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="xp-disp-right">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleCustomFile}
                />
                <button
                  type="button"
                  className="xp-win-btn full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse...
                </button>

                <div className="xp-disp-opt-group">
                  <label htmlFor="xp-pos">Position:</label>
                  <select
                    id="xp-pos"
                    className="xp-disp-select"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="stretch">Stretch</option>
                    <option value="center">Center</option>
                    <option value="tile">Tile</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="xp-disp-empty-tab">
            <p><strong>{activeTab.toUpperCase()} Settings</strong></p>
            <p>Windows XP Display Driver is currently operating at optimal resolution (1920x1080 True Color 32-bit).</p>
            <button type="button" className="xp-win-btn" onClick={() => setActiveTab('desktop')}>
              Go to Desktop Wallpaper Settings
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="xp-disp-footer">
        <button type="button" className="xp-win-btn" onClick={handleOk}>OK</button>
        <button type="button" className="xp-win-btn" onClick={onClose}>Cancel</button>
        <button type="button" className="xp-win-btn" onClick={handleApply}>Apply</button>
      </div>
    </div>
  )
}
