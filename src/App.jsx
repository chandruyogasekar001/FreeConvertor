import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ToolPage from './pages/ToolPage'
import AllTools from './pages/AllTools'
import Privacy from './pages/Privacy'

function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    }, 100)
    return () => { clearTimeout(timer); obs.disconnect() }
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<AllTools />} />
        <Route path="/convert/:toolId" element={<ToolPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Privacy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
