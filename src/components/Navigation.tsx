interface NavigationProps {
  scene: number;
  nextScene: () => void;
}

export default function Navigation({ scene, nextScene }: NavigationProps) {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer text-sm select-none hover:text-gray-300 transition-colors"
      onClick={nextScene}
    >
      {scene < 12 ? 'kliknij, aby kontynuować' : ''}
    </div>
  );
}
