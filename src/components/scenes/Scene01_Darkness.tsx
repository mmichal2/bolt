// @ts-ignore
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Stars } from '@react-three/drei'

function QuantumDust() {
  const ref = useRef<THREE.Points>(null!)
  const count = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = Math.sin(theta) * r
    }
    return pos
  }, [])

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    camera.position.z = 6 - Math.sin(t * 0.05) * 0.3
    if (ref.current) ref.current.rotation.y = t * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#222" transparent opacity={0.6} />
    </points>
  )
}

export default function Scene01_Darkness() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={['#000']} />
        <Stars radius={100} depth={80} count={5000} factor={3} fade speed={0.1} />
        <ambientLight intensity={0.05} />
        <QuantumDust />
        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.1} />
        </EffectComposer>
      </Canvas>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 1] }}
        transition={{ duration: 8, delay: 1 }}
        className="absolute top-1/2 left-1/2 text-center text-gray-400 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-4xl font-light tracking-widest">
          Na początku — nic nie świeciło.
        </h1>
        <p className="text-sm italic text-gray-500 mt-3">
          In the beginning — nothing shone.
        </p>
      </motion.div>
    </div>
  )
}
