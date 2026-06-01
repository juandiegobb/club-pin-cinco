import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatProvider } from '../context/ChatContext'
import { useChatContext } from '../context/ChatContext'
import styles from './Admin.module.css'
import { MessageCircle, Settings, Phone, User, Bot, Trash2, Check, Star, LogOut, ArrowLeft, SendHorizontal, Lock, Users, CalendarDays, Clock } from 'lucide-react'

// ─── Panel de Admin (usa el contexto WS con rol admin) ────────────────────────
function AdminPanel({ onLogout }) {
  const navigate = useNavigate()
  const {
    isConnected,
    allMessages,
    activeUsers,
    turns,
    sendAdminReply,
    approveTurn,
    markTurnDone,
    deleteTurn,
  } = useChatContext()

  const [selectedUser, setSelectedUser] = useState(null)
  const [reply, setReply] = useState('')
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'turns'
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const chatBoxRef = useRef(null)

  // Todos los clientIds que han enviado mensajes (activos + con historial)
  const allClientIds = Array.from(new Set([
    ...activeUsers.map(u => u.clientId),
    ...Object.keys(allMessages),
  ]))

  // Mensajes del usuario seleccionado
  const selectedMessages = selectedUser ? (allMessages[selectedUser] || []) : []

  // Contar mensajes no leídos por usuario
  function unreadCount(clientId) {
    const msgs = allMessages[clientId] || []
    return msgs.filter(m => m.author === 'guest' && !m.read).length
  }

  // Scroll automático al fondo del chat
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [selectedMessages])

  // Seleccionar primer usuario automáticamente si no hay uno activo
  useEffect(() => {
    if (!selectedUser && allClientIds.length > 0) {
      setSelectedUser(allClientIds[0])
    }
  }, [allClientIds, selectedUser])

  function handleSendReply() {
    if (!reply.trim() || !selectedUser) return
    sendAdminReply(selectedUser, reply.trim())
    setReply('')
  }

  function formatId(id) {
    // Muestra solo los primeros 8 caracteres del UUID para compactar
    return id ? `#${id.slice(0, 8)}` : '---'
  }

  function isUserOnline(clientId) {
    return activeUsers.some(u => u.clientId === clientId)
  }

  function handleWhatsApp() {
    window.open('https://wa.me/573202967582', '_blank')
  }

  const pendingTurns = turns.filter(t => t.status === 'pending')
  const approvedTurns = turns.filter(t => t.status === 'approved')
  const doneTurns = turns.filter(t => t.status === 'done')

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Panel de Administración</h1>
          <p className={styles.headerSub}>Club Deportivo Pin Cinco</p>
        </div>
        <div className={styles.headerActions}>
          <span className={isConnected ? styles.wsOnline : styles.wsOffline}>
            <span className={styles.wsStatusDot} />
            {isConnected ? 'WS Conectado' : 'WS Desconectado'}
          </span>
          <button className={styles.backBtn} onClick={() => navigate('/')} type="button">
            <ArrowLeft size={16} /> Inicio
          </button>
          <button className={styles.logoutBtn} onClick={onLogout} type="button">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </header>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'chat' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('chat')}
          type="button"
        >
          <MessageCircle size={18} /> Chat con Usuarios
          {allClientIds.reduce((acc, id) => acc + unreadCount(id), 0) > 0 && (
            <span className={styles.tabBadge}>
              {allClientIds.reduce((acc, id) => acc + unreadCount(id), 0)}
            </span>
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'turns' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('turns')}
          type="button"
        >
          <CalendarDays size={18} /> Gestión de Turnos
          {pendingTurns.length > 0 && (
            <span className={styles.tabBadgeTurns}>{pendingTurns.length}</span>
          )}
        </button>
        <button className={styles.tabWa} onClick={handleWhatsApp} type="button">
          <Phone size={18} /> WhatsApp Business
        </button>
      </div>

      <main className={styles.content}>

        {/* ══════════════════════════════════════════════════════════
            TAB: CHAT
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'chat' && (
          <div className={`${styles.chatLayout} ${mobileShowChat ? styles.mobileShowChat : ''}`}>

            {/* ── Columna izquierda: Lista de usuarios ── */}
            <aside className={styles.usersList}>
              <div className={styles.usersHeader}>
                <span className={styles.usersTitle}>Conversaciones</span>
                <span className={styles.usersCount}>{allClientIds.length}</span>
              </div>

              <div className={styles.usersContainer}>
                {allClientIds.length === 0 ? (
                  <p className={styles.noUsers}>Esperando usuarios...</p>
                ) : (
                  allClientIds.map(clientId => {
                    const unread = unreadCount(clientId)
                    const online = isUserOnline(clientId)
                    const lastMsg = (allMessages[clientId] || []).slice(-1)[0]

                    return (
                      <button
                        key={clientId}
                        className={`${styles.userItem} ${selectedUser === clientId ? styles.userItemActive : ''}`}
                        onClick={() => {
                          setSelectedUser(clientId)
                          setMobileShowChat(true)
                        }}
                        type="button"
                      >
                        <div className={styles.userAvatar}>
                          <User size={20} />
                          <span className={online ? styles.onlineDot : styles.offlineDot} />
                        </div>
                        <div className={styles.userInfo}>
                          <span className={styles.userId}>{formatId(clientId)}</span>
                          {lastMsg && (
                            <span className={styles.lastMsg}>
                              {lastMsg.author === 'club' ? '→ ' : ''}
                              {lastMsg.text.slice(0, 30)}{lastMsg.text.length > 30 ? '…' : ''}
                            </span>
                          )}
                        </div>
                        {unread > 0 && (
                          <span className={styles.unreadBadge}>{unread}</span>
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </aside>

            {/* ── Área derecha: Ventana de conversación ── */}
            <section className={styles.chatArea}>
              {!selectedUser ? (
                <div className={styles.chatPlaceholder}>
                  <MessageCircle size={48} className={styles.chatPlaceholderIcon} />
                  <p>Selecciona una conversación para comenzar</p>
                </div>
              ) : (
                <>
                  <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderInfo}>
                      <button
                        className={styles.mobileBackBtn}
                        onClick={() => setMobileShowChat(false)}
                        type="button"
                      >
                        <ArrowLeft size={16} /> Volver
                      </button>
                      <div className={styles.chatHeaderUserDetails}>
                        <span>Conversación con: <strong>{formatId(selectedUser)}</strong></span>
                        <span className={isUserOnline(selectedUser) ? styles.statusOnline : styles.statusOffline}>
                          {isUserOnline(selectedUser) ? '● En línea' : '○ Desconectado'}
                        </span>
                      </div>
                    </div>
                    <span className={styles.msgCount}>
                      {selectedMessages.length} mensaje(s)
                    </span>
                  </div>

                  <div className={styles.chatBox} ref={chatBoxRef}>
                    {selectedMessages.length === 0 ? (
                      <p className={styles.emptyChat}>Sin mensajes aún.</p>
                    ) : (
                      selectedMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`${styles.message} ${msg.author === 'guest' ? styles.messageGuest : styles.messageClub}`}
                        >
                          <span className={styles.messageAuthor}>
                            {msg.author === 'guest' ? <User size={14}/> : <Bot size={14}/>}
                            {msg.author === 'guest' ? ' Usuario' : ' Club'}
                            {' · '}
                            <span className={styles.messageTime}>
                              {new Date(msg.timestamp).toLocaleString('es-CO', {
                                hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short'
                              })}
                            </span>
                          </span>
                          <p className={styles.messageText}>{msg.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={styles.replyBox}>
                    <label htmlFor="admin-reply-input" className={styles.srOnly}>
                      Responder a usuario
                    </label>
                    <input
                      id="admin-reply-input"
                      className={styles.replyInput}
                      type="text"
                      placeholder={`Responder a ${formatId(selectedUser)}...`}
                      value={reply}
                      onChange={e => {
                        const val = e.target.value
                        // Filtrar caracteres de inyección de código (<, >, /, \)
                        const sanitized = val.replace(/[<>\/\\]/g, '')
                        if (sanitized.length <= 400) {
                          setReply(sanitized)
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { e.preventDefault(); handleSendReply() }
                      }}
                    />
                    <button className={styles.replyBtn} onClick={handleSendReply} type="button">
                      Enviar <SendHorizontal size={16} />
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB: GESTIÓN DE TURNOS
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'turns' && (
          <div className={styles.turnsSection}>

            {/* Turnos Pendientes */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                Pendientes
                {pendingTurns.length > 0 && (
                  <span className={styles.pendingBadge}>{pendingTurns.length}</span>
                )}
              </h2>

              {pendingTurns.length === 0 ? (
                <p className={styles.emptyTurns}>No hay turnos pendientes.</p>
              ) : (
                <div className={styles.turnsList}>
                  {pendingTurns.map(turn => (
                    <div key={turn.id} className={styles.turnCard}>
                      <div className={styles.turnInfo}>
                        <div className={styles.turnService}>
                          {turn.service}
                        </div>
                        <div className={styles.turnDetails}>
                          <span><CalendarDays size={14} /> {turn.date}</span>
                          <span><Clock size={14} /> {turn.schedule}</span>
                          <span><User size={14} /> {turn.name}</span>
                          <span><Phone size={14} /> {turn.phone}</span>
                          <span><Users size={14} /> {turn.people} persona(s)</span>
                          <span className={styles.turnId}>ID: {formatId(turn.clientId)}</span>
                        </div>
                      </div>
                      <div className={styles.turnActions}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => approveTurn(turn.id)}
                          type="button"
                        >
                          <Star size={16} /> Aprobar
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            if (confirm('¿Eliminar este turno?')) deleteTurn(turn.id)
                          }}
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Turnos Aprobados y Bloqueados */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                Aprobados (Bloqueados)
                {approvedTurns.length > 0 && (
                  <span className={styles.approvedBadge}>{approvedTurns.length}</span>
                )}
              </h2>

              {approvedTurns.length === 0 ? (
                <p className={styles.emptyTurns}>No hay turnos aprobados.</p>
              ) : (
                <div className={styles.turnsList}>
                  {approvedTurns.map(turn => (
                    <div key={turn.id} className={`${styles.turnCard} ${styles.turnCardApproved}`}>
                      <div className={styles.turnInfo}>
                        <div className={styles.turnService}>
                          {turn.service}
                          <span className={styles.approvedPill}>Aprobado</span>
                        </div>
                        <div className={styles.turnDetails}>
                          <span><CalendarDays size={14} /> {turn.date}</span>
                          <span><User size={14} /> {turn.name}</span>
                          <span className={styles.turnId}>ID: {formatId(turn.clientId)}</span>
                        </div>
                      </div>
                      <div className={styles.turnActions}>
                        <button
                          className={styles.doneBtn}
                          onClick={() => markTurnDone(turn.id)}
                          type="button"
                        >
                          <Check size={16} /> Finalizar
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            if (confirm('¿Eliminar este turno?')) deleteTurn(turn.id)
                          }}
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Turnos Finalizados */}
            {doneTurns.length > 0 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Finalizados</h2>
                <div className={styles.turnsList}>
                  {doneTurns.map(turn => (
                    <div key={turn.id} className={`${styles.turnCard} ${styles.turnCardDone}`}>
                      <div className={styles.turnInfo}>
                        <div className={styles.turnService}>
                          {turn.service}
                          <span className={styles.donePill}>Finalizado</span>
                        </div>
                      </div>
                      <div className={styles.turnActions}>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            if (confirm('¿Eliminar este turno?')) deleteTurn(turn.id)
                          }}
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}

// ─── Admin wrapper — maneja login y provee el contexto WS de admin ────────────
const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'pincinco2024'

function Admin() {
  const navigate = useNavigate()
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
    navigate('/')
  }

  // ── Login ──
  if (!isAdmin) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}><Lock size={32} /> Administrador</h1>
          <p className={styles.loginSubtitle}>Club Deportivo Pin Cinco</p>

          <div className={styles.field}>
            <label htmlFor="admin-username" className={styles.fieldLabel}>Usuario</label>
            <input
              id="admin-username"
              className={styles.input}
              type="text"
              value={username}
              onChange={e => {
                const val = e.target.value.replace(/[<>\/\\]/g, '')
                if (val.length <= 30) {
                  setUsername(val)
                }
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.fieldLabel}>Contraseña</label>
            <input
              id="admin-password"
              className={styles.input}
              type="password"
              value={password}
              onChange={e => {
                const val = e.target.value.replace(/[<>\/\\]/g, '')
                if (val.length <= 30) {
                  setPassword(val)
                }
              }}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.loginBtn} onClick={handleLogin} type="button">
            Iniciar sesión
          </button>

          <button className={styles.backBtn} onClick={() => navigate('/')} type="button">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <ChatProvider role="admin">
      <AdminPanel onLogout={handleLogout} />
    </ChatProvider>
  )
}

export default Admin