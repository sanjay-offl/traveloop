"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
  typing?: boolean;
};

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const PlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const WalletIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
  </svg>
);

const BagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

// ─── Quick Prompt Chips ───────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { icon: <MapPinIcon />, label: "Plan a trip to Bali", prompt: "Plan a 7-day trip to Bali with activities and must-see spots." },
  { icon: <WalletIcon />, label: "Budget for Japan", prompt: "What's a realistic budget for a 10-day trip to Japan?" },
  { icon: <BagIcon />,   label: "Packing list",       prompt: "Create a smart packing list for a beach vacation."        },
  { icon: <PlaneIcon />, label: "Hidden gems Europe",  prompt: "Suggest hidden gem destinations in Europe for 2026."      },
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "#22d3a5",
        display: "inline-block",
        animation: `travelBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
      }} />
    ))}
  </div>
);

// ─── Individual Message Bubble ────────────────────────────────────────────────
const MessageBubble = ({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      animation: "fadeSlideUp 0.3s ease",
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #22d3a5 0%, #0ea5e9 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginRight: 8, marginTop: 2,
          boxShadow: "0 0 12px rgba(34,211,165,0.4)",
        }}>
          <SparkleIcon />
        </div>
      )}
      <div style={{
        maxWidth: "78%",
        padding: "10px 14px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? "linear-gradient(135deg, #22d3a5 0%, #0ea5e9 100%)"
          : "rgba(255,255,255,0.06)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
        color: isUser ? "#0a1628" : "#e2e8f0",
        fontSize: 13.5,
        lineHeight: 1.6,
        fontWeight: isUser ? 600 : 400,
        backdropFilter: "blur(8px)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {msg.content}
        {msg.typing && <TypingDots />}
      </div>
    </div>
  );
};

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function TraveloopChatbot() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading]  = useState(false);
  const [pulse, setPulse]      = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef  = useRef<HTMLTextAreaElement | null>(null);

  // Stop pulse after first open
  useEffect(() => { if (open) setPulse(false); }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: ChatMessage = { role: "user", content };
    const typingMsg: ChatMessage = { role: "assistant", content: "", typing: true };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setLoading(true);

    try {
      const history = [...messages, userMsg];

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Lumi, Traveloop's intelligent AI travel assistant. You're warm, enthusiastic, and deeply knowledgeable about travel. 

Your role:
- Help users plan trips, build itineraries, and explore destinations
- Suggest budget-friendly tips and hidden gems
- Recommend activities, restaurants, and accommodations  
- Create packing lists tailored to destinations
- Provide visa, weather, and safety insights

Personality: friendly, concise, slightly adventurous. Use occasional travel emojis to keep it lively (✈️ 🗺️ 🌴 🏔️ etc). Keep responses focused and under 200 words unless a detailed itinerary is requested. Always end with a follow-up question or suggestion to keep the conversation flowing.`,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data: { content?: Array<{ text?: string }> } = await response.json();
      const reply = data.content?.map((b) => b.text || "").join("") || "Sorry, I couldn't get a response. Please try again!";

      setMessages((prev) => [
        ...prev.slice(0, -1), // remove typing bubble
        { role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "✈️ Oops! Something went wrong. Check your connection and try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => setMessages([]);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Keyframe Styles ── */}
      <style>{`
        @keyframes travelBounce {
          0%,80%,100% { transform: translateY(0); opacity: .4; }
          40%          { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        @keyframes floatPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,211,165,0.5), 0 8px 32px rgba(0,0,0,0.4); }
          50%      { box-shadow: 0 0 0 12px rgba(34,211,165,0), 0 8px 32px rgba(0,0,0,0.4); }
        }
        @keyframes chatSlideIn {
          from { opacity:0; transform:scale(0.92) translateY(16px); }
          to   { opacity:1; transform:scale(1)    translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .traveloop-chat-window { animation: chatSlideIn 0.28s cubic-bezier(.34,1.56,.64,1) forwards; }
        .traveloop-chat-window.closing { animation: chatSlideIn 0.2s ease-in reverse forwards; }
        .lumi-chip:hover { background: rgba(34,211,165,0.15) !important; border-color: rgba(34,211,165,0.5) !important; transform: translateY(-1px); }
        .lumi-send-btn:hover { transform: scale(1.05); box-shadow: 0 0 18px rgba(34,211,165,0.5); }
        .lumi-send-btn:active { transform: scale(0.96); }
        .lumi-input:focus { outline: none; border-color: rgba(34,211,165,0.5) !important; box-shadow: 0 0 0 3px rgba(34,211,165,0.08); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
      `}</style>

      {/* ── FAB Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Lumi AI Travel Assistant"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #22d3a5 0%, #0ea5e9 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999,
          animation: pulse ? "floatPulse 2s ease-in-out infinite" : "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          transition: "transform 0.2s ease",
          transform: open ? "rotate(45deg) scale(1.05)" : "rotate(0deg)",
        }}
      >
        {open
          ? <CloseIcon />
          : <PlaneIcon />
        }
        {/* Notification dot */}
        {!open && (
          <span style={{
            position: "absolute", top: 3, right: 3,
            width: 10, height: 10, borderRadius: "50%",
            background: "#f43f5e",
            border: "2px solid #0a1628",
          }} />
        )}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="traveloop-chat-window"
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            width: 380,
            height: 560,
            borderRadius: 20,
            background: "rgba(10, 16, 35, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 18px",
            background: "linear-gradient(135deg, rgba(34,211,165,0.12) 0%, rgba(14,165,233,0.08) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Avatar */}
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #22d3a5, #0ea5e9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(34,211,165,0.4)",
                flexShrink: 0,
              }}>
                <SparkleIcon />
              </div>
              <div>
                <div style={{
                  fontWeight: 700, fontSize: 15, color: "#f1f5f9",
                  letterSpacing: "-0.02em",
                }}>Lumi ✨</div>
                <div style={{
                  fontSize: 11.5, color: "#22d3a5",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#22d3a5",
                    display: "inline-block",
                    boxShadow: "0 0 6px #22d3a5",
                  }} />
                  AI Travel Assistant · Online
                </div>
              </div>
            </div>
            {/* Clear button */}
            {messages.length > 0 && (
              <button onClick={clearChat} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#94a3b8",
                fontSize: 11,
                padding: "4px 10px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
                Clear
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px",
          }}>
            {/* Welcome State */}
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "12px 4px 20px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(34,211,165,0.2), rgba(14,165,233,0.2))",
                  border: "1px solid rgba(34,211,165,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                  boxShadow: "0 0 24px rgba(34,211,165,0.15)",
                }}>
                  <span style={{ fontSize: 24 }}>✈️</span>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>
                  Hey Arjun! I'm Lumi 👋
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
                  Your AI travel co-pilot. Ask me anything about your next adventure.
                </div>

                {/* Quick Chips */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {QUICK_PROMPTS.map((q, i) => (
                    <button
                      key={i}
                      className="lumi-chip"
                      onClick={() => sendMessage(q.prompt)}
                      style={{
                        display: "flex", alignItems: "center", gap: 9,
                        padding: "9px 14px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#cbd5e1",
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        width: "100%",
                      }}
                    >
                      <span style={{ color: "#22d3a5", flexShrink: 0 }}>{q.icon}</span>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Bubbles */}
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: "12px 14px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 14,
              padding: "8px 8px 8px 14px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}>
              <textarea
                ref={inputRef}
                className="lumi-input"
                rows={1}
                placeholder="Ask Lumi anything about your trip..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                }}
                onKeyDown={handleKey}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e2e8f0",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  resize: "none",
                  maxHeight: 100,
                  fontFamily: "inherit",
                  caretColor: "#22d3a5",
                  overflowY: "auto",
                }}
              />
              <button
                className="lumi-send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  border: "none",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, #22d3a5, #0ea5e9)"
                    : "rgba(255,255,255,0.06)",
                  color: input.trim() && !loading ? "#0a1628" : "#475569",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <SendIcon />
              </button>
            </div>
            <div style={{
              textAlign: "center", fontSize: 10.5, color: "#334155",
              marginTop: 8, letterSpacing: "0.02em",
            }}>
              Powered by Claude AI · Traveloop
            </div>
          </div>
        </div>
      )}
    </>
  );
}