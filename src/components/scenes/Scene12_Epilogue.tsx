import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Scene12_Epilogue() {
  const lightRef = useRef<THREE.AmbientLight>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const fade = Math.max(0, 1 - t * 0.08);
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = fade;
    }
    if (lightRef.current) {
      lightRef.current.intensity = fade * 0.5;
    }
  });

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight ref={lightRef} color="#101010" intensity={0.3} />
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="#000" emissive="#111" transparent opacity={1} />
        </mesh>
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 0.4, 0] }}
        transition={{ delay: 2, duration: 10 }}
        className="absolute top-1/2 left-1/2 text-center text-gray-200 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-thin tracking-widest">A potem — znów cisza.</h1>
        <p className="text-sm italic text-gray-400 mt-2">And then — silence again.</p>
      </motion.div>
    </div>
  );
}
