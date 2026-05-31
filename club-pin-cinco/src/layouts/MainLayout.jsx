import { Outlet, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FloatingChat from '../components/chat/FloatingChat/FloatingChat'
import TurnToast from '../components/chat/TurnToast/TurnToast'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import BowlingBallCanvas from '../components/3d/BowlingBallCanvas'

const Background = lazy(() => import('../components/Background/Background'))

function MainLayout() {
  const location = useLocation()
  
  // Mostrar la animación 3D de los bolos en todas las secciones excepto en la galería, reserva e interfaz de administrador
  const show3DBackground = 
    location.pathname !== '/galeria' && 
    location.pathname !== '/admin' && 
    location.pathname !== '/reserva'

  return (
    <div className="site-shell">
      <CustomCursor />
      <Suspense fallback={null}>
        <Background />
      </Suspense>
      {show3DBackground && (
        <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 0 }}>
          <BowlingBallCanvas />
        </div>
      )}
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
      <TurnToast />
    </div>
  )
}

export default MainLayout