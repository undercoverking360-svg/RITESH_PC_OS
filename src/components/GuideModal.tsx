import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  X,
  Lock,
  Unlock,
  FolderPlus,
  Folder,
  FileText,
  Edit3,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  Plus,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Clock,
  ShieldAlert,
  Search
} from 'lucide-react';

interface GuidePost {
  id: string;
  folder: string;
  title: string;
  contentHtml: string;
  author: string;
  timestamp: string;
}

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl?: string;
}

const DEFAULT_GUIDES: GuidePost[] = [
  {
    id: 'g-1',
    folder: 'Getting Started',
    title: 'How to Flash RITESH PC OS to USB via Ventoy',
    contentHtml: `
      <h3 style="color:#00ffcc;">Step 1: Install Ventoy</h3>
      <p>Download Ventoy from official site (<a href="https://www.ventoy.net" target="_blank" style="color:#00ffcc;">ventoy.net</a>), select your USB flash drive (16GB+) and click <b>Install</b>.</p>
      
      <h3 style="color:#00ffcc;">Step 2: Copy the ISO File</h3>
      <p>Copy <code>RITESH_PC_OS ULTIMATE.iso</code> directly to the root of your Ventoy USB drive.</p>
      
      <h3 style="color:#00ffcc;">Step 3: Boot in UEFI Mode</h3>
      <p>Reboot computer, press your BIOS boot key (<code>F12</code>, <code>F10</code>, or <code>F11</code>), select Ventoy USB, and enjoy the 15-second instant live boot!</p>
    `,
    author: 'Ritesh Guru',
    timestamp: '2026-08-30'
  },
  {
    id: 'g-2',
    folder: 'Dual Boot & UEFI',
    title: 'Master GRUB 5-Menu & Windows Chainload Guide',
    contentHtml: `
      <h3 style="color:#ff3344;">Universal Windows Auto-Discovery</h3>
      <p>RITESH PC OS includes a universal file-path search engine in GRUB that automatically finds Windows Boot Manager across all NVMe and SATA drives:</p>
      <pre style="background:#090d18; padding:10px; border-radius:8px; color:#c9d1d9; border-left:3px solid #ff3344;">search --no-floppy --file --set=root /EFI/Microsoft/Boot/bootmgfw.efi
chainloader /EFI/Microsoft/Boot/bootmgfw.efi</pre>
      <p>You never have to worry about broken UUIDs or missing dual-boot entries!</p>
    `,
    author: 'Ritesh Guru',
    timestamp: '2026-08-30'
  },
  {
    id: 'g-3',
    folder: 'Android 11 Subsystem',
    title: 'Waydroid 60FPS Gaming & Direct GPU Passthrough',
    contentHtml: `
      <h3 style="color:#00ffcc;">Native Container Architecture</h3>
      <p>Waydroid runs directly on the host Linux kernel via <code>BinderFS</code> and <code>Ashmem</code> zero-copy DMA buffers:</p>
      <ul>
        <li><b>Start Android</b>: Click the Android shortcut on Desktop or run <code>launch-android</code> in terminal.</li>
        <li><b>GPU Passthrough</b>: <code>/dev/dri/renderD128</code> is bound directly to AMD Radeon Vulkan drivers for 60FPS high-framerate gaming.</li>
      </ul>
    `,
    author: 'Ritesh Guru',
    timestamp: '2026-08-30'
  }
];

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, appsScriptUrl }) => {
  const [guides, setGuides] = useState<GuidePost[]>(() => {
    const saved = localStorage.getItem('ritesh_pc_os_guides');
    return saved ? JSON.parse(saved) : DEFAULT_GUIDES;
  });

  const [folders, setFolders] = useState<string[]>(() => {
    const saved = localStorage.getItem('ritesh_pc_os_folders');
    return saved ? JSON.parse(saved) : ['Getting Started', 'Dual Boot & UEFI', 'Android 11 Subsystem', 'Cyberpunk Customization'];
  });

  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<GuidePost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Admin & Editor State
  const [isAdmin, setIsAdmin] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Blogger Editor Form
  const [editTitle, setEditTitle] = useState('');
  const [editFolder, setEditFolder] = useState(folders[0] || 'Getting Started');
  const [editHtml, setEditHtml] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('ritesh_pc_os_guides', JSON.stringify(guides));
    localStorage.setItem('ritesh_pc_os_folders', JSON.stringify(folders));
  }, [guides, folders]);

  useEffect(() => {
    if (appsScriptUrl && isOpen) {
      fetch(appsScriptUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.guides && Array.isArray(data.guides) && data.guides.length > 0) {
            setGuides(data.guides);
            const serverFolders = Array.from(new Set(data.guides.map((g: any) => g.folder).filter(Boolean))) as string[];
            if (serverFolders.length > 0) {
              setFolders((prev) => Array.from(new Set([...prev, ...serverFolders])));
            }
          }
        })
        .catch((err) => console.log('Live sync fallback to local:', err));
    }
  }, [appsScriptUrl, isOpen]);

  if (!isOpen) return null;

  const handleVerifyPin = () => {
    if (pinInput.trim() === '231001') {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    if (!folders.includes(newFolderName.trim())) {
      const updated = [...folders, newFolderName.trim()];
      setFolders(updated);
      setEditFolder(newFolderName.trim());
    }
    setNewFolderName('');
    setShowNewFolderModal(false);
  };

  const handleSaveGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editHtml) return;

    const newGuide: GuidePost = {
      id: 'g-' + Date.now(),
      folder: editFolder,
      title: editTitle.trim(),
      contentHtml: editHtml,
      author: 'Ritesh Guru',
      timestamp: new Date().toISOString().split('T')[0]
    };

    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'addGuide',
            pin: '231001',
            folder: newGuide.folder,
            title: newGuide.title,
            contentHtml: newGuide.contentHtml
          })
        });
      } catch (err) {
        console.error('Apps Script Sync failed, saving locally:', err);
      }
    }

    setGuides([newGuide, ...guides]);
    setEditTitle('');
    setEditHtml('');
    setShowEditor(false);
  };

  const insertTag = (openTag: string, closeTag: string) => {
    setEditHtml((prev) => prev + `${openTag}Text Here${closeTag}`);
  };

  // Search Results across all guides
  const searchResults = guides.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;
    return (
      g.title.toLowerCase().includes(q) ||
      g.contentHtml.toLowerCase().includes(q) ||
      g.folder.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl rounded-3xl bg-[#070c18] border border-cyan-500/40 p-5 sm:p-8 shadow-2xl space-y-5 my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                INTERACTIVE KNOWLEDGE BASE &amp; GUIDES
              </span>
              <h3 className="font-cyber font-black text-lg sm:text-2xl text-white">
                RITESH PC OS — Documentation Hub
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{showEditor ? 'View Folders' : 'Write Post'}</span>
                </button>
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>New Folder</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Admin Security Access"
              >
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Editor Lock</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Global Search Input Bar */}
        <div className="relative flex-shrink-0">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim()) {
                setActiveFolder(null);
                setActivePost(null);
                setShowEditor(false);
              }
            }}
            placeholder="Search guides by keywords (e.g. Ventoy, Grub, Waydroid, Kernel)..."
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

        {/* PIN Modal */}
        <AnimatePresence>
          {showPinModal && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-[#0e172a] border border-amber-500/40 space-y-3 flex-shrink-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  ENTER SECURITY ADMIN PIN TO UNLOCK POST EDITOR
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
                  placeholder="Enter Security Admin PIN..."
                  className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleVerifyPin}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Unlock Editor
                </button>
              </div>
              {pinError && (
                <div className="text-[11px] font-mono text-rose-400 font-bold">
                  ⚠️ Invalid PIN code! Please enter the authorized security PIN.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Folder Modal */}
        {showNewFolderModal && (
          <div className="p-4 rounded-2xl bg-[#0a1325] border border-cyan-500/40 space-y-3 flex-shrink-0">
            <div className="text-xs font-mono text-cyan-300 font-bold uppercase">CREATE NEW GUIDE CATEGORY FOLDER</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder Name (e.g. Kernel Compilation, Wine Gaming)..."
                className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs uppercase cursor-pointer"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body with Cyber Scrollbar */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-black/40">
          {/* 1. Global Search Results View (When Searching) */}
          {searchQuery.trim() ? (
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center justify-between">
                <span>Search Results:</span>
                <span className="text-cyan-400">{searchResults.length} Match{searchResults.length === 1 ? '' : 'es'} Found</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-black/40 border border-slate-800 text-slate-400 text-xs font-mono">
                  🔍 No guide articles found matching &quot;<span className="text-cyan-300">{searchQuery}</span>&quot;
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setActivePost(post);
                        setSearchQuery('');
                      }}
                      className="p-4 rounded-2xl bg-black/50 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold uppercase">
                            {post.folder}
                          </span>
                        </div>
                        <h4 className="font-cyber font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {post.title}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                        <span>By {post.author}</span>
                        <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : isAdmin && showEditor ? (
            /* 2. Blogger-Style Rich Text Editor */
            <form onSubmit={handleSaveGuide} className="space-y-4 bg-black/50 p-5 rounded-2xl border border-cyan-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" />
                  BLOGGER RICH TEXT GUIDE EDITOR
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={editFolder}
                    onChange={(e) => setEditFolder(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none"
                  >
                    {folders.map((f) => (
                      <option key={f} value={f}>
                        📁 {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <input
                type="text"
                placeholder="Post Title (e.g. How to Compile Linux Kernel for Waydroid)..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c1527] border border-slate-700 text-white font-cyber font-bold text-sm focus:outline-none focus:border-cyan-400"
                required
              />

              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#0c1527] border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => insertTag('<b>', '</b>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 font-bold"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<i>', '</i>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 italic"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<h3 style="color:#00ffcc;">', '</h3>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 font-bold"
                >
                  H3 Heading
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<pre style="background:#090d18; padding:10px; border-radius:8px; color:#c9d1d9; border-left:3px solid #00ffcc;">', '</pre>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Code Box</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<a href="https://" target="_blank" style="color:#00ffcc; text-decoration:underline;">', '</a>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 flex items-center gap-1"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<span style="color:#ff3344;">', '</span>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-950 text-rose-300 font-bold"
                >
                  Red
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<span style="color:#00ffcc;">', '</span>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 text-cyan-300 font-bold"
                >
                  Cyan
                </button>
              </div>

              <textarea
                value={editHtml}
                onChange={(e) => setEditHtml(e.target.value)}
                placeholder="Write rich guide HTML content here (use buttons above for formatting)..."
                rows={10}
                className="w-full p-4 rounded-xl bg-[#090d18] border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Guide Post</span>
                </button>
              </div>
            </form>
          ) : activePost ? (
            /* 3. Reader View (Single Post Opened) */
            <div className="space-y-4 bg-black/60 p-6 rounded-2xl border border-cyan-500/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to {activePost.folder}</span>
                </button>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Published: {activePost.timestamp}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold uppercase">
                  {activePost.folder}
                </span>
                <h2 className="font-cyber font-bold text-xl sm:text-2xl text-white mt-1">
                  {activePost.title}
                </h2>
              </div>

              <div
                className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm font-sans leading-relaxed pt-2"
                dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
              />
            </div>
          ) : activeFolder ? (
            /* 4. Folder Contents View */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveFolder(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Categories</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  Category: <strong className="text-cyan-300">{activeFolder}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guides
                  .filter((g) => g.folder === activeFolder)
                  .map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setActivePost(post)}
                      className="p-4 rounded-2xl bg-black/50 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-cyber font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                        <span>By {post.author}</span>
                        <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* 5. Animated Folders Root View */
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                Select a Documentation Folder:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {folders.map((folderName) => {
                  const postCount = guides.filter((g) => g.folder === folderName).length;
                  return (
                    <motion.div
                      key={folderName}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveFolder(folderName)}
                      className="p-5 rounded-2xl bg-gradient-to-b from-[#0c1527] to-[#060a14] border border-slate-800 hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                    >
                      <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 w-fit group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                        <Folder className="w-6 h-6" />
                      </div>

                      <div>
                        <h4 className="font-cyber font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {folderName}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">
                          {postCount} Guide{postCount === 1 ? '' : 's'} Available
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 pt-2 border-t border-slate-800/80">
                        <span>Open Folder</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
