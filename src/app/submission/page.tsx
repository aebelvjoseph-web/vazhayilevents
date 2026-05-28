'use client';
import React, { useState } from 'react';
import { Send, Calendar, User, Phone, Sparkles } from 'lucide-react';

export default function SubmissionPage() {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending your inquiry...');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          phoneNumber,
          eventType,
          eventDate,
          additionalDetails,
        }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      
      setStatus('✅ Submission saved successfully! We will contact you soon.');
      setClientName('');
      setPhoneNumber('');
      setEventType('');
      setEventDate('');
      setAdditionalDetails('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-dark-800 relative py-24 flex items-center justify-center overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-gold-500" />
          <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Reserve Your Date</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-center leading-tight">
          Let's Plan Your <br/> <span className="text-gradient">Dream Event</span>
        </h1>
        <p className="text-cream-200/60 mb-12 text-center font-light max-w-md">
          Provide your event details below, and our premium decor consultants will get in touch with you.
        </p>

        <div className="w-full max-w-xl glass-card p-8 md:p-12 border-t-4 border-t-gold-500 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cream-200/40">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cream-200/40">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="e.g. +91 80869 XXXXX"
                  className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Event Type & Event Date in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="eventType" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                  Event Type
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cream-200/40">
                    <Sparkles size={18} />
                  </span>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                    className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-dark-800">Select Event</option>
                    <option value="Wedding Stage" className="bg-dark-800">Wedding Stage</option>
                    <option value="Reception Setup" className="bg-dark-800">Reception Setup</option>
                    <option value="Engagement" className="bg-dark-800">Engagement</option>
                    <option value="Home Decoration" className="bg-dark-800">Home Decoration</option>
                    <option value="Corporate/Other" className="bg-dark-800">Corporate / Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                  Event Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cream-200/40">
                    <Calendar size={18} />
                  </span>
                  <input
                    type="date"
                    id="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="additionalDetails" className="block text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
                placeholder="Describe your themes, floral preferences, or lighting ideas..."
                className="w-full bg-dark-900/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 transition-transform active:scale-[0.98]"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Send Booking Inquiry <Send size={16} />
                </>
              )}
            </button>

            {/* Status Messages */}
            {status && (
              <div className={`p-4 rounded-sm text-sm text-center border ${
                status.includes('✅') 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {status}
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
