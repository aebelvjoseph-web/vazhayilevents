"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-32 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gold-500/20 z-10 group-hover:bg-transparent transition-colors duration-700 mix-blend-overlay" />
            <Image
              src="https://sc02.alicdn.com/kf/A4c60a3a496924eee83889d5f6fffd5dfG.png"
              alt="Premium Wedding Stage Setup"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Decorative Frame */}
            <div className="absolute inset-4 border border-gold-400/30 z-20 pointer-events-none" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Our Story</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              Elevating Moments into <br/> <span className="text-gradient">Timeless Memories</span>
            </h2>
            
            <p className="text-cream-200/80 leading-relaxed font-light mb-6 text-lg">
              At Vazhayil Events, we believe that every celebration deserves a setting as unique and beautiful as the occasion itself. With a passion for creativity and an eye for detail, we specialize in transforming ordinary spaces into extraordinary experiences.
            </p>
            
            <p className="text-cream-200/80 leading-relaxed font-light mb-10">
              From premium stage setups and exquisite floral arrangements to state-of-the-art fusion lighting and professional sound systems, our expert team orchestrates every element to perfection. We blend modern aesthetics with timeless elegance to deliver customized event experiences that leave a lasting impression.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div>
                <h4 className="text-3xl font-serif text-gold-400 mb-2">500+</h4>
                <p className="text-sm text-cream-200/60 uppercase tracking-wider">Premium Events</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold-400 mb-2">100%</h4>
                <p className="text-sm text-cream-200/60 uppercase tracking-wider">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
