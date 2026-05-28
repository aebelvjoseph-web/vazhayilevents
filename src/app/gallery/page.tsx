"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const categories = ["All", "Stage", "Wedding", "Reception", "Lighting", "Floral"];

const galleryImages = [
  { id: 1, src: "/images/media__1779455098987.jpg", category: "Wedding" },
  { id: 2, src: "/images/media__1779455128603.jpg", category: "Stage" },
  { id: 3, src: "/images/media__1779455130522.jpg", category: "Reception" },
  { id: 4, src: "/images/media__1779455135006.jpg", category: "Lighting" },
  { id: 5, src: "/images/media__1779455141520.jpg", category: "Floral" },
  { id: 6, src: "/images/media__1779466638292.png", category: "Stage" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Our <span className="text-gradient">Masterpieces</span>
          </h1>
          <p className="text-cream-200/60 max-w-2xl mx-auto font-light text-lg">
            Explore our portfolio of premium luxury event decorations. Each setup is meticulously crafted to deliver a cinematic and memorable experience.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat 
                ? "bg-gold-500 text-dark-900 font-semibold" 
                : "bg-transparent border border-white/20 text-cream-200 hover:border-gold-500 hover:text-gold-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="relative group overflow-hidden rounded-sm cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="relative w-full aspect-square md:aspect-auto md:h-80">
                  <Image
                    src={img.src}
                    alt={img.category}
                    fill
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-gold-400 uppercase tracking-widest text-sm font-semibold border border-gold-400 px-6 py-2 rounded-sm backdrop-blur-md">
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-cream-200 hover:text-gold-400 transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
