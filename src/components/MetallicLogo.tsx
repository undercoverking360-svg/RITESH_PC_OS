import React from 'react';

interface MetallicLogoProps {
  size?: number;
  className?: string;
  glowColor?: 'cyan' | 'crimson' | 'dual';
  interactive?: boolean;
}

export const MetallicLogo: React.FC<MetallicLogoProps> = ({
  size = 280,
  className = '',
  glowColor = 'dual',
  interactive = true,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Glow Halo */}
      <div
        className={`absolute inset-0 rounded-full filter blur-2xl opacity-40 transition-opacity duration-700 pointer-events-none ${
          glowColor === 'crimson'
            ? 'bg-rose-600/30'
            : glowColor === 'cyan'
            ? 'bg-cyan-500/30'
            : 'bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-rose-500/25'
        }`}
      />

      {/* Cybernetic Reactor Concentric Rings */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full absolute inset-0 transform-gpu"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brushed Metal Linear Gradient */}
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cfd6df" />
            <stop offset="25%" stopColor="#7a889b" />
            <stop offset="45%" stopColor="#e8eff7" />
            <stop offset="60%" stopColor="#414d5e" />
            <stop offset="80%" stopColor="#8d9eb5" />
            <stop offset="100%" stopColor="#2b3442" />
          </linearGradient>

          {/* Dark Gunmetal for Bevel & Depth */}
          <linearGradient id="bevelDark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c1017" />
            <stop offset="50%" stopColor="#1a2332" />
            <stop offset="100%" stopColor="#05070a" />
          </linearGradient>

          {/* Radial Sheen on the R */}
          <radialGradient id="sheen" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#a3b4c9" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#1e2633" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0a0d13" stopOpacity="0.9" />
          </radialGradient>

          {/* Cyan Glow Filter */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Crimson Glow Filter */}
          <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Cyber Rings (Outer to Inner) */}
        {/* Ring 1 - Outermost Segmented */}
        <circle
          cx="200"
          cy="200"
          r="185"
          stroke="#1b2535"
          strokeWidth="1.5"
          strokeDasharray="4 8 20 8 4 12"
          opacity="0.7"
        />
        
        {/* Ring 2 - Rotating Accent Segments */}
        <g className={interactive ? 'animate-radar origin-center' : ''}>
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="url(#bevelDark)"
            strokeWidth="8"
            opacity="0.9"
          />
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="#00f0ff"
            strokeWidth="3"
            strokeDasharray="40 180"
            opacity="0.8"
            filter="url(#cyanGlow)"
          />
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="#ff0055"
            strokeWidth="3"
            strokeDasharray="25 240"
            strokeDashoffset="120"
            opacity="0.9"
            filter="url(#crimsonGlow)"
          />
        </g>

        {/* Ring 3 - Deep Mechanical Groove */}
        <circle
          cx="200"
          cy="200"
          r="145"
          stroke="#111827"
          strokeWidth="12"
          opacity="0.95"
        />
        <circle
          cx="200"
          cy="200"
          r="145"
          stroke="#253247"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Ring 4 - Inner Precision Ring */}
        <circle
          cx="200"
          cy="200"
          r="120"
          stroke="#1e293b"
          strokeWidth="6"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          stroke="#00f0ff"
          strokeWidth="1"
          strokeDasharray="10 30"
          opacity="0.5"
        />

        {/* Notches & Cyber Ticks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * 175;
          const y1 = 200 + Math.sin(rad) * 175;
          const x2 = 200 + Math.cos(rad) * 188;
          const y2 = 200 + Math.sin(rad) * 188;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={angle % 90 === 0 ? '#00f0ff' : '#475569'}
              strokeWidth={angle % 90 === 0 ? 2 : 1}
              opacity={angle % 90 === 0 ? 0.9 : 0.4}
            />
          );
        })}

        {/* Inner Dark Cyber Center Plate */}
        <circle cx="200" cy="200" r="96" fill="#070a10" stroke="#1f2937" strokeWidth="2" />
        <circle cx="200" cy="200" r="92" stroke="#00f0ff" strokeWidth="0.75" opacity="0.2" />

        {/* ============================================================ */}
        {/* 3D METALLIC TITANIUM "R" EMBLEM (Exact custom geometry)       */}
        {/* ============================================================ */}
        {/* Drop Shadow for the 3D Letter */}
        <g transform="translate(4, 4)" opacity="0.6">
          <path
            d="M 148 116 
               H 216 
               C 238 116, 256 128, 256 150 
               C 256 168, 244 180, 228 184 
               L 262 254 
               H 228 
               L 198 192 
               H 178 
               V 254 
               H 148 
               Z
               M 178 140 
               V 172 
               H 212 
               C 224 172, 230 164, 230 156 
               C 230 148, 224 140, 212 140 
               Z"
            fill="#020305"
            filter="blur(4px)"
          />
        </g>

        {/* Outer 3D Bevel Chamfer (Dark Titanium) */}
        <path
          d="M 144 112 
             H 218 
             C 242 112, 262 126, 262 152 
             C 262 172, 248 186, 230 190 
             L 266 258 
             H 226 
             L 196 196 
             H 176 
             V 258 
             H 144 
             Z
             M 176 138 
             V 174 
             H 212 
             C 226 174, 234 165, 234 156 
             C 234 147, 226 138, 212 138 
             Z"
          fill="url(#bevelDark)"
          stroke="#00f0ff"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Main Brushed Face of the "R" */}
        <path
          d="M 146 114 
             H 216 
             C 239 114, 258 127, 258 151 
             C 258 170, 245 183, 228 187 
             L 263 255 
             H 228 
             L 197 194 
             H 177 
             V 255 
             H 146 
             Z
             M 177 139 
             V 173 
             H 212 
             C 225 173, 232 165, 232 156 
             C 232 147, 225 139, 212 139 
             Z"
          fill="url(#metalGrad)"
        />

        {/* Radial Highlights / Specular Glint */}
        <path
          d="M 146 114 
             H 216 
             C 239 114, 258 127, 258 151 
             C 258 170, 245 183, 228 187 
             L 263 255 
             H 228 
             L 197 194 
             H 177 
             V 255 
             H 146 
             Z
             M 177 139 
             V 173 
             H 212 
             C 225 173, 232 165, 232 156 
             C 232 147, 225 139, 212 139 
             Z"
          fill="url(#sheen)"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Top Edge Specular Highlights */}
        <line x1="146" y1="114" x2="216" y2="114" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="146" y1="114" x2="146" y2="255" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="177" y1="139" x2="212" y2="139" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="197" y1="194" x2="228" y2="255" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.6" />
      </svg>

      {/* Cybernetic Corner Reticles */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-cyan-400/40 pointer-events-none" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-cyan-400/40 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-cyan-400/40 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-cyan-400/40 pointer-events-none" />
    </div>
  );
};
