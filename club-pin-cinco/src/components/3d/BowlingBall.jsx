import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStage } from '../../hooks/useScrollStage'

function lerp(a, b, t) {
  return a + (b - a) * t
}

// Bowling Pin Component
function BowlingPin({ position, index, scatterProgress }) {
  const pinRef = useRef()

  useFrame(() => {
    if (!pinRef.current) return

    // Original position
    let targetX = position[0]
    let targetY = position[1]
    let targetZ = position[2]
    let targetRotX = 0
    let targetRotY = 0
    let targetRotZ = 0

    if (scatterProgress > 0) {
      // Scatter details based on unique angles and math
      const angle = (index * 60 * Math.PI) / 180 + Math.PI / 6
      const force = scatterProgress * 4.5
      
      // fly outwards and backwards
      targetX += Math.cos(angle) * force
      targetZ -= Math.sin(angle) * force * 1.5 + scatterProgress * 2
      // parabolic arc jump
      targetY += Math.sin(scatterProgress * Math.PI) * 1.8 - (scatterProgress * scatterProgress * 3.5)

      // tumble rotations
      targetRotX = scatterProgress * 6 * (index % 2 === 0 ? 1 : -1)
      targetRotY = scatterProgress * 9
      targetRotZ = scatterProgress * 5 * (index % 3 === 0 ? 1 : -1)

      // Virtual floor to prevent pins falling forever
      if (targetY < -2.2) {
        targetY = -2.2
      }
    }

    // Lerp positions and rotations for premium fluidity
    pinRef.current.position.x = lerp(pinRef.current.position.x, targetX, 0.12)
    pinRef.current.position.y = lerp(pinRef.current.position.y, targetY, 0.12)
    pinRef.current.position.z = lerp(pinRef.current.position.z, targetZ, 0.12)

    pinRef.current.rotation.x = lerp(pinRef.current.rotation.x, targetRotX, 0.12)
    pinRef.current.rotation.y = lerp(pinRef.current.rotation.y, targetRotY, 0.12)
    pinRef.current.rotation.z = lerp(pinRef.current.rotation.z, targetRotZ, 0.12)
  })

  return (
    <group ref={pinRef} position={position}>
      {/* Porcelain Pin Body Geometry Parts */}
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.075, 0.08, 0.04, 32]} />
        <meshPhysicalMaterial
          color="#fcfcff"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.05}
          reflectivity={0.9}
        />
      </mesh>
      {/* Belly/Bulb stretched sphere */}
      <mesh castShadow receiveShadow position={[0, -0.05, 0]} scale={[1, 1.45, 1]}>
        <sphereGeometry args={[0.135, 32, 32]} />
        <meshPhysicalMaterial
          color="#fcfcff"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.05}
          reflectivity={0.9}
        />
      </mesh>
      {/* Taper Neck connector */}
      <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.045, 0.12, 0.18, 32]} />
        <meshPhysicalMaterial
          color="#fcfcff"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.05}
          reflectivity={0.9}
        />
      </mesh>
      {/* Neck collar */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.038, 0.045, 0.12, 32]} />
        <meshPhysicalMaterial
          color="#fcfcff"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.05}
          reflectivity={0.9}
        />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.062, 32, 32]} />
        <meshPhysicalMaterial
          color="#fcfcff"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* Red stripes on the neck (Highly polished metallic red) */}
      <mesh position={[0, 0.24, 0]}>
        <torusGeometry args={[0.042, 0.012, 16, 32]} />
        <meshPhysicalMaterial
          color="#ff2a3b"
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[0.046, 0.012, 16, 32]} />
        <meshPhysicalMaterial
          color="#ff2a3b"
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

