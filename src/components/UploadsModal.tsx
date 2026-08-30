import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  X,
  Lock,
  Unlock,
  Plus,
  ExternalLink,
  Download,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  Clock,
  Search,
  CheckCircle2,
  Trash2,
  BookOpen,
  FolderArchive
} from 'lucide-react';

export interface UploadItem {
  slNo: number;
  title: string;
  icon: string;
  links: string;
  description: string;
  timestamp: string;
}

interface UploadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl?: string;
}

const DEFAULT_UPLOADS: UploadItem[] = [
  {
    slNo: 1,
    title: 'VaultPulse Standalone Portable Suite (407 MB ZIP)',
    icon: '📦',
    links: 'https://github.com/undercoverking360-svg/ritesh_pc_os_light-v1.0/releases/download/v1.0/VaultPulse_v1.0.zip',
    description: 'Complete 407 MB standalone encrypted file-sharing suite extracted directly from P9 partition.',
    timestamp: '2026-08-31'
  },
  {
    slNo: 2,
    title: 'Official USB Flashing & MultiBoot Installation Toolkit',
    icon: '📖',
    links: 'https://www.ventoy.net/en/download.html',
    description: 'Official Ventoy & Rufus Flashing Toolkit with complete Drag-and-Drop ISO multiboot guide.',
    timestamp: '2026-08-31'
  },
  {
    slNo: 3,
    title: 'RITESH PC OS - Light Edition V1.0 (2.09 GB Direct Drive)',
    icon: '⚡',
    links: 'https://drive.usercontent.google.com/download?id=1a9mIS760nvmK8b72agB3enNijx3QNhKF&export=download&confirm=t',
    description: '2.09 GB Ultra-Light Debian 12 Bookworm + Instant 15s Toram Live Boot (1-Tap Direct Download).',
    timestamp: '2026-08-31'
  },
  {
    slNo: 4,
    title: 'RITESH PC OS - Ultimate Master Flagship (4.6 GB Direct Drive)',
    icon: '💿',
    links: 'https://drive.usercontent.google.com/download?id=1pM2BFxbMvfTl9_G5U51_NECv0rnC1RpG&export=download&confirm=t',
    description: '4.6 GB Master Universal Hybrid ISO with 522-Line Kinetic GRUB & Android 11 Subsystem.',
    timestamp: '2026-08-31'
  },
  {
    slNo: 5,
    title: 'Light Edition Official BitTorrent Magnet Link',
    icon: '🧲',
    links: 'https://archive.org/download/ritesh-pc-os-light-v-1.0/ritesh-pc-os-light-v-1.0_archive.torrent',
    description: 'Decentralized high-speed P2P torrent seed file for unlimited speed download.',
    timestamp: '2026-08-31'
  },
  {
    slNo: 6,
    title: 'Ultimate Edition Official BitTorrent Magnet Link',
    icon: '🧲',
    links: 'https://archive.org/download/ritesh-pc-os-ultimate/ritesh-pc-os-ultimate_archive.torrent',
    description: 'Decentralized P2P seed file for unlimited speed torrent clients.',
    timestamp: '2026-08-31'
  }
];

const PRESET_ICONS = [
  { emoji: '📦', label: 'Vault ZIP' },
  { emoji: '📖', label: 'Guide Doc' },
  { emoji: '💿', label: 'ISO Disk' },
  { emoji: '⚡', label: 'Fast Mirror' },
  { emoji: '🧲', label: 'Torrent' },
  { emoji: '🐙', label: 'GitHub' },
  { emoji: '🛡️', label: 'Security' },
  { emoji: '🐧', label: 'Linux' },
  { emoji: '🤖', label: 'Android' },
  { emoji: '💻', label: 'System' },
  { emoji: '🔧', label: 'Utility' },
  { emoji: '🌐', label: 'Web Mirror' },
];

