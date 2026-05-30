import { useRef, useState } from "react";
import styles from "./GalleryCarousel.module.css";

/**
 * Carrusel infinito tipo "ticker":
 * - Todas las imágenes tienen el mismo tamaño.
 * - La cinta corre continuamente con animación CSS pura.
 * - Se pausa al hacer hover.
 */
function GalleryCarousel({ images }) {
  const [paused, setPaused] = useState(false);

  // Duplicamos para crear el loop sin saltos
  const doubled = [...images, ...images];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Carrusel de galería"
      role="region"
    >
      <div className={styles.trackWrapper}>
        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          {doubled.map((img, i) => (
            <div className={styles.slide} key={i}>
              <img
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
