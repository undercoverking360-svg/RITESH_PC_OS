import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { PageTabId } from './types';
import { CpuEmpoweringBackground } from './components/CpuEmpoweringBackground';
import { HeroSection } from './components/HeroSection';
import { LiveBootloaderSimulator } from './components/LiveBootloaderSimulator';
import { EcosystemMatrix } from './components/EcosystemMatrix';
import { AdvancedToolingGrid } from './components/AdvancedToolingGrid';
import { InteractiveBootSequence } from './components/InteractiveBootSequence';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { DownloadModal } from './components/DownloadModal';
import { DonateModal } from './components/DonateModal';
import { UploadSheetModal } from './components/UploadSheetModal';
import { GuideModal } from './components/GuideModal';
import { Footer } from './components/Footer';
import {
  Terminal,
  Download,
  Sparkles,
  Shield,
  Zap,
  Layers,
  Cpu,
  Monitor,
  Flame,
  CheckCircle2,
  HardDrive,
  Copy,
  Check,
  Radio,
  ExternalLink,
  Upload,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

const tabOrder: PageTabId[] = [
  'overview',
  'simulator',
  'ecosystem',
  'security',
  'bootflow',
  'downloads',
  'terminal',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTabId>('overview');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [turboMode, setTurboMode] = useState(false);

  // Switch tab with smooth vertical scrolling to top
  const handleTabChange = (newTab: PageTabId) => {
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTurbo = () => {
    setTurboMode((prev) => !prev);
  };

  const handleOpenDownload = () => setDownloadModalOpen(true);
  const handleCloseDownload = () => setDownloadModalOpen(false);

  const handleOpenTerminal = () => setTerminalModalOpen(true);
  const handleCloseTerminal = () => setTerminalModalOpen(false);

  const handleOpenDonate = () => setDonateModalOpen(true);
  const handleCloseDonate = () => setDonateModalOpen(false);

  const handleOpenUpload = () => setUploadModalOpen(true);
  const handleCloseUpload = () => setUploadModalOpen(false);

  const handleOpenGuide = () => setGuideModalOpen(true);
  const handleCloseGuide = () => setGuideModalOpen(false);

  const handleExploreArch = () => {
    handleTabChange('ecosystem');
  };

  // Ultra-Smooth Vertical Fade In-Out Transition for Tab Switching
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#040609] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* 1. CPU Empowering Animated Canvas Background */}
      <CpuEmpoweringBackground
        turboMode={turboMode}
        onToggleTurbo={handleToggleTurbo}
      />

      {/* 2. Single Master Top Navbar (Row 1) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenDownload={handleOpenDownload}
        onOpenTerminal={handleOpenTerminal}
        onOpenDonate={handleOpenDonate}
        onOpenUpload={handleOpenUpload}
        onOpenGuide={handleOpenGuide}
      />

      {/* 3. Main Animated Page Content with Smooth Vertical Fade In-Out */}
      <main className="relative z-10 min-h-[70vh] pt-16 sm:pt-20 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="page-overview"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4 sm:space-y-6 pt-1"
            >
              {/* SECTION 1: Hero Section */}
              <HeroSection
                onOpenDownload={handleOpenDownload}
                onOpenTerminal={handleOpenTerminal}
                onExploreArch={handleExploreArch}
                onOpenUpload={handleOpenUpload}
                onOpenGuide={handleOpenGuide}
              />

              {/* SECTION 2: Live Interactive GRUB Simulator Preview */}
              <motion.section
                id="simulator"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative"
              >
                <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
                  <div className="text-center space-y-2 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      Live Hardware Simulation Engine
                    </div>
                    <h2 className="font-cyber font-black text-2xl sm:text-3xl md:text-4xl text-white">
                      Interactive UEFI Bootloader &amp; Desktop Sandbox
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl mx-auto">
                      Navigate the exact Master GRUB interface from the real hardware build. Press Enter to boot
                      and experience the 7-second splash transition into the 4K Frosted Glass workspace!
                    </p>
                  </div>

                  <LiveBootloaderSimulator onOpenDownload={handleOpenDownload} />
                </div>
              </motion.section>

              {/* SECTION 3: 3-in-1 Ecosystem Matrix */}
              <EcosystemMatrix />

              {/* SECTION 4: Advanced Tooling & Security (VaultPulse Sharing Matrix) */}
              <AdvancedToolingGrid />

              {/* SECTION 5: Boot Sequence & Hardware Specs */}
              <InteractiveBootSequence />

              {/* SECTION 6: Epic Call to Action */}
              <motion.section
                id="cta-upgrade"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050811] via-[#081224] to-[#040609] overflow-hidden"
              >
                <div className="max-w-5xl mx-auto text-center relative z-10 space-y-5 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    DEPLOY TO YOUR PC / USB TODAY
                  </div>

                  <h2 className="font-cyber font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    Ready to Upgrade to the Ultimate <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
                      Cybernetic 3-in-1 Experience?
                    </span>
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
                    No need to wipe your hard drive. Flash to any 16GB USB drive and experience 15-second instant live boot with full persistence, Android gaming, and Windows software compatibility.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
                    <button
                      onClick={handleOpenDownload}
                      className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-black text-xs sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(0,240,255,0.5)] transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <Download className="w-5 h-5 text-black" />
                      <span>Download Live ISO (V1.0)</span>
                    </button>

                    <button
                      onClick={handleOpenTerminal}
                      className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-emerald-400 font-mono text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>Launch Interactive Terminal</span>
                    </button>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}

          {activeTab === 'simulator' && (
            <motion.div
              key="page-simulator"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8"
            >
              <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
                <h1 className="font-cyber font-black text-2xl sm:text-5xl text-white">
                  UEFI GRUB 2 &amp; 4K Frosted Glass Sandbox
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-mono">
                  Interact directly with the custom Master 5-menu GRUB bootloader. Use keyboard Arrow keys or on-screen buttons, then press Enter to trigger the 7-second video splash transition to the live desktop.
                </p>
              </div>
              <LiveBootloaderSimulator onOpenDownload={handleOpenDownload} />
            </motion.div>
          )}

          {activeTab === 'ecosystem' && (
            <motion.div
              key="page-ecosystem"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <EcosystemMatrix />
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="page-security"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <AdvancedToolingGrid />
            </motion.div>
          )}

          {activeTab === 'bootflow' && (
            <motion.div
              key="page-bootflow"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <InteractiveBootSequence />
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div
              key="page-downloads"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 sm:space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <h1 className="font-cyber font-black text-2xl sm:text-5xl text-white">
                  Download RITESH PC OS (V1.0)
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-mono">
                  Select your desired ISO flavor. All builds include UEFI / NVRAM 64-bit Secure Boot compatibility, NVMe SSD TRIM discard schedulers, and Master 5-Menu GRUB Suite.
                </p>
              </div>

              {/* Flavor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {[
                  {
                    title: 'RITESH PC OS - Light V1.0',
                    badge: 'LIGHT V1.0',
                    size: '2.8 GB',
                    desc: 'Super lightweight & optimized edition with core Debian 12 utilities, fast RAM boot, and minimal resource footprint.',
                    kernel: '6.12.0-light-x86_64',
                    popular: false,
                  },
                  {
                    title: 'RITESH PC OS - Stable V1.0',
                    badge: 'STABLE V1.0 (RECOMMENDED)',
                    size: '3.6 GB',
                    desc: 'The rock-solid 3-in-1 flagship powerhouse: Toram ultra-speed RAM mode, Waydroid Android gaming, and Windows Wine engine.',
                    kernel: '6.12.0-stable-x86_64',
                    popular: true,
                  },
                  {
                    title: 'RITESH PC OS - Everything Edition',
                    badge: 'CYBER SECURITY & FORENSIC',
                    size: '4.9 GB',
                    desc: 'The complete cyber suite with Kali penetration testing tools, Wi-Fi packet analysis, sandboxed dev tools, and network diagnostics.',
                    kernel: '6.12.0-hardened-x86_64',
                    popular: false,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between space-y-5 sm:space-y-6 ${
                      item.popular
                        ? 'bg-[#081224]/90 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.25)]'
                        : 'bg-[#070b16]/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold">
                          {item.badge}
                        </span>
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          {item.size}
                        </span>
                      </div>
                      <h3 className="font-cyber font-black text-lg sm:text-xl text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono">
                        {item.desc}
                      </p>
                      <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                        Kernel: <span className="text-slate-300">{item.kernel}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleOpenDownload}
                      className={`w-full py-3 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        item.popular
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download ISO Image</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* USB Flash Instructions */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/90 border border-cyan-500/20 font-mono text-xs space-y-4">
                <div className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  USB Flashing Instructions (Ventoy, Rufus &amp; Balena Etcher):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                    <div className="text-cyan-300 font-bold">Method A: Ventoy (MultiBoot)</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      1. Install Ventoy to a USB drive (16GB+).<br />
                      2. Drag &amp; drop the downloaded ISO file.<br />
                      3. Reboot and select USB in UEFI Boot Menu.
                    </div>
                    <div className="pt-1">
                      <a href="https://www.ventoy.net/en/download.html" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px]">
                        <span>Download Ventoy</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                    <div className="text-cyan-300 font-bold">Method B: Rufus (Windows)</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      1. Select USB drive and ISO in Rufus.<br />
                      2. Partition: <strong>GPT</strong>, Target: <strong>UEFI</strong>.<br />
                      3. Flash in <strong>ISO mode</strong>.
                    </div>
                    <div className="pt-1">
                      <a href="https://rufus.ie/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px]">
                        <span>Download Rufus</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                    <div className="text-cyan-300 font-bold">Method C: Balena Etcher</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      1. Select downloaded ISO.<br />
                      2. Select target USB drive.<br />
                      3. Click Flash! (Win/Mac/Linux).
                    </div>
                    <div className="pt-1">
                      <a href="https://etcher.balena.io/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px]">
                        <span>Download Etcher</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div
              key="page-terminal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Cybernetic CLT Console (Live Web CLI)
                </div>
                <h1 className="font-cyber font-black text-2xl sm:text-4xl text-white">
                  Interactive System Diagnostics (LT)
                </h1>
                <p className="text-slate-400 text-xs font-mono">
                  Execute diagnostics, check kernel drivers, inspect Waydroid LXC binder status, or trigger benchmark tests.
                </p>
              </div>

              {/* Terminal View Container */}
              <div className="rounded-3xl bg-[#04070d] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col h-[520px]">
                <div className="flex items-center justify-between px-4 py-3 bg-[#080d18] border-b border-cyan-500/20 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      ritesh@pc-os: ~ (zsh / bash 5.9)
                    </span>
                  </div>
                  <div className="text-emerald-400 text-[11px] font-mono">
                    [LIVE RUNTIME]
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs space-y-3 cyber-grid">
                  <div className="text-cyan-400 font-bold">RITESH PC OS V1.0 (Debian 12 Bookworm / Linux Kernel 6.12.0-x86_64)</div>
                  <div className="text-slate-300">Type commands or click quick action pills below:</div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {[
                      { cmd: 'neofetch', label: '📊 neofetch' },
                      { cmd: 'waydroid', label: '🤖 waydroid status' },
                      { cmd: 'wine', label: '🪟 wine 9.0 test' },
                      { cmd: 'share', label: '🌐 share.welcomeriteshguru.in' },
                    ].map((k) => (
                      <button
                        key={k.cmd}
                        onClick={() => {}}
                        className="p-2 rounded-xl bg-black/60 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 text-xs font-mono text-left transition-colors cursor-pointer"
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/20 text-[11px] space-y-1 text-slate-300">
                    <div className="text-emerald-400 font-bold">[✓] UEFI NVRAM Entry: 0001 (RITESH-PC-OS-UEFI) - Priority #1</div>
                    <div>[✓] Direct DRM/KMS Framebuffer Video Splash: Sync 60 FPS</div>
                    <div>[✓] Waydroid Android LXC Passthrough: /dev/dri/renderD128 Vulkan 1.3 Active</div>
                    <div>[✓] Toram SquashFS RAM Caching: 15.2 GB/s NVMe Throughput</div>
                    <div>[✓] VaultPulse Sharing Matrix Hub: share.welcomeriteshguru.in Active</div>
                    <div className="text-cyan-300 font-bold">SYSTEM STATUS: 100% OPERATIONAL // ZERO COMPROMISE</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleOpenTerminal}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>Open Full Interactive Terminal Popup</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Floating Action Buttons (Desktop & Tablet) */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40 items-center gap-2.5">
        {/* Floating Guide > Button */}
        <button
          onClick={handleOpenGuide}
          className="p-3 px-4 rounded-full bg-[#081020]/95 hover:bg-cyan-950 border border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 font-cyber font-bold text-xs"
          title="Open Flashing Guide"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Guide &gt;</span>
        </button>

        {/* Floating Upload / Sheet Button */}
        <button
          onClick={handleOpenUpload}
          className="p-3 px-4 rounded-full bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 font-cyber font-bold text-xs"
          title="Upload / Google Sheet Sync"
        >
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Upload</span>
        </button>

        {/* Floating CLI Terminal Button */}
        <button
          onClick={handleOpenTerminal}
          className="p-3 rounded-full bg-[#081020]/90 hover:bg-cyan-950 border border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Open Hacker Terminal"
          aria-label="Open CLI Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>

        {/* Floating Download ISO Button */}
        <button
          onClick={handleOpenDownload}
          className="p-3 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          title="Download ISO"
        >
          <Download className="w-4 h-4 text-black" />
          <span className="font-cyber font-extrabold text-xs">ISO V1.0</span>
        </button>
      </div>

      {/* 5. Interactive Hacker Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalModalOpen}
        onClose={handleCloseTerminal}
        onOpenDownload={handleOpenDownload}
      />

      {/* 6. Download Distribution Modal (5 Mirrors & 3 Editions) */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={handleCloseDownload}
      />

      {/* 7. Google Sheet & Community Upload Modal */}
      <UploadSheetModal
        isOpen={uploadModalOpen}
        onClose={handleCloseUpload}
      />

      {/* 8. USB Flashing & Installation Guide Modal */}
      <GuideModal
        isOpen={guideModalOpen}
        onClose={handleCloseGuide}
        onOpenDownload={handleOpenDownload}
      />

      {/* 9. Donation & Payment Gateway Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={handleCloseDonate}
      />

      {/* 10. Footer */}
      <Footer
        onOpenDownload={handleOpenDownload}
        onOpenTerminal={handleOpenTerminal}
        onOpenDonate={handleOpenDonate}
      />
    </div>
  );
}
