function ChatBubble({ author, children }) {
  return (
    <p className={`chat-bubble chat-bubble--${author}`}>
      {children}
    </p>
  )
}

export default ChatBubble
