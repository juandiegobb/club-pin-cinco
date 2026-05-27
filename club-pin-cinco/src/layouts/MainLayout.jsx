import { Outlet, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FloatingChat from '../components/chat/FloatingChat/FloatingChat'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import BowlingBallCanvas from '../components/3d/BowlingBallCanvas'

const Background = lazy(() => import('../components/Background/Background'))

function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="site-shell">
      <CustomCursor />
      <Suspense fallback={null}>
        <Background />
      </Suspense>
      {isHome && <BowlingBallCanvas />}
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  )
}

export default MainLayout