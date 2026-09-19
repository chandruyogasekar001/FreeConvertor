import { useState } from 'react'
import { TOOLS, CATEGORIES } from '../data/tools'
import ToolCard from '../components/ToolCard'
import AdBanner from '../components/AdBanner'
import './AllTools.css'

export default function AllTools() {
  const [activeCat, setActiveCat] = useState('all')
  const [searchQ, setSearchQ] = useState('')

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCat === 'all' || t.cat === activeCat
    const q = searchQ.toLowerCase()
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <main className="all-tools-page">
      <div className="at-hero">
        <div className="container">
          <div className="at-tag">All Tools</div>
          <h1 className="at-title">Every Free Converter<br />in One Place</h1>
          <p className="at-sub">
            {TOOLS.length}+ tools. All free. All unlimited.
            All run in your browser — no uploads, no limits.
          </p>
          <div className="at-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by format or tool name..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
            {searchQ && <button onClick={() => setSearchQ('')}>✕</button>}
          </div>
        </div>
      </div>

      <div className="container at-body">
        <AdBanner type="horizontal" />

        <div className="at-cat-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.icon} {cat.label}
              <span className="cat-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="at-grid">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} delay={i * 0.02} />
            ))}
          </div>
        ) : (
          <div className="at-empty">
            <div>🔍</div>
            <h3>No tools found for "{searchQ}"</h3>
            <p>Try searching for PDF, JPG, MP3, Excel, ZIP...</p>
            <button onClick={() => setSearchQ('')}>Clear search</button>
          </div>
        )}

        <AdBanner type="horizontal" />
      </div>
    </main>
  )
}
