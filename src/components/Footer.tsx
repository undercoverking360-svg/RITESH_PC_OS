import React, { useState, useEffect } from 'react';
import { MetallicLogo } from './MetallicLogo';
import { Shield, Terminal, Cpu, Globe, Heart, CheckCircle2, Copy, Check, Sparkles, DollarSign } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onOpenDonate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenTerminal, onOpenDonate }) => {
  const [copiedSha, setCopiedSha] = useState(false);
  const [timeUtc, setTimeUtc] = useState('');

  const masterSha = '9f8a3c4e7b2d1094f61e89a5c3e7d1b2f0a4c8e6d2b8a0f4e2c6d8a0b4c2e6f8';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopySha = () => {
    navigator.clipboard.writeText(masterSha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <footer className="relative bg-[#020407] border-t border-cyan-500/20 pt-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-400 font-mono text-xs">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <MetallicLogo size={42} glowColor="cyan" interactive={false} />
              <div>
                <span className="font-cyber font-black text-xl text-white tracking-wider flex items-center gap-2">
                  RITESH PC OS
                  <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-[10px] text-rose-300">
                    v2.0 LIVE
                  </span>
                </span>
                <span className="text-[11px] text-cyan-400 block">
                  Debian 12 Bookworm Core • Linux Kernel 6.12.0-x86_64
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              The next-generation cybernetic operating system combining a 4K Frosted Glass Kali-inspired
              desktop, direct GPU hardware-accelerated Waydroid Android subsystem, and integrated Windows
              compatibility layer into one unified live image.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Auth: Riteshguru (Passed)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px]">
                4096-BIT RSA
              </span>
            </div>
          </div>

          {/* Quick Ecosystem Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-cyber font-bold text-sm tracking-wider uppercase">
              Subsystems
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#ecosystem" className="hover:text-cyan-300 transition-colors">
                  Native Linux (Debian 12)
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-emerald-300 transition-colors">
                  Android Waydroid 13
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-blue-300 transition-colors">
                  Wine 9.0 / Bottles Engine
                </a>
              </li>
              <li>
                <a href="#boot-sequence" className="hover:text-cyan-300 transition-colors">
                  Toram Ultra-Fast RAM
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-cyber font-bold text-sm tracking-wider uppercase">
              Architecture
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#features" className="hover:text-cyan-300 transition-colors">
                  Master 5-Menu GRUB
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-300 transition-colors">
                  chattr +i Protection
                </a>
              </li>
              <li>
                <a href="#boot-sequence" className="hover:text-cyan-300 transition-colors">
                  15s Boot Anatomy
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-cyan-300 transition-colors">
                  Hardware Compatibility
                </a>
              </li>
            </ul>
          </div>

          {/* Download & CLI Col */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-cyber font-bold text-sm tracking-wider uppercase">
              Live Distribution
            </div>
            <div className="space-y-2">
              <button
                onClick={onOpenDownload}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-bold text-xs uppercase tracking-wider transition-all"
              >
                🚀 Download ISO (v2.0)
              </button>
              <button
                onClick={onOpenTerminal}
                className="w-full py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-emerald-400 font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                Launch CLI Terminal
              </button>
              {onOpenDonate && (
                <button
                  onClick={onOpenDonate}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-600/20 to-amber-500/20 hover:from-amber-500/30 hover:to-purple-600/30 border border-amber-400/50 hover:border-amber-300 text-amber-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-amber-300" />
                  Support via PhonePe / UPI
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Master SHA256 Checksum Bar */}
        <div className="p-4 rounded-2xl bg-[#060a14] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-400 font-bold">RELEASE MASTER SHA-256:</span>
            <span className="text-slate-300 font-mono text-xs truncate">{masterSha}</span>
          </div>

          <button
            onClick={handleCopySha}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 transition-colors flex-shrink-0"
          >
            {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSha ? 'Checksum Copied!' : 'Copy Checksum'}</span>
          </button>
        </div>

        {/* Telemetry Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 <span className="text-slate-300 font-bold">RITESH PC OS</span>. Architected & published with passion by <span className="text-cyan-400 font-bold">Riteshguru</span>.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold">SYSTEM NORMAL // ENCRYPTION: 4096-BIT</span>
            <span>•</span>
            <span className="text-cyan-300">{timeUtc}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
