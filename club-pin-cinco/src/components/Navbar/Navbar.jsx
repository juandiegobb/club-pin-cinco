import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navigation";
import logo from "../../assets/home/logo-pincinco.jpeg";
import styles from "./Navbar.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

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
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ""}`}
          />
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileMenuInner}>
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileLink} ${styles.mobileLinkActive}`
                  : styles.mobileLink
              }
              key={item.path}
              to={item.path}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
