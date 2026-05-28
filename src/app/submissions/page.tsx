'use client';

import React, { useEffect, useState } from 'react';
import { 
  Trash2, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Sparkles, 
  Clock, 
  FileText, 
  RefreshCw, 
  Phone, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';

interface Submission {
  id: string;
  clientName: string;
  phoneNumber: string;
  eventType: string;
  eventDate: string;
  additionalDetails?: string;
  createdAt: string;
}

export default function SubmissionsDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/submissions');
      if (!res.ok) throw new Error('Failed to load submissions');
      const data = await res.json();
      setSubmissions(data);
      setFilteredSubmissions(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = submissions;

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(sub => 
        sub.clientName.toLowerCase().includes(term) ||
        sub.phoneNumber.includes(term) ||
        sub.eventType.toLowerCase().includes(term)
      );
    }

    if (eventTypeFilter !== '') {
      result = result.filter(sub => sub.eventType === eventTypeFilter);
    }

    setFilteredSubmissions(result);
  }, [searchTerm, eventTypeFilter, submissions]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    setIsDeletingId(id);
    try {
      const res = await fetch(`/api/submissions?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      // Update state
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (err: any) {
      alert(err.message || 'Could not delete submission');
    } finally {
      setIsDeletingId(null);
    }
  };

  // Compute Stats
  const totalInquiries = submissions.length;
  const upcomingEvents = submissions.filter(sub => new Date(sub.eventDate) >= new Date()).length;
  
  // Find most requested event type
  const eventCounts = submissions.reduce((acc: Record<string, number>, curr) => {
    acc[curr.eventType] = (acc[curr.eventType] || 0) + 1;
    return acc;
  }, {});
  let popularEvent = 'None';
  let maxCount = 0;
  Object.entries(eventCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      popularEvent = type;
    }
  });

  return (
    <section className="min-h-screen bg-dark-800 text-cream-200 py-24 relative overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-gold-500" />
              <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Admin Panel</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Event Booking <span className="text-gradient">Dashboard</span>
            </h1>
          </div>
          <button 
            onClick={fetchSubmissions}
            className="self-start md:self-auto flex items-center gap-2 border border-white/10 hover:border-gold-500 hover:text-gold-400 bg-white/5 px-5 py-2.5 rounded-sm transition-all text-sm font-semibold tracking-wider uppercase active:scale-[0.98]"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="glass-card p-6 border-t-2 border-t-gold-500 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-cream-200/50 block mb-1">Total inquiries</span>
              <span className="text-3xl font-serif font-bold text-white">{totalInquiries}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Users size={20} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 border-t-2 border-t-gold-500 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-cream-200/50 block mb-1">Upcoming Events</span>
              <span className="text-3xl font-serif font-bold text-white">{upcomingEvents}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Calendar size={20} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 border-t-2 border-t-gold-500 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-cream-200/50 block mb-1">Popular Setup</span>
              <span className="text-xl font-serif font-bold text-white truncate max-w-[200px] block">{popularEvent}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Sparkles size={20} />
            </div>
          </div>

        </div>

        {/* Filters and Search */}
        <div className="glass-card p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cream-200/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by name, phone or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-cream-200/30"
            />
          </div>

          <div className="flex w-full md:w-auto gap-4 items-center">
            <span className="text-xs uppercase tracking-widest text-cream-200/50 hidden sm:inline">
              Filter by:
            </span>
            <div className="relative w-full sm:w-60">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cream-200/40 pointer-events-none">
                <Filter size={16} />
              </span>
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="w-full bg-dark-900/50 border border-white/10 rounded-sm pl-10 pr-8 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
              >
                <option value="">All Event Types</option>
                <option value="Wedding Stage">Wedding Stage</option>
                <option value="Reception Setup">Reception Setup</option>
                <option value="Engagement">Engagement</option>
                <option value="Home Decoration">Home Decoration</option>
                <option value="Corporate/Other">Corporate/Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Table & detail view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table container */}
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden shadow-xl border border-white/5">
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <RefreshCw size={36} className="animate-spin text-gold-400" />
                  <span className="text-cream-200/60 font-light">Loading submissions...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
                  <AlertCircle size={36} className="text-red-400" />
                  <span className="text-red-400 font-medium">{error}</span>
                  <button onClick={fetchSubmissions} className="text-gold-400 underline text-sm mt-2">Try Again</button>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                  <Clock size={36} className="text-cream-200/30 mb-2" />
                  <span className="text-cream-200/40">No event inquiries found.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="p-4 text-xs uppercase tracking-widest text-cream-200/50 font-semibold">Client</th>
                        <th className="p-4 text-xs uppercase tracking-widest text-cream-200/50 font-semibold">Event Details</th>
                        <th className="p-4 text-xs uppercase tracking-widest text-cream-200/50 font-semibold">Date</th>
                        <th className="p-4 text-xs uppercase tracking-widest text-cream-200/50 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredSubmissions.map((sub) => (
                        <tr 
                          key={sub.id} 
                          onClick={() => setSelectedSubmission(sub)}
                          className={`hover:bg-white/5 transition-all cursor-pointer ${
                            selectedSubmission?.id === sub.id ? 'bg-gold-500/5 border-l-2 border-l-gold-500' : ''
                          }`}
                        >
                          <td className="p-4">
                            <div className="font-serif font-semibold text-white text-base">{sub.clientName}</div>
                            <div className="text-xs text-cream-200/50 flex items-center gap-1.5 mt-1">
                              <Phone size={12} />
                              {sub.phoneNumber}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-sm">
                              {sub.eventType}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-cream-200/70">
                            {new Date(sub.eventDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => setSelectedSubmission(sub)}
                                className="p-2 text-cream-200/60 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                                title="View Details"
                              >
                                <ChevronRight size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(sub.id)}
                                disabled={isDeletingId === sub.id}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm transition-colors disabled:opacity-50"
                                title="Delete Submission"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 md:p-8 shadow-xl border border-white/5 sticky top-24 min-h-[400px] flex flex-col">
              
              {selectedSubmission ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText size={18} className="text-gold-400" />
                      <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Inquiry Details</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-snug">
                      {selectedSubmission.clientName}
                    </h3>
                    
                    <p className="text-sm text-cream-200/60 flex items-center gap-2 mb-6">
                      <Phone size={14} />
                      {selectedSubmission.phoneNumber}
                    </p>

                    <hr className="border-white/10 mb-6" />

                    <div className="space-y-4 mb-8">
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-cream-200/40 mb-1">
                          Setup Option
                        </span>
                        <span className="text-sm font-semibold text-white bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-sm inline-block">
                          {selectedSubmission.eventType}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-cream-200/40 mb-1">
                          Target Event Date
                        </span>
                        <span className="text-sm text-white font-medium flex items-center gap-2">
                          <Calendar size={14} className="text-gold-400" />
                          {new Date(selectedSubmission.eventDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-cream-200/40 mb-1">
                          Additional Requests
                        </span>
                        <div className="bg-dark-900/50 border border-white/5 p-4 rounded-sm text-cream-200/80 text-sm whitespace-pre-wrap font-light leading-relaxed max-h-60 overflow-y-auto">
                          {selectedSubmission.additionalDetails || "No additional requirements specified."}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    disabled={isDeletingId === selectedSubmission.id}
                    className="w-full border border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 font-semibold uppercase tracking-wider text-xs py-3 rounded-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Trash2 size={14} />
                    Delete Submission
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <FileText size={40} className="text-cream-200/10 mb-3" />
                  <h3 className="font-serif text-lg font-medium text-cream-200/50 mb-1">Select an Inquiry</h3>
                  <p className="text-xs text-cream-200/30 max-w-[200px]">
                    Click on any submission in the list to view its full details and requirements.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
