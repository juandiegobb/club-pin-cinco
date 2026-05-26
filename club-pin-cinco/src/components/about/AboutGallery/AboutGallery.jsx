import { motion } from 'framer-motion'
import styles from './AboutGallery.module.css'

// Lista de fotos con su texto alternativo
const historyPhotos = [
  {
    src: new URL('../../../assets/about/about-historia-1.jpg', import.meta.url).href,
    alt: 'Historia Pin Cinco — foto 1',
  },
  {
    src: new URL('../../../assets/about/about-historia-2.jpg', import.meta.url).href,
    alt: 'Historia Pin Cinco — foto 2',
  },
  {
    src: new URL('../../../assets/about/about-historia-3.jpg', import.meta.url).href,
    alt: 'Historia Pin Cinco — foto 3',
  },
]

function AboutGallery() {
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    // Fila de imágenes de historia
    <motion.div 
      className={styles.gallery} 
      aria-label="Fotos de historia"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {historyPhotos.map((photo) => (
        <motion.img
          key={photo.alt}
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          variants={photoVariants}
          transition={springTransition}
        />
      ))}
    </motion.div>
  )
}

export default AboutGallery