import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./GalleryCarousel.module.css";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function GalleryCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const len = images.length;

  function prev() {
    setDirection(-1);
    setCurrent((i) => (i === 0 ? len - 1 : i - 1));
  }
  function next() {
    setDirection(1);
    setCurrent((i) => (i === len - 1 ? 0 : i + 1));
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [len]);

  const getIdx = (offset) => (current + offset + len) % len;

  const springTransition = { type: "spring", stiffness: 60, damping: 15 }

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label="Carrusel de galería"
    >
      {/* Imagen muy pequeña — extremo izquierdo con flecha ← */}
      <motion.div 
        className={styles.farSide}
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 0.42, x: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
      >
        <button
          className={styles.arrow}
          onClick={prev}
          type="button"
          aria-label="Anterior"
        >
          ←
        </button>
        <img
          className={styles.farImage}
          src={images[getIdx(-2)].src}
          alt={images[getIdx(-2)].alt}
        />
      </motion.div>

      {/* Imagen mediana izquierda */}
      <motion.div 
        className={styles.side}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ ...springTransition, delay: 0.1 }}
      >
        <img
          className={styles.sideImage}
          src={images[getIdx(-1)].src}
          alt={images[getIdx(-1)].alt}
        />
      </motion.div>

      {/* Imagen central — la grande y destacada con drag y AnimatePresence */}
      <motion.div 
        className={styles.center}
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 16 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 26 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold || offset.x < -80) {
                next();
              } else if (swipe > swipeConfidenceThreshold || offset.x > 80) {
                prev();
              }
            }}
            whileHover={{ scale: 1.025 }}
            className={styles.centerImage}
            src={images[current].src}
            alt={images[current].alt}
          />
        </AnimatePresence>
      </motion.div>

      {/* Imagen mediana derecha */}
      <motion.div 
        className={styles.side}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ ...springTransition, delay: 0.1 }}
      >
        <img
          className={styles.sideImage}
          src={images[getIdx(1)].src}
          alt={images[getIdx(1)].alt}
        />
      </motion.div>

      {/* Imagen muy pequeña — extremo derecho con flecha → */}
      <motion.div 
        className={styles.farSide}
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 0.42, x: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
      >
        <button
          className={styles.arrow}
          onClick={next}
          type="button"
          aria-label="Siguiente"
        >
          →
        </button>
        <img
          className={styles.farImage}
          src={images[getIdx(2)].src}
          alt={images[getIdx(2)].alt}
        />
      </motion.div>

      <div className={styles.indicators}>
        {images.map((_, index) => {
          const isActive = index === current;
          return (
            <motion.button
              key={index}
              type="button"
              className={styles.dot}
              animate={{
                width: isActive ? 20 : 10,
                backgroundColor: isActive ? "#f4ff58" : "rgba(255, 255, 255, 0.24)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Ver imagen ${index + 1}`}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GalleryCarousel;
