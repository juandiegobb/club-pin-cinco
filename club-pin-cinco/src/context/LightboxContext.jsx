import { createContext, useContext, useState } from 'react'
import Lightbox from '../components/gallery/Lightbox/Lightbox'

const LightboxContext = createContext()

export function LightboxProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  function openLightbox(imgs, index = 0) {
    const imgsArray = Array.isArray(imgs) ? imgs : [imgs]
    setImages(imgsArray)
    setCurrentIndex(index)
    setIsOpen(true)
  }

  function closeLightbox() {
    setIsOpen(false)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  return useContext(LightboxContext)
}
