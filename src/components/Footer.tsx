import React, { useState, useEffect } from 'react';
import { MetallicLogo } from './MetallicLogo';
import { Shield, Terminal, Cpu, Globe, Heart, CheckCircle2, Sparkles, DollarSign } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onOpenDonate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenTerminal, onOpenDonate }) => {
  const [timeUtc, setTimeUtc] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#020407] border-t border-cyan-500/20 pt-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-400 font-mono text-xs">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
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
                <p className="text-[11px] text-slate-500 mt-0.5">
                  The Cybernetic 3-in-1 Operating System Environment
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              Engineered for absolute hardware performance, privacy, and gaming freedom. Combines Debian 12 stability, native Waydroid Android execution, and isolated Windows emulation on a unified 6.12 low-latency kernel.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                UEFI Dual-Mode (GPT)
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                15s Fast RAM Caching
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-rose-300">
                Immutable Boot Priority
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-cyber font-bold text-white uppercase tracking-wider text-xs">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenDownload} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  ● Download Official ISO Images
                </button>
              </li>
              <li>
                <button onClick={onOpenTerminal} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  ● Launch Interactive CLT Terminal
                </button>
              </li>
              <li>
                <a href="#simulator" className="hover:text-cyan-400 transition-colors">
                  ● UEFI GRUB Bootloader Sandbox
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-cyan-400 transition-colors">
                  ● 3-in-1 Ecosystem Architecture
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  ● Security &amp; Forensic Tooling
                </a>
              </li>
            </ul>
          </div>

          {/* Developer / Support */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-cyber font-bold text-white uppercase tracking-wider text-xs">
              Direct Developer Contact
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Built and maintained with complete dedication by <strong className="text-cyan-300">Riteshguru</strong>. All releases are 100% free and open-source.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              {onOpenDonate && (
                <button
                  onClick={onOpenDonate}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-yellow-300 hover:text-white hover:bg-yellow-500/30 transition-all text-xs font-cyber font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                >
                  <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>Support Project via UPI / QR</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Telemetry Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 <span className="text-slate-300 font-bold">RITESH PC OS</span>. Architected &amp; published with passion by <span className="text-cyan-400 font-bold">Riteshguru</span>.
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
