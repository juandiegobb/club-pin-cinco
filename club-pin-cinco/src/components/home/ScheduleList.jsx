const scheduleItems = [
  'Lunes a jueves - 11:00 a.m a 11:00 p.m',
  'Viernes - 11:00 a.m a 1:00 a.m',
  'Sabados - 2:30 p.m a 2:00 a.m',
  'Domingo - 3:00 p.m a 10:00 p.m',
]

function ScheduleList() {
  return (
    <section className="home-schedule" aria-labelledby="home-schedule-title">
      <h2 id="home-schedule-title">Horario</h2>
      <div className="home-schedule__list">
        {scheduleItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <small>En dias festivos los horarios pueden variar segun demanda y reservas.</small>
    </section>
  )
}

export default ScheduleList
