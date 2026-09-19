export const TOOLS = [
  // PDF TOOLS
  { id: 'pdf-to-word', name: 'PDF to Word', desc: 'Convert PDF to editable DOCX with layout preserved', from: 'PDF', to: 'DOCX', cat: 'pdf', icon: '📄', quality: 4, accept: '.pdf', isNew: true },
  { id: 'pdf-to-excel', name: 'PDF to Excel', desc: 'Extract tables from PDF into spreadsheet', from: 'PDF', to: 'XLSX', cat: 'pdf', icon: '📊', quality: 4, accept: '.pdf' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', desc: 'Convert PDF pages to high quality images', from: 'PDF', to: 'JPG', cat: 'pdf', icon: '🖼️', quality: 5, accept: '.pdf' },
  { id: 'pdf-to-png', name: 'PDF to PNG', desc: 'Convert PDF pages to PNG with transparency', from: 'PDF', to: 'PNG', cat: 'pdf', icon: '🖼️', quality: 5, accept: '.pdf' },
  { id: 'scanned-pdf-ocr', name: 'Scanned PDF to Word', desc: 'OCR reads scanned PDFs and extracts real text', from: 'PDF', to: 'DOCX', cat: 'pdf', icon: '🔍', quality: 4, accept: '.pdf', isNew: true },
  { id: 'merge-pdf', name: 'Merge PDF', desc: 'Combine multiple PDFs into one file', from: 'PDF', to: 'PDF', cat: 'pdf', icon: '🔗', quality: 5, accept: '.pdf', multiple: true },
  { id: 'split-pdf', name: 'Split PDF', desc: 'Extract pages or page ranges as separate files', from: 'PDF', to: 'PDF', cat: 'pdf', icon: '✂️', quality: 5, accept: '.pdf' },
  { id: 'compress-pdf', name: 'Compress PDF', desc: 'Reduce PDF file size', from: 'PDF', to: 'PDF', cat: 'pdf', icon: '🗜️', quality: 3, accept: '.pdf' },
  { id: 'rotate-pdf', name: 'Rotate PDF', desc: 'Rotate PDF pages in any direction', from: 'PDF', to: 'PDF', cat: 'pdf', icon: '🔄', quality: 5, accept: '.pdf' },
  { id: 'watermark-pdf', name: 'Watermark PDF', desc: 'Add text watermark to all PDF pages', from: 'PDF', to: 'PDF', cat: 'pdf', icon: '💧', quality: 5, accept: '.pdf' },

  // IMAGE TOOLS
  { id: 'jpg-to-png', name: 'JPG to PNG', desc: 'Convert JPEG to PNG with transparency support', from: 'JPG', to: 'PNG', cat: 'image', icon: '🖼️', quality: 5, accept: '.jpg,.jpeg' },
  { id: 'png-to-jpg', name: 'PNG to JPG', desc: 'Convert PNG to compressed JPEG', from: 'PNG', to: 'JPG', cat: 'image', icon: '🖼️', quality: 5, accept: '.png' },
  { id: 'png-to-webp', name: 'PNG to WebP', desc: 'Modern format — smaller file, same quality', from: 'PNG', to: 'WEBP', cat: 'image', icon: '⚡', quality: 5, accept: '.png' },
  { id: 'jpg-to-webp', name: 'JPG to WebP', desc: 'Convert JPEG to modern WebP format', from: 'JPG', to: 'WEBP', cat: 'image', icon: '⚡', quality: 5, accept: '.jpg,.jpeg' },
  { id: 'webp-to-jpg', name: 'WebP to JPG', desc: 'Convert WebP images to universal JPEG', from: 'WEBP', to: 'JPG', cat: 'image', icon: '🖼️', quality: 5, accept: '.webp' },
  { id: 'heic-to-jpg', name: 'HEIC to JPG', desc: 'Convert iPhone HEIC photos to JPG', from: 'HEIC', to: 'JPG', cat: 'image', icon: '📱', quality: 4, accept: '.heic,.heif' },
  { id: 'svg-to-png', name: 'SVG to PNG', desc: 'Rasterize vector SVG to PNG image', from: 'SVG', to: 'PNG', cat: 'image', icon: '🔲', quality: 5, accept: '.svg' },
  { id: 'compress-image', name: 'Compress Image', desc: 'Reduce image file size up to 90%', from: 'IMG', to: 'IMG', cat: 'image', icon: '🗜️', quality: 5, accept: '.jpg,.jpeg,.png,.webp', multiple: true },
  { id: 'resize-image', name: 'Resize Image', desc: 'Resize images to exact pixel dimensions', from: 'IMG', to: 'IMG', cat: 'image', icon: '📐', quality: 5, accept: '.jpg,.jpeg,.png,.webp' },
  { id: 'images-to-pdf', name: 'Images to PDF', desc: 'Combine multiple images into one PDF', from: 'IMG', to: 'PDF', cat: 'image', icon: '📋', quality: 5, accept: '.jpg,.jpeg,.png,.webp', multiple: true },

  // DOCUMENT TOOLS
  { id: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert DOCX to PDF with perfect formatting', from: 'DOCX', to: 'PDF', cat: 'document', icon: '📝', quality: 5, accept: '.docx,.doc', isNew: true },
  { id: 'word-to-html', name: 'Word to HTML', desc: 'Convert Word document to clean HTML', from: 'DOCX', to: 'HTML', cat: 'document', icon: '🌐', quality: 4, accept: '.docx,.doc' },
  { id: 'word-to-text', name: 'Word to Text', desc: 'Extract plain text from Word document', from: 'DOCX', to: 'TXT', cat: 'document', icon: '📋', quality: 5, accept: '.docx,.doc' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', desc: 'Convert PowerPoint slides to PDF', from: 'PPTX', to: 'PDF', cat: 'document', icon: '🎯', quality: 3, accept: '.pptx,.ppt', isNew: true },
  { id: 'markdown-to-pdf', name: 'Markdown to PDF', desc: 'Render Markdown to beautiful PDF', from: 'MD', to: 'PDF', cat: 'document', icon: '✍️', quality: 5, accept: '.md' },
  { id: 'html-to-pdf', name: 'HTML to PDF', desc: 'Convert any HTML page to PDF', from: 'HTML', to: 'PDF', cat: 'document', icon: '🌐', quality: 4, accept: '.html,.htm' },

  // SPREADSHEET TOOLS
  { id: 'excel-to-csv', name: 'Excel to CSV', desc: 'Export Excel spreadsheet as CSV', from: 'XLSX', to: 'CSV', cat: 'spreadsheet', icon: '📊', quality: 5, accept: '.xlsx,.xls' },
  { id: 'csv-to-excel', name: 'CSV to Excel', desc: 'Import CSV data into Excel spreadsheet', from: 'CSV', to: 'XLSX', cat: 'spreadsheet', icon: '📈', quality: 5, accept: '.csv' },
  { id: 'excel-to-json', name: 'Excel to JSON', desc: 'Export spreadsheet rows as JSON', from: 'XLSX', to: 'JSON', cat: 'spreadsheet', icon: '{ }', quality: 5, accept: '.xlsx,.xls' },
  { id: 'json-to-csv', name: 'JSON to CSV', desc: 'Convert JSON data to CSV spreadsheet', from: 'JSON', to: 'CSV', cat: 'spreadsheet', icon: '📋', quality: 5, accept: '.json' },
  { id: 'csv-to-json', name: 'CSV to JSON', desc: 'Convert CSV data to JSON format', from: 'CSV', to: 'JSON', cat: 'spreadsheet', icon: '{ }', quality: 5, accept: '.csv' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', desc: 'Convert Excel spreadsheet to PDF', from: 'XLSX', to: 'PDF', cat: 'spreadsheet', icon: '📄', quality: 4, accept: '.xlsx,.xls' },

  // VIDEO & AUDIO
  { id: 'mp4-to-mp3', name: 'MP4 to MP3', desc: 'Extract audio from video file', from: 'MP4', to: 'MP3', cat: 'video', icon: '🎬', quality: 4, accept: '.mp4,.mov,.avi' },
  { id: 'video-to-gif', name: 'Video to GIF', desc: 'Convert video clip to animated GIF', from: 'MP4', to: 'GIF', cat: 'video', icon: '🎞️', quality: 4, accept: '.mp4,.mov,.webm' },
  { id: 'compress-video', name: 'Compress Video', desc: 'Reduce video file size significantly', from: 'MP4', to: 'MP4', cat: 'video', icon: '🗜️', quality: 4, accept: '.mp4,.mov' },
  { id: 'mp3-to-wav', name: 'MP3 to WAV', desc: 'Convert MP3 to uncompressed WAV audio', from: 'MP3', to: 'WAV', cat: 'video', icon: '🎵', quality: 5, accept: '.mp3' },
  { id: 'wav-to-mp3', name: 'WAV to MP3', desc: 'Compress WAV audio to MP3 format', from: 'WAV', to: 'MP3', cat: 'video', icon: '🎵', quality: 5, accept: '.wav' },

  // ARCHIVES
  { id: 'files-to-zip', name: 'Files to ZIP', desc: 'Bundle multiple files into ZIP archive', from: 'ANY', to: 'ZIP', cat: 'archive', icon: '📦', quality: 5, accept: '*', multiple: true },
  { id: 'extract-zip', name: 'Extract ZIP', desc: 'Unzip and download all contents', from: 'ZIP', to: 'FILES', cat: 'archive', icon: '📂', quality: 5, accept: '.zip' },
]

export const CATEGORIES = [
  { id: 'all', label: 'All Tools', icon: '⚡', count: TOOLS.length },
  { id: 'pdf', label: 'PDF', icon: '📄', count: TOOLS.filter(t => t.cat === 'pdf').length },
  { id: 'image', label: 'Images', icon: '🖼️', count: TOOLS.filter(t => t.cat === 'image').length },
  { id: 'document', label: 'Documents', icon: '📝', count: TOOLS.filter(t => t.cat === 'document').length },
  { id: 'spreadsheet', label: 'Spreadsheets', icon: '📊', count: TOOLS.filter(t => t.cat === 'spreadsheet').length },
  { id: 'video', label: 'Video & Audio', icon: '🎬', count: TOOLS.filter(t => t.cat === 'video').length },
  { id: 'archive', label: 'Archives', icon: '📦', count: TOOLS.filter(t => t.cat === 'archive').length },
]
