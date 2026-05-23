import HomeHero from '../components/home/HomeHero/HomeHero'
import HomeServices from '../components/home/HomeServices/HomeServices'
import LocationPanel from '../components/home/LocationPanel/LocationPanel'
import ScheduleList from '../components/home/ScheduleList/ScheduleList'
import styles from './Home.module.css'

function Home() {
  return (
    <section className={styles.page}>
      <HomeHero />
      <HomeServices />
      <section className={styles.info}>
        <LocationPanel />
        <ScheduleList />
      </section>
    </section>
  )
}

export default Home