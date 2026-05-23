import { Link } from 'react-router-dom'
import imgIzquierda from '../../../assets/home/bolo-inicio.png'
import imgDerecha from '../../../assets/home/billar-inicio.png'
import styles from './HomeHero.module.css'

function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">

      <img className={styles.image} src={imgIzquierda} alt="Pistas de bolos" />

      <div className={styles.content}>
        <span className={styles.subtitle}>Club Deportivo</span>
        <h1 id="home-title" className={styles.title}>Pin Cinco</h1>
        <p className={styles.description}>
          Diversión, entretenimiento y grandes experiencias en un solo lugar
        </p>
        <Link className={styles.button} to="/reserva">
          Turnar aquí
        </Link>
      </div>

      <img className={styles.imageRight} src={imgDerecha} alt="Mesa de billar" />

    </section>
  )
}

export default HomeHero