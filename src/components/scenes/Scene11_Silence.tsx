import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Scene11_Silence() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.AmbientLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const intensity = 0.5 + Math.sin(t * 0.2) * 0.2;
      meshRef.current.material.emissiveIntensity = intensity;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(t * 0.1) * 0.3;
    }
  });

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight ref={lightRef} color="#6CA7FF" intensity={1} />
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            emissive="#4B73C8"
            emissiveIntensity={0.5}
            color="#0A0F1F"
            roughness={1}
            metalness={0}
          />
        </mesh>
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 0.3, 0] }}
        transition={{ delay: 3, duration: 12 }}
        className="absolute top-1/2 left-1/2 text-center text-blue-100 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-thin tracking-widest">
          Cisza nie jest końcem. To miejsce, z którego wszystko wraca.
        </h1>
        <p className="text-sm italic text-blue-200 mt-2">
          Silence is not the end. It's where everything begins again.
        </p>
      </motion.div>
    </div>
  );
}
