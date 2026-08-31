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
  Search,
  Loader2
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

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzPnrzy7QlJEM8L30R7JTeoopoO1-OS0ZyJLhVx9fxM5JaIH29Po6AqPWWm8VKirRlrDg/exec'
}) => {
  const [guides, setGuides] = useState<GuidePost[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  const [editFolder, setEditFolder] = useState('');
  const [editHtml, setEditHtml] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 100% Pure Live Sync with Google Sheets backend (Zero mock data)
  const fetchLiveGuides = () => {
    if (!appsScriptUrl) return;
    setIsLoading(true);
    fetch(appsScriptUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.guides && Array.isArray(data.guides)) {
          setGuides(data.guides);
          // Strictly derive folders only from sheet records
          const derivedFolders = Array.from(
            new Set(data.guides.map((g: any) => g.folder).filter(Boolean))
          ) as string[];
          setFolders(derivedFolders);
          if (derivedFolders.length > 0 && !editFolder) {
            setEditFolder(derivedFolders[0]);
          }
        }
      })
      .catch((err) => {
        console.error('Google Sheets guides fetch error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchLiveGuides();
    }
  }, [appsScriptUrl, isOpen]);

  if (!isOpen) return null;

  const handleVerifyPin = () => {
    // Admin PIN: 833102 / 231001
    if (pinInput.trim() === '833102' || pinInput.trim() === '231001') {
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
    const cleanName = newFolderName.trim();
    if (!folders.includes(cleanName)) {
      const updated = [...folders, cleanName];
      setFolders(updated);
      setEditFolder(cleanName);
    }
    setNewFolderName('');
    setShowNewFolderModal(false);
  };

  const handleSaveGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editHtml) return;

    setIsSubmitting(true);
    const newGuide: GuidePost = {
      id: 'g-' + Date.now(),
      folder: editFolder || 'General',
      title: editTitle.trim(),
      contentHtml: editHtml,
      author: 'Ritesh Guru',
      timestamp: new Date().toISOString()
    };

    // Live POST sync to Google Sheets backend
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            pin: '231001',
            action: 'addGuide',
            folder: newGuide.folder,
            title: newGuide.title,
            contentHtml: newGuide.contentHtml
          })
        });
      } catch (err) {
        console.error('Apps Script Sync failed:', err);
      }
    }

    const updatedGuides = [newGuide, ...guides];
    setGuides(updatedGuides);
    const updatedFolders = Array.from(new Set(updatedGuides.map((g) => g.folder).filter(Boolean)));
    setFolders(updatedFolders);
    setEditTitle('');
    setEditHtml('');
    setShowEditor(false);
    setIsSubmitting(false);

    // Refresh data after short delay
    setTimeout(fetchLiveGuides, 1500);
  };

  const insertTag = (openTag: string, closeTag: string) => {
    setEditHtml((prev) => prev + openTag + closeTag);
  };

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl rounded-3xl bg-[#070c18] border border-cyan-500/40 p-5 sm:p-8 shadow-2xl space-y-5 my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 flex-shrink-0">
          <div
            onClick={() => !isAdmin && setShowPinModal(true)}
            className="flex items-center gap-3 cursor-pointer select-none"
            title="Documentation Hub"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Live Google Sheets Guides &amp; Documentation
              </span>
              <h3 className="font-cyber font-black text-lg sm:text-2xl text-white">
                RITESH PC OS — Documentation Hub
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, boot tutorials, commands..."
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

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Secret PIN Verification Prompt */}
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
                    ENTER ADMIN PIN TO WRITE GUIDES &amp; CREATE FOLDERS
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
                    placeholder="Enter PIN (833102)..."
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
                    ⚠️ Invalid PIN code! Please enter the authorized PIN.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Category Modal */}
          {showNewFolderModal && (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase">
                Create New Documentation Folder
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder Name (e.g. Waydroid Setup, BIOS Tuning)..."
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleCreateFolder}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Add Folder
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Blogger-Style Rich Text Guide Editor Form */}
          {showEditor ? (
            <form onSubmit={handleSaveGuide} className="space-y-4 p-5 rounded-2xl bg-black/60 border border-cyan-500/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-cyber font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Blogger-Style Guide Post Writer
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Target Sheet: Guides</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Select Target Folder:
                  </label>
                  <select
                    value={editFolder}
                    onChange={(e) => setEditFolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {folders.map((f) => (
                      <option key={f} value={f}>
                        📁 {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Guide Title:
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter comprehensive guide title..."
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#090d18] border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => insertTag('<b>', '</b>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<i>', '</i>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<code>', '</code>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400"
                  title="Inline Code"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<h3 style="color:#00ffcc;">', '</h3>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold"
                >
                  H3 Section
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<pre style="background:#090d18; padding:10px; border-radius:8px; color:#c9d1d9; border-left:3px solid #00ffcc;">', '</pre>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold"
                >
                  Codeblock
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<a href="https://" target="_blank" style="color:#00ffcc;">', '</a>')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1"
                >
                  <LinkIcon className="w-3 h-3" /> Link
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
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cyber font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{isSubmitting ? 'Saving to Google Sheet...' : 'Publish Guide Post'}</span>
                </button>
              </div>
            </form>
          ) : activePost ? (
            /* Reader View */
            <div className="space-y-4 bg-black/60 p-4 sm:p-6 rounded-2xl border border-cyan-500/30">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to {activePost.folder}</span>
                </button>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Published: {new Date(activePost.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold uppercase border border-cyan-500/30">
                  {activePost.folder}
                </span>
                <h2 className="font-cyber font-bold text-lg sm:text-2xl text-white mt-2 break-words leading-snug">
                  {activePost.title}
                </h2>
              </div>

              <div
                className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm font-sans leading-relaxed pt-2 break-words overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
              />
            </div>
          ) : activeFolder ? (
            /* Folder Contents View */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
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
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <h4 className="font-cyber font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors break-words leading-snug flex-1">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                        <span>By {post.author || 'Admin'}</span>
                        <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Root View: Folders derived strictly from Google Sheet */
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                Documentation Folders:
              </div>

              {isLoading && guides.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-black/40 border border-slate-800 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
                  <span className="text-xs font-mono text-slate-400">Fetching live guide categories from Google Sheet...</span>
                </div>
              ) : folders.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-black/40 border border-slate-800 text-slate-400 text-xs font-mono">
                  📖 No guide categories found in Google Sheet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {folders.map((folderName) => {
                    const postCount = guides.filter((g) => g.folder === folderName).length;
                    return (
                      <motion.div
                        key={folderName}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveFolder(folderName)}
                        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0c1527] to-[#060a14] border border-slate-800 hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                      >
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 w-fit group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                          <Folder className="w-5 sm:w-6 h-5 sm:h-6" />
                        </div>

                        <div>
                          <h4 className="font-cyber font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors break-words leading-snug">
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
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
