#  Club Deportivo Pin Cinco — Taller de Diseño Multimedia

Este proyecto es una aplicación web interactiva diseñada, implementada y desplegada para el **Examen Final (40%)** de la asignatura **Taller de Diseño Multimedia**. Consiste en un sistema de reservas y chat en tiempo real para el **Club Deportivo Pin Cinco**, un centro de recreación familiar de bolos y billar ubicado en Tunja, Boyacá.

El proyecto está estructurado bajo una arquitectura **Cliente-Servidor** y desarrollado utilizando **React (Frontend)** y **Node.js + WebSockets (Backend)**.


## Estructura del Repositorio

El repositorio se divide en dos secciones principales para asegurar la separación de responsabilidades:

```text
├── club-pin-cinco/        # FRONTEND: Aplicación SPA en React
│   ├── src/
│   │   ├── components/    # Componentes estructurados por Atomic Design
│   │   ├── context/       # Estados globales (Tema, Idioma, Chat)
│   │   ├── hooks/         # Custom hooks para comportamiento modular
│   │   ├── pages/         # Vistas/Páginas principales
│   │   └── index.css      # Sistema de diseño (Tokens y variables globales)
│   ├── public/            # Recursos estáticos e imágenes
│   └── package.json
│
├── server/                # BACKEND: Servidor Express + WebSocket
│   ├── data/              # Base de datos basada en archivos JSON persistentes
│   ├── server.js          # Lógica principal del servidor y FAQ automático
│   └── package.json
│
└── entregables/                  # DOCUMENTACIÓN ACADÉMICA (Wireframes y Reporte)
    ├── wireframes.pdf     # Wireframes de baja, media y alta fidelidad
    └── informe_final.pdf  # Informe final formal del proyecto
```

---

## Instrucciones para Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/juandiegobb/club-pin-cinco.git
cd club-pin-cinco
```

---

### 2. Levantar el Backend (Servidor)
El servidor gestiona las reservas de turnos y las conexiones WebSocket para el chat en tiempo real.

1. Navega a la carpeta del servidor:
   ```bash
   cd server
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
   *El servidor WebSocket correrá en `ws://localhost:3001` y la API REST en `http://localhost:3001/api`.*

---

### 3. Levantar el Frontend (Cliente)
La aplicación cliente de React se comunica con el servidor local para reservar y chatear.

1. Abre una nueva terminal y navega a la carpeta del cliente:
   ```bash
   cd club-pin-cinco
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local (Vite):
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la dirección indicada por la consola (generalmente `http://localhost:5173`).

---

## Características Técnicas Destacadas

### 1. Cliente-Servidor e Integración en Tiempo Real
*   **WebSockets Activos:** El chat no requiere recargas de página y el panel del administrador recibe las reservas y mensajes al instante.
*   **Motor FAQ (Respuesta Automática):** Si no hay un administrador conectado en el panel de control, un bot inteligente basado en coincidencia semántica de palabras clave responderá instantáneamente a las preguntas de los usuarios sobre precios, horarios, ubicación, etc.
*   **Persistencia en Base de Datos Ligera:** Las reservas y el historial de chat se guardan de forma segura en archivos JSON en el servidor (`server/data/`), garantizando que los datos no se pierdan al reiniciar el servidor.

### 2. Usabilidad y Accesibilidad (A11y)
*   **Navegación 100% por Teclado:** Se puede navegar por toda la interfaz usando las teclas `Tab`, `Space` y `Enter`. Los elementos activos se resaltan con un anillo de foco personalizado y de alto contraste.
*   **Soporte Multilingüe:** La aplicación detecta las preferencias del usuario y cuenta con un selector para cambiar entre **Español** e **Inglés**, traduciendo dinámicamente toda la experiencia de usuario.
*   **Diseño Oscuro/Claro Coherente:** Implementa tokens de color en CSS (`:root` y `[data-theme="light"]`) para alternar fluidamente el tema de la aplicación protegiendo la salud visual del usuario.

### 3. Calidad de Código y Estructura Limpia
*   **CSS Modules:** Previene la colisión de nombres de clases y asegura que cada componente encapsule exclusivamente sus estilos correspondientes.
*   **Arquitectura React Moderna:** Uso extensivo de Hooks personalizados (`useChat`, `useTheme`) y Context API (`LanguageContext`, `ThemeContext`, `ChatContext`) para un manejo limpio del estado de la aplicación.
*   **Sanitización de Datos:** Los mensajes entrantes en el servidor WebSocket son sanitizados contra XSS y etiquetas HTML para evitar vulnerabilidades de inyección de código.
