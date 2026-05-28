"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    import("@/lib/firebase/config").then(({ auth }) => {
      import("firebase/auth").then(({ onAuthStateChanged }) => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      });
    });
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-gold-400 tracking-wider">
          VAZHAYIL <span className="text-white font-light text-xl">EVENTS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-4 ml-2">
            {!user ? (
              <Link
                href="/auth/sign-in"
                className="text-sm uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold-500 hover:text-dark-900 transition-colors border border-white/10 hover:border-gold-500"
                title="Dashboard"
              >
                <User size={16} />
              </Link>
            )}
            <Link
              href="/contact"
              className="px-6 py-2 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900 transition-all rounded-sm text-sm uppercase tracking-widest"
            >
              Book Now
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full flex flex-col items-center py-6 gap-6 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-16 h-px bg-white/20 my-2" />
          {!user ? (
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
            >
              Sign In
            </Link>
          ) : (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900 transition-all rounded-sm text-lg uppercase tracking-widest mt-2"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
