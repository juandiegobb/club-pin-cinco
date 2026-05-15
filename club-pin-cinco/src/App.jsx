import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Club Deportivo Pin Cinco</h1>
        <p>11 años de diversión y tradición</p>
      </header>

      <nav>
        <ul>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#precios">Precios</a></li>
          <li><a href="#reservas">Reservas</a></li>
        </ul>
      </nav>

      <main>
        <section id="servicios">
          <h2>Nuestros Servicios</h2>
          <div className="card">
            <h3>Bolos</h3>
            <p>Ambiente familiar, 20 lanzamientos por línea.</p>
          </div>
          <div className="card">
            <h3>Billar</h3>
            <p>Mesas de pool, libre y tres bandas.</p>
          </div>
        </section>

        <section id="reservas">
          <h2>Reserva tu Pista</h2>
          <button onClick={() => window.open('https://wa.me/tu-numero-aqui', '_blank')}>
            Contactar por WhatsApp
          </button>
        </section>
      </main>

      <footer>
        <p>Ubicación: Tunja, Boyacá | Horario: Lunes a Jueves 11am - 11pm</p>
      </footer>
    </div>
  )
}

export default App