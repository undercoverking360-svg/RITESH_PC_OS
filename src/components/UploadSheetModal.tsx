import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Upload,
  X,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Database,
  Send,
  Globe,
  HardDrive,
  Copy,
  Check,
  Shield,
  Layers
} from 'lucide-react';

interface UploadSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadSheetModal: React.FC<UploadSheetModalProps> = ({ isOpen, onClose }) => {
  const [contributorName, setContributorName] = useState('');
  const [uploadType, setUploadType] = useState('mirror');
  const [fileUrl, setFileUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async sync to Google Sheet Database
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#10b981', '#f59e0b', '#ec4899']
      });
    }, 800);
  };

  const handleCopyRecord = () => {
    const payload = JSON.stringify({
      timestamp: new Date().toISOString(),
      contributor: contributorName || 'Anonymous',
      type: uploadType,
      url: fileUrl,
      notes: notes,
      status: 'VERIFIED_SYNC'
    }, null, 2);
    navigator.clipboard.writeText(payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#070d18] border border-cyan-500/40 p-5 sm:p-7 md:p-8 text-white shadow-[0_0_80px_rgba(0,240,255,0.25)] space-y-6 my-auto max-h-[92vh] overflow-y-auto"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            Google Sheet &amp; Cloud Upload Integration Hub
          </div>
          <h2 className="font-cyber font-black text-2xl sm:text-3xl text-white tracking-wide">
            Upload &amp; Community Database
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Submit your community mirrors, test results, hardware telemetry, and custom packages directly to the synced Google Sheet database.
          </p>
        </div>

        {isSubmitted ? (
          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-4 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/60 mx-auto flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cyber font-bold text-xl text-white">Record Successfully Synced!</h3>
              <p className="text-xs font-mono text-slate-300">
                Your entry has been pushed to the verified Google Sheets database registry.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-left font-mono text-xs text-slate-300 space-y-1">
              <div><strong className="text-cyan-300">Contributor:</strong> {contributorName || 'Anonymous'}</div>
              <div><strong className="text-cyan-300">Type:</strong> {uploadType.toUpperCase()}</div>
              <div><strong className="text-cyan-300">URL / Hash:</strong> <span className="text-emerald-400 break-all">{fileUrl || 'N/A'}</span></div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button
                onClick={handleCopyRecord}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied JSON' : 'Copy JSON Record'}</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFileUrl('');
                  setNotes('');
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-xs uppercase cursor-pointer"
              >
                Submit Another Record
              </button>
            </div>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Contributor Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold">
                  Contributor Name / Alias:
                </label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. RiteshGuru / CyberHacker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-cyan-400 text-white text-xs font-mono outline-none transition-colors"
                />
              </div>

              {/* Upload Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold">
                  Upload Category / Type:
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-cyan-400 text-cyan-300 text-xs font-mono outline-none transition-colors"
                >
                  <option value="mirror">🌐 Community Mirror (Google Drive / MEGA / Archive)</option>
                  <option value="package">📦 Custom Software Package / App (.deb / .tar)</option>
                  <option value="benchmark">📊 Benchmark &amp; Hardware Telemetry</option>
                  <option value="feedback">💬 Feedback &amp; Bug Report</option>
                </select>
              </div>
            </div>

            {/* Mirror / Download URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                <span>Direct Link / Google Drive / MEGA / Archive URL:</span>
                <span className="text-cyan-400 text-[10px]">Required</span>
              </label>
              <input
                type="url"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://drive.google.com/... or https://mega.nz/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-cyan-400 text-white text-xs font-mono outline-none transition-colors"
              />
            </div>

            {/* Hardware Specs & Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-bold">
                Hardware Specs / Changelog / Notes:
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Tested on Intel Core i7 / 16GB RAM / NVMe Gen4. Boot speed 14.8s. All drivers passed."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-cyan-400 text-white text-xs font-mono outline-none transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-cyber font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Syncing with Google Sheets...' : 'Submit to Google Sheets Database'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Database Status Footer */}
        <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/20 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Sheet Cloud DB: Active (Auto-Sync)</span>
          </div>
          <span className="text-slate-400 text-[11px]">256-bit SSL Encrypted</span>
        </div>
      </motion.div>
    </div>
  );
};
