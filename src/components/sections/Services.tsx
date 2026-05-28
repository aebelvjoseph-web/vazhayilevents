"use client";

import { motion, Variants } from "framer-motion";
import { 
  Sparkles, 
  HeartHandshake, 
  Home, 
  Flower2, 
  Lightbulb, 
  Speaker, 
  CalendarDays 
} from "lucide-react";

const services = [
  {
    title: "Stage Decoration",
    description: "Premium luxury stage setups with custom themes, cinematic backdrops, and elegant props.",
    icon: Sparkles,
  },
  {
    title: "Wedding Events",
    description: "Complete wedding styling from grand entrances to exquisite dining ambiences.",
    icon: HeartHandshake,
  },
  {
    title: "Home Decoration",
    description: "Intimate yet luxurious setups for in-home celebrations and traditions.",
    icon: Home,
  },
  {
    title: "Floral Arrangements",
    description: "Exquisite floral designs using premium fresh and imported artificial blooms.",
    icon: Flower2,
  },
  {
    title: "LED & Fusion Lighting",
    description: "State-of-the-art lighting to create soft glows, dramatic shadows, and cinematic vibes.",
    icon: Lightbulb,
  },
  {
    title: "Sound Systems",
    description: "Crystal clear professional audio setups for announcements, music, and DJs.",
    icon: Speaker,
  },
  {
    title: "Event Setup",
    description: "End-to-end orchestration of seating, layout, and atmosphere.",
    icon: CalendarDays,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Services() {
  return (
    <section id="services" className="py-32 bg-dark-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold-400 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Bespoke Services for <br/> <span className="italic text-gold-200">Unforgettable</span> Events
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm mb-2 font-light leading-relaxed">
            We handle every detail with precision, from the first sketch to the final reveal, ensuring your celebration is a masterpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-dark-900 p-12 hover:bg-dark-800 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-gold-500 group-hover:h-full transition-all duration-500" />
              
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-full bg-gold-500/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors duration-500">
                  <service.icon className="w-8 h-8 text-gold-400" />
                </div>
                <span className="absolute -bottom-4 -right-4 text-7xl font-serif text-white/5 select-none transition-colors duration-500 group-hover:text-gold-500/10">
                  0{index + 1}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold-200 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-500">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
