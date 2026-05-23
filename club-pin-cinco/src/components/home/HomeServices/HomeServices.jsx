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
  return (
    <section className={styles.services} aria-labelledby="home-services-title">
      <h2 id="home-services-title" className={styles.title}>Nuestros servicios</h2>
      <div className={styles.list}>
        {services.map((service) => (
          <HomeServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  )
}

export default HomeServices