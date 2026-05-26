import { motion } from 'framer-motion'
import styles from './ScheduleList.module.css'

const scheduleItems = [
  'Lunes a jueves - 11:00 a.m a 11:00 p.m',
  'Viernes - 11:00 a.m a 1:00 a.m',
  'Sábados - 2:30 p.m a 2:00 a.m',
  'Domingo - 3:00 p.m a 10:00 p.m',
]

function ScheduleList() {
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.section 
      className={styles.schedule} 
      aria-labelledby="home-schedule-title"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={springTransition}
    >
      <motion.h2 
        id="home-schedule-title" 
        className={styles.title}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
      >
        Horario
      </motion.h2>

      <motion.div 
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {scheduleItems.map((item) => (
          <motion.p 
            className={styles.item} 
            key={item}
            variants={itemVariants}
            transition={springTransition}
          >
            {item}
          </motion.p>
        ))}
      </motion.div>

      <motion.small 
        className={styles.note}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        En días festivos los horarios pueden variar según demanda y reservas.
      </motion.small>
    </motion.section>
  )
}

export default ScheduleList