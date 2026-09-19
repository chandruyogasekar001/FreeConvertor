# FreeConvertor 🚀

Free online file converter — 40+ tools, 200+ formats.
All processing runs in the browser. Zero uploads. Zero cost.

## Tech Stack
- React 18 + Vite
- pdf-lib, pdfjs-dist (PDF tools)
- ffmpeg.wasm (Video/Audio)
- SheetJS / xlsx (Spreadsheets)
- Mammoth.js (Word documents)
- JSZip (Archives)
- heic2any (HEIC images)
- Canvas API (Image conversions)

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

The `public/_headers` file handles all WASM CORS headers automatically.
The `public/_redirects` file handles React Router SPA routing.

## Add PropellerAds

1. Sign up at propellerads.com
2. Add your domain (freeconvertor.is-a.software)
3. Get your ad script/zone ID
4. Replace the placeholder in `src/components/AdBanner.jsx`

## Get Free Domain (is-a.software)

1. Go to is-a.software
2. Sign up with GitHub
3. Register: freeconvertor
4. Point CNAME to: freeconvertor.pages.dev
5. Done — live in minutes!

## SEO Tips

- Submit sitemap to Google Search Console
- Add your domain to Google Search Console
- Target keywords: "free pdf to word", "free image converter", etc.
- The HTML meta tags are already optimized in index.html

## License

MIT — Free to use, modify, and deploy.
