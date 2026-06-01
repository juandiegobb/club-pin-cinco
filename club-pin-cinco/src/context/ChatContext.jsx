/**
 * ChatContext.jsx
 * Contexto global para WebSocket bidireccional.
 *
 * Patrón inspirado en TDM_Nebula_Gaming, adaptado para React con:
 *  - UUID persistente en localStorage (sin login)
 *  - Reconexión automática con backoff exponencial
 *  - Separación de mensajes propios y de la conversación activa en el admin
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const getWsUrl = () => {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL
  }
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'ws://localhost:3001'
  }
  return 'wss://club-pin-cinco.onrender.com'
}
const WS_URL = getWsUrl()

// Clave para el UUID del cliente en localStorage
const CLIENT_ID_KEY = 'pincinco_client_id'

/** Genera o recupera el UUID persistente del cliente */
function getOrCreateClientId() {
  let id = localStorage.getItem(CLIENT_ID_KEY)
  if (!id) {
    // UUID v4 manual (sin dependencia, compatible con todos los navegadores)
    id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    localStorage.setItem(CLIENT_ID_KEY, id)
  }
  return id
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const ChatContext = createContext(null)

export function ChatProvider({ children, role = 'guest' }) {
  const clientId = useRef(role === 'guest' ? getOrCreateClientId() : 'admin')
  const wsRef = useRef(null)
  const reconnectTimer = useRef(null)
  const reconnectDelay = useRef(1000)

  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])           // mensajes propios (guest) o del usuario seleccionado (admin)
  const [allMessages, setAllMessages] = useState({})     // { [clientId]: Message[] } — solo admin
  const [activeUsers, setActiveUsers] = useState([])     // lista de usuarios conectados — solo admin
  const [turns, setTurns] = useState([])                 // turnos — solo admin
  const [turnNotification, setTurnNotification] = useState(() => {
    try {
      const saved = localStorage.getItem('pincinco_turn_notification')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }) // Notificación visual de turno apartado
  const [isAdminOnline, setIsAdminOnline] = useState(false)

  const updateTurnNotification = useCallback((value) => {
    setTurnNotification(value)
    if (value) {
      localStorage.setItem('pincinco_turn_notification', JSON.stringify(value))
    } else {
      localStorage.removeItem('pincinco_turn_notification')
    }
  }, [])

  // ── Conectar al WebSocket ──────────────────────────────────────────────────
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      reconnectDelay.current = 1000 // reset backoff
      console.log('[Chat] 🟢 Conectado al servidor WS')

      // Registro inmediato al conectar (equivale al 'login' de TDM_Nebula_Gaming)
      ws.send(JSON.stringify({
        type: 'register',
        clientId: clientId.current,
        role,
      }))
    }

    ws.onmessage = (event) => {
      let data
      try { data = JSON.parse(event.data) } catch { return }

      switch (data.type) {
        case 'registered':
          console.log(`[Chat] ✅ Registrado como ${data.role}: ${data.clientId}`)
          break

        case 'history':
          // Historial de mensajes propios del cliente al reconectar
          setMessages(data.messages || [])
          break

        case 'all_messages':
          // Solo admin: todos los mensajes organizados por clientId
          setAllMessages(data.messages || {})
          break

        case 'chat': {
          const msg = data.message
          if (!msg) break

          if (role === 'guest') {
            setMessages(prev => {
              // Evitar duplicados por id
              if (prev.some(m => m.id === msg.id)) return prev
              return [...prev, msg]
            })
          } else {
            // Admin: actualizar el mapa allMessages
            setAllMessages(prev => {
              const clientMsgs = prev[msg.clientId] || []
              if (clientMsgs.some(m => m.id === msg.id)) return prev
              return { ...prev, [msg.clientId]: [...clientMsgs, msg] }
            })
          }
          break
        }

        case 'users_list':
          setActiveUsers(data.users || [])
          break

        case 'turns_list':
          setTurns(data.turns || [])
          break

        case 'turn_confirmed':
          console.log('[Chat] Turno confirmado:', data.turn)
          updateTurnNotification({
            id: `notif_${Date.now()}`,
            service: data.turn.service,
            date: data.turn.date,
            schedule: data.turn.schedule,
            name: data.turn.name,
            people: data.turn.people
          })
          break

        case 'admin_status':
          setIsAdminOnline(data.online)
          break

        case 'error':
          console.error('[Chat] Error del servidor:', data.message)
          break

        default:
          break
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log(`[Chat] 🔴 Desconectado. Reintentando en ${reconnectDelay.current}ms...`)

      // Reconexión automática con backoff exponencial (máx 30s)
      reconnectTimer.current = setTimeout(() => {
        reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000)
        connect()
      }, reconnectDelay.current)
    }

    ws.onerror = (err) => {
      console.warn('[Chat] WebSocket error:', err)
    }
  }, [role])

  useEffect(() => {
    connect()
    return () => {
      clearTimeout(reconnectTimer.current)
      wsRef.current?.close()
    }
  }, [connect])

  // ── Acciones públicas ──────────────────────────────────────────────────────
  const sendMessage = useCallback((text) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({
      type: 'chat',
      clientId: clientId.current,
      text,
    }))
  }, [])

  const sendAdminReply = useCallback((targetClientId, text) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({
      type: 'admin_reply',
      targetClientId,
      text,
    }))
  }, [])

  const sendTurnRequest = useCallback((turnData) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({
      type: 'turn_request',
      clientId: clientId.current,
      ...turnData,
    }))
  }, [])

  const markTurnDone = useCallback((turnId) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'turn_done', turnId }))
  }, [])

  const approveTurn = useCallback((turnId) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'turn_approve', turnId }))
  }, [])

  const deleteTurn = useCallback((turnId) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'turn_delete', turnId }))
  }, [])

  return (
    <ChatContext.Provider value={{
      clientId: clientId.current,
      isConnected,
      messages,          // mensajes del guest actual
      allMessages,       // { clientId: [] } solo admin
      activeUsers,       // usuarios conectados — admin
      turns,             // turnos — admin
      turnNotification,  // notificación de turno apartado
      setTurnNotification: updateTurnNotification, // para limpiar la notificación
      isAdminOnline,     // estado de conexion del admin
      sendMessage,
      sendAdminReply,
      sendTurnRequest,
      approveTurn,
      markTurnDone,
      deleteTurn,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext debe usarse dentro de <ChatProvider>')
  return ctx
}
