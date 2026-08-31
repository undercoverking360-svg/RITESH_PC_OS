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
  Activity,
  BookOpen,
  UploadCloud,
} from 'lucide-react';
import { PageTabId } from '../types';

interface NavbarProps {
  activeTab: PageTabId;
  onSelectTab: (tab: PageTabId) => void;
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onOpenDonate: () => void;
  onOpenGuide?: () => void;
  onOpenUploads?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDownload,
  onOpenTerminal,
  onOpenDonate,
  onOpenGuide,
  onOpenUploads,
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
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-[#080b10]/95 backdrop-blur-2xl border-b border-cyan-500/30 z-50 flex items-center justify-between px-3 sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
      {/* 1. LEFT SECTION (Branding) */}
      <button
        onClick={() => {
          onSelectTab('overview');
          setMobileMenuOpen(false);
        }}
        className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer flex-shrink-0"
      >
        <div className="relative flex-shrink-0">
          <MetallicLogo size={34} glowColor="cyan" interactive={false} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <span className="font-cyber font-black text-xs sm:text-base tracking-wider text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              RITESH PC OS
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/60 text-[8px] sm:text-[9px] font-mono text-rose-300 font-bold whitespace-nowrap leading-none shadow-[0_0_8px_rgba(244,63,94,0.4)]">
              v2.0 LIVE
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 tracking-wider uppercase whitespace-nowrap mt-0.5 font-semibold">
            DEBIAN 12 • KERNEL 6.12
          </span>
        </div>
      </button>

      {/* 2. CENTER SECTION (Desktop Glass Navigation Pill Group - Visible on Screens >= 1024px) */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#0f172a]/70 border border-cyan-500/30 px-3 py-1 rounded-full shadow-inner shadow-cyan-500/10 flex-shrink-0">
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
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Live UTC Clock badge (Desktop) */}
        <div className="hidden 2xl:flex font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{liveTime} UTC</span>
          <span className="text-emerald-600">|</span>
          <span>{livePing}ms</span>
        </div>

        {/* Desktop Glowing [⬇ DOWNLOAD ISO] text button */}
        <button
          onClick={onOpenDownload}
          className="hidden lg:flex bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 active:scale-95 uppercase items-center gap-1.5 cursor-pointer select-none whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>DOWNLOAD ISO</span>
        </button>

        {/* Mobile Glowing [⬇] Icon Button */}
        <button
          onClick={onOpenDownload}
          className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 active:scale-90 transition-transform cursor-pointer"
          title="Download ISO"
          aria-label="Download ISO"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Exact Cyber 3-Line Hamburger Toggle (Mobile Only: lg:hidden) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white active:scale-90 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-rose-400" />
          ) : (
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
              <span className="w-4 h-[2px] bg-cyan-400 rounded-full transition-all" />
              <span className="w-4 h-[2px] bg-cyan-400 rounded-full transition-all" />
              <span className="w-4 h-[2px] bg-cyan-400 rounded-full transition-all" />
            </div>
          )}
        </button>
      </div>

      {/* 4. MOBILE / TABLET CYBER DRAWER (Slide Down with ALL Header Options) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#070b14]/98 backdrop-blur-2xl border-b border-cyan-500/40 px-4 py-4 space-y-2 font-mono text-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Top 2 Special Quick Action Cards in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 pb-1">
            {onOpenGuide && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-500/20 shadow-[0_0_12px_rgba(0,240,255,0.25)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="font-cyber font-black text-cyan-400 text-sm">&gt;_</span>
                <span>Guide CMS</span>
              </button>
            )}

            {onOpenUploads && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUploads();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-950/90 border border-blue-500/50 text-blue-300 font-mono text-xs font-bold hover:bg-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.25)] active:scale-95 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-blue-400" />
                <span>Uploads Hub</span>
              </button>
            )}
          </div>
          {/* [🏠 Overview] */}
          <button
            onClick={() => {
              onSelectTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Overview &amp; Features</span>
          </button>

          {/* [💻 UEFI Sandbox] */}
          <button
            onClick={() => {
              onSelectTab('simulator');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>UEFI Sandbox Simulator</span>
          </button>

          {/* [💠 3-in-1 Matrix] */}
          <button
            onClick={() => {
              onSelectTab('ecosystem');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'ecosystem'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>3-in-1 Ecosystem Matrix</span>
          </button>

          {/* [🛡️ Security] */}
          <button
            onClick={() => {
              onSelectTab('security');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'security'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Immutable BIOS Security</span>
          </button>

          {/* [⚡ 15s Boot & Specs] */}
          <button
            onClick={() => {
              onSelectTab('bootflow');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'bootflow'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>15s Boot Sequence &amp; Specs</span>
          </button>

          {/* [💻 Launch CLI Diagnostic Terminal] */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 transition-all border border-emerald-500/20 bg-emerald-950/20"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">Launch CLI Diagnostic</span>
          </button>

          {/* [💛 Donate UPI Action] */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl w-full text-left text-amber-300 bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-400/50 hover:bg-amber-500/30 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
          >
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Donate via UPI / QR</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">₹ PhonePe</span>
          </button>

          {/* [🚀 Download Live ISO Primary Action] */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDownload();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-cyber font-black text-xs uppercase text-center tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>DOWNLOAD LIVE ISO (v2.0)</span>
          </button>

          {/* Telemetry Status Bar in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{liveTime} UTC</span>
            </div>
            <div className="text-cyan-400 font-mono">
              Latency: <span className="text-slate-200">{livePing}ms</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
