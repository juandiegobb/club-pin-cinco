import { useState, useEffect, useRef } from 'react'
import ChatBubble from '../ChatBubble/ChatBubble'
import styles from './ChatWindow.module.css'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Respuestas automáticas según palabras clave
// Agrega o edita las preguntas aquí fácilmente
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FAQ = [
  {
    keywords: ['horario', 'hora', 'abierto', 'abren', 'cierran', 'atienden'],
    answer: '🕐 Nuestros horarios son:\n• Lunes a jueves: 11:00 a.m - 11:00 p.m\n• Viernes: 11:00 a.m - 1:00 a.m\n• Sábados: 2:30 p.m - 2:00 a.m\n• Domingos: 3:00 p.m - 10:00 p.m',
  },
  {
    keywords: ['precio', 'costo', 'vale', 'cobran', 'tarifa', 'cuanto'],
    answer: '💰 Los precios varían según el servicio y el tiempo. Te recomendamos llamarnos al 320 2967582 para más información.',
  },
  {
    keywords: ['reserva', 'turno', 'apartar', 'reservar', 'cita'],
    answer: '📅 Puedes apartar tu turno directamente en nuestra página de reservas o llamarnos al 320 2967582.',
  },
  {
    keywords: ['ubicacion', 'ubicación', 'donde', 'dirección', 'direccion', 'queda'],
    answer: '📍 Estamos en: Transversal 0 Este 66a 18, Muscas Centro Comercial Río, Tunja, Boyacá.',
  },
  {
    keywords: ['billar', 'billiard', 'mesa'],
    answer: '🎱 Sí, contamos con mesas de billar disponibles. Puedes reservar tu turno en nuestra página.',
  },
  {
    keywords: ['bolos', 'bowling', 'pinos', 'pista'],
    answer: '🎳 Contamos con pistas de bolos para toda la familia. ¡Ven y vive la experiencia!',
  },
  {
    keywords: ['contacto', 'telefono', 'teléfono', 'llamar', 'numero', 'número', 'celular'],
    answer: '📞 Puedes contactarnos al 320 2967582 o al 312 2956363.',
  },
  {
    keywords: ['hola', 'buenos', 'buenas', 'saludos', 'hey'],
    answer: '👋 ¡Hola! Bienvenido al Club Deportivo Pin Cinco. ¿En qué te podemos ayudar?',
  },
  {
    keywords: ['gracias', 'listo', 'perfecto', 'ok', 'okay'],
    answer: '😊 ¡Con gusto! Estamos para servirte. ¿Hay algo más en lo que te podamos ayudar?',
  },
  {
  keywords: ['servicio', 'servicios', 'ofrecen', 'tienen', 'juegos', 'actividades'],
  answer: '🎮 Ofrecemos dos servicios principales:\n• 🎳 Bolos — Pistas profesionales para jugar con amigos y familia\n• 🎱 Billar — Mesas disponibles para todos los niveles\n\n¡Puedes reservar tu turno directamente en nuestra página!',
  },
]

// Mensaje por defecto si no se encuentra respuesta
const DEFAULT_ANSWER = '🤔 No entendí tu pregunta. Puedes preguntarme sobre horarios, precios, reservas, ubicación o contacto. También puedes llamarnos al 320 2967582.'

// Busca la respuesta según las palabras clave del mensaje
function getAutoReply(text) {
  const lower = text.toLowerCase()
  const match = FAQ.find((faq) =>
    faq.keywords.some((keyword) => lower.includes(keyword))
  )
  return match ? match.answer : DEFAULT_ANSWER
}

function ChatWindow({ onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, author: 'club', text: '👋 Hola, somos Club Deportivo Pin Cinco. ¿En qué te podemos ayudar? Puedes preguntarme sobre horarios, precios, reservas o ubicación.' },
  ])

  // Referencia para hacer scroll automático al último mensaje
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSubmit() {
    if (!message.trim()) return

    const userMessage = message.trim()

    // Agrega el mensaje del usuario
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), author: 'guest', text: userMessage },
    ])
    setMessage('')

    // Respuesta automática con pequeño delay para que se sienta natural
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, author: 'club', text: getAutoReply(userMessage) },
      ])
    }, 600)
  }

  return (
    <aside className={styles.window} aria-label="Chat de contacto">

      {/* Encabezado */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.avatar}>🎳</span>
          <div>
            <strong className={styles.title}>Club Pin Cinco</strong>
            <p className={styles.subtitle}>Respuestas automáticas</p>
          </div>
        </div>
        <button className={styles.closeBtn} type="button" onClick={onClose} aria-label="Cerrar chat">
          ×
        </button>
      </div>

      {/* Sugerencias rápidas */}
      <div className={styles.suggestions}>
        {['Horarios', 'Precios', 'Reservas', 'Ubicación'].map((s) => (
          <button
            key={s}
            className={styles.suggestion}
            type="button"
            onClick={() => {
              setMessage(s)
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  { id: Date.now(), author: 'guest', text: s },
                ])
                setMessage('')
                setTimeout(() => {
                  setMessages((prev) => [
                    ...prev,
                    { id: Date.now() + 1, author: 'club', text: getAutoReply(s) },
                  ])
                }, 600)
              }, 0)
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mensajes */}
      <div className={styles.messages}>
        {messages.map((item) => (
          <ChatBubble key={item.id} author={item.author}>
            {item.text}
          </ChatBubble>
        ))}
        {/* Ancla para scroll automático */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className={styles.sendBtn}
          type="button"
          onClick={handleSubmit}
          aria-label="Enviar"
        >
          ▶
        </button>
      </div>

    </aside>
  )
}

export default ChatWindow