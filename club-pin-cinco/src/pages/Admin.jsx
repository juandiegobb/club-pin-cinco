import { useState } from 'react'
import styles from './Admin.module.css'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Credenciales del admin — cámbialas aquí
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'pincinco2024'

// Preguntas más frecuentes del chat
const faqStats = [
  { pregunta: 'Horarios de atención', consultas: 24 },
  { pregunta: 'Precios y tarifas', consultas: 18 },
  { pregunta: 'Reservas', consultas: 15 },
  { pregunta: 'Ubicación', consultas: 12 },
  { pregunta: 'Servicios disponibles', consultas: 9 },
]

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin() {
    setError('')
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setIsAdmin(true)
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  function handleLogout() {
    setIsAdmin(false)
    setUsername('')
    setPassword('')
  }

  function handleWhatsApp() {
    window.open('https://wa.me/573202967582', '_blank')
  }

  // ── Pantalla de login ──
  if (!isAdmin) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>🔐 Administrador</h1>
          <p className={styles.loginSubtitle}>Club Deportivo Pin Cinco</p>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Usuario</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Contraseña</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.loginBtn} onClick={handleLogin} type="button">
            Iniciar sesión
          </button>
        </div>
      </div>
    )
  }

  // ── Panel admin ──
  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Panel de Administración</h1>
          <p className={styles.headerSub}>Club Deportivo Pin Cinco</p>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout} type="button">
          Cerrar sesión
        </button>
      </header>

      <main className={styles.content}>

        {/* WhatsApp */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>📱 Reservas por WhatsApp</h2>
          <p className={styles.cardText}>
            Ver y gestionar las reservas enviadas por los usuarios desde la página web.
          </p>
          <button className={styles.whatsappBtn} onClick={handleWhatsApp} type="button">
            📲 Abrir WhatsApp Business
          </button>
        </section>

        {/* Preguntas frecuentes */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>💬 Preguntas Frecuentes del Chat</h2>
          <p className={styles.cardText}>
            Temas más consultados por los usuarios en el chat de la página.
          </p>
          <div className={styles.faqList}>
            {faqStats.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <div className={styles.faqInfo}>
                  <span className={styles.faqRank}>#{i + 1}</span>
                  <span className={styles.faqText}>{item.pregunta}</span>
                </div>
                <div className={styles.faqBarWrapper}>
                  <div
                    className={styles.faqBar}
                    style={{ width: `${(item.consultas / faqStats[0].consultas) * 100}%` }}
                  />
                  <span className={styles.faqCount}>{item.consultas}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default Admin