export const UploadsModal: React.FC<UploadsModalProps> = ({
  isOpen,
  onClose,
  appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzPnrzy7QlJEM8L30R7JTeoopoO1-OS0ZyJLhVx9fxM5JaIH29Po6AqPWWm8VKirRlrDg/exec'
}) => {
  const [uploads, setUploads] = useState<UploadItem[]>(() => {
    const saved = localStorage.getItem('ritesh_pc_os_uploads_v2');
    return saved ? JSON.parse(saved) : DEFAULT_UPLOADS;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📦');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('ritesh_pc_os_uploads_v2', JSON.stringify(uploads));
  }, [uploads]);

  // Fetch initial data from Google Apps Script if provided
  useEffect(() => {
    if (!appsScriptUrl || !isOpen) return;
    fetch(appsScriptUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUploads(data);
          localStorage.setItem('ritesh_pc_os_uploads_v2', JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn('Apps Script fetch failed, using local/default store:', err);
      });
  }, [appsScriptUrl, isOpen]);

  if (!isOpen) return null;

  const handleVerifyPin = () => {
    // Primary Admin PIN: 833102 (Legacy comment: 231001)
    if (pinInput.trim() === '833102' || pinInput.trim() === '231001') {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleAddUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !linkUrl) return;

    setIsSubmitting(true);
    const newItem: UploadItem = {
      slNo: uploads.length + 1,
      title,
      icon: selectedIcon,
      links: linkUrl,
      description: desc || 'Custom verified release link.',
      timestamp: new Date().toISOString().split('T')[0]
    };

    const updated = [newItem, ...uploads];
    setUploads(updated);
    localStorage.setItem('ritesh_pc_os_uploads_v2', JSON.stringify(updated));

    // Optional POST sync to Google Apps Script
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });
      } catch (err) {
        console.warn('Apps script sync failed:', err);
      }
    }

    // Reset Form
    setTitle('');
    setLinkUrl('');
    setDesc('');
    setSelectedIcon('📦');
    setIsSubmitting(false);
  };

  const handleDeleteUpload = (slNo: number) => {
    const updated = uploads.filter((u) => u.slNo !== slNo);
    setUploads(updated);
    localStorage.setItem('ritesh_pc_os_uploads_v2', JSON.stringify(updated));
  };

  const filteredUploads = uploads.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slNo.toString().includes(searchQuery)
  );

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8">
          <div className="space-y-1">
            <div 
              onClick={() => !isAdmin && setShowPinModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer select-none"
              title="Repository Hub"
            >
              <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
              Community &amp; Verified Uploads Hub
            </div>
            <h2 
              onClick={() => !isAdmin && setShowPinModal(true)}
              className="font-cyber font-black text-2xl sm:text-3xl text-white tracking-wide cursor-pointer select-none"
            >
              UPLOAD &amp; RELEASE REPOSITORY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              Live Google Sheets synced database of verified VaultPulse Suites, Guides &amp; ISO builds.
            </p>
          </div>

          {/* Admin PIN Authentication (Stealth / Secret click on badge or when unlocked) */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>ADMIN UNLOCKED</span>
              </div>
            )}
          </div>
        </div>

        {/* PIN Verification Modal */}
        <AnimatePresence>
          {showPinModal && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-[#0e172a] border border-amber-500/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  ENTER ADMIN SECURITY PIN TO MANAGE RELEASES
                </div>
                <button
                  onClick={() => setShowPinModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  Cancel
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyPin()}
                  placeholder="Enter PIN (231001)..."
                  className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleVerifyPin}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Unlock
                </button>
              </div>
              {pinError && (
                <div className="text-[11px] font-mono text-rose-400 font-bold">
                  ⚠️ Invalid PIN code! Please enter the authorized 6-digit PIN (231001).
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Upload Entry Form (Unlocked when PIN 231001 is verified) */}
        {isAdmin && (
          <form onSubmit={handleAddUpload} className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-cyan-400" />
              ADD NEW RELEASE / UPDATE FILE (AUTO SL NO: #{uploads.length + 1})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs flex items-center justify-between hover:border-cyan-400 transition-colors"
                >
                  <span className="flex items-center gap-2 text-base">
                    <span>{selectedIcon}</span>
                    <span className="text-[11px] text-slate-300 font-sans">Icon</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showIconPicker && (
                  <div className="absolute top-full left-0 mt-1.5 z-50 p-2.5 rounded-2xl bg-[#070d1a] border border-cyan-500/50 shadow-2xl grid grid-cols-4 gap-1.5 w-64 backdrop-blur-xl">
                    {PRESET_ICONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setSelectedIcon(item.emoji);
                          setShowIconPicker(false);
                        }}
                        className={`p-2 rounded-xl hover:bg-cyan-500/20 flex flex-col items-center justify-center gap-1 transition-all ${
                          selectedIcon === item.emoji ? 'bg-cyan-500/30 border border-cyan-400' : 'border border-transparent'
                        }`}
                        title={item.label}
                      >
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-[9px] font-mono text-slate-400 truncate w-full text-center">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Release Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="sm:col-span-3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="url"
                placeholder="Direct Download Link (https://...)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="text"
                placeholder="Short Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Release Entry</span>
              </button>
            </div>
          </form>
        )}

        {/* Real-time Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search releases by name, ISO size, keyword or SL #..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#090e1c] border border-cyan-500/30 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Release Registry Table & Download Cards */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center justify-between">
            <span>Published Artifacts &amp; Download Links:</span>
            <span className="text-cyan-400">
              {filteredUploads.length} of {uploads.length} Entries
            </span>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-black/40">
            {filteredUploads.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-black/40 border border-slate-800 text-slate-400 text-xs font-mono">
                🔍 No releases found matching &quot;<span className="text-cyan-300">{searchQuery}</span>&quot;
              </div>
            ) : (
              filteredUploads.map((item) => (
                <div
                  key={item.slNo}
                  className="p-4 rounded-2xl bg-black/50 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0c1527] border border-cyan-500/20 text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 font-bold">
                          SL #{item.slNo}
                        </span>
                        <span className="font-cyber font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{item.description}</div>
                      <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span className="text-slate-400 truncate max-w-[280px]">{item.links}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={item.links}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-500/50 text-cyan-300 hover:text-black font-cyber font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteUpload(item.slNo)}
                        className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
