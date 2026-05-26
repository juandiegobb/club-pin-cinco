import { motion } from 'framer-motion'
import styles from './AboutHero.module.css'

function AboutHero() {
  return (
    // Contenedor principal del hero con imagen de fondo
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={styles.overlay} />
      <motion.h1 
        id="about-title" 
        className={styles.title}
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 75, damping: 16 }}
      >
        Acerca de Nosotros
      </motion.h1>
    </section>
  )
}

export default AboutHero