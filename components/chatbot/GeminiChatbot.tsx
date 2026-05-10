'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../../hooks/useChatbot';

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [hasOpened, setHasOpened] = useState(false);
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    "🗺️ Plan a 7-day Europe trip",
    "💰 Budget travel tips",
    "🎒 Packing checklist for Bali",
    "🌏 Best destinations in Asia"
  ];

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, hasOpened]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      <style>{`
        .loopy-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .loopy-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB, #8B5CF6);
          color: white;
          border: none;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .loopy-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(37, 99, 235, 0.5);
        }
        .loopy-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 560px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px) scale(0.95);
          transform-origin: bottom right;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .loopy-window.open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0) scale(1);
        }
        .loopy-header {
          background: linear-gradient(135deg, #2563EB, #8B5CF6);
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .loopy-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .loopy-avatar {
          font-size: 24px;
          background: rgba(255,255,255,0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .loopy-online-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid #8B5CF6;
        }
        .loopy-title {
          font-weight: 600;
          font-size: 16px;
          margin: 0;
          line-height: 1.2;
        }
        .loopy-subtitle {
          font-size: 12px;
          opacity: 0.8;
          margin: 0;
        }
        .loopy-header-actions {
          display: flex;
          gap: 8px;
        }
        .loopy-icon-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s;
        }
        .loopy-icon-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        .loopy-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #f9fafb;
        }
        .loopy-message-row {
          display: flex;
          gap: 12px;
          max-width: 85%;
        }
        .loopy-message-row.assistant {
          align-self: flex-start;
        }
        .loopy-message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .loopy-msg-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .loopy-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
        .loopy-message-row.assistant .loopy-bubble {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .loopy-message-row.user .loopy-bubble {
          background: linear-gradient(135deg, #8B5CF6, #a855f7);
          color: white;
          border-bottom-right-radius: 4px;
        }
        .loopy-prompts {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .loopy-prompt-btn {
          background: white;
          border: 1px solid #e5e7eb;
          padding: 10px 14px;
          border-radius: 12px;
          text-align: left;
          font-size: 13px;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .loopy-prompt-btn:hover {
          border-color: #8B5CF6;
          color: #8B5CF6;
          background: #f5f3ff;
        }
        .loopy-typing {
          display: flex;
          gap: 4px;
          padding: 16px;
          background: white;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .loopy-dot {
          width: 6px;
          height: 6px;
          background: #9ca3af;
          border-radius: 50%;
          animation: loopyBounce 1.4s infinite ease-in-out both;
        }
        .loopy-dot:nth-child(1) { animation-delay: -0.32s; }
        .loopy-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes loopyBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .loopy-input-area {
          padding: 16px;
          background: white;
          border-top: 1px solid #e5e7eb;
        }
        .loopy-input-box {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: #f3f4f6;
          border-radius: 20px;
          padding: 8px 16px;
        }
        .loopy-textarea {
          flex: 1;
          border: none;
          background: transparent;
          resize: none;
          padding: 8px 0;
          font-family: inherit;
          font-size: 14px;
          color: #1f2937;
          max-height: 120px;
          outline: none;
        }
        .loopy-textarea::placeholder {
          color: #9ca3af;
        }
        .loopy-send-btn {
          background: #2563EB;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 4px;
          transition: background 0.2s;
        }
        .loopy-send-btn:hover {
          background: #1d4ed8;
        }
        .loopy-send-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .loopy-footer {
          text-align: center;
          padding: 8px;
          font-size: 11px;
          color: #9ca3af;
          background: white;
        }
        .loopy-error {
          color: #ef4444;
          font-size: 13px;
          text-align: center;
          padding: 8px;
        }
        @media (max-width: 480px) {
          .loopy-window {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
            transform: translateY(100%);
          }
          .loopy-window.open {
            transform: translateY(0);
          }
          .loopy-btn {
            display: none;
          }
          .loopy-window.open ~ .loopy-btn {
            display: flex;
          }
        }
      `}</style>

      <div className="loopy-container">
        <div className={`loopy-window ${isOpen ? 'open' : ''}`}>
          <div className="loopy-header">
            <div className="loopy-header-left">
              <div className="loopy-avatar">
                🌍
                <div className="loopy-online-dot"></div>
              </div>
              <div>
                <h3 className="loopy-title">Loopy</h3>
                <p className="loopy-subtitle">AI Travel Assistant</p>
              </div>
            </div>
            <div className="loopy-header-actions">
              <button className="loopy-icon-btn" onClick={clearMessages} title="Clear chat">
                ↻
              </button>
              <button className="loopy-icon-btn" onClick={() => setIsOpen(false)} title="Close">
                ✕
              </button>
            </div>
          </div>

          <div className="loopy-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`loopy-message-row ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="loopy-msg-avatar">🌍</div>
                )}
                <div className="loopy-bubble">{msg.content}</div>
              </div>
            ))}
            
            {messages.length === 1 && !hasOpened && (
              <div className="loopy-prompts">
                {quickPrompts.map((prompt, i) => (
                  <button 
                    key={i} 
                    className="loopy-prompt-btn"
                    onClick={() => {
                      sendMessage(prompt);
                      setHasOpened(true);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="loopy-message-row assistant">
                <div className="loopy-msg-avatar">🌍</div>
                <div className="loopy-typing">
                  <div className="loopy-dot"></div>
                  <div className="loopy-dot"></div>
                  <div className="loopy-dot"></div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="loopy-error">{error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="loopy-input-area">
            <div className="loopy-input-box">
              <textarea
                ref={textareaRef}
                className="loopy-textarea"
                placeholder="Ask about destinations, budgets..."
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button 
                className="loopy-send-btn" 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                ↑
              </button>
            </div>
          </div>
          <div className="loopy-footer">
            Powered by Gemini AI · Traveloop
          </div>
        </div>

        <button 
          className="loopy-btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '💬'}
        </button>
      </div>
    </>
  );
}
