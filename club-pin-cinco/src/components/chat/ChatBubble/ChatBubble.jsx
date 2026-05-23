import styles from './ChatBubble.module.css'

function ChatBubble({ author, children }) {
  return (
    <div className={`${styles.row} ${author === 'guest' ? styles.rowGuest : ''}`}>
      {author === 'club' && <span className={styles.avatar}>👤</span>}
      <div className={`${styles.bubble} ${author === 'guest' ? styles.bubbleGuest : styles.bubbleClub}`}>
        {/* Franja de color arriba — definida en CSS con ::before */}
        <span className={styles.bubbleText}>{children}</span>
      </div>
      {author === 'guest' && <span className={styles.avatar}>👤</span>}
    </div>
  )
}

export default ChatBubble