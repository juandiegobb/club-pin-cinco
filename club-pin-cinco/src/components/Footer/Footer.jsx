import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Redes sociales</h2>
        <p>CLUB Deportivo PIN CINCO</p>
        <p>@clubdeportivopin5</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Contáctanos</h2>
        <p>320 2967582</p>
      </section>
    </footer>
  )
}

export default Footer