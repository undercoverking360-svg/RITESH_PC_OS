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
  Radio
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
  const [direction, setDirection] = useState<number>(0);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [turboMode, setTurboMode] = useState(false);

  // Switch tab with directional slide-in animation tracking
  const handleTabChange = (newTab: PageTabId) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
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

  const handleExploreArch = () => {
    handleTabChange('ecosystem');
  };

  // Slide-in animation variants with smooth fade
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
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
      />

      {/* 3. Main Animated Page Content with Directional Slide-in & Smooth Scroll Reveal */}
      <main className="relative z-10 min-h-[70vh] pt-16 sm:pt-20 pb-20">
        <AnimatePresence mode="wait" custom={direction}>
          {activeTab === 'overview' && (
            <motion.div
              key="page-overview"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-4 sm:space-y-6 pt-1"
            >
              {/* Hero Section */}
              <HeroSection
                onOpenDownload={handleOpenDownload}
                onOpenTerminal={handleOpenTerminal}
                onExploreArch={handleExploreArch}
              />

              {/* Live Interactive GRUB Simulator Preview */}
              <motion.section
                id="simulator"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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

              {/* 3-in-1 Ecosystem Matrix */}
              <EcosystemMatrix />

              {/* Advanced Tooling & Security */}
              <AdvancedToolingGrid />

              {/* Boot Sequence & Hardware Specs */}
              <InteractiveBootSequence />

              {/* Epic Call to Action */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
                      <span>Download Live ISO (v2.0)</span>
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
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8"
            >
              <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
                <h1 className="font-cyber font-black text-2xl sm:text-5xl text-white">
                  UEFI GRUB 2 &amp; 4K Frosted Glass Sandbox
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-mono">
                  Interact directly with the custom 5-menu GRUB bootloader. Use keyboard Arrow keys or on-screen buttons, then press Enter to trigger the 7-second video splash transition to the live desktop.
                </p>
              </div>
              <LiveBootloaderSimulator onOpenDownload={handleOpenDownload} />
            </motion.div>
          )}

          {activeTab === 'ecosystem' && (
            <motion.div
              key="page-ecosystem"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <EcosystemMatrix />
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="page-security"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <AdvancedToolingGrid />
            </motion.div>
          )}

          {activeTab === 'bootflow' && (
            <motion.div
              key="page-bootflow"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="py-6 sm:py-10"
            >
              <InteractiveBootSequence />
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div
              key="page-downloads"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 sm:space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <h1 className="font-cyber font-black text-2xl sm:text-5xl text-white">
                  Download RITESH PC OS (v2.0)
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-mono">
                  Select your desired ISO flavor. All builds include UEFI 64-bit Secure Boot compatibility, NVMe SSD TRIM discard schedulers, and Master GRUB with immutable chattr +i.
                </p>
              </div>

              {/* Flavor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {[
                  {
                    title: 'Ultimate 3-in-1 Edition',
                    badge: 'FLAGSHIP',
                    size: '4.2 GB',
                    desc: 'The complete powerhouse: Debian 12 Bookworm, Waydroid 13 APK gaming, and Bottles / Wine 9.0 Windows compatibility.',
                    kernel: '6.12.0-custom-x86_64',
                    sha: '9f8a3c4e7b2d189af61e89a5c3e7d1b2fa4c8e6d2b8a0f4e2c6d8a0b4c2e6f8',
                    popular: true,
                  },
                  {
                    title: 'Toram Fast-RAM Edition',
                    badge: '15 GB/s SPEED',
                    size: '3.6 GB',
                    desc: 'Pre-configured to copy the full filesystem into RAM at boot for zero storage latency and infinite responsiveness.',
                    kernel: '6.12.0-toram-x86_64',
                    sha: '3c8b1c4e9f2a0076a5b4c3d2e1f8a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2',
                    popular: false,
                  },
                  {
                    title: 'Forensic & Security Edition',
                    badge: 'AUDIT SUITE',
                    size: '4.9 GB',
                    desc: 'Hardened Linux kernel loaded with Wi-Fi monitor mode, Bluetooth packet analysis, and encrypted memory vaults.',
                    kernel: '6.12.0-hardened-x86_64',
                    sha: '7a1b2c3e4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4c5',
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
                      <div className="text-[10px] font-mono text-slate-400 break-all select-all pt-1">
                        SHA256: <span className="text-cyan-300 font-bold">{item.sha}</span>
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
                  USB Flashing Instructions (Ventoy &amp; Rufus):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                    <div className="text-cyan-300 font-bold">Method A: Ventoy (Drag &amp; Drop)</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      1. Install Ventoy on any 16GB+ USB flash drive.<br />
                      2. Copy the downloaded <code>.iso</code> directly to the USB drive.<br />
                      3. Reboot PC and select USB in UEFI Boot Menu.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                    <div className="text-cyan-300 font-bold">Method B: Rufus (Windows)</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      1. Select USB drive and the ISO in Rufus.<br />
                      2. Partition Scheme: <strong>GPT</strong>, Target System: <strong>UEFI (non-CSM)</strong>.<br />
                      3. Click Start and flash in ISO or DD image mode.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div
              key="page-terminal"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
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
                  <div className="text-cyan-400 font-bold">RITESH PC OS v2.0 (Debian 12 Bookworm / Linux Kernel 6.12.0-x86_64)</div>
                  <div className="text-slate-300">Type commands or click quick action pills below:</div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {[
                      { cmd: 'neofetch', label: '📊 neofetch' },
                      { cmd: 'waydroid', label: '🤖 waydroid status' },
                      { cmd: 'wine', label: '🪟 wine 9.0 test' },
                      { cmd: 'grub', label: '🛡️ grub chattr +i' },
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
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40 items-center gap-3">
        <button
          onClick={handleOpenTerminal}
          className="p-3.5 rounded-full bg-[#081020]/90 hover:bg-cyan-950 border border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Open Hacker Terminal"
          aria-label="Open CLI Terminal"
        >
          <Terminal className="w-5 h-5" />
        </button>
        <button
          onClick={handleOpenDownload}
          className="p-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-2 px-5"
          title="Download ISO"
        >
          <Download className="w-5 h-5 text-black" />
          <span className="font-cyber font-extrabold text-xs hidden sm:inline-block">ISO v2.0</span>
        </button>
      </div>

      {/* 5. Interactive Hacker Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalModalOpen}
        onClose={handleCloseTerminal}
        onOpenDownload={handleOpenDownload}
      />

      {/* 6. Download Distribution Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={handleCloseDownload}
      />

      {/* 7. Donation & Payment Gateway Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={handleCloseDonate}
      />

      {/* 8. Footer */}
      <Footer
        onOpenDownload={handleOpenDownload}
        onOpenTerminal={handleOpenTerminal}
        onOpenDonate={handleOpenDonate}
      />
    </div>
  );
}
