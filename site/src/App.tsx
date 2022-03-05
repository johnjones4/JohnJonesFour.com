import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Archive from './pages/Archive/Archive'
import Experience from './pages/Experience/Experience'
import Home from './pages/Home/Home'
import Photography from './pages/Photography/Photography'
import Contact from './pages/Contact/Contact'
import Post from './templates/Post/Post'

const routes = [
  {
    path: '/posts',
    element: (<Archive />)
  },
  {
    path: '/archive',
    element: (<Archive />)
  },
  {
    path: '/photography',
    element: (<Photography />)
  },
  {
    path: '/contact',
    element: (<Contact />)
  },
  {
    path: '/experience',
    element: (<Experience />)
  },
  {
    path: '/work',
    element: (<Experience />)
  },
  {
    path: '/:year/:month/:day/:slug',
    element: (<Post />)
  }
]

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} /> 
        <Route path='/index.html' element={<Home />} /> 
        {routes.map(({path, element}) => <Route path={path} element={element} />)}
        {routes.map(({path, element}) => <Route path={`${path}/index.html`} element={element} />)}
      </Routes>
    </BrowserRouter>
  )
}

export default App
