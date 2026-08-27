import React from 'react';
import { motion } from 'motion/react';
import { MetallicLogo } from './MetallicLogo';
import { Download, Cpu, Zap, Shield, Sparkles, Terminal, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onExploreArch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDownload,
  onOpenTerminal,
  onExploreArch,
}) => {
  const highlights = [
    { label: 'Instant Boot Time', value: '15s', sub: 'NVMe / Fast RAM Mode', icon: Zap },
    { label: 'Display Engine', value: '4K 60FPS', sub: 'Frosted Glass Compositor', icon: Sparkles },
    { label: 'Zero Bloat', value: '0.0%', sub: 'Pure Debian Bookworm 12', icon: Cpu },
    { label: 'BIOS Priority', value: 'UEFI / NVRAM', sub: 'Hardware Protected Boot', icon: Shield },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Cyber Grid with Ambient Neon Glows */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Floating Cyber Status Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#081020]/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.2)] max-w-full">
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold text-cyan-300 tracking-wider uppercase truncate">
              ● LIVE UEFI / NVRAM HYBRID KERNEL v6.12
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block font-mono text-xs text-rose-400 font-bold">
              3-IN-1 ECOSYSTEM
            </span>
          </div>
        </div>

        {/* Main Epic Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <h1 className="font-cyber font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-tight sm:leading-none">
            RITESH PC OS
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
              The Next-Gen Cybernetic Operating System
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed px-2">
            Engineered with a stunning <span className="text-cyan-300 font-semibold">4K Frosted Glass UI</span>,{' '}
            <span className="text-white font-semibold">15-second instant live boot</span>, native{' '}
            <span className="text-emerald-400 font-semibold">Android Waydroid</span> &amp;{' '}
            <span className="text-blue-400 font-semibold">Windows compatibility subsystems</span>, and hardware UEFI/NVRAM security.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <button
              onClick={onOpenDownload}
              className="relative group w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs sm:text-base tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download className="w-5 h-5 text-black" />
              <span>Download Live ISO (v1.0)</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform" />
            </button>

            <button
              onClick={onExploreArch}
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#091122]/80 hover:bg-[#0f1d38] backdrop-blur-xl border border-cyan-500/40 text-cyan-300 hover:text-white font-cyber font-bold text-xs sm:text-base tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:border-cyan-400"
            >
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Explore Architecture</span>
            </button>

            <button
              onClick={onOpenTerminal}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 font-mono text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Run CLI Diagnostic</span>
            </button>
          </div>

          {/* Quick Specs Chips */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-[11px] sm:text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              Debian Bookworm 12 (64-bit)
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Direct GPU Passthrough
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
              UEFI / NVRAM Priority
            </span>
          </div>
        </div>

        {/* Highlight Stat Gauges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 max-w-5xl mx-auto">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-[#081020]/75 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-cyber font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight my-1">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-cyan-400/80 truncate font-medium">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
