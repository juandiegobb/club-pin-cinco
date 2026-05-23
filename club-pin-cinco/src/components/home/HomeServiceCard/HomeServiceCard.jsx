import { Link } from 'react-router-dom'
import styles from './HomeServiceCard.module.css'

function HomeServiceCard({ title, description, image, imageAlt, reverse = false }) {
  return (
    <article className={`${styles.card} ${reverse ? styles.cardReverse : ''}`}>

      <img className={styles.image} src={image} alt={imageAlt} />

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{description}</p>
        <Link className={styles.button} to="/servicios">
          Ver más
        </Link>
      </div>

    </article>
  )
}

export default HomeServiceCard
