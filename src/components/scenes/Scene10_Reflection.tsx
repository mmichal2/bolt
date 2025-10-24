import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function GoldenOrb({ mouse }: { mouse: { x: number; y: number } }) {
  const orbRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (orbRef.current) {
      orbRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
      orbRef.current.position.x = mouse.x * 1.5
      orbRef.current.position.y = mouse.y * 1.2
    }
  })

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        emissive="#FFD56A"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.2}
        color="#FFF1C0"
      />
    </mesh>
  )
}

function PulsingLight() {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(t) * 0.5
    }
  })

  return <pointLight ref={lightRef} color="#FFD580" distance={15} />
}

export default function Scene10_Reflection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <div
      className="w-screen h-screen bg-black"
      onMouseMove={(e) =>
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: -(e.clientY / window.innerHeight - 0.5) * 2,
        })
      }
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <PulsingLight />
        <GoldenOrb mouse={mouse} />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: [0, 1, 1, 0.8], y: [30, 0, 0, -10] }}
        transition={{ delay: 2, duration: 6 }}
        className="absolute top-1/2 left-1/2 text-center text-amber-100 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-light tracking-widest">
          To, co patrzyło, zawsze patrzyło z wnętrza ciebie.
        </h1>
        <p className="text-sm italic text-amber-300 mt-2">
          What was watching — was always watching from within you.
        </p>
      </motion.div>
    </div>
  )
}
