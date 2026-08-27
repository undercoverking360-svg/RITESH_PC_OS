import React, { useState, useEffect } from 'react';
import { MetallicLogo } from './MetallicLogo';
import {
  Download,
  Terminal,
  Shield,
  Zap,
  Layers,
  Menu,
  X,
  Monitor,
  Heart,
  Home,
  DollarSign,
} from 'lucide-react';
import { PageTabId } from '../types';

interface NavbarProps {
  activeTab: PageTabId;
  onSelectTab: (tab: PageTabId) => void;
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onOpenDonate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDownload,
  onOpenTerminal,
  onOpenDonate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [livePing, setLivePing] = useState(13);
  const [liveTime, setLiveTime] = useState('00:48');

  useEffect(() => {
    // Live clock
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Ping jitter simulation
    const pingInterval = setInterval(() => {
      setLivePing(Math.floor(12 + Math.random() * 3));
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-[#080b10]/90 backdrop-blur-xl border-b border-cyan-500/20 z-50 flex items-center justify-between px-4 sm:px-6 max-w-full overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* 1. LEFT SECTION (Branding) */}
      <button
        onClick={() => onSelectTab('overview')}
        className="flex items-center gap-3 group text-left cursor-pointer flex-shrink-0"
      >
        <div className="relative flex-shrink-0">
          <MetallicLogo size={36} glowColor="cyan" interactive={false} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 leading-none">
            <span className="font-cyber font-black text-sm sm:text-base tracking-wider text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              RITESH PC OS
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/60 text-[9px] font-mono text-rose-300 font-bold whitespace-nowrap leading-none shadow-[0_0_8px_rgba(244,63,94,0.4)]">
              v2.0 LIVE
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase whitespace-nowrap mt-0.5 font-semibold">
            DEBIAN 12 • KERNEL 6.12
          </span>
        </div>
      </button>

      {/* 2. CENTER SECTION (All Navigation in 1 Single Glass Pill Group) */}
      <nav className="hidden md:flex items-center gap-1 bg-[#0f172a]/70 border border-cyan-500/30 px-3 py-1 rounded-full shadow-inner shadow-cyan-500/10">
        {/* [🏠 Overview] */}
        <button
          onClick={() => onSelectTab('overview')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Overview</span>
        </button>

        {/* [💻 UEFI Sandbox] */}
        <button
          onClick={() => onSelectTab('simulator')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 text-cyan-400" />
          <span>UEFI Sandbox</span>
        </button>

        {/* [💠 3-in-1 Matrix] */}
        <button
          onClick={() => onSelectTab('ecosystem')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            activeTab === 'ecosystem'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>3-in-1 Matrix</span>
        </button>

        {/* [🛡️ Security] */}
        <button
          onClick={() => onSelectTab('security')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Security</span>
        </button>

        {/* [⚡ 15s Boot & Specs] */}
        <button
          onClick={() => onSelectTab('bootflow')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            activeTab === 'bootflow'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>15s Boot & Specs</span>
        </button>

        {/* [💛 Donate UPI] */}
        <button
          onClick={onOpenDonate}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 transition-all duration-200 cursor-pointer select-none whitespace-nowrap border border-amber-500/30 hover:border-amber-400/60 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.15)]"
        >
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span>Donate UPI</span>
        </button>
      </nav>

      {/* 3. RIGHT SECTION (System Telemetry & Primary CTA) */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Live UTC Clock badge */}
        <div className="hidden lg:flex font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{liveTime} UTC</span>
          <span className="text-emerald-600">|</span>
          <span>{livePing}ms</span>
        </div>

        {/* Glowing [⬇ DOWNLOAD ISO] button */}
        <button
          onClick={onOpenDownload}
          className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 active:scale-95 uppercase flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>DOWNLOAD ISO</span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#070b14]/98 backdrop-blur-2xl border-b border-cyan-500/30 px-5 py-4 space-y-2 font-mono text-sm shadow-2xl z-50">
          <button
            onClick={() => {
              onSelectTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('simulator');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>UEFI Sandbox</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('ecosystem');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'ecosystem'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>3-in-1 Matrix</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('security');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'security'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Security</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('bootflow');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'bootflow'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>15s Boot & Specs</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('downloads');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left transition-colors ${
              activeTab === 'downloads'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>ISO Downloads Repository</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-left text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 transition-colors"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Launch Live CLI</span>
          </button>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-400/50 text-amber-200 font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-300" />
              <span>Donate (PhonePe / UPI)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-cyber font-bold text-xs uppercase text-center tracking-wider"
            >
              🚀 DOWNLOAD LIVE ISO (v2.0)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
