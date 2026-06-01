// Grid de miniaturas "Otras Imágenes"
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import styles from './GalleryGrid.module.css'

function GalleryGrid({ images, onImageClick }) {
  return (
    <section aria-labelledby="gallery-grid-title">
      <h2 id="gallery-grid-title" className={styles.title}>
        Otras Imágenes
      </h2>

      {/* Grid de 4 columnas con todas las fotos */}
      <div className={styles.grid}>
        {images.map((image, i) => (
          <ImageWithSkeleton
            key={i}
            className={styles.photo}
            src={image.src}
            alt={image.alt}
            onClick={() => onImageClick && onImageClick(image)}
          />
        ))}
      </div>
    </section>
  )
}

export default GalleryGrid