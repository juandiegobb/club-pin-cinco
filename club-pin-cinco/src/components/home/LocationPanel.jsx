function LocationPanel() {
  return (
    <section className="home-location" aria-labelledby="home-location-title">
      <h2 id="home-location-title">Ubicacion</h2>

      <div className="home-location__map" aria-label="Mapa referencial de ubicacion">
        <span className="home-location__road home-location__road--main" />
        <span className="home-location__road home-location__road--side" />
        <span className="home-location__pin" />
        <strong>Club Deportivo Pin Cinco</strong>
      </div>

      <p>Transversal 0 Este 66a 18 Muscas Centro Comercial Rio 150003 Tunja, Colombia</p>
    </section>
  )
}

export default LocationPanel
