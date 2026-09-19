import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    // These use SharedArrayBuffer / WASM internally — exclude from pre-bundling
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util', 'scribe.js-ocr']
  },

  server: {
    headers: {
      // Required for WASM libs (ffmpeg, scribe.js-ocr)
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },

  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          pdflib: ['pdf-lib'],
          xlsx: ['xlsx'],
          mammoth: ['mammoth'],
          jszip: ['jszip'],
          jspdf: ['jspdf'],
          docx: ['docx'],
        }
      }
    }
  }
})
