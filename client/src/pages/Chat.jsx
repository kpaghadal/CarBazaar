import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { chatAPI } from '../services/api.js';
import '../styles/users/Chat.css';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

function Avatar({ name, size = 38 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: '#FF6A00', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.4,
    }}>
      {(name || '?').charAt(0).toUpperCase()}
    </div>
  );
}

export function Chat() {
  const { id: chatId } = useParams();   // undefined on /chat (inbox)
  const navigate       = useNavigate();
  const { user }       = useAuth();

  const [allChats,  setAllChats]  = useState([]);
  const [chatData,  setChatData]  = useState(null);
  const [messages,  setMessages]  = useState([]);
  const [text,      setText]      = useState('');
  const [loading,   setLoading]   = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState('');
  const bottomRef = useRef(null);
  const pollRef   = useRef(null);

  // ── Load all conversations (sidebar) ─────────────────────────
  const loadAllChats = useCallback(() => {
    chatAPI.getUserChats()
      .then(setAllChats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadAllChats();
  }, [loadAllChats]);

  // ── Load / poll active conversation ──────────────────────────
  const loadMessages = useCallback(() => {
    if (!chatId) return;
    chatAPI.getChat(chatId)
      .then((data) => {
        setChatData(data);
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [chatId]);

  useEffect(() => {
    if (!chatId) { setChatData(null); setMessages([]); return; }
    setLoading(true);
    setError('');
    loadMessages();
    // Poll every 3 s — works for both buyer and seller
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      loadMessages();
      loadAllChats();          // keep sidebar last-message fresh
    }, 3000);
    return () => clearInterval(pollRef.current);
  }, [loadMessages, loadAllChats, chatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send message ──────────────────────────────────────────────
  const send = async () => {
    if (!text.trim() || sending || !chatId) return;
    setSending(true);
    try {
      const newMsg = await chatAPI.sendMessage(chatId, text.trim());
      setMessages((prev) => [...prev, newMsg]);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────
  const getOther = (chat) =>
    chat.participants?.find((p) => String(p._id) !== String(user?._id));

  const formatTime = (ts) =>
    ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  const otherParticipant = chatData ? getOther(chatData) : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="chat-container">

        {/* ── Left Sidebar: conversation list ─────────────────── */}
        <div className="chat-sidebar-left">
          <div className="messages-header">
            <h2 style={{ margin: 0 }}>Messages</h2>
          </div>

          <div className="contacts-list">
            {allChats.length === 0 && (
              <p style={{ padding: '20px 16px', color: '#9CA3AF', fontSize: 13 }}>
                No conversations yet.
              </p>
            )}

            {allChats.map((c) => {
              const other = getOther(c);
              const last  = c.messages?.[c.messages.length - 1];
              return (
                <div
                  key={c._id}
                  className={`contact-item${c._id === chatId ? ' active' : ''}`}
                  onClick={() => navigate(`/chat/${c._id}`)}
                >
                  <Avatar name={other?.name} />
                  <div className="contact-info" style={{ marginLeft: 12 }}>
                    <div className="contact-header">
                      <span className="contact-name">{other?.name || 'User'}</span>
                      {last?.createdAt && (
                        <span className="contact-time">{formatTime(last.createdAt)}</span>
                      )}
                    </div>
                    <div className="contact-last-message">
                      {last?.text || 'No messages yet'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Middle: chat window ──────────────────────────────── */}
        <div className="chat-main">
          {!chatId ? (
            /* Empty state: user is on /chat with no conversation selected */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#9CA3AF' }}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p style={{ fontSize: 15 }}>Select a conversation or start one from a car listing.</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  <Avatar name={otherParticipant?.name} />
                  <div className="chat-user-details" style={{ marginLeft: 10 }}>
                    <span className="chat-user-name">{otherParticipant?.name || '...'}</span>
                    <span className="chat-user-status">{otherParticipant?.email || ''}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-history">
                {loading && <p style={{ textAlign: 'center', color: '#9CA3AF' }}>Loading…</p>}
                {error   && <p style={{ textAlign: 'center', color: '#EF4444' }}>{error}</p>}

                {messages.map((m, i) => {
                  const senderId = m.sender?._id
                    ? String(m.sender._id)
                    : String(m.sender || '');
                  const isMine = senderId === String(user?._id);
                  return (
                    <div
                      key={m._id || i}
                      style={{
                        display: 'flex',
                        justifyContent: isMine ? 'flex-end' : 'flex-start',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '65%',
                          padding: '10px 14px',
                          borderRadius: 12,
                          fontSize: 14,
                          lineHeight: 1.5,
                          backgroundColor: isMine ? '#DCF8C6' : '#ffffff',
                          color: '#111827',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          borderBottomRightRadius: isMine ? 2 : 12,
                          borderBottomLeftRadius: isMine ? 12 : 2,
                        }}
                      >
                        {m.text}
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, textAlign: 'right' }}>
                          {formatTime(m.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="chat-input-area">
                <input
                  type="text"
                  className="message-input"
                  placeholder="Type a message…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                  disabled={sending || loading}
                />
                <button
                  className="send-btn-circle"
                  onClick={send}
                  disabled={sending || !text.trim()}
                >
                  <SendIcon />
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Right Sidebar: chat info ─────────────────────────── */}
        <div className="chat-sidebar-right">
          <h2 className="listing-header-title">Chat Info</h2>
          <div className="listing-content">
            {otherParticipant ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={otherParticipant.name} size={44} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{otherParticipant.name}</div>
                    <div style={{ color: '#9CA3AF', fontSize: 12 }}>{otherParticipant.email}</div>
                  </div>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: 11, margin: 0 }}>
                  ↻ Auto-refreshes every 3 seconds
                </p>
              </div>
            ) : (
              <p style={{ color: '#9CA3AF', fontSize: 13 }}>No conversation selected.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
