import React, { useState, useEffect } from 'react';

interface HeroViewportProps {
  isNeuralActive: boolean;
  isOpticActive: boolean;
}

export const HeroViewport: React.FC<HeroViewportProps> = ({
  isNeuralActive,
  isOpticActive,
}) => {
  const [timestamp, setTimestamp] = useState('00:00:00:00:00');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      const frac = String(Math.floor(Math.random() * 90 + 10)).padStart(2, '0');
      setTimestamp(
        `${now.toTimeString().slice(0, 8)}:${ms}:${frac}`
      );
    };
    tick();
    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden border border-white/10 aspect-[16/9] min-h-[320px] bg-black"
      id="hud-hero-viewport"
    >
      <img
        src="/hero-sakura-moon.png"
        alt="Cherry blossom island under a luminous moon"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scanline overlay */}
      {isOpticActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }}
        />
      )}

      {/* Grid overlay */}
      {isOpticActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,45,149,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,149,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* CRT vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.45)_100%)]" />

      {/* HUD telemetry */}
      <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between select-none font-mono text-[9px] tracking-widest text-slate-500">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5 text-left">
            <div>LAT: {isNeuralActive ? '35.6895° N' : '35.7012° N'}</div>
            <div>LON: {isNeuralActive ? '139.6917° E' : '139.7344° E'}</div>
            <div>ATM: {isNeuralActive ? '1013.2 HPA' : '1009.6 HPA'}</div>
          </div>
          <div className="text-right space-y-0.5">
            <div className="text-rose-500 font-semibold flex items-center justify-end gap-1.5">
              REC <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div>LUM: OPTIMAL</div>
            <div className="text-neon-pink">TARGET ACQUIRED</div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-lg font-light">
          +
        </div>

        <div className="flex justify-between items-end">
          <div className="text-left">
            <div>V 2.0.4 &nbsp; SYS_CORE: STABLE</div>
          </div>
          <div className="text-right text-slate-400 text-[10px] tracking-normal">
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
