import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Video,
  Share2,
  Trash2,
  Cpu,
  Zap,
  HardDrive,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Terminal,
  Activity,
  Key,
  Database,
  X,
  Globe
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: {
    id: string;
    title: string;
    badge: string;
    category: string;
    icon: React.ElementType;
    description: string;
    specs: string[];
    terminalCommand: string;
    terminalOutput: string;
    link?: string;
    downloadUrl?: string;
  } | null;
  onClose: () => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;
  const Icon = tool.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-3xl bg-[#090f1e] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                {tool.category}
              </span>
              <h3 className="font-cyber font-black text-2xl text-white">{tool.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{tool.description}</p>

        {tool.downloadUrl && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0c1a30] to-[#0a1224] border border-cyan-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
            <div>
              <div className="text-xs font-cyber font-bold text-white">VaultPulse Portable Standalone Suite</div>
              <div className="text-[11px] font-mono text-cyan-300">Offline Vault + P2P Sharing App (407 MB ZIP)</div>
            </div>
            <a
              href={tool.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Suite ZIP</span>
            </a>
          </div>
        )}

        {tool.link && (
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-300">Live Web Sharing Portal:</span>
            <a
              href={tool.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs transition-colors"
            >
              <span>{tool.link.replace('https://', '')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Technical Architecture Specifications:
          </div>
          <div className="grid grid-cols-1 gap-2">
            {tool.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Output Box */}
        <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/20 font-mono text-xs space-y-2">
          <div className="text-slate-500 flex items-center justify-between">
            <span>Terminal CLI Diagnostic:</span>
            <span className="text-[10px] text-emerald-400">● LIVE RUNTIME</span>
          </div>
          <div className="text-cyan-400 font-bold">$ {tool.terminalCommand}</div>
          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-900 overflow-x-auto">
            {tool.terminalOutput}
          </pre>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const AdvancedToolingGrid: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<any>(null);

  const tools = [
    {
      id: 'grub-suite',
      title: 'Master 5-Menu GRUB Suite',
      badge: 'RITESH FROST & METALLIC LOGO',
      category: 'BOOT COMPOSITOR',
      icon: Shield,
      glow: 'cyan',
      description:
        'Customized UEFI Boot Manager with automatic BIOS NVRAM sync (Priority #1) and sleek Ritesh Frost theme with 3D metallic logo. Includes 5 clean unified menu options: 1-Windows, 2-Ritesh OS, 3-Shutdown, 4-Restart, and 5-Help.',
      specs: [
        '1. 🪟 Windows (Direct UEFI EFI Pass to Windows Boot Manager)',
        '2. 🐧 RITESH OS (Live 4K Cybernetic Workstation with NVMe Persistence)',
        '3. ⚡ Shutdown System (Clean ACPI Hardware Power Off)',
        '4. 🔄 Restart System (Cold UEFI Hardware Reset & Reload)',
        '5. ❓ Help & Hardware Specs (Diagnostic & Memory Information)',
      ],
      terminalCommand: 'sudo ritesh-grub --status',
      terminalOutput:
        '[OK] NVRAM Entry: 0001 (RITESH-PC-OS-UEFI) -> Priority #1\n[OK] Ritesh Frost Theme: 4K Metallic Logo Compositor Loaded\n[OK] 5-Menu Suite: [Windows | Ritesh OS | Shutdown | Restart | Help]\n[OK] Toram fast caching module loaded (15.2 GB/s NVMe bus detected)',
    },
    {
      id: 'video-bootloader',
      title: '7-Second Video Boot Engine',
      badge: '4K CINEMATIC SPLASH',
      category: 'DISPLAY COMPOSITOR',
      icon: Video,
      glow: 'crimson',
      description:
        'A full-screen dynamic MP4 / WebM hardware-accelerated video bootloader splash sequence that smoothly bridges the gap between UEFI POST and the XFCE/KDE desktop environment with zero screen flicker.',
      specs: [
        'Direct DRM/KMS framebuffer video playback via Plymouth & mpv-drm',
        'Zero flicker transition to X11/Wayland 4K frosted glass compositor',
        'Pre-cached into RAM during UEFI init for sub-second execution',
        'Customizable video splash animations with cyber holographic HUDs',
        'Silent kernel boot mode (dmesg suppressed with log export)',
      ],
      terminalCommand: 'ritesh-boot --test-splash',
      terminalOutput:
        '[OK] Video Driver: Intel/Nvidia/AMD DRM Kernel Mode Setting active\n[OK] Resolution: 3840x2160 @ 60Hz 10-bit Color\n[OK] Splash Duration: 7.42 Seconds (Frame buffer sync verified)',
    },
    {
      id: 'vaultpulse',
      title: 'VaultPulse Cyber Security & File Sharing Matrix',
      badge: 'OFFLINE VAULT + P2P SHARING (407 MB)',
      category: 'ENCRYPTED VAULT & P2P HUB',
      icon: Share2,
      glow: 'cyan',
      link: 'https://share.welcomeriteshguru.in',
      downloadUrl: 'https://github.com/undercoverking360-svg/ritesh_pc_os_light-v1.0/releases/download/v1.0/VaultPulse_v1.0.zip',
      description:
        'Zero-knowledge offline credentials vault and high-speed encrypted P2P sharing system. Protects passwords, API keys, and private files with military-grade SHA-512 encryption, while offering instant multi-device P2P transfers via share.welcomeriteshguru.in with zero server-side retention.',
      specs: [
        'Complete Standalone Windows & Linux Portable Executable Suite (407 MB)',
        'Direct browser-to-PC WebRTC encrypted P2P data transfer up to 1.2 GB/s',
        'Zero-Knowledge offline password & credentials vault with SHA-512 security',
        'Instant multi-device pairing via QR code or short link with zero cloud retention',
        'Built-in background server controls (START_SERVER.bat & STOP_SERVER.bat)',
      ],
      terminalCommand: 'vaultpulse --start-suite --port 8080',
      terminalOutput:
        '[OK] VaultPulse Offline Engine: Active (SHA-512 Hardware Encrypted)\n[OK] Sharing Hub: https://share.welcomeriteshguru.in\n[OK] P2P LAN Throughput: 1.2 GB/s\n[OK] Standalone Executable Ready: VaultPulse_v1.0.zip (407 MB)',
    },
    {
      id: 'cleaner-suite',
      title: 'Deep NVMe SSD Cleaner & RAM Optimizer',
      badge: 'TORAM FAST MODE',
      category: 'SYSTEM ACCELERATOR',
      icon: Trash2,
      glow: 'emerald',
      description:
        'High-performance system maintenance suite that executes TRIM discards on NVMe drives, clears system journal caches, flushes inactive page caches, and manages background app freezing for peak FPS.',
      specs: [
        'Automated NVMe SSD TRIM discard scheduler for zero write degradation',
        'Dynamic zRAM cache compressor with zstd algorithm (3:1 ratio)',
        'Toram loader: Copy root filesystem to RAM for infinite zero-lag speed',
        'Background application sleep freezer to save up to 40% battery',
        'Deep package cache cleaner removing orphan Debian dependencies',
      ],
      terminalCommand: 'sudo ritesh-cleaner --deep-sweep',
      terminalOutput:
        '[OK] NVMe TRIM: /dev/nvme0n1p2 discarded 14.8 GB inactive blocks\n[OK] RAM Freed: 1,420 MB cache reclaimed (zRAM ratio: 3.24x)\n[OK] Background processes optimized: 18 daemon threads suspended',
    },
  ];

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#040609] overflow-hidden"
    >
      {/* Background Cyber Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Core Cybernetic Tooling
          </div>
          <h2 className="font-cyber font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Engineered for Security, <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
              Speed &amp; Seamless P2P Sharing.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Discover the custom hardware tools, Master 5-menu GRUB suite, and P2P workspace sharing engines integrated into RITESH PC OS.
          </p>
        </div>

        {/* Tools 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTool(t)}
                className="group relative p-6 sm:p-8 rounded-3xl bg-[#080e1b]/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                      {t.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase">{t.category}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-cyber font-black text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                      {t.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed font-mono line-clamp-3">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <span>Inspect Tool Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-slate-500 text-[11px]">[CLICK TO OPEN]</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Tool Modal */}
        <AnimatePresence>
          {selectedTool && (
            <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
