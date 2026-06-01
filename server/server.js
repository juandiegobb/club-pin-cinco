/**
 * server.js — Servidor WebSocket + Express para Club Pin Cinco
 *
 * Arquitectura adaptada de TDM_Nebula_Gaming/src/web/chat.js
 * Cambios clave:
 *  - Sin autenticación: se usa UUID generado en el frontend
 *  - Canal único por usuario (clientId) en lugar de grupos/canales
 *  - Soporte para rol "admin" que ve todos los usuarios
 *  - Persistencia en JSON para mensajes y turnos
 */

const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || process.env.WS_PORT || 3001

// ─── Credenciales de Administración (Seguridad en el Servidor) ───────────────
const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pincinco2024'

// ─── Rutas de persistencia ────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data')
const MESSAGES_PATH = path.join(DATA_DIR, 'messages.json')
const TURNS_PATH = path.join(DATA_DIR, 'turns.json')

// Crea el directorio data si no existe
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

// ─── Utilidades de persistencia JSON ─────────────────────────────────────────
function readJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf8')
    return raw.trim() ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// ─── Modelos: Mensajes ────────────────────────────────────────────────────────
// Estructura: { [clientId]: Message[] }
function getAllMessages() {
  return readJSON(MESSAGES_PATH, {})
}

function getMessagesByClient(clientId) {
  const all = getAllMessages()
  return all[clientId] || []
}

function addMessage(clientId, author, text) {
  const all = getAllMessages()
  if (!all[clientId]) all[clientId] = []
  const msg = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    clientId,
    author,   // 'guest' | 'club'
    text: sanitize(text),
    timestamp: new Date().toISOString(),
    read: false,
  }
  all[clientId].push(msg)
  writeJSON(MESSAGES_PATH, all)
  return msg
}

// ─── Modelos: Turnos ──────────────────────────────────────────────────────────
function getAllTurns() {
  return readJSON(TURNS_PATH, [])
}

