import { motion } from 'framer-motion'
import { useLightbox } from '../../../context/LightboxContext'
import styles from './AboutSection.module.css'

function AboutSection({ title, text, image, imageAlt, reverse = false }) {
  const { openLightbox } = useLightbox()
  const springTransition = { type: 'spring', stiffness: 65, damping: 15 }

  return (
    // Si reverse=true la imagen va a la derecha, si no va a la izquierda
    <motion.article 
      className={`${styles.section} ${reverse ? styles.sectionReverse : ''}`}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={springTransition}
    >

      <motion.img
        className={styles.image}
        src={image}
        alt={imageAlt}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={springTransition}
        onClick={() => openLightbox({ src: image, alt: imageAlt })}
        style={{ cursor: 'pointer' }}
      />

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </motion.div>

    </motion.article>
  )
}

export default AboutSection