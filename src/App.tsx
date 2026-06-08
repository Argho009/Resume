import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/canvas/Scene';
import Overlay from './components/ui/Overlay';
import NavigationControls from './components/ui/NavigationControls';

export type ViewState = 'home' | 'personal' | 'internship' | 'projects' | 'project-detail';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState, projectId?: string) => {
    setCurrentView(view);
    if (projectId) {
      setSelectedProjectId(projectId);
    } else if (view !== 'project-detail') {
      setSelectedProjectId(null);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 overflow-hidden relative font-sans text-slate-100">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene currentView={currentView} onNavigate={handleNavigate} />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading Overlay */}
      <Suspense fallback={
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900 text-white">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blossom-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-medium text-blossom-100">Loading Environment...</h2>
          </div>
        </div>
      }>
        <div />
      </Suspense>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Overlay currentView={currentView} selectedProjectId={selectedProjectId} onNavigate={handleNavigate} />
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <NavigationControls currentView={currentView} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default App;
