// Sección hero de Sobre Nosotros
// Muestra el título principal con imagen de fondo
import styles from './AboutHero.module.css'

function AboutHero() {
  return (
    // Contenedor principal del hero con imagen de fondo
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={styles.overlay} />
      <h1 id="about-title" className={styles.title}>
        Acerca de Nosotros
      </h1>
    </section>
  )
}

export default AboutHero