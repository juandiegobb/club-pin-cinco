import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../context/LanguageContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme()
  const { language } = useLanguage()

  const getAriaLabel = () => {
    if (language === 'es') {
      return `Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`
    } else {
      return `Change to ${isDark ? 'light' : 'dark'} mode`
    }
  }

  const getThemeText = () => {
    if (language === 'es') {
      return isDark ? 'Claro' : 'Oscuro'
    } else {
      return isDark ? 'Light' : 'Dark'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label={getAriaLabel()}
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
        {getThemeText()}
      </span>
    </button>
  )
}
