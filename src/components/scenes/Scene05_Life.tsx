import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function OrganicParticles() {
  const meshRef = useRef<THREE.Points>(null!)
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 2
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
      const scale = 1 + Math.sin(t * 1.5) * 0.05
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#FFD580" transparent opacity={0.9} />
    </points>
  )
}

function PulsingLight({ mouse }: { mouse: { x: number; y: number } }) {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(t * 1.5) * 0.8
      lightRef.current.position.x = Math.sin(t * 0.2) * 2 + mouse.x * 2
      lightRef.current.position.y = Math.cos(t * 0.2) * 1 + mouse.y * 2
    }
  })

  return <pointLight ref={lightRef} color="#FFD580" distance={10} />
}

export default function Scene05_Life() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <div
      className="w-screen h-screen bg-black"
      onMouseMove={(e) =>
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: -(e.clientY / window.innerHeight - 0.5),
        })
      }
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <PulsingLight mouse={mouse} />
        <OrganicParticles />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute top-1/2 left-1/2 text-center text-yellow-200 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-4xl font-light tracking-widest">
          Oddychanie to sposób, w jaki świat się słucha.
        </h1>
        <p className="text-sm italic text-yellow-300 mt-2">
          Breathing — the way the world listens.
        </p>
      </motion.div>
    </div>
  )
}
