import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check, Sparkles } from 'lucide-react';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownload: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenDownload,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'ritesh-os --welcome',
      output: (
        <div className="space-y-2 text-xs">
          <div className="text-cyan-400 font-cyber font-bold text-sm">
            ⚡ RITESH PC OS v2.0 (Debian 12 Bookworm / Linux Kernel 6.12.0-x86_64)
          </div>
          <div className="text-slate-300">
            Welcome to the Cybernetic CLI Environment. Type <span className="text-cyan-300 font-bold">help</span> to list available diagnostic tools.
          </div>
          <div className="text-emerald-400">
            [+] 3-in-1 Power Combo: Linux Native • Waydroid Android • Wine 9.0 Loaded
          </div>
        </div>
      ),
      timestamp: '10:00:01',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    let result: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1 text-slate-300 text-xs">
            <div className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</div>
            <div><span className="text-emerald-400 font-bold">neofetch</span> - Display full OS hardware specs & ASCII emblem</div>
            <div><span className="text-emerald-400 font-bold">status</span> - Check kernel, UEFI NVRAM, and persistent overlay</div>
            <div><span className="text-emerald-400 font-bold">waydroid</span> - Inspect Android 13 LXC hardware acceleration</div>
            <div><span className="text-emerald-400 font-bold">wine</span> - Display Windows compatibility layer (DXVK / Bottles)</div>
            <div><span className="text-emerald-400 font-bold">grub</span> - Check immutable chattr +i bootloader status</div>
            <div><span className="text-emerald-400 font-bold">benchmarks</span> - Run 15-second live boot memory benchmarks</div>
            <div><span className="text-emerald-400 font-bold">download</span> - Trigger instant ISO download modal</div>
            <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal session output</div>
          </div>
        );
        break;

      case 'neofetch':
        result = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-black/60 p-3 rounded-lg border border-cyan-500/20">
            <div className="text-cyan-400 space-y-0.5">
              <div>    _____ _ _            _     </div>
              <div>   |  __ (_) |          | |    </div>
              <div>   | |__) || |_ ___  ___| |__  </div>
              <div>   |  _  /| | __/ _ \/ __| '_ \ </div>
              <div>   | | \ \| | ||  __/\__ \ | | |</div>
              <div>   |_|  \_\_|\__\___||___/_| |_|</div>
              <div>   =============================</div>
              <div className="text-rose-400 font-bold">   RITESH PC OS [Debian 12]</div>
            </div>
            <div className="space-y-1 text-slate-300">
              <div><span className="text-cyan-400 font-bold">OS:</span> RITESH PC OS (Debian 12 Bookworm) x86_64</div>
              <div><span className="text-cyan-400 font-bold">Kernel:</span> 6.12.0-custom-uefi</div>
              <div><span className="text-cyan-400 font-bold">Uptime:</span> 7 days, 14 hours</div>
              <div><span className="text-cyan-400 font-bold">Packages:</span> 1,842 (dpkg), 12 (flatpak), 4 (LXC)</div>
              <div><span className="text-cyan-400 font-bold">Shell:</span> zsh 5.9 (cyber-prompt)</div>
              <div><span className="text-cyan-400 font-bold">DE:</span> Cyber Glass 4K (Picom Compositor)</div>
              <div><span className="text-cyan-400 font-bold">Subsystems:</span> Waydroid (Android 13) + Wine 9.0 Staging</div>
              <div><span className="text-cyan-400 font-bold">Memory:</span> 1,120MiB / 32,768MiB (3%)</div>
            </div>
          </div>
        );
        break;

      case 'status':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold">[✓] UEFI 64-bit Handshake: PASSED (BootOrder: 0001)</div>
            <div className="text-emerald-400 font-bold">[✓] Linux Kernel 6.12: HARDWARE LOADED</div>
            <div className="text-emerald-400 font-bold">[✓] Toram RAM Mode: READY (3.2x zstd compression)</div>
            <div className="text-emerald-400 font-bold">[✓] Root Persistence: /live/persistence (chattr +i enabled)</div>
            <div className="text-cyan-300 font-bold">System Status: 100% HEALTHY // ZERO ANOMALIES DETECTED</div>
          </div>
        );
        break;

      case 'waydroid':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">WAYDROID LXC CONTAINER SUBSYSTEM:</div>
            <div>• Android Version: 13 (Tiramisu GApps)</div>
            <div>• Binder IPC Driver: Loaded (/dev/binder, /dev/hwbinder, /dev/vndbinder)</div>
            <div>• GPU Passthrough: Direct Vulkan 1.3 to /dev/dri/card0</div>
            <div>• APK Support: Native Hardware Execution (Zero Emulation)</div>
            <div className="text-emerald-400">● Container Status: ACTIVE // 120 FPS PASSTHROUGH</div>
          </div>
        );
        break;

      case 'wine':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-blue-400 font-bold">WINDOWS COMPATIBILITY MATRIX:</div>
            <div>• Engine: Wine 9.0 Staging + Bottles Pro Prefixes</div>
            <div>• DirectX Layer: DXVK 2.3 (DirectX 9/10/11) + VKD3D (DirectX 12)</div>
            <div>• Audio Driver: PulseAudio / PipeWire low-latency ASIO</div>
            <div>• Binary Compatibility: 98.4% of tested .exe / .msi software</div>
            <div className="text-emerald-400">● Ready to launch Photoshop, AutoCAD, FL Studio, and Steam</div>
          </div>
        );
        break;

      case 'grub':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-rose-400 font-bold">MASTER 5-MENU GRUB ARCHITECTURE:</div>
            <div>• Config Path: /boot/grub/grub.cfg (Attributes: ----i---------)</div>
            <div>• NVRAM Status: Motherboard BIOS Priority #1 Verified</div>
            <div>• Theme Engine: 4K 3D Brushed Metallic "R" with Concentric Rings</div>
            <div>• Fast Boot Modes: Standard UEFI + Direct SSD-to-RAM Toram Mode</div>
          </div>
        );
        break;

      case 'benchmarks':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">PERFORMANCE TELEMETRY:</div>
            <div>• Cold Boot to Desktop: 14.8 Seconds</div>
            <div>• Decompression Speed: 15.2 GB/s via multi-threaded Zstd</div>
            <div>• Idle RAM Consumption: 480 MB</div>
            <div>• Kernel Latency: &lt; 0.4ms (Real-time tuned)</div>
          </div>
        );
        break;

      case 'download':
        onOpenDownload();
        result = <div className="text-emerald-400">Opening ISO v2.0 Download Matrix...</div>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        result = (
          <div className="text-rose-400 text-xs">
            Command not found: "{cmd}". Type <span className="underline font-bold">help</span> to view available commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: inputVal,
        output: result,
        timestamp: time,
      },
    ]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl rounded-2xl bg-[#04070d] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col h-[560px]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080e1b] border-b border-cyan-500/20 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer hover:opacity-80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer hover:opacity-80" />
            </div>
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              ritesh@cyber-node: ~ (zsh / bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText('neofetch');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-slate-400 hover:text-cyan-300 p-1"
              title="Copy sample command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono space-y-4 text-xs cyber-grid">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-rose-400 font-bold">ritesh@pc-os</span>
                <span className="text-slate-600">:</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-slate-400">$</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-slate-800">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-[#060a14] border-t border-cyan-500/20 flex items-center gap-2 font-mono text-xs"
        >
          <span className="text-cyan-400 font-bold">ritesh@pc-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'neofetch', 'status', 'waydroid', 'wine', 'download'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs"
          >
            EXEC
          </button>
        </form>
      </motion.div>
    </div>
  );
};
