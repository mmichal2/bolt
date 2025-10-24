import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Scene02_LightBirth() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.3) * 2 + mouse.x * 2;
      lightRef.current.position.y = Math.cos(t * 0.2) * 1 + mouse.y * 1.5;
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight ref={lightRef} intensity={3} color="#8AB4FF" distance={20} />
        <mesh>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial color="#050B15" side={THREE.BackSide} />
        </mesh>
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute top-1/2 left-1/2 text-center text-white -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-4xl font-light tracking-wider">Światło jest pierwszą myślą.</h1>
        <p className="text-sm text-gray-400 mt-3 italic">Light is the first thought.</p>
      </motion.div>
    </div>
  );
}

