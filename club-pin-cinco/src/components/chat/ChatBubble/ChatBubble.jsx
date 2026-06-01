import { User, Bot } from 'lucide-react'
import styles from './ChatBubble.module.css'

function ChatBubble({ author, children }) {
  return (
    <div className={`${styles.row} ${author === 'guest' ? styles.rowGuest : ''}`}>
      {author === 'club' && (
        <div className={`${styles.avatarContainer} ${styles.avatarClub}`}>
          <Bot size={15} />
        </div>
      )}
      <div className={`${styles.bubble} ${author === 'guest' ? styles.bubbleGuest : styles.bubbleClub}`}>
        {/* Franja de color arriba — definida en CSS con ::before */}
        <span className={styles.bubbleText}>{children}</span>
      </div>
      {author === 'guest' && (
        <div className={`${styles.avatarContainer} ${styles.avatarGuest}`}>
          <User size={15} />
        </div>
      )}
    </div>
  )
}

export default ChatBubble