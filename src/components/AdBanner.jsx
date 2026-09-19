import './AdBanner.css'

/**
 * AdBanner Component
 * Replace the inner content with your actual PropellerAds code
 * after signing up at propellerads.com
 *
 * Best placements:
 * - "horizontal" → below hero, between sections
 * - "square" → sidebar, between tools
 * - "conversion" → shown during file conversion (most valuable!)
 */
export default function AdBanner({ type = 'horizontal', label = '' }) {
  return (
    <div className={`ad-banner ad-${type}`} aria-label="Advertisement">
      <div className="ad-inner">
        {/* 
          ============================================
          REPLACE THIS DIV WITH YOUR PROPELLERADS CODE
          ============================================
          
          Example PropellerAds script:
          <script>
            (function(d,z,s){
              s.src='//'+d+'/400/'+z;
              try{(document.body||document.documentElement).appendChild(s)}catch(e){}
            })('pertexbo.com', YOUR_ZONE_ID, document.createElement('script'))
          </script>
          
          Or use their banner ad code directly here.
          ============================================
        */}
        <span className="ad-placeholder-text">Advertisement</span>
      </div>
    </div>
  )
}
