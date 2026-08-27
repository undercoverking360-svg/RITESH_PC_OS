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
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'beep') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Handle keyboard navigation for authentic GRUB experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bootState !== 'grub') return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedOption((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
        setIsCounting(false);
        playCyberSound('select');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedOption((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
        setIsCounting(false);
        playCyberSound('select');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        startBootProcess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootState, playCyberSound, menuItems.length]);

  // Countdown timer auto-trigger
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0 && bootState === 'grub') {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        playCyberSound('beep');
      }, 1000);
    } else if (isCounting && countdown === 0 && bootState === 'grub') {
      startBootProcess();
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown, bootState, playCyberSound]);

  const startBootProcess = () => {
    setIsCounting(false);
    playCyberSound('boot');
    setBootState('animating');

    // Simulate fast 7.42s Linux kernel boot stream
    const logs = [
      '[  0.000000] Linux version 6.12.0-custom-x86_64 (ritesh@cyber-build) #1 SMP PREEMPT_DYNAMIC',
      '[  0.041289] Command line: BOOT_IMAGE=/vmlinuz-6.12.0 root=UUID=7a1b2c3d ro quiet splash toram=yes',
      '[  0.182471] x86/fpu: Supporting XSAVE feature 0x001: x87 floating point registers',
      '[  0.412984] ACPI: Core revision 20260321, 16 CPUs enabled, NVRAM Secure Boot Pass',
      '[  0.891234] pci 0000:00:02.0: Direct GPU Framebuffer Initialized: 3840x2160 @ 60Hz 10-bit',
      '[  1.428912] EXT4-fs (dm-0): mounted filesystem with ordered data mode. Opts: (null)',
      '[  2.189472] systemd[1]: Mounting /dev/nvme0n1p2 onto /run/live/persistence... [OK]',
      '[  3.014891] Waydroid: LXC container daemon initialized on /dev/binder [OK]',
      '[  4.128941] WineHQ: DXVK 2.3 Vulkan bridge loaded with Direct3D 12 runtime [OK]',
      '[  5.489123] Frosted Glass Compositor: Picom GPU Blur Pipeline Engaged at 60 FPS [OK]',
      '[  6.891234] RITESH PC OS v2.0 READY // Desktop Environment Boot Complete in 7.42s',
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLogLines((prev) => [...prev, log]);
      }, index * 480);
    });

    // Transition to live desktop after animation completes
    setTimeout(() => {
      setBootState('desktop');
      playCyberSound('launch');
    }, 6200);
  };

  const restartSimulator = () => {
    setBootState('grub');
    setCountdown(5);
    setIsCounting(false);
    setBootLogLines([]);
    setActiveDesktopApp('stats');
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-[#080d19] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
      }`}
    >
      {/* Top Frame Titlebar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a1122] border-b border-cyan-500/20 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="font-cyber font-bold tracking-wider text-slate-200 text-[11px] sm:text-xs">
            SIMULATED UEFI 64-BIT HARDWARE ENGINE
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300">
            BIOS NVRAM PRIORITY #1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Screen Container with Responsive Auto-Fit */}
      <div className="relative min-h-[540px] sm:min-h-[580px] lg:aspect-[16/9] lg:min-h-[520px] lg:max-h-[720px] w-full overflow-hidden bg-black cyber-grid">
        {/* Subtle Scanlines overlay */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none z-20" />

        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* VIEW 1: GRUB BOOTLOADER                                      */}
          {/* ============================================================ */}
          {bootState === 'grub' && (
            <motion.div
              key="grub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto"
            >
              {/* Background Concentric Rings and 3D metallic Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 sm:opacity-80">
                <MetallicLogo size={360} glowColor="crimson" />
              </div>

              {/* GRUB Top Title Glass Badge */}
              <div className="relative z-10 mb-3 sm:mb-6">
                <div className="px-6 sm:px-8 py-1.5 sm:py-2 rounded-xl bg-[#090e18]/80 backdrop-blur-md border border-slate-600/60 shadow-lg text-center">
                  <h2 className="font-cyber font-extrabold text-lg sm:text-2xl text-white tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                    RITESH PC OS
                  </h2>
                </div>
              </div>

              {/* Main GRUB Selection Glass Card */}
              <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#0b101d]/75 backdrop-blur-xl border border-slate-700/60 shadow-2xl p-4 sm:p-6 lg:p-8">
                {/* Menu items */}
                <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm md:text-base">
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
                        className={`group relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-rose-950/50 border border-rose-500/80 shadow-[0_0_20px_rgba(255,0,85,0.35)] text-white'
                            : 'bg-slate-900/40 border border-transparent hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                          <span className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-rose-300 font-bold' : 'text-slate-400'}`}>
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className={`text-[10px] sm:text-xs px-2 py-0.5 rounded font-mono hidden sm:inline-block ${
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
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-400">
                  <div className="leading-snug">
                    <span className="text-cyan-400 font-bold">INFO:</span>{' '}
                    {menuItems[selectedOption].desc}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 flex-shrink-0">
                    <span>↑ / ↓ or Tap to Select</span>
                  </div>
                </div>
              </div>

              {/* Bottom Countdown & Instant Trigger */}
              <div className="relative z-10 mt-4 sm:mt-6 flex flex-col items-center gap-2.5 sm:gap-3">
                <div className="text-xs sm:text-sm font-mono text-slate-300 flex items-center gap-2">
                  <span>Booting in</span>
                  <span className="inline-flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-rose-950/80 border border-rose-500/60 font-bold text-rose-400 text-xs sm:text-sm">
                    {countdown}
                  </span>
                  <span>seconds</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
                  <button
                    onClick={startBootProcess}
                    className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-cyber font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    BOOT NOW [ENTER]
                  </button>

                  <button
                    onClick={() => {
                      setIsCounting(!isCounting);
                    }}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                  >
                    {isCounting ? 'Pause Timer' : 'Resume Auto-Boot'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* VIEW 2: 7-SECOND FAST BOOT SEQUENCE                          */}
          {/* ============================================================ */}
          {bootState === 'animating' && (
            <motion.div
              key="animating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#040609] p-4 sm:p-6 flex flex-col justify-between overflow-y-auto"
            >
              {/* Boot Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 sm:pb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <MetallicLogo size={42} glowColor="cyan" interactive={false} />
                  <div>
                    <h3 className="font-cyber font-bold text-sm sm:text-lg text-cyan-400">
                      RITESH PC OS v2.0 // FAST KERNEL INIT
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono text-slate-400">
                      Debian 12 Core • Linux 6.12.0-x86_64 • UEFI Dual-Mode
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right font-mono text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                    <div>SPEED: <span className="text-cyan-400 font-bold">15.2 GB/s</span></div>
                    <div>STATUS: <span className="text-emerald-400 font-bold">HYPER-THREADED</span></div>
                  </div>
                  <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                </div>
              </div>

              {/* Live Terminal Stream of Boot Logs */}
              <div className="flex-1 my-3 sm:my-4 p-3 sm:p-4 rounded-xl bg-black/70 border border-cyan-500/20 font-mono text-[11px] sm:text-sm text-cyan-300/90 overflow-y-auto space-y-1.5 max-h-[300px] sm:max-h-none">
                {bootLogLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="break-all">{line}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar & Splash Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] sm:text-xs font-mono text-slate-400">
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
                <MetallicLogo size={280} glowColor="dual" />
              </div>

              {/* Desktop Top Status Bar */}
              <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 py-2 bg-[#0a101f]/70 backdrop-blur-md border-b border-cyan-500/20 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-cyber font-bold text-cyan-400 flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    RITESH PC OS LIVE
                  </span>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      🐧 Linux 6.12
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      🤖 Waydroid APK
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
                      🪟 Windows Wine
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={restartSimulator}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 hover:bg-rose-900 transition-colors text-[10px] font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reboot GRUB</span>
                  </button>
                </div>
              </div>

              {/* Desktop Center Sandbox Workspace */}
              <div className="relative z-10 flex-1 p-3 sm:p-6 flex flex-col justify-center max-w-4xl mx-auto w-full">
                {activeDesktopApp === 'stats' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 sm:p-6 rounded-2xl bg-[#080f1e]/90 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-cyan-400 font-cyber font-bold text-sm">
                        <Activity className="w-4 h-4" />
                        <span>CYBERNETIC SYSTEM TELEMETRY (LIVE KERNEL)</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                        100% HEALTHY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">CPU ARCH</div>
                        <div className="text-white font-bold mt-1">16-Core x86_64</div>
                        <div className="text-cyan-400 text-[10px] mt-0.5">3.60 - 5.85 GHz</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">RAM FOOTPRINT</div>
                        <div className="text-emerald-400 font-bold mt-1">480 MB / 32 GB</div>
                        <div className="text-slate-400 text-[10px] mt-0.5">Toram SquashFS</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">GRAPHICS</div>
                        <div className="text-white font-bold mt-1">Vulkan 1.3 DRM</div>
                        <div className="text-cyan-400 text-[10px] mt-0.5">Direct 60FPS Blur</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">BOOT DRIVE</div>
                        <div className="text-rose-400 font-bold mt-1">NVMe Persistence</div>
                        <div className="text-slate-400 text-[10px] mt-0.5">chattr +i Lock</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={onOpenDownload}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-bold text-xs uppercase cursor-pointer"
                      >
                        Download This OS (v2.0 ISO)
                      </button>
                      <button
                        onClick={restartSimulator}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs cursor-pointer"
                      >
                        Back to Bootloader
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Desktop Bottom Taskbar */}
              <div className="relative z-10 px-4 py-2 bg-[#090e1b]/90 backdrop-blur-xl border-t border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDesktopApp('stats')}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      activeDesktopApp === 'stats'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="System Telemetry"
                  >
                    <Activity className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenDownload && onOpenDownload()}
                    className="p-2 rounded-xl bg-black/40 border border-slate-800 text-cyan-400 hover:text-white hover:bg-cyan-950/40 transition-colors cursor-pointer"
                    title="Download ISO"
                  >
                    <HardDrive className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3">
                  <span className="text-cyan-400">4K FROSTED GLASS DESKTOP</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400">60 FPS COMPOSITOR</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
