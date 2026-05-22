import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingChat from '../components/chat/FloatingChat'

function MainLayout() {
  return (
    <div className="site-shell">
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
