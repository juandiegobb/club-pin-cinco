/**
 * useChat.js
 * Hook conveniente que consume ChatContext.
 * Evita importar el contexto directamente en cada componente.
 */

import { useChatContext } from '../context/ChatContext'

export function useChat() {
  return useChatContext()
}

export default useChat
