import { useState } from 'react'

const initialForm = {
  service: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  people: '',
}

function Reservation() {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const text = [
      'Hola, quiero apartar un turno en Club Deportivo Pin Cinco.',
      `Servicio: ${form.service}`,
      `Fecha: ${form.date}`,
      `Horario: ${form.time}`,
      `Nombre: ${form.name}`,
      `Celular: ${form.phone}`,
      `Personas: ${form.people}`,
    ].join('\n')

    window.open(`https://wa.me/573202967582?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="page page--reservation">
      <h1>Aparta tu turno</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <label>
          Servicio
          <select name="service" value={form.service} onChange={handleChange}>
            <option value="">Selecciona tu servicio</option>
            <option value="Billar">Billar</option>
            <option value="Bolos">Bolos</option>
          </select>
        </label>

        <label>
          Fecha
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>

        <label>
          Horario
          <select name="time" value={form.time} onChange={handleChange}>
            <option value="">Selecciona un horario</option>
            <option value="1:00 p.m - 2:00 p.m">1:00 p.m - 2:00 p.m</option>
            <option value="2:00 p.m - 3:00 p.m">2:00 p.m - 3:00 p.m</option>
            <option value="3:00 p.m - 4:00 p.m">3:00 p.m - 4:00 p.m</option>
            <option value="4:00 p.m - 5:00 p.m">4:00 p.m - 5:00 p.m</option>
          </select>
        </label>

        <label>
          Nombre completo
          <input name="name" value={form.name} onChange={handleChange} placeholder="Escribe tu nombre" />
        </label>

        <label>
          Numero de celular
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Ej. 123 240 7517" />
        </label>

        <label>
          Cantidad de personas
          <input name="people" value={form.people} onChange={handleChange} placeholder="Ej. 4" />
        </label>

        <button className="button" type="submit">Solicita tu turno</button>
      </form>
    </section>
  )
}

export default Reservation
