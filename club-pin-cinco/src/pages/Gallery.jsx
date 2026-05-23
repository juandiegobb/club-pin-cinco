import GalleryCarousel from '../components/gallery/GalleryCarousel/GalleryCarousel'
import GalleryGrid from '../components/gallery/GalleryGrid/GalleryGrid'
import styles from './Gallery.module.css'

// ── Carrusel (5 fotos) ──
import g1 from '../assets/gallery/gallery-1.jpg'
import g2 from '../assets/gallery/gallery-2.jpg'
import g3 from '../assets/gallery/gallery-3.jpg'
import g4 from '../assets/gallery/gallery-4.jpg'
import g5 from '../assets/gallery/gallery-5.jpg'

// ── Grid (8 fotos diferentes) ──
import g6  from '../assets/gallery/gallery-6.jpg'
import g7  from '../assets/gallery/gallery-7.jpg'
import g8  from '../assets/gallery/gallery-8.jpg'
import g9  from '../assets/gallery/gallery-9.jpg'
import g10 from '../assets/gallery/gallery-10.jpg'
import g11 from '../assets/gallery/gallery-11.jpg'
import g12 from '../assets/gallery/gallery-12.jpg'
import g13 from '../assets/gallery/gallery-13.jpg'

// Las 5 mejores fotos van en el carrusel
const carouselImages = [
  { src: g1, alt: 'Club Pin Cinco' },
  { src: g2, alt: 'Pistas de bolos' },
  { src: g3, alt: 'Bolas de bolos' },
  { src: g4, alt: 'Instalaciones Pin Cinco' },
  { src: g5, alt: 'Ambiente del club' },
]

// Las otras 8 van en el grid 4x2
const gridImages = [
  { src: g6,  alt: 'Zona de juego' },
  { src: g7,  alt: 'Detalle pista' },
  { src: g8,  alt: 'Equipamiento' },
  { src: g9,  alt: 'Bolas coloridas' },
  { src: g10, alt: 'Mesa de billar' },
  { src: g11, alt: 'Pinos' },
  { src: g12, alt: 'Vista general' },
  { src: g13, alt: 'Club deportivo' },
]

function Gallery() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Galería</h1>
      <GalleryCarousel images={carouselImages} />
      <GalleryGrid images={gridImages} />
    </div>
  )
}

export default Gallery