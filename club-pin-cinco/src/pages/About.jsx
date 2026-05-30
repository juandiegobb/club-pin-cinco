import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
// Página principal "Sobre Nosotros"
// Importamos cada componente desde su propia carpeta
import AboutHero from '../components/about/AboutHero/AboutHero'
import AboutSection from '../components/about/AboutSection/AboutSection'
import AboutGallery from '../components/about/AboutGallery/AboutGallery'

// Imágenes de las secciones
import trayectoriaImg from '../assets/about/about-trayectoria.jpg'
import identidadImg from '../assets/about/about-identidad.jpg'

import styles from './About.module.css'

function About() {
  const { t, language } = useLanguage()
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  return (
    <div className={styles.page}>

      {/* Hero con imagen de fondo y título */}
      <AboutHero />

      <main className={styles.content}>

        {/* Sección Trayectoria — imagen a la izquierda */}
        <AboutSection
          title={t('trayectoriaTitle')}
          text={t('trayectoriaTexto')}
          image={trayectoriaImg}
          imageAlt={language === 'es' ? 'Instalaciones de Pin Cinco' : 'Pin Cinco facilities'}
        />

        {/* Sección Historia — texto largo con galería de fotos abajo */}
        <motion.section 
          className={styles.historiaBlock}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={springTransition}
        >
          <motion.h2 
            className={styles.historiaTitle}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            {t('historiaTitle')}
          </motion.h2>
          <p className={styles.historiaText}>{t('historiaTexto')}</p>
          {/* Galería de 3 fotos */}
          <AboutGallery />
        </motion.section>

        {/* Sección Identidad — imagen a la derecha */}
        <AboutSection
          title={t('identidadTitle')}
          text={t('identidadTexto')}
          image={identidadImg}
          imageAlt={language === 'es' ? 'Bola de billar en Pin Cinco' : 'Billiard ball at Pin Cinco'}
          reverse
        />

      </main>
    </div>
  )
}

export default About