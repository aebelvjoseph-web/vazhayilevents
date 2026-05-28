"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CalendarCheck, Clock, CheckCircle2, ChevronRight, User, LogOut, Loader2 } from "lucide-react";

import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface IBooking {
  _id: string;
  packageName: string;
  eventDate: string;
  venue: string;
  totalAmount: string;
  status: "Pending" | "Deposit Paid" | "Confirmed" | "Completed" | "Cancelled";
  notes: string;
  createdAt: string;
}

interface IUser {
  id: string;
  fullName: string;
  email: string;
}

const statusConfig: Record<string, { color: string; bg: string; icon?: boolean }> = {
  Pending:      { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  "Deposit Paid": { color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/20" },
  Confirmed:    { color: "text-green-400",  bg: "bg-green-400/10 border-green-400/20", icon: true },
  Completed:    { color: "text-gold-400",   bg: "bg-gold-400/10 border-gold-400/20" },
  Cancelled:    { color: "text-red-400",    bg: "bg-red-400/10 border-red-400/20" },
};

// Images to assign per booking index (cycles)
const orderImages = [
  "/images/media__1779466638292.png",
  "/images/media__1779455135006.jpg",
  "/images/media__1779455130522.jpg",
  "/images/media__1779455128603.jpg",
  "/images/media__1779455098987.jpg",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders">("orders");
  const [user, setUser] = useState<IUser | null>(null);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          fullName: currentUser.displayName || "User",
          email: currentUser.email || "",
        });
        
        try {
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const loadedBookings: IBooking[] = [];
          querySnapshot.forEach((doc) => {
            loadedBookings.push({ _id: doc.id, ...doc.data() } as IBooking);
          });
          setBookings(loadedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
        setAuthError(false);
      } else {
        setAuthError(true);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/auth/sign-in";
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-cream-200/60 uppercase tracking-widest text-sm">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  // Not authenticated
  if (authError) {
    return (
      <main className="min-h-screen bg-dark-900 flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-center">
          <User size={48} className="text-gold-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-serif text-white mb-2">Please Sign In</h2>
          <p className="text-cream-200/60 mb-8">You need to be signed in to view your dashboard.</p>
          <Link
            href="/auth/sign-in"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-900/10 via-dark-900 to-dark-900 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-gold-400 uppercase tracking-widest text-xs mb-2">Welcome back</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              {user?.fullName}
            </h1>
            <p className="text-cream-200/50 text-sm">{user?.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-white/10 px-5 py-2 rounded-sm hover:border-red-500/50 hover:text-red-400 transition-colors text-cream-200/70 text-sm uppercase tracking-widest"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="glass-card p-4 space-y-2 sticky top-32">
              <button
                onClick={() => setActiveTab("orders")}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 bg-gold-500/10 border border-gold-500/50 text-gold-400"
              >
                <CalendarCheck size={20} />
                <span className="font-medium tracking-wide">Booked Orders</span>
                {bookings.length > 0 && (
                  <span className="ml-auto bg-gold-500 text-dark-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {bookings.length}
                  </span>
                )}
              </button>

              <Link
                href="/#services"
                className="w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 border border-transparent hover:bg-white/5 text-cream-200/70"
              >
                <ShoppingBag size={20} />
                <span className="font-medium tracking-wide">Browse Services</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif font-semibold text-white mb-6">Your Booked Events</h2>

                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((order, idx) => {
                      const cfg = statusConfig[order.status] || statusConfig["Pending"];
                      return (
                        <div key={order._id} className="glass-card p-0 overflow-hidden flex flex-col md:flex-row border border-white/10">
                          <div className="p-6 md:w-2/3">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-cream-200/40 uppercase tracking-widest">
                                Order #{order._id.slice(-6).toUpperCase()}
                              </span>
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${cfg.bg} ${cfg.color} flex items-center gap-1 uppercase tracking-widest`}>
                                {cfg.icon && <CheckCircle2 size={12} />}
                                {order.status}
                              </span>
                            </div>

                            <h3 className="text-2xl font-serif text-white mb-4">{order.packageName}</h3>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                              <div>
                                <p className="text-cream-200/40 uppercase tracking-widest text-xs mb-1">Date</p>
                                <p className="text-cream-200 flex items-center gap-1">
                                  <Clock size={14} className="text-gold-400" /> {order.eventDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-cream-200/40 uppercase tracking-widest text-xs mb-1">Venue</p>
                                <p className="text-cream-200">{order.venue}</p>
                              </div>
                              <div>
                                <p className="text-cream-200/40 uppercase tracking-widest text-xs mb-1">Total Amount</p>
                                <p className="text-gold-400 font-semibold">{order.totalAmount}</p>
                              </div>
                              {order.notes && (
                                <div>
                                  <p className="text-cream-200/40 uppercase tracking-widest text-xs mb-1">Notes</p>
                                  <p className="text-cream-200/70 text-xs">{order.notes}</p>
                                </div>
                              )}
                            </div>

                            <button className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-widest">
                              View Details <ChevronRight size={16} />
                            </button>
                          </div>

                          <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                            <Image
                              src={orderImages[idx % orderImages.length]}
                              alt={order.packageName}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-dark-900/90 to-transparent" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="glass-card p-16 text-center">
                    <CalendarCheck size={48} className="text-gold-400/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif text-white mb-2">No Bookings Yet</h3>
                    <p className="text-cream-200/50 mb-8 text-sm">
                      You haven't booked any events yet. Browse our premium services to get started.
                    </p>
                    <Link
                      href="/#services"
                      className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest px-8 py-3 rounded-sm hover:bg-gold-400 transition-colors text-sm"
                    >
                      Explore Services
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
