import React from 'react';
import './Services.css'; // Importaremos los estilos que crearemos en el paso 2

function Services() {
  return (
    <section className="page servicios-contenedor">
      
      {/* 1. SECCIÓN HERO (Banner principal) */}
      <div className="servicios-hero">
        <h1 className="titulo-principal">SERVICIOS</h1>
      </div>

      {/* 2. CUADRÍCULA DE TARJETAS */}
      <div className="servicios-grid">
        {/* Tarjeta 1: Billar Info */}
        <div className="tarjeta tarjeta--destacada">
          <img src="/images/iconoBolaBillar.svg" alt="Icono Billar" className="icono" />
          <div className="tarjeta-contenido">
            <h2>BILLAR</h2>
            <p>Un espacio donde la precisión, el ambiente y la competencia se convierten en experiencia.</p>
          </div>
        </div>

        {/* Tarjeta 2: Billar Tarifas */}
        <div className="tarjeta">
          <img src="/images/iconoPesos.svg" alt="Icono Tarifas" className="icono" />
          <div className="tarjeta-contenido">
            <h2 className="titulo-tarifa">TARIFAS</h2>
            <ul>
              <li>Billar libre y pool- $9.000</li>
              <li>Billar tres bandas- $11.000</li>
            </ul>
          </div>
        </div>

        {/* Tarjeta 3: Bolos Info */}
        <div className="tarjeta">
          <img src="/images/iconoBolos.svg" alt="Icono Bolos" className="icono" />
          <div className="tarjeta-contenido">
            <h2>BOLOS</h2>
            <p>Un espacio donde la precisión, el ambiente y la competencia se convierten en experiencia.</p>
          </div>
        </div>

        {/* Tarjeta 4: Bolos Tarifas */}
        <div className="tarjeta">
          <img src="/images/iconoPesos.svg" alt="Icono Tarifas" className="icono" />
          <div className="tarjeta-contenido">
            <h2>TARIFAS</h2>
            <ul>
              <li>20 lanzamientos por persona: $12.000</li>
              <li>Zapatillas y medias: $3.000</li>
              <li>Total por persona: $15.000</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN DEL EVENTO */}
      <div className="evento-seccion">
        <h2 className="titulo-evento">Aguinaldo boyacense</h2>
        <p className="texto-evento">
          El Aguinaldo Boyacense reúne a jugadores de todo el país en un torneo profesional de bolos donde la precisión, la competencia y la pasión por el juego se viven en cada lanzamiento.
        </p>
        
        <div className="galeria-evento">
          <img src="/images/evento-1.jpg" alt="Evento 1" className="imagen-evento" />
          <img src="/images/evento-2.jpg" alt="Evento 2" className="imagen-evento" />
          <img src="/images/evento-3.jpg" alt="Evento 3" className="imagen-evento" />
        </div>
      </div>

    </section>
  );
}

export default Services;