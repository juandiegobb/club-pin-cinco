import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import imgIzquierda from '../../../assets/home/bolo-inicio.png'
import imgDerecha from '../../../assets/home/billar-inicio.png'
import styles from './HomeHero.module.css'

function HomeHero() {
  const springTransition = { type: 'spring', stiffness: 75, damping: 16 }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  }

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroBackground} />
      
      <section className={styles.hero} aria-labelledby="home-title">

        <motion.img
          className={styles.image}
          src={imgIzquierda}
          alt="Pistas de bolos"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
        />

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className={styles.subtitle}
            variants={textVariants}
            transition={springTransition}
          >
            Club Deportivo
          </motion.span>
          <motion.h1
            id="home-title"
            className={styles.title}
            variants={textVariants}
            transition={springTransition}
          >
            Pin Cinco
          </motion.h1>
          <motion.p
            className={styles.description}
            variants={textVariants}
            transition={springTransition}
          >
            Diversión, entretenimiento y grandes experiencias en un solo lugar
          </motion.p>
          <motion.div
            variants={textVariants}
            transition={springTransition}
          >
            <Link className={styles.button} to="/reserva">
              Turnar aquí
            </Link>
          </motion.div>
        </motion.div>

        <motion.img
          className={styles.imageRight}
          src={imgDerecha}
          alt="Mesa de billar"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
        />

      </section>
    </div>
  )
}

export default HomeHero