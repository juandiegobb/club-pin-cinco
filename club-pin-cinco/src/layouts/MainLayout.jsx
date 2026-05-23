import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
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