import { useState, useEffect, useRef } from 'react'
import ChatBubble from '../ChatBubble/ChatBubble'
import { useChat } from '../../../hooks/useChat'
import { getMessages, saveMessage } from '../../../utils/chatStorage'
import styles from './ChatWindow.module.css'

// ─── Respuestas FAQ (fallback cuando WS no está disponible) ──────────────────
const FAQ = [
  { keywords: ['horario', 'hora', 'abierto', 'abren', 'cierran', 'atienden'], answer: '🕐 Nuestros horarios son:\n• Lunes a jueves: 11:00 a.m - 11:00 p.m\n• Viernes: 11:00 a.m - 1:00 a.m\n• Sábados: 2:30 p.m - 2:00 a.m\n• Domingos: 3:00 p.m - 10:00 p.m' },
  { keywords: ['precio', 'costo', 'vale', 'cobran', 'tarifa', 'cuanto'], answer: '💰 Los precios varían según el servicio y el tiempo. Llámanos al 320 2967582.' },
  { keywords: ['reserva', 'turno', 'apartar', 'reservar', 'cita'], answer: '📅 Puedes apartar tu turno en nuestra página de reservas o llamarnos al 320 2967582.' },
  { keywords: ['ubicacion', 'ubicación', 'donde', 'dirección', 'direccion', 'queda'], answer: '📍 Estamos en: Transversal 0 Este 66a 18, Muscas Centro Comercial Río, Tunja, Boyacá.' },
  { keywords: ['billar', 'billiard', 'mesa'], answer: '🎱 Sí, contamos con mesas de billar. Puedes reservar tu turno en nuestra página.' },
  { keywords: ['bolos', 'bowling', 'pinos', 'pista'], answer: '🎳 Contamos con pistas de bolos para toda la familia. ¡Ven y vive la experiencia!' },
  { keywords: ['contacto', 'telefono', 'teléfono', 'llamar', 'numero', 'número', 'celular'], answer: '📞 Contáctanos al 320 2967582 o al 312 2956363.' },
  { keywords: ['servicio', 'servicios', 'ofrecen', 'tienen', 'juegos', 'actividades'], answer: '🎮 Ofrecemos:\n• 🎳 Bolos\n• 🎱 Billar\n\n¡Reserva tu turno en nuestra página!' },
  { keywords: ['hola', 'buenos', 'buenas', 'saludos', 'hey'], answer: '👋 ¡Hola! Bienvenido al Club Deportivo Pin Cinco. ¿En qué te podemos ayudar?' },
  { keywords: ['gracias', 'listo', 'perfecto', 'ok', 'okay'], answer: '😊 ¡Con gusto! Estamos para servirte.' },
]

const DEFAULT_ANSWER = '🤔 No entendí tu pregunta. Puedes preguntarme sobre horarios, precios, reservas, ubicación o contacto.'

function getAutoReply(text) {
  const lower = text.toLowerCase()
  const match = FAQ.find(faq => faq.keywords.some(k => lower.includes(k)))
  return match ? match.answer : DEFAULT_ANSWER
}

function ChatWindow({ onClose }) {
  const [message, setMessage] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const bottomRef = useRef(null)

  // WebSocket — mensajes en tiempo real
  const { messages: wsMessages, sendMessage: wsSend, isConnected } = useChat()

  // Mensajes localStorage (fallback / historial previo a WS)
  const [localMessages, setLocalMessages] = useState(() => {
    const saved = getMessages()
    if (saved.length === 0) {
      saveMessage('club', '👋 Hola, somos Club Deportivo Pin Cinco. ¿En qué te podemos ayudar?')
      return getMessages()
    }
    return saved
  })

  // Unifica: si el WS está activo y tiene mensajes, úsalos; si no, usa localStorage
  const displayMessages = isConnected && wsMessages.length > 0 ? wsMessages : localMessages

  // Sincronizar localStorage cuando llegan mensajes WS (para mantener historial local)
  useEffect(() => {
    if (!isConnected) return
    function handleStorage(e) {
      if (e.key === 'pincinco_chat_messages') setLocalMessages(getMessages())
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('chat-updated', () => setLocalMessages(getMessages()))
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('chat-updated', () => setLocalMessages(getMessages()))
    }
  }, [isConnected])

  // Scroll automático
  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [displayMessages, autoScroll])

  function handleSubmit() {
    if (!message.trim()) return
    const userMsg = message.trim()
    setMessage('')
    setAutoScroll(true)

    if (isConnected) {
      // Modo WebSocket: enviar al servidor, el admin responderá
      wsSend(userMsg)
    } else {
      // Modo fallback (sin servidor): respuesta automática FAQ + localStorage
      saveMessage('guest', userMsg)
      setLocalMessages(getMessages())
      setTimeout(() => {
        saveMessage('club', getAutoReply(userMsg))
        setLocalMessages(getMessages())
      }, 600)
    }
  }

  function handleSuggestion(text) {
    setAutoScroll(true)
    if (isConnected) {
      wsSend(text)
    } else {
      saveMessage('guest', text)
      setLocalMessages(getMessages())
      setTimeout(() => {
        saveMessage('club', getAutoReply(text))
        setLocalMessages(getMessages())
      }, 600)
    }
  }

  // Adapta el formato del mensaje (WS o localStorage) para ChatBubble
  function getAuthor(msg) {
    return msg.author || (msg.from === 'club' ? 'club' : 'guest')
  }

  return (
    <aside className={styles.window} aria-label="Chat de contacto">
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.avatar}>🎳</span>
          <div>
            <strong className={styles.title}>Club Pin Cinco</strong>
            <p className={styles.subtitle}>
              {isConnected
                ? <><span className={styles.dotOnline} />En línea — chat en vivo</>
                : <><span className={styles.dotOffline} />Respuestas automáticas</>
              }
            </p>
          </div>
        </div>
        <button className={styles.closeBtn} type="button" onClick={onClose}>×</button>
      </div>

      <div className={styles.suggestions}>
        {['Horarios', 'Precios', 'Reservas', 'Ubicación', 'Servicios'].map((s) => (
          <button key={s} className={styles.suggestion} type="button" onClick={() => handleSuggestion(s)}>
            {s}
          </button>
        ))}
      </div>

      <div
        className={styles.messages}
        onScroll={(e) => {
          const el = e.currentTarget
          const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50
          setAutoScroll(isAtBottom)
        }}
      >
        {displayMessages.map((item) => (
          <ChatBubble key={item.id} author={getAuthor(item)}>
            {item.text}
          </ChatBubble>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder={isConnected ? 'Escribe tu mensaje al equipo...' : 'Escribe tu pregunta...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <button className={styles.sendBtn} type="button" onClick={handleSubmit}>▶</button>
      </div>
    </aside>
  )
}

export default ChatWindow