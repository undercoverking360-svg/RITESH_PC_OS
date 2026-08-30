import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Download,
  X,
  HardDrive,
  Shield,
  Zap,
  Globe,
  Radio,
  FileCode,
  Terminal,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  Cpu,
  Layers,
  Lock,
  Flame,
  Clock
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Mirror {
  id: string;
  name: string;
  type: 'gdrive' | 'mega' | 'github' | 'archive_iso' | 'archive_torrent' | 'sourceforge';
  url: string;
  badge: string;
  color: string;
  speed: string;
}

interface Edition {
  id: string;
  name: string;
  badge: string;
  size: string;
  build: string;
  kernel: string;
  desc: string;
  isoName: string;
  sha256: string;
  isComingSoon?: boolean;
  mirrors: Mirror[];
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedEdition, setSelectedEdition] = useState<string>('light');
  const [activeGuide, setActiveGuide] = useState<'ventoy' | 'rufus' | 'etcher'>('ventoy');
  const [copiedSha, setCopiedSha] = useState(false);
  const [notified, setNotified] = useState(false);

  if (!isOpen) return null;

  const editions: Edition[] = [
    {
      id: 'light',
      name: 'RITESH PC OS - Light Edition V1.0',
      badge: '⚡ ULTRA-LIGHT V1.0',
      size: '2.09 GB',
      build: 'Build 2026.08-Light-Release',
      kernel: 'Linux 6.12.95+deb12-amd64 (Hardened)',
      desc: 'Optimized, bloat-free edition. Consumes only ~480 MB idle RAM. Features dynamic live installer, FeatherPad, PCManFM, and cybernetic lock screen.',
      isoName: 'RITESH_PC_OS_LIGHT_V1.0.iso',
      sha256: '4b853cc336bd2e7859de0bbe8c8921a3db4acdee8fa2be8f397d2c8058a58a7e',
      mirrors: [
        {
          id: 'gdrive',
          name: 'Google Drive (1-Tap Direct Download)',
          type: 'gdrive',
          url: 'https://drive.usercontent.google.com/download?id=1a9mIS760nvmK8b72agB3enNijx3QNhKF&export=download&confirm=t',
          badge: '1-TAP DIRECT',
          color: 'from-emerald-500 to-teal-600',
          speed: 'Max Google Speed',
        },
        {
          id: 'mega',
          name: 'MEGA Cloud (High-Speed Direct)',
          type: 'mega',
          url: 'https://mega.nz/file/4VFXRSoT#dpvV825TyOzlBJIG0lV91a4XGAe_l5r7Slvc8DeYJqM',
          badge: 'HIGH-SPEED CDN',
          color: 'from-rose-500 to-red-600',
          speed: 'Unthrottled',
        },
        {
          id: 'github',
          name: 'GitHub Releases (Direct Single ISO)',
          type: 'github',
          url: 'https://github.com/undercoverking360-svg/ritesh_pc_os_light-v1.0/releases/download/v1.0/RITESH_PC_OS_LIGHT_V1.0.iso',
          badge: 'GITHUB VERIFIED',
          color: 'from-cyan-500 to-blue-600',
          speed: 'Global CDN',
        },
        {
          id: 'archive_iso',
          name: 'Internet Archive (Direct 1-Click ISO)',
          type: 'archive_iso',
          url: 'https://archive.org/download/ritesh-pc-os-light-v-1.0/RITESH_PC_OS_LIGHT_V1.0.iso',
          badge: 'PERMANENT ARCHIVE',
          color: 'from-amber-500 to-orange-600',
          speed: 'Lifetime Hosted',
        },
        {
          id: 'archive_torrent',
          name: 'Internet Archive (Official BitTorrent P2P)',
          type: 'archive_torrent',
          url: 'https://archive.org/download/ritesh-pc-os-light-v-1.0/ritesh-pc-os-light-v-1.0_archive.torrent',
          badge: 'P2P TORRENT',
          color: 'from-purple-500 to-indigo-600',
          speed: 'Decentralized',
        },
      ],
    },
    {
      id: 'ultimate',
      name: 'RITESH PC OS - Ultimate Master Flagship',
      badge: '👑 MASTER FLAGSHIP',
      size: '4.6 GB',
      build: 'Build 2026.08-Ultimate-Master',
      kernel: 'Linux 6.12.95+deb12-amd64 (Pro)',
      desc: 'The complete powerhouse: Toram ultra-speed RAM boot, Waydroid Android Subsystem, Windows Wine Staging, Chrome, and full Developer Suite.',
      isoName: 'RITESH_PC_OS ULTIMATE.iso',
      sha256: '9b7f58d92828b8e010885c35a8286a0747fb6f654b0e8c792ca8a892b153b6f2',
      mirrors: [
        {
          id: 'gdrive',
          name: 'Google Drive (1-Tap Direct Download)',
          type: 'gdrive',
          url: 'https://drive.usercontent.google.com/download?id=1pM2BFxbMvfTl9_G5U51_NECv0rnC1RpG&export=download&confirm=t',
          badge: '1-TAP DIRECT',
          color: 'from-emerald-500 to-teal-600',
          speed: 'Max Google Speed',
        },
        {
          id: 'mega',
          name: 'MEGA Cloud (High-Speed Direct)',
          type: 'mega',
          url: 'https://mega.nz/file/UANj1RwL#2o9GvatAtldKmrrHdUwFypd6-HJUG7QfMffU4Wj7-VI',
          badge: 'HIGH-SPEED CDN',
          color: 'from-rose-500 to-red-600',
          speed: 'Unthrottled',
        },
        {
          id: 'archive_iso',
          name: 'Internet Archive (Direct 1-Click ISO)',
          type: 'archive_iso',
          url: 'https://archive.org/download/ritesh-pc-os-ultimate/RITESH_PC_OS%20ULTIMATE.iso',
          badge: 'PERMANENT ARCHIVE',
          color: 'from-amber-500 to-orange-600',
          speed: 'Lifetime Hosted',
        },
        {
          id: 'archive_torrent',
          name: 'Internet Archive (Official BitTorrent P2P)',
          type: 'archive_torrent',
          url: 'https://archive.org/download/ritesh-pc-os-ultimate/ritesh-pc-os-ultimate_archive.torrent',
          badge: 'P2P TORRENT',
          color: 'from-purple-500 to-indigo-600',
          speed: 'Decentralized',
        },
        {
          id: 'archive_details',
          name: 'Internet Archive (Catalog Details & Metadata)',
          type: 'sourceforge',
          url: 'https://archive.org/details/ritesh-pc-os-ultimate',
          badge: 'WEB CATALOG',
          color: 'from-cyan-500 to-blue-600',
          speed: 'Global Library',
        },
      ],
    },
    {
      id: 'everything',
      name: 'RITESH PC OS - Everything Edition (Titan)',
      badge: '🌌 COMING SOON',
      size: 'COMING SOON',
      build: 'Build 2026.09-Titan-InDev',
      kernel: 'Linux 6.13-RT-Neural (Preview)',
      desc: 'The upcoming Titan Workstation: Local LLM AI Engine, CUDA Deep Learning Accelerators, 4K Studio Creation Suite, and Hardened Forensics.',
      isoName: 'RITESH_PC_OS_EVERYTHING_TITAN.iso',
      sha256: 'CALCULATING_ON_NEURAL_SYNTHESIS_COMPLETION',
      isComingSoon: true,
      mirrors: [],
    },
  ];

  const current = editions.find((e) => e.id === selectedEdition) || editions[0];

  const handleCopySha = () => {
    navigator.clipboard.writeText(current.sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleNotifyMe = () => {
    setNotified(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#ff0055', '#7000ff']
    });
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#080c14] border border-cyan-500/40 p-4 sm:p-6 md:p-8 text-white shadow-[0_0_80px_rgba(0,240,255,0.25)] space-y-6 my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            Official Multi-Cloud Mirror Distribution Hub
          </div>
          <h2 className="font-cyber font-black text-2xl sm:text-3xl text-white tracking-wide">
            Download RITESH PC OS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Select your edition and choose from 5 verified high-speed multi-cloud download mirrors.
          </p>
        </div>

        {/* Edition Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {editions.map((ed) => {
            const isSelected = selectedEdition === ed.id;
            return (
              <button
                key={ed.id}
                onClick={() => setSelectedEdition(ed.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0e172a] border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)]'
                    : 'bg-black/40 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      ed.isComingSoon 
                        ? 'bg-purple-950/80 border border-purple-500/40 text-purple-300' 
                        : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                    }`}>
                      {ed.badge}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{ed.size}</span>
                  </div>
                  <div className="font-cyber font-bold text-sm text-white">{ed.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-mono">{ed.desc}</div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                  {ed.isComingSoon ? 'Status: Under Active Synthesis' : `Kernel: ${ed.kernel.split(' ')[1] || 'Hardened'}`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Edition View */}
        <AnimatePresence mode="wait">
          {!current.isComingSoon ? (
            /* ACTIVE 5-MIRROR SUITE */
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Package Header Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0a1120] border border-cyan-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-cyber font-bold text-base sm:text-lg text-white">{current.isoName}</h3>
                    <div className="text-xs font-mono text-cyan-400">
                      UEFI NVRAM Ready • Tested on Ventoy, Rufus &amp; Etcher • 100% Bug-Free Verified
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 w-fit">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    5 High-Speed Mirrors Live
                  </span>
                </div>

                {/* SHA-256 Bar */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs">
                  <span className="text-slate-400 shrink-0">SHA-256:</span>
                  <span className="text-cyan-300 truncate text-[11px]">{current.sha256}</span>
                  <button
                    onClick={handleCopySha}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Checksum"
                  >
                    {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 5-MIRROR DOWNLOAD GRID */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Select Download Mirror ({current.mirrors.length} Available):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.mirrors.map((m) => (
                    <a
                      key={m.id}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#0c1424] hover:bg-[#121f38] border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-between group cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.08)] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                            {m.badge}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">{m.speed}</span>
                        </div>
                        <div className="font-cyber font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {m.name}
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-cyan-400 group-hover:translate-y-0.5 transition-transform shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* COMING SOON: TITAN EVERYTHING EDITION */
            <motion.div
              key="everything-preview"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#130d24] via-[#090b16] to-[#04060c] border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/50 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <Flame className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Neural Synthesis In Progress
                </div>
                <h3 className="font-cyber font-black text-2xl sm:text-3xl text-white">
                  RITESH PC OS - EVERYTHING EDITION
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  The Titan Workstation Edition is being compiled with full Offline AI Large Language Models, Real-Time GPU Neural Shaders, 4K Multimedia Production Suite, and Kali Forensic Penetration Tools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/20 space-y-1">
                  <div className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" /> Local AI LLMs
                  </div>
                  <div className="text-[11px] text-slate-400">Offline generative neural engine with zero cloud latency.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/20 space-y-1">
                  <div className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" /> 4K Studio Core
                  </div>
                  <div className="text-[11px] text-slate-400">Real-time video rendering, audio DAW &amp; 3D physics workbench.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/20 space-y-1">
                  <div className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-400" /> Cyber Forensic
                  </div>
                  <div className="text-[11px] text-slate-400">Hardened penetration testing &amp; Wi-Fi network analysis.</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNotifyMe}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cyber font-extrabold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{notified ? '✓ You Will Be Notified on Launch!' : 'Notify Me Upon Launch'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flashing Guide Tabs */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
              USB Flashing &amp; Boot Guide:
            </span>
            <div className="flex gap-2 text-xs font-mono">
              {(['ventoy', 'rufus', 'etcher'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setActiveGuide(method)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeGuide === method
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-black/40 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {method === 'etcher' ? 'BALENA ETCHER' : method.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            {activeGuide === 'ventoy' && (
              <div className="space-y-2">
                <div>
                  <span className="text-cyan-400 font-bold">1. Ventoy MultiBoot (Recommended):</span> Install Ventoy on your USB drive, drag and drop the ISO file into the drive, and reboot in UEFI mode.
                </div>
                <div>
                  <a
                    href="https://www.ventoy.net/en/download.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors text-[11px]"
                  >
                    <span>Download Ventoy Official Flasher</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
            {activeGuide === 'rufus' && (
              <div className="space-y-2">
                <div>
                  <span className="text-cyan-400 font-bold">2. Rufus (Windows):</span> Choose Partition Scheme: <code className="text-cyan-300">GPT</code>, Target System: <code className="text-cyan-300">UEFI (non-CSM)</code>. Flash in <code className="text-yellow-300">ISO mode</code>.
                </div>
                <div>
                  <a
                    href="https://rufus.ie/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors text-[11px]"
                  >
                    <span>Download Rufus Windows Flasher</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
            {activeGuide === 'etcher' && (
              <div className="space-y-2">
                <div>
                  <span className="text-cyan-400 font-bold">3. Balena Etcher (Cross-Platform):</span> Select ISO, pick target USB, and click Flash! Works on Windows, Mac, and Linux.
                </div>
                <div>
                  <a
                    href="https://etcher.balena.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors text-[11px]"
                  >
                    <span>Download Balena Etcher Flasher</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
