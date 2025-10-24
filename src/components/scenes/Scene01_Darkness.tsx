import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Scene01_Darkness() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.05} />
        <mesh>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial color="#000" side={THREE.BackSide} />
        </mesh>
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.7] }}
        transition={{ delay: 2, duration: 4 }}
        className="absolute top-1/2 left-1/2 text-center text-gray-400 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-3xl font-light tracking-widest">Był tylko oddech.</h1>
        <p className="text-sm italic mt-2">There was only breath.</p>
      </motion.div>
    </div>
  );
}
