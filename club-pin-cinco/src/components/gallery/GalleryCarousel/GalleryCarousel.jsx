import { useState } from "react";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./GalleryCarousel.module.css";

/**
 * Carrusel infinito tipo "ticker":
 * - Todas las imágenes tienen el mismo tamaño.
 * - La cinta corre continuamente con animación CSS pura.
 * - Se pausa al hacer hover.
 */
function GalleryCarousel({ images, onImageClick }) {
  const [paused, setPaused] = useState(false);
  const { language } = useLanguage()

  // Duplicamos para crear el loop sin saltos
  const doubled = [...images, ...images];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={language === 'es' ? 'Carrusel de galería' : 'Gallery carousel'}
      role="region"
    >
      <div className={styles.trackWrapper} style={{ cursor: "pointer" }}>
        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          {doubled.map((img, i) => (
            <div 
              className={styles.slide} 
              key={i}
              onClick={() => onImageClick && onImageClick(img)}
            >
              <ImageWithSkeleton
                className={styles.img}
                src={img.src}
                alt={img.alt}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryCarousel;
