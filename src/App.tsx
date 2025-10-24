import React, { useState, useEffect } from 'react';
import Scene01_Darkness from './components/scenes/Scene01_Darkness';
import Scene02_LightBirth from './components/scenes/Scene02_LightBirth';
import Scene03_MatterBirth from './components/scenes/Scene03_MatterBirth';
import Scene04_Planet from './components/scenes/Scene04_Planet';
import Scene05_Life from './components/scenes/Scene05_Life';
import Scene06_Time from './components/scenes/Scene06_Time';
import Scene07_Human from './components/scenes/Scene07_Human';
import Scene08_Second from './components/scenes/Scene08_Second';
import Scene09_Fade from './components/scenes/Scene09_Fade';
import Scene10_Reflection from './components/scenes/Scene10_Reflection';
import Scene11_Silence from './components/scenes/Scene11_Silence';
import Scene12_Epilogue from './components/scenes/Scene12_Epilogue';
import Navigation from './components/Navigation';
import SceneTransition from './components/SceneTransition';

export default function App() {
  const [scene, setScene] = useState(1);

  const nextScene = () => {
    setScene((prev) => (prev < 12 ? prev + 1 : 12));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextScene();
      } else if (e.key === 'ArrowLeft' && scene > 1) {
        setScene((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scene]);

  const scenes: Record<number, React.ReactElement> = {
    1: <Scene01_Darkness />,
    2: <Scene02_LightBirth />,
    3: <Scene03_MatterBirth />,
    4: <Scene04_Planet />,
    5: <Scene05_Life />,
    6: <Scene06_Time />,
    7: <Scene07_Human />,
    8: <Scene08_Second />,
    9: <Scene09_Fade />,
    10: <Scene10_Reflection />,
    11: <Scene11_Silence />,
    12: <Scene12_Epilogue />,
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <SceneTransition scene={scene} />
      {scenes[scene]}
      <Navigation scene={scene} nextScene={nextScene} />
      <div className="absolute top-4 right-4 text-gray-600 text-xs">
        {scene} / 12
      </div>
    </div>
  );
}
