import { Link } from 'react-router-dom'
import './Privacy.css'

export default function Privacy() {
  return (
    <main className="static-page">
      <div className="container">
        <div className="static-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Privacy Policy</h1>
          <p className="static-date">Last updated: January 2026</p>
        </div>

        <div className="static-hero-box">
          <div className="shb-icon">🔐</div>
          <div>
            <div className="shb-title">The short version: We see nothing.</div>
            <div className="shb-sub">Your files are processed entirely in your browser. They are never uploaded, never stored, and never seen by us or anyone else. This is technically enforced — not just a promise.</div>
          </div>
        </div>

        <div className="static-content">
          <h2>1. Information We Do NOT Collect</h2>
          <p>We do not collect, store, or process:</p>
          <ul>
            <li>Any files you upload or convert</li>
            <li>The content of your documents</li>
            <li>Your IP address (beyond standard server logs)</li>
            <li>Personal identifying information</li>
            <li>Account data (we have no accounts)</li>
          </ul>

          <h2>2. How File Conversion Works</h2>
          <p>All file conversion on FreeConvertor happens entirely within your web browser using WebAssembly (WASM) technology. When you convert a file:</p>
          <ul>
            <li>Your file is loaded into your browser's memory only</li>
            <li>The conversion library runs locally on your device</li>
            <li>The converted file is generated in your browser</li>
            <li>The download happens directly to your device</li>
            <li>No data is transmitted to our servers at any point</li>
          </ul>

          <h2>3. Cookies & Analytics</h2>
          <p>We may use basic, privacy-respecting analytics to understand how many people use the site (page views, not personal data). We do not use tracking cookies or cross-site tracking.</p>

          <h2>4. Advertising</h2>
          <p>FreeConvertor displays advertisements from PropellerAds. These ads may use cookies as per their own privacy policy. We recommend reviewing PropellerAds' privacy policy if you have concerns.</p>

          <h2>5. Children's Privacy</h2>
          <p>FreeConvertor does not knowingly collect data from children under 13. As we collect no personal data, the service is safe for all ages.</p>

          <h2>6. Changes to This Policy</h2>
          <p>We may update this privacy policy occasionally. Continued use of the service after changes constitutes acceptance of the updated policy.</p>

          <h2>7. Contact</h2>
          <p>Questions about privacy? Contact us through our website. We take privacy seriously and will respond promptly.</p>
        </div>
      </div>
    </main>
  )
}
