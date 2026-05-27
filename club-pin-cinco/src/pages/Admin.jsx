import { useState, useEffect, useRef } from 'react'
import { getMessages, saveMessage, markAllRead, clearMessages, unreadCount } from '../utils/chatStorage'
import styles from './Admin.module.css'

const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'pincinco2024'

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
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState('')
  const [unread, setUnread] = useState(0)
  const chatBoxRef = useRef(null)

  useEffect(() => {
    if (!isAdmin) return
    setMessages(getMessages())
    markAllRead()
    setUnread(0)

    function handleUpdate() {
      setMessages(getMessages())
      setUnread(unreadCount())
    }
    window.addEventListener('chat-updated', handleUpdate)

    const interval = setInterval(() => {
      setMessages(getMessages())
      setUnread(unreadCount())
    }, 1000)

    return () => {
      window.removeEventListener('chat-updated', handleUpdate)
      clearInterval(interval)
    }
  }, [isAdmin])

  // Scroll solo dentro del chatBox
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages])

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

  function handleReply() {
    if (!reply.trim()) return
    saveMessage('club', reply.trim())
    setMessages(getMessages())
    setReply('')
  }

  function handleClear() {
    if (confirm('¿Borrar todos los mensajes del chat?')) {
      clearMessages()
      setMessages([])
    }
  }

  function handleWhatsApp() {
    window.open('https://wa.me/573202967582', '_blank')
  }

  // ── Login ──
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
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleLogin()
                }
              }}
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
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleLogin()
                }
              }}
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
          <p className={styles.cardText}>Ver y gestionar las reservas enviadas desde la página.</p>
          <button className={styles.whatsappBtn} onClick={handleWhatsApp} type="button">
            📲 Abrir WhatsApp Business
          </button>
        </section>

        {/* Chat */}
        <section className={styles.card}>
          <div className={styles.chatHeader}>
            <h2 className={styles.cardTitle}>
              💬 Chat con Usuarios
              {unread > 0 && <span className={styles.badge}>{unread}</span>}
            </h2>
            <button className={styles.clearBtn} onClick={handleClear} type="button">
              🗑 Limpiar chat
            </button>
          </div>
          <p className={styles.cardText}>{messages.length} mensaje(s) en total.</p>

          {/* chatBoxRef aquí — scroll interno */}
          <div className={styles.chatBox} ref={chatBoxRef}>
            {messages.length === 0 ? (
              <p className={styles.empty}>No hay mensajes aún.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.author === 'guest' ? styles.messageGuest : styles.messageClub}`}
                >
                  <span className={styles.messageAuthor}>
                    {msg.author === 'guest' ? '👤 Usuario' : '🎳 Club'}
                    {' · '}
                    <span className={styles.messageTime}>
                      {new Date(msg.timestamp).toLocaleString('es-CO')}
                    </span>
                  </span>
                  <p className={styles.messageText}>{msg.text}</p>
                </div>
              ))
            )}
          </div>

          <div className={styles.replyBox}>
            <input
              className={styles.replyInput}
              type="text"
              placeholder="Escribe una respuesta al usuario..."
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleReply()
                }
              }}
            />
            <button className={styles.replyBtn} onClick={handleReply} type="button">
              Enviar ▶
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>📊 Preguntas Frecuentes</h2>
          <p className={styles.cardText}>Temas más consultados por los usuarios.</p>
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