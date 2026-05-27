import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const { theme } = useTheme()
  const followerRef = useRef(null)

  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Guardar posición inicial fuera de la pantalla
    follower.style.transform = 'translate3d(-100px, -100px, 0)'

    function handleMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animación suave usando interpolación lineal (Lerp) para efecto de retraso premium
    let animationFrameId
    function updatePosition() {
      // Lerp formula: current = current + (target - current) * speed
      // 0.15 da un retraso suave de seguimiento sumamente profesional
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15

      // El tamaño del halo es de 40px, por lo que restamos 20 para centrarlo perfectamente
      follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`

      animationFrameId = requestAnimationFrame(updatePosition)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={followerRef}
      className={styles.cursorFollower}
      data-theme={theme}
      style={{ pointerEvents: 'none' }}
    />
  )
}
