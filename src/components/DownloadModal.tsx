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
  const [selectedEdition, setSelectedEdition] = useState<string>('ultimate');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [activeGuide, setActiveGuide] = useState<'rufus' | 'ventoy' | 'dd'>('ventoy');

  if (!isOpen) return null;

  const editions = [
    {
      id: 'ultimate',
      name: 'RITESH PC OS v2.0 - Ultimate 3-in-1 Edition',
      badge: 'MOST POPULAR',
      size: '4.2 GB',
      build: 'Build 2026.08-UEFI',
      kernel: 'Linux 6.12.0-custom-x86_64',
      desc: 'The complete 3-in-1 powerhouse: Debian 12 Base, 4K Frosted Glass UI, Waydroid Android Subsystem, and Bottles Windows Wine Engine.',
      isoName: 'RiteshPC-OS-v2.0-Ultimate-3in1-x86_64.iso',
    },
    {
      id: 'toram',
      name: 'RITESH PC OS v2.0 - Toram Ultra-Fast RAM Edition',
      badge: '15GB/s MEMORY SPEED',
      size: '3.6 GB',
      build: 'Build 2026.08-Toram',
      kernel: 'Linux 6.12.0-toram-x86_64',
      desc: 'Pre-tuned to load the entire operating system into RAM on boot. Runs 100% in memory with zero storage latency.',
      isoName: 'RiteshPC-OS-v2.0-Toram-RAM-x86_64.iso',
    },
    {
      id: 'forensic',
      name: 'RITESH PC OS v2.0 - Cyber Security & Forensic Edition',
      badge: 'KALI PEN-TEST SUITE',
      size: '4.9 GB',
      build: 'Build 2026.08-Sec',
      kernel: 'Linux 6.12.0-hardened-x86_64',
      desc: 'Hardened kernel with Wi-Fi packet injection, Bluetooth analysis, network scanner daemons, and encrypted Ramdisk vaults.',
      isoName: 'RiteshPC-OS-v2.0-CyberSec-Forensic-x86_64.iso',
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

    // Create synthetic download trigger for the ISO bundle descriptor
    const blob = new Blob(
      [
        `# RITESH PC OS v2.0 OFFICIAL DOWNLOAD METADATA\n` +
          `File: ${current.isoName}\n` +
          `Edition: ${current.name}\n` +
          `Kernel: ${current.kernel}\n` +
          `Mirror: Global High-Speed CDN Edge Node #1\n` +
          `Author: Riteshguru\n` +
          `Instructions: Flash via Ventoy or Rufus in GPT/UEFI mode.\n`,
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
                OFFICIAL ISO DISTRIBUTION
              </span>
              <h3 className="font-cyber font-black text-lg sm:text-2xl text-white">
                Download RITESH PC OS (v2.0)
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
                    <div className="font-cyber font-bold text-sm text-white">{ed.name.split('-')[1]}</div>
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
                UEFI 64-bit • Direct USB / NVMe Live Boot • 5-Menu GRUB Suite Included
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
              {(['ventoy', 'rufus', 'dd'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setActiveGuide(method)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeGuide === method
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-black/40 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {method.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            {activeGuide === 'ventoy' && (
              <div>
                <span className="text-cyan-400 font-bold">1. Recommended (Ventoy MultiBoot):</span> Install Ventoy to a USB flash drive (16GB+), then simply drag and drop the <code className="text-rose-300">RiteshPC-OS.iso</code> into the USB drive. Boot in UEFI mode.
              </div>
            )}
            {activeGuide === 'rufus' && (
              <div>
                <span className="text-cyan-400 font-bold">2. Rufus (Windows Flasher):</span> Open Rufus, select the USB drive and ISO. Choose Partition Scheme: <code className="text-cyan-300">GPT</code>, Target System: <code className="text-cyan-300">UEFI (non-CSM)</code>. Flash in <code className="text-yellow-300">ISO mode</code> (or DD mode).
              </div>
            )}
            {activeGuide === 'dd' && (
              <div>
                <span className="text-cyan-400 font-bold">3. Linux Terminal DD CLI:</span>{' '}
                <code className="text-emerald-400 bg-slate-950 p-1 rounded break-all">
                  sudo dd if=RiteshPC-OS.iso of=/dev/sdX bs=4M status=progress oflag=sync
                </code>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
