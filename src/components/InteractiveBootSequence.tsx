import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  HardDrive,
  Monitor,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  Video
} from 'lucide-react';

export const InteractiveBootSequence: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userRam, setUserRam] = useState<number>(8);
  const [userDisk, setUserDisk] = useState<'nvme' | 'sata' | 'usb'>('nvme');
  const [userGpu, setUserGpu] = useState<'dedicated' | 'integrated'>('dedicated');

  const bootSteps = [
    {
      step: 1,
      title: 'Motherboard UEFI POST & NVRAM Handshake',
      path: '\\EFI\\RITESH-PC-OS\\BOOTX64.EFI',
      duration: '0.4s',
      badge: 'BIOS PRIORITY #1',
      icon: Cpu,
      description:
        'Motherboard hardware firmware detects RITESH PC OS NVRAM signature injected by efibootmgr. Direct 64-bit EFI executable executes with Secure Boot dual-compatibility key verification.',
      technicalDetails: [
        'EFI image: x86_64 PE32+ executable with signed SHA-512 hashes',
        'NVRAM BootOrder: 0001 (Overriding Windows Boot Manager priority)',
        'Firmware Handshake: Zero wait state ACPI & DSDT table load',
      ],
    },
    {
      step: 2,
      title: '4K Frosted Glass GRUB Menu',
      path: '/boot/grub/grub.cfg (chattr +i protected)',
      duration: '5.0s (or instant enter)',
      badge: 'IMMUTABLE FS',
      icon: Shield,
      description:
        'Customized GRUB2 graphics subsystem loads the metallic "R" centered holographic theme at native 3840x2160 or 1080p resolution with keyboard cursor control and fast memory boot options.',
      technicalDetails: [
        'GRUB Theme: 4K 3D Brushed Metallic "R" with Concentric Cyber Rings',
        'Option 1: Live UEFI 64-bit standard kernel',
        'Option 2: Direct SSD-to-RAM Toram Fast Mode (Loads entire squashfs into memory)',
      ],
    },
    {
      step: 3,
      title: 'Fast Live Overlay & Zstandard Mount',
      path: '/live/filesystem.squashfs -> /sysroot',
      duration: '1.2s',
      badge: 'ZSTD COMPRESSION',
      icon: HardDrive,
      description:
        'Custom initramfs dynamically uncompresses kernel modules and user packages using multi-threaded Zstandard algorithm at 15.2 GB/s, mounting the persistent read-write overlay.',
      technicalDetails: [
        'Zstandard level 19 ultra compression (4.2 GB image decompresses in 1.2s)',
        'OverlayFS union mount with NVMe persistence partition',
        'Device-mapper integrity checking and LUKS volume decryption',
      ],
    },
    {
      step: 4,
      title: '7-Second Video Splash & Subsystem Bridge',
      path: '/usr/share/plymouth/themes/ritesh-video',
      duration: '7.0s',
      badge: 'ZERO-FLICKER DRM',
      icon: Video,
      description:
        'Direct DRM/KMS framebuffer plays the seamless cybernetic video bootloader while background threads initialize the Waydroid Android LXC container and Wine / DXVK graphics translation layer.',
      technicalDetails: [
        'Plymouth Direct Rendering Manager (DRM) hardware video loop',
        'Binder IPC kernel module initialization for Waydroid',
        'Vulkan 1.3 physical device node mapping to /dev/dri/renderD128',
      ],
    },
    {
      step: 5,
      title: '4K Frosted Glass Desktop Ready',
      path: 'XFCE / KDE Hybrid Compositor + Picom',
      duration: 'Instant',
      badge: 'ONLINE',
      icon: Sparkles,
      description:
        'Compositor triggers full hardware acceleration, custom F1-F12 hotkeys, system tray telemetry, and provides immediate single-click access to Linux, Android, and Windows software.',
      technicalDetails: [
        'Total boot time from cold power-on to live responsive desktop: 14.8s',
        'Idle memory footprint: Under 500 MB RAM',
        'Immediate native execution readiness for APKs, EXEs, and Linux ELF binaries',
      ],
    },
  ];

  // Calculate compatibility score
  const calculateBootTime = () => {
    let base = 14;
    if (userDisk === 'nvme') base = 12;
    else if (userDisk === 'sata') base = 18;
    else if (userDisk === 'usb') base = 24;

    if (userRam >= 16) base -= 2;
    else if (userRam < 4) base += 4;

    return `${base}s`;
  };

  const getCompatibilityScore = () => {
    if (userRam >= 8 && userDisk === 'nvme' && userGpu === 'dedicated') {
      return { score: '100% ULTRA GODLY', text: 'Full 4K Frosted Glass, 120 FPS Android Gaming, and High-End Windows DXVK 12', color: 'text-cyan-400' };
    } else if (userRam >= 4) {
      return { score: '95% HIGH PERFORMANCE', text: 'Smooth 60 FPS Desktop, APKs & Windows apps fully supported', color: 'text-emerald-400' };
    }
    return { score: '85% COMPATIBLE', text: 'Lightweight Mode active, recommended to use Toram RAM fast boot', color: 'text-yellow-400' };
  };

  const currentStep = bootSteps[activeStep];
  const Icon = currentStep.icon;
  const compatibility = getCompatibilityScore();

  return (
    <section id="boot-sequence" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050811] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Microsecond Boot Pipeline
          </div>
          <h2 className="font-cyber font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            The 15-Second Boot Anatomy. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
              From UEFI Cold POST to 4K Live Desktop.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Click through the multi-stage boot sequence to inspect how RITESH PC OS achieves instant live
            responsiveness while maintaining immutable security.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {bootSteps.map((s, index) => {
            const isSelected = activeStep === index;
            const StepIcon = s.icon;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-[#081224] border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'bg-[#070b16]/70 border-slate-800 hover:border-slate-700 hover:bg-[#0a1020]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP 0{s.step}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    {s.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StepIcon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className={`font-cyber font-bold text-xs sm:text-sm truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Boot Stage Detailed Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                  PHASE 0{currentStep.step} OF 05
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold">
                  {currentStep.badge}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  Target Time: <span className="text-white font-bold">{currentStep.duration}</span>
                </span>
              </div>

              <h3 className="font-cyber font-black text-2xl sm:text-3xl text-white">
                {currentStep.title}
              </h3>

              <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-cyan-400 flex items-center gap-2 truncate">
                <span className="text-slate-500">HOOK:</span>
                <span className="truncate">{currentStep.path}</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Kernel Execution Protocols:
                </div>
                {currentStep.technicalDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Graphic / Step Flow Chart */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/70 border border-cyan-500/20 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  Boot Sequence Timeline
                </span>
                <span className="text-cyan-300 text-[10px]">TOTAL: ~14.8s</span>
              </div>

              <div className="space-y-3">
                {bootSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      idx === activeStep
                        ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                        : idx < activeStep
                        ? 'bg-slate-900/50 text-slate-400'
                        : 'text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-[10px] font-bold">
                        {step.step}
                      </span>
                      <span className="font-bold text-xs truncate max-w-[170px]">{step.title}</span>
                    </div>
                    <span className="text-[11px] font-bold">{step.duration}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400">
                <span>Direct SSD-to-RAM Mode:</span>
                <span className="text-emerald-400 font-bold">0% CPU Bottleneck</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ============================================================ */}
        {/* HARDWARE COMPATIBILITY & SYSTEM SPECS CHECKER                */}
        {/* ============================================================ */}
        <div id="requirements" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Official Specs Table */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#080d19]/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                HARDWARE ARCHITECTURE
              </span>
              <h3 className="font-cyber font-black text-2xl text-white mt-1">
                System Requirements
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Engineered to run blazingly fast on both ultra-modern rigs and budget laptops.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { label: 'Processor (CPU)', min: '64-bit x86_64 Dual Core', rec: 'Quad Core Intel / AMD (Virtualization VT-x/AMD-V)' },
                { label: 'System Memory (RAM)', min: '2 GB (Lightweight Mode)', rec: '4 GB - 8 GB+ (Toram Fast Mode & Waydroid)' },
                { label: 'Storage Drive', min: '16 GB USB 3.0 or SATA SSD', rec: '32 GB+ NVMe SSD (PCIe 3.0 / 4.0 / 5.0)' },
                { label: 'Graphics / GPU', min: 'Intel HD 4000 / AMD Vega', rec: 'Vulkan 1.2+ Compatible GPU (DirectX 12 Pass)' },
                { label: 'Firmware Interface', min: 'UEFI 64-bit or Legacy BIOS', rec: 'UEFI with Secure Boot Dual Mode' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/40 border border-slate-800/80 space-y-1">
                  <div className="text-cyan-400 font-bold text-xs">{item.label}</div>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-slate-300 text-[11px] gap-1">
                    <span><strong className="text-slate-500">Min:</strong> {item.min}</span>
                    <span><strong className="text-emerald-400">Rec:</strong> {item.rec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Hardware Benchmark Tester */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#081122]/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Live Hardware Estimator
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  REAL-TIME BENCH
                </span>
              </div>

              <h3 className="font-cyber font-black text-2xl text-white">
                Test Your PC Compatibility
              </h3>
              <p className="text-slate-300 text-xs font-normal">
                Select your machine configuration to preview the expected boot speed and subsystem performance.
              </p>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                {/* RAM Selector */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                    <span>Installed RAM:</span>
                    <span className="text-cyan-400 font-bold">{userRam} GB</span>
                  </div>
                  <div className="flex gap-2">
                    {[2, 4, 8, 16, 32].map((gb) => (
                      <button
                        key={gb}
                        onClick={() => setUserRam(gb)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                          userRam === gb
                            ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                            : 'bg-black/60 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {gb}GB
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Type Selector */}
                <div>
                  <div className="text-xs font-mono text-slate-300 mb-1.5">Primary Storage Target:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'nvme', label: 'NVMe SSD', sub: '3500 MB/s' },
                      { id: 'sata', label: 'SATA SSD', sub: '550 MB/s' },
                      { id: 'usb', label: 'USB 3.0 Drive', sub: '150 MB/s' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setUserDisk(d.id as any)}
                        className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-colors ${
                          userDisk === d.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-black/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-white text-xs">{d.label}</div>
                        <div className="text-[10px] text-slate-500">{d.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* GPU Selector */}
                <div>
                  <div className="text-xs font-mono text-slate-300 mb-1.5">Graphics Architecture:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'dedicated', label: 'Dedicated GPU (NVIDIA/AMD)', sub: '120 FPS Waydroid Gaming' },
                      { id: 'integrated', label: 'Integrated (Intel Iris/Radeon)', sub: '60 FPS 4K Smooth' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setUserGpu(g.id as any)}
                        className={`p-2.5 rounded-xl border text-left font-mono text-xs transition-colors ${
                          userGpu === g.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-black/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-white text-xs">{g.label}</div>
                        <div className="text-[10px] text-slate-500">{g.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Output Score */}
            <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Estimated Live Boot Time:</span>
                <span className="font-cyber font-bold text-lg text-cyan-400">
                  {calculateBootTime()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Subsystem Rating:</span>
                <span className={`font-mono font-bold ${compatibility.color}`}>
                  {compatibility.score}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                {compatibility.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
