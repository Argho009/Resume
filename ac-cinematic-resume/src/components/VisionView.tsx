import React, { useState, useEffect } from 'react';
import { HeroViewport } from './HeroViewport';
import { SystemLog } from '../types';
import { SYSTEM_LOGS_MOCKED } from '../data';
import { FolderOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface VisionViewProps {
  isNeuralActive: boolean;
  setIsNeuralActive: React.Dispatch<React.SetStateAction<boolean>>;
  isOpticActive: boolean;
  setIsOpticActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VisionView: React.FC<VisionViewProps> = ({
  isNeuralActive,
  setIsNeuralActive,
  isOpticActive,
  setIsOpticActive,
}) => {
  const [logs, setLogs] = useState<SystemLog[]>(SYSTEM_LOGS_MOCKED);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const feedLogs = setInterval(() => {
      const randomSentences = [
        'LOAD MODULE_ALPHA ... OK',
        'SYNC CHROMATIC_ABERRATION ... 98%',
        'RENDER LUNAR_SURFACE ... ACTIVE',
        'AWAITING USER INPUT_',
      ];
      const sentence = randomSentences[Math.floor(Math.random() * randomSentences.length)];
      setLogs((prev) => [
        ...prev.slice(-3),
        { id: String(Date.now()), text: sentence, status: 'OK', timestamp: '' },
      ]);
    }, 5000);
    return () => clearInterval(feedLogs);
  }, []);

  return (
    <div className="space-y-0" id="vision-view-main-container">
      {/* Hero viewport with HUD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-0"
        id="cyberp-hud-canvas-enclosure"
      >
        <HeroViewport
          isNeuralActive={isNeuralActive}
          isOpticActive={isOpticActive}
        />
      </motion.div>

      {/* Two-column control deck — matches mockup */}
      <div
        className="grid grid-cols-1 md:grid-cols-5 border border-white/10 border-t-0"
        id="vision-split-control-deck"
      >
        {/* SYSTEM LOG_01 — left, wider */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          id="system-log-terminal-station"
          className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between gap-6"
        >
          <div className="space-y-3">
            <h3 className="text-sm font-sans tracking-widest text-neon-pink font-medium uppercase inline-flex items-center gap-2">
              <FolderOpen className="w-3.5 h-3.5" />
              SYSTEM LOG_01
            </h3>
            <p className="text-xs text-text-muted leading-relaxed font-sans max-w-xl">
              Initializing creative sequences. The fusion of organic nocturne elements with
              structured data frameworks yields a high-fidelity visual output. Monitoring
              aesthetic resonance parameters...
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsNeuralActive(!isNeuralActive)}
              className={`px-3 py-1 text-[10px] font-mono tracking-widest rounded-full transition-all border outline-none cursor-pointer duration-300 ${
                isNeuralActive
                  ? 'border-neon-pink text-neon-pink bg-neon-pink/10'
                  : 'border-white/10 text-text-muted hover:text-text-primary'
              }`}
            >
              NEURAL INTERFACE
            </button>
            <button
              onClick={() => setIsOpticActive(!isOpticActive)}
              className={`px-3 py-1 text-[10px] font-mono tracking-widest rounded-full transition-all border outline-none cursor-pointer duration-300 ${
                isOpticActive
                  ? 'border-neon-pink text-neon-pink bg-neon-pink/10'
                  : 'border-white/10 text-text-muted hover:text-text-primary'
              }`}
            >
              OPTIC RENDER
            </button>
          </div>
        </motion.div>

        {/* DATA STREAM — right */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          id="data-stream-terminal-substation"
          className="md:col-span-2 p-5 flex flex-col"
        >
          <span className="text-[10px] font-mono tracking-widest text-text-muted font-medium uppercase block mb-4">
            DATA STREAM
          </span>

          <div className="font-mono text-[10px] leading-relaxed space-y-1.5 text-neon-cyan flex-1">
            {logs.map((log) => (
              <div key={log.id}>
                &gt; {log.text}
                {log.text.includes('AWAITING') && (
                  <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>_</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
