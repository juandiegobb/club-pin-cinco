import { useState } from 'react'
import styles from './GalleryCarousel.module.css'

function GalleryCarousel({ images }) {
  const [current, setCurrent] = useState(0)
  const len = images.length

  function prev() { setCurrent((i) => (i === 0 ? len - 1 : i - 1)) }
  function next() { setCurrent((i) => (i === len - 1 ? 0 : i + 1)) }

  // Calcula los 5 índices visibles: far-left, left, center, right, far-right
  const getIdx = (offset) => (current + offset + len) % len

  return (
    <div className={styles.carousel}>

      {/* Imagen muy pequeña — extremo izquierdo con flecha ← */}
      <div className={styles.farSide}>
        <button className={styles.arrow} onClick={prev} type="button" aria-label="Anterior">
          ←
        </button>
        <img className={styles.farImage} src={images[getIdx(-2)].src} alt={images[getIdx(-2)].alt} />
      </div>

      {/* Imagen mediana izquierda */}
      <div className={styles.side}>
        <img className={styles.sideImage} src={images[getIdx(-1)].src} alt={images[getIdx(-1)].alt} />
      </div>

      {/* Imagen central — la grande y destacada */}
      <div className={styles.center}>
        <img className={styles.centerImage} src={images[current].src} alt={images[current].alt} />
      </div>

      {/* Imagen mediana derecha */}
      <div className={styles.side}>
        <img className={styles.sideImage} src={images[getIdx(1)].src} alt={images[getIdx(1)].alt} />
      </div>

      {/* Imagen muy pequeña — extremo derecho con flecha → */}
      <div className={styles.farSide}>
        <button className={styles.arrow} onClick={next} type="button" aria-label="Siguiente">
          →
        </button>
        <img className={styles.farImage} src={images[getIdx(2)].src} alt={images[getIdx(2)].alt} />
      </div>

    </div>
  )
}

export default GalleryCarousel