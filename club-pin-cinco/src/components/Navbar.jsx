import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navigation'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Principal">
        <div className="navbar__links navbar__links--left">
          {navItems.slice(0, 2).map((item) => (
            <NavLink className="navbar__link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink className="navbar__logo" to="/" aria-label="Ir al inicio">
          <span className="navbar__logo-ring">
            <span>PIN</span>
            <strong>5</strong>
          </span>
        </NavLink>

        <div className="navbar__links navbar__links--right">
          {navItems.slice(2).map((item) => (
            <NavLink className="navbar__link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
