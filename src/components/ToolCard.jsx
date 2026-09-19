import { useNavigate } from 'react-router-dom'
import './ToolCard.css'

const CAT_COLORS = {
  pdf: '#fff0f0',
  image: '#f0f6ff',
  document: '#f0f4ff',
  spreadsheet: '#f0fff6',
  video: '#f5f0ff',
  archive: '#fffbf0',
}

export default function ToolCard({ tool, delay = 0 }) {
  const navigate = useNavigate()

  return (
    <div
      className="tool-card"
      style={{ animationDelay: `${delay}s` }}
      onClick={() => navigate(`/convert/${tool.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/convert/${tool.id}`)}
      aria-label={tool.name}
    >
      <div className="tc-top">
        <div className="tc-icon" style={{ background: CAT_COLORS[tool.cat] }}>
          {tool.icon}
        </div>
        {tool.isNew && <span className="tc-new">NEW</span>}
        <span className="tc-arrow">↗</span>
      </div>

      <div className="tc-name">{tool.name}</div>
      <div className="tc-desc">{tool.desc}</div>

      <div className="tc-footer">
        <div className="tc-quality">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`q-dot ${i <= tool.quality ? 'on' : ''}`} />
          ))}
          <span className="q-text">
            {tool.quality === 5 ? 'Perfect' : tool.quality === 4 ? 'Great' : 'Good'}
          </span>
        </div>
        <div className="tc-convert">
          <span className="tc-from">{tool.from}</span>
          <span className="tc-arrow2">→</span>
          <span className="tc-to">{tool.to}</span>
        </div>
      </div>
    </div>
  )
}
