import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage'
import About from './pages/About'

function App() {
  const [lang, setLang] = useState('en')

  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/country/:id" element={<CountryPage lang={lang} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App