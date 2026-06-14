import { useState } from 'react';
import { VisionView } from './components/VisionView';
import { JourneyView } from './components/JourneyView';
import { ConnectView } from './components/ConnectView';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Video, Braces } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Vision' | 'Journey' | 'Connect'>('Vision');
  const [isNeuralActive, setIsNeuralActive] = useState<boolean>(true);
  const [isOpticActive, setIsOpticActive] = useState<boolean>(true);

  return (
    <div
      className="min-h-screen bg-background text-text-primary font-sans antialiased relative selection:bg-primary selection:text-on-primary overflow-x-hidden"
      id="cinematic-resume-viewport-core"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between min-h-screen relative z-10">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 border-b border-white/10 pb-5 mb-8" id="cinematic-res-header">
          <div className="flex flex-col text-left group cursor-pointer" onClick={() => setActiveTab('Vision')}>
            <span className="font-mono text-[10px] text-text-muted tracking-[0.1em] font-medium uppercase leading-none block select-none">
              SYS.NAV.ONLINE
            </span>
            <span className="font-display font-bold text-4xl tracking-tight text-neon-pink glow-pink leading-none mt-1 select-none">
              AC
            </span>
          </div>

          <nav className="flex items-center gap-6 md:gap-8 font-mono text-xs tracking-[0.1em] uppercase font-medium">
            {(['Vision', 'Journey', 'Connect'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-1 border-none bg-transparent outline-none cursor-pointer tracking-widest text-[11px] transition-colors ${
                    isActive ? 'text-neon-pink font-semibold' : 'text-text-muted hover:text-text-primary'
                  }`}
                  id={`nav-link-${tab.toLowerCase()}`}
                >
                  <span className="relative z-10">{tab}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline-active-overlay"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-pink shadow-[0_0_12px_rgba(255,45,149,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setActiveTab('Connect')}
            className="px-5 py-2 font-mono text-[10px] tracking-[0.1em] font-bold uppercase cursor-pointer transition-all duration-300 outline-none border border-white/30 text-text-primary hover:border-neon-pink hover:text-neon-pink active:translate-y-px"
            id="hire-me-top-button"
          >
            HIRE ME
          </button>
        </header>

        {/* MAIN */}
        <main className="flex-1" id="cinematic-res-views-portal">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              id={`transition-deck-${activeTab.toLowerCase()}`}
            >
              {activeTab === 'Vision' && (
                <VisionView
                  isNeuralActive={isNeuralActive}
                  setIsNeuralActive={setIsNeuralActive}
                  isOpticActive={isOpticActive}
                  setIsOpticActive={setIsOpticActive}
                />
              )}
              {activeTab === 'Journey' && <JourneyView />}
              {activeTab === 'Connect' && <ConnectView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 border-t border-white/10 pt-6 mt-10 text-[10px] text-text-muted tracking-[0.1em] font-mono" id="cinematic-res-footer">
          <span className="select-all">
            © 2024 AC Cinematic Arts. All rights reserved.
          </span>

          <div className="flex items-center gap-6 font-mono tracking-[0.1em] text-[10px] uppercase">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-neon-pink transition-colors"
              id="footer-instagram-link"
            >
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-neon-pink transition-colors"
              id="footer-vimeo-link"
            >
              <Video className="w-3.5 h-3.5" />
              Vimeo
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-neon-pink transition-colors"
              id="footer-behance-link"
            >
              <Braces className="w-3.5 h-3.5" />
              Behance
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
