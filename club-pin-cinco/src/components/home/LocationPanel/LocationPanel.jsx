import styles from './LocationPanel.module.css'

function LocationPanel() {
  return (
    <section className={styles.location} aria-labelledby="home-location-title">
      <h2 id="home-location-title" className={styles.title}>Ubicación</h2>

      <div className={styles.map} aria-label="Mapa referencial de ubicación">
        <span className={`${styles.road} ${styles.roadMain}`} />
        <span className={`${styles.road} ${styles.roadSide}`} />
        <span className={styles.pin} />
        <strong className={styles.label}>Club Deportivo Pin Cinco</strong>
      </div>

      <p className={styles.address}>
        Transversal 0 Este 66a 18 Muscas Centro Comercial Rio 150003 Tunja, Colombia
      </p>
    </section>
  )
}

export default LocationPanel