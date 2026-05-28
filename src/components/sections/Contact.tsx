"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      eventType: formData.get("eventType"),
      date: formData.get("date"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-dark-800 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Info & Map */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Let's Plan Your <br/> <span className="text-gradient">Dream Event</span>
            </h2>
            <p className="text-cream-200/60 mb-12 text-lg font-light max-w-md">
              Contact us today to discuss your vision, check availability, or request a custom quote for your luxury event.
            </p>

            <a 
              href="https://wa.me/918086933682" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-sm transition-colors mb-12 uppercase tracking-widest text-sm font-semibold"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>

            {/* Simple Map Placeholder */}
            <div className="w-full h-64 bg-dark-900 rounded-sm border border-white/10 relative overflow-hidden flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1234567890123!2d76.3214567!3d9.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTknMTUuNiJOIDc2wrAxOScxNy4yIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Office Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-card p-10 md:p-14 border-t-4 border-t-gold-500">
            <h3 className="text-2xl font-serif text-white mb-8">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">Full Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">Phone Number</label>
                  <input type="tel" name="phone" id="phone" required className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">Event Type</label>
                  <select name="eventType" id="eventType" required defaultValue="" className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none">
                    <option value="" disabled>Select Event</option>
                    <option value="wedding">Wedding Stage</option>
                    <option value="reception">Reception Setup</option>
                    <option value="engagement">Engagement</option>
                    <option value="home">Home Decoration</option>
                    <option value="other">Other Events</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">Event Date</label>
                  <input type="date" name="date" id="date" required className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">Additional Details</label>
                <textarea name="message" id="message" rows={4} required className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Tell us about your venue, themes, and specific requirements..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Submit Inquiry <Send size={16} />
                  </>
                )}
              </button>

              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-sm text-sm text-center">
                  Your inquiry has been sent successfully. We will contact you soon!
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
