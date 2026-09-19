import { Link } from 'react-router-dom'
import { TOOLS } from '../data/tools'
import './Footer.css'

export default function Footer() {
  const pdfTools = TOOLS.filter(t => t.cat === 'pdf').slice(0, 6)
  const imgTools = TOOLS.filter(t => t.cat === 'image').slice(0, 6)

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">⚡</div>
              <span>Free<strong>Convertor</strong></span>
            </div>
            <p className="footer-desc">
              Free online file converter supporting 200+ formats.
              All processing happens in your browser — your files
              never leave your device.
            </p>
            <div className="footer-badges">
              <span className="fbadge">🔐 Private</span>
              <span className="fbadge">⚡ Instant</span>
              <span className="fbadge">🆓 Always Free</span>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">PDF Tools</div>
            <ul>
              {pdfTools.map(t => (
                <li key={t.id}>
                  <Link to={`/convert/${t.id}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Image Tools</div>
            <ul>
              {imgTools.map(t => (
                <li key={t.id}>
                  <Link to={`/convert/${t.id}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">More</div>
            <ul>
              <li><Link to="/tools">All Tools</Link></li>
              <li><a href="#how">How it Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 FreeConvertor.is-a.software · All conversion runs in your browser · Zero data stored
          </div>
          <div className="footer-links-right">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
