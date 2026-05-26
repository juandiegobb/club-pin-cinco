import React from "react";
import { motion } from "framer-motion";
import "./Services.css";

function Services() {
  const springTransition = { type: 'spring', stiffness: 75, damping: 16 }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const galleryVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <section className="page servicios-contenedor">
      {/* 1. SECCIÓN HERO (Banner principal) */}
      <div className="servicios-hero">
        <motion.h1 
          className="titulo-principal"
          initial={{ opacity: 0, scale: 0.9, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          SERVICIOS
        </motion.h1>
      </div>

      {/* 2. CUADRÍCULA DE TARJETAS */}
      <motion.div 
        className="servicios-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tarjeta 1: Billar Info */}
        <motion.div 
          className="tarjeta"
          variants={cardVariants}
          transition={springTransition}
        >
          <img
            src="/images/iconoBolaBillar.svg"
            alt="Icono Billar"
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>BILLAR</h2>
            <p>
              Un espacio donde la precisión, el ambiente y la competencia se
              convierten en experiencia.
            </p>
          </div>
        </motion.div>

        {/* Tarjeta 2: Billar Tarifas */}
        <motion.div 
          className="tarjeta"
          variants={cardVariants}
          transition={springTransition}
        >
          <img
            src="/images/iconoPesos.svg"
            alt="Icono Tarifas"
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2 className="titulo-tarifa">TARIFAS</h2>
            <ul>
              <li>Billar libre y pool- $9.000</li>
              <li>Billar tres bandas- $11.000</li>
            </ul>
          </div>
        </motion.div>

        {/* Tarjeta 3: Bolos Info */}
        <motion.div 
          className="tarjeta"
          variants={cardVariants}
          transition={springTransition}
        >
          <img
            src="/images/iconoBolos.svg"
            alt="Icono Bolos"
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>BOLOS</h2>
            <p>
              Un espacio donde la precisión, el ambiente y la competencia se
              convierten en experiencia.
            </p>
          </div>
        </motion.div>

        {/* Tarjeta 4: Bolos Tarifas */}
        <motion.div 
          className="tarjeta"
          variants={cardVariants}
          transition={springTransition}
        >
          <img
            src="/images/iconoPesos.svg"
            alt="Icono Tarifas"
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>TARIFAS</h2>
            <ul>
              <li>20 lanzamientos por persona: $12.000</li>
              <li>Zapatillas y medias: $3.000</li>
              <li>Total por persona: $15.000</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. SECCIÓN DEL EVENTO */}
      <motion.div 
        className="evento-seccion"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={springTransition}
      >
        <motion.h2 
          className="titulo-evento"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          La Gran Virusa Aguinaldo Boyacense
        </motion.h2>
        <motion.p 
          className="texto-evento"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          El Aguinaldo Boyacense reúne a jugadores de todo el país en un torneo
          profesional de bolos donde la precisión, la competencia y la pasión
          por el juego se viven en cada lanzamiento.
        </motion.p>

        <motion.div 
          className="galeria-evento"
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.img
            src="/images/TorneoAguinaldo14.jpeg"
            alt="Evento 1"
            className="imagen-evento"
            variants={imageVariants}
            transition={springTransition}
          />
          <motion.img
            src="/images/TorneoAguinaldo15.jpeg"
            alt="Evento 2"
            className="imagen-evento"
            variants={imageVariants}
            transition={springTransition}
          />
          <motion.img
            src="/images/TorneoAguinaldo16.jpeg"
            alt="Evento 3"
            className="imagen-evento"
            variants={imageVariants}
            transition={springTransition}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Services;
