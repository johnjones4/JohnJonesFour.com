import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Archive from './pages/Archive/Archive'
import Experience from './pages/Experience/Experience'
import Home from './pages/Home/Home'
import Photography from './pages/Photography/Photography'
import Contact from './pages/Contact/Contact'
import Post from './templates/Post/Post'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Archive />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/work" element={<Experience />} />
        <Route path="/:year/:month/:day/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
