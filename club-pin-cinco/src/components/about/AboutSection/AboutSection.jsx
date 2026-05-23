// Componente reutilizable para cada sección de texto con imagen
// Se usa para Trayectoria e Identidad del Negocio
import styles from './AboutSection.module.css'

function AboutSection({ title, text, image, imageAlt, reverse = false }) {
  return (
    // Si reverse=true la imagen va a la derecha, si no va a la izquierda
    <article className={`${styles.section} ${reverse ? styles.sectionReverse : ''}`}>

      <img
        className={styles.image}
        src={image}
        alt={imageAlt}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>

    </article>
  )
}

export default AboutSection