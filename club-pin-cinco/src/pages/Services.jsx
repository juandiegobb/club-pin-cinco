import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useLightbox } from "../context/LightboxContext";
import ImageWithSkeleton from "../components/gallery/ImageWithSkeleton/ImageWithSkeleton";
import "./Services.css";

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const { t, language } = useLanguage()
  const { openLightbox } = useLightbox()
  const springTransition = { type: 'spring', stiffness: 75, damping: 16 }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
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

  const eventImages = [
    { src: "/images/TorneoAguinaldo14.jpeg", alt: language === 'es' ? 'Evento 1' : 'Event 1' },
    { src: "/images/TorneoAguinaldo15.jpeg", alt: language === 'es' ? 'Evento 2' : 'Event 2' },
    { src: "/images/TorneoAguinaldo16.jpeg", alt: language === 'es' ? 'Evento 3' : 'Event 3' },
  ]

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
          {t('servicesHeroTitle')}
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
            alt={language === 'es' ? 'Icono Billar' : 'Billiards Icon'}
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>{t('billarGridTitle')}</h2>
            <p>{t('billarGridDesc')}</p>
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
            alt={language === 'es' ? 'Icono Tarifas' : 'Rates Icon'}
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2 className="titulo-tarifa">{t('ratesTitle')}</h2>
            <ul>
              <li>{t('billarRate1')}</li>
              <li>{t('billarRate2')}</li>
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
            alt={language === 'es' ? 'Icono Bolos' : 'Bowling Icon'}
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>{t('bolosGridTitle')}</h2>
            <p>{t('bolosGridDesc')}</p>
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
            alt={language === 'es' ? 'Icono Tarifas' : 'Rates Icon'}
            className="icono"
          />
          <div className="tarjeta-contenido">
            <h2>{t('ratesTitle')}</h2>
            <ul>
              <li>{t('bolosRate1')}</li>
              <li>{t('bolosRate2')}</li>
              <li>{t('bolosRate3')}</li>
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
          {t('eventTitle')}
        </motion.h2>
        <motion.p 
          className="texto-evento"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {t('eventDesc')}
        </motion.p>

        <motion.div 
          className="galeria-evento"
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {eventImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="imagen-evento"
              variants={imageVariants}
              transition={springTransition}
              onClick={() => openLightbox(eventImages, index)}
              style={{ cursor: 'pointer' }}
            >
              <ImageWithSkeleton
                src={image.src}
                alt={image.alt}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Services;
