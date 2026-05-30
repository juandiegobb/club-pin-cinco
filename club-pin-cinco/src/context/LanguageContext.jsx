import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  es: {
    // ── Navbar ──
    home: 'Inicio',
    about: 'Sobre nosotros',
    services: 'Servicios',
    gallery: 'Galería',
    reservation: 'Reserva',
    closeMenu: 'Cerrar menú',
    openMenu: 'Abrir menú',

    // ── Home Hero ──
    heroSubtitle: 'Club Deportivo',
    heroTitle: 'Pin Cinco',
    heroDesc: 'Diversión, entretenimiento y grandes experiencias en un solo lugar',
    heroBtn: 'Turnar aquí',

    // ── Home Services ──
    servicesTitle: 'Nuestros servicios',
    bolosTitle: 'Bolos',
    bolosDesc: 'Derriba pinos, reta a tus amigos y vive la mejor experiencia de bolos en Pin Cinco.',
    billarTitle: 'Billar',
    billarDesc: 'Afina tu puntería, reta a tus amigos y vive la mejor experiencia de billar en Pin Cinco.',
    viewMore: 'Ver más',

    // ── Location Panel ──
    locationTitle: 'Ubicación',
    mapsLink: '📍 Ver en Google Maps',
    address: 'Transversal 0 Este 66a 18 Muscas Centro Comercial Rio 150003 Tunja, Colombia',

    // ── Schedule List ──
    scheduleTitle: 'Horario',
    lunJue: 'Lunes a jueves - 11:00 a.m a 11:00 p.m',
    viernes: 'Viernes - 11:00 a.m a 1:00 a.m',
    sabados: 'Sábados - 2:30 p.m a 2:00 a.m',
    domingos: 'Domingo - 3:00 p.m a 10:00 p.m',
    scheduleNote: 'En días festivos los horarios pueden variar según demanda y reservas.',

    // ── About Page ──
    aboutHeroTitle: 'Acerca de Nosotros',
    trayectoriaTitle: 'Trayectoria',
    historiaTitle: 'Historia',
    identidadTitle: 'Identidad del Negocio',
    trayectoriaTexto: 'La sede de Pin Cinco nació hace aproximadamente 11 años en Tunja como un espacio dedicado a la recreación y el entretenimiento para familias, amigos y amantes de los bolos y el billar. Con el paso del tiempo, se ha consolidado como un lugar reconocido en Boyacá gracias a su ambiente y actividades. Además, cada diciembre realiza el tradicional evento “La Gran Virusa Aguinaldo Boyacense”, un evento que reúne participantes nacionales e internacionales.',
    historiaTexto: 'El Club Deportivo Pin Cinco nació hace más de 11 años gracias a la pasión y trayectoria de su propietario en el mundo de los bolos. Con más de 40 años de trayectoria, sigue participando en competencias y campeonatos nacionales, adquiriendo experiencia y un gran reconocimiento dentro de este deporte. Con el tiempo, surgió la idea de crear un espacio donde otras personas también pudieran disfrutar de la emoción, la diversión y el ambiente que se vive alrededor de los bolos.\n\nAsí comenzó El Club Deportivo Pin Cinco, un lugar que para muchos puede parecer escondido, pero que con los años se ha convertido en un punto de encuentro para familias, amigos, grupos empresariales y amantes del bolo y el billar en Boyacá. Gracias a la dedicación y experiencia de su propietario, el establecimiento ha logrado mantener un ambiente enfocado en el entretenimiento, la tradición y el amor por este deporte.',
    identidadTexto: 'El Club Deportivo Pin Cinco es un espacio enfocado en la diversión, el entretenimiento y la integración familiar y social. Su identidad nace de la pasión por el deporte del bolo y el billar, el deseo de ofrecer un ambiente diferente, donde las personas puedan compartir momentos agradables junto a amigos y familiares.\n\nEl establecimiento se caracteriza por combinar deporte, recreación y tradición en un mismo lugar, brindando una experiencia cercana, dinámica y acogedora para quienes lo visitan.',

    // ── Services Page ──
    servicesHeroTitle: 'SERVICIOS',
    billarGridTitle: 'BILLAR',
    billarGridDesc: 'Un espacio donde la precisión, el ambiente y la competencia se convierten en experiencia.',
    bolosGridTitle: 'BOLOS',
    bolosGridDesc: 'Un espacio donde la precisión, el ambiente y la competencia se convierten en experiencia.',
    ratesTitle: 'TARIFAS',
    billarRate1: 'Billar libre y pool - $9.000 / hora',
    billarRate2: 'Billar tres bandas - $11.000 / hora',
    bolosRate1: '20 lanzamientos por persona: $12.000',
    bolosRate2: 'Zapatillas y medias: $3.000',
    bolosRate3: 'Total por persona: $15.000',
    eventTitle: 'La Gran Virusa Aguinaldo Boyacense',
    eventDesc: 'El Aguinaldo Boyacense reúne a jugadores de todo el país en un torneo profesional de bolos donde la precisión, la competencia y la pasión por el juego se viven en cada lanzamiento.',

    // ── Gallery Page ──
    galleryHeroTitle: 'Galería',

    // ── Reservation Page ──
    reservationTitle: 'Aparta tu Turno',
    selectDatePrompt: '⚠️ Por favor selecciona una fecha primero para ver los horarios disponibles.',
    step1: '1. Aparta tu turno',
    step2: '2. Elige la fecha',
    step3: '3. Elige tu horario',
    step4: '4. Nombre completo',
    step5: '5. Número de celular',
    step6: '6. Cantidad de personas',
    placeholderName: 'Escribe tu nombre',
    placeholderPhone: 'Ej. 320 240 7517',
    placeholderPeople: 'Ej. 4',
    warningNotice: 'Tu turno será asignado según la disponibilidad del establecimiento. La hora seleccionada es aproximada y puede variar.',
    reserveBtn: 'Solicita tu turno',
    whatsappBtnNote: 'Te redirigimos a WhatsApp para confirmar tu solicitud',
    bolosLabel: 'Bolos',
    billarLabel: 'Billar',
    alertCompleteFields: 'Por favor completa todos los campos.',
    alertSelectSchedule: 'Por favor selecciona un horario.',
    alertSelectDate: 'Por favor selecciona una fecha.',

    // ── Turn Toast ──
    toastTitle: '¡Turno Apartado!',
    toastSubtitle: 'Recibirás una respuesta en breve',
    labelClient: 'Cliente:',
    labelService: 'Servicio:',
    labelDate: 'Fecha:',
    labelSchedule: 'Horario:',
    labelPeople: 'Personas:',
    toastBadge: '🟢 Tu solicitud de turno está registrada de forma segura en nuestro sistema.',
    toastAcceptBtn: 'Entendido, ¡gracias!',
    billarServiceTag: '🎱 Billar',
    bolosServiceTag: '🎳 Bolos',
    serverOccupiedTag: '🔒 Ocupado · Reservado',
    localBlockedTag: '🔒 Bloqueado temporalmente · '
  },
  en: {
    // ── Navbar ──
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    gallery: 'Gallery',
    reservation: 'Reservation',
    closeMenu: 'Close Menu',
    openMenu: 'Open Menu',

    // ── Home Hero ──
    heroSubtitle: 'Sports Club',
    heroTitle: 'Pin Cinco',
    heroDesc: 'Fun, entertainment, and great experiences in a single place',
    heroBtn: 'Book Turn Here',

    // ── Home Services ──
    servicesTitle: 'Our Services',
    bolosTitle: 'Bowling',
    bolosDesc: 'Knock down pins, challenge your friends, and live the best bowling experience at Pin Cinco.',
    billarTitle: 'Billiards',
    billarDesc: 'Sharpen your aim, challenge your friends, and live the best billiards experience at Pin Cinco.',
    viewMore: 'View More',

    // ── Location Panel ──
    locationTitle: 'Location',
    mapsLink: '📍 View on Google Maps',
    address: 'Transversal 0 Este 66a 18 Muscas CC Rio 150003 Tunja, Colombia',

    // ── Schedule List ──
    scheduleTitle: 'Opening Hours',
    lunJue: 'Monday to Thursday - 11:00 a.m to 11:00 p.m',
    viernes: 'Friday - 11:00 a.m to 1:00 a.m',
    sabados: 'Saturdays - 2:30 p.m to 2:00 a.m',
    domingos: 'Sunday - 3:00 p.m to 10:00 p.m',
    scheduleNote: 'On holidays opening hours may vary based on demand and reservations.',

    // ── About Page ──
    aboutHeroTitle: 'About Us',
    trayectoriaTitle: 'Trajectory',
    historiaTitle: 'History',
    identidadTitle: 'Business Identity',
    trayectoriaTexto: 'Pin Cinco was born approximately 11 years ago in Tunja, as a space dedicated to recreation and entertainment for families, friends, and bowling and billiards lovers. Over time, it has established itself as a renowned venue in Boyacá thanks to its unique atmosphere and activities. Additionally, every December it hosts the traditional tournament “La Gran Virusa Aguinaldo Boyacense”, a professional event gathering national and international competitors.',
    historiaTexto: 'The Pin Cinco Sports Club was born over 11 years ago thanks to the passion and trajectory of its owner in the bowling world. With more than 40 years of experience, he continues to participate in national competitions and championships, earning recognition in this sport. Over time, the idea arose to build a place where other people could also enjoy the excitement, fun, and atmosphere surrounding bowling.\n\nThus, Pin Cinco Sports Club began, a place that for many might seem hidden, but over the years has become a meeting point for families, friends, business groups, and sports lovers of bowling and billiards in Boyacá. Thanks to the dedication and experience of its owner, the establishment has maintained a vibrant atmosphere focused on entertainment, tradition, and love for these sports.',
    identidadTexto: 'Pin Cinco Sports Club is a space focused on fun, entertainment, and social and family integration. Its identity stems from the passion for bowling and billiards and the desire to offer a different environment, where people can share pleasant moments with friends and family.\n\nThe establishment stands out by combining sports, recreation, and tradition in one place, providing an approachable, dynamic, and welcoming experience for everyone who visits.',

    // ── Services Page ──
    servicesHeroTitle: 'SERVICES',
    billarGridTitle: 'BILLIARDS',
    billarGridDesc: 'A space where precision, atmosphere, and competition turn into an outstanding experience.',
    bolosGridTitle: 'BOWLING',
    bolosGridDesc: 'A space where precision, atmosphere, and competition turn into an outstanding experience.',
    ratesTitle: 'RATES',
    billarRate1: 'Free billiards and pool - $9,000 / hour',
    billarRate2: 'Three-cushion billiards - $11,000 / hour',
    bolosRate1: '20 rolls per person: $12,000',
    bolosRate2: 'Bowling shoes and socks: $3,000',
    bolosRate3: 'Total per person: $15,000',
    eventTitle: 'La Gran Virusa Aguinaldo Boyacense',
    eventDesc: 'The Aguinaldo Boyacense tournament gathers players from all over the country in a professional bowling competition where precision, competition, and passion for the game are lived in every roll.',

    // ── Gallery Page ──
    galleryHeroTitle: 'Gallery',

    // ── Reservation Page ──
    reservationTitle: 'Book your Turn',
    selectDatePrompt: '⚠️ Please select a date first to view available schedules.',
    step1: '1. Select your service',
    step2: '2. Choose the date',
    step3: '3. Choose your schedule',
    step4: '4. Full name',
    step5: '5. Phone number',
    step6: '6. Number of guests',
    placeholderName: 'Type your name',
    placeholderPhone: 'Ej. 320 240 7517',
    placeholderPeople: 'Ej. 4',
    warningNotice: 'Your turn will be assigned according to the establishment availability. The selected time is approximate and may vary.',
    reserveBtn: 'Request your Turn',
    whatsappBtnNote: 'We redirect you to WhatsApp to confirm your request',
    bolosLabel: 'Bowling',
    billarLabel: 'Billiards',
    alertCompleteFields: 'Please complete all fields.',
    alertSelectSchedule: 'Please select a schedule.',
    alertSelectDate: 'Please select a date.',

    // ── Turn Toast ──
    toastTitle: 'Turn Booked!',
    toastSubtitle: 'You will receive a response shortly',
    labelClient: 'Client:',
    labelService: 'Service:',
    labelDate: 'Date:',
    labelSchedule: 'Schedule:',
    labelPeople: 'Guests:',
    toastBadge: '🟢 Your turn request is safely registered in our real-time system.',
    toastAcceptBtn: 'Got it, thanks!',
    billarServiceTag: '🎱 Billiards',
    bolosServiceTag: '🎳 Bowling',
    serverOccupiedTag: '🔒 Occupied · Booked',
    localBlockedTag: '🔒 Temporarily blocked · '
  }
}

const LanguageContext = createContext(null)

const DAYS = {
  es: ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
  en: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
}

const MONTHS = {
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('pincinco_language')
    return saved === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    localStorage.setItem('pincinco_language', language)
    document.documentElement.setAttribute('lang', language)
  }, [language])

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))
  }

  function t(key) {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      t,
      daysList: DAYS[language],
      monthsList: MONTHS[language]
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
