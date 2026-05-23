import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Columna izquierda — Redes sociales */}
      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Redes sociales</h2>

        {/* Facebook */}
        <a
          className={styles.socialLink}
          href="https://www.facebook.com/ClubDeportivoPINCINCO"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Club Pin Cinco"
        >
          <img
            className={styles.socialIcon}
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
          />
          <span>CLUB Deportivo PIN CINCO</span>
        </a>

        {/* Instagram */}
        <a
          className={styles.socialLink}
          href="https://www.instagram.com/clubdeportivopin5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Club Pin Cinco"
        >
          <img
            className={styles.socialIcon}
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
          />
          <span>@clubdeportivopin5</span>
        </a>
      </section>

      {/* Divisor vertical */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Columna derecha — Contáctanos */}
      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Contáctanos</h2>
        <p className={styles.contactRow}>
          <span className={styles.phoneIcon}>📞</span>
          320 2967582 — 311 2956363
        </p>
      </section>

    </footer>
  )
}

export default Footer