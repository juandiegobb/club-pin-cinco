import { motion } from 'framer-motion'
import { useLanguage } from '../../../context/LanguageContext'
import { useLightbox } from '../../../context/LightboxContext'
import styles from './AboutGallery.module.css'

// Lista de fotos con su texto alternativo en español e inglés
const historyPhotos = [
  {
    src: new URL('../../../assets/about/about-historia-1.jpg', import.meta.url).href,
    altEs: 'Historia Pin Cinco — foto 1',
    altEn: 'Pin Cinco History — photo 1',
  },
  {
    src: new URL('../../../assets/about/about-historia-2.jpg', import.meta.url).href,
    altEs: 'Historia Pin Cinco — foto 2',
    altEn: 'Pin Cinco History — photo 2',
  },
  {
    src: new URL('../../../assets/about/about-historia-3.jpg', import.meta.url).href,
    altEs: 'Historia Pin Cinco — foto 3',
    altEn: 'Pin Cinco History — photo 3',
  },
]

function AboutGallery() {
  const { language } = useLanguage()
  const { openLightbox } = useLightbox()
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
      aria-label={language === 'es' ? 'Fotos de historia' : 'History photos'}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {historyPhotos.map((photo, index) => (
        <motion.img
          key={photo.altEs}
          className={styles.photo}
          src={photo.src}
          alt={language === 'es' ? photo.altEs : photo.altEn}
          variants={photoVariants}
          transition={springTransition}
          onClick={() => {
            const mapped = historyPhotos.map(p => ({
              src: p.src,
              alt: language === 'es' ? p.altEs : p.altEn
            }))
            openLightbox(mapped, index)
          }}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </motion.div>
  )
}

export default AboutGallery