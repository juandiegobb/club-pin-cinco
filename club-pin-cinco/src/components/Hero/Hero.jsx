// src/components/Hero/Hero.jsx
import styles from './Hero.module.css';
import logo from '../../assets/home/logo-pincinco.jpeg';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <nav className={styles.navBar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        {/* Aquí irían tus links después */}
      </nav>
      
      <div className={styles.bannerContainer}>
         {/* Aquí van las imágenes de Billar y Bolos */}
      </div>
    </section>
  );
};
export default Hero;