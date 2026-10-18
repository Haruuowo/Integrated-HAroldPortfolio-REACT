import { useState } from 'react'

export default function XPImageViewer({ src, title = 'Image Preview' }) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  return (
    <div className="xp-img-viewer">
      <div className="xp-img-canvas">
        <img
          src={src}
          alt={title}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease-out'
          }}
          className="xp-viewer-img"
        />
      </div>
      <div className="xp-img-toolbar">
        <button type="button" className="xp-img-btn" onClick={() => setZoom(z => Math.max(0.4, z - 0.2))} title="Zoom Out">
          🔍 -
        </button>
        <button type="button" className="xp-img-btn" onClick={() => setZoom(1)} title="Actual Size">
          100%
        </button>
        <button type="button" className="xp-img-btn" onClick={() => setZoom(z => Math.min(3, z + 0.2))} title="Zoom In">
          🔍 +
        </button>
        <span className="xp-ie-tool-sep"></span>
        <button type="button" className="xp-img-btn" onClick={() => setRotation(r => (r - 90) % 360)} title="Rotate Left">
          ⟲ Rotate
        </button>
        <button type="button" className="xp-img-btn" onClick={() => setRotation(r => (r + 90) % 360)} title="Rotate Right">
          ⟳ Rotate
        </button>
        <span className="xp-img-title-tag">{title}</span>
      </div>
    </div>
  )
}
