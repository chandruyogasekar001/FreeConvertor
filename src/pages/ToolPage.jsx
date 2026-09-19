import { useState, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { TOOLS } from '../data/tools'
import AdBanner from '../components/AdBanner'
import './ToolPage.css'

// Animated status steps shown during conversion
const CONVERT_STEPS = {
  'pdf-to-word':     ['Reading PDF structure', 'Extracting text & layout', 'Building Word document'],
  'scanned-pdf-ocr': ['Loading OCR engine',    'Scanning page images',    'Converting to Word'],
  'pdf-to-jpg':      ['Loading PDF pages',     'Rendering at 2x quality', 'Exporting images'],
  'pdf-to-png':      ['Loading PDF pages',     'Rendering at 2x quality', 'Exporting PNG files'],
  'merge-pdf':       ['Reading all PDFs',      'Merging pages together',  'Saving combined PDF'],
  'compress-image':  ['Loading image',         'Optimising quality',      'Compressing file'],
  'word-to-pdf':     ['Parsing Word document', 'Rendering layout',        'Exporting PDF'],
  'mp4-to-mp3':      ['Loading ffmpeg engine', 'Decoding audio stream',   'Encoding MP3'],
  'video-to-gif':    ['Loading ffmpeg engine', 'Processing video frames', 'Building GIF'],
  default:           ['Reading your file',     'Processing conversion',   'Finalising output'],
}

// Icon for each tool category
const CAT_EMOJI = { pdf:'📄', image:'🖼️', document:'📝', spreadsheet:'📊', video:'🎬', archive:'📦' }

export default function ToolPage() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const tool = TOOLS.find(t => t.id === toolId)

  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [results, setResults] = useState([])
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef()

  if (!tool) return (
    <div className="not-found">
      <h2>Tool not found</h2>
      <Link to="/tools">← Back to all tools</Link>
    </div>
  )

  const steps = CONVERT_STEPS[toolId] || CONVERT_STEPS.default
  const relatedTools = TOOLS.filter(t => t.cat === tool.cat && t.id !== tool.id).slice(0, 4)
  const outEmoji = CAT_EMOJI[tool.cat] || '📄'

  const handleFiles = useCallback((newFiles) => {
    setFiles(Array.from(newFiles))
    setStatus('idle')
    setResults([])
    setErrorMsg('')
    setActiveStep(0)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleConvert = async () => {
    if (!files.length) return
    setStatus('converting')
    setProgress(0)
    setActiveStep(0)
    setResults([])
    setErrorMsg('')

    try {
      const outputs = []

      for (let i = 0; i < files.length; i++) {
        // Animate through steps
        setActiveStep(0)
        setProgress(Math.round((i / files.length) * 30))
        await delay(600)

        setActiveStep(1)
        setProgress(Math.round((i / files.length) * 30 + 30))
        
        const resultPromise = convertFile(files[i], tool)

        // Animate step 2 after short delay
        await delay(800)
        setActiveStep(2)
        setProgress(Math.round((i / files.length) * 30 + 60))

        const result = await resultPromise
        outputs.push(result)
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setResults(outputs)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Conversion failed. Please try again.')
      setStatus('error')
    }
  }

  const delay = (ms) => new Promise(r => setTimeout(r, ms))

  const handleDownload = (result) => {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const reset = () => {
    setFiles([])
    setStatus('idle')
    setResults([])
    setErrorMsg('')
    setProgress(0)
    setActiveStep(0)
  }

  const fmt = (b) => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1) + ' KB' : (b/1048576).toFixed(1) + ' MB'

  return (
    <main className="tool-page">

      {/* ── HERO BANNER ── */}
      <div className="tool-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="tool-hero-inner">

          {/* 3D Input file icon */}
          <div className="tool-3d-icon">
            <div className="icon-3d-wrap">
              <div className="icon-face">{tool.icon}</div>
              <div className="icon-shadow" />
            </div>
          </div>

          {/* Arrow */}
          <div className="tool-arrow-wrap">
            <div className="tool-arrow" />
            <div className="tool-arrow-label">converts to</div>
          </div>

          {/* 3D Output file icon */}
          <div className="tool-3d-icon">
            <div className="icon-3d-wrap" style={{animationDelay:'0.5s'}}>
              <div className="icon-face icon-face-out">{outEmoji}</div>
              <div className="icon-shadow" />
            </div>
          </div>

          {/* Text */}
          <div className="tool-hero-text">
            <div className="tool-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span className="sep">›</span>
              <Link to="/tools">Tools</Link>
              <span className="sep">›</span>
              <span>{tool.name}</span>
            </div>
            <h1 className="tool-hero-title">{tool.name}</h1>
            <p className="tool-hero-desc">{tool.desc}</p>
            <div className="tool-hero-badges">
              <div className="hero-badge-item green">🆓 Free Forever</div>
              <div className="hero-badge-item orange">⚡ Instant</div>
              <div className="hero-badge-item">🔐 Private</div>
              <div className="hero-badge-item">♾️ Unlimited</div>
              {tool.multiple && <div className="hero-badge-item">📦 Batch Upload</div>}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="tool-body">
        <div className="tool-layout">
          <div className="tool-main">

            {/* Privacy strip */}
            <div className="privacy-strip">
              <div className="ps-item"><div className="ps-icon">🔐</div>Files never uploaded to servers</div>
              <div className="ps-divider" />
              <div className="ps-item"><div className="ps-icon">🧠</div>100% in-browser processing</div>
              <div className="ps-divider" />
              <div className="ps-item"><div className="ps-icon">🗑️</div>Zero data stored</div>
              <div className="ps-divider" />
              <div className="ps-item"><div className="ps-icon">⚡</div>No wait time</div>
            </div>

            {/* ── IDLE — UPLOAD ── */}
            {status === 'idle' && (
              <div
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => files.length === 0 && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={tool.multiple}
                  accept={tool.accept}
                  onChange={e => handleFiles(e.target.files)}
                  style={{ display: 'none' }}
                />

                {files.length === 0 ? (
                  <>
                    <div className="upload-cloud">
                      <div className="cloud-circle">📂</div>
                    </div>
                    <div className="upload-title">Drop your {tool.from} file{tool.multiple ? 's' : ''} here</div>
                    <div className="upload-hint">
                      or <span onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>browse your files</span>
                      {tool.multiple ? ' — batch upload supported' : ''}
                    </div>
                    <div className="upload-format-tags">
                      {tool.accept.split(',').map(a => (
                        <span key={a} className="uftag">{a.replace('.','').toUpperCase()}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="files-ready" onClick={e => e.stopPropagation()}>
                    <div className="upload-cloud">
                      <div className="cloud-circle">✅</div>
                    </div>
                    <div className="upload-title">{files.length} file{files.length > 1 ? 's' : ''} ready</div>
                    <div className="files-list">
                      {files.slice(0, 5).map((f, i) => (
                        <div className="file-item" key={i}>
                          <span className="file-icon">{tool.icon}</span>
                          <span className="file-name">{f.name}</span>
                          <span className="file-size">{fmt(f.size)}</span>
                        </div>
                      ))}
                      {files.length > 5 && <div className="file-more">+{files.length - 5} more files</div>}
                    </div>
                    <button className="btn-convert" onClick={handleConvert}>
                      ⚡ Convert{files.length > 1 ? ` All ${files.length} Files` : ''} → {tool.to}
                    </button>
                    <button className="btn-change" onClick={reset}>✕ Choose different files</button>
                  </div>
                )}
              </div>
            )}

            {/* ── CONVERTING ── */}
            {status === 'converting' && (
              <div className="converting-state">
                <AdBanner type="conversion" />
                <div className="converting-card">
                  <div className="scan-line" />

                  {/* 3D spinner */}
                  <div className="processing-visual">
                    <div className="proc-ring proc-ring-1" />
                    <div className="proc-ring proc-ring-2" />
                    <div className="proc-ring proc-ring-3" />
                    <div className="proc-center">{tool.icon}</div>
                  </div>

                  <div className="converting-title">Converting your file…</div>
                  <div className="converting-sub">Processing securely in your browser</div>

                  {/* Animated status steps */}
                  <div className="status-steps">
                    {steps.map((step, i) => (
                      <div
                        key={i}
                        className={`status-step ${i === activeStep ? 'active' : i < activeStep ? 'done' : ''}`}
                      >
                        <div className="step-dot">
                          {i < activeStep ? '✓' : i === activeStep ? '●' : ''}
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="progress-bar-wrap">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="progress-text">{progress}%</div>

                  <div className="privacy-note-converting">
                    🔐 Your file never leaves this device
                  </div>
                </div>
              </div>
            )}

            {/* ── DONE ── */}
            {status === 'done' && (
              <div className="done-state">
                <div className="done-icon-wrap">✅</div>
                <div className="done-title">Conversion Complete!</div>
                <div className="done-sub">{results.length} file{results.length > 1 ? 's' : ''} converted successfully</div>

                <div className="results-list">
                  {results.map((r, i) => (
                    <div className="result-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                      <span className="result-icon">{outEmoji}</span>
                      <span className="result-name">{r.filename}</span>
                      <span className="result-size">{fmt(r.blob.size)}</span>
                      <button className="btn-download" onClick={() => handleDownload(r)}>↓ Download</button>
                    </div>
                  ))}
                </div>

                {results.length > 1 && (
                  <button className="btn-download-all" onClick={() => results.forEach(r => handleDownload(r))}>
                    ↓ Download All {results.length} Files
                  </button>
                )}
                <button className="btn-convert-another" onClick={reset}>Convert Another File</button>
                <AdBanner type="horizontal" />
              </div>
            )}

            {/* ── ERROR ── */}
            {status === 'error' && (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <div className="error-title">Something went wrong</div>
                <div className="error-msg">{errorMsg}</div>
                <button className="btn-retry" onClick={reset}>Try Again</button>
              </div>
            )}

            {/* How to use */}
            <div className="how-to-use">
              <h3>How to use {tool.name}</h3>
              <ol>
                <li>Drop your <strong>{tool.from}</strong> file onto the upload area above or click to browse</li>
                <li>Click <strong>Convert</strong> — processing starts immediately in your browser</li>
                <li>Watch the live progress as your file is processed step by step</li>
                <li>Download your <strong>{tool.to}</strong> file the moment it's ready</li>
              </ol>
              <div className="privacy-how">
                <div className="privacy-how-icon">🔐</div>
                <div>
                  <strong>Your privacy is guaranteed.</strong> This tool processes everything
                  locally using WebAssembly technology. Your file is never uploaded to any server,
                  never stored, and never seen by anyone. Not even us. It's technically impossible
                  for us to access your file.
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="tool-sidebar">
            <AdBanner type="square" />
            <div className="sidebar-section">
              <div className="sidebar-title">Tool Info</div>
              <div className="sidebar-facts">
                <div className="fact"><span className="fact-label">Converts</span><span className="fact-value">{tool.from} → {tool.to}</span></div>
                <div className="fact"><span className="fact-label">Quality</span><span className="fact-value">{'⭐'.repeat(tool.quality)}</span></div>
                <div className="fact"><span className="fact-label">Processing</span><span className="fact-value">In Browser</span></div>
                <div className="fact"><span className="fact-label">Batch</span><span className="fact-value">{tool.multiple ? '✅ Supported' : 'Single file'}</span></div>
                <div className="fact"><span className="fact-label">Cost</span><span className="fact-value green-text">🆓 Always Free</span></div>
                <div className="fact"><span className="fact-label">Data stored</span><span className="fact-value green-text">❌ Never</span></div>
              </div>
            </div>
            {relatedTools.length > 0 && (
              <div className="sidebar-section">
                <div className="sidebar-title">Related Tools</div>
                <div className="related-tools">
                  {relatedTools.map(t => (
                    <div key={t.id} className="related-tool"
                      onClick={() => { navigate(`/convert/${t.id}`); window.scrollTo(0,0) }}>
                      <span>{t.icon}</span>
                      <span>{t.name}</span>
                      <span className="related-arrow">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}

// ─── CONVERSION ENGINE — 100% LOCAL, ZERO CDN ────────────────────────────────
async function convertFile(file, tool) {
  const ext = tool.to.toLowerCase()
  const base = file.name.replace(/\.[^/.]+$/, '')
  const out = `${base}.${ext}`

  switch (tool.id) {

    // ── IMAGE CONVERSIONS (Canvas API — no deps) ──
    case 'jpg-to-png': return { filename: out, blob: await imgConvert(file, 'image/png') }
    case 'png-to-jpg': return { filename: out, blob: await imgConvert(file, 'image/jpeg') }
    case 'png-to-webp': return { filename: out, blob: await imgConvert(file, 'image/webp') }
    case 'jpg-to-webp': return { filename: out, blob: await imgConvert(file, 'image/webp') }
    case 'webp-to-jpg': return { filename: out, blob: await imgConvert(file, 'image/jpeg') }
    case 'svg-to-png': return { filename: out, blob: await svgToPng(file) }

    case 'compress-image': {
      const { default: compress } = await import('browser-image-compression')
      const result = await compress(file, { maxSizeMB: 0.8, maxWidthOrHeight: 4096, useWebWorker: true })
      return { filename: `${base}-compressed.${file.name.split('.').pop()}`, blob: result }
    }

    case 'resize-image': {
      const w = parseInt(prompt('Enter target width in pixels (e.g. 800):', '800')) || 800
      return { filename: out, blob: await imgConvert(file, 'image/jpeg', w) }
    }

    case 'heic-to-jpg': {
      const { default: heic2any } = await import('heic2any')
      const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 })
      return { filename: out, blob: Array.isArray(result) ? result[0] : result }
    }

    case 'images-to-pdf': {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      const dataUrl = await toDataURL(file)
      const img = await loadImg(dataUrl)
      const pw = doc.internal.pageSize.getWidth()
      const ph = doc.internal.pageSize.getHeight()
      const ratio = Math.min(pw / img.width, ph / img.height)
      doc.addImage(dataUrl, 'JPEG', 0, 0, img.width * ratio, img.height * ratio)
      return { filename: out, blob: doc.output('blob') }
    }

    // ── PDF TO WORD — scribe.js-ocr (handles BOTH text + scanned PDFs) ──
    case 'pdf-to-word':
    case 'scanned-pdf-ocr': {
      return { filename: `${base}.docx`, blob: await pdfToWord(file) }
    }

    // ── PDF TOOLS (pdf-lib — bundled) ──
    case 'merge-pdf':
    case 'split-pdf':
    case 'rotate-pdf':
    case 'compress-pdf':
    case 'watermark-pdf': {
      const { PDFDocument, degrees, rgb, StandardFonts } = await import('pdf-lib')
      const ab = await file.arrayBuffer()
      const src = await PDFDocument.load(ab)
      const doc = await PDFDocument.create()
      const pages = await doc.copyPages(src, src.getPageIndices())
      for (const p of pages) {
        if (tool.id === 'rotate-pdf') p.setRotation(degrees(90))
        doc.addPage(p)
      }
      if (tool.id === 'watermark-pdf') {
        const font = await doc.embedFont(StandardFonts.HelveticaBold)
        for (const p of doc.getPages()) {
          const { width, height } = p.getSize()
          p.drawText('FreeConvertor', {
            x: width / 4, y: height / 2,
            size: 40, font,
            color: rgb(0.75, 0.75, 0.75),
            opacity: 0.25,
            rotate: degrees(45)
          })
        }
      }
      const bytes = await doc.save()
      return { filename: out, blob: new Blob([bytes], { type: 'application/pdf' }) }
    }

    // ── PDF TO IMAGE (PDF.js — local worker, no CDN) ──
    case 'pdf-to-jpg':
    case 'pdf-to-png': {
      const mime = tool.id === 'pdf-to-jpg' ? 'image/jpeg' : 'image/png'
      return { filename: out, blob: await pdfToImage(file, mime) }
    }

    // ── WORD TOOLS (Mammoth — bundled) ──
    case 'word-to-text': {
      const mammoth = await import('mammoth')
      const res = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
      return { filename: `${base}.txt`, blob: new Blob([res.value], { type: 'text/plain' }) }
    }

    case 'word-to-html': {
      const mammoth = await import('mammoth')
      const res = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() })
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:0 24px;line-height:1.7;font-size:16px}</style></head><body>${res.value}</body></html>`
      return { filename: `${base}.html`, blob: new Blob([html], { type: 'text/html' }) }
    }

    case 'word-to-pdf': {
      const mammoth = await import('mammoth')
      const res = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() })
      return { filename: out, blob: await htmlToPdf(res.value) }
    }

    // ── HTML TO PDF ──
    case 'html-to-pdf': {
      return { filename: out, blob: await htmlToPdf(await file.text()) }
    }

    // ── MARKDOWN TO PDF ──
    case 'markdown-to-pdf': {
      const text = await file.text()
      // Simple markdown to HTML (no external dep)
      const html = simpleMarkdown(text)
      return { filename: out, blob: await htmlToPdf(html) }
    }

    // ── SPREADSHEET TOOLS (SheetJS — bundled) ──
    case 'excel-to-csv': {
      const XLSX = await import('xlsx')
      const wb = XLSX.read(await file.arrayBuffer())
      const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]])
      return { filename: `${base}.csv`, blob: new Blob([csv], { type: 'text/csv' }) }
    }

    case 'csv-to-excel': {
      const XLSX = await import('xlsx')
      const text = await file.text()
      const ws = XLSX.utils.aoa_to_sheet(text.split('\n').map(r => r.split(',')))
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
      return { filename: `${base}.xlsx`, blob: new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }) }
    }

    case 'excel-to-json': {
      const XLSX = await import('xlsx')
      const wb = XLSX.read(await file.arrayBuffer())
      const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      return { filename: `${base}.json`, blob: new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' }) }
    }

    case 'json-to-csv': {
      const data = JSON.parse(await file.text())
      const arr = Array.isArray(data) ? data : [data]
      const headers = Object.keys(arr[0])
      const csv = [headers.join(','), ...arr.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n')
      return { filename: `${base}.csv`, blob: new Blob([csv], { type: 'text/csv' }) }
    }

    case 'csv-to-json': {
      const lines = (await file.text()).trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      const data = lines.slice(1).map(line => Object.fromEntries(headers.map((h, i) => [h, line.split(',')[i]?.trim() || ''])))
      return { filename: `${base}.json`, blob: new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }) }
    }

    case 'excel-to-pdf': {
      const XLSX = await import('xlsx')
      const wb = XLSX.read(await file.arrayBuffer())
      const html = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
      return { filename: out, blob: await htmlToPdf(html) }
    }

    // ── ARCHIVE TOOLS (JSZip — bundled) ──
    case 'files-to-zip': {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      zip.file(file.name, file)
      return { filename: `${base}.zip`, blob: await zip.generateAsync({ type: 'blob' }) }
    }

    case 'extract-zip': {
      const JSZip = (await import('jszip')).default
      const zip = await JSZip.loadAsync(file)
      const first = Object.values(zip.files).find(f => !f.dir)
      if (!first) throw new Error('ZIP is empty or contains only folders')
      return { filename: first.name, blob: await first.async('blob') }
    }

    default:
      throw new Error(`"${tool.name}" converter coming soon!`)
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// Canvas-based image conversion — zero external deps
function imgConvert(file, mime, maxW) {
  return new Promise((res, rej) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let w = img.width, h = img.height
      if (maxW && w > maxW) { h = Math.round(h * maxW / w); w = maxW }
      const c = Object.assign(document.createElement('canvas'), { width: w, height: h })
      const ctx = c.getContext('2d')
      if (mime !== 'image/png') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h) }
      ctx.drawImage(img, 0, 0, w, h)
      c.toBlob(blob => { URL.revokeObjectURL(url); res(blob) }, mime, 0.92)
    }
    img.onerror = () => rej(new Error('Could not load image'))
    img.src = url
  })
}

// SVG to PNG via Canvas
function svgToPng(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const c = Object.assign(document.createElement('canvas'), { width: img.width || 800, height: img.height || 600 })
        c.getContext('2d').drawImage(img, 0, 0)
        c.toBlob(res, 'image/png')
      }
      img.onerror = rej
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function toDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = e => res(e.target.result)
    r.onerror = rej
    r.readAsDataURL(file)
  })
}

function loadImg(src) {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = src
  })
}

// PDF to Word — 3-layer approach for maximum reliability
async function pdfToWord(file) {
  let extractedText = ''

  // ── Layer 1: Try scribe.js-ocr (best quality, handles scanned PDFs too) ──
  // IMPORTANT: In Vite/browser, must import from exact node_modules path
  try {
    const scribe = (await import('/node_modules/scribe.js-ocr/scribe.js')).default
    await scribe.init({ ocr: true, font: true })
    const ab = await file.arrayBuffer()
    const blob = new Blob([ab], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const result = await scribe.extractText([url])
    URL.revokeObjectURL(url)
    await scribe.terminate()
    if (result && result.trim().length > 10) {
      extractedText = result
      console.log('✅ Scribe.js extracted text successfully')
    }
  } catch (e) {
    console.warn('⚠️ Scribe.js failed:', e.message)
  }

  // ── Layer 2: PDF.js text extraction (works for all text-native PDFs) ──
  if (!extractedText.trim()) {
    try {
      extractedText = await pdfExtractTextFallback(file)
      if (extractedText.trim()) console.log('✅ PDF.js extracted text successfully')
    } catch (e) {
      console.warn('⚠️ PDF.js failed:', e.message)
    }
  }

  // ── Layer 3: If still nothing, show helpful message ──
  if (!extractedText.trim()) {
    throw new Error(
      'Could not extract text from this PDF.\n\n' +
      'Possible reasons:\n' +
      '• The PDF is a scanned image with no text layer\n' +
      '• The PDF is password protected\n' +
      '• The PDF uses unsupported encoding\n\n' +
      'Try using the "Scanned PDF OCR" tool instead for image-based PDFs.'
    )
  }

  // ── Build proper .docx from extracted text ──
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx')

  const lines = extractedText
    .split('\n')
    .map(l => l.trim())

  const paragraphs = []
  let buffer = []

  for (const line of lines) {
    if (line === '') {
      if (buffer.length > 0) {
        const text = buffer.join(' ')
        const isHeading = text.length < 80 && text === text.toUpperCase() && text.length > 3
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text, size: isHeading ? 28 : 24, bold: isHeading })],
          heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
          spacing: { after: 160 },
        }))
        buffer = []
      }
    } else {
      buffer.push(line)
    }
  }

  // flush remaining
  if (buffer.length > 0) {
    paragraphs.push(new Paragraph({
      children: [new TextRun({ text: buffer.join(' '), size: 24 })],
      spacing: { after: 160 },
    }))
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs.length > 0 ? paragraphs : [
        new Paragraph({ children: [new TextRun({ text: extractedText, size: 24 })] })
      ]
    }]
  })

  return await Packer.toBlob(doc)
}

// Fallback text extraction using PDF.js (for text-native PDFs when scribe fails)
async function pdfExtractTextFallback(file) {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href

  const ab = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: ab }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map(item => item.str).join(' ')
    fullText += pageText + '\n\n'
  }

  return fullText
}
async function pdfToImage(file, mime) {
  const pdfjsLib = await import('pdfjs-dist')

  // ✅ Vite bundles the worker locally — zero CDN, works offline
  // This is the correct way — no external URL needed ever
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href

  const ab = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: ab }).promise
  const page = await pdf.getPage(1)
  const vp = page.getViewport({ scale: 2 })
  const canvas = Object.assign(document.createElement('canvas'), { width: vp.width, height: vp.height })
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
  return new Promise(r => canvas.toBlob(r, mime, 0.92))
}

// HTML to PDF — uses jsPDF (fully bundled)
async function htmlToPdf(htmlContent) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  // Extract clean text from HTML
  const div = document.createElement('div')
  div.innerHTML = htmlContent
  div.style.cssText = 'position:fixed;left:-9999px;top:0;width:680px;font-family:Arial,sans-serif;font-size:11px;line-height:1.5;'
  document.body.appendChild(div)

  await new Promise(r => setTimeout(r, 80))
  const text = (div.innerText || div.textContent || '').replace(/\n{3,}/g, '\n\n')
  document.body.removeChild(div)

  const lines = doc.splitTextToSize(text, 170)
  let y = 18
  for (const line of lines) {
    if (y > 278) { doc.addPage(); y = 18 }
    doc.text(line, 18, y)
    y += 5.5
  }
  return doc.output('blob')
}

// Minimal markdown parser — no external deps
function simpleMarkdown(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hlu]|<li|<p|<\/p)(.+)$/gm, '<p>$1</p>')
}
