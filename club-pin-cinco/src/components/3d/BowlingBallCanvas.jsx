import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import BowlingBall from './BowlingBall'
import styles from './BowlingBallCanvas.module.css'

export default function BowlingBallCanvas() {
  return (
    <div className={styles.container} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]} // limit pixel ratio for performance optimization on high-res displays
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        {/* Soft background light */}
        <ambientLight intensity={0.45} />
        
        {/* Main white highlight light */}
        <directionalLight 
          position={[5, 5, 4]} 
          intensity={1.2} 
          castShadow 
        />
        
        {/* Cobalt Blue/Cyan accent light to match branding */}
        <pointLight 
          position={[-4, 3, 2]} 
          color="#3e43df" 
          intensity={3.5} 
          distance={10} 
        />
        
        {/* Purple/Magenta neon rim light */}
        <pointLight 
          position={[3, -2, 3]} 
          color="#c084fc" 
          intensity={4.0} 
          distance={12} 
        />

        {/* Neon Yellow spotlight reflecting off top */}
        <spotLight 
          position={[0, 5, 2]} 
          color="#f4ff58" 
          intensity={2.5} 
          distance={8} 
          angle={Math.PI / 4}
          penumbra={1}
        />

        {/* Highly optimized soft contact shadows beneath the objects */}
        <ContactShadows 
          position={[0, -1.8, 0]} 
          opacity={0.45} 
          scale={12} 
          blur={2.6} 
          far={4.5} 
        />

        <Suspense fallback={null}>
          <BowlingBall />
        </Suspense>
      </Canvas>
    </div>
  )
}
