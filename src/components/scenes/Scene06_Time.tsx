import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function SpiralParticles({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 8000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = i * 0.05;
      const radius = 0.1 + i * 0.0005;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.2 + mouse.x * 0.3;
      ref.current.rotation.z = t * 0.05;
      ref.current.position.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8ABFFF"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene06_Time() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + Math.sin(t * 5) * 0.6;
      lightRef.current.position.x = Math.sin(t * 0.5) * 3;
    }
  });

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
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight ref={lightRef} color="#8ABFFF" distance={20} />
        <SpiralParticles mouse={mouse} />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 text-center text-blue-200 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-4xl font-light tracking-widest">
          Czas nie płynie. To my przez niego.
        </h1>
        <p className="text-sm italic text-blue-400 mt-2">
          Time doesn't flow. We move through it.
        </p>
      </motion.div>
    </div>
  );
}
