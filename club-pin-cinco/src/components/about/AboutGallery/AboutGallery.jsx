// Galería de fotos de historia — muestra las 3 imágenes en fila
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
  return (
    // Fila de imágenes de historia
    <div className={styles.gallery} aria-label="Fotos de historia">
      {historyPhotos.map((photo) => (
        <img
          key={photo.alt}
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
        />
      ))}
    </div>
  )
}

export default AboutGallery