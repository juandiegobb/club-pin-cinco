import { useState } from 'react'
import heroImage from '../assets/hero.png'
import reactIcon from '../assets/react.svg'
import viteIcon from '../assets/vite.svg'

const galleryImages = [
  heroImage,
  reactIcon,
  viteIcon,
]

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }

  return (
    <section className="page page--gallery">
      <h1>Galeria</h1>
      <div className="gallery-carousel">
        <button type="button" onClick={goToPrevious} aria-label="Imagen anterior">
          ‹
        </button>
        <img src={galleryImages[activeIndex]} alt="Club Pin Cinco" />
        <button type="button" onClick={goToNext} aria-label="Imagen siguiente">
          ›
        </button>
      </div>
    </section>
  )
}

export default Gallery
