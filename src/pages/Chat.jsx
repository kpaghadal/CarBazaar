import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function loadThread(id) {
  try {
    const raw = localStorage.getItem(`chat:${id}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
function saveThread(id, msgs) {
  try {
    localStorage.setItem(`chat:${id}`, JSON.stringify(msgs));
  } catch {}
}

export function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState(() => loadThread(id));
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    saveThread(id, messages);
  }, [id, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (from) => {
    if (!text.trim()) return;
    const msg = { id: Date.now(), from, text: text.trim(), at: new Date().toISOString() };
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>Chat</h1>
        <div style={styles.chatBox}>
          <div style={styles.messages}>
            {messages.map((m) => (
              <div key={m.id} style={{ ...styles.message, ...(m.from === 'buyer' ? styles.buyer : styles.seller) }}>
                <div style={styles.meta}>{m.from === 'buyer' ? 'You' : 'Seller'}</div>
                <div>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={styles.composer}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button type="button" onClick={() => send('buyer')} style={styles.sendBtn}>
              Send
            </button>
          </div>
          <div style={{ marginTop: 8, textAlign: 'right' }}>
            <button type="button" onClick={() => setText('Is this still available?')} style={styles.quick}>
              Quick: Availability
            </button>
            <button type="button" onClick={() => setText('Can we negotiate the price?')} style={styles.quick}>
              Quick: Price
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED' },
  main: { maxWidth: 900, margin: '0 auto', padding: 40 },
  title: { margin: '0 0 16px', fontSize: '1.5rem' },
  chatBox: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 },
  messages: { maxHeight: 420, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, padding: 8 },
  message: { maxWidth: '70%', padding: '8px 12px', borderRadius: 12 },
  buyer: { alignSelf: 'flex-end', background: '#FFEEE0' },
  seller: { alignSelf: 'flex-start', background: '#F3F4F6' },
  meta: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  composer: { display: 'flex', gap: 8, marginTop: 8 },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e5e5' },
  sendBtn: { padding: '10px 16px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' },
  quick: { marginLeft: 8, padding: '6px 10px', borderRadius: 999, border: '1px solid #eee', background: '#fff', cursor: 'pointer' },
};