export default function BowlingBall() {
  const { stage, stageProgress } = useScrollStage()
  const { viewport } = useThree()
  
  const ballGroupRef = useRef()
  const ballSphereRef = useRef()
  const pinsGroupRef = useRef()

  // Detect mobile viewport size in 3D scene space
  const isMobile = viewport.width < 5.5

  // Smoothed states for positions, scaling, and rolling rotation
  const smoothed = useRef({
    x: isMobile ? 0 : 1.8,
    y: isMobile ? -1.0 : -0.4,
    z: 0,
    scale: isMobile ? 0.45 : 0.65,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    lastX: isMobile ? 0 : 1.8,
    lastY: isMobile ? -1.0 : -0.4,
  })

  // Dynamic procedural marbled purple-magenta canvas texture
  const marbledTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    // Deep space dark purple / blue gradient
    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256)
    grad.addColorStop(0, '#581c87') // dark purple
    grad.addColorStop(0.4, '#3b82f6') // blue swirl
    grad.addColorStop(0.8, '#1e1b4b') // deep navy
    grad.addColorStop(1, '#0c0a09') // black edge
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    // Add some organic neon-indigo/violet swirls
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)' // lavender glow
    ctx.lineWidth = 14
    for (let i = 0; i < 8; i++) {
      ctx.beginPath()
      ctx.ellipse(256, 256, 60 + i * 22, 100 + i * 15, (i * Math.PI) / 4, 0, Math.PI * 2)
      ctx.stroke()
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  // Absolute positioning paths for Stage 1 (Scroll transition)
  // [x, y, z] layout nodes
  const desktopPath = [
    new THREE.Vector3(1.8, -0.4, 0),    // Starting right of Hero
    new THREE.Vector3(1.2, 0.8, 0),     // Rolling up right
    new THREE.Vector3(-1.0, 0.2, 0),    // Rolling left across page center
    new THREE.Vector3(-1.8, -0.8, 0),   // Ending bottom-left of services
  ]

  const mobilePath = [
    new THREE.Vector3(0, -1.0, 0),      // Centered lower in Hero
    new THREE.Vector3(0.8, -0.2, 0),    // Slightly right
    new THREE.Vector3(-0.8, 0.4, 0),    // Slightly left
    new THREE.Vector3(0, -1.4, 0),      // Centered bottom of services
  ]

  // Defined pin placement (triangle layout)
  const pinPlacements = [
    [0, -1.2, -2.0],       // Front Pin
    [-0.22, -1.2, -2.4],   // Row 2 Left
    [0.22, -1.2, -2.4],    // Row 2 Right
    [-0.44, -1.2, -2.8],   // Row 3 Left
    [0, -1.2, -2.8],       // Row 3 Center
    [0.44, -1.2, -2.8],    // Row 3 Right
  ]

  // Calculate scatter progress for pins
  const scatterProgress = stage === 2 ? Math.max(0, (stageProgress - 0.6) / 0.4) : 0

  useFrame((state) => {
    if (!ballGroupRef.current) return
    const clockTime = state.clock.getElapsedTime()
    const s = smoothed.current
    const easeRate = 0.06 // smooth lerp interpolation factor

    let targetX = s.x
    let targetY = s.y
    let targetZ = 0
    let targetScale = isMobile ? 0.45 : 0.65

    // STAGE 0: Floating Hero State
    if (stage === 0) {
      targetX = isMobile ? 0 : 1.8
      targetY = isMobile ? -1.0 : -0.4
      targetY += Math.sin(clockTime * 1.5) * 0.12 // slow hover bobbing
      targetScale = isMobile ? 0.45 : 0.65
    }

    // STAGE 1: Scrolling & Rolling diagonal path
    if (stage === 1) {
      const path = isMobile ? mobilePath : desktopPath
      const segmentCount = path.length - 1
      const exactIndex = Math.min(Math.floor(stageProgress * segmentCount), segmentCount - 1)
      const localT = (stageProgress * segmentCount) % 1

      const interpolatedPos = new THREE.Vector3().lerpVectors(
        path[exactIndex],
        path[exactIndex + 1],
        localT
      )
      targetX = interpolatedPos.x
      targetY = interpolatedPos.y
      targetScale = isMobile ? 0.38 : 0.55
    }

    // STAGE 2: Pin Strike Lane
    if (stage === 2) {
      targetScale = isMobile ? 0.45 : 0.65
      
      if (stageProgress < 0.35) {
        // Roll from ending point into center lane
        const startX = isMobile ? 0 : -1.8
        const startY = isMobile ? -1.4 : -0.8
        const localT = stageProgress / 0.35

        targetX = lerp(startX, 0, localT)
        targetY = lerp(startY, -1.2, localT)
        targetZ = lerp(0, 1.2, localT)
      } else {
        // Charge down the lane towards pins
        const localT = (stageProgress - 0.35) / 0.65
        targetX = 0
        targetY = -1.2
        
        if (localT < 0.4) {
          // Rolling forward towards impact (Z goes from 1.2 to -2.0)
          targetZ = lerp(1.2, -2.0, localT / 0.4)
        } else {
          // Slow down after impact
          targetZ = lerp(-2.0, -2.5, (localT - 0.4) / 0.6)
        }
      }
    }

    // Interpolate scales and positions
    s.x = lerp(s.x, targetX, easeRate)
    s.y = lerp(s.y, targetY, easeRate)
    s.z = lerp(s.z, targetZ, easeRate)
    s.scale = lerp(s.scale, targetScale, easeRate)

    ballGroupRef.current.position.set(s.x, s.y, s.z)
    ballGroupRef.current.scale.setScalar(s.scale)

    // REALISTIC ROLLING ROTATION MATH:
    // Link rotation directly to actual delta movements for maximum sensory realism
    const deltaX = s.x - s.lastX
    const deltaY = s.y - s.lastY
    const deltaZ = s.z - (ballGroupRef.current.position.z || 0)

    const rollSpeed = 2.2
    
    // Rotate ball sphere relative to rolling direction
    if (stage === 0) {
      // Gentle constant idle rotation in hero stage
      s.rotX += 0.005
      s.rotY += 0.008
    } else {
      // Dynamic roll proportional to positional changes
      s.rotZ -= deltaX * rollSpeed
      s.rotX += (deltaY + deltaZ) * rollSpeed
      s.rotY += deltaX * 0.5
    }

    s.lastX = s.x
    s.lastY = s.y

    if (ballSphereRef.current) {
      ballSphereRef.current.rotation.x = s.rotX
      ballSphereRef.current.rotation.y = s.rotY
      ballSphereRef.current.rotation.z = s.rotZ
    }
  })

  return (
    <group>
      {/* Bowling Ball Group */}
      <group ref={ballGroupRef}>
        <group ref={ballSphereRef}>
          {/* Main sphere with glossy clearcoat physical material */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.9, 64, 64]} />
            <meshPhysicalMaterial
              color="#3e43df" // base cobalt blue from design tokens
              map={marbledTexture}
              transparent={true}
              opacity={0.45} // highly translucent, making it beautiful and non-intrusive!
              roughness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              metalness={0.1}
              transmission={0.4} // glass-like light refraction!
              thickness={0.5} // refraction thickness
            />
          </mesh>

          {/* Three Finger Holes (Geometrically placed recessed basic spheres) */}
          {/* Thumb Hole */}
          <mesh position={[0, -0.4, 0.8]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshBasicMaterial color="#0b0b1a" />
          </mesh>
          {/* Middle Finger Hole */}
          <mesh position={[-0.14, 0.15, 0.88]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#0b0b1a" />
          </mesh>
          {/* Ring Finger Hole */}
          <mesh position={[0.14, 0.15, 0.88]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#0b0b1a" />
          </mesh>

          {/* Engraved glowing Yellow "5" Decal on the back */}
          <Text
            position={[0, 0, -0.91]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.5}
            color="#f4ff58" // neon yellow from design tokens
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            5
          </Text>
        </group>
      </group>

      {/* Pins Group: Rendered in 3D space only in stage 2 */}
      {stage === 2 && (
        <group ref={pinsGroupRef}>
          {pinPlacements.map((pos, idx) => (
            <BowlingPin
              key={idx}
              index={idx}
              position={pos}
              scatterProgress={scatterProgress}
            />
          ))}
        </group>
      )}
    </group>
  )
}
