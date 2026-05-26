import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './HomeServiceCard.module.css'

function HomeServiceCard({ title, description, image, imageAlt, reverse = false }) {
  return (
    <motion.article 
      className={`${styles.card} ${reverse ? styles.cardReverse : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: 'spring', stiffness: 70, damping: 16 }}
    >

      <img className={styles.image} src={image} alt={imageAlt} />

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{description}</p>
        <Link className={styles.button} to="/servicios">
          Ver más
        </Link>
      </div>

    </motion.article>
  )
}

export default HomeServiceCard
