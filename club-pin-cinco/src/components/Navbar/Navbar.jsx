import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navigation";
import logo from "../../assets/home/logo-pincinco.jpeg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  function closeMenu() {
    setOpen(false);
  }

  // Detectar scroll para compactar el navbar
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const translationMap = {
    "/": "home",
    "/nosotros": "about",
    "/servicios": "services",
    "/galeria": "gallery",
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      {/* Línea neon inferior animada con máscara central para el logo */}
      <div className={styles.neonLine} aria-hidden="true" />

      <nav className={styles.inner} aria-label="Principal">
        {/* Links izquierda */}
        <div className={`${styles.links} ${styles.linksLeft}`}>
          {navItems.slice(0, 2).map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.linkActive}`
                  : styles.link
              }
              key={item.path}
              to={item.path}
              onClick={closeMenu}
            >
              <span className={styles.linkText}>{t(translationMap[item.path])}</span>
            </NavLink>
          ))}
        </div>

        {/* Logo central */}
        <NavLink className={styles.logo} to="/" aria-label="Ir al inicio" onClick={closeMenu}>
          <div className={styles.logoRing}>
            <img src={logo} alt="Logo Pin Cinco" className={styles.logoImg} />
          </div>
        </NavLink>

        {/* Links derecha */}
        <div className={`${styles.links} ${styles.linksRight}`}>
          {navItems.slice(2).map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.linkActive}`
                  : styles.link
              }
              key={item.path}
              to={item.path}
              onClick={closeMenu}
            >
              <span className={styles.linkText}>{t(translationMap[item.path])}</span>
            </NavLink>
          ))}
          <div className={styles.desktopToggle}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Toggles móvil */}
        <div className={styles.mobileToggle}>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Botón hamburguesa */}
        <button
          type="button"
          className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.mobileMenuInner}>
          {navItems.map((item, i) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileLink} ${styles.mobileLinkActive}`
                  : styles.mobileLink
              }
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              style={{ "--i": i }}
            >
              {t(translationMap[item.path])}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Overlay menú móvil */}
      {open && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Navbar;
