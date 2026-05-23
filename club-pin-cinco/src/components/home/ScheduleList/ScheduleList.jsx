import styles from './ScheduleList.module.css'

const scheduleItems = [
  'Lunes a jueves - 11:00 a.m a 11:00 p.m',
  'Viernes - 11:00 a.m a 1:00 a.m',
  'Sábados - 2:30 p.m a 2:00 a.m',
  'Domingo - 3:00 p.m a 10:00 p.m',
]

function ScheduleList() {
  return (
    <section className={styles.schedule} aria-labelledby="home-schedule-title">
      <h2 id="home-schedule-title" className={styles.title}>Horario</h2>
      <div className={styles.list}>
        {scheduleItems.map((item) => (
          <p className={styles.item} key={item}>{item}</p>
        ))}
      </div>
      <small className={styles.note}>
        En días festivos los horarios pueden variar según demanda y reservas.
      </small>
    </section>
  )
}

export default ScheduleList