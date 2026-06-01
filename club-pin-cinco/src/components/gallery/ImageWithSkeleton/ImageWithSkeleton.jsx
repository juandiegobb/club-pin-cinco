import { useState } from 'react'
import styles from './ImageWithSkeleton.module.css'

function ImageWithSkeleton({ src, alt, className, onClick, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div 
      className={`${styles.wrapper} ${className || ''}`} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {!loaded && !error && (
        <div className={styles.skeleton}>
          <div className={styles.shimmer} />
        </div>
      )}
      {error ? (
        <div className={styles.errorFallback}>
          <span className={styles.errorText}>⚠️</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true)
            setLoaded(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}

export default ImageWithSkeleton
