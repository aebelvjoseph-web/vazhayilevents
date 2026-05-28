"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "bot" | "user";

interface Message {
  id: number;
  role: Role;
  text: string;
  options?: string[];
}

// ─── Lead state ───────────────────────────────────────────────────────────────
interface LeadData {
  name?: string;
  phone?: string;
  eventType?: string;
  date?: string;
}

// ─── FAQ Knowledge Base ───────────────────────────────────────────────────────
const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "start", "help"],
    answer:
      "👋 Welcome to **Vazhayil Events**! I'm your personal event concierge. How can I help you today?",
  },
  {
    keywords: ["service", "offer", "do", "provide", "package"],
    answer:
      "✨ We offer premium event decoration services including:\n• 💒 **Wedding Stages** — custom mandap & stage designs\n• 🥂 **Reception Setups** — elegant floral & lighting arrangements\n• 💍 **Engagement Decor** — intimate & romantic setups\n• 🏠 **Home Decoration** — birthday, anniversary, surprise parties\n• 🎪 **Corporate Events** — professional branded setups\n• 🔊 **Sound & Lighting** — fusion DJ + live band packages\n\nWould you like a quote for any of these?",
  },
  {
    keywords: ["price", "cost", "rate", "budget", "charge", "package", "how much"],
    answer:
      "💰 Our packages start from:\n• **Basic** — ₹25,000 (simple stage, flowers, lighting)\n• **Standard** — ₹60,000 (premium decor, photo backdrop, theme)\n• **Luxury** — ₹1,20,000+ (custom theme, floral canopy, premium lighting)\n• **Royal** — ₹2,50,000+ (full venue transformation, live band)\n\nPrices vary by venue size and requirements. Want a custom quote?",
  },
  {
    keywords: ["wedding", "marriage", "bride", "groom", "mandap"],
    answer:
      "💒 Our wedding decoration includes:\n• Custom mandap / stage designs\n• Fresh & artificial floral arrangements\n• Fusion lighting (LEDs, fairy lights, chandeliers)\n• Entrance gate decoration\n• Car & chariot decoration\n• Photo backdrop & selfie zones\n\nWould you like to book a consultation?",
  },
  {
    keywords: ["reception", "party", "celebration"],
    answer:
      "🥂 Our reception setups are absolutely stunning! We specialize in:\n• Royal ballroom-style themes\n• Rustic garden setups\n• Luxury modern minimalist decor\n• Custom color palettes\n• Candle & fairy light installations\n\nWant us to plan your reception?",
  },
  {
    keywords: ["sound", "music", "dj", "band", "speaker"],
    answer:
      "🎵 Our audio/music packages include:\n• **Professional DJ** with lighting effects\n• **Live Band** (Carnatic / Jazz / Pop)\n• **Fusion** DJ + Live instruments combo\n• **PA Systems** for ceremonies\n• Wireless microphones & mixers\n\nAll packages include setup, operation & teardown.",
  },
  {
    keywords: ["contact", "reach", "talk", "call", "whatsapp", "phone"],
    answer:
      "📞 You can reach us:\n• **WhatsApp**: +91 98765 43210\n• **Email**: hello@vazhayilevents.com\n• **Location**: Ernakulam, Kerala\n• **Timings**: Mon–Sat, 9 AM – 7 PM\n\nOr I can collect your details and our team will call you back!",
  },
  {
    keywords: ["location", "where", "kerala", "ernakulam", "kochi", "city"],
    answer:
      "📍 We are based in **Ernakulam, Kerala** and serve all major cities including:\nKochi • Thrissur • Calicut • Trivandrum • Palakkad\n\nWe also travel outside Kerala for destination events. Want to check availability for your location?",
  },
  {
    keywords: ["available", "availability", "date", "book", "slot", "when"],
    answer:
      "📅 We're booking events for 2024–2025! To check availability for your specific date, please share:\n1. Your event date\n2. Venue location\n3. Type of event\n\nShall I collect your details so our team can confirm?",
  },
  {
    keywords: ["photo", "gallery", "portfolio", "work", "past", "example"],
    answer:
      "📸 You can view our portfolio in the **Gallery** section of this website! We have hundreds of events across Kerala.\n\nOur recent highlights:\n• 🏆 500+ events completed\n• ⭐ 4.9/5 average rating\n• 💼 50+ corporate clients\n\nWould you like to book a consultation?",
  },
  {
    keywords: ["testimonial", "review", "feedback", "rating"],
    answer:
      "⭐ Our clients love us!\n\n*\"The decoration was absolutely breathtaking — exactly what we dreamed of!\"* — Priya & Arun\n\n*\"Professional team, on-time delivery and stunning setup.\"* — Ranjith (Corporate)\n\n*\"Best in Kerala, no doubt!\"* — Meena\n\nWant to experience the Vazhayil magic? Let's plan your event!",
  },
];

