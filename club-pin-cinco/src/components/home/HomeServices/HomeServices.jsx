import { motion } from 'framer-motion'
import HomeServiceCard from '../HomeServiceCard/HomeServiceCard'
import { useLanguage } from '../../../context/LanguageContext'
import pinsImage from '../../../assets/home/home-bolos.jpg'
import billiardsCardImage from '../../../assets/home/home-hero-billar.jpg'
import styles from './HomeServices.module.css'

function HomeServices() {
  const { t } = useLanguage()
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  const services = [
    {
      title: t('bolosTitle'),
      description: t('bolosDesc'),
      image: pinsImage,
      imageAlt: 'Pinos de bolos en la pista',
    },
    {
      title: t('billarTitle'),
      description: t('billarDesc'),
      image: billiardsCardImage,
      imageAlt: 'Mesa de billar con bolas listas para jugar',
      reverse: true,
    },
  ]

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
        {t('servicesTitle')}
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