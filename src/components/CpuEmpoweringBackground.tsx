import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Cpu, Flame, Zap } from 'lucide-react';

interface CpuEmpoweringBackgroundProps {
  turboMode?: boolean;
  onToggleTurbo?: () => void;
}

interface TouchPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  speed: number;
}

interface SparkLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  segments: { x: number; y: number }[];
  progress: number;
  alpha: number;
  color: string;
}

interface TouchParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  text: string;
  color: string;
  size: number;
}

export const CpuEmpoweringBackground: React.FC<CpuEmpoweringBackgroundProps> = ({
  turboMode = false,
  onToggleTurbo,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFrequency, setActiveFrequency] = useState(turboMode ? '5.85 GHz' : '3.60 GHz');
  const [coreLoads, setCoreLoads] = useState<number[]>([12, 18, 14, 22, 19, 15, 24, 11, 13, 20, 16, 21, 18, 14, 23, 10]);
  const [temperature, setTemperature] = useState(turboMode ? 52 : 36);
  const [isEmpowering, setIsEmpowering] = useState(false);
  const [lastTouchCoord, setLastTouchCoord] = useState<{ x: number; y: number } | null>(null);

  // Active touch references for canvas loop
  const touchPulsesRef = useRef<TouchPulse[]>([]);
  const sparkLinesRef = useRef<SparkLine[]>([]);
  const touchParticlesRef = useRef<TouchParticle[]>([]);
  const activeTouchPointsRef = useRef<{ x: number; y: number }[]>([]);
  const isInteractingRef = useRef<boolean>(false);
  const decayTimerRef = useRef<number | null>(null);

  // Update frequency and temperature on turbo toggle
  useEffect(() => {
    if (turboMode) {
      setActiveFrequency('5.85 GHz');
      setTemperature(58);
    } else {
      setActiveFrequency('3.60 GHz');
      setTemperature(38);
    }
  }, [turboMode]);

  // Core loads response: high during interaction, low/resting when idle
  useEffect(() => {
    const interval = setInterval(() => {
      setCoreLoads((prev) =>
        prev.map(() => {
          if (isEmpowering || turboMode) {
            const base = turboMode ? 82 : 68;
            const jitter = (Math.random() - 0.5) * 20;
            return Math.min(99, Math.max(30, Math.round(base + jitter)));
          } else {
            // Resting state
            const base = 16;
            const jitter = (Math.random() - 0.5) * 8;
            return Math.min(35, Math.max(5, Math.round(base + jitter)));
          }
        })
      );

      if (isEmpowering) {
        setTemperature((prev) => Math.min(65, prev + 1));
      } else if (!turboMode) {
        setTemperature((prev) => Math.max(36, prev - 1));
      }
    }, 600);
    return () => clearInterval(interval);
  }, [isEmpowering, turboMode]);

  // Trigger electric pulse & circuit branch from mouse pointer (Desktop Only)
  const triggerTouchEnergy = useCallback((x: number, y: number) => {
    // CRITICAL: Disable touch physics animation on mobile / touch viewports
    if (typeof window !== 'undefined' && (window.innerWidth < 1024 || ('ontouchstart' in window))) {
      return;
    }

    isInteractingRef.current = true;
    setIsEmpowering(true);
    setLastTouchCoord({ x, y });

    if (decayTimerRef.current) {
      window.clearTimeout(decayTimerRef.current);
    }
    // Fade back to resting mode 1.8 seconds after last interaction
    decayTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
      setIsEmpowering(false);
    }, 1800);

    const colors = turboMode
      ? ['#ff0055', '#ff4d00', '#ff007f', '#f43f5e']
      : ['#00f0ff', '#38bdf8', '#00e5ff', '#a855f7'];

    // 1. Add expanding shockwave ripples at touch location
    touchPulsesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: Math.min(window.innerWidth, window.innerHeight) * 0.45,
      alpha: 1.0,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: turboMode ? 9 : 6,
    });

    // 2. Generate electric lightning circuit arcs branching outward
    const branches = turboMode ? 10 : 6;
    for (let i = 0; i < branches; i++) {
      const angle = (i / branches) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const length = 80 + Math.random() * 160;
      const midDist = length * 0.5;

      const p1x = x + Math.cos(angle) * (midDist * 0.6);
      const p1y = y + Math.sin(angle) * (midDist * 0.6);

      const turnAngle = angle + ((i % 2 === 0 ? 1 : -1) * Math.PI) / 4;
      const p2x = p1x + Math.cos(turnAngle) * (midDist * 0.8);
      const p2y = p1y + Math.sin(turnAngle) * (midDist * 0.8);

      const endX = p2x + Math.cos(angle) * (length * 0.5);
      const endY = p2y + Math.sin(angle) * (length * 0.5);

      sparkLinesRef.current.push({
        startX: x,
        startY: y,
        endX,
        endY,
        segments: [
          { x, y },
          { x: p1x, y: p1y },
          { x: p2x, y: p2y },
          { x: endX, y: endY },
        ],
        progress: 0,
        alpha: 1.0,
        color: colors[i % colors.length],
      });
    }

    // 3. Emit cyber binary/hex burst particles from touch location
    const hexChars = ['0', '1', 'F', 'A', 'E', '7', 'C', 'X'];
    for (let p = 0; p < 12; p++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      touchParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        text: hexChars[Math.floor(Math.random() * hexChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 4) + 10,
      });
    }
  }, [turboMode]);

  // Handle pointer interactions (Desktop Mouse Clicks only)
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Only for fine mouse pointers
      if (e.pointerType === 'touch') return;
      triggerTouchEnergy(e.clientX, e.clientY);
      activeTouchPointsRef.current = [{ x: e.clientX, y: e.clientY }];
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (e.buttons > 0) {
        triggerTouchEnergy(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = () => {
      activeTouchPointsRef.current = [];
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (decayTimerRef.current) {
        window.clearTimeout(decayTimerRef.current);
      }
    };
  }, [triggerTouchEnergy]);

  // Canvas Animation Frame Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Ambient floating grid particles
    const ambientParticles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const ambientCount = 35;
    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render Ambient Particle Constellation
      ctx.fillStyle = turboMode ? 'rgba(255, 0, 85, 0.6)' : 'rgba(0, 240, 255, 0.4)';
      ambientParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Touch Shockwave Ripples (Desktop)
      for (let i = touchPulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = touchPulsesRef.current[i];
        pulse.radius += pulse.speed;
        pulse.alpha -= 0.016;

        if (pulse.alpha <= 0 || pulse.radius >= pulse.maxRadius) {
          touchPulsesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.color;
        ctx.globalAlpha = Math.max(0, pulse.alpha);
        ctx.lineWidth = Math.max(1, 4 * (1 - pulse.radius / pulse.maxRadius));
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw Lightning Spark Lines (Desktop)
      for (let i = sparkLinesRef.current.length - 1; i >= 0; i--) {
        const spark = sparkLinesRef.current[i];
        spark.progress += 0.06;
        spark.alpha -= 0.02;

        if (spark.alpha <= 0 || spark.progress >= 1) {
          sparkLinesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = spark.color;
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(spark.segments[0].x, spark.segments[0].y);
        for (let s = 1; s < spark.segments.length; s++) {
          ctx.lineTo(spark.segments[s].x, spark.segments[s].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw Binary / Hex Particles (Desktop)
      for (let i = touchParticlesRef.current.length - 1; i >= 0; i--) {
        const tp = touchParticlesRef.current[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha -= 0.02;

        if (tp.alpha <= 0) {
          touchParticlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = `${tp.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = tp.color;
        ctx.globalAlpha = Math.max(0, tp.alpha);
        ctx.shadowColor = tp.color;
        ctx.shadowBlur = 8;
        ctx.fillText(tp.text, tp.x, tp.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [turboMode, lastTouchCoord]);

  const [hudMinimized, setHudMinimized] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Centered Sleek Bottom Telemetry Dock (Visible on Tablets & Desktops) */}
      <div className="hidden sm:flex pointer-events-auto fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 items-center justify-center max-w-[95vw]">
        {hudMinimized ? (
          <button
            onClick={() => setHudMinimized(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060a14]/90 backdrop-blur-2xl border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:border-cyan-400 cursor-pointer transition-all hover:scale-105"
            title="Open Kernel Scheduler HUD"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold">KERNEL SCHEDULER</span>
            <span className="text-[10px] text-slate-400">({temperature}°C)</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#060a14]/90 backdrop-blur-2xl border border-cyan-500/30 text-xs font-mono text-slate-300 shadow-[0_0_30px_rgba(0,240,255,0.18)] hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.28)] transition-all">
            {/* Header chip */}
            <div className="flex items-center gap-2 pr-2.5 sm:pr-3.5 border-r border-slate-800 flex-shrink-0">
              <div className="relative">
                <Cpu className={`w-4 h-4 flex-shrink-0 ${isEmpowering || turboMode ? 'text-cyan-400 animate-spin' : 'text-cyan-400'}`} />
                {isEmpowering && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <div>
                <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider leading-none">
                  KERNEL SCHEDULER
                </div>
                <div className="font-bold text-white text-[10px] sm:text-[11px] whitespace-nowrap leading-tight mt-0.5">
                  {isEmpowering ? '⚡ TOUCH ENERGIZED' : '16-CORE CPU DIE'}
                </div>
              </div>
            </div>

            {/* 16 Hyperthreaded Core Micro-Meters */}
            <div className="hidden sm:grid grid-cols-16 gap-0.5 sm:gap-1 items-end">
              {coreLoads.map((load, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5" title={`Core #${i}: ${load}% load`}>
                  <div className="w-1 sm:w-1.5 h-4 sm:h-5 bg-slate-900/90 rounded-sm overflow-hidden flex flex-col justify-end">
                    <div
                      className={`w-full transition-all duration-300 rounded-sm ${
                        load > 75
                          ? 'bg-rose-500 shadow-[0_0_6px_#ff0055]'
                          : load > 40
                          ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]'
                          : 'bg-slate-700'
                      }`}
                      style={{ height: `${load}%` }}
                    />
                  </div>
                  <span className="text-[7px] text-slate-500 leading-none">{i}</span>
                </div>
              ))}
            </div>

            {/* Core Temperature & Interaction Status */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-800 text-[10px] sm:text-[11px] flex-shrink-0">
              <div>
                <span className="text-slate-500 text-[8px] block uppercase leading-none">TEMP</span>
                <span className={`font-bold whitespace-nowrap leading-none ${temperature > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {temperature}°C
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-slate-500 text-[8px] block uppercase leading-none">INTERACTION</span>
                <span className={`font-bold whitespace-nowrap leading-none ${isEmpowering ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {isEmpowering ? 'TOUCH ACTIVE' : 'STANDBY'}
                </span>
              </div>

              {/* Minimize HUD button */}
              <button
                onClick={() => setHudMinimized(true)}
                className="p-1 rounded-full text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                title="Minimize HUD"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
