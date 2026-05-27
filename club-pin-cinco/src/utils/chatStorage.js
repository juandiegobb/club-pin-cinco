const CHAT_KEY = 'pincinco_chat_messages'

export function getMessages() {
  try {
    const raw = localStorage.getItem(CHAT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMessage(author, text) {
  const messages = getMessages()
  const newMessage = {
    id: Date.now(),
    author,
    text,
    timestamp: new Date().toISOString(),
    read: false,
  }
  messages.push(newMessage)
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages))
  // Dispara evento local
  window.dispatchEvent(new Event('chat-updated'))
  // Dispara evento entre pestañas — esto es lo que faltaba
  window.dispatchEvent(new StorageEvent('storage', {
    key: CHAT_KEY,
    newValue: JSON.stringify(messages),
  }))
  return newMessage
}

export function markAllRead() {
  const messages = getMessages()
  const updated = messages.map(m => ({ ...m, read: true }))
  localStorage.setItem(CHAT_KEY, JSON.stringify(updated))
}

export function unreadCount() {
  return getMessages().filter(m => m.author === 'guest' && !m.read).length
}

export function clearMessages() {
  localStorage.removeItem(CHAT_KEY)
  window.dispatchEvent(new Event('chat-updated'))
  window.dispatchEvent(new StorageEvent('storage', {
    key: CHAT_KEY,
    newValue: null,
  }))
}