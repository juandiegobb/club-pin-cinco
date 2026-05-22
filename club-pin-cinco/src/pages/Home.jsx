import { Link } from 'react-router-dom'
import HomeServiceCard from '../components/home/HomeServiceCard'
import LocationPanel from '../components/home/LocationPanel'
import ScheduleList from '../components/home/ScheduleList'
import billiardsCardImage from '../assets/home/home-billiards-card.jpg'
import heroBilliardsImage from '../assets/home/home-hero-billar.jpg'
import heroBowlingImage from '../assets/home/home-hero-bolos.jpg'
import pinsImage from '../assets/home/home-pins.jpg'

const services = [
  {
    title: 'Bolos',
    description: 'Derriba pinos, reta a tus amigos y vive la mejor experiencia de bolos en Pin Cinco.',
    image: pinsImage,
    imageAlt: 'Pinos de bolos en la pista',
  },
  {
    title: 'Billar',
    description: 'Afina tu punteria, reta a tus amigos y vive la mejor experiencia de billar en Pin Cinco.',
    image: billiardsCardImage,
    imageAlt: 'Mesa de billar con bolas listas para jugar',
    reverse: true,
  },
]

function Home() {
  return (
    <section className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <img className="home-hero__image" src={heroBilliardsImage} alt="Mesa de billar de Pin Cinco" />

        <div className="home-hero__content">
          <span>Club Deportivo</span>
          <h1 id="home-title">Pin Cinco</h1>
          <p>Diversion, entretenimiento y grandes experiencias en un solo lugar</p>
          <Link className="home-hero__button" to="/reserva">
            Reserva aqui
          </Link>
        </div>

        <img className="home-hero__image" src={heroBowlingImage} alt="Pistas de bolos de Pin Cinco" />
      </section>

      <section className="home-services" aria-labelledby="home-services-title">
        <h2 id="home-services-title">Nuestros servicios</h2>

        <div className="home-services__list">
          {services.map((service) => (
            <HomeServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="home-info">
        <LocationPanel />
        <ScheduleList />
      </section>
    </section>
  )
}

export default Home
