import { motion } from 'framer-motion'
// Página principal "Sobre Nosotros"
// Importamos cada componente desde su propia carpeta
import AboutHero from '../components/about/AboutHero/AboutHero'
import AboutSection from '../components/about/AboutSection/AboutSection'
import AboutGallery from '../components/about/AboutGallery/AboutGallery'

// Imágenes de las secciones
import trayectoriaImg from '../assets/about/about-trayectoria.jpg'
import identidadImg from '../assets/about/about-identidad.jpg'

import styles from './About.module.css'

// Texto de cada sección separado del JSX para que sea fácil de editar
const trayectoriaTexto = `La sede de Pin Cinco nació hace aproximadamente 11 años en Tunja. como un espacio dedicado a la recreación y el entretenimiento para familias, amigos y amantes de los bolos y el billar. Con el paso del tiempo, se ha consolidado como un lugar reconocido en Boyacá gracias a su ambiente y actividades. Además, cada diciembre realiza el tradicional evento “La Gran Virusa Aguinaldo Boyacense”, un evento que reúne participantes nacionales e internacionales.`
const historiaTexto = `El Club Deportico Pin Cinco nació hace más de 11 años gracias a la pasión y trayectoria de su propietario en el mundo de los bolos. Con más de 40 años de trayectoria, sigue participando en competencias y campeonatos nacionales, adquiriendo experiencia y un gran reconocimiento dentro de este deporte. Con el tiempo, surgió la idea de crear un espacio donde otras personas también pudieran disfrutar de la emoción, la diversión y el ambiente que se vive alrededor de los bolos.

Así comenzó El Club Deportivo Pin Cinco, un lugar que para muchos puede parecer escondido, pero que con los años se ha convertido en un punto de encontro para familias amigos grupos empresariales y amantes del deporte del bolo y el billar en Boyacá. Gracias a la dedicación y experiencia de su propietario, el establecimiento ha logrado mantener un ambiente enfocado en el entretenimiento, la tradición y el amor por este deporte.`

const identidadTexto = `El Club Deportivo Pin Cinco es un espacio enfocado en la diversión, el entretenimiento y la integración familiar y social. Su identidad nace de la pasión por el deporte del bolo y el billar,  el deseo de ofrecer un ambiente diferente, donde las personas puedan compartir momentos agradables junto a amigos y familiares.
El establecimiento se caracteriza por combinar deporte, recreación y tradición en un mismo lugar, brindando una experiencia cercana, dinámica y acogedora para quienes lo visitan.`

function About() {
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  return (
    <div className={styles.page}>

      {/* Hero con imagen de fondo y título */}
      <AboutHero />

      <main className={styles.content}>

        {/* Sección Trayectoria — imagen a la izquierda */}
        <AboutSection
          title="Trayectoria"
          text={trayectoriaTexto}
          image={trayectoriaImg}
          imageAlt="Instalaciones de Pin Cinco"
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
            Historia
          </motion.h2>
          <p className={styles.historiaText}>{historiaTexto}</p>
          {/* Galería de 3 fotos */}
          <AboutGallery />
        </motion.section>

        {/* Sección Identidad — imagen a la derecha */}
        <AboutSection
          title="Identidad del Negocio"
          text={identidadTexto}
          image={identidadImg}
          imageAlt="Bola de billar en Pin Cinco"
          reverse
        />

      </main>
    </div>
  )
}

export default About