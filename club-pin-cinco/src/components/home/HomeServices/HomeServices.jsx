import { motion } from 'framer-motion'
import HomeServiceCard from '../HomeServiceCard/HomeServiceCard'
import pinsImage from '../../../assets/home/home-bolos.jpg'
import billiardsCardImage from '../../../assets/home/home-hero-billar.jpg'
import styles from './HomeServices.module.css'

const services = [
  {
    title: 'Bolos',
    description: 'Derriba pinos, reta a tus amigos y vive la mejor experiencia de bolos en Pin Cinco.',
    image: pinsImage,
    imageAlt: 'Pinos de bolos en la pista',
  },
  {
    title: 'Billar',
    description: 'Afina tu puntería, reta a tus amigos y vive la mejor experiencia de billar en Pin Cinco.',
    image: billiardsCardImage,
    imageAlt: 'Mesa de billar con bolas listas para jugar',
    reverse: true,
  },
]

function HomeServices() {
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  return (
    <motion.section 
      className={styles.services} 
      aria-labelledby="home-services-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={springTransition}
    >
      <motion.h2 
        id="home-services-title" 
        className={styles.title}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
      >
        Nuestros servicios
      </motion.h2>
      <div className={styles.list}>
        {services.map((service) => (
          <HomeServiceCard key={service.title} {...service} />
        ))}
      </div>
    </motion.section>
  )
}

export default HomeServices