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
          <span className={styles.sunIcon} role="img" aria-hidden="true">☀</span>
        ) : (
          <span className={styles.moonIcon} role="img" aria-hidden="true">☾</span>
        )}
      </div>
      <span className={styles.themeText}>
        {isDark ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  )
}
