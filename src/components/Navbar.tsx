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
  Upload,
  BookOpen
} from 'lucide-react';
import { PageTabId } from '../types';

interface NavbarProps {
  activeTab: PageTabId;
  onSelectTab: (tab: PageTabId) => void;
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onOpenDonate: () => void;
  onOpenUpload: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDownload,
  onOpenTerminal,
  onOpenDonate,
  onOpenUpload,
  onOpenGuide,
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#080b10]/95 backdrop-blur-2xl border-b border-cyan-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* 1. BRAND LOGO & TITLE */}
      <div
        onClick={() => onSelectTab('overview')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <MetallicLogo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:rotate-12 transition-transform duration-300" />
        <div>
          <div className="font-cyber font-black text-sm sm:text-base tracking-wider text-white flex items-center gap-2">
            <span>RITESH PC OS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              V1.0
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
            4K Frosted Glass • 3-in-1 Hybrid
          </div>
        </div>
      </div>

      {/* 2. DESKTOP NAVIGATION TABS (Visible on Large Screens) */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#05080f]/80 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
        {/* [🏠 Overview] */}
        <button
          onClick={() => onSelectTab('overview')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        {/* [💻 UEFI Simulator] */}
        <button
          onClick={() => onSelectTab('simulator')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>UEFI Sandbox</span>
        </button>

        {/* [💠 3-in-1 Ecosystem] */}
        <button
          onClick={() => onSelectTab('ecosystem')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'ecosystem'
              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3-in-1 Matrix</span>
        </button>

        {/* [🛡️ Security] */}
        <button
          onClick={() => onSelectTab('security')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security</span>
        </button>

        {/* [📖 Guide >] */}
        <button
          onClick={onOpenGuide}
          className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-cyan-300 hover:text-white hover:bg-cyan-950/60 border border-cyan-500/30 cursor-pointer font-bold"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Guide &gt;</span>
        </button>

        {/* [☁️ Upload / Sheet] */}
        <button
          onClick={onOpenUpload}
          className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-emerald-300 hover:text-white hover:bg-emerald-950/60 border border-emerald-500/30 cursor-pointer font-bold"
        >
          <Upload className="w-3.5 h-3.5 text-emerald-400" />
          <span>Upload</span>
        </button>
      </nav>

      {/* 3. RIGHT HEADER CONTROLS (Desktop & Mobile) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* CLI Diagnostic Icon Button */}
        <button
          onClick={onOpenTerminal}
          className="hidden md:flex p-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer shadow-sm"
          title="Launch CLT Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>

        {/* Donate UPI Button */}
        <button
          onClick={onOpenDonate}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-300 hover:bg-amber-500/20 font-cyber font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Donate via UPI QR"
        >
          <DollarSign className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Donate</span>
        </button>

        {/* Desktop Primary [Download ISO] CTA Button */}
        <button
          onClick={onOpenDownload}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-cyber font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer border border-cyan-300/40"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>DOWNLOAD ISO</span>
        </button>

        {/* Mobile Glowing [⬇] Icon Button */}
        <button
          onClick={onOpenDownload}
          className="sm:hidden p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 active:scale-90 transition-transform cursor-pointer"
          title="Download ISO"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Animated Cyber Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white active:scale-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-rose-400" />
          ) : (
            <Menu className="w-5 h-5 text-cyan-400" />
          )}
        </button>
      </div>

      {/* 4. MOBILE / TABLET CYBER DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#070b14]/98 backdrop-blur-2xl border-b border-cyan-500/40 px-4 py-4 space-y-2 font-mono text-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              onSelectTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Overview &amp; Features</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('simulator');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>UEFI Sandbox Simulator</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('ecosystem');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left transition-all ${
              activeTab === 'ecosystem'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/50'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>3-in-1 Ecosystem Matrix</span>
          </button>

          {/* Guide > Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGuide();
            }}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left text-cyan-300 hover:bg-cyan-950/60 transition-all border border-cyan-500/30 bg-cyan-950/20"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Flashing Guide &gt;</span>
          </button>

          {/* Upload & Sheet Sync Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUpload();
            }}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl w-full text-left text-emerald-300 hover:bg-emerald-950/60 transition-all border border-emerald-500/30 bg-emerald-950/20"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Upload / Sheet Sync</span>
          </button>

          {/* Donate UPI Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl w-full text-left text-amber-300 bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-400/50 hover:bg-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Donate via UPI / QR</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">₹ PhonePe</span>
          </button>

          {/* Download Live ISO Primary Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDownload();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-cyber font-black text-xs uppercase text-center tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>DOWNLOAD LIVE ISO (5 MIRRORS)</span>
          </button>
        </div>
      )}
    </header>
  );
};
