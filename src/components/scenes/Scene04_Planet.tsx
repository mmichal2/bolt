import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#304D7A"
        metalness={0.2}
        roughness={0.8}
        emissive="#0B1A33"
      />
    </mesh>
  )
}

function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.2) * 5
      lightRef.current.position.z = Math.cos(t * 0.2) * 5
    }
  })

  return <pointLight ref={lightRef} intensity={2} color="#88BBFF" distance={20} />
}

export default function Scene04_Planet() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#0A0E1A', 5, 15]} />
        <ambientLight intensity={0.1} />
        <MovingLight />
        <Planet />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute top-1/2 left-1/2 text-center text-white -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-light tracking-widest">
          Ziemia. Pierwsze spojrzenie na siebie.
        </h1>
        <p className="text-gray-400 italic mt-2 text-sm">
          Earth. The first glance at itself.
        </p>
      </motion.div>
    </div>
  )
}
