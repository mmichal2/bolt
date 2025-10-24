import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function FadingParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      if (ref.current.material instanceof THREE.PointsMaterial) {
        ref.current.material.opacity = Math.max(0, 0.9 - t * 0.05);
      }
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FFA97A"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene09_Fade() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const fade = Math.max(0, 1 - t * 0.05);
    if (lightRef.current) {
      lightRef.current.intensity = 3 * fade;
      lightRef.current.color.setHSL(0.07 + t * 0.01, 0.6, 0.6);
    }
  });

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={0.1} />
        <pointLight ref={lightRef} color="#FFB080" distance={15} />
        <FadingParticles />
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 0.2, 0] }}
        transition={{ delay: 2, duration: 10 }}
        className="absolute top-1/2 left-1/2 text-center text-orange-100 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-light tracking-widest">
          Wszystko wraca do światła, z którego przyszło.
        </h1>
        <p className="text-sm italic mt-2 text-orange-200">
          Everything returns to the light it came from.
        </p>
      </motion.div>
    </div>
  );
}
