"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    id: 1,
    title: "White Luxury Wedding",
    category: "Wedding Setup",
    image: "/images/media__1779455130522.jpg",
    className: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]",
  },
  {
    id: 2,
    title: "Golden Luxury Stage",
    category: "Stage Decoration",
    image: "/images/media__1779455135006.jpg",
    className: "md:col-span-1 md:row-span-1 h-[300px]",
  },
  {
    id: 3,
    title: "Grand Hall Ambience",
    category: "Event Setup",
    image: "/images/media__1779455141520.jpg",
    className: "md:col-span-1 md:row-span-1 h-[300px]",
  },
];

export function Showcase() {
  return (
    <section className="py-32 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              A Glimpse into <span className="text-gradient">Luxury</span>
            </h2>
          </div>
          <a href="/gallery" className="text-sm text-gold-400 uppercase tracking-widest hover:text-white transition-colors border-b border-gold-400/30 hover:border-white pb-1">
            View Full Gallery
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group overflow-hidden rounded-sm cursor-pointer ${item.className}`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold-400 text-xs uppercase tracking-widest font-medium mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.category}
                </span>
                <h3 className="text-2xl font-serif text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