function addTurn(turnData) {
  const turns = getAllTurns()
  const turn = {
    id: `turn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ...turnData,
    status: 'pending',  // 'pending' | 'done'
    createdAt: new Date().toISOString(),
  }
  turns.push(turn)
  writeJSON(TURNS_PATH, turns)
  return turn
}

function updateTurnStatus(turnId, status) {
  const turns = getAllTurns()
  const idx = turns.findIndex(t => t.id === turnId)
  if (idx === -1) return null
  turns[idx].status = status
  writeJSON(TURNS_PATH, turns)
  return turns[idx]
}

function deleteTurn(turnId) {
  const turns = getAllTurns()
  const filtered = turns.filter(t => t.id !== turnId)
  writeJSON(TURNS_PATH, filtered)
}

// ─── Sanitización ─────────────────────────────────────────────────────────────
function sanitize(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

// ─── Motor de Preguntas Frecuentes (FAQ) ──────────────────────────────────────
// Se responde automáticamente si no hay admin conectado.
// Si hay admin, el mensaje igual se reenvía pero el FAQ responde en paralelo
// para que el usuario no quede sin respuesta.
const FAQ = [
  {
    keywords: ['horario', 'hora', 'abierto', 'abren', 'cierran', 'atienden', 'abre', 'cierra'],
    answer: '🕐 Nuestros horarios son:\n• Lunes a jueves: 11:00 a.m - 11:00 p.m\n• Viernes: 11:00 a.m - 1:00 a.m\n• Sábados: 2:30 p.m - 2:00 a.m\n• Domingos: 3:00 p.m - 10:00 p.m',
  },
  {
    keywords: ['precio', 'costo', 'vale', 'cobran', 'tarifa', 'cuanto', 'cuánto', 'cuestan', 'valor'],
    answer: '💰 Los precios varían según el servicio y el tiempo. Llámanos al 320 2967582 para más información.',
  },
  {
    keywords: ['reserva', 'turno', 'apartar', 'reservar', 'cita', 'agendar', 'reservación'],
    answer: '📅 Puedes apartar tu turno en nuestra página de reservas (sección "Reserva") o llamarnos al 320 2967582.',
  },
  {
    keywords: ['ubicacion', 'ubicación', 'donde', 'dirección', 'direccion', 'queda', 'quedan', 'llegar', 'encontrar'],
    answer: '📍 Estamos en: Transversal 0 Este 66a 18, Muscas Centro Comercial Río, Tunja, Boyacá.',
  },
  {
    keywords: ['billar', 'billiard', 'mesa de billar', 'taco'],
    answer: '🎱 Sí, contamos con mesas de billar. ¡Puedes reservar tu turno directamente en nuestra página!',
  },
  {
    keywords: ['bolos', 'bowling', 'pinos', 'pista', 'bolo'],
    answer: '🎳 Contamos con pistas de bolos para toda la familia. ¡Ven y vive la experiencia! Reserva en nuestra página.',
  },
  {
    keywords: ['contacto', 'telefono', 'teléfono', 'llamar', 'numero', 'número', 'celular', 'whatsapp'],
    answer: '📞 Contáctanos al 320 2967582 o al 312 2956363. También puedes escribirnos por WhatsApp.',
  },
  {
    keywords: ['servicio', 'servicios', 'ofrecen', 'tienen', 'juegos', 'actividades', 'qué tienen', 'que tienen'],
    answer: '🎮 Ofrecemos:\n• 🎳 Bolos\n• 🎱 Billar\n\n¡Reserva tu turno en nuestra página para asegurar tu lugar!',
  },
  {
    keywords: ['hola', 'buenos', 'buenas', 'saludos', 'hey', 'ola', 'buen dia', 'buen día'],
    answer: '👋 ¡Hola! Bienvenido al Club Deportivo Pin Cinco. ¿En qué te podemos ayudar? Puedes preguntarme sobre horarios, precios, reservas o servicios.',
  },
  {
    keywords: ['gracias', 'listo', 'perfecto', 'ok', 'okay', 'entendido', 'dale'],
    answer: '😊 ¡Con gusto! Estamos para servirte. Si tienes más preguntas, no dudes en escribirnos.',
  },
  {
    keywords: ['estacionamiento', 'parqueo', 'parqueadero', 'parquear', 'carro', 'moto'],
    answer: '🚗 El Centro Comercial Río cuenta con parqueadero disponible para clientes.',
  },
  {
    keywords: ['niños', 'niño', 'familia', 'familiar', 'hijo', 'hijos', 'menores', 'edad'],
    answer: '👨‍👩‍👧‍👦 ¡Somos un espacio familiar! Nuestros servicios son aptos para todas las edades. Los menores deben estar acompañados por un adulto.',
  },
]

const FAQ_DEFAULT = '🤔 No entendí tu pregunta. Puedes preguntarme sobre:\n• 🕐 Horarios\n• 💰 Precios\n• 📅 Reservas\n• 📍 Ubicación\n• 🎮 Servicios\n• 📞 Contacto\n\nO escríbenos directamente y un agente te atenderá.'

// Delay simulado de escritura antes de responder (ms)
const FAQ_DELAY_MS = 800

function getFaqAnswer(text) {
  const lower = text.toLowerCase()
  const match = FAQ.find(faq => faq.keywords.some(k => lower.includes(k)))
  return match ? match.answer : null
}

// ─── Conexiones en memoria ────────────────────────────────────────────────────
// Patrón directo de TDM_Nebula_Gaming: array de objetos { clientId, role, ws }
let connections = []

function send(ws, payload) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload))
  }
}

function getConnection(clientId) {
  return connections.find(c => c.clientId === clientId && c.role === 'guest')
}

function broadcastToAdmins(payload) {
  connections
    .filter(c => c.role === 'admin')
    .forEach(c => send(c.ws, payload))
}

function broadcastUsersList() {
  // Lista de clientes activos (solo guests) para el panel admin
  const activeClients = connections
    .filter(c => c.role === 'guest')
    .map(c => ({ clientId: c.clientId, connectedAt: c.connectedAt }))

  broadcastToAdmins({ type: 'users_list', users: activeClients })
}

function broadcastAdminStatus() {
  const isAdminOnline = connections.some(c => c.role === 'admin')
  connections
    .filter(c => c.role === 'guest')
    .forEach(c => send(c.ws, { type: 'admin_status', online: isAdminOnline }))
}

function broadcastTurnsList() {
  const turns = getAllTurns()
  broadcastToAdmins({ type: 'turns_list', turns })
}

// ─── Express + HTTP ───────────────────────────────────────────────────────────
const app = express()
app.use(cors())
app.use(express.json())

// REST: inicio de sesión seguro para el panel de administración
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Autenticación exitosa.' })
  } else {
    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' })
  }
})

// REST: obtener turnos (por si el admin recarga la página)
app.get('/api/turns', (req, res) => {
  res.json(getAllTurns())
})

// REST: obtener mensajes de un cliente
app.get('/api/messages/:clientId', (req, res) => {
  res.json(getMessagesByClient(req.params.clientId))
})

const server = http.createServer(app)

// ─── WebSocket ────────────────────────────────────────────────────────────────
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  let currentConn = null

  ws.on('message', (raw) => {
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      send(ws, { type: 'error', message: 'Mensaje inválido.' })
      return
    }

    // ── REGISTRO ──────────────────────────────────────────────────────────────
    // Equivale al evento 'login' de TDM_Nebula_Gaming, pero sin verificación DB
    if (data.type === 'register') {
      const { clientId, role = 'guest', password } = data

      if (!clientId) {
        send(ws, { type: 'error', message: 'clientId requerido.' })
        return
      }

      // Validar credenciales de administrador en la conexión WebSocket
      if (role === 'admin') {
        if (password !== ADMIN_PASSWORD) {
          console.warn(`[WS] 🔒 Intento de conexión admin bloqueado por credenciales inválidas para clientId: ${clientId}`)
          send(ws, { type: 'error', message: 'Credenciales inválidas de administrador.' })
          ws.close(4001, 'Unauthorized')
          return
        }
      }

      currentConn = { clientId, role, ws, connectedAt: new Date().toISOString() }
      connections.push(currentConn)

      console.log(`[WS] 🟢 ${role.toUpperCase()} conectado: ${clientId}`)

      if (role === 'guest') {
        // Enviar historial de mensajes del usuario
        const history = getMessagesByClient(clientId)
        send(ws, { type: 'history', messages: history })

        // Notificar a admins que hay un nuevo usuario
        broadcastUsersList()

        // Enviar estado de admin actual al nuevo guest de forma inmediata
        const isAdminOnline = connections.some(c => c.role === 'admin')
        send(ws, { type: 'admin_status', online: isAdminOnline })
      }

      if (role === 'admin') {
        // Admin recibe la lista completa de usuarios activos
        broadcastUsersList()
        // Admin recibe todos los turnos
        const turns = getAllTurns()
        send(ws, { type: 'turns_list', turns })
        // Admin recibe todos los mensajes organizados por clientId
        const allMessages = getAllMessages()
        send(ws, { type: 'all_messages', messages: allMessages })

        // Notificar a todos los guests que el admin se ha conectado
        broadcastAdminStatus()
      }

      send(ws, { type: 'registered', clientId, role })
      return
    }

    // Verificar que el cliente esté registrado antes de cualquier otra acción
    if (!currentConn) {
      send(ws, { type: 'error', message: 'Debes registrarte primero.' })
      return
    }

    // ── MENSAJE DE USUARIO → servidor → admin (+ FAQ automático) ───────────────
    if (data.type === 'chat' && currentConn.role === 'guest') {
      const text = sanitize(data.text)
      if (!text) return

      // 1. Guardar y confirmar el mensaje al usuario
      const msg = addMessage(currentConn.clientId, 'guest', text)
      send(ws, { type: 'chat', message: msg })

      // 2. Reenviar a todos los admins para que vean el mensaje
      broadcastToAdmins({ type: 'chat', message: msg })
      broadcastUsersList()

      // 3. Respuesta automática FAQ
      //    PRIORIDAD: si hay un admin conectado, NUNCA se responde automáticamente.
      //    El admin toma el control total de la conversación.
      //    Solo se activa el FAQ cuando NO hay ningún admin conectado.
      const hasAdminConnected = connections.some(c => c.role === 'admin')

      if (hasAdminConnected) {
        // Admin en línea → no enviar nada automático, él responde manualmente
        console.log(`[FAQ] 🔕 Admin conectado — respuesta automática suprimida para ${currentConn.clientId}`)
      } else {
        // Sin admin conectado → activar bot FAQ
        const faqAnswer = getFaqAnswer(text)

        if (faqAnswer) {
          // Coincide con FAQ → responder automáticamente
          setTimeout(() => {
            const autoReply = addMessage(currentConn.clientId, 'club', faqAnswer)
            send(ws, { type: 'chat', message: autoReply })
            console.log(`[FAQ] ✨ Respuesta automática enviada a ${currentConn.clientId}`)
          }, FAQ_DELAY_MS)
        } else {
          // Sin coincidencia y sin admin → mensaje por defecto
          setTimeout(() => {
            const defaultReply = addMessage(currentConn.clientId, 'club', FAQ_DEFAULT)
            send(ws, { type: 'chat', message: defaultReply })
            console.log(`[FAQ] 💬 Respuesta por defecto enviada a ${currentConn.clientId}`)
          }, FAQ_DELAY_MS)
        }
      }

      return
    }

    // ── RESPUESTA DEL ADMIN → usuario específico ──────────────────────────────
    if (data.type === 'admin_reply' && currentConn.role === 'admin') {
      const { targetClientId, text } = data
      if (!targetClientId || !text) return

      const msg = addMessage(targetClientId, 'club', sanitize(text))

      // Enviar al usuario objetivo si está conectado
      const targetConn = getConnection(targetClientId)
      if (targetConn) {
        send(targetConn.ws, { type: 'chat', message: msg })
      }

      // Confirmar al admin (para que aparezca en su ventana activa)
      send(ws, { type: 'chat', message: msg })
      return
    }

    // ── SOLICITUD DE TURNO → guarda + notifica admin ──────────────────────────
    if (data.type === 'turn_request') {
      const { clientId, service, date, schedule, name, phone, people } = data

      const turn = addTurn({ clientId, service, date, schedule, name, phone, people })

      // Enviar confirmación del turno al usuario
      send(ws, { type: 'turn_confirmed', turn })

      // Notificar a admins actualizando la lista de turnos
      broadcastTurnsList()
      return
    }

    // ── ADMIN: marcar turno como aprobado (bloqueado global) ──────────────────
    if (data.type === 'turn_approve' && currentConn.role === 'admin') {
      updateTurnStatus(data.turnId, 'approved')
      broadcastTurnsList()
      return
    }

    // ── ADMIN: marcar turno como finalizado ───────────────────────────────────
    if (data.type === 'turn_done' && currentConn.role === 'admin') {
      updateTurnStatus(data.turnId, 'done')
      broadcastTurnsList()
      return
    }

    // ── ADMIN: eliminar turno ─────────────────────────────────────────────────
    if (data.type === 'turn_delete' && currentConn.role === 'admin') {
      deleteTurn(data.turnId)
      broadcastTurnsList()
      return
    }
  })

  ws.on('close', () => {
    if (currentConn) {
      console.log(`[WS] 🔴 ${currentConn.role.toUpperCase()} desconectado: ${currentConn.clientId}`)
      connections = connections.filter(c => c !== currentConn)

      if (currentConn.role === 'guest') {
        broadcastUsersList()
      }

      if (currentConn.role === 'admin') {
        // Si el admin se desconecta, notificar a todos los guests
        broadcastAdminStatus()
      }
    }
  })

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message)
  })
})

server.listen(PORT, () => {
  console.log(`[WS] ✅ Servidor WebSocket corriendo en ws://localhost:${PORT}`)
  console.log(`[WS] ✅ API REST en http://localhost:${PORT}/api`)
})
