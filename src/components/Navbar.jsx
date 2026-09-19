import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">⚡</div>
          <span>Free<strong>Convertor</strong></span>
        </Link>

        <div className="nav-links">
          <Link to="/tools" className="nav-link">All Tools</Link>
          <a href="#how" className="nav-link">How it Works</a>
          <a href="#features" className="nav-link">Features</a>
        </div>

        <div className="nav-right">
          <Link to="/tools" className="btn-try">Try Free →</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/tools" onClick={() => setMenuOpen(false)}>All Tools</Link>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        </div>
      )}
    </nav>
  )
}
