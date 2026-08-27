import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Smartphone,
  Layers,
  Cpu,
  Zap,
  Shield,
  CheckCircle2,
  HardDrive,
  Flame,
  Monitor,
  Code2,
  Play,
  Maximize2,
  Lock,
  Compass,
  ArrowRight
} from 'lucide-react';

export const EcosystemMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linux' | 'android' | 'windows'>('linux');

  const ecosystems = {
    linux: {
      title: 'Native Linux Cyber Workstation',
      subtitle: 'Debian Bookworm 12 • Custom Linux Kernel 6.12 • Kali-Grade Glass Compositor',
      icon: Terminal,
      accentColor: 'cyan',
      tag: 'CORE WORKSTATION',
      badge: '4K 60FPS FROSTED GLASS',
      description:
        'Engineered directly upon Debian 12 Bookworm with an ultra-lightweight custom compositor. Features a customized 4K Frosted Glass desktop, pre-tuned zRAM compression, and streamlined F1-F12 multi-monitor shortcuts for security researchers, developers, and power users.',
      keyPoints: [
        'Pure 64-bit Linux Kernel 6.12 with low-latency real-time kernel patches',
        'Picom / Wayland Frosted Glass Compositor (GPU-rendered backdrop blur)',
        'Customized F1-F12 quick toolbindings for one-touch workspace routing',
        'Pre-loaded with cyber security tools, network auditors, and developer compilers',
        'Zstandard compressed live overlay for lightning-fast memory execution',
      ],
      benchmarks: [
        { label: 'Idle RAM Usage', value: '480 MB', compare: 'vs 4.2 GB on Win 11' },
        { label: 'Boot to Desktop', value: '14.8s', compare: 'Instant NVMe read' },
        { label: 'Kernel Latency', value: '< 0.4ms', compare: 'Real-time tuned' },
      ],
      mockupHeader: 'ritesh@cyber-workstation: ~ (Linux 6.12.0-custom-x86_64)',
      mockupContent: (
        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">$ neofetch --ascii_distro debian</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/60 p-4 rounded-xl border border-cyan-500/20">
            <div className="space-y-1 text-slate-300">
              <div><span className="text-cyan-400 font-bold">OS:</span> RITESH PC OS 64-bit (Debian 12)</div>
              <div><span className="text-cyan-400 font-bold">Host:</span> UEFI Dual-Mode System</div>
              <div><span className="text-cyan-400 font-bold">Kernel:</span> 6.12.0-deb12-x86_64</div>
              <div><span className="text-cyan-400 font-bold">Uptime:</span> 4 days, 12 hours, 38 mins</div>
              <div><span className="text-cyan-400 font-bold">Shell:</span> ZSH 5.9 with Cyber-Spaceship theme</div>
            </div>
            <div className="space-y-1 text-slate-300">
              <div><span className="text-cyan-400 font-bold">DE:</span> Cyber Glass XFCE / KDE Hybrid</div>
              <div><span className="text-cyan-400 font-bold">WM:</span> Picom Frosted Blur Compositor</div>
              <div><span className="text-cyan-400 font-bold">Memory:</span> 1.2 GiB / 31.2 GiB (3%)</div>
              <div><span className="text-cyan-400 font-bold">GPU:</span> Vulkan 1.3 Direct Hardware Pass</div>
              <div><span className="text-cyan-400 font-bold">Storage:</span> NVMe SSD Persistence chattr +i</div>
            </div>
          </div>
        </div>
      ),
    },
    android: {
      title: 'Direct Hardware Android (Waydroid)',
      subtitle: 'LXC Container Subsystem • Zero-Emulation Kernel Pass • Full GPU Vulkan 1.3',
      icon: Smartphone,
      accentColor: 'emerald',
      tag: 'NATIVE ANDROID ENGINE',
      badge: 'ZERO EMULATION OVERHEAD',
      description:
        'Unlike slow, resource-heavy virtual machines (BlueStacks/LDPlayer), RITESH PC OS runs Android directly on the bare Linux kernel via custom Waydroid LXC integration with direct GPU hardware acceleration. Launch APKs and Android games natively side-by-side with Linux apps.',
      keyPoints: [
        'Direct hardware GPU passthrough for 60-120 FPS Android gaming',
        'Native Binder IPC kernel bridge for zero latency input & touch',
        'Google Play Store & MicroG compatibility layer preconfigured',
        'Seamless multi-window Android multitasking with shared clipboard and files',
        'Automatic APK drag-and-drop installer tool included',
      ],
      benchmarks: [
        { label: 'GPU Passthrough', value: '100% Native', compare: 'Direct Vulkan/OpenGL' },
        { label: 'Game FPS (COD/PUBG)', value: '60 - 120 FPS', compare: '0% Virtual Machine lag' },
        { label: 'Startup Overhead', value: '1.2s', compare: 'Shared Kernel LXC' },
      ],
      mockupHeader: 'Android Subsystem (Waydroid 13 Engine) - Direct Hardware Pass',
      mockupContent: (
        <div className="space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-300 font-bold">LXC Subsystem: Android 13 Tiramisu</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
              GPU Vulkan: ENABLED
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Google Play', status: 'Ready', icon: '🛒' },
              { name: 'Free Fire / COD', status: '120 FPS Vulkan', icon: '🎮' },
              { name: 'WhatsApp Web/APK', status: 'Synchronized', icon: '💬' },
              { name: 'Termux / ADB', status: 'Root Access', icon: '⚡' },
            ].map((app, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center hover:border-emerald-500/50 transition-colors">
                <div className="text-2xl mb-1">{app.icon}</div>
                <div className="font-bold text-white text-xs">{app.name}</div>
                <div className="text-[10px] text-emerald-400">{app.status}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    windows: {
      title: 'Windows Compatibility Layer (Bottles/Wine)',
      subtitle: 'Wine 9.0 • Proton-GE • DXVK 2.3 DirectX 12 -> Vulkan Translation',
      icon: Layers,
      accentColor: 'blue',
      tag: 'WIN32 / WIN64 ECOSYSTEM',
      badge: 'RUN ANY .EXE / .MSI',
      description:
        'Run mission-critical Windows applications, productivity tools, and modern DirectX games without needing a full Windows partition or VM license. Bundled with tuned Bottles sandboxes, Wine 9.0 Staging, and DXVK for native rendering speeds.',
      keyPoints: [
        'Preconfigured Bottles environment with Gaming, Software & Custom sandboxes',
        'DirectX 9/10/11/12 hardware translation via DXVK 2.3 and VKD3D',
        'Right-click to execute any .exe or .msi file directly from File Manager',
        'Isolated Wine prefixes to prevent registry bloat and malware containment',
        'Full support for MS Office, Adobe Suite, CAD software, and Steam Windows titles',
      ],
      benchmarks: [
        { label: 'DirectX 12 Translation', value: 'DXVK 2.3', compare: 'Native Vulkan speed' },
        { label: 'App Compatibility', value: '98.4%', compare: 'Over 20,000+ EXE tested' },
        { label: 'RAM Footprint', value: 'Low', compare: 'No background Win services' },
      ],
      mockupHeader: 'Bottles 9.0 Windows Compatibility Engine (Wine Staging)',
      mockupContent: (
        <div className="space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between bg-blue-950/40 p-3 rounded-xl border border-blue-500/30">
            <span className="text-blue-300 font-bold">Bottles Prefix: Gaming & Software Pro</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">
              DXVK 2.3 + Proton 9.0
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'Adobe Photoshop', type: 'Design Suite', status: 'GPU Accelerated' },
              { name: 'AutoCAD 2024', type: 'Engineering', status: 'DirectX 11 Native' },
              { name: 'FL Studio 21', type: 'Audio Workstation', status: 'ASIO Low Latency' },
              { name: 'Steam / Epic Games', type: 'Gaming Engine', status: 'Proton-GE Ready' },
              { name: 'MS Office 365', type: 'Productivity', status: 'Full Compatibility' },
              { name: 'Visual Studio Pro', type: 'Development', status: 'Win64 Sandbox' },
            ].map((prog, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-blue-500/50 transition-colors">
                <div className="font-bold text-white text-xs">{prog.name}</div>
                <div className="text-[10px] text-slate-400">{prog.type}</div>
                <div className="text-[10px] text-blue-400 mt-1">● {prog.status}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const currentEco = ecosystems[activeTab];

  return (
    <section id="ecosystem" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050811] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            3-in-1 Power Combo Architecture
          </div>
          <h2 className="font-cyber font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            One Operating System. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">
              Three Unified Digital Ecosystems.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Never compromise between Linux speed, Android app access, and Windows software workflows.
            RITESH PC OS runs all three seamlessly on the same bare-metal kernel.
          </p>
        </div>

        {/* Interactive Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#080d1a] border border-cyan-500/20 backdrop-blur-xl shadow-xl max-w-full overflow-x-auto">
            {(['linux', 'android', 'windows'] as const).map((tab) => {
              const item = ecosystems[tab];
              const Icon = item.icon;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-cyber font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? tab === 'linux'
                        ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                        : tab === 'android'
                        ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab === 'linux' ? '🐧 Native Linux' : tab === 'android' ? '🤖 Android Waydroid' : '🪟 Windows Layer'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Details & Technical Highlights */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#080e1b]/80 backdrop-blur-2xl border border-slate-700/60 shadow-2xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                    {currentEco.tag}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold">
                    {currentEco.badge}
                  </span>
                </div>

                <h3 className="font-cyber font-black text-2xl sm:text-3xl text-white">
                  {currentEco.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 font-medium">
                  {currentEco.subtitle}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentEco.description}
                </p>
              </div>

              {/* Key Features Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Core Subsystem Specifications:
                </div>
                {currentEco.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Live Metric Gauges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                {currentEco.benchmarks.map((bench, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/50 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400">{bench.label}</div>
                    <div className="font-cyber font-black text-base sm:text-lg text-cyan-300 my-0.5">
                      {bench.value}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 truncate">{bench.compare}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Simulated Subsystem Window */}
            <div className="lg:col-span-6 flex flex-col rounded-3xl bg-[#060a14] border border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a1120] border-b border-cyan-500/20 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-slate-300 font-bold ml-2 truncate">
                    {currentEco.mockupHeader}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 hidden sm:inline-block">
                  GPU VULKAN 1.3
                </span>
              </div>

              {/* Subsystem Window Body */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-black/40 cyber-grid">
                {currentEco.mockupContent}

                {/* Subsystem Architecture Footer */}
                <div className="mt-6 p-4 rounded-xl bg-[#081020]/90 border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-300">Shared Linux 6.12 Kernel IPC Memory Space</span>
                  </div>
                  <span className="text-emerald-400 font-bold">100% HARDWARE BOUND</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
