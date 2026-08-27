import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Video,
  Lock,
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
  X
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
              <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
                {tool.badge}
              </span>
              <h3 className="font-cyber font-black text-xl text-white">{tool.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          {tool.description}
        </p>

        {/* Technical Specifications */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Hardware & Kernel Specifications:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tool.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Command Diagnostic Box */}
        <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/20 font-mono text-xs space-y-2">
          <div className="text-slate-500 flex items-center justify-between">
            <span>Terminal CLI Diagnostic:</span>
            <span className="text-[10px] text-emerald-400">● IMMUTABLE ACTIVE</span>
          </div>
          <div className="text-cyan-400 font-bold">$ {tool.terminalCommand}</div>
          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-900 overflow-x-auto">
            {tool.terminalOutput}
          </pre>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs tracking-wider uppercase transition-colors"
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
      badge: 'IMMUTABLE CHATTR +I',
      category: 'BOOT SECURITY',
      icon: Shield,
      glow: 'cyan',
      description:
        'Customized UEFI Boot Manager with automatic BIOS NVRAM sync (Priority #1). Protected by file system immutable flags (chattr +i /boot/grub/grub.cfg) to prevent OS overwrites, malware tampering, and partition corruption.',
      specs: [
        'Motherboard BIOS NVRAM auto-injection via efibootmgr',
        'chattr +i immutable attribute lock on all boot config files',
        'Direct RAM Fast Boot (Toram mode: SSD to RAM pre-fetch)',
        'Automatic dual-boot detection (Windows 11 / Kali / Arch / MX)',
        'Built-in memtest86+ hardware memory diagnostics',
      ],
      terminalCommand: 'sudo ritesh-grub --status',
      terminalOutput:
        '[OK] NVRAM Entry: 0001 (RITESH-PC-OS-UEFI) -> Priority #1\n[OK] Immutable flag check: /boot/efi/EFI/BOOT/BOOTX64.EFI (+i immutable active)\n[OK] Toram fast caching module loaded (15.2 GB/s NVMe bus detected)',
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
      title: 'VaultPulse Security Matrix',
      badge: 'MILITARY ENCRYPTION',
      category: 'KERNEL INTEGRITY',
      icon: Lock,
      glow: 'cyan',
      description:
        'Real-time cryptographic process isolation, LUKS2 volume encryption, and 1-touch profile lockdown. Safeguards developer keys, tokens, and browser credentials against unauthorized memory dumps.',
      specs: [
        'Hardware TPM 2.0 automatic key derivation and auto-unlock',
        'LUKS2 AES-XTS-PLAIN64 full disk and swap encryption',
        'Real-time process memory scrubber to eliminate cold-boot attacks',
        'Instant Profile Quarantine hotkey (F12) to lock system in 0.1s',
        'Pre-installed with Kali forensic audit suite and sandboxed Tor routing',
      ],
      terminalCommand: 'vaultpulse --verify-integrity',
      terminalOutput:
        '[OK] TPM 2.0 Chip: Detected & Enrolled\n[OK] Memory Integrity: Verified (Zero rogue ptrace hooks)\n[OK] Profile Status: ENCRYPTED // 4096-bit RSA keys active',
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
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040609] overflow-hidden">
      {/* Background Cyber Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            Hardened Kernel & Tooling Architecture
          </div>
          <h2 className="font-cyber font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Engineered For Absolute Power, <br />
            <span className="bg-gradient-to-r from-rose-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Speed & Hardware Dominance.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Every layer from the UEFI firmware POST to the graphical user environment has been custom
            architected for uncompromised reliability and zero system degradation.
          </p>
        </div>

        {/* 4-Card Master Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#080d19]/80 backdrop-blur-2xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTool(tool)}
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-all" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#0a1224] border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-widest">
                      {tool.category}
                    </span>
                    <h3 className="font-cyber font-black text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors mt-1">
                      {tool.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2">
                    {tool.specs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span>Inspect Blueprint & CLI</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-slate-500 text-[11px]">Click to open</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tool Detail Modal */}
      <AnimatePresence>
        {selectedTool && (
          <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
