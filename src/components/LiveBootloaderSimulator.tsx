import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MetallicLogo } from './MetallicLogo';
import {
  Terminal,
  Cpu,
  Monitor,
  Smartphone,
  Layers,
  RotateCcw,
  Power,
  Play,
  CheckCircle2,
  HardDrive,
  Activity,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  Shield,
  Zap,
  Folder,
  Settings,
  X,
  Minus
} from 'lucide-react';

interface LiveBootloaderSimulatorProps {
  onOpenDownload?: () => void;
}

export const LiveBootloaderSimulator: React.FC<LiveBootloaderSimulatorProps> = ({
  onOpenDownload,
}) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [bootState, setBootState] = useState<'grub' | 'animating' | 'desktop'>('grub');
  const [countdown, setCountdown] = useState<number>(5);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [activeDesktopApp, setActiveDesktopApp] = useState<'terminal' | 'waydroid' | 'wine' | 'stats' | null>('stats');
  const [bootLogLines, setBootLogLines] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const menuItems = [
    {
      id: 0,
      label: '1. 🐧 BOOT RITESH PC OS (Live UEFI 64-bit)',
      badge: 'RECOMMENDED',
      desc: 'Debian 12 + Linux 6.12 64-bit live kernel with persistent NVMe overlay',
      mode: 'Standard Live OS',
    },
    {
      id: 1,
      label: '2. ⚡ DIRECT RAM BOOT (SSD to RAM - Toram Fast Mode)',
      badge: 'ULTRA SPEED',
      desc: 'Loads entire OS into RAM for 15GB/s read/write zero-lag execution',
      mode: 'Toram Memory Mode',
    },
    {
      id: 2,
      label: '3. 🤖 DIRECT ANDROID WAYDROID SUBSYSTEM',
      badge: 'GPU ACCEL',
      desc: 'Boots directly into LXC container with direct GPU hardware acceleration',
      mode: 'Android Waydroid',
    },
    {
      id: 3,
      label: '4. 🪟 WINDOWS WINE / BOTTLES PRODUCTIVITY ENGINE',
      badge: 'DXVK 2.3',
      desc: 'Seamless Windows app runtime environment preconfigured with gaming prefixes',
      mode: 'Windows Compatibility',
    },
    {
      id: 4,
      label: '5. 🛡️ UEFI BIOS NVRAM & MASTER RECOVERY SUITE',
      badge: 'IMMUTABLE',
      desc: 'Chattr +i protected boot manager & SSD health diagnostic toolkit',
      mode: 'Hardware Recovery',
    },
  ];

  // Beep synthesis using Web Audio API for cyber boot sounds
  const playCyberSound = useCallback((type: 'beep' | 'select' | 'boot' | 'launch') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'boot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  }, [soundEnabled]);

  // Handle keyboard navigation for authentic GRUB experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bootState !== 'grub') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedOption((prev) => (prev + 1) % menuItems.length);
        setIsCounting(false);
        playCyberSound('select');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedOption((prev) => (prev - 1 + menuItems.length) % menuItems.length);
        setIsCounting(false);
        playCyberSound('select');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        startBootProcess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootState, menuItems.length, playCyberSound]);

  // Countdown timer in GRUB
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bootState === 'grub' && isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (bootState === 'grub' && isCounting && countdown === 0) {
      startBootProcess();
    }
    return () => clearTimeout(timer);
  }, [bootState, isCounting, countdown]);

  const startBootProcess = () => {
    playCyberSound('boot');
    setBootState('animating');
    setBootLogLines([]);

    const logs = [
      '[  OK  ] UEFI Secure Init: /EFI/RITESH-PC-OS/BOOTX64.EFI verified',
      '[  OK  ] Loading Linux Kernel 6.12.0-custom-deb12-x86_64 ...',
      '[  OK  ] Loading Initial Ramdisk /initrd.img-6.12-ritesh ...',
      '[  OK  ] Initializing Zstandard Live Overlay (Decompressed 4.2GB in 1.4s)',
      '[  OK  ] Mounting NVMe SSD Persistence /live/persistence [chattr +i enabled]',
      '[  OK  ] Waydroid Subsystem: Binder IPC and Hardware GPU acceleration ready',
      '[  OK  ] Wine / Proton 9.0 Compatibility Layer: Direct3D 12 -> Vulkan (DXVK 2.3)',
      '[  OK  ] Starting 4K Frosted Glass Compositor (Picom / Wayland-Hybrid)...',
      '[  OK  ] RITESH PC OS Desktop Ready in 7.42 Seconds. Welcome, Riteshguru!',
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLogLines((prev) => [...prev, log]);
      }, (index + 1) * 600);
    });

    setTimeout(() => {
      setBootState('desktop');
    }, 6200);
  };

  const resetToGrub = () => {
    setBootState('grub');
    setCountdown(5);
    setIsCounting(false);
  };

  return (
    <div
      id="bootloader-simulator"
      className={`relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#040609] shadow-2xl transition-all duration-500 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'max-w-6xl mx-auto my-8'
      }`}
    >
      {/* Interactive Cyber HUD Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#080d18] border-b border-cyan-500/20 text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="font-cyber font-bold tracking-wider text-slate-200">
            SIMULATED UEFI 64-BIT HARDWARE ENGINE
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300">
            BIOS NVRAM PRIORITY #1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-colors"
            title={soundEnabled ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Screen Container */}
      <div className="relative aspect-[16/9] min-h-[500px] max-h-[720px] w-full overflow-hidden bg-black cyber-grid">
        {/* Subtle Scanlines overlay */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none z-20" />

        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* VIEW 1: GRUB BOOTLOADER (Exact match to preview_homescreen_5) */}
          {/* ============================================================ */}
          {bootState === 'grub' && (
            <motion.div
              key="grub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8"
            >
              {/* Background Concentric Rings and 3D metallic Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85">
                <MetallicLogo size={460} glowColor="crimson" />
              </div>

              {/* GRUB Top Title Glass Badge */}
              <div className="relative z-10 mb-6">
                <div className="px-8 py-2 rounded-xl bg-[#090e18]/80 backdrop-blur-md border border-slate-600/60 shadow-lg text-center">
                  <h2 className="font-cyber font-extrabold text-xl sm:text-2xl text-white tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                    RITESH PC OS
                  </h2>
                </div>
              </div>

              {/* Main GRUB Selection Glass Card */}
              <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#0b101d]/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 sm:p-8">
                {/* Menu items */}
                <div className="space-y-3 font-mono text-sm sm:text-base">
                  {menuItems.map((item, index) => {
                    const isSelected = selectedOption === index;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedOption(index);
                          setIsCounting(false);
                          playCyberSound('select');
                        }}
                        onDoubleClick={startBootProcess}
                        className={`group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-rose-950/40 border border-rose-500/80 shadow-[0_0_20px_rgba(255,0,85,0.35)] text-white'
                            : 'bg-slate-900/40 border border-transparent hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isSelected ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-mono hidden md:inline-block ${
                              isSelected
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                          {isSelected && (
                            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Technical details of selected menu item */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <div>
                    <span className="text-cyan-400 font-bold">INFO:</span>{' '}
                    {menuItems[selectedOption].desc}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Use ↑ / ↓ to navigate, Enter to Boot</span>
                  </div>
                </div>
              </div>

              {/* Bottom Countdown & Instant Trigger */}
              <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
                <div className="text-sm font-mono text-slate-300 flex items-center gap-2">
                  <span>Booting in</span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/60 font-bold text-rose-400">
                    {countdown}
                  </span>
                  <span>seconds</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={startBootProcess}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-cyber font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    BOOT NOW [ENTER]
                  </button>

                  <button
                    onClick={() => {
                      setIsCounting(!isCounting);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-xs font-mono text-slate-300 transition-colors"
                  >
                    {isCounting ? 'Pause Timer' : 'Resume Auto-Boot'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* VIEW 2: 7-SECOND CINEMATIC FAST BOOT SEQUENCE               */}
          {/* ============================================================ */}
          {bootState === 'animating' && (
            <motion.div
              key="animating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#040609] p-6 flex flex-col justify-between"
            >
              {/* Boot Header & Pulsing Logo */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-4">
                  <MetallicLogo size={52} glowColor="cyan" interactive={false} />
                  <div>
                    <h3 className="font-cyber font-bold text-lg text-cyan-400">
                      RITESH PC OS v2.0 // FAST KERNEL INIT
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Debian 12 Bookworm Core • Linux 6.12.0-x86_64 • UEFI Dual-Mode
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right font-mono text-xs text-slate-400">
                    <div>SPEED: <span className="text-cyan-400 font-bold">15.2 GB/s</span></div>
                    <div>STATUS: <span className="text-emerald-400 font-bold">HYPER-THREADED</span></div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                </div>
              </div>

              {/* Live Terminal Stream of Boot Logs */}
              <div className="flex-1 my-4 p-4 rounded-xl bg-black/70 border border-cyan-500/20 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-y-auto space-y-1.5">
                {bootLogLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{line}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar & Splash Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Launching 4K Frosted Glass Workspace...</span>
                  <span className="text-cyan-400 font-bold">7.42s LIVE BENCHMARK</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-rose-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.8, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* VIEW 3: LIVE 4K CYBERNETIC DESKTOP EXPERIENCE               */}
          {/* ============================================================ */}
          {bootState === 'desktop' && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#070b14] flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(4, 6, 9, 0.95) 75%)',
              }}
            >
              {/* Desktop Wallpaper Center Emblem */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <MetallicLogo size={360} glowColor="dual" />
              </div>

              {/* Desktop Top Status Bar */}
              <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-[#0a101f]/70 backdrop-blur-md border-b border-cyan-500/20 text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span className="font-cyber font-bold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    RITESH PC OS LIVE
                  </span>
                  <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      🐧 Linux 6.12
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      🤖 Waydroid APK Ready
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
                      🪟 Wine 9.0 Loaded
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-400 font-bold">RAM: 1.1 / 16 GB</span>
                  <span className="text-slate-600">|</span>
                  <span>CPU: 3%</span>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={resetToGrub}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restart GRUB
                  </button>
                </div>
              </div>

              {/* Desktop Main Workspace / Windows */}
              <div className="relative z-10 flex-1 p-4 flex items-center justify-center">
                {/* Simulated Window: System Monitor */}
                {activeDesktopApp === 'stats' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl rounded-xl bg-[#090f1d]/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-cyan-500/20 text-xs font-mono">
                      <span className="text-cyan-400 font-bold flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5" />
                        Live Kernel Telemetry & Subsystem Hub
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 cursor-pointer" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 cursor-pointer" />
                        <span
                          onClick={() => setActiveDesktopApp(null)}
                          className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                        <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-cyan-400" />
                          Kernel Engine
                        </div>
                        <div className="text-base font-bold text-white">Linux 6.12-x64</div>
                        <div className="text-[10px] text-cyan-400 mt-1">Debian 12 Bookworm</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                        <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-emerald-400" />
                          Android Subsystem
                        </div>
                        <div className="text-base font-bold text-emerald-400">Waydroid 13</div>
                        <div className="text-[10px] text-slate-400 mt-1">Direct GPU Passthrough</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                        <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-blue-400" />
                          Windows Engine
                        </div>
                        <div className="text-base font-bold text-blue-400">Bottles / Wine 9</div>
                        <div className="text-[10px] text-slate-400 mt-1">DXVK 2.3 + VKD3D</div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 flex flex-wrap gap-2 justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">
                        Zero bloatware • Toram ultra-fast execution mode active
                      </span>
                      {onOpenDownload && (
                        <button
                          onClick={onOpenDownload}
                          className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs tracking-wider transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                        >
                          Download ISO (v2.0)
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Simulated Window: Waydroid APK Android Store */}
                {activeDesktopApp === 'waydroid' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl rounded-xl bg-[#091515]/90 backdrop-blur-xl border border-emerald-500/40 shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-emerald-950/80 border-b border-emerald-500/30 text-xs font-mono">
                      <span className="text-emerald-300 font-bold flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5" />
                        Waydroid Android 13 Hardware Subsystem
                      </span>
                      <button onClick={() => setActiveDesktopApp(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 font-mono text-xs">
                      <p className="text-slate-300">
                        Run any Android APK natively alongside Linux apps without emulation overhead!
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['WhatsApp', 'Call of Duty', 'Termux Mobile', 'CapCut Pro'].map((app) => (
                          <div key={app} className="p-2.5 rounded bg-black/60 border border-emerald-500/20 text-center">
                            <div className="text-xs font-bold text-emerald-300">{app}</div>
                            <span className="text-[10px] text-slate-400">60 FPS Native</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Simulated Window: Wine / Bottles Engine */}
                {activeDesktopApp === 'wine' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl rounded-xl bg-[#0d1326]/90 backdrop-blur-xl border border-blue-500/40 shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-blue-950/80 border-b border-blue-500/30 text-xs font-mono">
                      <span className="text-blue-300 font-bold flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        Windows 11 Compatibility Matrix (Bottles / Wine 9.0)
                      </span>
                      <button onClick={() => setActiveDesktopApp(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 font-mono text-xs">
                      <p className="text-slate-300">
                        Execute Windows .EXE & .MSI installers with 1-click DXVK 2.3 DirectX acceleration:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['Adobe Photoshop', 'GTA V / Steam', 'AutoCAD 2024', 'FL Studio 21', 'MS Office 365', 'Visual Studio'].map((prog) => (
                          <div key={prog} className="p-2.5 rounded bg-black/60 border border-blue-500/20">
                            <div className="font-bold text-blue-300">{prog}</div>
                            <span className="text-[10px] text-emerald-400">● 100% Tested Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Desktop Bottom Cyber Dock */}
              <div className="relative z-10 p-3 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#090f1d]/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                  <button
                    onClick={() => setActiveDesktopApp('stats')}
                    className={`p-2 rounded-xl transition-all ${
                      activeDesktopApp === 'stats'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                        : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
                    }`}
                    title="System Status"
                  >
                    <Activity className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveDesktopApp('waydroid')}
                    className={`p-2 rounded-xl transition-all ${
                      activeDesktopApp === 'waydroid'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800'
                    }`}
                    title="Android Waydroid"
                  >
                    <Smartphone className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveDesktopApp('wine')}
                    className={`p-2 rounded-xl transition-all ${
                      activeDesktopApp === 'wine'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        : 'text-slate-400 hover:text-blue-300 hover:bg-slate-800'
                    }`}
                    title="Windows Bottles Engine"
                  >
                    <Layers className="w-5 h-5" />
                  </button>

                  <div className="w-px h-6 bg-slate-700 mx-1" />

                  <button
                    onClick={resetToGrub}
                    className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/50 transition-colors"
                    title="Power Off / Reboot to GRUB"
                  >
                    <Power className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulator Bottom Controls & Quick Key Hint */}
      <div className="px-4 py-3 bg-[#060910] border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
            Interactive Live Sandbox
          </span>
          <span>Click menu options or use keyboard arrows to test live boot</span>
        </div>
        <div className="flex items-center gap-4 text-cyan-400">
          <span>7s Instant Video Splash</span>
          <span>•</span>
          <span>Immutable BIOS NVRAM</span>
        </div>
      </div>
    </div>
  );
};
