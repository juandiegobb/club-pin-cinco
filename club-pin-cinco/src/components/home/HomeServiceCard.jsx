import { Link } from 'react-router-dom'

function HomeServiceCard({ title, description, image, imageAlt, reverse = false }) {
  return (
    <article className={`home-service-card ${reverse ? 'home-service-card--reverse' : ''}`}>
      <img className="home-service-card__image" src={image} alt={imageAlt} />

      <div className="home-service-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="home-service-card__button" to="/servicios">
          Ver mas
        </Link>
      </div>
    </article>
  )
}

export default HomeServiceCard
