import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Reservation from './pages/Reservation'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/reserva" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App