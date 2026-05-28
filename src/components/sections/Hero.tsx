"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Fixed particle data so it's the same on server and client (no Math.random)
const PARTICLES = [
  { w: 4, h: 5, top: 15, left: 20, dur: 3.2, delay: 0.5 },
  { w: 3, h: 3, top: 35, left: 75, dur: 2.8, delay: 1.1 },
  { w: 6, h: 4, top: 60, left: 40, dur: 4.0, delay: 0.2 },
  { w: 2, h: 6, top: 80, left: 10, dur: 3.6, delay: 1.8 },
  { w: 5, h: 3, top: 25, left: 90, dur: 2.5, delay: 0.8 },
  { w: 4, h: 4, top: 50, left: 55, dur: 3.9, delay: 1.4 },
  { w: 3, h: 5, top: 70, left: 80, dur: 2.3, delay: 0.3 },
  { w: 7, h: 3, top: 10, left: 60, dur: 4.2, delay: 1.6 },
  { w: 4, h: 6, top: 45, left: 30, dur: 3.1, delay: 0.9 },
  { w: 5, h: 5, top: 88, left: 65, dur: 2.7, delay: 0.6 },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://sc02.alicdn.com/kf/A3b8f4efb9f8144f29135c59517c47ff6t.png"
          alt="Luxury Stage Decoration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform transition-transform duration-[20s] ease-out hover:scale-110"
        />
        {/* Soft glow cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-dark-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      {/* Floating Particles — only rendered client-side to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute bg-gold-300 rounded-full blur-[2px] animate-pulse"
              style={{
                width: `${p.w}px`,
                height: `${p.h}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}


      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-gold-400 uppercase tracking-[0.4em] text-xs font-semibold mb-6 block">
            Exquisite Event Curation
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-2xl">
            Elevating Your <br className="hidden md:block" />
            <span className="italic text-gold-200">Grandest</span> Moments
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-12 tracking-wide leading-relaxed">
            From intimate floral details to majestic stage transformations, we craft environments that define luxury and evoke emotion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-gold-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-gold-400 transition-all rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transform hover:-translate-y-1"
          >
            Consult an Expert
          </Link>
          <Link
            href="#showcase"
            className="group flex items-center gap-3 text-white hover:text-gold-400 transition-colors tracking-[0.2em] text-xs uppercase font-bold"
          >
            Explore Gallery
            <span className="w-12 h-[1px] bg-white/50 group-hover:bg-gold-400 transition-all duration-300 group-hover:w-16"></span>
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-cream-200/50 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  );
}
