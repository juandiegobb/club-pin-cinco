import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Lightbox.module.css'

function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  // Manejar teclado para navegar y cerrar
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    // Desactivar scroll del body mientras esté abierto
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Restaurar scroll del body al cerrar
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || !images || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Cerrar visualizador"
      >
        <X size={28} />
      </button>

      {/* Flecha Izquierda */}
      <button
        className={`${styles.navButton} ${styles.navLeft}`}
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Contenedor de la Imagen */}
      <div className={styles.contentWrapper} onClick={(e) => e.stopPropagation()}>
        <motion.div
          key={currentIndex}
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={styles.expandedImage}
          />
        </motion.div>

        {/* Información y pie de foto */}
        <div className={styles.infoFooter}>
          <p className={styles.caption}>{currentImage.alt}</p>
          <span className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Flecha Derecha */}
      <button
        className={`${styles.navButton} ${styles.navRight}`}
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={36} />
      </button>
    </motion.div>
  )
}

export default Lightbox
