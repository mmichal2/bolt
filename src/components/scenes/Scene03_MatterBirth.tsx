import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function GalaxyParticles({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Points>(null!)
  const count = 5000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 5
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
      meshRef.current.rotation.z = mouse.x * 0.2
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#A3B9FF" transparent opacity={0.7} />
    </points>
  )
}

function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.5) * 3
      lightRef.current.position.y = Math.cos(t * 0.3) * 2
    }
  })

  return <pointLight ref={lightRef} color="#809EFF" intensity={2.5} distance={20} />
}

export default function Scene03_MatterBirth() {
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
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <MovingLight />
        <GalaxyParticles mouse={mouse} />
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute top-1/2 left-1/2 text-center text-white -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-light tracking-widest">
          Z pyłu powstają wspomnienia.
        </h1>
        <p className="text-gray-400 italic mt-2 text-sm">
          From dust, memories form.
        </p>
      </motion.div>
    </div>
  )
}
