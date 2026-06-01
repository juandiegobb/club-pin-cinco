import { useState, useEffect, useRef } from 'react'
import { X, SendHorizontal } from 'lucide-react'
import ChatBubble from '../ChatBubble/ChatBubble'
import { useLanguage } from '../../../context/LanguageContext'
import { useChat } from '../../../hooks/useChat'
import { getMessages, saveMessage } from '../../../utils/chatStorage'
import logo from '../../../assets/home/logo-pincinco.jpeg'
import styles from './ChatWindow.module.css'

// ─── Respuestas FAQ (fallback cuando WS no está disponible) ──────────────────
const FAQ = {
  es: [
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
  ],
  en: [
    { keywords: ['hour', 'schedule', 'open', 'close', 'time', 'when'], answer: '🕐 Our opening hours are:\n• Monday to Thursday: 11:00 a.m - 11:00 p.m\n• Friday: 11:00 a.m - 1:00 a.m\n• Saturdays: 2:30 p.m - 2:00 a.m\n• Sundays: 3:00 p.m - 10:00 p.m' },
    { keywords: ['price', 'cost', 'rate', 'how much', 'charge'], answer: '💰 Rates vary depending on the service and duration. Call us at +57 320 2967582.' },
    { keywords: ['reserve', 'reservation', 'book', 'booking', 'appointment', 'turn'], answer: '📅 You can book your turn on our reservation page or call us at +57 320 2967582.' },
    { keywords: ['location', 'where', 'address', 'find', 'located'], answer: '📍 We are at: Transversal 0 Este 66a 18, Muscas CC Río, Tunja, Boyacá.' },
    { keywords: ['billiard', 'billiards', 'pool', 'table'], answer: '🎱 Yes, we have billiard tables. You can book your turn on our website!' },
    { keywords: ['bowling', 'bowls', 'pins', 'lane'], answer: '🎳 We have bowling lanes for the whole family. Come and enjoy the experience!' },
    { keywords: ['contact', 'phone', 'call', 'number', 'cellphone'], answer: '📞 Contact us at +57 320 2967582 or +57 312 2956363.' },
    { keywords: ['service', 'services', 'offer', 'have', 'games', 'activities'], answer: '🎮 We offer:\n• 🎳 Bowling\n• 🎱 Billiards\n\nBook your turn on our website!' },
    { keywords: ['hello', 'hi', 'morning', 'afternoon', 'hey', 'greetings'], answer: '👋 Hello! Welcome to Club Deportivo Pin Cinco. How can we help you?' },
    { keywords: ['thanks', 'thank you', 'great', 'perfect', 'ok', 'okay'], answer: '😊 You are welcome! We are here to help.' },
  ]
}

const chatTranslations = {
  es: {
    title: 'Club Pin Cinco',
    online: 'En línea — chat en vivo',
    bot: 'Respuestas automáticas (Bot)',
    autoReplies: 'Respuestas automáticas',
    suggestions: ['Horarios', 'Precios', 'Reservas', 'Ubicación', 'Servicios'],
    placeholderWs: 'Escribe tu mensaje al equipo...',
    placeholderFaq: 'Escribe tu pregunta...',
    initialGreeting: '👋 Hola, somos Club Deportivo Pin Cinco. ¿En qué te podemos ayudar?',
    ariaLabel: 'Chat de contacto',
  },
  en: {
    title: 'Club Pin Cinco',
    online: 'Online — live chat',
    bot: 'Automated replies (Bot)',
    autoReplies: 'Automated replies',
    suggestions: ['Hours', 'Prices', 'Reservations', 'Location', 'Services'],
    placeholderWs: 'Type your message to the team...',
    placeholderFaq: 'Type your question...',
    initialGreeting: '👋 Hello, we are Club Deportivo Pin Cinco. How can we help you?',
    ariaLabel: 'Contact Chat',
  }
}

function getAutoReply(text, lang) {
  const lower = text.toLowerCase()
  const list = FAQ[lang] || FAQ.es
  const match = list.find(faq => faq.keywords.some(k => lower.includes(k)))
  const defaultAnswer = lang === 'es'
    ? '🤔 No entendí tu pregunta. Puedes preguntarme sobre horarios, precios, reservas, ubicación o contacto.'
    : '🤔 I did not understand your question. You can ask me about opening hours, prices, reservations, location, or contact info.'
  return match ? match.answer : defaultAnswer
}

function ChatWindow({ onClose }) {
  const { language } = useLanguage()
  const tChat = chatTranslations[language] || chatTranslations.es

  const [message, setMessage] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const bottomRef = useRef(null)
  const windowRef = useRef(null) // Para Click Outside

  // WebSocket — mensajes en tiempo real y estado del admin
  const { messages: wsMessages, sendMessage: wsSend, isConnected, isAdminOnline } = useChat()

  // Manejar Click Outside para cerrar la ventana del chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        // Excluir el botón de cerrar y el botón flotante que abre el chat para evitar doble trigger
        const isClickingCloseBtn = event.target.closest(`.${styles.closeBtn}`)
        const isClickingFloatBtn = event.target.closest('[class*="FloatingChat_btn"]')
        
        if (!isClickingCloseBtn && !isClickingFloatBtn) {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Mensajes localStorage (fallback / historial previo a WS)
  const [localMessages, setLocalMessages] = useState(() => {
    const saved = getMessages()
    if (saved.length === 0) {
      saveMessage('club', tChat.initialGreeting)
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
        saveMessage('club', getAutoReply(userMsg, language))
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
        saveMessage('club', getAutoReply(text, language))
        setLocalMessages(getMessages())
      }, 600)
    }
  }

  // Adapta el formato del mensaje (WS o localStorage) para ChatBubble
  function getAuthor(msg) {
    return msg.author || (msg.from === 'club' ? 'club' : 'guest')
  }

  return (
    <aside className={styles.window} ref={windowRef} aria-label={tChat.ariaLabel}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo Pin Cinco" className={styles.logoImg} />
          </div>
          <div>
            <strong className={styles.title}>{tChat.title}</strong>
            <p className={styles.subtitle}>
              {isConnected
                ? isAdminOnline
                  ? <><span className={styles.dotOnline} />{tChat.online}</>
                  : <><span className={styles.dotBot} />{tChat.bot}</>
                : <><span className={styles.dotOffline} />{tChat.autoReplies}</>
              }
            </p>
          </div>
        </div>
        <button
          className={styles.closeBtn}
          type="button"
          onClick={onClose}
          aria-label={language === 'es' ? 'Cerrar chat' : 'Close chat'}
        >
          <X size={20} />
        </button>
      </div>

      <div className={styles.suggestions}>
        {tChat.suggestions.map((s) => (
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
          placeholder={isConnected ? tChat.placeholderWs : tChat.placeholderFaq}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <button
          className={styles.sendBtn}
          type="button"
          onClick={handleSubmit}
          aria-label={language === 'es' ? 'Enviar mensaje' : 'Send message'}
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </aside>
  )
}

export default ChatWindow