import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOOLS, CATEGORIES } from '../data/tools'
import ToolCard from '../components/ToolCard'
import AdBanner from '../components/AdBanner'
import './Home.css'

const TICKER_ITEMS = [
  'PDF to Word','JPG to PNG','MP4 to MP3','Excel to CSV',
  'Word to PDF','PNG to WebP','Scanned PDF OCR','PPT to PDF',
  'HEIC to JPG','PDF to Excel','SVG to PNG','ZIP Extract',
  'Compress Image','Video to GIF','JSON to CSV','Markdown to PDF',
]

export default function Home() {
  const [activeCat, setActiveCat] = useState('all')
  const [searchQ, setSearchQ] = useState('')
  const navigate = useNavigate()

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCat === 'all' || t.cat === activeCat
    const matchSearch = !searchQ || t.name.toLowerCase().includes(searchQ.toLowerCase()) || t.from.toLowerCase().includes(searchQ.toLowerCase()) || t.to.toLowerCase().includes(searchQ.toLowerCase())
    return matchCat && matchSearch
  })

  // Re-run scroll observer when tools filter changes
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    }, 50)
    return () => { clearTimeout(timer); obs.disconnect() }
  }, [activeCat, searchQ])

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-dots" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            100% Free · No Signup · Files Stay On Your Device
          </div>

          <h1 className="hero-title">
            Convert <em>any</em> file,<br />
            <span>instantly free.</span>
          </h1>

          <p className="hero-sub">
            PDF, Word, Images, Video, Audio — 200+ formats supported.
            Everything runs in your browser. Zero uploads to servers.
          </p>

          {/* SEARCH BAR */}
          <div className="hero-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder='Try "PDF to Word" or "JPG to PNG"...'
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="search-input"
            />
            {searchQ && (
              <button className="search-clear" onClick={() => setSearchQ('')}>✕</button>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions">
            {['PDF to Word', 'JPG to PNG', 'MP4 to MP3', 'Excel to CSV', 'Compress Image'].map(name => {
              const tool = TOOLS.find(t => t.name === name)
              return tool ? (
                <button
                  key={name}
                  className="quick-btn"
                  onClick={() => navigate(`/convert/${tool.id}`)}
                >
                  {tool.icon} {name}
                </button>
              ) : null
            })}
          </div>
        </div>

        {/* STATS */}
        <div className="hero-stats">
          {[
            { n: '40+', l: 'Free Tools' },
            { n: '200+', l: 'File Formats' },
            { n: '0ms', l: 'Upload Wait' },
            { n: '0', l: 'Files Stored' },
          ].map(s => (
            <div className="stat" key={s.l}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div className="ticker-item" key={i}>
              <span className="ticker-dot">→</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* AD BANNER */}
      <div className="container" style={{ padding: '24px 32px 0' }}>
        <AdBanner type="horizontal" />
      </div>

      {/* ALL TOOLS */}
      <section className="tools-section" id="tools">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="sec-tag">All Tools</div>
              <h2 className="sec-title">Every converter<br />you'll ever need</h2>
            </div>
            <p className="sec-sub">
              40+ tools. All free. All unlimited. All run in your browser.
              No file size limits. No daily caps. Ever.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div className="cat-tabs">
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

          {/* TOOLS GRID */}
          {filtered.length > 0 ? (
            <div className="tools-grid">
              {filtered.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} delay={i * 0.02} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <div className="no-results-title">No tools found for "{searchQ}"</div>
              <div className="no-results-sub">Try searching for a format like "PDF", "JPG", or "MP3"</div>
              <button className="btn-clear" onClick={() => setSearchQ('')}>Clear search</button>
            </div>
          )}
        </div>
      </section>

      {/* AD BANNER 2 */}
      <div className="container">
        <AdBanner type="horizontal" />
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <div className="sec-tag">How It Works</div>
            <h2 className="sec-title">Simple as 1, 2, 3</h2>
            <p className="sec-sub" style={{ margin: '12px auto 0' }}>
              No account. No waiting. Just convert.
            </p>
          </div>

          <div className="steps-grid">
            {[
              { n: '01', icon: '📂', title: 'Upload your file', desc: 'Click or drag & drop your file. We automatically detect what format it is in — no need to tell us.' },
              { n: '02', icon: '🎯', title: 'Choose output format', desc: 'We show only the formats that make sense for your file. One click to select your target format.' },
              { n: '03', icon: '⚡', title: 'Convert instantly', desc: 'Processing happens right in your browser using WebAssembly. Zero upload wait time. Starts immediately.' },
              { n: '04', icon: '✅', title: 'Download result', desc: 'Your converted file downloads automatically. The file is never uploaded to or stored on any server.' },
            ].map((step, i) => (
              <div className="step-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="step-num">{step.n}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="sec-tag">Why FreeConvertor</div>
              <h2 className="sec-title">Built differently</h2>
            </div>
            <p className="sec-sub">
              Privacy and quality first. No compromises.
            </p>
          </div>

          <div className="features-grid">
            {[
              { icon: '🔐', bg: '#fff0f0', title: '100% Private', desc: 'Your files never leave your browser. All conversion runs locally via WebAssembly. We physically cannot see your files — there is no server receiving them.' },
              { icon: '⚡', bg: '#f0fff6', title: 'Instant — Zero Wait', desc: 'Because everything runs in your browser, conversion starts the moment you click. No upload queue, no server lag, no waiting.' },
              { icon: '🧠', bg: '#f0f4ff', title: 'OCR for Scanned PDFs', desc: 'Scribe.js OCR engine reads scanned documents and image-based PDFs. Extract real editable text from any scanned file — all in browser.' },
              { icon: '📦', bg: '#fffbf0', title: 'Unlimited Batch Convert', desc: 'Upload 50 files at once. Convert them all in parallel. Download as individual files or as a ZIP bundle. No limits of any kind.' },
              { icon: '📱', bg: '#f5f0ff', title: 'Works Everywhere', desc: 'Desktop, tablet, mobile. Chrome, Firefox, Safari, Edge. Even works offline after first page load. No app install needed.' },
              { icon: '🆓', bg: '#f0fff6', title: 'Actually Free. Forever.', desc: 'No hidden limits. No file size cap. No daily quota. No watermarks. No account needed. No paid plan. Free means free.' },
            ].map((f, i) => (
              <div className="feat-card reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO TEXT SECTION */}
      <section className="seo-section">
        <div className="container">
          <div className="seo-grid">
            <div className="reveal">
              <h2>Free PDF to Word Converter</h2>
              <p>Convert PDF documents to editable Microsoft Word DOCX format right in your browser. Our PDF to Word converter uses Scribe.js to extract text, preserve formatting, and rebuild the document structure. Works with both text-based and scanned PDFs using built-in OCR technology.</p>
            </div>
            <div className="reveal">
              <h2>Free Image Format Converter</h2>
              <p>Convert between JPG, PNG, WebP, HEIC, SVG and more image formats instantly. Our image converter uses the browser's native Canvas API for perfect quality output. Compress, resize, and convert multiple images at once — completely free and unlimited.</p>
            </div>
            <div className="reveal">
              <h2>Free Video & Audio Converter</h2>
              <p>Convert MP4 to MP3, extract audio from video, convert between audio formats, and compress video files — No file size limits, no uploads, no waiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="container">
        <div className="cta-banner reveal">
          <div className="cta-left">
            <h2 className="cta-title">Ready to convert?</h2>
            <p className="cta-sub">40+ free tools. No signup. Start converting right now.</p>
          </div>
          <button className="cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ⚡ Start Converting Free
          </button>
        </div>
      </div>
    </main>
  )
}
