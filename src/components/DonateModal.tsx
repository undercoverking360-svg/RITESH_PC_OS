import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  DollarSign,
  X,
  Copy,
  Check,
  QrCode,
  Smartphone,
  Heart,
  Sparkles,
  ShieldCheck,
  Download,
  ExternalLink,
  PartyPopper,
  Zap,
  ArrowRight,
  CreditCard,
  Lock,
  RefreshCw
} from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorNote, setDonorNote] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const payeeName = 'REETIK KUMAR YADAV';
  const upiId = 'ritikgurumzp@axl';

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Generate dynamic UPI payment URI
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${finalAmount > 0 ? finalAmount : ''}&cu=INR&tn=${encodeURIComponent(
    donorNote || 'Support Ritesh PC OS'
  )}`;

  // Generate QR Code on canvas
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [isOpen, upiUri, finalAmount]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiUri);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenUpiApp = () => {
    window.location.href = upiUri;
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setVerificationStep('Connecting to PhonePe / UPI Gateway...');

    setTimeout(() => {
      setVerificationStep('Validating Transaction UTR Token...');
    }, 1000);

    setTimeout(() => {
      setVerificationStep('Authenticating Payee: REETIK KUMAR YADAV...');
    }, 2000);

    setTimeout(() => {
      setIsVerifying(false);
      setPaymentSuccess(true);
      const generatedTxn = 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);
      setTransactionId(generatedTxn);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#ff0055', '#3b82f6', '#10b981', '#f59e0b'],
        });
      } catch {
        // Confetti fallback
      }
    }, 3000);
  };

  const handleReset = () => {
    setPaymentSuccess(false);
    setIsVerifying(false);
    setVerificationStep('');
  };

  const presetAmounts = [
    { inr: 50, usd: 1, label: '☕ Chai / Coffee', desc: 'Quick Dev Fuel' },
    { inr: 100, usd: 2, label: '⚡ Power Boost', desc: 'Popular Tip' },
    { inr: 250, usd: 5, label: '🚀 Dev Supporter', desc: 'Kernel Sponsor' },
    { inr: 500, usd: 10, label: '👑 Core Sponsor', desc: 'VIP Contributor' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl rounded-3xl bg-[#060a14] border border-amber-500/40 p-5 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.2)] space-y-6 my-auto relative overflow-hidden"
      >
        {/* Glowing cyber gradient accents */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-purple-600/20 border border-amber-400/50 text-amber-300 flex-shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              <DollarSign className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold uppercase tracking-wider">
                  OFFICIAL DONATION GATEWAY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold">
                  PHONEPE & ALL UPI
                </span>
              </div>
              <h3 className="font-cyber font-black text-xl sm:text-2xl text-white mt-0.5 flex items-center gap-2">
                Support RITESH PC OS
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-bounce" />
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close Donation Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen View */}
        {paymentSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0a1826] to-[#040810] border border-emerald-500/40 text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              <PartyPopper className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold uppercase tracking-widest">
                PAYMENT CONFIRMED & VERIFIED
              </span>
              <h4 className="font-cyber font-black text-2xl sm:text-3xl text-white">
                Thank You for Supporting Open Source!
              </h4>
              <p className="text-slate-300 text-sm font-mono max-w-md mx-auto">
                Your generous contribution directly fuels the ongoing development, kernel hardening, and 3-in-1 ecosystem of Ritesh PC OS.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-left font-mono text-xs max-w-md mx-auto space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Payee:</span>
                <span className="text-white font-bold">{payeeName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Amount Contributed:</span>
                <span className="text-emerald-400 font-bold">₹{finalAmount} INR</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-cyan-300 font-bold">{transactionId}</span>
              </div>
              {donorName && (
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500">Donor:</span>
                  <span className="text-amber-300 font-bold">{donorName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Verified VIP Contributor
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-cyber font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Back to OS Preview
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Make Another Tip
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Interactive Payment Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Authentic PhonePe QR Card Frame matching user upload */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] rounded-3xl bg-white text-black p-5 shadow-[0_0_40px_rgba(103,57,183,0.35)] flex flex-col items-center text-center space-y-3 overflow-hidden border-2 border-purple-200">
                {/* PhonePe Header Branding */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-lg leading-none shadow-md">
                      पे
                    </div>
                    <span className="font-sans font-bold text-2xl tracking-tight text-black">
                      PhonePe
                    </span>
                  </div>
                  <div className="text-[11px] font-extrabold text-[#5f259f] tracking-widest uppercase">
                    ACCEPTED HERE
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    Scan & Pay Using PhonePe / Any UPI App
                  </div>
                </div>

                {/* The Dynamic QR Code Box with Animated Scanning Laser Beam */}
                <div className="relative p-2.5 bg-white rounded-2xl border-2 border-gray-200 shadow-inner group">
                  {qrDataUrl ? (
                    <div className="relative">
                      <img
                        src={qrDataUrl}
                        alt={`PhonePe QR for ${payeeName}`}
                        className="w-56 h-56 object-contain rounded-lg"
                      />
                      {/* Central PhonePe Logo Emblem Badge inside QR */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-11 h-11 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">
                          पे
                        </div>
                      </div>

                      {/* Animated Cyber Scanning Laser Line */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5f259f] to-transparent shadow-[0_0_12px_#5f259f] animate-scan pointer-events-none opacity-80" />
                    </div>
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center bg-gray-100 rounded-lg">
                      <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                    </div>
                  )}

                  {/* Corner Reticle Markers */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#5f259f]" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#5f259f]" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#5f259f]" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#5f259f]" />
                </div>

                {/* Payee Name Matching Uploaded Image */}
                <div className="space-y-0.5 pt-1">
                  <div className="font-sans font-black text-sm text-black tracking-wide uppercase">
                    {payeeName}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    UPI ID: <span className="text-[#5f259f] font-bold">{upiId}</span>
                  </div>
                </div>

                {/* Footer Copyright matching reference */}
                <div className="pt-2 border-t border-gray-100 text-[8px] text-gray-400 font-sans leading-tight">
                  © 2026, All rights reserved, PhonePe Ltd (Formerly known as 'PhonePe Private Ltd')
                </div>
              </div>

              {/* Download QR Card Button */}
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`PhonePe-QR-${payeeName.replace(/\s+/g, '-')}.png`}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500 text-[11px] font-mono text-purple-300 hover:text-purple-200 transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download QR Image</span>
                </a>
              )}
            </div>

            {/* Right Column: Amount Selector, Controls & Instant Pay */}
            <div className="lg:col-span-6 space-y-5">
              {/* Preset Amounts Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Select Contribution Amount:
                  </span>
                  <span className="text-amber-400 font-bold">
                    ₹{finalAmount} INR
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presetAmounts.map((preset) => {
                    const isSelected = !customAmount && selectedAmount === preset.inr;
                    return (
                      <button
                        key={preset.inr}
                        onClick={() => {
                          setSelectedAmount(preset.inr);
                          setCustomAmount('');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-500/30 to-purple-600/30 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] text-white'
                            : 'bg-black/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-cyber font-black text-base text-amber-300">
                          ₹{preset.inr}
                        </div>
                        <div className="text-[10px] text-slate-300 font-mono mt-0.5 truncate">
                          {preset.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter custom amount (e.g. 500, 1000)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-xs font-mono text-white focus:outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Details Optional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-xs font-mono text-white focus:outline-none placeholder:text-slate-600"
                />
                <input
                  type="text"
                  placeholder="Message / Note (Optional)"
                  value={donorNote}
                  onChange={(e) => setDonorNote(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-xs font-mono text-white focus:outline-none placeholder:text-slate-600"
                />
              </div>

              {/* Copy UPI & Direct Launch Buttons */}
              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-black/60 border border-cyan-500/20 flex items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <Smartphone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-400 font-bold whitespace-nowrap">UPI ID:</span>
                    <span className="text-cyan-300 font-bold truncate">{upiId}</span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleOpenUpiApp}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cyber font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Pay in PhonePe App</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied' : 'Copy Payment Link'}</span>
                  </button>
                </div>
              </div>

              {/* Simulated Working Payment Verification */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1627] to-[#121c33] border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Instant Payment Verification:
                  </span>
                  <span className="text-slate-400 text-[10px]">Auto Webhook Simulation</span>
                </div>

                {isVerifying ? (
                  <div className="p-3 rounded-xl bg-black/60 border border-amber-500/40 text-center space-y-2">
                    <RefreshCw className="w-5 h-5 text-amber-400 animate-spin mx-auto" />
                    <div className="text-xs font-mono text-amber-300 animate-pulse">
                      {verificationStep}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-cyber font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.5)] transform hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-black flex-shrink-0" />
                    <span>I Have Paid (Verify & Get Donor Certificate)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
