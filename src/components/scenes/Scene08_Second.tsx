import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function PulsingLight({ paused }: { paused: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!paused && lightRef.current) {
      const intensity = 1.5 + Math.sin(t * 2) * 2.5
      lightRef.current.intensity = intensity
      lightRef.current.color.setHSL(0.6, 0.2, 1.0)
    }
  })

  return <pointLight ref={lightRef} color="#FFFFFF" intensity={3} distance={10} />
}

export default function Scene08_Second() {
  const [paused] = useState(false)

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000']} />
        <PulsingLight paused={paused} />
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.6] }}
        transition={{ delay: 2, duration: 5 }}
        className="absolute top-1/2 left-1/2 text-center text-white -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-5xl font-thin tracking-wider">
          23:59:59 — ostatnia sekunda roku.
        </h1>
        <p className="text-gray-300 italic mt-3">
          23:59:59 — the last second of the year.
        </p>
      </motion.div>
    </div>
  )
}
