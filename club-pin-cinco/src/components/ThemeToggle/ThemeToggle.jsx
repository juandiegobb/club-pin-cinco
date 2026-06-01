import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      type="button"
    >
      <div className={styles.iconContainer}>
        {isDark ? (
          <Sun size={16} className={styles.sunIcon} aria-hidden="true" />
        ) : (
          <Moon size={16} className={styles.moonIcon} aria-hidden="true" />
        )}
      </div>
      <span className={styles.themeText}>
        {isDark ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  )
}