// ─── Helper: find FAQ match ───────────────────────────────────────────────────
function getFAQAnswer(input: string): string | null {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.keywords.some((k) => lower.includes(k))) {
      return faq.answer;
    }
  }
  return null;
}

// ─── Lead capture flow ────────────────────────────────────────────────────────
type LeadStep = "idle" | "name" | "phone" | "eventType" | "date" | "done";

const EVENT_OPTIONS = [
  "💒 Wedding Stage",
  "🥂 Reception Setup",
  "💍 Engagement",
  "🏠 Home Decoration",
  "🎪 Corporate Event",
  "🎵 Sound & Music",
  "🎉 Other",
];

const QUICK_REPLIES = [
  "Our services",
  "Pricing & packages",
  "Wedding decoration",
  "Check availability",
  "Contact us",
  "Get a free quote",
];

let idCounter = 10;
function nextId() {
  return ++idCounter;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "👋 Hi! I'm **Aura**, your event planning assistant at **Vazhayil Events**.\n\nHow can I help you today? ✨",
      options: QUICK_REPLIES,
    },
  ]);
  const [input, setInput] = useState("");
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // ─── Add bot message with simulated typing ───────────────────────────────
  function addBotMessage(text: string, options?: string[]) {
    setIsTyping(true);
    const delay = Math.min(600 + text.length * 8, 2200);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", text, options },
      ]);
      if (!open) setUnread((u) => u + 1);
    }, delay);
  }

  // ─── Submit lead to API ──────────────────────────────────────────────────
  async function submitLead(data: LeadData) {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          eventType: data.eventType,
          date: data.date || new Date().toISOString().split("T")[0],
          message: `Lead from chatbot — Event: ${data.eventType}`,
        }),
      });
    } catch {
      // Silently fail — chatbot still shows success
    }
  }

  // ─── Handle lead flow ────────────────────────────────────────────────────
  function handleLeadStep(userText: string): boolean {
    if (leadStep === "name") {
      const name = userText.trim();
      setLeadData((d) => ({ ...d, name }));
      setLeadStep("phone");
      addBotMessage(
        `Great to meet you, **${name}**! 😊\nWhat's your **WhatsApp / phone number** so we can reach you?`
      );
      return true;
    }

    if (leadStep === "phone") {
      const phone = userText.trim();
      setLeadData((d) => ({ ...d, phone }));
      setLeadStep("eventType");
      addBotMessage(
        "Perfect! What type of **event** are you planning? 🎊",
        EVENT_OPTIONS
      );
      return true;
    }

    if (leadStep === "eventType") {
      const eventType = userText.replace(/^[^\s]+\s/, "").trim(); // remove emoji prefix
      setLeadData((d) => ({ ...d, eventType }));
      setLeadStep("date");
      addBotMessage(
        `Wonderful! A **${eventType}** — that's going to be magical! ✨\n\nWhat's your **event date** (or approximate month & year)?`
      );
      return true;
    }

    if (leadStep === "date") {
      const date = userText.trim();
      const finalData = { ...leadData, date };
      setLeadData(finalData);
      setLeadStep("done");
      submitLead(finalData);
      addBotMessage(
        `🎉 **All done, ${leadData.name}!**\n\nHere's what Aura has noted for you:\n• **Name**: ${leadData.name}\n• **Phone**: ${leadData.phone}\n• **Event**: ${leadData.eventType}\n• **Date**: ${date}\n\nOur team will **WhatsApp / call you within 2 hours** to discuss your dream event! 📞\n\nIs there anything else I can help you with?`,
        ["Our services", "Pricing", "Gallery", "Contact us"]
      );
      return true;
    }

    return false;
  }

  // ─── Main message handler ────────────────────────────────────────────────
  function handleSend(text: string = input) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: trimmed },
    ]);
    setInput("");

    // Check if we're in lead capture flow
    if (leadStep !== "idle" && leadStep !== "done") {
      handleLeadStep(trimmed);
      return;
    }

    // Check for "get quote / book / free quote" trigger
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("quote") ||
      lower.includes("book") ||
      lower.includes("free") ||
      lower.includes("plan") ||
      lower.includes("enquiry") ||
      lower.includes("inquiry") ||
      lower.includes("get a")
    ) {
      setLeadStep("name");
      addBotMessage(
        "Wonderful! Let me connect you with our team. 🌟\n\nFirst, may I have your **full name**?"
      );
      return;
    }

    // FAQ match
    const faqAnswer = getFAQAnswer(trimmed);
    if (faqAnswer) {
      addBotMessage(faqAnswer, ["Get a free quote", "More services", "Contact us"]);
      return;
    }

    // Fallback
    addBotMessage(
      "That's a great question! 🤔 Let me connect you with our team for the most accurate answer.\n\nShall I arrange a **callback** from our event specialist?",
      ["Yes, call me back", "Our services", "Pricing", "Contact us"]
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating button ── */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chatbot"
        className="chatbot-fab"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4AF37, #AA8C2C)",
          border: "none",
          boxShadow: "0 8px 32px rgba(212,175,55,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {open ? (
          <X size={24} color="#0a0a0a" />
        ) : (
          <MessageCircle size={24} color="#0a0a0a" />
        )}
        {!open && unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "#ef4444",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div
          id="chatbot-window"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "28px",
            zIndex: 9998,
            width: "370px",
            maxWidth: "calc(100vw - 32px)",
            height: "560px",
            maxHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            border: "1px solid rgba(212,175,55,0.25)",
            background: "#0a0a0a",
            animation: "chatSlideUp 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #141414, #1a1a1a)",
              borderBottom: "1px solid rgba(212,175,55,0.2)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37, #806921)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={20} color="#0a0a0a" />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#D4AF37",
                  fontWeight: 700,
                  fontSize: "15px",
                  fontFamily: "var(--font-serif, serif)",
                }}
              >
                Aura — Event Concierge ✨
              </div>
              <div
                style={{
                  color: "rgba(245,245,220,0.5)",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Online • Vazhayil Events
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(245,245,220,0.4)",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollbarWidth: "thin",
              scrollbarColor: "#AA8C2C #141414",
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "10px 14px",
                      borderRadius:
                        msg.role === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #D4AF37, #AA8C2C)"
                          : "rgba(255,255,255,0.06)",
                      color: msg.role === "user" ? "#0a0a0a" : "#F5F5DC",
                      fontSize: "13.5px",
                      lineHeight: "1.55",
                      border:
                        msg.role === "bot"
                          ? "1px solid rgba(212,175,55,0.12)"
                          : "none",
                      whiteSpace: "pre-line",
                      fontWeight: msg.role === "user" ? 600 : 400,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>

                {/* Quick-reply options */}
                {msg.role === "bot" && msg.options && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginTop: "8px",
                      paddingLeft: "4px",
                    }}
                  >
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSend(opt)}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(212,175,55,0.4)",
                          color: "#D4AF37",
                          fontSize: "12px",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(212,175,55,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "transparent";
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", paddingLeft: "4px" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#D4AF37",
                      display: "inline-block",
                      animation: `bounce 0.9s ${i * 0.18}s infinite ease-in-out`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: "1px solid rgba(212,175,55,0.15)",
              padding: "12px 16px",
              display: "flex",
              gap: "10px",
              background: "#0f0f0f",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                leadStep === "name"
                  ? "Enter your full name…"
                  : leadStep === "phone"
                  ? "Enter your phone number…"
                  : leadStep === "eventType"
                  ? "Type your event type…"
                  : leadStep === "date"
                  ? "Enter your event date…"
                  : "Type a message…"
              }
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#F5F5DC",
                fontSize: "13.5px",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "rgba(212,175,55,0.6)";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "rgba(212,175,55,0.2)";
              }}
            />
            <button
              id="chatbot-send"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  input.trim()
                    ? "linear-gradient(135deg, #D4AF37, #AA8C2C)"
                    : "rgba(255,255,255,0.05)",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              <Send size={16} color={input.trim() ? "#0a0a0a" : "#555"} />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0);    }
          40%           { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
