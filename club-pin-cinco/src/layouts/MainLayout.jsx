import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FloatingChat from '../components/chat/FloatingChat/FloatingChat'

const Background = lazy(() => import('../components/Background/Background'))

function MainLayout() {
  return (
    <div className="site-shell">
      <Suspense fallback={null}>
        <Background />
      </Suspense>
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