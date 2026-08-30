import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  X,
  ExternalLink,
  Zap,
  HardDrive,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownload?: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<'ventoy' | 'rufus' | 'etcher' | 'dd'>('ventoy');
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const ddCmd = 'sudo dd if=RITESH_PC_OS_LIGHT_V1.0.iso of=/dev/sdX bs=4M status=progress oflag=sync';

  const handleCopyDd = () => {
    navigator.clipboard.writeText(ddCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl rounded-3xl bg-[#080d19] border border-cyan-500/40 p-5 sm:p-7 md:p-8 text-white shadow-[0_0_80px_rgba(0,240,255,0.25)] space-y-6 my-auto max-h-[92vh] overflow-y-auto"
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
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Flashing &amp; Installation Guide
          </div>
          <h2 className="font-cyber font-black text-2xl sm:text-3xl text-white tracking-wide">
            USB Live Boot &amp; Installation Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Follow the step-by-step flashing instructions below to create a bootable USB drive in seconds.
          </p>
        </div>

        {/* Guide Selector Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: 'ventoy', label: '1. VENTOY (MULTIBOOT)' },
            { id: 'rufus', label: '2. RUFUS (WINDOWS)' },
            { id: 'etcher', label: '3. BALENA ETCHER' },
            { id: 'dd', label: '4. LINUX CLI (DD)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                activeTab === t.id
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-black/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dynamic Guide Content */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-cyan-500/20 font-mono text-xs space-y-4 text-slate-300">
          {activeTab === 'ventoy' && (
            <div className="space-y-3">
              <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Ventoy MultiBoot Flashing (Fastest &amp; Easiest Method)
              </div>
              <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed text-xs">
                <li>Download and install <strong>Ventoy</strong> to your USB Flash Drive (16GB+ recommended).</li>
                <li>Once installed, your USB will appear as a standard removable drive.</li>
                <li>Simply <strong>Drag &amp; Drop</strong> the downloaded <code className="text-cyan-300">RITESH_PC_OS_LIGHT_V1.0.iso</code> into the USB drive.</li>
                <li>Reboot your PC, enter UEFI Boot Menu (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">F12</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">F11</kbd>, or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">ESC</kbd>), and select your USB drive!</li>
              </ol>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://www.ventoy.net/en/download.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors font-bold text-xs"
                >
                  <span>Download Ventoy Official Flasher</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'rufus' && (
            <div className="space-y-3">
              <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Rufus Windows Flashing Guide
              </div>
              <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed text-xs">
                <li>Insert your USB drive and launch <strong>Rufus</strong> on Windows.</li>
                <li>Click <strong>SELECT</strong> and choose your downloaded ISO file.</li>
                <li>Set <strong>Partition Scheme:</strong> <code className="text-cyan-300">GPT</code> and <strong>Target System:</strong> <code className="text-cyan-300">UEFI (non-CSM)</code>.</li>
                <li>Click <strong>START</strong> and select <strong>Write in ISO Image mode</strong> (Recommended).</li>
              </ol>
              <div className="pt-2">
                <a
                  href="https://rufus.ie/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors font-bold text-xs"
                >
                  <span>Download Rufus Windows Flasher</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'etcher' && (
            <div className="space-y-3">
              <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Balena Etcher (Cross-Platform Win/Mac/Linux)
              </div>
              <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed text-xs">
                <li>Launch <strong>Balena Etcher</strong> and click <strong>Flash from file</strong>.</li>
                <li>Select the downloaded <code className="text-cyan-300">RITESH_PC_OS_LIGHT_V1.0.iso</code>.</li>
                <li>Select your Target USB drive.</li>
                <li>Click <strong>Flash!</strong> and wait for verification to complete.</li>
              </ol>
              <div className="pt-2">
                <a
                  href="https://etcher.balena.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors font-bold text-xs"
                >
                  <span>Download Balena Etcher</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'dd' && (
            <div className="space-y-3">
              <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Native Linux CLI dd Raw Command
              </div>
              <p className="text-xs text-slate-300">
                Execute raw hybrid disk write directly from any Linux terminal:
              </p>
              <div className="p-3 rounded-xl bg-black/80 border border-slate-800 flex items-center justify-between gap-2">
                <code className="text-emerald-400 text-[11px] truncate">{ddCmd}</code>
                <button
                  onClick={handleCopyDd}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy Command"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
