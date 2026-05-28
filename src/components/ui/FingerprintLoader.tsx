"use client";

import { motion } from "framer-motion";

interface FingerprintLoaderProps {
  isScanning?: boolean;
  success?: boolean;
}

export function FingerprintLoader({ isScanning = false, success = false }: FingerprintLoaderProps) {
  return (
    <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
      {/* Glow effect behind */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gold-500/20 blur-xl"
        animate={{
          scale: isScanning ? [1, 1.2, 1] : success ? 1.5 : 1,
          opacity: isScanning ? [0.5, 0.8, 0.5] : success ? 0 : 0.5,
        }}
        transition={{ duration: 1.5, repeat: isScanning ? Infinity : 0 }}
      />
      
      {/* Fingerprint SVG Icon */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-12 h-12 relative z-10 transition-colors duration-500 ${
          success ? "text-green-400" : isScanning ? "text-gold-400" : "text-white/40"
        }`}
      >
        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12" />
        <path d="M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15" />
        <path d="M8.5 18C8.5 16.067 10.067 14.5 12 14.5C13.933 14.5 15.5 16.067 15.5 18" />
        <path d="M12 21V21.01" strokeWidth="2" />
        
        {/* Scanning laser line overlay simulation using a clip path or just a rect inside svg */}
      </motion.svg>

      {/* Scanning laser line */}
      {isScanning && !success && (
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gold-400 shadow-[0_0_8px_#D4AF37] z-20"
          initial={{ top: "10%" }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      )}
      
      {/* Success Checkmark */}
      {success && (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-16 h-16 text-green-400 z-30 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
          initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
          animate={{ pathLength: 1, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.polyline points="20 6 9 17 4 12" />
        </motion.svg>
      )}
    </div>
  );
}
