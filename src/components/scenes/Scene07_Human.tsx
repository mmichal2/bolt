import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function GlitchField() {
  const ref = useRef<THREE.Points>(null!)
  const count = 4000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = Math.sin(theta) * r
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2
      const material = ref.current.material as THREE.PointsMaterial
      material.opacity = 0.6 + Math.sin(t * 4) * 0.2
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FF6666"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FlickeringLight() {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const flicker = Math.sin(t * 10) * 0.5 + Math.random() * 0.5
    if (lightRef.current) {
      lightRef.current.intensity = 2 + flicker * 3
      const h = 0.02 + flicker * 0.05
      lightRef.current.color.setHSL(h, 1, 0.6)
    }
  })

  return <pointLight ref={lightRef} color="#FF6666" distance={20} intensity={3} />
}

export default function Scene07_Human() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <ambientLight intensity={0.2} />
        <FlickeringLight />
        <GlitchField />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 text-center text-red-400 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.h1
          animate={{
            opacity: [1, 0.6, 1],
            x: [0, 1, 0],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl font-light tracking-widest"
        >
          Świadomość — kosmos, który zaczął się zastanawiać.
        </motion.h1>
        <p className="text-sm italic text-red-300 mt-2">
          Consciousness — the cosmos wondering about itself.
        </p>
      </motion.div>
    </div>
  )
}

