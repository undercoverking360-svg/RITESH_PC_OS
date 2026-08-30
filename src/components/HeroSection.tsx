import React from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Shield,
  CheckCircle2,
  Sparkles,
  Upload,
  BookOpen,
  HardDrive
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
  onExploreArch: () => void;
  onOpenUpload: () => void;
  onOpenGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDownload,
  onOpenTerminal,
  onExploreArch,
  onOpenUpload,
  onOpenGuide,
}) => {
  const highlights = [
    { label: 'Instant Live Boot', value: '15.2s', sub: 'Toram SquashFS RAM', icon: Zap },
    { label: 'Idle RAM Consumption', value: '480 MB', sub: 'Debian 12 Lightweight', icon: Cpu },
    { label: 'Subsystem Passthrough', value: '3-in-1', sub: 'Linux + Android + Wine', icon: Layers },
    { label: 'UEFI & BIOS Security', value: '100%', sub: 'Immutable NVRAM Priority', icon: Shield },
  ];

  return (
    <motion.section
      id="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="font-mono text-xs tracking-wider uppercase font-bold">
              V1.0 OFFICIAL RELEASE LIVE
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block font-mono text-xs text-rose-400 font-bold">
              3-IN-1 ECOSYSTEM
            </span>
          </div>
        </motion.div>

        {/* Main Epic Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-cyber font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-tight sm:leading-none"
          >
            RITESH PC OS
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
              The Next-Gen Cybernetic Operating System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed px-2"
          >
            Engineered with a stunning <span className="text-cyan-300 font-semibold">4K Frosted Glass UI</span>,{' '}
            <span className="text-white font-semibold">15-second instant live boot</span>, native{' '}
            <span className="text-emerald-400 font-semibold">Android Waydroid</span> &amp;{' '}
            <span className="text-blue-400 font-semibold">Windows compatibility subsystems</span>, and hardware UEFI/NVRAM security.
          </motion.p>

          {/* Symmetrically Aligned 4 Action CTAs including Upload and Guide > */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4"
          >
            {/* Button 1: Upload / Sheet Sync */}
            <button
              onClick={onOpenUpload}
              className="relative group w-full sm:w-auto min-h-[52px] px-7 sm:px-8 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-cyber font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden border border-emerald-300/40"
            >
              <Upload className="w-4 h-4 text-black" />
              <span>Upload / Sheet Sync</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform" />
            </button>

            {/* Button 2: Download ISO */}
            <button
              onClick={onOpenDownload}
              className="relative group w-full sm:w-auto min-h-[52px] px-7 sm:px-8 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden border border-cyan-300/40"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Download Live ISO (V1.0)</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform" />
            </button>

            {/* Button 3: Installation Guide > */}
            <button
              onClick={onOpenGuide}
              className="relative group w-full sm:w-auto min-h-[52px] px-6 sm:px-7 rounded-xl bg-[#091224]/90 hover:bg-[#0f1d38] backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-cyber font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Flashing Guide &gt;</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-transform" />
            </button>

            {/* Button 4: Run CLI Diagnostic */}
            <button
              onClick={onOpenTerminal}
              className="relative group w-full sm:w-auto min-h-[52px] px-6 sm:px-7 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 font-mono text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Run CLI Diagnostic</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent transition-transform" />
            </button>
          </motion.div>

          {/* Quick Specs Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-[11px] sm:text-xs font-mono text-slate-400 pt-2"
          >
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
          </motion.div>
        </div>

        {/* Highlight Stat Gauges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 max-w-5xl mx-auto"
        >
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
        </motion.div>
      </div>
    </motion.section>
  );
};
