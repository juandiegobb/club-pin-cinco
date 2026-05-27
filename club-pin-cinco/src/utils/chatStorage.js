// Utilidad para guardar y leer mensajes del chat en localStorage
// Funciona como "base de datos" local para la expo

const CHAT_KEY = 'pincinco_chat_messages'

// Obtener todos los mensajes
export function getMessages() {
  try {
    const raw = localStorage.getItem(CHAT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Guardar un mensaje nuevo
export function saveMessage(author, text) {
  const messages = getMessages()
  const newMessage = {
    id: Date.now(),
    author, // 'club' o 'guest'
    text,
    timestamp: new Date().toISOString(),
    read: false,
  }
  messages.push(newMessage)
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages))
  // Dispara evento para que otros componentes se actualicen
  window.dispatchEvent(new Event('chat-updated'))
  return newMessage
}

// Marcar todos como leídos
export function markAllRead() {
  const messages = getMessages()
  const updated = messages.map(m => ({ ...m, read: true }))
  localStorage.setItem(CHAT_KEY, JSON.stringify(updated))
}

// Contar mensajes no leídos del usuario
export function unreadCount() {
  return getMessages().filter(m => m.author === 'guest' && !m.read).length
}

// Borrar todos los mensajes
export function clearMessages() {
  localStorage.removeItem(CHAT_KEY)
  window.dispatchEvent(new Event('chat-updated'))
}