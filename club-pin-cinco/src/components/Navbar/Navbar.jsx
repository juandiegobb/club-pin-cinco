import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import logo from '../../assets/home/logo-pincinco.jpeg'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.inner} aria-label="Principal">

        <div className={`${styles.links} ${styles.linksLeft}`}>
          {navItems.slice(0, 2).map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink className={styles.logo} to="/" aria-label="Ir al inicio">
          <img src={logo} alt="Logo Pin Cinco" className={styles.logoImg} />
        </NavLink>

        <div className={`${styles.links} ${styles.linksRight}`}>
          {navItems.slice(2).map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

      </nav>
    </header>
  )
}

export default Navbar