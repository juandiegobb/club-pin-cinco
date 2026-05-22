import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

function Home() {
  return (
    <section className="page page--home">
      <div className="hero">
        <img className="hero__media hero__media--left" src={heroImage} alt="Mesa de billar" />
        <div className="hero__content">
          <span>Club Deportivo</span>
          <h1>Pin Cinco</h1>
          <p>Diversion, entretenimiento y grandes experiencias en un solo lugar</p>
          <Link className="button" to="/reserva">Reserva aqui</Link>
        </div>
        <img className="hero__media hero__media--right" src={heroImage} alt="Pistas de bolos" />
      </div>
    </section>
  )
}

export default Home
