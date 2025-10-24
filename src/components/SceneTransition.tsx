import { motion } from 'framer-motion';

interface SceneTransitionProps {
  scene: number;
}

export default function SceneTransition({ scene }: SceneTransitionProps) {
  return (
    <motion.div
      key={scene}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute w-full h-full bg-black z-50 pointer-events-none"
    />
  );
}
