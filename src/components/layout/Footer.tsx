import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-900 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-serif font-bold text-gold-400 tracking-wider mb-6 block">
              VAZHAYIL <span className="text-white font-light text-xl">EVENTS</span>
            </Link>
            <p className="text-cream-200/60 text-sm leading-relaxed mb-6">
              Crafting elegant event experiences with premium stage decorations, fusion lighting, and luxury setups.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-dark-900 transition-all font-semibold">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-dark-900 transition-all font-semibold">
                FB
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif tracking-widest uppercase mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-cream-200/60">
              <li><Link href="/#about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-gold-400 transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif tracking-widest uppercase mb-6 text-sm">Services</h4>
            <ul className="space-y-4 text-sm text-cream-200/60">
              <li><Link href="/services/wedding-stage-decoration" className="hover:text-gold-400 transition-colors">Wedding Stage Decoration</Link></li>
              <li><Link href="/services/home-stage-setup" className="hover:text-gold-400 transition-colors">Home Stage Setup</Link></li>
              <li><Link href="/services/reception-decor" className="hover:text-gold-400 transition-colors">Reception Decor</Link></li>
              <li><Link href="/services/led-fusion-lighting" className="hover:text-gold-400 transition-colors">LED & Fusion Lighting</Link></li>
              <li><Link href="/services/sound-systems" className="hover:text-gold-400 transition-colors">Sound Systems</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif tracking-widest uppercase mb-6 text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-cream-200/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <span>Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-400 shrink-0" />
                <span>+91 80869 33682</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-400 shrink-0" />
                <span>info@vazhayilevents.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream-200/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Vazhayil Events. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
