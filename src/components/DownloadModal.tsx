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
  Sparkles
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedEdition, setSelectedEdition] = useState<string>('stable');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [activeGuide, setActiveGuide] = useState<'ventoy' | 'rufus' | 'etcher'>('ventoy');

  if (!isOpen) return null;

  const editions = [
    {
      id: 'light',
      name: 'RITESH PC OS - Light V1.0',
      badge: 'LIGHT V1.0',
      size: '2.8 GB',
      build: 'Build 2026.08-Light',
      kernel: 'Linux 6.12.0-light-x86_64',
      desc: 'Super lightweight & optimized edition with core Debian 12 utilities, fast RAM boot, and minimal resource footprint.',
      isoName: 'Ritesh-PC-OS-Light-V1.0.iso',
    },
    {
      id: 'stable',
      name: 'RITESH PC OS - Stable V1.0',
      badge: 'STABLE V1.0 (RECOMMENDED)',
      size: '3.6 GB',
      build: 'Build 2026.08-Stable',
      kernel: 'Linux 6.12.0-stable-x86_64',
      desc: 'The rock-solid 3-in-1 flagship powerhouse: Toram ultra-speed RAM mode, Waydroid Android gaming, and Windows Wine engine.',
      isoName: 'Ritesh-PC-OS-Stable-V1.0.iso',
    },
    {
      id: 'everything',
      name: 'RITESH PC OS - Everything Edition',
      badge: 'CYBER SECURITY & FORENSIC',
      size: '4.9 GB',
      build: 'Build 2026.08-Sec',
      kernel: 'Linux 6.12.0-hardened-x86_64',
      desc: 'The complete cyber suite with Kali penetration testing tools, Wi-Fi packet analysis, sandboxed dev tools, and network diagnostics.',
      isoName: 'Ritesh-PC-OS-Everything.iso',
    },
  ];

  const current = editions.find((e) => e.id === selectedEdition) || editions[0];

  const triggerDownload = (type: 'direct' | 'torrent') => {
    setDownloadStarted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff0055', '#3b82f6'],
      });
    } catch {
      // Confetti fallback
    }

    const blob = new Blob(
      [
        `# RITESH PC OS V1.0 OFFICIAL DOWNLOAD METADATA\n` +
          `File: ${current.isoName}\n` +
          `Edition: ${current.name}\n` +
          `Kernel: ${current.kernel}\n` +
          `Mirror: Global High-Speed CDN Edge Node #1\n` +
          `Author: Riteshguru\n` +
          `Instructions: Flash via Ventoy, Rufus, or Balena Etcher in GPT/UEFI mode.\n`,
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.isoName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl rounded-3xl bg-[#070c18] border border-cyan-500/40 p-5 sm:p-8 shadow-2xl space-y-6 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Download className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                OFFICIAL ISO DISTRIBUTION (V1.0)
              </span>
              <h3 className="font-cyber font-black text-lg sm:text-2xl text-white">
                Download RITESH PC OS (V1.0)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edition Selector */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Select OS Flavor:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {editions.map((ed) => {
              const isSelected = selectedEdition === ed.id;
              return (
                <div
                  key={ed.id}
                  onClick={() => setSelectedEdition(ed.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#0a1428] border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-black/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 font-bold">
                        {ed.badge}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">{ed.size}</span>
                    </div>
                    <div className="font-cyber font-bold text-sm text-white">{ed.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ed.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                    Kernel: {ed.kernel.split('-')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Package Details & Download Actions */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-cyber font-bold text-base sm:text-lg text-white break-words">{current.isoName}</div>
              <div className="text-xs font-mono text-cyan-400">
                UEFI / NVRAM 64-bit • Direct USB / NVMe Live Boot • Master 5-Menu GRUB Suite Included
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Global CDN Online
              </span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => triggerDownload('direct')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Direct High-Speed ISO ({current.size})</span>
            </button>

            <button
              onClick={() => triggerDownload('torrent')}
              className="px-6 py-3.5 rounded-xl bg-[#0a1324] hover:bg-[#0f1d38] border border-cyan-500/40 text-cyan-300 hover:text-white font-cyber font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Torrent Magnet Link</span>
            </button>
          </div>
        </div>

        {/* USB Flash & Installation Guide Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
              Flashing &amp; Live Boot Guide:
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
                  <span className="text-cyan-400 font-bold">1. Recommended (Ventoy MultiBoot):</span> Install Ventoy to a USB flash drive (16GB+), then simply drag and drop the <code className="text-rose-300">Ritesh-PC-OS.iso</code> into the USB drive. Boot in UEFI mode.
                </div>
                <div className="pt-1">
                  <a
                    href="https://www.ventoy.net/en/download.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px]"
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
                  <span className="text-cyan-400 font-bold">2. Rufus (Windows Flasher):</span> Open Rufus, select the USB drive and ISO. Choose Partition Scheme: <code className="text-cyan-300">GPT</code>, Target System: <code className="text-cyan-300">UEFI (non-CSM)</code>. Flash in <code className="text-yellow-300">ISO mode</code>.
                </div>
                <div className="pt-1">
                  <a
                    href="https://rufus.ie/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px]"
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
                  <span className="text-cyan-400 font-bold">3. Balena Etcher (Cross-Platform Flasher):</span> Select the downloaded ISO file, choose your target USB drive, and click Flash! Works flawlessly on Windows, Mac, and Linux.
                </div>
                <div className="pt-1">
                  <a
                    href="https://etcher.balena.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px]"
                  >
                    <span>Download Balena Etcher Official Flasher</span>
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
